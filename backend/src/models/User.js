// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     passwordHash: { type: String },
//     phone: { type: String },

//     roles: { type: [String], default: ["user"] },

//     credits: { type: Number, default: 0 },
//     rank: { type: Number, default: 0 },
//     badges: { type: [String], default: [] },

//     avatar: {
//       type: String,
//       default: "", // Cloudinary URL
//     },

//     preferences: {
//       theme: { type: String, default: "dark" },
//       emailNotifications: { type: Boolean, default: true },
//       weeklySummary: { type: Boolean, default: false },
//     },

//     streak: { type: Number, default: 0 },
//     lastActive: { type: Date, default: null },

//     completedRoadmap: {
//       type: [String],
//       default: [],
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);


// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     passwordHash: { type: String, required: true },
//     phone: String,

//     roles: { type: [String], default: ["user"] },
//     credits: { type: Number, default: 0 },

//     avatar: { type: String, default: "" },

//     preferences: {
//       theme: { type: String, default: "dark" },
//       emailNotifications: { type: Boolean, default: true },
//     },

//     streak: { type: Number, default: 0 },
//     lastActive: Date,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);


// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },

//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       index: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     phone: {
//       type: String,
//       unique: true,
//       sparse: true,
//     },

//     passwordHash: { type: String, required: true },

//     roles: { type: [String], default: ["user"] },

//     credits: { type: Number, default: 0 },
//     rank: { type: Number, default: 0 },
//     badges: { type: [String], default: [] },

//     avatar: { type: String, default: "" },

//     preferences: {
//       theme: { type: String, default: "dark" },
//       emailNotifications: { type: Boolean, default: true },
//       weeklySummary: { type: Boolean, default: false },
//     },

//     streak: { type: Number, default: 0 },
//     lastActive: { type: Date, default: null },

//     completedRoadmap: { type: [String], default: [] },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
    },

    passwordHash: { type: String, required: true },

    roles: { type: [String], default: ["user"] },

    credits: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    badges: { type: [String], default: [] },

    avatar: { type: String, default: "" },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    preferences: {
      theme: { type: String, default: "dark" },
      emailNotifications: { type: Boolean, default: true },
      weeklySummary: { type: Boolean, default: false },
    },

    streak: { type: Number, default: 0 },
    lastActive: { type: Date, default: null },

    completedRoadmap: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);