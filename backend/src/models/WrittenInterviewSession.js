const mongoose = require("mongoose");

const WrittenInterviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    questions: [
      {
        question: String,
        userAnswer: String,
        aiFeedback: String,
        aiScore: Number,
        correctAnswer: String,
      },
    ],

    overallScore: Number,

    status: {
      type: String,
      enum: ["ONGOING", "COMPLETED"],
      default: "ONGOING",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.WrittenInterviewSession ||
  mongoose.model("WrittenInterviewSession", WrittenInterviewSessionSchema);
