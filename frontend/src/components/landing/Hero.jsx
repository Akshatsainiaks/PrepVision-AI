// src/components/landing/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Hero({ onStart }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Ace Your Interviews with AI
      </h1>

      <p className="text-gray-300 max-w-xl mx-auto mt-5">
        Real-time AI interviews, instant feedback, voice analysis & personalized improvement plans.
      </p>

      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={onStart}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600"
        >
          Start Exploring
        </button>

        <Link to="/register" className="px-6 py-3 rounded-xl bg-white/10">
          Create Account
        </Link>
      </div>
    </section>
  );
}
