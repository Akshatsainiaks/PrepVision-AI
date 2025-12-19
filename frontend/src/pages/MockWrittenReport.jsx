import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { getWrittenInterviewSession } from "../api/writtenInterviewApi";

export default function MockWrittenReport() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  /* -------------------------------
     FETCH SESSION
  -------------------------------- */
  useEffect(() => {
    if (!sessionId) {
      navigate("/mock");
      return;
    }

    getWrittenInterviewSession(sessionId)
      .then((data) => {
        setSession(data);
        setLoading(false);
      })
      .catch(() => {
        navigate("/mock");
      });
  }, [sessionId, navigate]);

  /* -------------------------------
     LOADING STATE
  -------------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading interview report...
      </div>
    );
  }

  if (!session) return null;

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-28 px-6 text-white bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Interview Report
            </h1>
            <p className="text-gray-400 mt-2">
              {session.topic} • {session.level} Level
            </p>
          </motion.div>

          {/* QUESTIONS */}
          <div className="space-y-6">
            {session.questions.map((q, idx) => (
              <div
                key={q._id}
                className="p-6 rounded-2xl bg-white/10 border border-white/20 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-white">
                  Q{idx + 1}. {q.question}
                </h3>

                <p className="mt-3 text-gray-300">
                  <span className="text-gray-400">Your Answer:</span>
                  <br />
                  {q.userAnswer || "— Not Answered —"}
                </p>

                <div className="mt-4 flex gap-4 text-sm">
                  <span className="px-3 py-1 rounded-full bg-green-600/20 text-green-300">
                    Score: {q.aiScore ?? "—"}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-300">
                    {q.aiFeedback || "Feedback Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="mt-10">
            <button
              onClick={() => navigate("/mock")}
              className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              Take Another Interview
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
