import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import { API } from "../api/api";
import API from "../api/api";

export default function InterviewDetail() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["interview-detail", id],
    queryFn: async () => {
      const res = await API.get(`/interview-history/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Interview Details</h1>
        <p className="text-gray-400">Loading interview...</p>
      </div>
    );
  }

  if (!data) {
    return <p className="text-gray-400">Interview not found.</p>;
  }

  return (
    <div className="space-y-12">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-extrabold mb-2">
          {data.company || "Mock Interview"}
        </h1>
        <p className="text-gray-400">
          {data.role} • {new Date(data.createdAt).toLocaleString()}
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
          <p className="text-sm text-gray-400">Score</p>
          <p className="text-4xl font-bold text-blue-400 mt-2">
            {data.score ?? "--"}%
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
          <p className="text-sm text-gray-400">Duration</p>
          <p className="text-4xl font-bold mt-2">
            {data.duration || 15} min
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
          <p className="text-sm text-gray-400">Status</p>
          <p
            className={`text-xl font-bold mt-3 ${
              data.completed ? "text-green-400" : "text-yellow-400"
            }`}
          >
            {data.completed ? "Completed" : "Incomplete"}
          </p>
        </div>
      </div>

      {/* QUESTIONS & ANSWERS */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Questions & Feedback
        </h2>

        <div className="space-y-6">
          {data.questions?.map((q, index) => (
            <div
              key={index}
              className="bg-white/10 border border-white/10 rounded-2xl p-6"
            >
              <p className="font-semibold mb-2">
                Q{index + 1}. {q.question}
              </p>

              <p className="text-sm text-gray-400 mb-3">
                Your Answer:
              </p>
              <p className="text-gray-200 whitespace-pre-line">
                {q.answer || "No answer"}
              </p>

              {q.feedback && (
                <div className="mt-4 p-4 rounded-xl bg-black/30 text-sm">
                  <span className="font-semibold text-purple-400">
                    AI Feedback:
                  </span>
                  <p className="mt-1 text-gray-300">
                    {q.feedback}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ACTION */}
      <div className="flex gap-4">
        <a
          href="/mock"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600
          font-semibold text-white hover:scale-105 transition"
        >
          Retry Interview
        </a>

        <a
          href="/history"
          className="px-6 py-3 rounded-xl bg-white/10 border border-white/10
          font-semibold hover:bg-white/20 transition"
        >
          Back to History
        </a>
      </div>
    </div>
  );
}
