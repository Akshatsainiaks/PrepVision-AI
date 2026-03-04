// const mongoose = require("mongoose");

// const AttachmentSchema = new mongoose.Schema(
//   {
//     filename: String,
//     url: String,
//     mime: String,
//     size: Number,
//   },
//   { _id: false }
// );

// const ChatMessageSchema = new mongoose.Schema(
//   {
//     // Group ID (global, dsa, frontend)
//     // or DM: "dm_userA_userB"
//     groupId: { type: String, required: true, index: true },

//     // Text of the message
//     message: { type: String },

//     // Sender
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

//     // Message type
//     type: {
//       type: String,
//       enum: ["text", "file", "system", "ai"],
//       default: "text",
//     },

//     // Attachments: images, pdf, video, etc.
//     attachments: [AttachmentSchema],

//     // DM flag (optional)
//     private: { type: Boolean, default: false },

//     // List of users who have read the message
//     readBy: [
//       { type: mongoose.Schema.Types.ObjectId, ref: "User" }
//     ],
//   },
//   { timestamps: true }
// );

// // Index for faster chat history queries
// ChatMessageSchema.index({ groupId: 1, createdAt: 1 });

// module.exports =
//   mongoose.models.ChatMessage ||
//   mongoose.model("ChatMessage", ChatMessageSchema);

//next acc claude acc
const mongoose = require("mongoose");

const AttachmentSchema = new mongoose.Schema(
  {
    filename: String,
    url: String,
    mime: String,
    size: Number,
  },
  { _id: false }
);

const ReactionSchema = new mongoose.Schema(
  {
    emoji: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { _id: false }
);

const ChatMessageSchema = new mongoose.Schema(
  {
    // Group ID (global, dsa, frontend, etc.)
    // or DM room: "dm_userA_userB"
    groupId: { type: String, required: true, index: true },

    // Text of the message
    message: { type: String, default: "" },

    // Sender
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Message type
    type: {
      type: String,
      enum: ["text", "file", "system", "ai"],
      default: "text",
    },

    // Attachments: images, pdf, video, etc.
    attachments: [AttachmentSchema],

    // DM flag
    private: { type: Boolean, default: false },

    // Reply-to reference
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "ChatMessage", default: null },

    // Reactions map: { "👍": [userId, ...], "❤️": [...] }
    reactions: { type: Map, of: [String], default: {} },

    // Pinned flag
    pinned: { type: Boolean, default: false },

    // Edited flag
    edited: { type: Boolean, default: false },

    // Thread reply count (denormalized for performance)
    threadCount: { type: Number, default: 0 },

    // List of users who have read the message
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Compound index for faster chat history queries
ChatMessageSchema.index({ groupId: 1, createdAt: 1 });

module.exports =
  mongoose.models.ChatMessage ||
  mongoose.model("ChatMessage", ChatMessageSchema);