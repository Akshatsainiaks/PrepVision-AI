const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  company: { type: String, required: true, index: true },
  role: { type: String, required: true, index: true },
  question: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy','Medium','Hard'], default: 'Medium' },
  tags: [String],
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  upvotes: { type: Number, default: 0 },
  sources: { type: [String], default: [] }, // optional: reference or notes
  createdAt: { type: Date, default: Date.now }
});

questionSchema.index({ company: 1, role: 1 });

module.exports = mongoose.model('InterviewQuestion', questionSchema);
