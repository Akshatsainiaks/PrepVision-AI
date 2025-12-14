const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/User");

// GET USER STREAK
router.get("/", auth, async (req, res) => {
  try {
    const user = req.user;

    res.json({
      streak: user.streak || 0,
      lastActive: user.lastActive || null,
    });
  } catch (err) {
    console.error("Streak fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE STREAK (called when user completes a task)
router.post("/update", auth, async (req, res) => {
  try {
    const user = req.user;

    const lastActiveDate = user.lastActive
      ? new Date(user.lastActive).toDateString()
      : null;
    const today = new Date().toDateString();

    if (lastActiveDate === today) {
      return res.json({
        message: "Already counted for today",
        streak: user.streak,
      });
    }

    // If last active was yesterday -> add streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastActiveDate === yesterday.toDateString()) {
      user.streak += 1;
    } else {
      user.streak = 1; // reset
    }

    user.lastActive = new Date();
    await user.save();

    res.json({
      message: "Streak updated",
      streak: user.streak,
    });
  } catch (err) {
    console.error("Streak update error:", err);
    res.status(500).json({ message: "Server error updating streak" });
  }
});

module.exports = router;
