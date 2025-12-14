// routes/chat.js
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const ChatMessage = require("../models/ChatMessage");

// POST /api/chat
// persist a new message (auth required)
router.post("/", auth, async (req, res) => {
  try {
    const { groupId, message, type = "text", attachments = [] } = req.body;
    if (!groupId || (!message && (!attachments || attachments.length === 0))) {
      return res.status(400).json({ message: "groupId and message/attachments are required" });
    }

    const saved = await ChatMessage.create({
      groupId,
      message,
      type,
      attachments,
      user: req.user._id
    });

    const populated = await saved.populate("user", "name");
    res.json(populated);
  } catch (err) {
    console.error("CHAT POST ERROR:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// GET /api/chat/:groupId
// fetch messages for a group (auth required)
router.get("/:groupId", auth, async (req, res) => {
  try {
    const msgs = await ChatMessage.find({ groupId: req.params.groupId })
      .sort({ createdAt: 1 })
      .populate("user", "name");
    res.json(msgs);
  } catch (err) {
    console.error("CHAT GET ERROR:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
