const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  passwordHash: { type: String },

  phone: { type: String },

  roles: { type: [String], default: ['user'] }, // e.g., user, admin, moderator

  credits: { type: Number, default: 0 },

  rank: { type: Number, default: 0 },

  badges: { type: [String], default: [] },

  createdAt: { type: Date, default: Date.now },

  // 🔥 DAILY STREAK SYSTEM
  streak: {
    type: Number,
    default: 0
  },

  lastActive: {
    type: Date,
    default: null
  },

  // 🔥 NEW — ROADMAP PROGRESS TRACKING
  completedRoadmap: {
    type: [String],   // stores milestone IDs like "w-0-practice", "bonus-streak"
    default: []
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
