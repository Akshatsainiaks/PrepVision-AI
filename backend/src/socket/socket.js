// import io from "socket.io-client";

// const SOCKET_URL = "http://localhost:4000";

// const socket = io(SOCKET_URL, {
//   transports: ["websocket"],
// });

// export default socket;

/* ================= SOCKET.IO ================= */

const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://prep-vision-ai.vercel.app"
];

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Allow Postman/mobile

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Socket CORS not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST"],
  },
  transports: ["websocket"], // 🔥 Force websocket only (important)
});

socketHandler(io);