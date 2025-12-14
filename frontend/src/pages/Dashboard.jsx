// src/pages/Dashboard.jsx
import React, { useContext } from "react";
import { API } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";

// Announcement
import AnnouncementBar from "../components/dashboard/AnnouncementBar";

// Dashboard Components
import CreditProgressBar from "../components/dashboard/CreditProgressBar";
import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
import StreakCard from "../components/dashboard/StreakCard";
import WeaknessInsights from "../components/dashboard/WeaknessInsights";
import LearningRoadmap from "../components/dashboard/LearningRoadmap";
import RecentAttempts from "../components/dashboard/RecentAttempts";
import VoicePracticeCard from "../components/dashboard/VoicePracticeCard";

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

  return (
    <>
      {/* 🔔 ANNOUNCEMENT */}
      <AnnouncementBar />

      {/* HEADER */}
      <h1
        className="text-4xl lg:text-5xl font-extrabold mb-4 
        bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 
        text-transparent bg-clip-text"
      >
        Welcome back, {userName} 👋
      </h1>

      <p className="text-gray-400 mb-14 max-w-2xl text-lg">
        Track your progress, practice interviews, and follow your personalized learning path.
      </p>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* CREDITS */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
          p-6 rounded-2xl border border-white/10 
          shadow-[0_20px_50px_rgba(0,0,0,0.3)]
          hover:-translate-y-1 transition-all duration-300">
          
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Credits</h2>
            <span className="text-purple-400 text-sm font-medium">Usage</span>
          </div>

          <CreditProgressBar credits={user?.credits ?? 0} />

          <p className="text-xs text-gray-400 mt-4">
            Earn more credits by practicing interviews & contributing questions.
          </p>
        </div>

        {/* QUESTION BANK */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
          p-6 rounded-2xl border border-white/10 
          shadow-[0_20px_50px_rgba(0,0,0,0.3)]
          hover:-translate-y-1 transition-all duration-300">
          
          <h2 className="text-lg font-semibold">Question Bank</h2>

          <div className="mt-6">
            <p className="text-5xl font-extrabold text-purple-400">
              {isLoading ? "…" : questions.length}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Curated interview questions
            </p>
          </div>
        </div>

        {/* AI PRACTICE */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
          p-6 rounded-2xl border border-white/10 
          shadow-[0_20px_50px_rgba(0,0,0,0.3)]
          hover:-translate-y-1 transition-all duration-300">
          
          <h2 className="text-lg font-semibold mb-4">AI Practice</h2>

          <a
            href="/mock"
            className="block w-full mb-5 px-6 py-3 rounded-xl 
            bg-gradient-to-r from-purple-600 to-blue-600
            text-center font-semibold text-white
            shadow-lg hover:scale-105 transition"
          >
            🚀 Start Mock Interview
          </a>

          <VoicePracticeCard />
        </div>
      </div>

      {/* STREAK + ANALYTICS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-16">
        <StreakCard streak={streakData?.streak ?? 0} />
        <AnalyticsCharts />
      </div>

      {/* INSIGHTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-16">
        <WeaknessInsights />
        <LearningRoadmap />
      </div>

      {/* RECENT ACTIVITY */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <RecentAttempts />
      </div>
    </>
  );
}
