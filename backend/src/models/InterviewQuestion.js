const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    index: true,
    trim: true,
  },

  role: {
    type: String,
    required: true,
    trim: true,
  },

  // 🔥 Dynamic type (DSA, HR, System Design, Anything)
  type: {
    type: String,
    required: true,
    index: true,
    trim: true,
  },

  question: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },

  tags: {
    type: [String],
    default: [],
  },

  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  upvotes: {
    type: Number,
    default: 0,
  },

  // 🔥 AI Answer cache
  aiAnswer: {
    type: String,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

questionSchema.index({ company: 1, type: 1, role: 1 });

module.exports = mongoose.model("InterviewQuestion", questionSchema);
