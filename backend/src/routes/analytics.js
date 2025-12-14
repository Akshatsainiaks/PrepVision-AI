const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const InterviewSession = require("../models/InterviewSession");

// Calculate analytics for charts
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const sessions = await InterviewSession.find({ user: userId })
      .sort({ createdAt: 1 });

    if (!sessions.length) {
      return res.json({
        trend: [],
        topicStats: [],
        totalSessions: 0
      });
    }

    // 1️⃣ Trend Chart: Avg score per interview
    const trend = sessions.map(s => {
      const avg =
        s.questions.reduce((sum, q) => sum + (q.aiScore || 0), 0) /
        s.questions.length;

      return {
        date: new Date(s.createdAt).toLocaleDateString(),
        score: Number(avg.toFixed(1))
      };
    });

    // 2️⃣ Topic Chart: Count of mistakes per topic
    const topicMap = {};

    sessions.forEach(s => {
      s.questions.forEach(q => {
        const tag = q.topic || "General";
        if (!topicMap[tag]) topicMap[tag] = { topic: tag, mistakes: 0 };

        if ((q.aiScore || 0) < 5) topicMap[tag].mistakes += 1;
      });
    });

    const topicStats = Object.values(topicMap);

    res.json({
      trend,
      topicStats,
      totalSessions: sessions.length
    });

  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
