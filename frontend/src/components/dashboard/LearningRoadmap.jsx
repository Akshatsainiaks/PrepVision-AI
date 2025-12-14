// src/components/dashboard/LearningRoadmap.jsx
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../api/api";
import { FiCheckCircle } from "react-icons/fi";

export default function LearningRoadmap() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["learning-roadmap"],
    queryFn: async () => {
      const res = await API.get("/learning-roadmap");
      return res.data.roadmap || [];
    },
    staleTime: 60_000
  });

  const completeMut = useMutation({
    mutationFn: async (milestoneId) => {
      const res = await API.post("/learning-roadmap/complete", { milestoneId });
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries(["learning-roadmap"])
  });

  if (isLoading) {
    return (
      <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
        <p className="text-gray-400">Loading roadmap...</p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">Personalized Learning Roadmap</h2>

      {data.length === 0 ? (
        <p className="text-gray-400">No roadmap available yet — do a mock interview to generate suggestions.</p>
      ) : (
        <div className="space-y-4">
          {data.map((m) => (
            <div key={m.id} className="p-4 rounded-lg bg-gray-900/30 border border-white/10 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-300 font-semibold">{m.title}</div>
                  <div className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">{m.recommended}</div>
                </div>

                <div className="text-sm text-gray-400 mt-2">{m.description}</div>

                <div className="text-xs text-gray-500 mt-2">Priority: {m.priority}</div>
              </div>

              <div className="flex flex-col items-end gap-2">
                {m.completed ? (
                  <div className="flex items-center gap-2 text-green-400 font-semibold">
                    <FiCheckCircle /> Completed
                  </div>
                ) : (
                  <button
                    onClick={() => completeMut.mutate(m.id)}
                    className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold"
                    disabled={completeMut.isLoading}
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
