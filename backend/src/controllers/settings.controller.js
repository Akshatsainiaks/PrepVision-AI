const User = require("../models/User");

/* ================= GET SETTINGS ================= */
exports.getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "security privacy preferences email"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      twoFA: user.security?.twoFactorEnabled ?? false,
      profilePublic: user.privacy?.showFollowers ?? true,
      emailNotifications: user.preferences?.emailNotifications ?? true,
    });
  } catch (err) {
    console.error("Get settings error:", err);
    res.status(500).json({ message: "Failed to load settings" });
  }
};

/* ================= UPDATE SECURITY ================= */
exports.updateSecurity = async (req, res) => {
  try {
    const { twoFA } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      $set: {
        "security.twoFactorEnabled": Boolean(twoFA),
      },
    });

    res.json({ twoFA: Boolean(twoFA) });
  } catch (err) {
    console.error("Update security error:", err);
    res.status(500).json({ message: "Failed to update security" });
  }
};

/* ================= UPDATE PRIVACY (CRITICAL FIX) ================= */
exports.updatePrivacy = async (req, res) => {
  try {
    const { profilePublic } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          "privacy.showFollowers": Boolean(profilePublic),
        },
      },
      { new: true }
    ).select("privacy");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔑 IMPORTANT: return the ACTUAL stored value
    res.json({
      profilePublic: user.privacy.showFollowers,
    });
  } catch (err) {
    console.error("Update privacy error:", err);
    res.status(500).json({ message: "Failed to update privacy" });
  }
};

/* ================= DELETE ACCOUNT ================= */
exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "Account deleted" });
  } catch (err) {
    console.error("Delete account error:", err);
    res.status(500).json({ message: "Failed to delete account" });
  }
};
