import React from "react";
import { Link } from "react-router-dom";
import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
import WeaknessInsights from "../components/dashboard/WeaknessInsights";

export default function Activity() {
  return (
    <div className="space-y-12">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-extrabold mb-3">
          Activity
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Track your interview activity, performance trends, and skill improvement over time.
        </p>
      </div>

      {/* QUICK NAVIGATION */}
      <div className="flex gap-4">
        <Link
          to="/history"
          className="px-5 py-2 rounded-xl bg-white/10 border border-white/10
          font-semibold hover:bg-white/20 transition"
        >
          📊 View Full Interview History →
        </Link>
      </div>

      {/* TOP METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
          <h2 className="text-sm text-gray-400">Total Interviews</h2>
          <p className="text-4xl font-bold mt-3 text-purple-400">24</p>
          <p className="text-xs text-gray-500 mt-1">
            Across all roles & companies
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
          <h2 className="text-sm text-gray-400">Average Score</h2>
          <p className="text-4xl font-bold mt-3 text-blue-400">78%</p>
          <p className="text-xs text-gray-500 mt-1">
            Based on AI evaluation
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
          <h2 className="text-sm text-gray-400">Avg Interview Time</h2>
          <p className="text-4xl font-bold mt-3 text-green-400">18m</p>
          <p className="text-xs text-gray-500 mt-1">
            Per mock interview
          </p>
        </div>
      </div>

      {/* PERFORMANCE CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <AnalyticsCharts />

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Accuracy Trend
          </h2>

          <p className="text-gray-400 text-sm mb-6">
            Your accuracy has improved steadily over recent attempts.
          </p>

          <div className="h-40 flex items-center justify-center text-gray-500 text-sm border border-dashed border-white/10 rounded-xl">
            Accuracy line chart (weekly)
          </div>
        </div>
      </div>

      {/* WEAKNESS ANALYSIS */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Skill Analysis
        </h2>
        <WeaknessInsights />
      </div>

      {/* ACTION CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-center">
        <h3 className="text-xl font-bold mb-2">
          Want detailed interview breakdowns?
        </h3>
        <p className="text-sm opacity-90 mb-4">
          Explore every interview attempt with scores, answers, and AI feedback.
        </p>

        <Link
          to="/history"
          className="inline-block px-6 py-3 bg-black/30 rounded-xl
          font-semibold hover:bg-black/40 transition"
        >
          Go to Interview History →
        </Link>
      </div>

    </div>
  );
}
