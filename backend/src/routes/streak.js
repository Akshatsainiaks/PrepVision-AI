// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");
// const User = require("../models/User");

// // GET USER STREAK
// router.get("/", auth, async (req, res) => {
//   try {
//     const user = req.user;

//     res.json({
//       streak: user.streak || 0,
//       lastActive: user.lastActive || null,
//     });
//   } catch (err) {
//     console.error("Streak fetch error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // UPDATE STREAK (called when user completes a task)
// router.post("/update", auth, async (req, res) => {
//   try {
//     const user = req.user;

//     const lastActiveDate = user.lastActive
//       ? new Date(user.lastActive).toDateString()
//       : null;
//     const today = new Date().toDateString();

//     if (lastActiveDate === today) {
//       return res.json({
//         message: "Already counted for today",
//         streak: user.streak,
//       });
//     }

//     // If last active was yesterday -> add streak
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);

//     if (lastActiveDate === yesterday.toDateString()) {
//       user.streak += 1;
//     } else {
//       user.streak = 1; // reset
//     }

//     user.lastActive = new Date();
//     await user.save();

//     res.json({
//       message: "Streak updated",
//       streak: user.streak,
//     });
//   } catch (err) {
//     console.error("Streak update error:", err);
//     res.status(500).json({ message: "Server error updating streak" });
//   }
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");

// const InterviewSession = require("../models/InterviewSession");
// const WrittenInterviewSession = require("../models/WrittenInterviewSession");

// /**
//  * GET /api/streak
//  * Calculates streak dynamically from interview activity
//  */
// router.get("/", auth, async (req, res) => {
//   try {
//     const userId = req.user.id;

//     /* ================= FETCH BOTH INTERVIEW TYPES ================= */
//     const liveSessions = await InterviewSession.find({ user: userId })
//       .select("createdAt")
//       .lean();

//     const writtenSessions = await WrittenInterviewSession.find({
//       user: userId,
//       status: "COMPLETED",
//     })
//       .select("createdAt")
//       .lean();

//     /* ================= COLLECT UNIQUE DAYS ================= */
//     const allDates = [...liveSessions, ...writtenSessions].map((s) =>
//       new Date(s.createdAt).toISOString().slice(0, 10)
//     );

//     if (!allDates.length) {
//       return res.json({ streak: 0, lastActive: null });
//     }

//     const uniqueDays = [...new Set(allDates)]
//       .map((d) => new Date(d))
//       .sort((a, b) => b - a);

//     /* ================= CALCULATE STREAK ================= */
//     let streak = 0;
//     let today = new Date();
//     today.setHours(0, 0, 0, 0);

//     for (let i = 0; i < uniqueDays.length; i++) {
//       const day = new Date(uniqueDays[i]);
//       day.setHours(0, 0, 0, 0);

//       const diffDays =
//         (today.getTime() - day.getTime()) / (1000 * 60 * 60 * 24);

//       if (diffDays === i) {
//         streak++;
//       } else {
//         break;
//       }
//     }

//     res.json({
//       streak,
//       lastActive: uniqueDays[0],
//     });
//   } catch (err) {
//     console.error("Streak error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;


//before is live new changes
// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");

// const InterviewSession = require("../models/InterviewSession");
// const WrittenInterviewSession = require("../models/WrittenInterviewSession");

// /**
//  * GET /api/streak
//  * Returns streak count, lastActive, and activeDaysThisWeek array
//  */
// router.get("/", auth, async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const [liveSessions, writtenSessions] = await Promise.all([
//       InterviewSession.find({ user: userId }).select("createdAt").lean(),
//       WrittenInterviewSession.find({ user: userId, status: "COMPLETED" })
//         .select("createdAt")
//         .lean(),
//     ]);

//     /* ── All unique activity dates ── */
//     const allDates = [...liveSessions, ...writtenSessions].map((s) =>
//       new Date(s.createdAt).toISOString().slice(0, 10)
//     );

//     if (!allDates.length) {
//       return res.json({ streak: 0, lastActive: null, activeDaysThisWeek: [] });
//     }

//     const uniqueDays = [...new Set(allDates)]
//       .map((d) => new Date(d))
//       .sort((a, b) => b - a);

//     /* ── Calculate streak ── */
//     let streak = 0;
//     let today = new Date();
//     today.setHours(0, 0, 0, 0);

//     for (let i = 0; i < uniqueDays.length; i++) {
//       const day = new Date(uniqueDays[i]);
//       day.setHours(0, 0, 0, 0);
//       const diffDays = (today.getTime() - day.getTime()) / (1000 * 60 * 60 * 24);
//       if (diffDays === i) streak++;
//       else break;
//     }

//     /* ── Active days this week (0=Sun ... 6=Sat) ── */
//     // Get the start of current week (Sunday)
//     const startOfWeek = new Date(today);
//     startOfWeek.setDate(today.getDate() - today.getDay());
//     startOfWeek.setHours(0, 0, 0, 0);

//     const endOfWeek = new Date(startOfWeek);
//     endOfWeek.setDate(startOfWeek.getDate() + 6);
//     endOfWeek.setHours(23, 59, 59, 999);

//     // Which day-of-week indices (0-6) had activity this week
//     const activeDaysThisWeek = [
//       ...new Set(
//         [...liveSessions, ...writtenSessions]
//           .map((s) => new Date(s.createdAt))
//           .filter((d) => d >= startOfWeek && d <= endOfWeek)
//           .map((d) => d.getDay()) // 0=Sun, 1=Mon ... 6=Sat
//       ),
//     ];

//     res.json({
//       streak,
//       lastActive: uniqueDays[0],
//       activeDaysThisWeek, // e.g. [1, 3, 5] = Mon, Wed, Fri active
//     });
//   } catch (err) {
//     console.error("Streak error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

//check new codes
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const InterviewSession = require("../models/InterviewSession");
const WrittenInterviewSession = require("../models/WrittenInterviewSession");
const Notification = require("../models/Notification");
const { createNotification } = require("../helpers/notificationHelper");

/* ── Custom message for every streak day ── */
function getStreakMessage(streak) {
  if (streak === 1)   return { title: "🔥 Streak Started!",    message: "Day 1 done! Come back tomorrow to keep your streak alive." };
  if (streak === 2)   return { title: "🔥 2-Day Streak!",      message: "Two in a row! You're building momentum." };
  if (streak === 3)   return { title: "🔥 3-Day Streak!",      message: "3 days straight — you're building a real habit!" };
  if (streak === 7)   return { title: "⚡ 7-Day Streak!",      message: "One full week of practice. You're on fire!" };
  if (streak === 14)  return { title: "🚀 14-Day Streak!",     message: "Two weeks straight! Your consistency is paying off." };
  if (streak === 30)  return { title: "🏆 30-Day Streak!",     message: "A whole month of practice. You're in the top tier!" };
  if (streak === 60)  return { title: "💎 60-Day Streak!",     message: "60 days of grind. Absolutely elite." };
  if (streak === 100) return { title: "👑 100-Day Streak!",    message: "100 days. Legendary status unlocked." };
  return {
    title:   `🔥 ${streak}-Day Streak!`,
    message: `${streak} days in a row! Keep the momentum going.`,
  };
}

/**
 * GET /api/streak
 * Returns streak count, lastActive, and activeDaysThisWeek array
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

    /* ── All unique activity dates ── */
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
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < uniqueDays.length; i++) {
      const day = new Date(uniqueDays[i]);
      day.setHours(0, 0, 0, 0);
      const diffDays =
        (today.getTime() - day.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays === i) streak++;
      else break;
    }

    /* ── Active days this week (0=Sun ... 6=Sat) ── */
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

    /* ── 🔔 Notify every day streak is active — but ONLY ONCE per day ──
       
       How it works:
       1. Check mostRecentDay === today  →  streak is currently live
       2. Check no streak notification exists in DB for today  →  not already sent
       3. If both pass  →  create notification and done for the day             */

    const mostRecentDay = new Date(uniqueDays[0]);
    mostRecentDay.setHours(0, 0, 0, 0);
    const isActiveToday = mostRecentDay.getTime() === today.getTime();

    if (isActiveToday && streak >= 1) {
      const endOfToday = new Date(today);
      endOfToday.setHours(23, 59, 59, 999);

      // ✅ Only query DB if streak is active — avoids unnecessary DB call
      const alreadyNotified = await Notification.findOne({
        user:      userId,
        type:      "streak",
        createdAt: { $gte: today, $lte: endOfToday },
      }).lean();

      if (!alreadyNotified) {
        const { title, message } = getStreakMessage(streak);
        console.log(`🔔 Sending streak notification: "${title}" for user ${userId}`);
        // Fire and forget — never block the API response
        createNotification(userId, "streak", title, message, "/notifications").catch(
          (err) => console.error("❌ Streak notification failed:", err)
        );
      }
    }

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