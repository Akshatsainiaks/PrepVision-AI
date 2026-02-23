// const cloudinary = require("../config/cloudinary");
// const User = require("../models/User");

// /* ================= AVATAR UPLOAD ================= */
// exports.uploadAvatar = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const result = await cloudinary.uploader.upload(
//       `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
//       {
//         folder: "avatars",
//         transformation: [
//           { width: 256, height: 256, crop: "fill", gravity: "face" },
//         ],
//       }
//     );

//     const user = await User.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.avatar = result.secure_url;
//     await user.save();

//     res.json({ avatar: result.secure_url });
//   } catch (err) {
//     console.error("Cloudinary upload error:", err);
//     res.status(500).json({ message: "Upload failed" });
//   }
// };

// /* ================= UPDATE PREFERENCES ================= */
// exports.updatePreferences = async (req, res) => {
//   try {
//     const { theme, emailNotifications, weeklySummary } = req.body;

//     const update = {};
//     if (theme) update["preferences.theme"] = theme;
//     if (emailNotifications !== undefined)
//       update["preferences.emailNotifications"] = emailNotifications;
//     if (weeklySummary !== undefined)
//       update["preferences.weeklySummary"] = weeklySummary;

//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       { $set: update },
//       { new: true }
//     ).select("preferences");

//     res.json({ preferences: user.preferences });
//   } catch (err) {
//     console.error("Update preferences error:", err);
//     res.status(500).json({ message: "Failed to update preferences" });
//   }
// };


const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

/* ================= AVATAR UPLOAD ================= */
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "avatars",
        transformation: [
          { width: 256, height: 256, crop: "fill", gravity: "face" },
        ],
      }
    );

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.avatar = result.secure_url;
    await user.save();

    res.json({ avatar: result.secure_url });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};

/* ================= UPDATE PREFERENCES ================= */
exports.updatePreferences = async (req, res) => {
  try {
    const { theme, emailNotifications, weeklySummary } = req.body;

    const update = {};
    if (theme) update["preferences.theme"] = theme;
    if (emailNotifications !== undefined)
      update["preferences.emailNotifications"] = emailNotifications;
    if (weeklySummary !== undefined)
      update["preferences.weeklySummary"] = weeklySummary;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: update },
      { new: true }
    ).select("preferences");

    res.json({ preferences: user.preferences });
  } catch (err) {
    console.error("Update preferences error:", err);
    res.status(500).json({ message: "Failed to update preferences" });
  }
};

/* ================= USER PROFILE (CLEAN API) ================= */
exports.getUserProfile = async (req, res) => {
  try {
    const { username } = req.query; // ✅ FROM QUERY
    const currentUserId = req.user._id;

    if (!username) {
      return res.status(400).json({ message: "Username required" });
    }

    const user = await User.findOne({ username }).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = user.followers?.some(
      (id) => String(id) === String(currentUserId)
    );

    res.json({
      user: {
        user_id: user._id, // ✅ RENAMED
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        credits: user.credits,
        rank: user.rank,
        createdAt: user.createdAt,
        followersCount: user.followers?.length || 0,
        followingCount: user.following?.length || 0,
        isFollowing,
      },
    });
  } catch (err) {
    console.error("User profile error:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

/* ================= FOLLOW USER ================= */
exports.followUser = async (req, res) => {
  try {
    const targetId = req.params.id;
    const currentUserId = req.user._id;

    if (targetId === String(currentUserId))
      return res.status(400).json({ message: "Cannot follow yourself" });

    const targetUser = await User.findById(targetId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser) return res.status(404).json({ message: "User not found" });

    if (!targetUser.followers.includes(currentUserId)) {
      targetUser.followers.push(currentUserId);
      currentUser.following.push(targetId);

      await targetUser.save();
      await currentUser.save();
    }

    res.json({ message: "Followed successfully" });
  } catch (err) {
    console.error("Follow error:", err);
    res.status(500).json({ message: "Follow failed" });
  }
};

/* ================= UNFOLLOW USER ================= */
exports.unfollowUser = async (req, res) => {
  try {
    const targetId = req.params.id;
    const currentUserId = req.user._id;

    const targetUser = await User.findById(targetId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser) return res.status(404).json({ message: "User not found" });

    targetUser.followers = targetUser.followers.filter(
      (id) => String(id) !== String(currentUserId)
    );

    currentUser.following = currentUser.following.filter(
      (id) => String(id) !== String(targetId)
    );

    await targetUser.save();
    await currentUser.save();

    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    console.error("Unfollow error:", err);
    res.status(500).json({ message: "Unfollow failed" });
  }
};