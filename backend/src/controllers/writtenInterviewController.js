// const WrittenInterviewSession = require("../models/WrittenInterviewSession");
// const OpenAI = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// /* ---------------- START INTERVIEW ---------------- */
// exports.startWrittenInterview = async (req, res) => {
//   try {
//     const { topic, level } = req.body;

//     if (!topic || !level) {
//       return res.status(400).json({ message: "Topic & level required" });
//     }

//     const prompt = `
// Generate 5 ${level} level interview questions on the topic "${topic}".
// Return ONLY a valid JSON array of strings.
// `;

//     const aiRes = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//     });

//     // 🛡 Safe JSON parsing
//     const raw = aiRes.choices[0].message.content
//       .replace(/```json|```/g, "")
//       .trim();

//     const questions = JSON.parse(raw);

//     const session = await WrittenInterviewSession.create({
//       user: req.user.id,
//       topic,
//       level,
//       questions: questions.map((q) => ({ question: q })),
//       status: "ONGOING",
//     });

//     res.json(session);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to start interview" });
//   }
// };

// /* ---------------- SUBMIT ANSWER ---------------- */
// exports.submitWrittenAnswer = async (req, res) => {
//   try {
//     const { sessionId, index, answer } = req.body;

//     const session = await WrittenInterviewSession.findById(sessionId);
//     if (!session) {
//       return res.status(404).json({ message: "Session not found" });
//     }

//     if (!session.questions[index]) {
//       return res.status(400).json({ message: "Invalid question index" });
//     }

//     const questionText = session.questions[index].question;

//     const evalPrompt = `
// Evaluate this interview answer.

// Question: ${questionText}
// Answer: ${answer}

// Respond ONLY in JSON:
// {
//   "score": number,
//   "feedback": string,
//   "correctAnswer": string
// }
// `;

//     const aiRes = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: evalPrompt }],
//     });

//     const raw = aiRes.choices[0].message.content
//       .replace(/```json|```/g, "")
//       .trim();

//     const result = JSON.parse(raw);

//     session.questions[index].userAnswer = answer;
//     session.questions[index].aiScore = result.score;
//     session.questions[index].aiFeedback = result.feedback;
//     session.questions[index].correctAnswer = result.correctAnswer;

//     await session.save();

//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Evaluation failed" });
//   }
// };

// /* ---------------- FINISH INTERVIEW ---------------- */
// exports.finishWrittenInterview = async (req, res) => {
//   try {
//     const { sessionId } = req.body;

//     const session = await WrittenInterviewSession.findById(sessionId);
//     if (!session) {
//       return res.status(404).json({ message: "Session not found" });
//     }

//     const scores = session.questions
//       .map((q) => q.aiScore || 0);

//     session.overallScore =
//       scores.reduce((a, b) => a + b, 0) / scores.length;

//     session.status = "COMPLETED";
//     await session.save();

//     res.json(session);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Finish failed" });
//   }
// };


// const WrittenInterviewSession = require("../models/WrittenInterviewSession");
// const { generateQuestions, evaluateAnswer } = require("../services/huggingfaceService");

// /* ---------------- START INTERVIEW ---------------- */
// exports.startWrittenInterview = async (req, res) => {
//   try {
//     const { topic, level } = req.body;

//     if (!topic || !level) {
//       return res.status(400).json({ message: "Topic & level required" });
//     }

//     console.log(`🚀 Generating questions for ${topic} at ${level} level...`);

//     // Use Hugging Face to generate questions
//     const questionsWithAnswers = await generateQuestions(topic, level, 5);

//     const session = await WrittenInterviewSession.create({
//       user: req.user.id,
//       topic,
//       level,
//       questions: questionsWithAnswers.map((q) => ({ 
//         question: q.question,
//         correctAnswer: q.correctAnswer
//       })),
//       status: "ONGOING",
//     });

//     console.log(`✅ Session created: ${session._id}`);

//     // Send questions WITHOUT correct answers
//     const sessionResponse = {
//       ...session.toObject(),
//       questions: session.questions.map(q => ({
//         question: q.question,
//         _id: q._id
//       }))
//     };

//     res.json(sessionResponse);
//   } catch (err) {
//     console.error('❌ Start interview error:', err);
//     res.status(500).json({ message: "Failed to start interview" });
//   }
// };

// /* ---------------- SUBMIT ANSWER ---------------- */
// exports.submitWrittenAnswer = async (req, res) => {
//   try {
//     const { sessionId, index, answer } = req.body;

//     const session = await WrittenInterviewSession.findById(sessionId);
//     if (!session) {
//       return res.status(404).json({ message: "Session not found" });
//     }

//     if (!session.questions[index]) {
//       return res.status(400).json({ message: "Invalid question index" });
//     }

//     const questionText = session.questions[index].question;
//     const correctAnswer = session.questions[index].correctAnswer;

//     console.log(`📝 Evaluating answer for question ${index + 1}...`);

//     // Use Hugging Face to evaluate
//     const evaluation = await evaluateAnswer(questionText, answer, correctAnswer);

//     session.questions[index].userAnswer = answer;
//     session.questions[index].aiScore = evaluation.score;
//     session.questions[index].aiFeedback = evaluation.feedback;

//     await session.save();

//     console.log(`✅ Answer evaluated with score: ${evaluation.score}`);

//     res.json({
//       score: evaluation.score,
//       feedback: evaluation.feedback
//     });
//   } catch (err) {
//     console.error('❌ Submit answer error:', err);
//     res.status(500).json({ message: "Evaluation failed" });
//   }
// };

// /* ---------------- FINISH INTERVIEW ---------------- */
// exports.finishWrittenInterview = async (req, res) => {
//   try {
//     const { sessionId } = req.body;

//     const session = await WrittenInterviewSession.findById(sessionId);
//     if (!session) {
//       return res.status(404).json({ message: "Session not found" });
//     }

//     const scores = session.questions.map((q) => q.aiScore || 0);

//     session.overallScore =
//       scores.reduce((a, b) => a + b, 0) / scores.length;

//     session.status = "COMPLETED";
//     await session.save();

//     console.log(`🏁 Interview finished. Overall score: ${session.overallScore}`);

//     res.json(session);
//   } catch (err) {
//     console.error('❌ Finish interview error:', err);
//     res.status(500).json({ message: "Finish failed" });
//   }
// };

// const WrittenInterviewSession = require("../models/WrittenInterviewSession");
// // Ensure these names match the service file exactly
// const { generateQuestions, evaluateAnswer } = require("../services/huggingfaceService");

// /* ---------------- START INTERVIEW ---------------- */
// exports.startWrittenInterview = async (req, res) => {
//   try {
//     const { topic, level } = req.body;
//     if (!topic || !level) return res.status(400).json({ message: "Topic & level required" });

//     console.log(`🚀 Generating questions for ${topic} at ${level} level...`);
    
//     // Safety check: ensure generateQuestions exists before calling
//     if (typeof generateQuestions !== 'function') {
//         throw new Error("generateQuestions is not defined. Check your service exports.");
//     }

//     const questionsWithAnswers = await generateQuestions(topic, level, 5);

//     const session = await WrittenInterviewSession.create({
//       user: req.user.id,
//       topic,
//       level,
//       questions: questionsWithAnswers.map((q) => ({ 
//         question: q.question,
//         correctAnswer: q.correctAnswer
//       })),
//       status: "ONGOING",
//     });

//     res.json({
//       ...session.toObject(),
//       questions: session.questions.map(q => ({ question: q.question, _id: q._id }))
//     });
//   } catch (err) {
//     console.error('❌ Start interview error:', err);
//     res.status(500).json({ message: err.message || "Failed to start interview" });
//   }
// };

// /* ---------------- SUBMIT ANSWER ---------------- */
// exports.submitWrittenAnswer = async (req, res) => {
//   try {
//     const { sessionId, index, answer } = req.body;
//     const session = await WrittenInterviewSession.findById(sessionId);
//     if (!session || !session.questions[index]) return res.status(404).json({ message: "Invalid session or index" });

//     const evaluation = await evaluateAnswer(
//         session.questions[index].question, 
//         answer, 
//         session.questions[index].correctAnswer
//     );

//     session.questions[index].userAnswer = answer;
//     session.questions[index].aiScore = evaluation.score;
//     session.questions[index].aiFeedback = evaluation.feedback;
//     await session.save();

//     res.json({ score: evaluation.score, feedback: evaluation.feedback });
//   } catch (err) {
//     console.error('❌ Submit answer error:', err);
//     res.status(500).json({ message: "Evaluation failed" });
//   }
// };

// /* ---------------- FINISH INTERVIEW ---------------- */
// exports.finishWrittenInterview = async (req, res) => {
//   try {
//     const { sessionId } = req.body;
//     const session = await WrittenInterviewSession.findById(sessionId);
//     if (!session) return res.status(404).json({ message: "Session not found" });

//     const scores = session.questions.map((q) => q.aiScore || 0);
//     session.overallScore = scores.reduce((a, b) => a + b, 0) / (scores.length || 1);
//     session.status = "COMPLETED";
//     await session.save();

//     res.json(session);
//   } catch (err) {
//     res.status(500).json({ message: "Finish failed" });
//   }
// };

// /* ---------------- GET SESSION ---------------- */
// exports.getInterviewSession = async (req, res) => {
//   try {
//     const session = await WrittenInterviewSession.findById(req.params.id);
//     if (!session) return res.status(404).json({ message: "Session not found" });
//     res.json(session);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


//next acc claude code
const WrittenInterviewSession = require("../models/WrittenInterviewSession");
const { generateQuestions, evaluateAnswer } = require("../services/huggingfaceService");
const { notifyInterviewComplete } = require("../helpers/notificationHelper");

/* ---------------- START INTERVIEW ---------------- */
exports.startWrittenInterview = async (req, res) => {
  try {
    const { topic, level } = req.body;
    if (!topic || !level) return res.status(400).json({ message: "Topic & level required" });

    console.log(`🚀 Generating questions for ${topic} at ${level} level...`);

    if (typeof generateQuestions !== "function") {
      throw new Error("generateQuestions is not defined. Check your service exports.");
    }

    const questionsWithAnswers = await generateQuestions(topic, level, 5);

    const session = await WrittenInterviewSession.create({
      user: req.user.id,
      topic,
      level,
      questions: questionsWithAnswers.map((q) => ({
        question: q.question,
        correctAnswer: q.correctAnswer,
      })),
      status: "ONGOING",
    });

    res.json({
      ...session.toObject(),
      questions: session.questions.map((q) => ({ question: q.question, _id: q._id })),
    });
  } catch (err) {
    console.error("❌ Start interview error:", err);
    res.status(500).json({ message: err.message || "Failed to start interview" });
  }
};

/* ---------------- SUBMIT ANSWER ---------------- */
exports.submitWrittenAnswer = async (req, res) => {
  try {
    const { sessionId, index, answer } = req.body;
    const session = await WrittenInterviewSession.findById(sessionId);
    if (!session || !session.questions[index])
      return res.status(404).json({ message: "Invalid session or index" });

    const evaluation = await evaluateAnswer(
      session.questions[index].question,
      answer,
      session.questions[index].correctAnswer
    );

    session.questions[index].userAnswer = answer;
    session.questions[index].aiScore = evaluation.score;
    session.questions[index].aiFeedback = evaluation.feedback;
    await session.save();

    res.json({ score: evaluation.score, feedback: evaluation.feedback });
  } catch (err) {
    console.error("❌ Submit answer error:", err);
    res.status(500).json({ message: "Evaluation failed" });
  }
};

/* ---------------- FINISH INTERVIEW ---------------- */
exports.finishWrittenInterview = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await WrittenInterviewSession.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    // Calculate overall score
    const scores = session.questions.map((q) => q.aiScore || 0);
    session.overallScore = scores.reduce((a, b) => a + b, 0) / (scores.length || 1);
    session.status = "COMPLETED";
    await session.save();

    // ✅ Notify user — fire and forget, never block the response
    const roundedScore = Math.round(session.overallScore * 10) / 10;
    notifyInterviewComplete(req.user.id, session.topic, roundedScore).catch((err) =>
      console.error("❌ Interview notification failed:", err)
    );

    res.json(session);
  } catch (err) {
    console.error("❌ Finish interview error:", err);
    res.status(500).json({ message: "Finish failed" });
  }
};

/* ---------------- GET SESSION ---------------- */
exports.getInterviewSession = async (req, res) => {
  try {
    const session = await WrittenInterviewSession.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};