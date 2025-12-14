import React from "react";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/api";
import { FiTrendingDown } from "react-icons/fi";
import { MdLightbulbOutline } from "react-icons/md";

export default function WeaknessInsights() {

  const { data, isLoading } = useQuery({
    queryKey: ["weakness-insights"],
    queryFn: async () => {
      const res = await API.get("/weakness-insights");
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
        <p className="text-gray-400">Loading insights...</p>
      </div>
    );
  }

  const weaknesses = data.weaknesses || [];
  const recommendations = data.recommendations || [];

  return (
    <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">Weakness Insights</h2>

      {/* WEAK AREAS */}
      {weaknesses.length === 0 ? (
        <p className="text-gray-400 text-sm mb-4">
          You have no significant weak areas yet. Keep practicing!
        </p>
      ) : (
        <div className="space-y-3 mb-6">
          {weaknesses.map((w, idx) => (
            <div
              key={idx}
              className="bg-gray-900/30 p-4 rounded-xl border border-white/10 flex items-center gap-3"
            >
              <FiTrendingDown className="text-red-400 text-2xl" />
              <div>
                <div className="font-bold text-lg">{w.topic}</div>
                <div className="text-gray-400 text-sm">
                  Weakness Score: {(w.weaknessScore * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RECOMMENDATIONS */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Recommendations</h3>

        <ul className="space-y-2">
          {recommendations.map((rec, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-gray-300 bg-gray-900/20 p-3 rounded-lg border border-white/10"
            >
              <MdLightbulbOutline className="text-yellow-400 text-xl" />
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
