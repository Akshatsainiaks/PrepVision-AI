// // server.js
// require("dotenv").config();

// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");
// const path = require("path");

// const connectDB = require("./config/db");
// const auth = require("./middlewares/auth");

// const authRoutes = require("./routes/auth");
// const questionRoutes = require("./routes/questions");
// const interviewRoutes = require("./routes/interview");
// const creditRoutes = require("./routes/credits");
// const leaderboardRoutes = require("./routes/leaderboard");
// const chatRoutes = require("./routes/chat");
// const uploadRoutes = require("./routes/uploads");
// const notificationRoutes = require("./routes/notifications");
// const streakRoutes = require("./routes/streak");
// const interviewHistoryRoutes = require("./routes/interviewHistory");
// const errorHandler = require("./middlewares/errorHandler");
// const analyticsRoutes = require("./routes/analytics");
// const weaknessRoutes = require("./routes/weaknessInsights");
// const learningRoadmapRoutes = require("./routes/learningRoadmap");
// const socketHandler = require("./socket/socketHandler");
// const writtenInterviewRoutes = require("./routes/writtenInterview");
// const PORT = process.env.PORT || 4000;
// const UPLOADS_PATH = path.join(__dirname, "uploads");

// async function main() {
//   await connectDB(process.env.MONGO_URI);

//   const app = express();
//   app.use(cors());
//   app.use(express.json());

//   app.use("/uploads", express.static(UPLOADS_PATH));

//   app.use("/api/auth", authRoutes);
//   app.use("/api/questions", questionRoutes);
//   app.use("/api/interview", interviewRoutes);
//   app.use("/api/credits", creditRoutes);
//   app.use("/api/leaderboard", leaderboardRoutes);
//   app.use("/api/chat", chatRoutes);
//   app.use("/api/uploads", uploadRoutes);
//   app.use("/api/notifications", notificationRoutes);
//   app.use("/api/streak", streakRoutes);
//   app.use("/api/interview-history", interviewHistoryRoutes);
//   app.use("/api/analytics", analyticsRoutes);
//   app.use("/api/weakness-insights", weaknessRoutes);
//   app.use("/api/learning-roadmap", learningRoadmapRoutes);
//   app.use("/api/written-interview", writtenInterviewRoutes);
//   app.use("/api/users", require("./routes/user"));
//   app.use("/api/live-interview", require("./routes/liveInterview"));
//   app.get("/api/test-auth", auth, (req, res) =>
//     res.json({ message: "Token working", user: req.user })
//   );

//   app.use(errorHandler);

//   const server = http.createServer(app);
//   const io = new Server(server, { cors: { origin: "*" } });

//   // SOCKET.IO SETUP
//   socketHandler(io);   // <-- cleaner now

//   server.listen(PORT, () =>
//     console.log(`🚀 Server running → http://localhost:${PORT}`)
//   );
// }

// main().catch((err) => {
//   console.error("Startup error:", err);
//   process.exit(1);
// });


// server.js
// require("dotenv").config();

// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");
// const path = require("path");

// const connectDB = require("./config/db");
// const auth = require("./middlewares/auth");

// const authRoutes = require("./routes/auth");
// const questionRoutes = require("./routes/questions");
// const interviewRoutes = require("./routes/interview");
// const creditRoutes = require("./routes/credits");
// const leaderboardRoutes = require("./routes/leaderboard");
// const chatRoutes = require("./routes/chat");
// const uploadRoutes = require("./routes/uploads");
// const notificationRoutes = require("./routes/notifications");
// const streakRoutes = require("./routes/streak");
// const interviewHistoryRoutes = require("./routes/interviewHistory");
// const analyticsRoutes = require("./routes/analytics"); // 👈 unchanged
// const weaknessRoutes = require("./routes/weaknessInsights");
// const learningRoadmapRoutes = require("./routes/learningRoadmap");
// const socketHandler = require("./socket/socketHandler");
// const writtenInterviewRoutes = require("./routes/writtenInterview");

// const PORT = process.env.PORT || 4000;
// const UPLOADS_PATH = path.join(__dirname, "uploads");

// async function main() {
//   await connectDB(process.env.MONGO_URI);

//   const app = express();
//   app.use(cors());
//   app.use(express.json());

//   app.use("/uploads", express.static(UPLOADS_PATH));

//   app.use("/api/auth", authRoutes);
//   app.use("/api/questions", questionRoutes);
//   app.use("/api/interview", interviewRoutes);
//   app.use("/api/credits", creditRoutes);
//   app.use("/api/leaderboard", leaderboardRoutes);
//   app.use("/api/chat", chatRoutes);
//   app.use("/api/uploads", uploadRoutes);
//   app.use("/api/notifications", notificationRoutes);
//   app.use("/api/streak", streakRoutes);
//   app.use("/api/interview-history", interviewHistoryRoutes);
  
//   // ✅ FIX HERE (IMPORTANT)
//   app.use("/api/dashboard", analyticsRoutes);

//   app.use("/api/weakness-insights", weaknessRoutes);
//   app.use("/api/learning-roadmap", learningRoadmapRoutes);
//   app.use("/api/written-interview", writtenInterviewRoutes);
//   app.use("/api/users", require("./routes/user"));
//   app.use("/api/live-interview", require("./routes/liveInterview"));
//   app.use("/api/users", require("./routes/user"));
//   app.get("/api/test-auth", auth, (req, res) =>
//     res.json({ message: "Token working", user: req.user })
//   );

//   app.use(require("./middlewares/errorHandler"));

//   const server = http.createServer(app);
//   const io = new Server(server, { cors: { origin: "*" } });

//   socketHandler(io);

//   server.listen(PORT, () =>
//     console.log(`🚀 Server running → http://localhost:${PORT}`)
//   );
// }

// main().catch((err) => {
//   console.error("Startup error:", err);
//   process.exit(1);
// });

// require("dotenv").config();

// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");
// const path = require("path");

// const connectDB = require("./config/db");
// const auth = require("./middlewares/auth");

// // Routes
// const authRoutes = require("./routes/auth");
// const questionRoutes = require("./routes/questions");
// const interviewRoutes = require("./routes/interview");
// const creditRoutes = require("./routes/credits");
// const leaderboardRoutes = require("./routes/leaderboard");
// const chatRoutes = require("./routes/chat");
// const uploadRoutes = require("./routes/uploads");
// const notificationRoutes = require("./routes/notifications");
// const streakRoutes = require("./routes/streak");
// const interviewHistoryRoutes = require("./routes/interviewHistory");
// const analyticsRoutes = require("./routes/analytics");
// const weaknessRoutes = require("./routes/weaknessInsights");
// const learningRoadmapRoutes = require("./routes/learningRoadmap");
// const writtenInterviewRoutes = require("./routes/writtenInterview");
// const liveInterviewRoutes = require("./routes/liveInterview");
// const userRoutes = require("./routes/user");

// const socketHandler = require("./socket/socketHandler");

// const PORT = process.env.PORT || 4000;
// const UPLOADS_PATH = path.join(__dirname, "uploads");

// async function main() {
//   await connectDB(process.env.MONGO_URI);

//   const app = express();

//   /* ================= FINAL CORS CONFIG ================= */

//   const allowedOrigins = [
//     "http://localhost:5173",
//     "https://prep-vision-ai.vercel.app"
//   ];

//   app.use(
//     cors({
//       origin: (origin, callback) => {
//         if (!origin) return callback(null, true); // Postman / mobile apps

//         if (allowedOrigins.includes(origin)) {
//           callback(null, origin); // Return exact origin (NOT *)
//         } else {
//           callback(new Error("Not allowed by CORS"));
//         }
//       },
//       credentials: true,
//       methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//       allowedHeaders: ["Content-Type", "Authorization"],
//     })
//   );

//   app.use(express.json());
//   app.set("trust proxy", 1);

//   /* ================= STATIC FILES ================= */

//   app.use("/uploads", express.static(UPLOADS_PATH));

//   /* ================= ROUTES ================= */

//   app.use("/api/auth", authRoutes);
//   app.use("/api/questions", questionRoutes);
//   app.use("/api/interview", interviewRoutes);
//   app.use("/api/credits", creditRoutes);
//   app.use("/api/leaderboard", leaderboardRoutes);
//   app.use("/api/chat", chatRoutes);
//   app.use("/api/uploads", uploadRoutes);
//   app.use("/api/notifications", notificationRoutes);
//   app.use("/api/streak", streakRoutes);
//   app.use("/api/interview-history", interviewHistoryRoutes);
//   app.use("/api/dashboard", analyticsRoutes);
//   app.use("/api/weakness-insights", weaknessRoutes);
//   app.use("/api/learning-roadmap", learningRoadmapRoutes);
//   app.use("/api/written-interview", writtenInterviewRoutes);
//   app.use("/api/live-interview", liveInterviewRoutes);
//   app.use("/api/users", userRoutes);

//   /* ================= TEST AUTH ================= */

//   app.get("/api/test-auth", auth, (req, res) => {
//     res.json({ message: "Token working", user: req.user });
//   });

//   /* ================= ERROR HANDLER ================= */

//   app.use(require("./middlewares/errorHandler"));

//   /* ================= SOCKET.IO ================= */

//   const server = http.createServer(app);

//   const io = new Server(server, {
//     cors: {
//       origin: allowedOrigins,
//       credentials: true,
//     },
//   });

//   socketHandler(io);

//   /* ================= START SERVER ================= */

//   server.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//   });
// }

// main().catch((err) => {
//   console.error("Startup error:", err);
//   process.exit(1);
// });

//before is live

// require("dotenv").config();

// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");
// const path = require("path");

// const connectDB = require("./config/db");
// const auth = require("./middlewares/auth");

// // Routes
// const authRoutes = require("./routes/auth");
// const questionRoutes = require("./routes/questions");
// const interviewRoutes = require("./routes/interview");
// const creditRoutes = require("./routes/credits");
// const leaderboardRoutes = require("./routes/leaderboard");
// const chatRoutes = require("./routes/chat");
// const uploadRoutes = require("./routes/uploads");
// const notificationRoutes = require("./routes/notifications");
// const streakRoutes = require("./routes/streak");
// const interviewHistoryRoutes = require("./routes/interviewHistory");
// const analyticsRoutes = require("./routes/analytics");
// const weaknessRoutes = require("./routes/weaknessInsights");
// const learningRoadmapRoutes = require("./routes/learningRoadmap");
// const writtenInterviewRoutes = require("./routes/writtenInterview");
// const liveInterviewRoutes = require("./routes/liveInterview");
// const userRoutes = require("./routes/user");
// const dashboardRoutes = require("./routes/dashboardRoutes");
// const socketHandler = require("./socket/socketHandler");

// const PORT = process.env.PORT || 4000;
// const UPLOADS_PATH = path.join(__dirname, "uploads");

// async function main() {
//   await connectDB(process.env.MONGO_URI);

//   const app = express();

//   /* ================= FINAL CORS CONFIG ================= */

//   const allowedOrigins = [
//     "http://localhost:5173",
//     "https://prep-vision-ai.vercel.app"
//   ];

//   app.use(
//     cors({
//       origin: (origin, callback) => {
//         if (!origin) return callback(null, true); // Postman / mobile apps

//         if (allowedOrigins.includes(origin)) {
//           callback(null, origin); // Return exact origin (NOT *)
//         } else {
//           callback(new Error("Not allowed by CORS"));
//         }
//       },
//       credentials: true,
//       methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//       allowedHeaders: ["Content-Type", "Authorization"],
//     })
//   );

//   app.use(express.json());
//   app.set("trust proxy", 1);

//   /* ================= STATIC FILES ================= */

//   app.use("/uploads", express.static(UPLOADS_PATH));

//   /* ================= ROUTES ================= */
//   app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK" });
// });
//   app.use("/api/auth", authRoutes);
//   app.use("/api/questions", questionRoutes);
//   app.use("/api/interview", interviewRoutes);
//   app.use("/api/credits", creditRoutes);
//   app.use("/api/leaderboard", leaderboardRoutes);
//   app.use("/api/chat", chatRoutes);
//   app.use("/api/uploads", uploadRoutes);
//   app.use("/api/notifications", notificationRoutes);
//   app.use("/api/streak", streakRoutes);
//   app.use("/api/interview-history", interviewHistoryRoutes);
//   app.use("/api/dashboard", analyticsRoutes);
//   app.use("/api/weakness-insights", weaknessRoutes);
//   app.use("/api/learning-roadmap", learningRoadmapRoutes);
//   app.use("/api/written-interview", writtenInterviewRoutes);
//   app.use("/api/live-interview", liveInterviewRoutes);
//   app.use("/api/users", userRoutes);
//   app.use("/api/dashboard", dashboardRoutes);

//   /* ================= TEST AUTH ================= */

//   app.get("/api/test-auth", auth, (req, res) => {
//     res.json({ message: "Token working", user: req.user });
//   });

//   /* ================= ERROR HANDLER ================= */

//   app.use(require("./middlewares/errorHandler"));

//   /* ================= SOCKET.IO ================= */

//   const server = http.createServer(app);

//   const io = new Server(server, {
//     cors: {
//       origin: allowedOrigins,
//       credentials: true,
//     },
//   });

//   socketHandler(io);

//   /* ================= START SERVER ================= */

//   server.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//   });
// }

// main().catch((err) => {
//   console.error("Startup error:", err);
//   process.exit(1);
// });

//next acc claude code
require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const auth = require("./middlewares/auth");

// Routes
const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questions");
const interviewRoutes = require("./routes/interview");
const creditRoutes = require("./routes/credits");
const leaderboardRoutes = require("./routes/leaderboard");
const chatRoutes = require("./routes/chat");
const uploadRoutes = require("./routes/uploads");
const notificationRoutes = require("./routes/notifications");
const streakRoutes = require("./routes/streak");
const interviewHistoryRoutes = require("./routes/interviewHistory");
const analyticsRoutes = require("./routes/analytics");
const weaknessRoutes = require("./routes/weaknessInsights");
const learningRoadmapRoutes = require("./routes/learningRoadmap");
const writtenInterviewRoutes = require("./routes/writtenInterview");
const liveInterviewRoutes = require("./routes/liveInterview");
const userRoutes = require("./routes/user");
const dashboardRoutes = require("./routes/dashboardRoutes");
const socketHandler = require("./socket/socketHandler");
const settingsRoutes = require("./routes/settings");

const PORT = process.env.PORT || 4000;
const UPLOADS_PATH = path.join(__dirname, "uploads");

async function main() {
  await connectDB(process.env.MONGO_URI);

  const app = express();

  /* ================= CORS CONFIG ================= */

  const allowedOrigins = [
    "http://localhost:5173",
    "https://prep-vision-ai.vercel.app",
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Postman / mobile apps
        if (allowedOrigins.includes(origin)) {
          callback(null, origin);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // ✅ added PATCH
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control", // ✅ added
        "Pragma",        // ✅ added
        "Expires",       // ✅ added
      ],
    })
  );

  // ✅ Handle OPTIONS preflight for all routes explicitly
  app.options("*", cors());

  app.use(express.json());
  app.set("trust proxy", 1);

  /* ================= STATIC FILES ================= */

  app.use("/uploads", express.static(UPLOADS_PATH));

  /* ================= ROUTES ================= */

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/questions", questionRoutes);
  app.use("/api/interview", interviewRoutes);
  app.use("/api/credits", creditRoutes);
  app.use("/api/leaderboard", leaderboardRoutes);
  app.use("/api/chat", chatRoutes);
  app.use("/api/uploads", uploadRoutes);
  app.use("/api/notifications", notificationRoutes);
  app.use("/api/streak", streakRoutes);
  app.use("/api/interview-history", interviewHistoryRoutes);
  app.use("/api/dashboard", analyticsRoutes);
  app.use("/api/weakness-insights", weaknessRoutes);
  app.use("/api/learning-roadmap", learningRoadmapRoutes);
  app.use("/api/written-interview", writtenInterviewRoutes);
  app.use("/api/live-interview", liveInterviewRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/dashboard", dashboardRoutes);
  app.use("/api/settings", settingsRoutes);


  /* ================= TEST AUTH ================= */

  app.get("/api/test-auth", auth, (req, res) => {
    res.json({ message: "Token working", user: req.user });
  });

  /* ================= ERROR HANDLER ================= */

  app.use(require("./middlewares/errorHandler"));

  /* ================= SOCKET.IO ================= */

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  socketHandler(io);

  /* ================= START SERVER ================= */

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error("Startup error:", err);
  process.exit(1);
});