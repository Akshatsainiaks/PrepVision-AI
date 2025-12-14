import React from "react";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/api";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  BarChart, Bar, ResponsiveContainer
} from "recharts";

export default function AnalyticsCharts() {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await API.get("/analytics");
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl text-center border border-white/20">
        <p className="text-gray-400">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Performance Analytics</h2>

      {/* TREND GRAPH */}
      <div className="mb-10">
        <h3 className="text-sm text-gray-300 mb-2">Score Trend</h3>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.trend}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <XAxis dataKey="date" stroke="#aaa" />
              <YAxis stroke="#aaa" domain={[0, 10]} />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="score"
                stroke="#a78bfa"
                fillOpacity={1}
                fill="url(#colorScore)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TOPICS BAR GRAPH */}
      <div>
        <h3 className="text-sm text-gray-300 mb-2">Weakest Topics</h3>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.topicStats}>
              <XAxis dataKey="topic" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />

              <Bar dataKey="mistakes" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
