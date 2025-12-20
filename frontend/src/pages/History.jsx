import React from "react";
import { API } from "../api/api";
import { useQuery } from "@tanstack/react-query";

export default function History() {
  const { data: history = [], isLoading } = useQuery({
    queryKey: ["interview-history"],
    queryFn: async () => {
      const res = await API.get("/interview-history");
      return res.data.history || [];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Interview History</h1>
        <p className="text-gray-400">Loading your interview attempts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-extrabold mb-3">
          Interview History
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Review your past mock interviews, scores, and performance details.
        </p>
      </div>

      {/* FILTER BAR (UI READY) */}
      <div className="flex flex-wrap gap-4">
        <select className="bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm">
          <option>All Roles</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>DevOps</option>
        </select>

        <select className="bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm">
          <option>All Companies</option>
          <option>Google</option>
          <option>Amazon</option>
          <option>Startup</option>
        </select>

        <select className="bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm">
          <option>Latest First</option>
          <option>Oldest First</option>
        </select>
      </div>

      {/* HISTORY LIST */}
      {history.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No interviews attempted yet.
          <br />
          Start your first mock interview 🚀
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item._id}
              className="bg-white/10 border border-white/10 rounded-2xl p-5
              hover:bg-white/15 transition flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              {/* LEFT INFO */}
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">
                  {item.company || "General Interview"}
                </h3>
                <p className="text-sm text-gray-400">
                  {item.role} • {item.duration || "15"} mins
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>

              {/* RIGHT INFO */}
              <div className="flex items-center gap-6">
                {/* SCORE */}
                <div className="text-center">
                  <p className="text-xs text-gray-400">Score</p>
                  <p className="text-xl font-bold text-blue-400">
                    {item.score ?? "--"}%
                  </p>
                </div>

                {/* STATUS */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    item.completed
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {item.completed ? "Completed" : "Incomplete"}
                </span>

                {/* ACTION */}
                <a
                  href={`/history/${item._id}`}
                  className="px-4 py-2 rounded-xl bg-white/10
                  hover:bg-white/20 text-sm font-semibold transition"
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
