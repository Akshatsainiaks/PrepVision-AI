import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { API } from "../api/api";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import React from "react";

export default function LeaderboardPage() {
  const { user } = useContext(AuthContext);
  const meId = user?.id ?? user?._id ?? localStorage.getItem("userId");

  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["leaderboard", page],
    queryFn: async () => {
      const res = await API.get(`/leaderboard?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading)
    return (
      <>
        <Navbar />
        <div className="p-6 text-white">Loading...</div>
      </>
    );

  if (isError)
    return (
      <>
        <Navbar />
        <div className="p-6 text-white">Error loading leaderboard.</div>
      </>
    );

  const leaders = data.top || [];

  const getRankBadge = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto text-white">

        {/* HEADER */}
        <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
          Leaderboard
        </h2>

        {/* LEADERBOARD PANEL */}
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-[0_0_25px_rgba(120,64,255,0.3)] rounded-2xl overflow-hidden divide-y divide-white/10">

          {leaders.map((u, i) => {
            const id = u._id ?? u.id;
            const isMe = String(id) === String(meId);
            const rank = i + 1 + (page - 1) * limit;

            return (
              <div
                key={id}
                className={`flex items-center justify-between px-6 py-4 transition 
                  ${isMe ? "bg-purple-600/20 backdrop-blur-lg border-l-4 border-purple-500" : "hover:bg-white/5"}
                `}
              >
                {/* Rank + Name */}
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getRankBadge(rank)}</div>

                  <div>
                    <div className="font-semibold text-lg">{u.name}</div>
                    {isMe && (
                      <div className="text-xs text-purple-300 font-semibold">(You)</div>
                    )}
                  </div>
                </div>

                {/* Credits */}
                <div className="font-bold text-blue-300 text-lg">
                  {u.credits} credits
                </div>
              </div>
            );
          })}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-6">

          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={`px-4 py-2 rounded-lg border border-white/20 
              ${page === 1 ? "opacity-40" : "hover:bg-white/10"}
            `}
          >
            ← Previous
          </button>

          <span className="text-gray-300">
            Page {data.page} of {Math.ceil(data.total / data.limit)}
          </span>

          <button
            disabled={page * limit >= data.total}
            onClick={() => setPage((p) => p + 1)}
            className={`px-4 py-2 rounded-lg border border-white/20 
              ${page * limit >= data.total ? "opacity-40" : "hover:bg-white/10"}
            `}
          >
            Next →
          </button>

        </div>
      </div>
    </>
  );
}
