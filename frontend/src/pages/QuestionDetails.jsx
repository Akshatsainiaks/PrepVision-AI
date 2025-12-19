import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { API } from "../api/api";
import Navbar from "../components/Navbar";
import React from "react";

export default function QuestionDetails() {
  const { id } = useParams();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["question", id],
    queryFn: async () => {
      const res = await API.get(`/questions/${id}`);
      return res.data;
    }
  });

  const upvoteMutation = useMutation({
    mutationFn: async () => {
      await API.post(`/questions/${id}/upvote`);
    },
    onSuccess: refetch
  });

  const aiMutation = useMutation({
    mutationFn: async () => {
      const res = await API.post(`/questions/${id}/ai-answer`);
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="pt-28 text-center text-gray-400">
          Loading question...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="pt-28 px-6 text-white">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* HEADER */}
          <div>
            <h1 className="text-4xl font-extrabold text-purple-400">
              {data.company} • {data.type}
            </h1>
            <p className="mt-2 text-gray-400">
              Role: <span className="text-gray-200">{data.role}</span> •
              Difficulty: <span className="text-gray-200">{data.difficulty}</span>
            </p>
          </div>

          {/* QUESTION CARD */}
          <div className="p-6 rounded-2xl bg-white/10 border border-white/10 shadow-lg">
            <p className="text-lg leading-relaxed text-gray-100">
              {data.question}
            </p>
          </div>

          {/* META BAR */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <span>👤 Added by: {data.addedBy?.name || "Community"}</span>
            <span>👍 Upvotes: {data.upvotes}</span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4">
            <button
              onClick={() => upvoteMutation.mutate()}
              disabled={upvoteMutation.isLoading}
              className="px-5 py-2.5 rounded-lg
              bg-purple-600/20 border border-purple-500
              hover:bg-purple-600/30 transition
              disabled:opacity-50"
            >
              👍 Upvote
            </button>

            <button
              onClick={() => aiMutation.mutate()}
              disabled={aiMutation.isLoading}
              className="px-5 py-2.5 rounded-lg
              bg-blue-600/30 border border-blue-500
              hover:bg-blue-600/40 transition
              disabled:opacity-50"
            >
              {aiMutation.isLoading ? "Thinking..." : "🤖 Get AI Answer"}
            </button>
          </div>

          {/* AI LOADING */}
          {aiMutation.isLoading && (
            <p className="text-gray-400">
              🤖 Generating AI answer...
            </p>
          )}

          {/* AI ANSWER */}
          {aiMutation.data && (
            <div className="rounded-2xl border border-purple-500/40
              bg-black/30 shadow-xl">

              <div className="px-6 py-4 border-b border-purple-500/30">
                <h3 className="text-xl font-semibold text-purple-400">
                  AI Answer
                </h3>
              </div>

              <div className="p-6">
                <pre className="whitespace-pre-wrap text-gray-200 leading-relaxed">
                  {aiMutation.data.answer}
                </pre>

                {aiMutation.data.cached && (
                  <p className="mt-4 text-xs text-green-400">
                    ✅ Cached answer (no extra credits used)
                  </p>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
