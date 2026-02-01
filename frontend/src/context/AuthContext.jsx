// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
// import { API } from "../api/api";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await API.get("/auth/me");
      if (res?.data?.user) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.error("loadUser error:", err);
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}
