// src/pages/Dashboard.jsx
import React, { useContext } from "react";
import { API } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

// Announcement
import AnnouncementBar from "../components/dashboard/AnnouncementBar";

// Dashboard Components
import CreditProgressBar from "../components/dashboard/CreditProgressBar";
import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
import StreakCard from "../components/dashboard/StreakCard";
import WeaknessInsights from "../components/dashboard/WeaknessInsights";
import LearningRoadmap from "../components/dashboard/LearningRoadmap";
import RecentAttempts from "../components/dashboard/RecentAttempts";

// Skeleton
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const userName = user?.name || "User";

  const { data: questions = [], isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const res = await API.get("/questions");
      return res.data.questions;
    },
  });

  const { data: streakData } = useQuery({
    queryKey: ["streak"],
    queryFn: async () => {
      const res = await API.get("/streak");
      return res.data;
    },
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      {/* 🔔 ANNOUNCEMENT */}
      <AnnouncementBar />

      {/* HEADER */}
      <header className="mb-14">
        <h1
          className="text-4xl lg:text-5xl font-extrabold mb-4 
          bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 
          text-transparent bg-clip-text"
        >
          Welcome back, {userName} 👋
        </h1>

        <p className="text-gray-400 max-w-2xl text-lg">
          Your interview readiness, progress, and performance — all in one place.
        </p>
      </header>

      {/* TOP METRICS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* CREDITS */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
          p-6 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="text-lg font-semibold mb-3">Credits</h2>
          <CreditProgressBar credits={user?.credits ?? 0} />
          <p className="text-xs text-gray-400 mt-3">
            Used for mock interviews
          </p>
        </div>

        {/* QUESTION BANK */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
          p-6 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="text-lg font-semibold">Question Bank</h2>
          <p className="text-5xl font-extrabold text-purple-400 mt-6">
            {questions.length}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Interview questions
          </p>
        </div>

        {/* TODAY GOAL */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
          p-6 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="text-lg font-semibold">Today’s Goal</h2>
          <p className="text-3xl font-bold text-green-400 mt-6">
            1 Mock
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Complete one focused interview
          </p>
        </div>

        {/* PERFORMANCE SNAPSHOT */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
          p-6 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="text-lg font-semibold">Performance</h2>
          <p className="text-3xl font-bold text-blue-400 mt-6">
            78%
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Avg interview accuracy
          </p>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/mock"
          className="p-5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600
          text-center font-semibold text-white shadow-lg hover:scale-105 transition"
        >
          🚀 Start Mock Interview
        </Link>

        <Link
          to="/questions"
          className="p-5 rounded-2xl bg-white/10 border border-white/10
          text-center font-semibold hover:bg-white/20 transition"
        >
          📚 Browse Questions
        </Link>

        <Link
          to="/history"
          className="p-5 rounded-2xl bg-white/10 border border-white/10
          text-center font-semibold hover:bg-white/20 transition"
        >
          📊 Interview History
        </Link>
      </section>

      {/* STREAK + ANALYTICS */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-16">
        <StreakCard streak={streakData?.streak ?? 0} />
        <AnalyticsCharts />
      </section>

      {/* INSIGHTS */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-16">
        <WeaknessInsights />
        <LearningRoadmap />
      </section>

      {/* RECENT ACTIVITY */}
      <section className="mt-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Activity</h2>

          {/* 🔥 UPDATED: goes to Activity page */}
          <Link
            to="/activity"
            className="text-sm font-semibold text-purple-400 hover:underline"
          >
            View all →
          </Link>
        </div>

        <RecentAttempts />
      </section>
    </>
  );
}
