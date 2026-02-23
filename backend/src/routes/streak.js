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


const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const InterviewSession = require("../models/InterviewSession");
const WrittenInterviewSession = require("../models/WrittenInterviewSession");

/**
 * GET /api/streak
 * Calculates streak dynamically from interview activity
 */
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    /* ================= FETCH BOTH INTERVIEW TYPES ================= */
    const liveSessions = await InterviewSession.find({ user: userId })
      .select("createdAt")
      .lean();

    const writtenSessions = await WrittenInterviewSession.find({
      user: userId,
      status: "COMPLETED",
    })
      .select("createdAt")
      .lean();

    /* ================= COLLECT UNIQUE DAYS ================= */
    const allDates = [...liveSessions, ...writtenSessions].map((s) =>
      new Date(s.createdAt).toISOString().slice(0, 10)
    );

    if (!allDates.length) {
      return res.json({ streak: 0, lastActive: null });
    }

    const uniqueDays = [...new Set(allDates)]
      .map((d) => new Date(d))
      .sort((a, b) => b - a);

    /* ================= CALCULATE STREAK ================= */
    let streak = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < uniqueDays.length; i++) {
      const day = new Date(uniqueDays[i]);
      day.setHours(0, 0, 0, 0);

      const diffDays =
        (today.getTime() - day.getTime()) / (1000 * 60 * 60 * 24);

      if (diffDays === i) {
        streak++;
      } else {
        break;
      }
    }

    res.json({
      streak,
      lastActive: uniqueDays[0],
    });
  } catch (err) {
    console.error("Streak error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
