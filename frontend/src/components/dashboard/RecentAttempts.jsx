import React from "react";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/api";
import { FiLoader } from "react-icons/fi";

export default function RecentAttempts() {
  const { data, isLoading } = useQuery({
    queryKey: ["recent-interviews"],
    queryFn: async () => {
      const res = await API.get("/interview-history");
      return res.data.sessions || [];
    }
  });

  if (isLoading) {
    return (
      <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
        <div className="animate-spin text-center">
          <FiLoader className="text-white text-2xl mx-auto" />
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
        <h2 className="text-xl font-semibold mb-3">Recent Attempts</h2>
        <p className="text-gray-400 text-sm">
          No interview attempts yet. Start a mock interview to see results here!
        </p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Recent Attempts</h2>

      <div className="space-y-4">
        {data.map((session, index) => {
          const avgScore =
            session.questions?.length > 0
              ? session.questions.reduce((sum, q) => sum + (q.aiScore || 0), 0) /
                session.questions.length
              : 0;

          return (
            <div
              key={session._id}
              className="p-4 bg-gray-900/30 rounded-xl border border-white/10"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">
                    {session.company} – {session.role}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(session.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-extrabold text-purple-400">
                    {avgScore.toFixed(1)}/10
                  </div>
                  <div className="text-xs text-gray-400">Avg Score</div>
                </div>
              </div>

              <a
                href={`/mock?session=${session._id}`}
                className="text-blue-400 text-sm underline hover:text-blue-300 mt-2 inline-block"
              >
                View Details →
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
