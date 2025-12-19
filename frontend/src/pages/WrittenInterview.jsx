import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { startWrittenInterview } from "../api/writtenInterviewApi";

const PRESET_TOPICS = ["DSA", "DBMS", "OS", "CN", "HR", "React"];

export default function MockWrittenStart() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("Medium");
  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    if (!topic.trim()) return;

    try {
      setLoading(true);

      // 🔥 CALL BACKEND
      const session = await startWrittenInterview(topic, level);

      // 🔥 NAVIGATE USING SESSION ID
      navigate(`/mock/written/interview/${session._id}`);
    } catch (err) {
      alert("Failed to start interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-28 px-6 text-white
        bg-gradient-to-b from-black via-gray-900 to-black">

        <div className="max-w-xl mx-auto">

          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-center
            bg-gradient-to-r from-purple-400 to-blue-400
            text-transparent bg-clip-text"
          >
            Written Interview
          </motion.h2>

          <p className="text-gray-400 text-center mt-4">
            Practice AI-generated interview questions by writing your answers.
          </p>

          {/* CARD */}
          <div className="mt-10 p-8 rounded-2xl
            bg-white/10 backdrop-blur-xl
            border border-white/20 shadow-xl">

            {/* TOPICS */}
            <label className="text-sm text-gray-300">Select a Topic</label>

            <div className="flex flex-wrap gap-3 mt-3">
              {PRESET_TOPICS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`px-4 py-2 rounded-full text-sm border transition
                    ${
                      topic === t
                        ? "bg-purple-600/30 border-purple-500 text-white"
                        : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* CUSTOM TOPIC */}
            <div className="mt-4">
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Or enter a custom topic (e.g. Kubernetes)"
                className="w-full p-3 rounded-lg
                bg-gray-900/50 border border-gray-700
                focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* LEVEL */}
            <label className="text-sm text-gray-300 mt-6 block">
              Difficulty Level
            </label>

            <div className="flex gap-3 mt-3">
              {["Easy", "Medium", "Hard"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`flex-1 py-2 rounded-lg border transition
                    ${
                      level === l
                        ? "bg-blue-600/30 border-blue-500 text-white"
                        : "bg-white/5 border-white/20 text-gray-300"
                    }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* INFO */}
            <div className="mt-6 text-sm text-gray-400 space-y-2">
              <p>• 5 AI-generated questions</p>
              <p>• Timed evaluation</p>
              <p>• AI feedback + correct answers</p>
            </div>

            {/* START */}
            <button
              onClick={startInterview}
              disabled={!topic.trim() || loading}
              className={`w-full mt-8 py-3 rounded-lg font-semibold transition
                ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
                }`}
            >
              {loading ? "Starting..." : "Start Written Interview"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
