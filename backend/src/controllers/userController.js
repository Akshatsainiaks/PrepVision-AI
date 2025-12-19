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
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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
