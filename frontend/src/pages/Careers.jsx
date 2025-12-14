import { useNavigate } from "react-router-dom";
import React from "react";

export default function Careers() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* HEADER */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">

          {/* LOGO + NAME (CLICKABLE) */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer focus:outline-none"
          >
            <img
              src="/new.png"
              alt="PrepVision AI"
              className="w-11 h-11 object-contain"
            />
            <span className="text-2xl font-bold">
              PrepVision AI
            </span>
          </button>

        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex items-center justify-center min-h-[80vh] px-6 text-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Careers at PrepVision AI 🚀
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            We’re building the future of AI-powered interview preparation.
            Join us and help learners succeed.
          </p>
        </div>
      </main>

    </div>
  );
}
