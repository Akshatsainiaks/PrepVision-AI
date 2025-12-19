const mongoose = require("mongoose");

const LiveInterviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topic: String,
    role: String,

    questions: [
      {
        question: String,
        userAnswer: String,
      },
    ],

    status: {
      type: String,
      enum: ["ONGOING", "COMPLETED"],
      default: "ONGOING",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.LiveInterviewSession ||
  mongoose.model("LiveInterviewSession", LiveInterviewSessionSchema);
