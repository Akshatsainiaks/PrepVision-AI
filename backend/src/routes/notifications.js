const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Notification = require("../models/Notification");

// GET notifications of logged in user
router.get("/me", auth, async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.json({ notifications });
});

// Mark all as read
router.post("/mark-all", auth, async (req, res) => {
  await Notification.updateMany(
    { user: req.user._id },
    { $set: { read: true } }
  );

  res.json({ success: true });
});

module.exports = router;
