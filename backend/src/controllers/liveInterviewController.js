// const LiveInterviewSession = require("../models/LiveInterviewSession");

// exports.startLiveInterview = async (req, res) => {
//   const { topic, role } = req.body;

//   const session = await LiveInterviewSession.create({
//     user: req.user.id,
//     topic,
//     role,
//     questions: [],
//   });

//   res.json(session);
// };

// exports.submitLiveAnswer = async (req, res) => {
//   const { sessionId, question, answer } = req.body;

//   const session = await LiveInterviewSession.findById(sessionId);
//   if (!session) {
//     return res.status(404).json({ message: "Session not found" });
//   }

//   session.questions.push({
//     question,
//     userAnswer: answer,
//   });

//   await session.save();
//   res.json({ success: true });
// };

// exports.finishLiveInterview = async (req, res) => {
//   const { sessionId } = req.body;

//   const session = await LiveInterviewSession.findById(sessionId);
//   if (!session) {
//     return res.status(404).json({ message: "Session not found" });
//   }

//   session.status = "COMPLETED";
//   await session.save();

//   res.json(session);
// };

//next acc claude code
const LiveInterviewSession = require("../models/LiveInterviewSession");

/* ══════════════════════════════════════════════
   HUGGING FACE INFERENCE API
   Tries multiple models in order until one works
══════════════════════════════════════════════ */
const HF_API_KEY = process.env.HF_API_KEY;

// New router endpoint — base URL is fixed, model uses :provider suffix
const HF_ROUTER_BASE = "https://router.huggingface.co/v1/chat/completions";

// Model+provider combos to try in order — :auto picks fastest available provider
const HF_MODELS = [
  "meta-llama/Llama-3.1-8B-Instruct:cerebras",   // cerebras = very fast free tier
  "meta-llama/Llama-3.3-70B-Instruct:cerebras",
  "Qwen/Qwen2.5-72B-Instruct:together",
  "Qwen/Qwen2.5-7B-Instruct:auto",
  "meta-llama/Llama-3.1-8B-Instruct:auto",
  "mistralai/Mistral-7B-Instruct-v0.3:auto",
];

async function hfGenerateWithModel(modelWithProvider, prompt, maxTokens) {
  const res = await fetch(HF_ROUTER_BASE, {
    method:  "POST",
    headers: { Authorization: `Bearer ${HF_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model:       modelWithProvider,
      messages:    [{ role: "user", content: prompt }],
      max_tokens:  maxTokens,
      temperature: 0.7,
      top_p:       0.9,
      stream:      false,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`${res.status} — ${errText}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (text && text.trim().length > 0) return text.trim();
  throw new Error("Empty response from model");
}

async function hfGenerate(prompt, maxTokens = 512) {
  let lastError;
  for (const model of HF_MODELS) {
    try {
      const result = await hfGenerateWithModel(model, prompt, maxTokens);
      return result;
    } catch (err) {
      console.warn(`Model ${model} failed: ${err.message}`);
      lastError = err;
    }
  }
  throw new Error(`All HF models failed. Last: ${lastError?.message}`);
}

function extractJSON(text) {
  const jsonBlock = text.match(/```json\s*([\s\S]*?)```/);
  if (jsonBlock) return jsonBlock[1].trim();
  const arrMatch = text.match(/\[[\s\S]*\]/);
  if (arrMatch) return arrMatch[0];
  const objMatch = text.match(/\{[\s\S]*\}/);
  if (objMatch) return objMatch[0];
  return text.trim();
}

// Returns true if 2 questions share too many keywords (likely duplicates)
function areSimilar(q1, q2) {
  if (!q1 || !q2) return false;
  const stop = new Set(["what","how","why","when","where","which","the","and","you","for","are","can","does","your","that","with","this","would"]);
  const words = q => new Set(q.toLowerCase().split(/\W+/).filter(w => w.length > 3 && !stop.has(w)));
  const w1 = words(q1), w2 = words(q2);
  let overlap = 0;
  for (const w of w1) if (w2.has(w)) overlap++;
  return overlap >= 3;
}

function deduplicateQuestions(qs) {
  const unique = [];
  for (const q of qs) {
    if (q && typeof q === "string" && q.trim().length > 10 && !unique.some(u => areSimilar(u, q))) {
      unique.push(q.trim());
    }
  }
  return unique;
}

const QUESTION_COUNT = { Easy: 6, Medium: 9, Hard: 12 };
const QUESTION_TIMER = { Easy: 120, Medium: 90, Hard: 60 };

/* ══════════════════════════════════════════════
   START INTERVIEW
   POST /api/live-interview/start
   Generates initial question + a pool of backups
══════════════════════════════════════════════ */
exports.startLiveInterview = async (req, res) => {
  try {
    const { topic, role, difficulty = "Medium" } = req.body;
    if (!topic || !role) return res.status(400).json({ message: "Topic and role are required" });

    const totalQuestions = QUESTION_COUNT[difficulty] || 9;
    const timer          = QUESTION_TIMER[difficulty] || 90;

    // Generate a pool (2x target) so we always have backups
    const poolSize = totalQuestions * 2;

    const prompt = `You are a senior ${role} interviewer. Generate ${poolSize} unique technical interview questions.

Topic: ${topic} | Role: ${role} | Difficulty: ${difficulty}

Requirements:
- Every question must be COMPLETELY UNIQUE — no overlapping concepts
- Mix: conceptual theory, practical problem-solving, real-world scenarios, behavioral
- ${difficulty === "Hard" ? "Advanced level: architecture, edge cases, internals, system design" : difficulty === "Easy" ? "Beginner: core fundamentals, basic concepts" : "Intermediate: balance depth and breadth"}
- Be very specific to ${topic} for a ${role}
- Questions should progressively cover different aspects

Return ONLY a valid JSON array of strings, nothing else.`;

    let pool;
    try {
      const raw  = await hfGenerate(prompt, 1200);
      const json = extractJSON(raw);
      pool       = deduplicateQuestions(JSON.parse(json));
      if (pool.length < 3) throw new Error("Too few questions");
    } catch (err) {
      console.warn("HF pool gen failed:", err.message);
      pool = getFallbackPool(topic, role, difficulty, poolSize);
    }

    // First question is just pool[0]
    const firstQuestion = pool[0];

    const session = await LiveInterviewSession.create({
      user:               req.user.id,
      topic,
      role,
      difficulty,
      generatedQuestions: pool,          // Full backup pool
      askedQuestions:     [firstQuestion], // Track what's been asked
      questions:          [],
      hintsUsed:          0,
      totalHints:         3,
      timerPerQuestion:   timer,
      totalQuestions,
      status:             "ONGOING",
    });

    // Generate AI intro speech
    let introSpeech = "";
    try {
      const introPrompt = `You are Alex, a professional ${role} interviewer at a top tech company. 
Generate a SHORT, natural, professional interview introduction (3-4 sentences max).
- Introduce yourself as Alex
- Mention the role: ${role}
- Mention the topic area: ${topic}  
- Set the tone: professional but friendly
- End by saying you'll begin with the first question
Keep it concise and natural, like a real interviewer would speak. Return ONLY the spoken text.`;
      introSpeech = (await hfGenerate(introPrompt, 120)).trim();
    } catch {
      introSpeech = `Hi, I'm Alex, your interviewer today. We'll be focusing on ${topic} for the ${role} position. I'll ask you ${totalQuestions} questions — take your time to think before answering. Let's get started with the first question.`;
    }

    res.json({
      sessionId:        session._id,
      firstQuestion,
      introSpeech,
      topic,
      role,
      difficulty,
      timerPerQuestion: timer,
      totalHints:       3,
      totalQuestions,
    });
  } catch (err) {
    console.error("Start interview error:", err);
    res.status(500).json({ message: "Failed to start interview. Please try again." });
  }
};

/* ══════════════════════════════════════════════
   SUBMIT ANSWER + GET NEXT QUESTION
   POST /api/live-interview/answer
   • Evaluates the answer
   • Generates next question based on context + score
   • Never repeats a question
══════════════════════════════════════════════ */
exports.submitLiveAnswer = async (req, res) => {
  try {
    const { sessionId, question, answer, difficulty: currentDiff } = req.body;
    if (!sessionId || !question) return res.status(400).json({ message: "sessionId and question required" });

    const session = await LiveInterviewSession.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    const answeredCount  = session.questions.length;
    const isLastQuestion = answeredCount + 1 >= session.totalQuestions;

    const actualAnswer = answer?.trim() || "[No answer provided — time expired]";

    /* ── STEP 1: Evaluate answer ── */
    const evalPrompt = `You are a strict technical interviewer evaluating a ${session.role} candidate.

Topic: ${session.topic} | Difficulty: ${currentDiff || session.difficulty}
Question: "${question}"
Candidate Answer: "${actualAnswer}"

Score and evaluate. Return ONLY this JSON object, nothing else:
{
  "score": <1-10>,
  "feedback": "<2-3 sentence specific feedback>",
  "strengths": "<one specific strength in their answer>",
  "improvement": "<one specific area to improve>",
  "adjustedDifficulty": "<Easy|Medium|Hard>",
  "weakTopics": ["<topic they were weak on>"]
}

Scoring: 1-3 poor, 4-5 needs work, 6-7 average, 8-9 good, 10 excellent
adjustedDifficulty rule: score<=4 → go easier, score>=8 → go harder, else keep "${currentDiff || session.difficulty}"`;

    let evaluation;
    try {
      const raw  = await hfGenerate(evalPrompt, 400);
      evaluation = JSON.parse(extractJSON(raw));
      if (!evaluation.score || isNaN(evaluation.score)) throw new Error("Bad score");
      evaluation.score = Math.min(10, Math.max(1, Math.round(Number(evaluation.score))));
    } catch {
      evaluation = {
        score: 5, feedback: "Your answer showed some understanding. Try to be more specific.",
        strengths: "Attempted to address the question",
        improvement: "Add concrete examples and technical depth",
        adjustedDifficulty: currentDiff || session.difficulty,
        weakTopics: [],
      };
    }

    const nextDifficulty = evaluation.adjustedDifficulty || currentDiff || session.difficulty;
    const askedSoFar     = session.askedQuestions || [];

    /* ── STEP 2: Generate next question (context-aware, no repeat) ── */
    let nextQuestion = null;

    if (!isLastQuestion) {
      // Build context of what's been asked and candidate's weak spots
      const weakTopics  = evaluation.weakTopics || [];
      const recentQs    = askedSoFar.slice(-5).map((q, i) => `${i + 1}. ${q}`).join("\n");

      const nextQPrompt = `You are conducting a live ${session.role} interview on ${session.topic}.

Questions already asked (NEVER repeat or overlap these):
${recentQs}

Candidate's last answer score: ${evaluation.score}/10
${evaluation.score <= 4 ? `They struggled with: ${weakTopics.join(", ") || "the previous concept"}. Probe a related fundamental differently.` :
  evaluation.score >= 8 ? `They excelled. Push deeper — ask a harder follow-up exploring advanced aspects.` :
  `Move to a DIFFERENT aspect of ${session.topic} not yet covered.`}

Next question requirements:
- Difficulty: ${nextDifficulty}
- Must be about ${session.topic} for a ${session.role}
- Must NOT overlap with any question already asked
- Must test a DIFFERENT concept than all previous questions
- Be specific and clear

Return ONLY the question text. No numbering, no prefix, no explanation.`;

      try {
        let generated = (await hfGenerate(nextQPrompt, 150)).trim();
        generated = generated.replace(/^["'\-\*\d\.\s:]+/, "").replace(/["']$/, "").trim();

        if (generated.length > 10 && !askedSoFar.some(q => areSimilar(q, generated))) {
          nextQuestion = generated;
        } else {
          // Fallback to pool
          const pool   = session.generatedQuestions || [];
          const unused = pool.filter(q => !askedSoFar.some(a => areSimilar(a, q)));
          nextQuestion = unused[0] || null;
        }
      } catch {
        const pool   = session.generatedQuestions || [];
        const unused = pool.filter(q => !askedSoFar.some(a => areSimilar(a, q)));
        nextQuestion = unused[0] || null;
      }
    }

    /* ── STEP 3: Persist ── */
    session.questions.push({
      question, userAnswer: actualAnswer,
      aiScore: evaluation.score, aiFeedback: evaluation.feedback,
      strengths: evaluation.strengths, improvement: evaluation.improvement,
      questionIndex: answeredCount,
    });

    if (!session.askedQuestions) session.askedQuestions = [];
    if (nextQuestion) session.askedQuestions.push(nextQuestion);
    session.markModified("askedQuestions");
    session.markModified("questions");
    await session.save();

    // Generate a SHORT spoken reaction the AI says before the next question
    let spokenReaction = "";
    try {
      const score = evaluation.score;
      const reactionPrompt = `You are Alex, a professional interviewer. The candidate just answered a ${session.topic} question and scored ${score}/10.
Generate a VERY SHORT spoken reaction (1-2 sentences max) that a real interviewer would say before moving on.
- Score 8-10: Brief genuine praise, then transition
- Score 5-7: Neutral acknowledgment, maybe one quick observation  
- Score 1-4: Polite but honest, brief encouragement
- Sound natural and human, not robotic
- Do NOT reveal the score number
- End with a natural transition like "Let's move on to..." or "Next up..."
${isLastQuestion ? "This was the last question. Give a warm closing remark instead of transitioning." : ""}
Return ONLY the spoken words, nothing else.`;
      spokenReaction = (await hfGenerate(reactionPrompt, 80)).trim();
    } catch {
      const s = evaluation.score;
      if (isLastQuestion) {
        spokenReaction = "That wraps up all the questions. Thank you for your time today — you've done well.";
      } else if (s >= 8) {
        spokenReaction = "Great answer! Let's keep the momentum going.";
      } else if (s >= 5) {
        spokenReaction = "Alright, good effort. Let's move on to the next one.";
      } else {
        spokenReaction = "I see — something to think about. Let's continue.";
      }
    }

    res.json({
      evaluation: {
        score:              evaluation.score,
        feedback:           evaluation.feedback,
        strengths:          evaluation.strengths,
        improvement:        evaluation.improvement,
        adjustedDifficulty: nextDifficulty,
      },
      spokenReaction,
      nextQuestion,
      isLastQuestion,
      questionsAnswered: session.questions.length,
      totalQuestions:    session.totalQuestions,
    });
  } catch (err) {
    console.error("Submit answer error:", err);
    res.status(500).json({ message: "Failed to evaluate answer" });
  }
};

/* ══════════════════════════════════════════════
   HINT
   POST /api/live-interview/hint
══════════════════════════════════════════════ */
exports.getHint = async (req, res) => {
  try {
    const { sessionId, question, topic, role } = req.body;
    const session = await LiveInterviewSession.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });
    if (session.hintsUsed >= session.totalHints)
      return res.status(429).json({ message: "No hints remaining", hintsLeft: 0 });

    const hintPrompt = `Give a 2-sentence hint for this interview question WITHOUT revealing the answer.
Question: "${question}" (Topic: ${topic || session.topic}, Role: ${role || session.role})
Point the candidate toward the right concept or framework. Be encouraging. Return ONLY the hint.`;

    let hint;
    try { hint = (await hfGenerate(hintPrompt, 120)).trim(); }
    catch { hint = `Think about the core principles of ${topic || session.topic} and how they solve real-world problems. Break it into smaller parts.`; }

    session.hintsUsed += 1;
    await session.save();
    res.json({ hint, hintsLeft: session.totalHints - session.hintsUsed });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate hint" });
  }
};

/* ══════════════════════════════════════════════
   FINISH INTERVIEW
   POST /api/live-interview/finish
══════════════════════════════════════════════ */
exports.finishLiveInterview = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await LiveInterviewSession.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    const answered = session.questions;
    const avgScore = answered.length
      ? Math.round((answered.reduce((s, q) => s + (q.aiScore || 0), 0) / answered.length) * 10) / 10
      : 0;

    let overallFeedback = "";
    try {
      const summary = answered.slice(0, 6)
        .map((q, i) => `Q${i + 1} [${q.aiScore}/10]: ${q.question}`)
        .join("\n");
      const summaryPrompt = `Write a 4-5 sentence final interview assessment.
Role: ${session.role}, Topic: ${session.topic}, Avg Score: ${avgScore}/10
Questions covered:\n${summary}
Cover: overall verdict, strongest skill shown, biggest area to improve, whether they pass this round.
Be honest, specific, and encouraging. Return ONLY the assessment.`;
      overallFeedback = (await hfGenerate(summaryPrompt, 300)).trim();
    } catch {
      overallFeedback = `You completed ${answered.length} questions averaging ${avgScore}/10. ${avgScore >= 7 ? "Strong performance — you demonstrated solid knowledge." : avgScore >= 5 ? "Decent effort. Focus on the improvement areas flagged in each answer." : "Keep practicing the fundamentals."} Review each question's feedback for targeted improvement.`;
    }

    session.status = "COMPLETED";
    session.overallScore = avgScore;
    session.overallFeedback = overallFeedback;
    await session.save();

    res.json({ summary: { totalQuestions: answered.length, avgScore, overallFeedback, hintsUsed: session.hintsUsed, questions: answered } });
  } catch (err) {
    res.status(500).json({ message: "Failed to finish interview" });
  }
};

/* ── GET SESSION ── */
exports.getSession = async (req, res) => {
  try {
    const session = await LiveInterviewSession.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Not found" });
    // Include firstQuestion so LiveInterview.jsx can load without extra state
    const firstQuestion = session.askedQuestions?.[0] || session.generatedQuestions?.[0] || null;
    res.json({ ...session.toObject(), firstQuestion });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ══════════════════════════════════════════════
   FALLBACK QUESTION POOL
══════════════════════════════════════════════ */
function getFallbackPool(topic, role, difficulty, count) {
  const bank = [
    `Explain the core principles of ${topic} and why they matter for a ${role}.`,
    `What are the key differences between common approaches in ${topic}?`,
    `How does ${topic} handle scalability and performance?`,
    `Walk me through the lifecycle of a typical ${topic} operation.`,
    `What are the most common pitfalls when working with ${topic}?`,
    `Design a ${topic}-based system to handle high traffic.`,
    `How would you debug a performance issue in a ${topic} application?`,
    `How would you test a ${topic} component for reliability?`,
    `How would you optimize an existing ${topic} implementation?`,
    `Tell me about a challenging problem you solved using ${topic}.`,
    `How do you keep up with changes in ${topic}?`,
    `How would you explain ${topic} to a non-technical stakeholder?`,
    `What trade-offs would you consider when choosing ${topic}?`,
    `How does ${topic} compare to its main alternatives?`,
    `What security considerations apply to ${topic}?`,
    `How do you handle errors and edge cases in ${topic}?`,
    `What monitoring would you set up for a ${topic} service?`,
    `Describe the best practices you follow when working with ${topic}.`,
    `How does ${topic} behave under extreme load or failure?`,
    `What would you change about how ${topic} works?`,
    `How would you migrate a system to use ${topic}?`,
    `What is the most underrated feature of ${topic}?`,
    `How does ${topic} relate to the broader ${role} ecosystem?`,
    `Describe a real-world use case where ${topic} is the best solution.`,
  ];
  return bank.slice(0, count);
}