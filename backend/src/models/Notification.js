// const mongoose = require("mongoose");

// const NotificationSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     title: String,
//     message: String,
//     read: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Notification", NotificationSchema);


// live before
const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ✅ Type for icon/color in UI
    type: {
      type: String,
      enum: [
        "streak",      // 🔥 streak milestone
        "credit",      // 💰 credits earned/deducted
        "follow",      // 👤 someone followed you
        "interview",   // 🎯 interview completed
        "system",      // 📢 platform announcement
        "achievement", // 🏆 badge/achievement unlocked
      ],
      default: "system",
    },

    title: { type: String, required: true },
    message: { type: String, required: true },

    // ✅ Optional link to navigate on click
    link: { type: String, default: null },

    read: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);