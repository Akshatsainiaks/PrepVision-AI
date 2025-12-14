const express = require("express");
const router = express.Router();
const ChatMessage = require("../models/ChatMessage");
const auth = require("../middlewares/auth");

router.post("/", auth, async (req, res) => {
  const { messageIds } = req.body;

  if (!messageIds || messageIds.length === 0)
    return res.json({ updated: 0 });

  await ChatMessage.updateMany(
    { _id: { $in: messageIds } },
    { $addToSet: { readBy: req.user._id } }
  );

  res.json({ updated: messageIds.length });
});

module.exports = router;
