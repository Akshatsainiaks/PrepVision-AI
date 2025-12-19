import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  submitWrittenAnswer,
  finishWrittenInterview,
} from "../api/writtenInterviewApi";
import { API } from "../api/api";

export default function MockWrittenInterview() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [session, setSession] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);

  /* -------------------------------
     FETCH SESSION
  -------------------------------- */
  useEffect(() => {
    if (!sessionId) {
      navigate("/mock");
      return;
    }

    API.get(`/written-interview/session/${sessionId}`)
      .then((res) => {
        setSession(res.data);
        setAnswer(res.data.questions[0]?.userAnswer || "");
      })
      .catch(() => navigate("/mock"));
  }, [sessionId, navigate]);

  /* -------------------------------
     TIMER
  -------------------------------- */
  useEffect(() => {
    if (!session) return;

    if (timeLeft <= 0) {
      handleNext();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, session]);

  if (!session) return null;

  const total = session.questions.length;
  const question = session.questions[current];

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  /* -------------------------------
     SAVE ANSWER
  -------------------------------- */
  const saveAnswer = async () => {
    if (!answer.trim()) return;

    await submitWrittenAnswer({
      sessionId,
      index: current,
      answer,
    });
  };

  /* -------------------------------
     NEXT QUESTION
  -------------------------------- */
  const handleNext = async () => {
    await saveAnswer();

    if (current + 1 < total) {
      const nextIndex = current + 1;
      setCurrent(nextIndex);
      setAnswer(session.questions[nextIndex]?.userAnswer || "");
      setTimeLeft(180);
    } else {
      handleFinish();
    }
  };

  /* -------------------------------
     FINISH INTERVIEW
  -------------------------------- */
  const handleFinish = async () => {
    await saveAnswer();
    await finishWrittenInterview(sessionId);

    navigate(`/mock/written/report/${sessionId}`);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-28 px-6 text-white bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-purple-300">
              {session.topic} Interview ({session.level})
            </h3>

            <div className="text-gray-300 font-mono">
              ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
            </div>
          </div>

          {/* PROGRESS */}
          <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all"
              style={{
                width: `${((current + 1) / total) * 100}%`,
              }}
            />
          </div>

          {/* QUESTION */}
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
          >
            <p className="text-gray-400 mb-2">
              Question {current + 1} of {total}
            </p>

            <h2 className="text-xl font-semibold text-white">
              {question.question}
            </h2>
          </motion.div>

          {/* ANSWER INPUT */}
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here..."
            className="w-full mt-6 h-48 p-4 rounded-xl bg-gray-900/60 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {/* ACTIONS */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleFinish}
              className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              Finish Early
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 font-semibold hover:opacity-90"
            >
              {current + 1 === total ? "Finish Interview" : "Next Question →"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
