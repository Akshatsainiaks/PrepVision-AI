// // src/context/AuthContext.jsx
// import React, { createContext, useState, useEffect } from "react";
// // import { API } from "../api/api";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const loadUser = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await API.get("/auth/me");
//       if (res?.data?.user) {
//         setUser(res.data.user);
//       }
//     } catch (err) {
//       console.error("loadUser error:", err);
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout, loadUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }


// // src/context/AuthContext.jsx
// import React, { createContext, useState, useEffect } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const loadUser = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await API.get("/auth/me");
//       if (res?.data?.user) {
//         setUser(res.data.user);
//       }
//     } catch (err) {
//       console.error("loadUser error:", err);
//       // If token is invalid, clear it
//       localStorage.removeItem("token");
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   const logout = () => {
//     // 1. Clear Auth Token
//     localStorage.removeItem("token");
    
//     // 2. FIXED: Clear the announcement flag so it shows up on next login
//     sessionStorage.removeItem("announcement_closed");
    
//     // 3. Reset State
//     setUser(null);
    
//     // 4. Redirect
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout, loadUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// //new before
// import React, { createContext, useState, useEffect } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // Track initial boot
//   const [isServerOff, setIsServerOff] = useState(false); // Track server status
//   const navigate = useNavigate();

//   const loadUser = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       const res = await API.get("/auth/me");
//       if (res?.data?.user) {
//         setUser(res.data.user);
//         setIsServerOff(false); // Reset status if successful
//       }
//     } catch (err) {
//       console.error("loadUser error:", err);
      
//       // If there is no response object, the server is unreachable
//       if (!err.response) {
//         setIsServerOff(true);
//       } else {
//         localStorage.removeItem("token");
//         setUser(null);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     sessionStorage.removeItem("announcement_closed");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout, loadUser, loading, isServerOff }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// import React, { createContext, useState, useEffect, useRef } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isServerOff, setIsServerOff] = useState(false);
//   const navigate = useNavigate();

//   const hasLoaded = useRef(false); // ✅ prevent double call

//   const loadUser = async () => {
//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       const res = await API.get("/auth/myprofile"); // ✅ UPDATED

//       if (res?.data?.user) {
//         setUser(res.data.user);
//         setIsServerOff(false);
//       }
//     } catch (err) {
//       console.error("loadUser error:", err);

//       if (!err.response) {
//         setIsServerOff(true);
//       } else {
//         localStorage.removeItem("token");
//         setUser(null);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (hasLoaded.current) return;
//     hasLoaded.current = true;

//     loadUser();
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     sessionStorage.removeItem("announcement_closed");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, setUser, logout, loadUser, loading, isServerOff }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

//before this is final live

// import React, { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [isServerOff, setIsServerOff] = useState(false);
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     sessionStorage.removeItem("announcement_closed");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, setUser, logout, isServerOff }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// import React, { createContext, useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/api";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isServerOff, setIsServerOff] = useState(false);

//   const navigate = useNavigate();
//   const hasLoaded = useRef(false);

//   const checkServer = async () => {
//     try {
//       const base =
//         (import.meta.env.VITE_API_URL || "http://localhost:4000/api")
//           .replace("/api", "");

//       await fetch(`${base}/health`);
//       return true;
//     } catch {
//       return false;
//     }
//   };

//  const loadUser = async () => {
//   try {
//     // ❌ REMOVE setLoading(true) from retry
//     const alive = await checkServer();

//     if (!alive) {
//       setIsServerOff(true);
//       return;
//     }

//     setIsServerOff(false);

//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const res = await API.get("/auth/myprofile");

//     if (res?.data?.user) {
//       setUser(res.data.user);
//     }
//   } catch (err) {
//     if (!err.response) {
//       setIsServerOff(true);
//     }
//   }
// };
// useEffect(() => {
//   if (hasLoaded.current) return;
//   hasLoaded.current = true;

//   const init = async () => {
//     setLoading(true);
//     await loadUser();
//     setLoading(false);
//   };

//   init();
// }, []);

//   useEffect(() => {
//     const handleOffline = () => setIsServerOff(true);

//     window.addEventListener("server-offline", handleOffline);

//     return () =>
//       window.removeEventListener("server-offline", handleOffline);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     sessionStorage.removeItem("announcement_closed");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         setUser,
//         logout,
//         loadUser,
//         loading,
//         isServerOff,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }


import React, { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isServerOff, setIsServerOff] = useState(false);

  const navigate = useNavigate();
  const hasLoaded = useRef(false);

  const checkServer = async () => {
    try {
      const base = (
        import.meta.env.VITE_API_URL || "http://localhost:4000/api"
      ).replace("/api", "");

      const res = await fetch(`${base}/health`);
      return res.ok;
    } catch {
      return false;
    }
  };

  // ✅ Uses /auth/checkuser — lightweight, only for auth verification
  const loadUser = async () => {
    try {
      const alive = await checkServer();

      if (!alive) {
        setIsServerOff(true);
        return;
      }

      setIsServerOff(false);

      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await API.get("/auth/checkuser"); // ✅ NEW endpoint

      if (res?.data?.user) {
        setUser(res.data.user);
      }
    } catch (err) {
      if (!err.response) {
        setIsServerOff(true);
      }
    }
  };

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const init = async () => {
      setLoading(true);
      await loadUser();
      setLoading(false);
    };

    init();
  }, []);

  useEffect(() => {
    const handleOffline = () => setIsServerOff(true);
    window.addEventListener("server-offline", handleOffline);
    return () => window.removeEventListener("server-offline", handleOffline);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("announcement_closed");
    setUser(null);
    navigate("/");
  };

  // ✅ After login:
  // 1. Set user instantly from login response (no flicker/delay)
  // 2. Always call checkuser so it shows in network tab + syncs latest data
  const loginAndLoad = async (token, userFromResponse = null) => {
    localStorage.setItem("token", token);

    if (userFromResponse) {
      setUser(userFromResponse); // instant — no waiting
    }

    await loadUser(); // calls /auth/checkuser — visible in network tab ✅
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        loadUser,
        loginAndLoad,
        loading,
        isServerOff,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}