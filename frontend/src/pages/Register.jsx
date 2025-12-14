


import { useState } from "react";
import { API } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

const handleSubmit = async () => {
  try {
    const res = await API.post("/auth/register", {
      name, email, password, phone
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.user.id);   // ADD THIS
    localStorage.setItem("name", res.data.user.name);   // ADD THIS

    navigate("/dashboard");
  } catch (err) {
    alert(err.response?.data?.message || "Registration error");
  }
};

  return (
    <div className="min-h-screen flex bg-gray-950 text-white overflow-hidden">

      {/* LEFT SECTION — BRANDING */}
      <div className="hidden lg:flex flex-col justify-center px-16 w-1/2 relative">
        
        {/* Glow BG effect */}
        <div className="absolute inset-0 bg-gradient-to-br 
            from-purple-600/20 to-blue-400/20 blur-[120px] rounded-full">
        </div>

        <h1 className="text-5xl font-extrabold z-10 leading-tight">
          Join the  
          <span className="text-purple-400"> AI Interview Revolution</span>
        </h1>

        <p className="mt-4 text-gray-300 text-lg z-10">
          Build your profile and start practicing with AI-driven interview simulations.
        </p>

        <div className="w-32 h-2 bg-purple-500 rounded-full mt-6 animate-pulse"></div>
      </div>

      {/* RIGHT SECTION — FORM */}
      <div className="flex justify-center items-center w-full lg:w-1/2 p-6">
        
        <div className="w-[380px] backdrop-blur-2xl bg-white/10 border border-white/20 
            rounded-2xl p-8 shadow-[0_0_25px_rgba(120,64,255,0.4)] animate-fadeIn">

          <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
          <p className="text-center text-gray-300 mb-8">
            Become part of an AI-powered learning experience
          </p>

          {/* Name */}
          <label className="text-gray-300 text-sm">Full Name</label>
          <input
            type="text"
            className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
                text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 
                outline-none transition mb-4"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email */}
          <label className="text-gray-300 text-sm">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
                text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500
                outline-none transition mb-4"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Phone */}
          <label className="text-gray-300 text-sm">Phone Number</label>
          <input
            type="text"
            className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
                text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500
                outline-none transition mb-4"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* Password */}
          <label className="text-gray-300 text-sm">Password</label>
          <input
            type="password"
            className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
                text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500
                outline-none transition mb-6"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Register Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg bg-gradient-to-r 
                from-purple-600 to-blue-600 font-semibold text-white shadow-lg 
                hover:shadow-purple-500/40 transition-all"
          >
            Register
          </button>

          {/* Divider */}
          <div className="my-6 border-t border-gray-700"></div>

          <p className="text-center text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 font-semibold hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
