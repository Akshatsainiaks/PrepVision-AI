// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");
// const Notification = require("../models/Notification");

// // GET notifications of logged in user
// router.get("/me", auth, async (req, res) => {
//   const notifications = await Notification.find({ user: req.user._id })
//     .sort({ createdAt: -1 });

//   res.json({ notifications });
// });

// // Mark all as read
// router.post("/mark-all", auth, async (req, res) => {
//   await Notification.updateMany(
//     { user: req.user._id },
//     { $set: { read: true } }
//   );

//   res.json({ success: true });
// });

// module.exports = router;


 // live before
// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");
// const Notification = require("../models/Notification");

// /**
//  * GET /api/notifications
//  */
// router.get("/", auth, async (req, res) => {
//   try {
//     const notifications = await Notification.find({ user: req.user._id })
//       .sort({ createdAt: -1 })
//       .limit(20)
//       .lean();

//     const unreadCount = await Notification.countDocuments({
//       user: req.user._id,
//       read: false,
//     });

//     res.json({ notifications, unreadCount });
//   } catch (err) {
//     console.error("Get notifications error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ✅ SPECIFIC routes MUST come BEFORE /:id wildcard routes

// /**
//  * PATCH /api/notifications/read-all
//  */
// router.patch("/read-all", auth, async (req, res) => {
//   try {
//     await Notification.updateMany(
//       { user: req.user._id, read: false },
//       { read: true }
//     );
//     res.json({ success: true });
//   } catch (err) {
//     console.error("Mark all read error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /**
//  * DELETE /api/notifications/clear-all
//  */
// router.delete("/clear-all", auth, async (req, res) => {
//   try {
//     await Notification.deleteMany({ user: req.user._id });
//     res.json({ success: true });
//   } catch (err) {
//     console.error("Clear all error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /**
//  * PATCH /api/notifications/:id/read
//  */
// router.patch("/:id/read", auth, async (req, res) => {
//   try {
//     await Notification.findOneAndUpdate(
//       { _id: req.params.id, user: req.user._id },
//       { read: true }
//     );
//     res.json({ success: true });
//   } catch (err) {
//     console.error("Mark read error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /**
//  * DELETE /api/notifications/:id
//  */
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     await Notification.findOneAndDelete({
//       _id: req.params.id,
//       user: req.user._id,
//     });
//     res.json({ success: true });
//   } catch (err) {
//     console.error("Delete notification error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;


//next acc claude code
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Notification = require("../models/Notification");

// ✅ Middleware: disable caching for ALL notification routes
router.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");
  next();
});

/**
 * GET /api/notifications
 */
router.get("/", auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    const unreadCount = await Notification.countDocuments({
      user: req.user._id,
      read: false,
    });

    res.json({ notifications, unreadCount });
  } catch (err) {
    console.error("Get notifications error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ SPECIFIC routes MUST come BEFORE /:id wildcard routes

/**
 * PATCH /api/notifications/read-all
 */
router.patch("/read-all", auth, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, read: false },
      { read: true }
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Mark all read error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/notifications/clear-all
 */
router.delete("/clear-all", auth, async (req, res) => {
  try {
    await Notification.deleteMany({ user: req.user._id });
    res.json({ success: true });
  } catch (err) {
    console.error("Clear all error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PATCH /api/notifications/:id/read
 */
router.patch("/:id/read", auth, async (req, res) => {
  try {
    await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { read: true }
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Mark read error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/notifications/:id
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Delete notification error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;