import { useState } from "react";
import Navbar from "../components/Navbar";
import { API } from "../api/api";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function MockInterview() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [session, setSession] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  /* -------------------------------
      START INTERVIEW
  -------------------------------- */
  const startMut = useMutation({
    mutationFn: async () => {
      const res = await API.post("/interview/start", { company, role });
      return res.data;
    },
    onSuccess: (data) => {
      setSession(data);
      setCurrentIndex(0);
      setAnswer("");
    },
    onError: (err) =>
      alert(err.response?.data?.message || "Error starting interview"),
  });

  /* -------------------------------
      SUBMIT ANSWER
  -------------------------------- */
  const submitMut = useMutation({
    mutationFn: async (payload) => {
      const res = await API.post("/interview/answer", payload);
      return res.data;
    },
    onSuccess: (data) => {
      setSession((prev) => {
        const updated = { ...prev };
        updated.questions[currentIndex] = {
          ...updated.questions[currentIndex],
          ...data,
        };
        return updated;
      });

      setCurrentIndex((i) => i + 1);
      setAnswer("");
    },
    onError: (err) =>
      alert(err.response?.data?.message || "Error evaluating answer"),
  });

  /* -------------------------------
      FINISH INTERVIEW
  -------------------------------- */
  const finishMut = useMutation({
    mutationFn: async (payload) => {
      const res = await API.post("/interview/finish", payload);
      return res.data;
    },
    onSuccess: (data) => setSession(data),
  });

  const start = () => {
    if (!company || !role) return alert("Please enter company & role");
    startMut.mutate();
  };

  const submitAnswer = () => {
    if (!answer.trim()) return alert("Please write an answer");
    if (!session) return;

    submitMut.mutate({
      sessionId: session._id,
      index: currentIndex,
      answer,
    });
  };

  const finish = () => {
    finishMut.mutate({ sessionId: session._id });
    setCurrentIndex(session.questions.length);
  };

  const isFinished =
    session && currentIndex >= session.questions.length;

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10 text-white">

        {/* ------------------------------------------ */}
        {/* START SCREEN */}
        {/* ------------------------------------------ */}
        {!session && (
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 
            rounded-2xl p-8 shadow-[0_0_25px_rgba(120,64,255,0.4)] text-center">

            <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Start Mock Interview
            </h2>

            <p className="text-gray-300 mb-6">
              AI will simulate real interview questions and evaluate your answers.
            </p>

            <input
              className="w-full bg-gray-900/40 border border-gray-700 p-3 rounded-lg text-gray-200 
              placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none mb-4"
              placeholder="Company (Google, Amazon...)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

            <input
              className="w-full bg-gray-900/40 border border-gray-700 p-3 rounded-lg text-gray-200 
              placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none mb-6"
              placeholder="Role (SDE, Analyst...)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />

            <button
              onClick={start}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 
              text-white font-semibold shadow-lg hover:shadow-purple-500/40 transition"
            >
              Start Interview
            </button>
          </div>
        )}

        {/* ------------------------------------------ */}
        {/* INTERVIEW ACTIVE */}
        {/* ------------------------------------------ */}
        {session && !isFinished && (
          <div className="mt-6">

            {/* HEADER INFO */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-purple-300">
                {session.company} — {session.role}
              </h3>

              <span className="text-gray-300">
                Question {currentIndex + 1} / {session.questions.length}
              </span>
            </div>

            {/* PROGRESS BAR */}
            <div className="w-full bg-gray-800/40 rounded-full h-2 mb-6">
              <div
                className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
                style={{
                  width: `${((currentIndex + 1) / session.questions.length) * 100}%`,
                }}
              ></div>
            </div>

            {/* QUESTION CARD */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl 
                shadow-[0_0_20px_rgba(120,64,255,0.3)]">

              <p className="text-lg text-gray-200 leading-relaxed">
                {session.questions[currentIndex].question}
              </p>
            </div>

            {/* AI FEEDBACK */}
            {session.questions[currentIndex]?.aiFeedback ? (
              <div className="mt-6 bg-white/10 backdrop-blur-xl border border-white/20 
                p-5 rounded-xl shadow-lg animate-fadeIn">

                <div className="text-xl font-bold text-blue-300">
                  Score: {session.questions[currentIndex].aiScore}/10
                </div>

                <pre className="text-gray-300 mt-2 whitespace-pre-wrap">
                  {session.questions[currentIndex].aiFeedback}
                </pre>

                <button
                  onClick={() => setCurrentIndex((i) => i + 1)}
                  className="mt-4 py-2 px-4 rounded-lg bg-gradient-to-r 
                  from-purple-600 to-blue-600 text-white shadow hover:opacity-90"
                >
                  Next Question →
                </button>
              </div>
            ) : (
              <>
                {/* ANSWER INPUT */}
                <textarea
                  className="w-full mt-6 p-4 rounded-xl bg-gray-900/50 border border-gray-700 
                  text-gray-200 h-40 focus:ring-2 focus:ring-purple-500 outline-none"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                />

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={submitAnswer}
                    className="flex-1 py-3 rounded-lg bg-green-600 
                    text-white font-semibold hover:bg-green-500 transition"
                  >
                    Submit Answer
                  </button>

                  <button
                    onClick={finish}
                    className="flex-1 py-3 rounded-lg bg-gray-600 
                    text-white font-semibold hover:bg-gray-500 transition"
                  >
                    Finish Interview
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ------------------------------------------ */}
        {/* SUMMARY */}
        {/* ------------------------------------------ */}
        {session && isFinished && (
          <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl 
             p-6 shadow-[0_0_25px_rgba(120,64,255,0.3)]">

            <h3 className="text-3xl font-bold text-purple-300">Interview Summary</h3>

            {session.questions.map((q, idx) => (
              <div
                key={idx}
                className="mt-6 p-5 bg-gray-900/30 border border-gray-700 rounded-xl shadow"
              >
                <div className="text-lg font-semibold text-white">{q.question}</div>

                <div className="mt-2 text-gray-300">
                  <span className="font-medium">Your Answer:</span>
                  <pre className="whitespace-pre-wrap mt-1">{q.answer || "-"}</pre>
                </div>

                <div className="mt-3 font-medium text-blue-300">
                  Score: {q.aiScore}/10
                </div>

                <pre className="text-gray-300 whitespace-pre-wrap mt-2">
                  {q.aiFeedback || "No feedback"}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
