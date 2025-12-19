const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const WrittenInterviewSession = require("../models/WrittenInterviewSession");

const {
  startWrittenInterview,
  submitWrittenAnswer,
  finishWrittenInterview,
} = require("../controllers/writtenInterviewController");

router.post("/start", auth, startWrittenInterview);
router.post("/answer", auth, submitWrittenAnswer);
router.post("/finish", auth, finishWrittenInterview);

router.get("/session/:id", auth, async (req, res) => {
  try {
    const session = await WrittenInterviewSession.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch session" });
  }
});

module.exports = router;
