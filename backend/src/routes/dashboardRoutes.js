const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const InterviewSession = require("../models/InterviewSession");
const WrittenInterviewSession = require("../models/WrittenInterviewSession");

/**
 * GET /api/dashboard/summary
 * Returns real-time dashboard metrics:
 * - performance: avg score across all sessions
 * - todayMocks: number of mocks done today
 * - totalSessions: total interview count
 * - topicStats: weak topic breakdown for bar chart
 */
router.get("/summary", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    /* ── Fetch all sessions ── */
    const [liveSessions, writtenSessions] = await Promise.all([
      InterviewSession.find({ user: userId }).lean(),
      WrittenInterviewSession.find({ user: userId, status: "COMPLETED" }).lean(),
    ]);

    /* ── Performance: avg score across all sessions ── */
    let totalScore = 0;
    let totalCount = 0;

    liveSessions.forEach((s) => {
      if (s.questions?.length) {
        const avg =
          s.questions.reduce((sum, q) => sum + (q.aiScore || 0), 0) /
          s.questions.length;
        totalScore += avg;
        totalCount++;
      }
    });

    writtenSessions.forEach((s) => {
      if (s.overallScore != null) {
        totalScore += s.overallScore;
        totalCount++;
      }
    });

    const performance =
      totalCount > 0
        ? Math.round((totalScore / totalCount / 10) * 100) // convert /10 score to %
        : 0;

    /* ── Today's Mocks: sessions created today ── */
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayLive = liveSessions.filter(
      (s) => new Date(s.createdAt) >= todayStart
    ).length;

    const todayWritten = writtenSessions.filter(
      (s) => new Date(s.createdAt) >= todayStart
    ).length;

    const todayMocks = todayLive + todayWritten;

    /* ── Total Sessions ── */
    const totalSessions = liveSessions.length + writtenSessions.length;

    /* ── Topic Stats: for bar chart (mistakes per topic) ── */
    const topicMap = {};

    liveSessions.forEach((s) => {
      (s.questions || []).forEach((q) => {
        const topic = q.topic || "General";
        if (!topicMap[topic]) topicMap[topic] = { mistakes: 0, total: 0 };
        topicMap[topic].total++;
        if ((q.aiScore || 0) < 5) topicMap[topic].mistakes++;
      });
    });

    const topicStats = Object.entries(topicMap)
      .map(([topic, stats]) => ({ topic, mistakes: stats.mistakes, total: stats.total }))
      .filter((t) => t.mistakes > 0)
      .sort((a, b) => b.mistakes - a.mistakes)
      .slice(0, 6); // top 6 weak topics

    res.json({
      performance,   // e.g. 78
      todayMocks,    // e.g. 2
      totalSessions, // e.g. 14
      topicStats,    // e.g. [{ topic: "DSA", mistakes: 5, total: 8 }]
    });
  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ── Keep existing analytics route ── */
router.get("/analytics", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const [liveSessions, writtenSessions] = await Promise.all([
      InterviewSession.find({ user: userId }).lean(),
      WrittenInterviewSession.find({ user: userId, status: "COMPLETED" }).lean(),
    ]);

    const liveTrend = liveSessions.map((s) => {
      const total = s.questions.reduce((sum, q) => sum + (q.aiScore || 0), 0);
      const avg = total / (s.questions.length || 1);
      return {
        date: s.createdAt.toISOString().slice(0, 10),
        score: Number(avg.toFixed(1)),
        type: "LIVE",
      };
    });

    const writtenTrend = writtenSessions.map((s) => ({
      date: s.createdAt.toISOString().slice(0, 10),
      score: Number((s.overallScore || 0).toFixed(1)),
      type: "WRITTEN",
    }));

    const trend = [...liveTrend, ...writtenTrend].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    /* ── Topic stats also returned here for AnalyticsCharts ── */
    const topicMap = {};
    liveSessions.forEach((s) => {
      (s.questions || []).forEach((q) => {
        const topic = q.topic || "General";
        if (!topicMap[topic]) topicMap[topic] = { mistakes: 0, total: 0 };
        topicMap[topic].total++;
        if ((q.aiScore || 0) < 5) topicMap[topic].mistakes++;
      });
    });

    const topicStats = Object.entries(topicMap)
      .map(([topic, stats]) => ({ topic, mistakes: stats.mistakes, total: stats.total }))
      .filter((t) => t.mistakes > 0)
      .sort((a, b) => b.mistakes - a.mistakes)
      .slice(0, 6);

    res.json({
      trend,
      totalSessions: trend.length,
      topicStats, // ✅ now populated
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;