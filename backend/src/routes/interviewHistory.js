const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const InterviewSession = require("../models/InterviewSession");

// Get last 5 interview sessions
router.get("/", auth, async (req, res) => {
  try {
    const sessions = await InterviewSession.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ sessions });
  } catch (err) {
    console.error("Error fetching interview history:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
