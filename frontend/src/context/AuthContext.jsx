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

//new before
import React, { createContext, useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track initial boot
  const [isServerOff, setIsServerOff] = useState(false); // Track server status
  const navigate = useNavigate();

  const loadUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await API.get("/auth/me");
      if (res?.data?.user) {
        setUser(res.data.user);
        setIsServerOff(false); // Reset status if successful
      }
    } catch (err) {
      console.error("loadUser error:", err);
      
      // If there is no response object, the server is unreachable
      if (!err.response) {
        setIsServerOff(true);
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("announcement_closed");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loadUser, loading, isServerOff }}>
      {children}
    </AuthContext.Provider>
  );
}