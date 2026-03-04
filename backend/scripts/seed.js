// require("dotenv").config();
// const mongoose = require("mongoose");
// const User = require("./src/models/User");
// const InterviewQuestion = require("./src/models/InterviewQuestion");

// async function seed() {
//   await mongoose.connect(process.env.MONGO_URI);

//   console.log("Connected!");

//   await User.deleteMany({});
//   await InterviewQuestion.deleteMany({});

//   const users = await User.insertMany([
//     { name: "Akshat", email: "akshat@test.com", passwordHash: "test", credits: 50 },
//     { name: "John", email: "john@test.com", passwordHash: "test", credits: 30 },
//     { name: "Alice", email: "alice@test.com", passwordHash: "test", credits: 20 }
//   ]);

//   await InterviewQuestion.insertMany([
//     {
//       company: "TCS",
//       role: "Software Engineer",
//       question: "Explain polymorphism.",
//       difficulty: "Easy",
//       upvotes: 5,
//       addedBy: users[0]._id
//     }
//   ]);

//   console.log("Seeding complete!");
//   process.exit(0);
// }

// seed();

require("dotenv").config();
const mongoose = require("mongoose");
const ChatMessage = require("../src/models/ChatMessage");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected!");

  // Only seeds announcements — does NOT touch users or questions
  await ChatMessage.deleteMany({ groupId: { $in: ["announcements", "new-features"] } });

  await ChatMessage.insertMany([
    { groupId: "announcements", message: "🎉 Welcome to PrepVision AI! This is the official announcements channel.", user: null, type: "system", createdAt: new Date("2026-01-01") },
    { groupId: "announcements", message: "🚀 Mock Written Interviews are now live! Head to Mock → Written Interview.", user: null, type: "system", createdAt: new Date("2026-02-01") },
    { groupId: "announcements", message: "🔔 Notification system is now live! Real-time alerts for streaks and completions.", user: null, type: "system", createdAt: new Date("2026-03-01") },
    { groupId: "new-features",  message: "✨ AI Interview Coach is now in Chat! Go to Chat → AI Coach.", user: null, type: "system", createdAt: new Date("2026-03-01") },
    { groupId: "new-features",  message: "🏆 Leaderboard updated! Weekly rankings reset every Monday.", user: null, type: "system", createdAt: new Date("2026-02-15") },
  ]);

  console.log("✅ Announcements seeded! Your existing users are untouched.");
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });