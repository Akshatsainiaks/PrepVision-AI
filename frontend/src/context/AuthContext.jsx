// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // try to load user from /auth/me (if backend has it) or from token
  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      // if backend has /auth/me, this will populate user; otherwise keep a minimal user
      const res = await API.get("/auth/me").catch(() => null);
      if (res?.data?.user) {
        setUser(res.data.user);
        localStorage.setItem("userId", res.data.user.id || res.data.user._id);
      } else {
        // minimal fallback: set a marker so ProtectedRoute knows we have a token
        setUser({ tokenPresent: true });
      }
    } catch (err) {
      console.error("loadUser error", err);
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}
