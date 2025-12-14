
import { useState } from "react";
import { API } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import React from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.user.id);   // ADD THIS
    localStorage.setItem("name", res.data.user.name);   // ADD THIS

    navigate("/dashboard");
  } catch (err) {
    alert(err.response?.data?.message || "Login error");
  }
};

  return (
    <div className="min-h-screen flex bg-gray-950 text-white overflow-hidden">

      {/* LEFT SECTION — AI Brand */}
      <div className="hidden lg:flex flex-col justify-center px-16 w-1/2 relative">
        
        {/* Glowing Orb Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-500/20 blur-[120px] rounded-full"></div>

        <h1 className="text-5xl font-extrabold z-10 leading-tight">
          Ace Your Interview  
          <span className="text-purple-400"> with AI</span>
        </h1>

        <p className="mt-4 text-gray-300 text-lg z-10">
          Practice real interview questions, improve your skills,  
          and get instant AI-powered feedback.
        </p>

        {/* Animated Highlight Bar */}
        <div className="w-32 h-2 bg-purple-500 rounded-full mt-6 animate-pulse"></div>
      </div>

      {/* RIGHT SECTION — LOGIN CARD */}
      <div className="flex justify-center items-center w-full lg:w-1/2 p-6">
        
        <div className="w-[380px] backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-[0_0_25px_rgba(120,64,255,0.4)] animate-fadeIn">

          <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
          <p className="text-center text-gray-300 mb-8">
            Log in to start your AI interview journey
          </p>

          {/* EMAIL INPUT */}
          <label className="text-gray-300 text-sm">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition mb-5"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD INPUT */}
          <label className="text-gray-300 text-sm">Password</label>
          <input
            type="password"
            className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition mb-6"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 font-semibold text-white shadow-lg hover:shadow-purple-500/40 transition-all"
          >
            Login
          </button>

          {/* Separator */}
          <div className="my-6 border-t border-gray-700"></div>

          <p className="text-center text-gray-300">
            New here?{" "}
            <Link to="/register" className="text-purple-400 font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
