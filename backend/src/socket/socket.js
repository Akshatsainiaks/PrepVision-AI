// import io from "socket.io-client";

// const SOCKET_URL = "http://localhost:4000";

// const socket = io(SOCKET_URL, {
//   transports: ["websocket"],
// });

// export default socket;

/* ================= SOCKET.IO ================= */

// const server = http.createServer(app);

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://prep-vision-ai.vercel.app"
// ];

// const io = new Server(server, {
//   cors: {
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true); // Allow Postman/mobile

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error("Socket CORS not allowed"));
//     },
//     credentials: true,
//     methods: ["GET", "POST"],
//   },
//   transports: ["websocket"], // 🔥 Force websocket only (important)
// });

// socketHandler(io);
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

// ── Middleware ─────────────────────────────────────────────
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://prep-vision-ai.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// ── Routes ─────────────────────────────────────────────────
app.use("/api/auth",   require("./routes/authRoutes"));
app.use("/api/chat",   require("./routes/chatRoutes"));
// add your other routes here...

// ── MongoDB ────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// ── HTTP + Socket.IO Server ────────────────────────────────
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Socket CORS not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST"],
  },
  transports: ["websocket"],
});

// ── Socket Auth Middleware ─────────────────────────────────
// This runs BEFORE any socket event handler.
// It verifies the JWT and attaches the real userId to socket.data
// so we NEVER trust userId sent from the client in payloads.
io.use((socket, next) => {
  try {
    // Token can come from socket auth or cookie
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.cookie
        ?.split(";")
        .find((c) => c.trim().startsWith("token="))
        ?.split("=")[1];

    if (!token) {
      // Allow connection but mark as unauthenticated
      socket.data.userId = null;
      socket.data.name   = "Guest";
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.data.userId = decoded.id || decoded._id || decoded.userId;
    socket.data.name   = decoded.name || "User";
    next();
  } catch (err) {
    // Invalid token — still allow connection but no userId
    socket.data.userId = null;
    socket.data.name   = "Guest";
    next();
  }
});

// ── Socket Handler ─────────────────────────────────────────
const socketHandler = require("./socket/socketHandler");
socketHandler(io);

// ── Start ──────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));