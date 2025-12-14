const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const InterviewSession = require("../models/InterviewSession");

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const sessions = await InterviewSession.find({ user: userId });

    if (!sessions.length) {
      return res.json({
        weaknesses: [],
        recommendations: [
          "Start a few mock interviews to build your initial profile.",
          "Try a beginner-friendly DSA and System Design session."
        ]
      });
    }

    // Topic → { lowScores: X, total: Y }
    const topicMap = {};

    sessions.forEach((s) => {
      s.questions.forEach((q) => {
        const topic = q.topic || "General";

        if (!topicMap[topic]) {
          topicMap[topic] = { total: 0, lowScores: 0 };
        }

        topicMap[topic].total++;

        if ((q.aiScore || 0) < 5) {
          topicMap[topic].lowScores++;
        }
      });
    });

    const weaknesses = Object.entries(topicMap)
      .map(([topic, stats]) => ({
        topic,
        weaknessScore: stats.lowScores / stats.total
      }))
      .filter((t) => t.weaknessScore > 0.3) // show only real weak areas
      .sort((a, b) => b.weaknessScore - a.weaknessScore);

    // Auto Recommendations
    const recommendations = weaknesses.length
      ? weaknesses.map((w) => {
          if (w.topic.toLowerCase().includes("dsa")) {
            return "Practice more DSA — focus on problem breakdown & patterns.";
          }
          if (w.topic.toLowerCase().includes("system")) {
            return "Improve System Design — emphasize scalability & trade-offs.";
          }
          if (w.topic.toLowerCase().includes("behavioral")) {
            return "Work on STAR format for behavioral interviews.";
          }
          return `Spend more time strengthening your ${w.topic} fundamentals.`;
        })
      : [
          "You're performing well! Continue practicing mock interviews.",
          "Try different companies & roles to diversify your preparation."
        ];

    res.json({
      weaknesses,
      recommendations
    });

  } catch (err) {
    console.error("Weakness Insights Error:", err);
    res.status(500).json({ message: "Server error generating insights" });
  }
});

module.exports = router;
