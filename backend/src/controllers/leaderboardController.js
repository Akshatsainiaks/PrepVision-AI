// // backend/src/controllers/leaderboardController.js
// const User = require("../models/User");

// exports.getGlobal = async (req, res, next) => {
//   try {
//     const page = Math.max(1, parseInt(req.query.page || "1"));
//     const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || "20")));
//     const skip = (page - 1) * limit;

//     const total = await User.countDocuments();
//     const top = await User.find()
//       .sort({ credits: -1 })
//       .skip(skip)
//       .limit(limit)
//       .select("name credits badges");

//     return res.json({ top, page, limit, total });
//   } catch (err) {
//     console.error("Leaderboard Error:", err);
//     return res.status(500).json({ message: "Server error in leaderboard" });
//   }
// };


// backend/src/controllers/leaderboardController.js
const User = require("../models/User");

exports.getGlobal = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || "1"));
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || "20")));
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();

    const top = await User.find()
      .sort({ credits: -1 })
      .skip(skip)
      .limit(limit)
      // ✅ FIXED HERE
      .select("name username avatar credits badges");

    return res.json({ top, page, limit, total });
  } catch (err) {
    console.error("Leaderboard Error:", err);
    return res.status(500).json({ message: "Server error in leaderboard" });
  }
};