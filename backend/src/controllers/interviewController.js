const InterviewSession = require("../models/InterviewSession");
const InterviewQuestion = require("../models/InterviewQuestion");
const OpenAI = require("openai");

// OpenAI Client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --------------------------
// START INTERVIEW
// --------------------------
exports.startInterview = async (req, res) => {
  try {
    const { company, role } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: "Company and role are required" });
    }

    // Fetch 5 random questions
    const questions = await InterviewQuestion.aggregate([
      { $match: { company, role } },
      { $sample: { size: 5 } },
    ]);

    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found for this role" });
    }

    const session = await InterviewSession.create({
      user: req.user._id,
      company,
      role,
      questions: questions.map((q) => ({ question: q.question })),
    });

    res.json(session);
  } catch (err) {
    console.error("StartInterview Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------
// SUBMIT ANSWER
// --------------------------
exports.submitAnswer = async (req, res) => {
  try {
    const { sessionId, index, answer } = req.body;

    if (!sessionId || index === undefined) {
      return res.status(400).json({ message: "Missing sessionId or index" });
    }

    const session = await InterviewSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (!session.questions[index]) {
      return res.status(400).json({ message: "Invalid question index" });
    }

    if (!answer || answer.trim().length < 2) {
      return res.status(400).json({ message: "Answer is too short" });
    }

    const questionText = session.questions[index].question;

    // -----------------------------------------------
    // AI Prompt
    // -----------------------------------------------
    const prompt = `
Evaluate this interview answer strictly.
Question: ${questionText}
Answer: ${answer}

Provide:
1. Detailed feedback (3–5 lines)
2. Score (only a number out of 10)
Respond in this format:

### Feedback:
<feedback here>

### Score:
<score/10>
`;

    // -----------------------------------------------
    // OpenAI call with retry for rate-limit
    // -----------------------------------------------
    let output;
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      output = response.choices[0].message.content;
    } catch (err) {
      console.error("OpenAI API Error:", err);
      return res.status(500).json({
        message: "AI evaluation failed",
        error: err.error?.message || err.message,
      });
    }

    // -----------------------------------------------
    // Extract score safely
    // -----------------------------------------------
    const scoreMatch = output.match(/(\d{1,2})\s*\/\s*10/);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 5;

    // -----------------------------------------------
    // Save results
    // -----------------------------------------------
    session.questions[index].answer = answer;
    session.questions[index].aiFeedback = output;
    session.questions[index].aiScore = score;

    await session.save();

    res.json(session.questions[index]);
  } catch (err) {
    console.error("submitAnswer Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// --------------------------
// FINISH INTERVIEW
// --------------------------
exports.finishInterview = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await InterviewSession.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    res.json(session);
  } catch (err) {
    console.error("FinishInterview Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
