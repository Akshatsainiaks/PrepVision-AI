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
//       // ✅ FIXED HERE
//       .select("name username avatar credits badges");

//     return res.json({ top, page, limit, total });
//   } catch (err) {
//     console.error("Leaderboard Error:", err);
//     return res.status(500).json({ message: "Server error in leaderboard" });
//   }
// };

//next acc claude code
const User = require("../models/User");

/**
 * GET /api/leaderboard
 * Query params:
 *   page    = number (default 1)
 *   limit   = number (default 20)
 *   search  = string (filter by name/username)
 */
exports.getGlobal = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page  || "1"));
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || "20")));
    const search = req.query.search?.trim() || "";
    const skip  = (page - 1) * limit;

    /* ── Search filter ── */
    const filter = search
      ? {
          $or: [
            { name:     { $regex: search, $options: "i" } },
            { username: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const [total, top] = await Promise.all([
      User.countDocuments(filter),
      User.find(filter)
        .sort({ credits: -1 })
        .skip(skip)
        .limit(limit)
        .select("name username avatar credits badges rank"),
    ]);

    /* ── My rank (only if authenticated) ── */
    let myRank = null;
    let myEntry = null;

    // auth middleware sets req.user if token present — use optional auth
    if (req.user?.id) {
      const userId = req.user.id;

      // Count how many users have MORE credits than me → my rank = that count + 1
      const me = await User.findById(userId).select("name username avatar credits badges rank");
      if (me) {
        const ahead = await User.countDocuments({ credits: { $gt: me.credits } });
        myRank = ahead + 1;
        myEntry = {
          _id:      me._id,
          name:     me.name,
          username: me.username,
          avatar:   me.avatar,
          credits:  me.credits,
          badges:   me.badges,
          rank:     myRank,
        };
      }
    }

    return res.json({
      top,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
      myRank,
      myEntry,
    });
  } catch (err) {
    console.error("Leaderboard Error:", err);
    return res.status(500).json({ message: "Server error in leaderboard" });
  }
};