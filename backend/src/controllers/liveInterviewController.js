const LiveInterviewSession = require("../models/LiveInterviewSession");

exports.startLiveInterview = async (req, res) => {
  const { topic, role } = req.body;

  const session = await LiveInterviewSession.create({
    user: req.user.id,
    topic,
    role,
    questions: [],
  });

  res.json(session);
};

exports.submitLiveAnswer = async (req, res) => {
  const { sessionId, question, answer } = req.body;

  const session = await LiveInterviewSession.findById(sessionId);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  session.questions.push({
    question,
    userAnswer: answer,
  });

  await session.save();
  res.json({ success: true });
};

exports.finishLiveInterview = async (req, res) => {
  const { sessionId } = req.body;

  const session = await LiveInterviewSession.findById(sessionId);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  session.status = "COMPLETED";
  await session.save();

  res.json(session);
};
