import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function InterviewReport() {
  const report = {
    overallScore: 72,
    verdict: "Good, but needs improvement",
    communication: {
      confidence: 7,
      eyeContact: 6,
      gestures: 5,
      voiceClarity: 8,
    },
    technical: {
      correct: 3,
      wrong: 2,
    },
    questions: [
      {
        q: "Explain closures in JavaScript",
        feedback: "Good explanation but missed lexical scope",
        correctAnswer:
          "A closure is a function that remembers variables from its outer scope even after execution.",
      },
      {
        q: "What is REST API?",
        feedback: "Correct but lacked real-world example",
        correctAnswer:
          "REST is an architectural style using HTTP methods like GET, POST, PUT, DELETE.",
      },
    ],
    improvements: [
      "Revise JavaScript closures",
      "Practice system design basics",
      "Improve eye contact while speaking",
    ],
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-28 px-6 text-white
        bg-gradient-to-b from-black via-gray-900 to-black">

        <div className="max-w-6xl mx-auto space-y-10">

          {/* OVERALL SCORE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 border border-white/20
            rounded-2xl p-8 text-center shadow-xl"
          >
            <h2 className="text-4xl font-extrabold text-purple-400">
              Interview Report
            </h2>

            <div className="mt-6 text-6xl font-bold text-green-400">
              {report.overallScore}/100
            </div>

            <p className="mt-2 text-gray-300">
              {report.verdict}
            </p>
          </motion.div>

          {/* COMMUNICATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-white/10 border border-white/20
              rounded-xl p-6 shadow">
              <h3 className="text-xl font-semibold text-purple-300 mb-4">
                Communication Analysis
              </h3>

              {Object.entries(report.communication).map(([key, val]) => (
                <div key={key} className="mb-3">
                  <div className="flex justify-between text-gray-300">
                    <span className="capitalize">{key}</span>
                    <span>{val}/10</span>
                  </div>

                  <div className="w-full bg-gray-800/40 rounded-full h-2 mt-1">
                    <div
                      className="h-2 bg-purple-500 rounded-full"
                      style={{ width: `${val * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* TECHNICAL */}
            <div className="bg-white/10 border border-white/20
              rounded-xl p-6 shadow">
              <h3 className="text-xl font-semibold text-purple-300 mb-4">
                Technical Performance
              </h3>

              <p className="text-gray-300">
                ✅ Correct Answers: {report.technical.correct}
              </p>
              <p className="text-gray-300">
                ❌ Wrong Answers: {report.technical.wrong}
              </p>
            </div>
          </div>

          {/* QUESTION FEEDBACK */}
          <div className="bg-white/10 border border-white/20
            rounded-xl p-6 shadow">
            <h3 className="text-xl font-semibold text-purple-300 mb-4">
              Question-wise Feedback
            </h3>

            {report.questions.map((q, idx) => (
              <div
                key={idx}
                className="mb-6 p-4 bg-black/30
                border border-gray-700 rounded-lg"
              >
                <p className="font-semibold text-white">{q.q}</p>

                <p className="mt-2 text-yellow-300">
                  Feedback: {q.feedback}
                </p>

                <p className="mt-2 text-green-300">
                  Correct Answer:
                </p>

                <pre className="whitespace-pre-wrap text-gray-300 mt-1">
                  {q.correctAnswer}
                </pre>
              </div>
            ))}
          </div>

          {/* IMPROVEMENT PLAN */}
          <div className="bg-white/10 border border-white/20
            rounded-xl p-6 shadow">
            <h3 className="text-xl font-semibold text-purple-300 mb-4">
              What to Improve Next
            </h3>

            <ul className="list-disc list-inside text-gray-300">
              {report.improvements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
