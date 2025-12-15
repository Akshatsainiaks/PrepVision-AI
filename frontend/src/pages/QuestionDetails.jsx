import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../api/api";
import Navbar from "../components/Navbar";
import React from "react";

/* 🔥 FETCH USER CREDITS */
const fetchCredits = async () => {
  const res = await API.get("/credits/me");
  return res.data.credits;
};

export default function QuestionDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  /* -----------------------------
     FETCH QUESTION
  ------------------------------ */
  const {
    data,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["question", id],
    queryFn: async () => {
      const res = await API.get(`/questions/${id}`);
      return res.data;
    }
  });

  /* -----------------------------
     FETCH CREDITS
  ------------------------------ */
  const { data: credits = 0 } = useQuery({
    queryKey: ["credits"],
    queryFn: fetchCredits
  });

  /* -----------------------------
     UPVOTE
  ------------------------------ */
  const upvoteMutation = useMutation({
    mutationFn: async () => {
      await API.post(`/questions/${id}/upvote`);
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries(["credits"]);
    }
  });

  /* -----------------------------
     AI ANSWER
  ------------------------------ */
  const aiMutation = useMutation({
    mutationFn: async () => {
      const res = await API.post(`/questions/${id}/ai-answer`);
      return res.data;
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries(["credits"]);
    },
    onError: (err) => {
      if (err.response?.status === 403) {
        alert("You need at least 5 credits to generate AI answer");
      }
    }
  });

  /* -----------------------------
     LOADING STATE
  ------------------------------ */
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="p-10 text-gray-400">
          Loading question...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10 text-white">

        {/* HEADER */}
        <h2 className="text-3xl font-extrabold text-purple-400">
          {data.company} • {data.type}
        </h2>

        <p className="mt-2 text-gray-400">
          Role: {data.role} | Difficulty: {data.difficulty}
        </p>

        {/* QUESTION */}
        <div className="mt-6 p-6 rounded-2xl bg-white/10 border border-white/10 shadow-lg">
          <p className="text-lg text-gray-200 leading-relaxed">
            {data.question}
          </p>
        </div>

        {/* META */}
        <div className="mt-4 text-sm text-gray-400">
          Added by: {data.addedBy?.name || "Community"} <br />
          Upvotes: {data.upvotes}
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => upvoteMutation.mutate()}
            disabled={upvoteMutation.isLoading}
            className="px-4 py-2 rounded-lg
            bg-purple-600/30 border border-purple-500
            hover:bg-purple-600/40 transition
            disabled:opacity-50"
          >
            👍 Upvote
          </button>

          <button
            onClick={() => aiMutation.mutate()}
            disabled={aiMutation.isLoading || credits < 5}
            className="px-4 py-2 rounded-lg
            bg-blue-600/30 border border-blue-500
            hover:bg-blue-600/40 transition
            disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {aiMutation.isLoading ? "Thinking..." : "🤖 Get AI Answer"}
          </button>
        </div>

        {/* CREDIT WARNING */}
        {credits < 5 && (
          <p className="mt-3 text-sm text-red-400">
            ⚠️ You need at least 5 credits to generate AI answers
          </p>
        )}

        {/* AI LOADING */}
        {aiMutation.isLoading && (
          <p className="mt-6 text-gray-400">
            🤖 Generating AI answer...
          </p>
        )}

        {/* AI ANSWER */}
        {aiMutation.data && (
          <div className="mt-8 p-6 rounded-2xl
          bg-black/30 border border-purple-500 shadow-xl">
            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              AI Answer
            </h3>

            <pre className="whitespace-pre-wrap text-gray-200 leading-relaxed">
              {aiMutation.data.answer}
            </pre>

            {aiMutation.data.cached && (
              <p className="mt-3 text-xs text-green-400">
                ✅ Cached answer (no extra credits used)
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
