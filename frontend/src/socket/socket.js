// import io from "socket.io-client";

// const SOCKET_URL = "http://localhost:4000";

// const socket = io(SOCKET_URL, {
//   transports: ["websocket"],
// });

// export default socket;

import { io } from "socket.io-client";

/*
  Automatically switches between:
  - Localhost (development)
  - Render backend (production)
*/

const SOCKET_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],   // Force websocket (avoids polling CORS issues)
  withCredentials: true,       // Required because backend uses credentials: true
  autoConnect: true,
});

export default socket;