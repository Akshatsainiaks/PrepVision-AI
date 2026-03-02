const Notification = require("../models/Notification");

/**¯¸¸
 * createNotification — call this from any controller/route to fire a notification
 *
 * Usage:
 *   await createNotification(userId, "streak", "🔥 3 Day Streak!", "You're on fire. Keep it up.", "/dashboard");
 */
async function createNotification(userId, type, title, message, link = null) {
  try {
    await Notification.create({ user: userId, type, title, message, link });
  } catch (err) {
    console.error("Failed to create notification:", err.message);
    // Never throw — notifications should never block main logic
  }
}

/* ── Preset helpers for common events ── */

// Called after interview session completes
async function notifyInterviewComplete(userId, topic, score) {
  await createNotification(
    userId,
    "interview",
    "🎯 Interview Complete",
    `You scored ${score}/10 on your ${topic} interview.`,
    "/activity"
  );
}

// Called when user earns/spends credits
async function notifyCredits(userId, amount, reason) {
  const gained = amount > 0;
  await createNotification(
    userId,
    "credit",
    gained ? "💰 Credits Earned" : "💸 Credits Used",
    gained
      ? `You earned ${amount} credits — ${reason}.`
      : `${Math.abs(amount)} credits used for ${reason}.`,
    "/credit-history"
  );
}

// Called when someone follows the user
async function notifyFollow(userId, followerName) {
  await createNotification(
    userId,
    "follow",
    "👤 New Follower",
    `${followerName} started following you.`,
    `/profile/${followerName}`
  );
}

// Called when streak milestone hit (3, 7, 14, 30 days)
async function notifyStreakMilestone(userId, streak) {
  const milestones = { 3: "🔥", 7: "⚡", 14: "🚀", 30: "🏆" };
  const emoji = milestones[streak] || "🔥";
  await createNotification(
    userId,
    "streak",
    `${emoji} ${streak}-Day Streak!`,
    `Amazing! You've practiced ${streak} days in a row. Keep it going!`,
    "/dashboard"
  );
}

// Called for system/platform announcements
async function notifySystem(userId, title, message, link = null) {
  await createNotification(userId, "system", title, message, link);
}

module.exports = {
  createNotification,
  notifyInterviewComplete,
  notifyCredits,
  notifyFollow,
  notifyStreakMilestone,
  notifySystem,
};