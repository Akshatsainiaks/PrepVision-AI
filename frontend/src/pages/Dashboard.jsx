// // src/pages/Dashboard.jsx
// import React, { useContext } from "react";
// // import { API } from "../api/api";
// import API from "../api/api";
// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";



// // Dashboard Components
// import CreditProgressBar from "../components/dashboard/CreditProgressBar";
// import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
// import StreakCard from "../components/dashboard/StreakCard";
// import WeaknessInsights from "../components/dashboard/WeaknessInsights";
// import LearningRoadmap from "../components/dashboard/LearningRoadmap";
// import RecentAttempts from "../components/dashboard/RecentAttempts";

// // Skeleton
// import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const userName = user?.name || "User";

//   const { data: questions = [], isLoading } = useQuery({
//     queryKey: ["questions"],
//     queryFn: async () => {
//       const res = await API.get("/questions");
//       return res.data.questions;
//     },
//   });

//   const { data: streakData } = useQuery({
//     queryKey: ["streak"],
//     queryFn: async () => {
//       const res = await API.get("/streak");
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return <DashboardSkeleton />;
//   }

//   return (
//     <>
    

//       {/* HEADER */}
//       <header className="mb-14">
//         <h1
//           className="text-4xl lg:text-5xl font-extrabold mb-4 
//           bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 
//           text-transparent bg-clip-text"
//         >
//           Welcome back, {userName} 👋
//         </h1>

//         <p className="text-gray-400 max-w-2xl text-lg">
//           Your interview readiness, progress, and performance — all in one place.
//         </p>
//       </header>

//       {/* TOP METRICS */}
//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

//         {/* CREDITS */}
//         <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
//           p-6 rounded-2xl border border-white/10 shadow-lg">
//           <h2 className="text-lg font-semibold mb-3">Credits</h2>
//           <CreditProgressBar credits={user?.credits ?? 0} />
//           <p className="text-xs text-gray-400 mt-3">
//             Used for mock interviews
//           </p>
//         </div>

//         {/* QUESTION BANK */}
//         <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
//           p-6 rounded-2xl border border-white/10 shadow-lg">
//           <h2 className="text-lg font-semibold">Question Bank</h2>
//           <p className="text-5xl font-extrabold text-purple-400 mt-6">
//             {questions.length}
//           </p>
//           <p className="text-gray-400 text-sm mt-1">
//             Interview questions
//           </p>
//         </div>

//         {/* TODAY GOAL */}
//         <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
//           p-6 rounded-2xl border border-white/10 shadow-lg">
//           <h2 className="text-lg font-semibold">Today’s Goal</h2>
//           <p className="text-3xl font-bold text-green-400 mt-6">
//             1 Mock
//           </p>
//           <p className="text-gray-400 text-sm mt-1">
//             Complete one focused interview
//           </p>
//         </div>

//         {/* PERFORMANCE SNAPSHOT */}
//         <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
//           p-6 rounded-2xl border border-white/10 shadow-lg">
//           <h2 className="text-lg font-semibold">Performance</h2>
//           <p className="text-3xl font-bold text-blue-400 mt-6">
//             78%
//           </p>
//           <p className="text-gray-400 text-sm mt-1">
//             Avg interview accuracy
//           </p>
//         </div>
//       </section>

//       {/* QUICK ACTIONS */}
//       <section className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Link
//           to="/mock"
//           className="p-5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600
//           text-center font-semibold text-white shadow-lg hover:scale-105 transition"
//         >
//           🚀 Start Mock Interview
//         </Link>

//         <Link
//           to="/questions"
//           className="p-5 rounded-2xl bg-white/10 border border-white/10
//           text-center font-semibold hover:bg-white/20 transition"
//         >
//           📚 Browse Questions
//         </Link>

//         <Link
//           to="/history"
//           className="p-5 rounded-2xl bg-white/10 border border-white/10
//           text-center font-semibold hover:bg-white/20 transition"
//         >
//           📊 Interview History
//         </Link>
//       </section>

//       {/* STREAK + ANALYTICS */}
//       <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-16">
//         <StreakCard streak={streakData?.streak ?? 0} />
//         <AnalyticsCharts />
//       </section>

//       {/* INSIGHTS */}
//       <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-16">
//         <WeaknessInsights />
//         <LearningRoadmap />
//       </section>

//       {/* RECENT ACTIVITY */}
//       <section className="mt-20">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold">Recent Activity</h2>

//           {/* 🔥 UPDATED: goes to Activity page */}
//           <Link
//             to="/activity"
//             className="text-sm font-semibold text-purple-400 hover:underline"
//           >
//             View all →
//           </Link>
//         </div>

//         <RecentAttempts />
//       </section>
//     </>
//   );
// }

// // src/pages/Dashboard.jsx
// import React, { useContext } from "react";
// import API from "../api/api";
// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// // Components
// import CreditProgressBar from "../components/dashboard/CreditProgressBar";
// import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
// import StreakCard from "../components/dashboard/StreakCard";
// import WeaknessInsights from "../components/dashboard/WeaknessInsights";
// import LearningRoadmap from "../components/dashboard/LearningRoadmap";
// import RecentAttempts from "../components/dashboard/RecentAttempts";

// // Skeleton
// import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const userName = user?.name || "User";

//   const { data: questions = [], isLoading } = useQuery({
//     queryKey: ["questions"],
//     queryFn: async () => {
//       const res = await API.get("/questions");
//       return res.data.questions;
//     },
//   });

//   const { data: streakData } = useQuery({
//     queryKey: ["streak"],
//     queryFn: async () => {
//       const res = await API.get("/streak");
//       return res.data;
//     },
//   });

//   if (isLoading) return <DashboardSkeleton />;

//   return (
//     <>
//       {/* HEADER */}
//       <header className="mb-8">
//         <h1 className="text-4xl lg:text-5xl font-extrabold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
//           Welcome back, {userName} 👋
//         </h1>
//         <p className="text-gray-400 max-w-2xl">
//           Your interview readiness, progress, and performance — all in one place.
//         </p>
//       </header>

//       {/* METRICS */}
//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="card">
//           <h2 className="text-sm font-semibold mb-2">Credits</h2>
//           <CreditProgressBar credits={user?.credits ?? 0} />
//           <p className="text-xs text-gray-400 mt-2">Used for mock interviews</p>
//         </div>

//         <div className="card">
//           <h2 className="text-sm font-semibold">Question Bank</h2>
//           <p className="text-4xl font-extrabold text-purple-400 mt-4">
//             {questions.length}
//           </p>
//           <p className="text-xs text-gray-400 mt-1">Interview questions</p>
//         </div>

//         <div className="card">
//           <h2 className="text-sm font-semibold">Today’s Goal</h2>
//           <p className="text-2xl font-bold text-green-400 mt-4">1 Mock</p>
//           <p className="text-xs text-gray-400 mt-1">Daily practice</p>
//         </div>

//         <div className="card">
//           <h2 className="text-sm font-semibold">Performance</h2>
//           <p className="text-2xl font-bold text-blue-400 mt-4">78%</p>
//           <p className="text-xs text-gray-400 mt-1">Avg accuracy</p>
//         </div>
//       </section>

//       {/* QUICK ACTIONS */}
//       <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Link to="/mock" className="primary-btn">
//           🚀 Start Mock Interview
//         </Link>

//         <Link to="/questions" className="secondary-btn">
//           📚 Browse Questions
//         </Link>

//         <Link to="/history" className="secondary-btn">
//           📊 Interview History
//         </Link>
//       </section>

//       {/* STREAK + ANALYTICS */}
//       <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-12">
//         <StreakCard streak={streakData?.streak ?? 0} />
//         <AnalyticsCharts />
//       </section>

//       {/* INSIGHTS */}
//       <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-12">
//         <WeaknessInsights />
//         <LearningRoadmap />
//       </section>

//       {/* RECENT ACTIVITY */}
//       <section className="mt-12">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold">Recent Activity</h2>
//           <Link
//             to="/activity"
//             className="text-sm font-semibold text-purple-400 hover:underline"
//           >
//             View all →
//           </Link>
//         </div>
//         <RecentAttempts />
//       </section>
//     </>
//   );
// }


// new

// import React, { useContext } from "react";
// import API from "../api/api";
// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// // Components
// import CreditProgressBar from "../components/dashboard/CreditProgressBar";
// import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
// import StreakCard from "../components/dashboard/StreakCard";
// import WeaknessInsights from "../components/dashboard/WeaknessInsights";
// import LearningRoadmap from "../components/dashboard/LearningRoadmap";
// import RecentAttempts from "../components/dashboard/RecentAttempts";
// import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const userName = user?.name || "User";

//   const { data: questions = [], isLoading } = useQuery({
//     queryKey: ["questions"],
//     queryFn: async () => {
//       const res = await API.get("/questions");
//       return res.data.questions;
//     },
//   });

//   const { data: streakData } = useQuery({
//     queryKey: ["streak"],
//     queryFn: async () => {
//       const res = await API.get("/streak");
//       return res.data;
//     },
//   });

//   if (isLoading) return <DashboardSkeleton />;

//   return (
//     <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-24 text-white">
      
//       {/* BACKGROUND DECOR */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
//         <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
//         <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />
//       </div>

//       {/* HEADER SECTION */}
//       <header className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8 pt-10">
//         <div className="animate-fadeIn">
//           <div className="flex items-center gap-3 mb-4">
//             <span className="h-px w-8 bg-purple-500"></span>
//             <span className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">Candidate Workspace</span>
//           </div>
//           <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-4">
//             Hello, <br />
//             <span className="bg-gradient-to-r from-purple-400 via-white to-blue-400 text-transparent bg-clip-text">
//               {userName}.
//             </span>
//           </h1>
//           <p className="text-gray-500 text-lg font-medium max-w-lg">
//             Consistency is the key to mastery. You are currently in the top <span className="text-white">15%</span> of performers this week.
//           </p>
//         </div>
        
//         <div className="bg-white/5 border border-white/10 p-1.5 rounded-[2rem] backdrop-blur-xl">
//           <div className="px-6 py-3 bg-white/5 rounded-[1.8rem] border border-white/5 flex items-center gap-4">
//             <div>
//               <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-0.5">Current Tier</p>
//               <p className="text-sm font-black text-blue-400">INTERMEDIATE II</p>
//             </div>
//             <div className="h-8 w-px bg-white/10"></div>
//             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center font-bold">
//               {streakData?.streak ?? 0}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* QUICK ACTIONS BAR */}
//       <section className="mb-12 p-1 bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-[2.2rem]">
//         <div className="bg-[#030712] rounded-[2.1rem] p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <Link to="/mock" className="primary-btn group">
//             <span className="mr-3 text-xl group-hover:scale-125 transition-transform inline-block">🚀</span> 
//             Start Mock Interview
//           </Link>
//           <Link to="/questions" className="secondary-btn group">
//             <span className="mr-3 opacity-60 group-hover:opacity-100 transition-opacity">📚</span> 
//             Question Bank
//           </Link>
//           <Link to="/history" className="secondary-btn group">
//             <span className="mr-3 opacity-60 group-hover:opacity-100 transition-opacity">📊</span> 
//             Detailed History
//           </Link>
//         </div>
//       </section>

//       {/* METRICS GRID */}
//       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//         <div className="card group relative overflow-hidden">
//           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6">Resource Allocation</h2>
//           <CreditProgressBar credits={user?.credits ?? 0} />
//           <div className="mt-6 flex items-center justify-between">
//             <span className="text-[10px] text-gray-500 font-bold uppercase">Status: Optimal</span>
//             <div className="h-1 w-1 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
//           </div>
//         </div>

//         <div className="card">
//           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Mastery Progress</h2>
//           <div className="flex items-baseline gap-2">
//             <p className="text-6xl font-black tracking-tighter">{questions.length}</p>
//             <p className="text-xs font-bold text-green-400">/ 500</p>
//           </div>
//           <p className="text-xs text-gray-500 font-medium mt-2">Questions available in your current track.</p>
//         </div>

//         <div className="card border-t-4 border-t-purple-500/50">
//           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6">Daily Target</h2>
//           <div className="flex flex-col items-center">
//              <div className="text-3xl font-black mb-2 italic tracking-tighter">1 MOCK SESSION</div>
//              <div className="w-full h-1.5 bg-gray-900 rounded-full mt-4">
//                 <div className="h-full w-2/3 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7]"></div>
//              </div>
//           </div>
//         </div>

//         <div className="card bg-gradient-to-br from-blue-600/10 to-transparent">
//           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Avg Accuracy</h2>
//           <p className="text-6xl font-black text-blue-400 tracking-tighter">78%</p>
//           <p className="text-xs text-gray-500 font-medium mt-2">Top 5% increase this month.</p>
//         </div>
//       </section>

//       {/* ANALYTICS & INSIGHTS GRID */}
//       <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
//         {/* Main Feed */}
//         <div className="xl:col-span-8 space-y-8">
//           <div className="card !p-0 overflow-hidden">
//             <div className="p-8 border-b border-white/5">
//               <h2 className="text-xl font-bold tracking-tight">Performance Analytics</h2>
//             </div>
//             <div className="p-8">
//               <AnalyticsCharts />
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <WeaknessInsights />
//             <LearningRoadmap />
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div className="xl:col-span-4 space-y-8">
//           <StreakCard streak={streakData?.streak ?? 0} />
          
//           <div className="card !p-0 overflow-hidden">
//             <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
//               <h2 className="font-bold tracking-tight">Recent Activity</h2>
//               <Link to="/activity" className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-white transition-colors">
//                 View Log
//               </Link>
//             </div>
//             <div className="p-4">
//               <RecentAttempts />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useContext } from "react";
// import API from "../api/api";
// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// import CreditProgressBar from "../components/dashboard/CreditProgressBar";
// import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
// import StreakCard from "../components/dashboard/StreakCard";
// import WeaknessInsights from "../components/dashboard/WeaknessInsights";
// import LearningRoadmap from "../components/dashboard/LearningRoadmap";
// import RecentAttempts from "../components/dashboard/RecentAttempts";
// import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const userName = user?.name || "User";

//   const { data: questions = [], isLoading } = useQuery({
//     queryKey: ["questions"],
//     queryFn: async () => {
//       const res = await API.get("/questions");
//       return res.data.questions;
//     },
//   });

//   const { data: streakData } = useQuery({
//     queryKey: ["streak"],
//     queryFn: async () => {
//       const res = await API.get("/streak");
//       return res.data;
//     },
//   });

//   if (isLoading) return <DashboardSkeleton />;

//   return (
//     <div className="animate-fadeIn">
//       {/* HEADER */}
//       <header className="mb-10">
//         <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
//           Welcome back, {userName} 👋
//         </h1>
//         <p className="text-gray-400 text-lg max-w-2xl">
//           Your interview readiness, progress, and performance — all in one place.
//         </p>
//       </header>

//       {/* METRICS - FIXED HEIGHT ALIGNMENT */}
//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="card card-padding">
//           <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Credits</h2>
//           <div className="flex-1">
//             <CreditProgressBar credits={user?.credits ?? 0} />
//           </div>
//           <p className="text-[10px] text-gray-500 mt-4 uppercase font-bold">Used for mock interviews</p>
//         </div>

//         <div className="card card-padding">
//           <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Question Bank</h2>
//           <div className="flex-1 flex flex-col justify-center">
//             <p className="text-5xl font-black text-purple-400">{questions.length}</p>
//           </div>
//           <p className="text-[10px] text-gray-500 mt-4 uppercase font-bold">Interview questions</p>
//         </div>

//         <div className="card card-padding">
//           <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Today’s Goal</h2>
//           <div className="flex-1 flex flex-col justify-center">
//             <p className="text-4xl font-black text-green-400">1 Mock</p>
//           </div>
//           <p className="text-[10px] text-gray-500 mt-4 uppercase font-bold">Daily practice goal</p>
//         </div>

//         <div className="card card-padding">
//           <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Performance</h2>
//           <div className="flex-1 flex flex-col justify-center">
//             <p className="text-4xl font-black text-blue-400">78%</p>
//           </div>
//           <p className="text-[10px] text-gray-500 mt-4 uppercase font-bold">Avg accuracy score</p>
//         </div>
//       </section>

//       {/* ACTIONS */}
//       <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Link to="/mock" className="primary-btn py-4 text-center rounded-2xl bg-purple-600 font-bold hover:bg-purple-500 transition-all">
//           🚀 Start Mock Interview
//         </Link>
//         <Link to="/questions" className="secondary-btn py-4 text-center rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all">
//           📚 Browse Questions
//         </Link>
//         <Link to="/history" className="secondary-btn py-4 text-center rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all">
//           📊 Interview History
//         </Link>
//       </section>

//       {/* CHARTS SECTION */}
//       <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">
//         <StreakCard streak={streakData?.streak ?? 0} />
//         <AnalyticsCharts />
//       </section>

//       <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">
//         <WeaknessInsights />
//         <LearningRoadmap />
//       </section>

//       {/* RECENT ACTIVITY */}
//       <section className="mt-12 mb-10">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-black tracking-tight text-white">Recent Activity</h2>
//           <Link to="/activity" className="text-xs font-black uppercase tracking-widest text-purple-400 hover:text-white transition-colors">
//             View all →
//           </Link>
//         </div>
//         <RecentAttempts />
//       </section>
//     </div>
//   );
// }

// import React, { useContext } from "react";
// import API from "../api/api";
// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// import CreditProgressBar from "../components/dashboard/CreditProgressBar";
// import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
// import StreakCard from "../components/dashboard/StreakCard";
// import WeaknessInsights from "../components/dashboard/WeaknessInsights";
// import LearningRoadmap from "../components/dashboard/LearningRoadmap";
// import RecentAttempts from "../components/dashboard/RecentAttempts";
// import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const userName = user?.name || "User";

//   const { data: questions = [], isLoading } = useQuery({
//     queryKey: ["questions"],
//     queryFn: async () => {
//       const res = await API.get("/questions");
//       return res.data.questions;
//     },
//   });

//   const { data: streakData } = useQuery({
//     queryKey: ["streak"],
//     queryFn: async () => {
//       const res = await API.get("/streak");
//       return res.data;
//     },
//   });

//   if (isLoading) return <DashboardSkeleton />;

//   return (
//     <div className="animate-fadeIn pb-12 px-4 lg:px-8">
//       {/* HEADER - Refined with Slate & Indigo */}
//       <header className="mb-10 pt-6">
//         <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-3 text-slate-900">
//           Welcome back, <span className="text-indigo-600">{userName}</span> 👋
//         </h1>
//         <p className="text-slate-500 text-lg max-w-2xl font-medium">
//           Your interview readiness, progress, and performance — all in one place.
//         </p>
//       </header>

//       {/* METRICS - White Elevated Cards */}
//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
//           <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">Credits</h2>
//           <div className="flex-1">
//             <CreditProgressBar credits={user?.credits ?? 0} />
//           </div>
//           <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold">Used for mock interviews</p>
//         </div>

//         <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
//           <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">Question Bank</h2>
//           <div className="flex-1 flex flex-col justify-center">
//             <p className="text-5xl font-black text-indigo-600 tracking-tighter">{questions.length}</p>
//           </div>
//           <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold">Interview questions</p>
//         </div>

//         <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
//           <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">Today’s Goal</h2>
//           <div className="flex-1 flex flex-col justify-center">
//             <p className="text-4xl font-black text-emerald-500 tracking-tight">1 Mock</p>
//           </div>
//           <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold">Daily practice goal</p>
//         </div>

//         <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
//           <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">Performance</h2>
//           <div className="flex-1 flex flex-col justify-center">
//             <p className="text-4xl font-black text-blue-600 tracking-tight">78%</p>
//           </div>
//           <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold">Avg accuracy score</p>
//         </div>
//       </section>

//       {/* ACTIONS - Clean Buttons */}
//       <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Link to="/mock" className="flex items-center justify-center py-4 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
//           🚀 Start Mock Interview
//         </Link>
//         <Link to="/questions" className="flex items-center justify-center py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all">
//           📚 Browse Questions
//         </Link>
//         <Link to="/history" className="flex items-center justify-center py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all">
//           📊 Interview History
//         </Link>
//       </section>

//       {/* CHARTS SECTION */}
//       <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">
//         <div className="bg-white border border-slate-200 p-2 rounded-3xl shadow-sm">
//             <StreakCard streak={streakData?.streak ?? 0} />
//         </div>
//         <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
//             <AnalyticsCharts />
//         </div>
//       </section>

//       <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
//         <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
//             <WeaknessInsights />
//         </div>
//         <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
//             <LearningRoadmap />
//         </div>
//       </section>

//       {/* RECENT ACTIVITY */}
//       <section className="mt-12 mb-10">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-black tracking-tight text-slate-900">Recent Activity</h2>
//           <Link to="/activity" className="text-xs font-bold uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-3 py-1 rounded-full">
//             View all →
//           </Link>
//         </div>
//         <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
//             <RecentAttempts />
//         </div>
//       </section>
//     </div>
//   );
// }

// fix skeleton

// import React, { useContext } from "react";
// import API from "../api/api";
// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// import CreditProgressBar from "../components/dashboard/CreditProgressBar";
// import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
// import StreakCard from "../components/dashboard/StreakCard";
// import WeaknessInsights from "../components/dashboard/WeaknessInsights";
// import LearningRoadmap from "../components/dashboard/LearningRoadmap";
// import RecentAttempts from "../components/dashboard/RecentAttempts";
// import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const userName = user?.name || "User";

//   // Query for Questions
//   const { data: questions = [], isLoading: isQuestionsLoading, isError: isQuestionsError } = useQuery({
//     queryKey: ["questions"],
//     queryFn: async () => {
//       const res = await API.get("/questions");
//       return res.data.questions;
//     },
//     retry: 1, // Only retry once to avoid infinite skeleton loops if backend is down
//   });

//   // Query for Streak
//   const { data: streakData, isLoading: isStreakLoading, isError: isStreakError } = useQuery({
//     queryKey: ["streak"],
//     queryFn: async () => {
//       const res = await API.get("/streak");
//       return res.data;
//     },
//     retry: 1,
//   });

//   // FIX: If ANY critical data is loading OR if there is a backend error, show the Skeleton.
//   // This prevents the UI from showing "0" values when the backend is unreachable.
//   if (isQuestionsLoading || isStreakLoading || isQuestionsError || isStreakError) {
//     return <DashboardSkeleton />;
//   }

//   return (
//     <div className="animate-fadeIn pb-12 px-4 lg:px-8">
//       {/* HEADER */}
//       <header className="mb-10 pt-6">
//         <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-3 text-slate-900">
//           Welcome back, <span className="text-indigo-600">{userName}</span> 👋
//         </h1>
//         <p className="text-slate-500 text-lg max-w-2xl font-medium">
//           Your interview readiness, progress, and performance — all in one place.
//         </p>
//       </header>

//       {/* 4-CARD METRIC GRID */}
//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white border border-slate-200 p-6 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow h-64 flex flex-col">
//           <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">Credits</h2>
//           <div className="flex-1 flex flex-col justify-center">
//             <CreditProgressBar credits={user?.credits ?? 0} />
//           </div>
//           <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold">Used for mock interviews</p>
//         </div>

//         <div className="bg-white border border-slate-200 p-6 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow h-64 flex flex-col">
//           <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">Question Bank</h2>
//           <div className="flex-1 flex flex-col justify-center">
//             <p className="text-5xl font-black text-indigo-600 tracking-tighter">{questions.length}</p>
//           </div>
//           <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold">Interview questions</p>
//         </div>

//         <div className="bg-white border border-slate-200 p-6 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow h-64 flex flex-col">
//           <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">Today’s Goal</h2>
//           <div className="flex-1 flex flex-col justify-center">
//             <p className="text-4xl font-black text-emerald-500 tracking-tight">1 Mock</p>
//           </div>
//           <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold">Daily practice goal</p>
//         </div>

//         <div className="bg-white border border-slate-200 p-6 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow h-64 flex flex-col">
//           <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">Performance</h2>
//           <div className="flex-1 flex flex-col justify-center">
//             <p className="text-4xl font-black text-blue-600 tracking-tight">78%</p>
//           </div>
//           <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold">Avg accuracy score</p>
//         </div>
//       </section>

//       {/* ACTION BUTTONS */}
//       <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Link to="/mock" className="flex items-center justify-center py-5 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
//           🚀 Start Mock Interview
//         </Link>
//         <Link to="/questions" className="flex items-center justify-center py-5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all">
//           📚 Browse Questions
//         </Link>
//         <Link to="/history" className="flex items-center justify-center py-5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all">
//           📊 Interview History
//         </Link>
//       </section>

//       {/* CHARTS & ANALYTICS */}
//       <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">
//         <div className="bg-white border border-slate-200 p-2 rounded-[2.5rem] shadow-sm overflow-hidden h-96">
//             <StreakCard streak={streakData?.streak ?? 0} />
//         </div>
//         <div className="bg-white border border-slate-200 p-6 rounded-[2.5rem] shadow-sm h-96">
//             <AnalyticsCharts />
//         </div>
//       </section>

//       {/* INSIGHTS & ROADMAP */}
//       <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
//         <div className="bg-white border border-slate-200 p-6 rounded-[2.5rem] shadow-sm">
//             <WeaknessInsights />
//         </div>
//         <div className="bg-white border border-slate-200 p-6 rounded-[2.5rem] shadow-sm">
//             <LearningRoadmap />
//         </div>
//       </section>

//       {/* RECENT ACTIVITY */}
//       <section className="mt-12 mb-10">
//         <div className="flex items-center justify-between mb-6 px-2">
//           <h2 className="text-2xl font-black tracking-tight text-slate-900">Recent Activity</h2>
//           <Link to="/activity" className="text-xs font-bold uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-3 py-1 rounded-full">
//             View all →
//           </Link>
//         </div>
//         <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
//             <RecentAttempts />
//         </div>
//       </section>
//     </div>
//   );
// }

//dark mode
// import React, { useContext } from "react";
// import API from "../api/api";
// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// import CreditProgressBar from "../components/dashboard/CreditProgressBar";
// import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
// import StreakCard from "../components/dashboard/StreakCard";
// import WeaknessInsights from "../components/dashboard/WeaknessInsights";
// import LearningRoadmap from "../components/dashboard/LearningRoadmap";
// import RecentAttempts from "../components/dashboard/RecentAttempts";
// import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

// export default function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const userName = user?.name || "User";

//   // Query for Questions
//   const { data: questions = [], isLoading: isQuestionsLoading, isError: isQuestionsError } = useQuery({
//     queryKey: ["questions"],
//     queryFn: async () => {
//       const res = await API.get("/questions");
//       return res.data.questions;
//     },
//     retry: 1,
//   });

//   // Query for Streak
//   const { data: streakData, isLoading: isStreakLoading, isError: isStreakError } = useQuery({
//     queryKey: ["streak"],
//     queryFn: async () => {
//       const res = await API.get("/streak");
//       return res.data;
//     },
//     retry: 1,
//   });

//   if (isQuestionsLoading || isStreakLoading || isQuestionsError || isStreakError) {
//     return <DashboardSkeleton />;
//   }

//   return (
//     <div className="animate-fadeIn pb-12 px-4 lg:px-8">
//       {/* HEADER */}
//       <header className="mb-10 pt-6">
//         <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-3 text-[var(--text-primary)]">
//           Welcome back, <span className="text-[var(--accent)]">{userName}</span> 👋
//         </h1>
//         <p className="text-lg max-w-2xl font-medium text-[var(--text-secondary)]">
//           Your interview readiness, progress, and performance — all in one place.
//         </p>
//       </header>

//       {/* 4-CARD METRIC GRID */}
//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {[
//           { label: "Credits", value: <CreditProgressBar credits={user?.credits ?? 0} />, sub: "Used for mock interviews", color: "var(--text-secondary)" },
//           { label: "Question Bank", value: questions.length, sub: "Interview questions", color: "var(--accent)" },
//           { label: "Today’s Goal", value: "1 Mock", sub: "Daily practice goal", color: "#10b981" }, 
//           { label: "Performance", value: "78%", sub: "Avg accuracy score", color: "#3b82f6" }  
//         ].map((card, idx) => (
//           <div key={idx} className="card p-6 shadow-sm hover:border-[var(--accent)] transition-all duration-300 h-64 flex flex-col group">
//             <h2 className="text-[11px] font-bold uppercase tracking-widest mb-4 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{card.label}</h2>
//             <div className="flex-1 flex flex-col justify-center">
//               {typeof card.value === "string" || typeof card.value === "number" ? (
//                 <p className="text-5xl font-black tracking-tighter" style={{ color: card.color }}>{card.value}</p>
//               ) : (
//                 card.value
//               )}
//             </div>
//             <p className="text-[10px] mt-4 uppercase font-bold text-[var(--text-secondary)]">{card.sub}</p>
//           </div>
//         ))}
//       </section>

//       {/* ACTION BUTTONS */}
//       <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Link to="/mock" className="flex items-center justify-center py-5 rounded-2xl text-white font-bold shadow-lg shadow-indigo-500/10 transition-all hover:-translate-y-1 hover:brightness-110 active:scale-95 bg-[var(--accent)]">
//           🚀 Start Mock Interview
//         </Link>
//         <Link to="/questions" className="card flex items-center justify-center py-5 font-bold hover:bg-white/5 transition-all text-[var(--text-primary)]">
//           📚 Browse Questions
//         </Link>
//         <Link to="/history" className="card flex items-center justify-center py-5 font-bold hover:bg-white/5 transition-all text-[var(--text-primary)]">
//           📊 Interview History
//         </Link>
//       </section>

//       {/* CHARTS & ANALYTICS */}
//       <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">
//         <div className="card p-2 overflow-hidden h-96">
//             <StreakCard streak={streakData?.streak ?? 0} />
//         </div>
//         <div className="card p-6 h-96">
//             <AnalyticsCharts />
//         </div>
//       </section>

//       {/* INSIGHTS & ROADMAP */}
//       <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
//         <div className="card p-6">
//             <WeaknessInsights />
//         </div>
//         <div className="card p-6">
//             <LearningRoadmap />
//         </div>
//       </section>

//       {/* RECENT ACTIVITY */}
//       <section className="mt-12 mb-10">
//         <div className="flex items-center justify-between mb-6 px-2">
//           <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">Recent Activity</h2>
//           <Link to="/activity" className="text-xs font-bold uppercase tracking-widest transition-all px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-[var(--accent)] hover:bg-indigo-500/20">
//             View all →
//           </Link>
//         </div>
//         <div className="card overflow-hidden">
//             <RecentAttempts />
//         </div>
//       </section>
//     </div>
//   );
// }

//before is live fixed new changes

import React, { useContext } from "react";
import API from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

import CreditProgressBar from "../components/dashboard/CreditProgressBar";
import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
import StreakCard from "../components/dashboard/StreakCard";
import WeaknessInsights from "../components/dashboard/WeaknessInsights";
import LearningRoadmap from "../components/dashboard/LearningRoadmap";
import RecentAttempts from "../components/dashboard/RecentAttempts";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  // ✅ Proper Case Name Formatting
  const userName =
    user?.name
      ?.toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "User";

  // ── Questions ──
  const {
    data: questions = [],
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const res = await API.get("/questions");
      return res.data.questions;
    },
    retry: 1,
  });

  // ── Streak ──
  const {
    data: streakData,
    isLoading: isStreakLoading,
    isError: isStreakError,
  } = useQuery({
    queryKey: ["streak"],
    queryFn: async () => {
      const res = await API.get("/streak");
      return res.data;
    },
    retry: 1,
  });

  // ── Dashboard Summary ──
  const {
    data: summary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const res = await API.get("/dashboard/summary");
      return res.data;
    },
    retry: 1,
    staleTime: 1000 * 60 * 2,
  });

  if (
    isQuestionsLoading ||
    isStreakLoading ||
    isSummaryLoading ||
    isQuestionsError ||
    isStreakError ||
    isSummaryError
  ) {
    return <DashboardSkeleton />;
  }

  const performance = summary?.performance ?? 0;
  const todayMocks = summary?.todayMocks ?? 0;
  const DAILY_GOAL = 1;

  const goalDisplay = `${todayMocks}/${DAILY_GOAL}`;
  const goalDone = todayMocks >= DAILY_GOAL;

  return (
    <div className="animate-fadeIn pb-12 px-4 lg:px-8">

      {/* HEADER */}
      <header className="mb-10 pt-6">
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-3 text-[var(--text-primary)]">
          Welcome back, <span className="text-[var(--accent)]">{userName}</span> 👋
        </h1>
        <p className="text-lg max-w-2xl font-medium text-[var(--text-secondary)]">
          Your interview readiness, progress, and performance — all in one place.
        </p>
      </header>

      {/* 4-CARD METRIC GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* CARD 1 — Credits */}
        <div className="card p-6 shadow-sm hover:border-[var(--accent)] transition-all duration-300 h-64 flex flex-col group">
          <h2 className="text-[11px] font-bold uppercase tracking-widest mb-4 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
            Credits
          </h2>
          <div className="flex-1 flex flex-col justify-center">
            <CreditProgressBar credits={user?.credits ?? 0} />
          </div>
          <p className="text-[10px] mt-4 uppercase font-bold text-[var(--text-secondary)]">
            Used for mock interviews
          </p>
        </div>

        {/* CARD 2 — Question Bank */}
        <div className="card p-6 shadow-sm hover:border-[var(--accent)] transition-all duration-300 h-64 flex flex-col group">
          <h2 className="text-[11px] font-bold uppercase tracking-widest mb-4 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
            Question Bank
          </h2>
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-5xl font-black tracking-tighter" style={{ color: "var(--accent)" }}>
              {questions.length}
            </p>
          </div>
          <p className="text-[10px] mt-4 uppercase font-bold text-[var(--text-secondary)]">
            Interview questions
          </p>
        </div>

        {/* CARD 3 — Today's Goal */}
        <div className="card p-6 shadow-sm hover:border-[var(--accent)] transition-all duration-300 h-64 flex flex-col group">
          <h2 className="text-[11px] font-bold uppercase tracking-widest mb-4 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
            Today's Goal
          </h2>
          <div className="flex-1 flex flex-col justify-center gap-3">
            <p className="text-5xl font-black tracking-tighter" style={{ color: "#10b981" }}>
              {goalDisplay}
              <span className="text-xl ml-1 font-bold opacity-60">Mock</span>
            </p>
            <div className="w-full h-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min((todayMocks / DAILY_GOAL) * 100, 100)}%`,
                  backgroundColor: goalDone ? "#10b981" : "var(--accent)",
                }}
              />
            </div>
            {goalDone && (
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest animate-pulse">
                ✅ Goal achieved!
              </p>
            )}
          </div>
          <p className="text-[10px] mt-4 uppercase font-bold text-[var(--text-secondary)]">
            Daily practice goal
          </p>
        </div>

        {/* CARD 4 — Performance */}
        <div className="card p-6 shadow-sm hover:border-[var(--accent)] transition-all duration-300 h-64 flex flex-col group">
          <h2 className="text-[11px] font-bold uppercase tracking-widest mb-4 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
            Performance
          </h2>
          <div className="flex-1 flex flex-col justify-center gap-3">
            <p
              className="text-5xl font-black tracking-tighter"
              style={{
                color:
                  performance >= 70
                    ? "#10b981"
                    : performance >= 40
                    ? "#f59e0b"
                    : "#ef4444",
              }}
            >
              {performance}%
            </p>
            <p
              className="text-[10px] font-black uppercase tracking-widest"
              style={{
                color:
                  performance >= 70
                    ? "#10b981"
                    : performance >= 40
                    ? "#f59e0b"
                    : "#ef4444",
              }}
            >
              {performance >= 70
                ? "🟢 Strong"
                : performance >= 40
                ? "🟡 Improving"
                : performance === 0
                ? "— No sessions yet"
                : "🔴 Needs work"}
            </p>
          </div>
          <p className="text-[10px] mt-4 uppercase font-bold text-[var(--text-secondary)]">
            Avg accuracy score
          </p>
        </div>

      </section>

      {/* ACTION BUTTONS */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/mock"
          className="flex items-center justify-center py-5 rounded-2xl text-white font-bold shadow-lg shadow-indigo-500/10 transition-all hover:-translate-y-1 hover:brightness-110 active:scale-95 bg-[var(--accent)]"
        >
          🚀 Start Mock Interview
        </Link>
        <Link
          to="/questions"
          className="card flex items-center justify-center py-5 font-bold hover:bg-white/5 transition-all text-[var(--text-primary)]"
        >
          📚 Browse Questions
        </Link>
        <Link
          to="/history"
          className="card flex items-center justify-center py-5 font-bold hover:bg-white/5 transition-all text-[var(--text-primary)]"
        >
          📊 Interview History
        </Link>
      </section>

      {/* Remaining sections unchanged */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">
        <div className="card p-2 overflow-hidden h-96">
          <StreakCard
            streak={streakData?.streak ?? 0}
            activeDaysThisWeek={streakData?.activeDaysThisWeek ?? []}
          />
        </div>
        <div className="card p-6 h-96">
          <AnalyticsCharts />
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
        <div className="card p-6">
          <WeaknessInsights />
        </div>
        <div className="card p-6">
          <LearningRoadmap />
        </div>
      </section>

      <section className="mt-12 mb-10">
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
            Recent Activity
          </h2>
          <Link
            to="/activity"
            className="text-xs font-bold uppercase tracking-widest transition-all px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-[var(--accent)] hover:bg-indigo-500/20"
          >
            View all →
          </Link>
        </div>
        <div className="card overflow-hidden">
          <RecentAttempts />
        </div>
      </section>

    </div>
  );
}