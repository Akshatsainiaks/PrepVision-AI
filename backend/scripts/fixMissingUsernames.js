/**
 * One-time migration: assign random usernames to users who have none.
 *
 * Run from your backend root:
 *   node scripts/fixMissingUsernames.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../src/models/User");

async function generateUniqueUsername(name) {
  const base = (name || "user")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 10) || "user";

  let username, exists;
  do {
    const suffix = Math.floor(1000 + Math.random() * 9000);
    username = `${base}${suffix}`;
    exists = await User.exists({ username });
  } while (exists);

  return username;
}

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");

  const broken = await User.find({
    $or: [
      { username: null },
      { username: "" },
      { username: { $exists: false } },
      { username: "undefined" },
    ],
  });

  console.log(`Found ${broken.length} users with missing/invalid username`);

  for (const u of broken) {
    const username = await generateUniqueUsername(u.name);
    u.username = username;
    await u.save();
    console.log(`Fixed: ${u.email} → @${username}`);
  }

  console.log("✅ All done");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});