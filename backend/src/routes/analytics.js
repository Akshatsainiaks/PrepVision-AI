// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");
// const InterviewSession = require("../models/InterviewSession");

// // Calculate analytics for charts
// router.get("/", auth, async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const sessions = await InterviewSession.find({ user: userId })
//       .sort({ createdAt: 1 });

//     if (!sessions.length) {
//       return res.json({
//         trend: [],
//         topicStats: [],
//         totalSessions: 0
//       });
//     }

//     // 1️⃣ Trend Chart: Avg score per interview
//     const trend = sessions.map(s => {
//       const avg =
//         s.questions.reduce((sum, q) => sum + (q.aiScore || 0), 0) /
//         s.questions.length;

//       return {
//         date: new Date(s.createdAt).toLocaleDateString(),
//         score: Number(avg.toFixed(1))
//       };
//     });

//     // 2️⃣ Topic Chart: Count of mistakes per topic
//     const topicMap = {};

//     sessions.forEach(s => {
//       s.questions.forEach(q => {
//         const tag = q.topic || "General";
//         if (!topicMap[tag]) topicMap[tag] = { topic: tag, mistakes: 0 };

//         if ((q.aiScore || 0) < 5) topicMap[tag].mistakes += 1;
//       });
//     });

//     const topicStats = Object.values(topicMap);

//     res.json({
//       trend,
//       topicStats,
//       totalSessions: sessions.length
//     });

//   } catch (err) {
//     console.error("Analytics error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");
// const InterviewSession = require("../models/InterviewSession");

// /**
//  * GET /dashboard/analytics
//  */
// router.get("/analytics", auth, async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const sessions = await InterviewSession.find({ user: userId })
//       .sort({ createdAt: 1 })
//       .lean();

//     if (!sessions.length) {
//       return res.json({
//         trend: [],
//         topicStats: [],
//         totalSessions: 0,
//       });
//     }

//     /* ================== TREND (avg score per session) ================== */
//     const trend = sessions.map((s) => {
//       const total = s.questions.reduce(
//         (sum, q) => sum + (q.aiScore ?? 0),
//         0
//       );

//       const avg = total / s.questions.length;

//       return {
//         date: s.createdAt.toISOString().slice(0, 10), // YYYY-MM-DD
//         score: Number(avg.toFixed(1)), // 0–10 scale
//       };
//     });

//     /* ================== WEAK TOPICS ================== */
//     const topicMap = {};

//     sessions.forEach((s) => {
//       s.questions.forEach((q) => {
//         const topic = q.topic || "General";
//         if (!topicMap[topic]) {
//           topicMap[topic] = { topic, mistakes: 0 };
//         }

//         if ((q.aiScore ?? 0) < 5) {
//           topicMap[topic].mistakes += 1;
//         }
//       });
//     });

//     const topicStats = Object.values(topicMap)
//       .sort((a, b) => b.mistakes - a.mistakes)
//       .slice(0, 6); // top weak topics only

//     res.json({
//       trend,
//       topicStats,
//       totalSessions: sessions.length,
//     });
//   } catch (err) {
//     console.error("Dashboard analytics error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const InterviewSession = require("../models/InterviewSession");
const WrittenInterviewSession = require("../models/WrittenInterviewSession");

router.get("/analytics", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    /* ================= LIVE INTERVIEWS ================= */
    const liveSessions = await InterviewSession.find({ user: userId }).lean();

    const liveTrend = liveSessions.map((s) => {
      const total = s.questions.reduce((sum, q) => sum + (q.aiScore || 0), 0);
      const avg = total / (s.questions.length || 1);

      return {
        date: s.createdAt.toISOString().slice(0, 10),
        score: Number(avg.toFixed(1)),
        type: "LIVE",
      };
    });

    /* ================= WRITTEN INTERVIEWS ================= */
    const writtenSessions = await WrittenInterviewSession.find({
      user: userId,
      status: "COMPLETED",
    }).lean();

    const writtenTrend = writtenSessions.map((s) => ({
      date: s.createdAt.toISOString().slice(0, 10),
      score: Number((s.overallScore || 0).toFixed(1)),
      type: "WRITTEN",
    }));

    /* ================= MERGE ================= */
    const trend = [...liveTrend, ...writtenTrend].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    res.json({
      trend,
      totalSessions: trend.length,
      topicStats: [], // keep empty for now (live-only feature)
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
