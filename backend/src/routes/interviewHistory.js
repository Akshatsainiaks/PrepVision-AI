// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");
// const InterviewSession = require("../models/InterviewSession");

// // Get last 5 interview sessions
// router.get("/", auth, async (req, res) => {
//   try {
//     const sessions = await InterviewSession.find({ user: req.user.id })
//       .sort({ createdAt: -1 })
//       .limit(5);

//     res.json({ sessions });
//   } catch (err) {
//     console.error("Error fetching interview history:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const InterviewSession = require("../models/InterviewSession");
const WrittenInterviewSession = require("../models/WrittenInterviewSession");

/**
 * GET /api/interview-history
 * Returns recent LIVE + WRITTEN interviews
 */
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    /* ================= LIVE INTERVIEWS ================= */
    const liveSessions = await InterviewSession.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const live = liveSessions.map((s) => ({
      ...s,
      type: "LIVE",
    }));

    /* ================= WRITTEN INTERVIEWS ================= */
    const writtenSessions = await WrittenInterviewSession.find({
      user: userId,
      status: "COMPLETED",
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const written = writtenSessions.map((s) => ({
      ...s,
      type: "WRITTEN",
    }));

    /* ================= MERGE & SORT ================= */
    const sessions = [...live, ...written]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    res.json({ sessions });
  } catch (err) {
    console.error("Error fetching interview history:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
