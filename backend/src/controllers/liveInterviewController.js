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

/* ══════════════════════════════════════════════════════
   HUGGING FACE INFERENCE API
   Model: mistralai/Mistral-7B-Instruct-v0.3 (free tier)
   Fallback: microsoft/DialoGPT-large
══════════════════════════════════════════════════════ */
const HF_API_KEY  = process.env.HF_API_KEY;
// New HF router endpoint (replaces deprecated api-inference.huggingface.co)
const HF_MODEL    = "mistralai/Mistral-7B-Instruct-v0.3";
const HF_ENDPOINT = `https://router.huggingface.co/hf-inference/models/${HF_MODEL}/v1/chat/completions`;

async function hfGenerate(prompt, maxTokens = 512) {
  const res = await fetch(HF_ENDPOINT, {
    method:  "POST",
    headers: {
      Authorization:  `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: HF_MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens:  maxTokens,
      temperature: 0.7,
      top_p:       0.9,
      stream:      false,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HF API error: ${res.status} — ${err}`);
  }

  const data = await res.json();

  // New router returns OpenAI-compatible format
  const text = data?.choices?.[0]?.message?.content;
  if (text) return text.trim();

  throw new Error("Unexpected HF response: " + JSON.stringify(data).slice(0, 200));
}

/* ── Extract clean JSON from model output ── */
function extractJSON(text) {
  // Try ```json block first
  const jsonBlock = text.match(/```json\s*([\s\S]*?)```/);
  if (jsonBlock) return jsonBlock[1].trim();

  // Try raw JSON array
  const arrMatch = text.match(/\[[\s\S]*\]/);
  if (arrMatch) return arrMatch[0];

  // Try raw JSON object
  const objMatch = text.match(/\{[\s\S]*\}/);
  if (objMatch) return objMatch[0];

  return text.trim();
}

/* ── Question count by difficulty ── */
const QUESTION_COUNT = { Easy: 6, Medium: 9, Hard: 12 };

/* ── Timer per question (seconds) ── */
const QUESTION_TIMER = { Easy: 120, Medium: 90, Hard: 60 };

/* ══════════════════════════════════════════════════════
   START LIVE INTERVIEW
   POST /api/live-interview/start
   Body: { topic, role, difficulty }
══════════════════════════════════════════════════════ */
exports.startLiveInterview = async (req, res) => {
  try {
    const { topic, role, difficulty = "Medium" } = req.body;

    if (!topic || !role) {
      return res.status(400).json({ message: "Topic and role are required" });
    }

    const count = QUESTION_COUNT[difficulty] || 9;
    const timer = QUESTION_TIMER[difficulty] || 90;

    const prompt = `You are a senior technical interviewer at a top tech company.
Generate exactly ${count} interview questions for:
- Role: ${role}
- Topic: ${topic}
- Difficulty: ${difficulty}

Mix of question types:
- 40% conceptual (theory, definitions, how things work)
- 35% practical (code, design, problem solving)
- 25% behavioral (past experience, situation handling)

Rules:
- Make questions specific to ${topic}, not generic
- ${difficulty === "Hard" ? "Include deep system design and complex scenarios" : difficulty === "Easy" ? "Keep questions beginner-friendly" : "Balance depth and accessibility"}
- No numbering or prefixes
- Return ONLY a JSON array of strings: ["Q1", "Q2", ...]
`;

    let questions;
    try {
      const raw     = await hfGenerate(prompt, 800);
      const cleaned = extractJSON(raw);
      questions     = JSON.parse(cleaned);
      if (!Array.isArray(questions)) throw new Error("Not array");
      questions = questions.slice(0, count).filter(q => q.trim().length > 10);
    } catch (err) {
      console.warn("HF question generation failed, using fallback:", err.message);
      questions = getFallbackQuestions(topic, role, difficulty, count);
    }

    const session = await LiveInterviewSession.create({
      user:               req.user.id,
      topic,
      role,
      difficulty,
      generatedQuestions: questions,
      questions:          [],
      hintsUsed:          0,
      totalHints:         3,
      timerPerQuestion:   timer,
      status:             "ONGOING",
    });

    res.json({
      sessionId:        session._id,
      questions,
      topic,
      role,
      difficulty,
      timerPerQuestion: timer,
      totalHints:       3,
    });
  } catch (err) {
    console.error("Start interview error:", err);
    res.status(500).json({ message: "Failed to start interview. Please try again." });
  }
};

/* ══════════════════════════════════════════════════════
   EVALUATE ANSWER + GENERATE FOLLOW-UP
   POST /api/live-interview/answer
   Body: { sessionId, questionIndex, question, answer, topic, role, difficulty }
══════════════════════════════════════════════════════ */
exports.submitLiveAnswer = async (req, res) => {
  try {
    const { sessionId, questionIndex, question, answer, topic, role, difficulty } = req.body;

    if (!sessionId || !question || !answer?.trim()) {
      return res.status(400).json({ message: "sessionId, question, and answer required" });
    }

    const session = await LiveInterviewSession.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    /* ── Step 1: Evaluate the answer ── */
    const evalPrompt = `You are a strict but fair technical interviewer evaluating a candidate's answer.

Context:
- Role: ${role || session.role}
- Topic: ${topic || session.topic}
- Difficulty: ${difficulty || session.difficulty}
- Question: "${question}"
- Candidate Answer: "${answer}"

Evaluate and return ONLY this JSON (no extra text):
{
  "score": <integer 1-10>,
  "feedback": "<2-3 sentence specific constructive feedback>",
  "strengths": "<one specific strength in the answer>",
  "improvement": "<one specific actionable improvement>",
  "adjustedDifficulty": "<Easy|Medium|Hard>"
}

Scoring guide: 1-3=poor, 4-5=below average, 6-7=average, 8-9=good, 10=excellent
adjustedDifficulty: if score<=4 go easier, if score>=8 go harder, else keep same
`;

    let evaluation;
    try {
      const raw     = await hfGenerate(evalPrompt, 400);
      const cleaned = extractJSON(raw);
      evaluation    = JSON.parse(cleaned);
      if (!evaluation.score) throw new Error("No score");
    } catch (err) {
      console.warn("HF evaluation failed, using fallback:", err.message);
      evaluation = {
        score:              5,
        feedback:           "Your answer showed some understanding of the topic. Try to include more specific examples and technical depth.",
        strengths:          "Attempted to address the question",
        improvement:        "Add concrete examples and deeper technical explanation",
        adjustedDifficulty: difficulty || session.difficulty,
      };
    }

    /* ── Step 2: Generate follow-up question based on performance ── */
    const nextDifficulty = evaluation.adjustedDifficulty || difficulty || session.difficulty;
    let followUp = null;

    try {
      const followUpPrompt = `You are a technical interviewer.
The candidate just answered: "${question}"
Their answer: "${answer}"
Score: ${evaluation.score}/10

Generate ONE follow-up question that:
- ${evaluation.score >= 8 ? "Goes deeper or tests a related advanced concept" : evaluation.score <= 4 ? "Clarifies a fundamental concept they seemed unclear about" : "Explores a related aspect of the same topic"}
- Is specific to ${topic || session.topic}
- Difficulty: ${nextDifficulty}
- Is a complete, well-formed question

Return ONLY the question text, nothing else.
`;

      followUp = await hfGenerate(followUpPrompt, 150);
      // Clean up any quotes or prefixes
      followUp = followUp.replace(/^["'\-\*\d\.]+\s*/, "").replace(/["']$/, "").trim();
      if (followUp.length < 10) followUp = null;
    } catch (err) {
      console.warn("Follow-up generation failed:", err.message);
    }

    /* ── Step 3: Save to session ── */
    session.questions.push({
      question,
      userAnswer:  answer,
      aiScore:     evaluation.score,
      aiFeedback:  evaluation.feedback,
      strengths:   evaluation.strengths,
      improvement: evaluation.improvement,
      followUp:    followUp || null,
      questionIndex: questionIndex ?? session.questions.length,
    });

    await session.save();

    res.json({
      success:    true,
      evaluation: {
        score:              evaluation.score,
        feedback:           evaluation.feedback,
        strengths:          evaluation.strengths,
        improvement:        evaluation.improvement,
        adjustedDifficulty: nextDifficulty,
      },
      followUp,
    });
  } catch (err) {
    console.error("Submit answer error:", err);
    res.status(500).json({ message: "Failed to evaluate answer" });
  }
};

/* ══════════════════════════════════════════════════════
   GET HINT
   POST /api/live-interview/hint
   Body: { sessionId, question, topic, role }
══════════════════════════════════════════════════════ */
exports.getHint = async (req, res) => {
  try {
    const { sessionId, question, topic, role } = req.body;

    const session = await LiveInterviewSession.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.hintsUsed >= session.totalHints) {
      return res.status(429).json({ message: "No hints remaining", hintsLeft: 0 });
    }

    const hintPrompt = `You are a helpful interviewer giving a subtle hint to a struggling candidate.

Question: "${question}"
Topic: ${topic || session.topic}
Role: ${role || session.role}

Give a SHORT hint (2-3 sentences max) that:
- Points them in the right direction WITHOUT giving the answer
- Mentions a key concept or framework they should think about
- Is encouraging

Return ONLY the hint text.
`;

    let hint;
    try {
      hint = await hfGenerate(hintPrompt, 200);
      hint = hint.trim();
    } catch {
      hint = `Think about the core concepts of ${topic || session.topic} and how they apply in a ${role || session.role} context. Consider breaking the problem into smaller parts.`;
    }

    session.hintsUsed += 1;
    await session.save();

    res.json({
      hint,
      hintsLeft: session.totalHints - session.hintsUsed,
    });
  } catch (err) {
    console.error("Hint error:", err);
    res.status(500).json({ message: "Failed to generate hint" });
  }
};

/* ══════════════════════════════════════════════════════
   FINISH INTERVIEW
   POST /api/live-interview/finish
══════════════════════════════════════════════════════ */
exports.finishLiveInterview = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await LiveInterviewSession.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    const answered = session.questions;
    const avgScore = answered.length
      ? Math.round((answered.reduce((s, q) => s + (q.aiScore || 0), 0) / answered.length) * 10) / 10
      : 0;

    /* ── Overall summary from HF ── */
    let overallFeedback = "";
    if (answered.length > 0) {
      const qaSummary = answered
        .slice(0, 6) // limit context size
        .map((q, i) => `Q${i + 1} (Score ${q.aiScore}/10): ${q.question}\nAnswer: ${q.userAnswer?.slice(0, 200)}`)
        .join("\n\n");

      const summaryPrompt = `You are a senior technical interviewer providing final feedback.
Role: ${session.role}, Topic: ${session.topic}, Difficulty: ${session.difficulty}

Interview performance (${answered.length} questions, avg score ${avgScore}/10):
${qaSummary}

Write a 4-5 sentence final assessment covering:
1. Overall performance verdict
2. Strongest demonstrated skill
3. Most critical area to improve
4. Specific study recommendation
5. Whether they'd pass this interview round

Be honest, specific, and encouraging. Return ONLY the assessment text.
`;

      try {
        overallFeedback = await hfGenerate(summaryPrompt, 350);
        overallFeedback = overallFeedback.trim();
      } catch {
        overallFeedback = `You completed ${answered.length} questions with an average score of ${avgScore}/10. ${avgScore >= 7 ? "Strong performance overall!" : avgScore >= 5 ? "Decent effort — focus on the areas marked for improvement." : "Keep practicing the fundamentals and try again."} Review each question's feedback to build on your strengths.`;
      }
    }

    session.status          = "COMPLETED";
    session.overallScore    = avgScore;
    session.overallFeedback = overallFeedback;
    await session.save();

    res.json({
      summary: {
        totalQuestions:  answered.length,
        avgScore,
        overallFeedback,
        hintsUsed:       session.hintsUsed,
        questions:       answered,
      },
    });
  } catch (err) {
    console.error("Finish interview error:", err);
    res.status(500).json({ message: "Failed to finish interview" });
  }
};

/* ── GET SESSION ── */
exports.getSession = async (req, res) => {
  try {
    const session = await LiveInterviewSession.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ══════════════════════════════════════════════════════
   FALLBACK QUESTIONS (if HF API is down/rate-limited)
══════════════════════════════════════════════════════ */
function getFallbackQuestions(topic, role, difficulty, count) {
  const bank = {
    conceptual: [
      `Explain the core principles of ${topic} and why they matter in ${role} development.`,
      `What are the key differences between common approaches in ${topic}?`,
      `How does ${topic} handle scalability and performance challenges?`,
      `Walk me through the lifecycle of a typical ${topic} operation.`,
      `What are the most common pitfalls developers face when working with ${topic}?`,
    ],
    practical: [
      `Design a system using ${topic} that handles 1 million concurrent users.`,
      `How would you debug a performance issue in a ${topic}-based application?`,
      `Write pseudocode for implementing a core ${topic} algorithm from scratch.`,
      `How would you test a ${topic} component to ensure reliability?`,
      `Describe how you would optimize an existing ${topic} implementation.`,
    ],
    behavioral: [
      `Tell me about a time you solved a difficult problem using ${topic}.`,
      `How do you stay up-to-date with changes in ${topic} as a ${role}?`,
      `Describe a project where ${topic} was central and what you learned.`,
      `How do you explain complex ${topic} concepts to non-technical stakeholders?`,
    ],
  };

  const all = [...bank.conceptual, ...bank.practical, ...bank.behavioral];
  return all.slice(0, count);
}
