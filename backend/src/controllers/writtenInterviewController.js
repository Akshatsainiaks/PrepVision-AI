const WrittenInterviewSession = require("../models/WrittenInterviewSession");
const OpenAI = require("openai");

const USE_GROQ = Boolean(process.env.GROQ_API_KEY);
const MODEL =
  process.env.AI_MODEL ||
  (USE_GROQ ? "llama-3.1-8b-instant" : "gpt-4o-mini");

const openai = new OpenAI({
  apiKey: USE_GROQ ? process.env.GROQ_API_KEY : process.env.OPENAI_API_KEY,
  ...(USE_GROQ && {
    baseURL: process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1",
  }),
});

const ALLOWED_LEVELS = ["Easy", "Medium", "Hard"];

const normalizeLevel = (level) => {
  if (!level || typeof level !== "string") return null;
  const normalized = level.trim().toLowerCase();
  if (normalized === "easy") return "Easy";
  if (normalized === "medium") return "Medium";
  if (normalized === "hard") return "Hard";
  return null;
};

const parseJson = (raw) => {
  try {
    return JSON.parse(raw);
  } catch {
    const trimmed = String(raw || "").trim();
    const firstBrace = trimmed.indexOf("{");
    const lastBrace = trimmed.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
    }
    const firstBracket = trimmed.indexOf("[");
    const lastBracket = trimmed.lastIndexOf("]");
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
      return JSON.parse(trimmed.slice(firstBracket, lastBracket + 1));
    }
    throw new Error("Invalid JSON response");
  }
};

/* ---------------- START INTERVIEW ---------------- */
exports.startWrittenInterview = async (req, res) => {
  try {
    const { topic, level } = req.body;

    if (!topic || !level) {
      return res.status(400).json({ message: "Topic & level required" });
    }

    const normalizedLevel = normalizeLevel(level);
    if (!normalizedLevel) {
      return res.status(400).json({
        message: `Level must be one of: ${ALLOWED_LEVELS.join(", ")}`,
      });
    }

    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const prompt = `
Generate 5 ${normalizedLevel} level interview questions on the topic "${topic}".
Return ONLY valid JSON in this exact shape:
{ "questions": ["question 1", "question 2", "question 3", "question 4", "question 5"] }
`;

    let aiRes;
    try {
      aiRes = await openai.chat.completions.create({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });
    } catch (err) {
      const msg = err.error?.message || err.message || "";
      if (msg.toLowerCase().includes("response_format")) {
        try {
          aiRes = await openai.chat.completions.create({
            model: MODEL,
            messages: [{ role: "user", content: prompt }],
          });
        } catch (err2) {
          console.error("AI API Error:", err2);
          return res.status(502).json({
            message: "AI generation failed",
            error: err2.error?.message || err2.message,
          });
        }
      } else {
        console.error("AI API Error:", err);
        return res.status(502).json({
          message: "AI generation failed",
          error: msg,
        });
      }
    }

    // 🛡 Safe JSON parsing
    const raw = aiRes.choices?.[0]?.message?.content || "";
    let parsed;
    try {
      parsed = parseJson(raw);
    } catch (err) {
      console.error("Parse Error:", err);
      return res.status(502).json({
        message: "Invalid AI response",
      });
    }

    let questionList = [];
    if (Array.isArray(parsed)) {
      questionList = parsed;
    } else if (Array.isArray(parsed.questions)) {
      questionList = parsed.questions;
    }

    const questions = questionList.filter(
      (q) => typeof q === "string" && q.trim()
    );

    if (questions.length === 0) {
      return res.status(502).json({ message: "AI returned no questions" });
    }

    const session = await WrittenInterviewSession.create({
      user: req.user._id,
      topic,
      level: normalizedLevel,
      questions: questions.map((q) => ({ question: q })),
      status: "ONGOING",
    });

    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to start interview" });
  }
};

/* ---------------- SUBMIT ANSWER ---------------- */
exports.submitWrittenAnswer = async (req, res) => {
  try {
    const { sessionId, index, answer } = req.body;

    if (!sessionId || index === undefined) {
      return res.status(400).json({ message: "Missing sessionId or index" });
    }

    const idx = Number(index);
    if (!Number.isInteger(idx) || idx < 0) {
      return res.status(400).json({ message: "Invalid question index" });
    }

    if (!answer || typeof answer !== "string" || answer.trim().length < 2) {
      return res.status(400).json({ message: "Answer is too short" });
    }

    const session = await WrittenInterviewSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (!session.questions[idx]) {
      return res.status(400).json({ message: "Invalid question index" });
    }

    const questionText = session.questions[idx].question;

    const evalPrompt = `
Evaluate this interview answer.

Question: ${questionText}
Answer: ${answer}

Respond ONLY in JSON:
{
  "score": number,
  "feedback": string,
  "correctAnswer": string
}
`;

    let aiRes;
    try {
      aiRes = await openai.chat.completions.create({
        model: MODEL,
        messages: [{ role: "user", content: evalPrompt }],
        response_format: { type: "json_object" },
      });
    } catch (err) {
      const msg = err.error?.message || err.message || "";
      if (msg.toLowerCase().includes("response_format")) {
        try {
          aiRes = await openai.chat.completions.create({
            model: MODEL,
            messages: [{ role: "user", content: evalPrompt }],
          });
        } catch (err2) {
          console.error("AI API Error:", err2);
          return res.status(502).json({
            message: "AI evaluation failed",
            error: err2.error?.message || err2.message,
          });
        }
      } else {
        console.error("AI API Error:", err);
        return res.status(502).json({
          message: "AI evaluation failed",
          error: msg,
        });
      }
    }

    const raw = aiRes.choices?.[0]?.message?.content || "";
    let result;
    try {
      result = parseJson(raw);
    } catch (err) {
      console.error("Parse Error:", err);
      return res.status(502).json({ message: "Invalid AI response" });
    }

    session.questions[idx].userAnswer = answer;
    session.questions[idx].aiScore =
      typeof result.score === "number" ? result.score : 0;
    session.questions[idx].aiFeedback = result.feedback || "";
    session.questions[idx].correctAnswer = result.correctAnswer || "";

    await session.save();

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Evaluation failed" });
  }
};

/* ---------------- FINISH INTERVIEW ---------------- */
exports.finishWrittenInterview = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await WrittenInterviewSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const scores = session.questions
      .map((q) => q.aiScore || 0);

    const total = scores.reduce((a, b) => a + b, 0);
    session.overallScore = scores.length ? total / scores.length : 0;

    session.status = "COMPLETED";
    await session.save();

    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Finish failed" });
  }
};
