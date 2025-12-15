import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { API } from "../api/api";
import Navbar from "../components/Navbar";
import React from "react";
export default function QuestionDetails() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["question", id],
    queryFn: async () => {
      const res = await API.get(`/questions/${id}`);
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10 text-white">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold text-purple-400">
            {data.company} – {data.role}
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Difficulty: {data.difficulty} • Upvotes: {data.upvotes}
          </p>
        </div>

        {/* QUESTION */}
        <div className="p-6 rounded-xl bg-white/10 border border-white/10">
          <p className="text-lg text-gray-200 leading-relaxed">
            {data.question}
          </p>
        </div>

        {/* META */}
        <div className="mt-4 text-sm text-gray-400">
          Added by: {data.addedBy?.name || "Community"}
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex gap-4">
          <button
            className="px-4 py-2 bg-purple-600/30 border border-purple-500 rounded-lg hover:bg-purple-500/40 transition"
          >
            👍 Upvote
          </button>

          <button
            className="px-4 py-2 bg-blue-600/30 border border-blue-500 rounded-lg hover:bg-blue-500/40 transition"
          >
            🤖 Get AI Answer
          </button>
        </div>

      </div>
    </>
  );
}
