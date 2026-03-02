const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const InterviewSession = require("../models/InterviewSession");
const WrittenInterviewSession = require("../models/WrittenInterviewSession");
const { checkAndNotifyStreak } = require("../helpers/streakHelper"); // ✅ shared helper

/**
 * GET /api/streak
 */
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const [liveSessions, writtenSessions] = await Promise.all([
      InterviewSession.find({ user: userId }).select("createdAt").lean(),
      WrittenInterviewSession.find({ user: userId, status: "COMPLETED" })
        .select("createdAt")
        .lean(),
    ]);

    const allDates = [...liveSessions, ...writtenSessions].map((s) =>
      new Date(s.createdAt).toISOString().slice(0, 10)
    );

    if (!allDates.length) {
      return res.json({ streak: 0, lastActive: null, activeDaysThisWeek: [] });
    }

    const uniqueDays = [...new Set(allDates)]
      .map((d) => new Date(d))
      .sort((a, b) => b - a);

    /* ── Calculate streak ── */
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < uniqueDays.length; i++) {
      const day = new Date(uniqueDays[i]);
      day.setHours(0, 0, 0, 0);
      const diffDays = (today.getTime() - day.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays === i) streak++;
      else break;
    }

    /* ── Active days this week ── */
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const activeDaysThisWeek = [
      ...new Set(
        [...liveSessions, ...writtenSessions]
          .map((s) => new Date(s.createdAt))
          .filter((d) => d >= startOfWeek && d <= endOfWeek)
          .map((d) => d.getDay())
      ),
    ];

    // ✅ Still notify from here too — helper deduplicates with DB check
    checkAndNotifyStreak(userId).catch(() => {});

    res.json({
      streak,
      lastActive: uniqueDays[0],
      activeDaysThisWeek,
    });
  } catch (err) {
    console.error("Streak error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;