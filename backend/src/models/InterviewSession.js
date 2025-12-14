const mongoose = require("mongoose");

const InterviewSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company: { type: String },
  role: { type: String },
  questions: [
    {
      question: String,
      answer: String,
      aiFeedback: String,
      aiScore: Number,
    }
  ],
}, { timestamps: true });

module.exports =
  mongoose.models.InterviewSession ||
  mongoose.model("InterviewSession", InterviewSessionSchema);
