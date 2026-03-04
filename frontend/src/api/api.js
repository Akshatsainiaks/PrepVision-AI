// // src/api/api.js
// import axios from "axios";

// export const API = axios.create({
//   baseURL: "http://localhost:4000/api",
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
// });

// /* ================= REQUEST ================= */
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// /* ================= RESPONSE ================= */
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default API;

// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// /* ================= REQUEST ================= */
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /* ================= RESPONSE ================= */
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");

//       if (window.location.pathname !== "/login") {
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default API;

//before this is live

// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// /* ================= REQUEST ================= */
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /* ================= RESPONSE ================= */
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // ✅ SERVER OFF (no response means backend unreachable)
//     if (!error.response) {
//       window.dispatchEvent(new Event("server-offline"));
//       return Promise.reject(error);
//     }

//     // ✅ UNAUTHORIZED
//     if (error.response.status === 401) {
//       localStorage.removeItem("token");

//       if (window.location.pathname !== "/login") {
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default API;

//next acc claude code
// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Request interceptor — attach auth token if present
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ Response interceptor — handle auth errors globally
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default API;

// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Attach token automatically
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ Handle 401 safely (NO PAGE RELOAD)
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // remove invalid token
//       localStorage.removeItem("token");

//       // ❌ DO NOT reload page
//       // ❌ DO NOT use window.location.href
//       // Let ProtectedRoute handle redirect
//     }

//     return Promise.reject(error);
//   }
// );

// export default API;

//next acc claude code
// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Attach token automatically
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ Handle 401 globally — but skip endpoints that handle their own auth errors
// const SKIP_REDIRECT_URLS = [
//   "/auth/login",
//   "/auth/register",
//   "/settings/password",  // ✅ password change handles 401 ("wrong password") itself
// ];

// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       const url = error.config?.url || "";
//       const isSkipped = SKIP_REDIRECT_URLS.some((path) => url.includes(path));

//       if (!isSkipped) {
//         localStorage.removeItem("token");
//         window.location.replace("/login");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default API;

//new
import axios from "axios";
import { tokenStore } from "./tokenStore";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token automatically from in-memory store
API.interceptors.request.use(
  (config) => {
    const token = tokenStore.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle 401 globally
const SKIP_REDIRECT_URLS = [
  "/auth/login",
  "/auth/register",
  "/settings/password",
];

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url || "";
      const isSkipped = SKIP_REDIRECT_URLS.some((path) => url.includes(path));
      if (!isSkipped) {
        tokenStore.clear();
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default API;