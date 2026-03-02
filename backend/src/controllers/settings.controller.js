// const User = require("../models/User");

// /* ================= GET SETTINGS ================= */
// exports.getSettings = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select(
//       "security privacy preferences email"
//     );

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({
//       twoFA: user.security?.twoFactorEnabled ?? false,
//       profilePublic: user.privacy?.showFollowers ?? true,
//       emailNotifications: user.preferences?.emailNotifications ?? true,
//     });
//   } catch (err) {
//     console.error("Get settings error:", err);
//     res.status(500).json({ message: "Failed to load settings" });
//   }
// };

// /* ================= UPDATE SECURITY ================= */
// exports.updateSecurity = async (req, res) => {
//   try {
//     const { twoFA } = req.body;

//     await User.findByIdAndUpdate(req.user.id, {
//       $set: {
//         "security.twoFactorEnabled": Boolean(twoFA),
//       },
//     });

//     res.json({ twoFA: Boolean(twoFA) });
//   } catch (err) {
//     console.error("Update security error:", err);
//     res.status(500).json({ message: "Failed to update security" });
//   }
// };

// /* ================= UPDATE PRIVACY (CRITICAL FIX) ================= */
// exports.updatePrivacy = async (req, res) => {
//   try {
//     const { profilePublic } = req.body;

//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       {
//         $set: {
//           "privacy.showFollowers": Boolean(profilePublic),
//         },
//       },
//       { new: true }
//     ).select("privacy");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // 🔑 IMPORTANT: return the ACTUAL stored value
//     res.json({
//       profilePublic: user.privacy.showFollowers,
//     });
//   } catch (err) {
//     console.error("Update privacy error:", err);
//     res.status(500).json({ message: "Failed to update privacy" });
//   }
// };

// /* ================= DELETE ACCOUNT ================= */
// exports.deleteAccount = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.user.id);
//     res.json({ message: "Account deleted" });
//   } catch (err) {
//     console.error("Delete account error:", err);
//     res.status(500).json({ message: "Failed to delete account" });
//   }
// };


//next acc claude code
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* ── Constants ── */
const USERNAME_CHANGE_LIMIT = 2;
const USERNAME_CHANGE_WINDOW_DAYS = 15;
const PASSWORD_CHANGE_COOLDOWN_DAYS = 30;

/* ── Helpers ── */
function generateRandomUsername(name = "") {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 10) || "user";
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${base}${suffix}`;
}

function recentUsernameChanges(usernameChanges = [], days = 15) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return usernameChanges.filter((c) => new Date(c.changedAt) >= cutoff);
}

function daysUntilPasswordAllowed(passwordChangedAt) {
  if (!passwordChangedAt) return 0;
  const nextAllowed = new Date(passwordChangedAt);
  nextAllowed.setDate(nextAllowed.getDate() + PASSWORD_CHANGE_COOLDOWN_DAYS);
  const msLeft = nextAllowed - new Date();
  if (msLeft <= 0) return 0;
  // ✅ Any time remaining counts as at least 1 day — prevents same-day bypass
  return Math.max(1, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));
}

/* ═══════════════════════════════════════════
   GET SETTINGS
═══════════════════════════════════════════ */
exports.getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "security privacy preferences email username name phone usernameChanges passwordChangedAt"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    const recentChanges = recentUsernameChanges(user.usernameChanges, USERNAME_CHANGE_WINDOW_DAYS);
    const usernameChangesLeft = Math.max(0, USERNAME_CHANGE_LIMIT - recentChanges.length);
    const passwordDaysLeft = daysUntilPasswordAllowed(user.passwordChangedAt);

    res.json({
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone || "",
      usernameChangesLeft,
      usernameWindowDays: USERNAME_CHANGE_WINDOW_DAYS,
      canChangePassword: passwordDaysLeft === 0,
      passwordDaysLeft,
      twoFA: user.security?.twoFactorEnabled ?? false,
      profilePublic: user.privacy?.showFollowers ?? true,
      emailNotifications: user.preferences?.emailNotifications ?? true,
    });
  } catch (err) {
    console.error("Get settings error:", err);
    res.status(500).json({ message: "Failed to load settings" });
  }
};

/* ═══════════════════════════════════════════
   UPDATE ACCOUNT
═══════════════════════════════════════════ */
exports.updateAccount = async (req, res) => {
  try {
    const { name, username, phone } = req.body;
    const userId = req.user.id;

    if (!name?.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const updates = { name: name.trim() };
    let pushOp = null;

    if (phone !== undefined) {
      if (phone && !/^\+?[\d\s\-().]{7,15}$/.test(phone)) {
        return res.status(400).json({ message: "Invalid phone number format" });
      }
      updates.phone = phone.trim();
    }

    const newUsername = username?.toLowerCase().trim();
    const isUsernameChanging = newUsername && newUsername !== user.username;

    if (isUsernameChanging) {
      if (!/^[a-zA-Z0-9_]{3,30}$/.test(newUsername)) {
        return res.status(400).json({
          message: "Username must be 3–30 characters: letters, numbers, underscores only",
        });
      }

      const recentChanges = recentUsernameChanges(user.usernameChanges, USERNAME_CHANGE_WINDOW_DAYS);
      if (recentChanges.length >= USERNAME_CHANGE_LIMIT) {
        const oldest = recentChanges.sort((a, b) => new Date(a.changedAt) - new Date(b.changedAt))[0];
        const nextAllowed = new Date(oldest.changedAt);
        nextAllowed.setDate(nextAllowed.getDate() + USERNAME_CHANGE_WINDOW_DAYS);
        const daysLeft = Math.ceil((nextAllowed - new Date()) / (1000 * 60 * 60 * 24));
        return res.status(429).json({
          message: `Username can only be changed ${USERNAME_CHANGE_LIMIT} times per ${USERNAME_CHANGE_WINDOW_DAYS} days. Try again in ${daysLeft} day(s).`,
          daysLeft,
        });
      }

      const taken = await User.findOne({ username: newUsername, _id: { $ne: userId } });
      if (taken) {
        return res.status(409).json({ message: "Username already taken" });
      }

      updates.username = newUsername;
      pushOp = { usernameChanges: { changedAt: new Date() } };
    }

    const updateOp = { $set: updates };
    if (pushOp) updateOp.$push = pushOp;

    const updated = await User.findByIdAndUpdate(userId, updateOp, { new: true })
      .select("name username email phone usernameChanges");

    const recentChanges = recentUsernameChanges(updated.usernameChanges, USERNAME_CHANGE_WINDOW_DAYS);
    const usernameChangesLeft = Math.max(0, USERNAME_CHANGE_LIMIT - recentChanges.length);

    res.json({
      message: "Account updated",
      user: {
        name: updated.name,
        username: updated.username,
        email: updated.email,
        phone: updated.phone,
      },
      usernameChangesLeft,
    });
  } catch (err) {
    console.error("Update account error:", err);
    res.status(500).json({ message: "Failed to update account" });
  }
};

/* ═══════════════════════════════════════════
   CHANGE PASSWORD
   ✅ Re-issues a fresh JWT so user stays logged in
═══════════════════════════════════════════ */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All password fields are required" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }
    if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(newPassword)) {
      return res.status(400).json({
        message: "Password must contain at least one letter and one number",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const daysLeft = daysUntilPasswordAllowed(user.passwordChangedAt);
    if (daysLeft > 0) {
      return res.status(429).json({
        message: `Password can only be changed once every ${PASSWORD_CHANGE_COOLDOWN_DAYS} days. Try again in ${daysLeft} day(s).`,
        daysLeft,
        canChangePassword: false,
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const isSame = await bcrypt.compare(newPassword, user.passwordHash);
    if (isSame) {
      return res.status(400).json({ message: "New password must differ from your current password" });
    }

    const salt = await bcrypt.genSalt(12);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    user.passwordChangedAt = new Date();
    await user.save();

    // ✅ Issue fresh token — old token is now invalid, new one keeps user logged in
    const newToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ In-app notification
    try {
      const Notification = require("../models/Notification");
      await Notification.create({
        user: user._id,
        type: "system",
        title: "🔒 Password Changed",
        message: "Your account password was successfully updated. If this wasn't you, contact support immediately.",
        read: false,
      });
    } catch {
      // Silently skip
    }

    const nextAllowed = new Date();
    nextAllowed.setDate(nextAllowed.getDate() + PASSWORD_CHANGE_COOLDOWN_DAYS);

    res.json({
      message: "Password changed successfully",
      token: newToken,           // ✅ frontend must save this to localStorage
      canChangePassword: false,
      passwordDaysLeft: PASSWORD_CHANGE_COOLDOWN_DAYS,
      nextChangeAllowed: nextAllowed.toISOString(),
    });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: "Failed to change password" });
  }
};

exports.generateRandomUsername = generateRandomUsername;

/* ═══════════════════════════════════════════
   UPDATE SECURITY / PRIVACY / PREFERENCES
═══════════════════════════════════════════ */
exports.updateSecurity = async (req, res) => {
  try {
    const { twoFA } = req.body;
    await User.findByIdAndUpdate(req.user.id, {
      $set: { "security.twoFactorEnabled": Boolean(twoFA) },
    });
    res.json({ twoFA: Boolean(twoFA) });
  } catch (err) {
    res.status(500).json({ message: "Failed to update security" });
  }
};

exports.updatePrivacy = async (req, res) => {
  try {
    const { profilePublic } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { "privacy.showFollowers": Boolean(profilePublic) } },
      { new: true }
    ).select("privacy");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ profilePublic: user.privacy.showFollowers });
  } catch (err) {
    res.status(500).json({ message: "Failed to update privacy" });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { emailNotifications } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { "preferences.emailNotifications": Boolean(emailNotifications) } },
      { new: true }
    ).select("preferences");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ emailNotifications: user.preferences.emailNotifications });
  } catch (err) {
    res.status(500).json({ message: "Failed to update preferences" });
  }
};

/* ═══════════════════════════════════════════
   DELETE ACCOUNT
═══════════════════════════════════════════ */
exports.deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "Password is required to delete account" });
    }
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete account" });
  }
};