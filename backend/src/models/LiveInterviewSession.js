// const mongoose = require("mongoose");

// const LiveInterviewSessionSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     topic: String,
//     role: String,

//     questions: [
//       {
//         question: String,
//         userAnswer: String,
//       },
//     ],

//     status: {
//       type: String,
//       enum: ["ONGOING", "COMPLETED"],
//       default: "ONGOING",
//     },
//   },
//   { timestamps: true }
// );

// module.exports =
//   mongoose.models.LiveInterviewSession ||
//   mongoose.model("LiveInterviewSession", LiveInterviewSessionSchema);


//next acc claude code
const mongoose = require("mongoose");

const LiveInterviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: true,
    },

    topic:      { type: String, default: "" },
    role:       { type: String, default: "" },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" },

    // AI-generated questions at session start
    generatedQuestions: [{ type: String }],

    // Hint tracking
    hintsUsed:        { type: Number, default: 0 },
    totalHints:       { type: Number, default: 3 },
    timerPerQuestion: { type: Number, default: 90 }, // seconds

    // Each answered question with AI evaluation + follow-up
    questions: [
      {
        questionIndex: { type: Number },
        question:      { type: String },
        userAnswer:    { type: String },
        aiScore:       { type: Number, min: 0, max: 10, default: null },
        aiFeedback:    { type: String, default: "" },
        strengths:     { type: String, default: "" },
        improvement:   { type: String, default: "" },
        followUp:      { type: String, default: null }, // AI-generated follow-up Q
        timedOut:      { type: Boolean, default: false },
        hintUsed:      { type: Boolean, default: false },
      },
    ],

    // Final results
    overallScore:    { type: Number, default: null },
    overallFeedback: { type: String, default: "" },

    status: {
      type:    String,
      enum:    ["ONGOING", "COMPLETED", "ABANDONED"],
      default: "ONGOING",
    },
  },
  { timestamps: true }
);

// Force fresh registration to avoid stale schema conflicts during development
delete mongoose.models["LiveInterviewSession"];
module.exports = mongoose.model("LiveInterviewSession", LiveInterviewSessionSchema);