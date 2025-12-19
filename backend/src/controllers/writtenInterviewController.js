const WrittenInterviewSession = require("../models/WrittenInterviewSession");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* ---------------- START INTERVIEW ---------------- */
exports.startWrittenInterview = async (req, res) => {
  try {
    const { topic, level } = req.body;

    if (!topic || !level) {
      return res.status(400).json({ message: "Topic & level required" });
    }

    const prompt = `
Generate 5 ${level} level interview questions on the topic "${topic}".
Return ONLY a valid JSON array of strings.
`;

    const aiRes = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    // 🛡 Safe JSON parsing
    const raw = aiRes.choices[0].message.content
      .replace(/```json|```/g, "")
      .trim();

    const questions = JSON.parse(raw);

    const session = await WrittenInterviewSession.create({
      user: req.user.id,
      topic,
      level,
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

    const session = await WrittenInterviewSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (!session.questions[index]) {
      return res.status(400).json({ message: "Invalid question index" });
    }

    const questionText = session.questions[index].question;

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

    const aiRes = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: evalPrompt }],
    });

    const raw = aiRes.choices[0].message.content
      .replace(/```json|```/g, "")
      .trim();

    const result = JSON.parse(raw);

    session.questions[index].userAnswer = answer;
    session.questions[index].aiScore = result.score;
    session.questions[index].aiFeedback = result.feedback;
    session.questions[index].correctAnswer = result.correctAnswer;

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

    session.overallScore =
      scores.reduce((a, b) => a + b, 0) / scores.length;

    session.status = "COMPLETED";
    await session.save();

    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Finish failed" });
  }
};
