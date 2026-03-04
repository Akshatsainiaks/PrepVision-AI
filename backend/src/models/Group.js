const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    avatar: { type: String, default: "" }, // emoji or image url

    // Creator
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Members with roles
    members: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, enum: ["admin", "member"], default: "member" },
        joinedAt: { type: Date, default: Date.now },
      },
    ],

    // Is this a system/announcement channel (only admins can post)
    isSystem: { type: Boolean, default: false },
    isAnnouncement: { type: Boolean, default: false },

    // Last message preview for sidebar
    lastMessage: { type: String, default: "" },
    lastMessageAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Group || mongoose.model("Group", GroupSchema);