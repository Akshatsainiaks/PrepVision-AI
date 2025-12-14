require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User");
const InterviewQuestion = require("./src/models/InterviewQuestion");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Connected!");

  await User.deleteMany({});
  await InterviewQuestion.deleteMany({});

  const users = await User.insertMany([
    { name: "Akshat", email: "akshat@test.com", passwordHash: "test", credits: 50 },
    { name: "John", email: "john@test.com", passwordHash: "test", credits: 30 },
    { name: "Alice", email: "alice@test.com", passwordHash: "test", credits: 20 }
  ]);

  await InterviewQuestion.insertMany([
    {
      company: "TCS",
      role: "Software Engineer",
      question: "Explain polymorphism.",
      difficulty: "Easy",
      upvotes: 5,
      addedBy: users[0]._id
    }
  ]);

  console.log("Seeding complete!");
  process.exit(0);
}

seed();
