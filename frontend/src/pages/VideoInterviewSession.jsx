import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const QUESTIONS = [
  "Introduce yourself",
  "Explain closures in JavaScript",
  "What is a REST API?",
  "How do you handle failure?",
];

export default function VideoInterviewSession() {
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  /* --------------------------------
     CAMERA + MIC STREAM
  -------------------------------- */
  useEffect(() => {
    async function initMedia() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
    }

    initMedia();
  }, []);

  /* --------------------------------
     TIMER
  -------------------------------- */
  useEffect(() => {
    if (!listening) return;

    if (timeLeft === 0) {
      stopAnswer();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [listening, timeLeft]);

  const startAnswer = () => {
    setListening(true);
    setTimeLeft(60);
  };

  const stopAnswer = () => {
    setListening(false);
  };

  const nextQuestion = () => {
    setListening(false);
    setTimeLeft(60);
    setCurrentIndex((i) => i + 1);
  };

  const isFinished = currentIndex >= QUESTIONS.length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-28 px-6 text-white
        bg-gradient-to-b from-black via-gray-900 to-black">

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* VIDEO PANEL */}
          <div className="bg-black/40 border border-white/20
            rounded-2xl p-4 shadow-xl">

            <video
              ref={videoRef}
              autoPlay
              muted
              className="rounded-xl w-full h-[360px] object-cover"
            />

            <div className="mt-3 flex justify-between text-sm text-gray-300">
              <span>🎥 Camera Active</span>
              <span>🎙 Mic Active</span>
            </div>
          </div>

          {/* INTERVIEW PANEL */}
          <div className="bg-white/10 border border-white/20
            rounded-2xl p-6 shadow-xl flex flex-col">

            {!isFinished ? (
              <>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <h2 className="text-xl font-semibold text-purple-300 mb-2">
                    Question {currentIndex + 1}
                  </h2>

                  <p className="text-lg text-gray-200">
                    {QUESTIONS[currentIndex]}
                  </p>
                </motion.div>

                {/* LISTENING STATUS */}
                <div className="mb-4">
                  {listening ? (
                    <div className="flex items-center gap-3 text-green-400">
                      <span className="animate-pulse text-2xl">🎤</span>
                      AI is listening... ({timeLeft}s)
                    </div>
                  ) : (
                    <div className="text-gray-400">
                      Click start when ready to answer
                    </div>
                  )}
                </div>

                {/* CONTROLS */}
                <div className="mt-auto flex gap-3">
                  {!listening ? (
                    <button
                      onClick={startAnswer}
                      className="flex-1 py-3 rounded-lg
                      bg-green-600 hover:bg-green-500
                      font-semibold transition"
                    >
                      Start Answer
                    </button>
                  ) : (
                    <button
                      onClick={stopAnswer}
                      className="flex-1 py-3 rounded-lg
                      bg-red-600 hover:bg-red-500
                      font-semibold transition"
                    >
                      Stop
                    </button>
                  )}

                  <button
                    onClick={nextQuestion}
                    className="flex-1 py-3 rounded-lg
                    bg-purple-600 hover:bg-purple-500
                    font-semibold transition"
                  >
                    Next →
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center my-auto">
                <h2 className="text-3xl font-bold text-purple-400">
                  Interview Completed 🎉
                </h2>
                <p className="text-gray-300 mt-2">
                  AI is preparing your report...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
