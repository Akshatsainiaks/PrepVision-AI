import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { FaKeyboard, FaVideo } from "react-icons/fa";
import { motion } from "framer-motion";
import { API } from "../api/api"; // ✅ ADD THIS

export default function MockInterviewHome() {
  const navigate = useNavigate();

  /* -------------------------------
     START LIVE INTERVIEW (FIX)
  -------------------------------- */
  const startLiveInterview = async () => {
    try {
      const res = await API.post("/live-interview/start", {
        topic: "General",
        role: "SDE",
      });

      navigate(`/mock/live/session/${res.data._id}`);
    } catch (err) {
      alert("Failed to start live interview");
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen pt-28 px-6 text-white
        bg-gradient-to-b from-black via-gray-900 to-black"
      >
        <div className="max-w-5xl mx-auto text-center">

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold
            bg-gradient-to-r from-purple-400 to-blue-400
            text-transparent bg-clip-text"
          >
            Mock Interview
          </motion.h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Practice interviews powered by AI.
            Choose your preferred interview style.
          </p>

          {/* CARDS */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* WRITTEN */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/mock/written")}
              className="cursor-pointer relative p-8 rounded-2xl
              bg-white/10 backdrop-blur-xl border border-white/20
              hover:border-purple-500 transition-all"
            >
              <FaKeyboard size={36} className="text-purple-400 mx-auto" />

              <h2 className="text-2xl font-bold mt-5">
                Written Interview
              </h2>

              <p className="text-gray-300 mt-3">
                Answer interview questions by typing.
                AI evaluates correctness and depth.
              </p>

              <ul className="mt-5 text-sm text-gray-400 space-y-1">
                <li>• Topic-based questions</li>
                <li>• Logical evaluation</li>
                <li>• Detailed feedback</li>
              </ul>

              <span
                className="absolute top-4 right-4
                text-xs px-3 py-1 rounded-full
                bg-purple-600/20 text-purple-300"
              >
                Beginner Friendly
              </span>
            </motion.div>

            {/* LIVE (FIXED) */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={startLiveInterview}  
              className="cursor-pointer relative p-8 rounded-2xl
              bg-white/10 backdrop-blur-xl border border-white/20
              hover:border-blue-500 transition-all"
            >
              <FaVideo size={36} className="text-blue-400 mx-auto" />

              <h2 className="text-2xl font-bold mt-5">
                Live AI Interview
              </h2>

              <p className="text-gray-300 mt-3">
                Real interview using camera, microphone and AI voice.
              </p>

              <ul className="mt-5 text-sm text-gray-400 space-y-1">
                <li>• Voice-based questions</li>
                <li>• Gesture & eye-contact feedback</li>
                <li>• Confidence analysis</li>
              </ul>

              <span
                className="absolute top-4 right-4
                text-xs px-3 py-1 rounded-full
                bg-blue-600/20 text-blue-300"
              >
                ⭐ Recommended
              </span>
            </motion.div>

          </div>

          {/* FOOT NOTE */}
          <p className="mt-10 text-sm text-gray-500">
            ⚠ Live interview requires camera & microphone access
          </p>

        </div>
      </div>
    </>
  );
}
