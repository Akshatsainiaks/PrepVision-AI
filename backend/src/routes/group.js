const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Group = require("../models/Group");
const ChatMessage = require("../models/ChatMessage");

// ── GET /api/groups — list groups the current user is a member of
router.get("/", auth, async (req, res) => {
  try {
    const groups = await Group.find({
      "members.user": req.user._id,
    })
      .populate("members.user", "name avatar username")
      .populate("createdBy", "name")
      .sort({ lastMessageAt: -1 });

    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── POST /api/groups — create a new group
router.post("/", auth, async (req, res) => {
  try {
    const { name, description = "", memberIds = [], avatar = "👥" } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: "Group name required" });

    // Always include creator as admin
    const members = [
      { user: req.user._id, role: "admin" },
      ...memberIds
        .filter((id) => id !== req.user._id.toString())
        .map((id) => ({ user: id, role: "member" })),
    ];

    const group = await Group.create({
      name: name.trim(),
      description,
      avatar,
      createdBy: req.user._id,
      members,
    });

    const populated = await group.populate("members.user", "name avatar username");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GET /api/groups/:groupId — get group details
router.get("/:groupId", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId)
      .populate("members.user", "name avatar username")
      .populate("createdBy", "name");

    if (!group) return res.status(404).json({ message: "Group not found" });

    // Check membership
    const isMember = group.members.some(
      (m) => m.user._id.toString() === req.user._id.toString()
    );
    if (!isMember) return res.status(403).json({ message: "Not a member" });

    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── POST /api/groups/:groupId/members — add members (admin only)
router.post("/:groupId/members", auth, async (req, res) => {
  try {
    const { userIds = [] } = req.body;
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Check if requester is admin
    const requester = group.members.find(
      (m) => m.user.toString() === req.user._id.toString()
    );
    if (!requester || requester.role !== "admin")
      return res.status(403).json({ message: "Only admins can add members" });

    // Add new members (skip existing)
    const existingIds = group.members.map((m) => m.user.toString());
    const newMembers = userIds
      .filter((id) => !existingIds.includes(id))
      .map((id) => ({ user: id, role: "member" }));

    group.members.push(...newMembers);
    await group.save();

    const populated = await group.populate("members.user", "name avatar username");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── PATCH /api/groups/:groupId/members/:userId/admin — make member an admin
router.patch("/:groupId/members/:userId/admin", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Only admins can promote
    const requester = group.members.find(
      (m) => m.user.toString() === req.user._id.toString()
    );
    if (!requester || requester.role !== "admin")
      return res.status(403).json({ message: "Only admins can promote members" });

    const target = group.members.find(
      (m) => m.user.toString() === req.params.userId
    );
    if (!target) return res.status(404).json({ message: "Member not found" });

    target.role = "admin";
    await group.save();

    const populated = await group.populate("members.user", "name avatar username");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── DELETE /api/groups/:groupId/members/:userId — remove member
router.delete("/:groupId/members/:userId", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const requester = group.members.find(
      (m) => m.user.toString() === req.user._id.toString()
    );

    // Admin can remove anyone; members can only remove themselves (leave)
    const isSelf = req.params.userId === req.user._id.toString();
    if (!isSelf && (!requester || requester.role !== "admin"))
      return res.status(403).json({ message: "Not authorized" });

    group.members = group.members.filter(
      (m) => m.user.toString() !== req.params.userId
    );

    // If no members left, delete the group
    if (group.members.length === 0) {
      await group.deleteOne();
      return res.json({ deleted: true });
    }

    // If removed member was the only admin, promote oldest member
    const hasAdmin = group.members.some((m) => m.role === "admin");
    if (!hasAdmin) group.members[0].role = "admin";

    await group.save();
    const populated = await group.populate("members.user", "name avatar username");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── PATCH /api/groups/:groupId — update group name/description (admin only)
router.patch("/:groupId", auth, async (req, res) => {
  try {
    const { name, description, avatar } = req.body;
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const requester = group.members.find(
      (m) => m.user.toString() === req.user._id.toString()
    );
    if (!requester || requester.role !== "admin")
      return res.status(403).json({ message: "Only admins can edit group" });

    if (name) group.name = name.trim();
    if (description !== undefined) group.description = description;
    if (avatar) group.avatar = avatar;

    await group.save();
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── DELETE /api/groups/:groupId — delete group (admin only)
router.delete("/:groupId", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const requester = group.members.find(
      (m) => m.user.toString() === req.user._id.toString()
    );
    if (!requester || requester.role !== "admin")
      return res.status(403).json({ message: "Only admins can delete group" });

    // Delete all messages in this group too
    await ChatMessage.deleteMany({ groupId: group._id.toString() });
    await group.deleteOne();

    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GET /api/groups/:groupId/messages — get group chat history
router.get("/:groupId/messages", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const isMember = group.members.some(
      (m) => m.user.toString() === req.user._id.toString()
    );
    if (!isMember) return res.status(403).json({ message: "Not a member" });

    const msgs = await ChatMessage.find({ groupId: req.params.groupId })
      .sort({ createdAt: 1 })
      .limit(60)
      .populate("user", "name avatar")
      .populate({ path: "replyTo", populate: { path: "user", select: "name" } })
      .lean();

    res.json(msgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;