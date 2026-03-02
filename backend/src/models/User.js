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

//     followers: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],

//     following: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],

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

// module.exports =
//   mongoose.models.User || mongoose.model("User", userSchema);

//before is live
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

//     followers: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],

//     following: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],

//     preferences: {
//       theme: { type: String, default: "dark" },
//       emailNotifications: { type: Boolean, default: true },
//       weeklySummary: { type: Boolean, default: false },
//     },

//     streak: { type: Number, default: 0 },
//     lastActive: { type: Date, default: null },

//     completedRoadmap: { type: [String], default: [] },

//     // ✅ Unique identity token per user
//     ice_id: { type: String, default: null },

//     // ✅ Login session history — last 10 device logins
//     ice_info: [
//       {
//         browser: { type: String, default: "" },
//         device_name: { type: String, default: "" },
//         last_login: { type: Date, default: Date.now },
//         os_name: { type: String, default: "" },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports =
//   mongoose.models.User || mongoose.model("User", userSchema);

//next acc claude code
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

    // ✅ Tracks when password was last changed — enforces 30-day cooldown
    passwordChangedAt: { type: Date, default: null },

    // ✅ Tracks username change history — enforces 2 changes per 15 days
    usernameChanges: [
      {
        changedAt: { type: Date, default: Date.now },
      },
    ],

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

    // ✅ Security settings (2FA etc.)
    security: {
      twoFactorEnabled: { type: Boolean, default: false },
    },

    // ✅ Privacy settings
    privacy: {
      showFollowers: { type: Boolean, default: true },
    },

    preferences: {
      theme: { type: String, default: "dark" },
      emailNotifications: { type: Boolean, default: true },
      weeklySummary: { type: Boolean, default: false },
    },

    streak: { type: Number, default: 0 },
    lastActive: { type: Date, default: null },

    completedRoadmap: { type: [String], default: [] },

    // ✅ Unique identity token per user
    ice_id: { type: String, default: null },

    // ✅ Login session history — last 10 device logins
    ice_info: [
      {
        browser: { type: String, default: "" },
        device_name: { type: String, default: "" },
        last_login: { type: Date, default: Date.now },
        os_name: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);