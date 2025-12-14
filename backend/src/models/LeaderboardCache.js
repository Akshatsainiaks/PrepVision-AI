const mongoose = require('mongoose');

const lbSchema = new mongoose.Schema({
  scope: { type: String, required: true }, // global, company:INFOSYS, role:SE
  rankings: [{ userId: mongoose.Schema.Types.ObjectId, credits: Number }],
  lastUpdatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LeaderboardCache', lbSchema);
