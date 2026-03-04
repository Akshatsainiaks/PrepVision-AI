// // routes/chat.js
// const express = require("express");
// const router = express.Router();
// const auth = require("../middlewares/auth");
// const ChatMessage = require("../models/ChatMessage");

// // POST /api/chat
// // persist a new message (auth required)
// router.post("/", auth, async (req, res) => {
//   try {
//     const { groupId, message, type = "text", attachments = [] } = req.body;
//     if (!groupId || (!message && (!attachments || attachments.length === 0))) {
//       return res.status(400).json({ message: "groupId and message/attachments are required" });
//     }

//     const saved = await ChatMessage.create({
//       groupId,
//       message,
//       type,
//       attachments,
//       user: req.user._id
//     });

//     const populated = await saved.populate("user", "name");
//     res.json(populated);
//   } catch (err) {
//     console.error("CHAT POST ERROR:", err);
//     res.status(500).json({ message: "Internal Server Error", error: err.message });
//   }
// });

// // GET /api/chat/:groupId
// // fetch messages for a group (auth required)
// router.get("/:groupId", auth, async (req, res) => {
//   try {
//     const msgs = await ChatMessage.find({ groupId: req.params.groupId })
//       .sort({ createdAt: 1 })
//       .populate("user", "name");
//     res.json(msgs);
//   } catch (err) {
//     console.error("CHAT GET ERROR:", err);
//     res.status(500).json({ message: "Internal Server Error", error: err.message });
//   }
// });

// module.exports = router;


//next acc claude code
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const ChatMessage = require("../models/ChatMessage");
const mongoose = require("mongoose");
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ─────────────────────────────────────────────────────────────
// POST /api/chat/cleanup — one-time: delete messages with bad user field
// Call this ONCE from browser/Postman then remove or disable it
// ─────────────────────────────────────────────────────────────
router.post("/cleanup", auth, async (req, res) => {
  try {
    // Delete messages where user is not a valid ObjectId
    const all = await ChatMessage.find({});
    const badIds = all
      .filter(m => {
        const u = m.user;
        if (!u) return true;
        try { new mongoose.Types.ObjectId(u.toString()); return false; }
        catch { return true; }
      })
      .map(m => m._id);

    if (badIds.length === 0) return res.json({ deleted: 0, message: "No bad messages found" });

    await ChatMessage.deleteMany({ _id: { $in: badIds } });
    res.json({ deleted: badIds.length, message: `Deleted ${badIds.length} messages with invalid user field` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/chat — persist a message (REST fallback only)
// NOTE: In normal flow, messages are saved via socket handler.
// This endpoint is kept as a fallback but the frontend no longer
// calls it on every send — avoiding duplicate DB writes.
// ─────────────────────────────────────────────────────────────
router.post("/", auth, async (req, res) => {
  try {
    const { groupId, message, type = "text", attachments = [], replyTo = null } = req.body;
    if (!groupId || (!message && !attachments.length))
      return res.status(400).json({ message: "groupId and message required" });

    const saved = await ChatMessage.create({
      groupId,
      message,
      type,
      attachments,
      replyTo: replyTo || null,
      user: req.user._id,
    });
    const populated = await saved.populate([
      { path: "user", select: "name avatar" },
      { path: "replyTo", populate: { path: "user", select: "name" } },
    ]);
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/chat/ai — Groq AI chat (MUST be before /:groupId)
// ─────────────────────────────────────────────────────────────
router.post("/ai", auth, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: "Message required" });

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content:
            "You are an expert technical interview coach specializing in DSA, system design, and behavioral interviews. Give concise, practical answers. Use code examples when helpful. Format code blocks with triple backticks.",
        },
        { role: "user", content: message },
      ],
      max_tokens: 600,
    });

    res.json({ reply: completion.choices[0]?.message?.content || "No response" });
  } catch (err) {
    console.error("AI chat error:", err);
    res.status(500).json({ message: "AI unavailable" });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/chat/dm/list — list DM rooms for current user
// (MUST be before /:groupId)
// ─────────────────────────────────────────────────────────────
router.get("/dm/list", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const rooms = await ChatMessage.aggregate([
      { $match: { groupId: { $regex: `dm_.*${userId}` }, private: true } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$groupId",
          lastMessage: { $first: "$$ROOT" },
          unread: {
            $sum: {
              $cond: [{ $in: [userId, { $ifNull: ["$readBy", []] }] }, 0, 1],
            },
          },
        },
      },
    ]);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/chat/:msgId/react — toggle emoji reaction
// ─────────────────────────────────────────────────────────────
router.post("/:msgId/react", auth, async (req, res) => {
  try {
    const { emoji } = req.body;
    const userId = req.user._id.toString();
    const msg = await ChatMessage.findById(req.params.msgId);
    if (!msg) return res.status(404).json({ message: "Message not found" });

    const reactions = msg.reactions || new Map();
    const users = reactions.get(emoji) || [];

    if (users.includes(userId)) {
      // Remove reaction
      const updated = users.filter((u) => u !== userId);
      if (updated.length === 0) reactions.delete(emoji);
      else reactions.set(emoji, updated);
    } else {
      // Add reaction
      reactions.set(emoji, [...users, userId]);
    }

    msg.reactions = reactions;
    await msg.save();

    // Convert Map to plain object for response
    const reactionsObj = {};
    msg.reactions.forEach((v, k) => { reactionsObj[k] = v; });

    res.json({ msgId: msg._id, reactions: reactionsObj });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
// PATCH /api/chat/:msgId — edit a message
// ─────────────────────────────────────────────────────────────
router.patch("/:msgId", auth, async (req, res) => {
  try {
    const { message } = req.body;
    const msg = await ChatMessage.findById(req.params.msgId);
    if (!msg) return res.status(404).json({ message: "Message not found" });
    if (msg.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    msg.message = message;
    msg.edited = true;
    await msg.save();
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
// DELETE /api/chat/:msgId — delete a message
// ─────────────────────────────────────────────────────────────
router.delete("/:msgId", auth, async (req, res) => {
  try {
    const msg = await ChatMessage.findById(req.params.msgId);
    if (!msg) return res.status(404).json({ message: "Message not found" });
    if (msg.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await msg.deleteOne();
    res.json({ success: true, msgId: req.params.msgId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/chat/:groupId — fetch chat history (wildcard LAST)
// ─────────────────────────────────────────────────────────────
router.get("/:groupId", auth, async (req, res) => {
  try {
    const { before, limit = 60 } = req.query;
    const groupId = req.params.groupId;

    if (!groupId) return res.status(400).json({ message: "groupId required" });

    const query = { groupId };
    if (before) query.createdAt = { $lt: new Date(before) };

    const msgs = await ChatMessage.find(query)
      .sort({ createdAt: 1 })
      .limit(Math.min(Number(limit) || 60, 100))
      .populate("user", "name avatar")
      .populate({ path: "replyTo", populate: { path: "user", select: "name" } })
      .lean(); // lean() is faster — returns plain JS objects

    return res.json(msgs);
  } catch (err) {
    console.error("GET /chat/:groupId error:", err.message);
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;