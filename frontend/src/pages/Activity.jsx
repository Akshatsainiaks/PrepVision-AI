// import React from "react";
// import { Link } from "react-router-dom";
// import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
// import WeaknessInsights from "../components/dashboard/WeaknessInsights";

// export default function Activity() {
//   return (
//     <div className="space-y-12">

//       {/* HEADER */}
//       <div>
//         <h1 className="text-4xl font-extrabold mb-3">
//           Activity
//         </h1>
//         <p className="text-gray-400 max-w-2xl">
//           Track your interview activity, performance trends, and skill improvement over time.
//         </p>
//       </div>

//       {/* QUICK NAVIGATION */}
//       <div className="flex gap-4">
//         <Link
//           to="/history"
//           className="px-5 py-2 rounded-xl bg-white/10 border border-white/10
//           font-semibold hover:bg-white/20 transition"
//         >
//           📊 View Full Interview History →
//         </Link>
//       </div>

//       {/* TOP METRICS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

//         <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
//           <h2 className="text-sm text-gray-400">Total Interviews</h2>
//           <p className="text-4xl font-bold mt-3 text-purple-400">24</p>
//           <p className="text-xs text-gray-500 mt-1">
//             Across all roles & companies
//           </p>
//         </div>

//         <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
//           <h2 className="text-sm text-gray-400">Average Score</h2>
//           <p className="text-4xl font-bold mt-3 text-blue-400">78%</p>
//           <p className="text-xs text-gray-500 mt-1">
//             Based on AI evaluation
//           </p>
//         </div>

//         <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
//           <h2 className="text-sm text-gray-400">Avg Interview Time</h2>
//           <p className="text-4xl font-bold mt-3 text-green-400">18m</p>
//           <p className="text-xs text-gray-500 mt-1">
//             Per mock interview
//           </p>
//         </div>
//       </div>

//       {/* PERFORMANCE CHARTS */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//         <AnalyticsCharts />

//         <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
//           <h2 className="text-xl font-semibold mb-4">
//             Accuracy Trend
//           </h2>

//           <p className="text-gray-400 text-sm mb-6">
//             Your accuracy has improved steadily over recent attempts.
//           </p>

//           <div className="h-40 flex items-center justify-center text-gray-500 text-sm border border-dashed border-white/10 rounded-xl">
//             Accuracy line chart (weekly)
//           </div>
//         </div>
//       </div>

//       {/* WEAKNESS ANALYSIS */}
//       <div>
//         <h2 className="text-2xl font-bold mb-6">
//           Skill Analysis
//         </h2>
//         <WeaknessInsights />
//       </div>

//       {/* ACTION CTA */}
//       <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-center">
//         <h3 className="text-xl font-bold mb-2">
//           Want detailed interview breakdowns?
//         </h3>
//         <p className="text-sm opacity-90 mb-4">
//           Explore every interview attempt with scores, answers, and AI feedback.
//         </p>

//         <Link
//           to="/history"
//           className="inline-block px-6 py-3 bg-black/30 rounded-xl
//           font-semibold hover:bg-black/40 transition"
//         >
//           Go to Interview History →
//         </Link>
//       </div>

//     </div>
//   );
// }


// new final 
// import React from "react";
// import { Link } from "react-router-dom";
// import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
// import WeaknessInsights from "../components/dashboard/WeaknessInsights";
// import { FiActivity, FiArrowRight, FiTarget, FiClock, FiTrendingUp } from "react-icons/fi";

// export default function Activity() {
//   return (
//     <div className="max-w-7xl mx-auto space-y-10 pb-16 animate-fadeIn">

//       {/* HEADER SECTION */}
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//         <div className="space-y-2">
//           <div className="flex items-center gap-3">
//              <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100">
//                 <FiActivity size={24} />
//              </div>
//              <h1 className="text-4xl font-black tracking-tight text-slate-900">
//                 Activity <span className="text-indigo-600">Trends</span>
//              </h1>
//           </div>
//           <p className="text-slate-500 font-medium max-w-2xl">
//             Track your interview activity, performance trends, and skill improvement over time.
//           </p>
//         </div>

//         <Link
//           to="/history"
//           className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 
//           text-sm font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600 
//           hover:border-indigo-200 shadow-sm transition-all active:scale-95 group"
//         >
//           View Full History 
//           <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
//         </Link>
//       </div>

//       {/* TOP METRICS - Crystal Light Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 group transition-all hover:translate-y-[-4px]">
//           <div className="flex items-center gap-4 mb-4">
//              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100"><FiActivity size={20}/></div>
//              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Total Interviews</h2>
//           </div>
//           <p className="text-5xl font-black tracking-tighter text-slate-900">24</p>
//           <p className="text-xs font-bold text-slate-400 mt-2 uppercase">Across all roles & companies</p>
//         </div>

//         <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 group transition-all hover:translate-y-[-4px]">
//           <div className="flex items-center gap-4 mb-4">
//              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><FiTarget size={20}/></div>
//              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Average Score</h2>
//           </div>
//           <p className="text-5xl font-black tracking-tighter text-indigo-600">78%</p>
//           <p className="text-xs font-bold text-slate-400 mt-2 uppercase">Based on AI evaluation</p>
//         </div>

//         <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 group transition-all hover:translate-y-[-4px]">
//           <div className="flex items-center gap-4 mb-4">
//              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><FiClock size={20}/></div>
//              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Avg Time</h2>
//           </div>
//           <p className="text-5xl font-black tracking-tighter text-slate-900">18m</p>
//           <p className="text-xs font-bold text-slate-400 mt-2 uppercase">Per mock interview session</p>
//         </div>
//       </div>

//       {/* PERFORMANCE CHARTS */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//         <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50">
//             <AnalyticsCharts />
//         </div>

//         <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-black text-slate-900 tracking-tight">
//               Accuracy Trend
//             </h2>
//             <div className="px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
//                 +12% Improvement
//             </div>
//           </div>

//           <p className="text-slate-500 font-medium text-sm mb-6 leading-relaxed">
//             Your accuracy has improved steadily over recent attempts, specifically in Technical Core areas.
//           </p>

//           <div className="h-64 flex items-center justify-center bg-slate-50/50 border-2 border-dashed border-slate-100 rounded-[2rem]">
//             <div className="flex flex-col items-center gap-3 text-slate-300">
//                 <FiTrendingUp size={32} />
//                 <span className="text-xs font-black uppercase tracking-widest">Accuracy line chart</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* WEAKNESS ANALYSIS */}
//       <div className="space-y-6">
//         <div className="flex items-center gap-3">
//              <div className="w-8 h-1 bg-indigo-600 rounded-full" />
//              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
//                 Skill Analysis
//              </h2>
//         </div>
//         <div className="bg-white border border-slate-100 rounded-[2.5rem] p-2 shadow-sm">
//             <WeaknessInsights />
//         </div>
//       </div>

//       {/* ACTION CTA - Modern Gradient Card */}
//       <div className="relative overflow-hidden bg-indigo-600 rounded-[3rem] p-10 md:p-14 text-center shadow-2xl shadow-indigo-200 group">
//         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-32 -mt-32 rounded-full" />
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 blur-3xl -ml-32 -mb-32 rounded-full" />
        
//         <div className="relative z-10">
//             <h3 className="text-3xl font-black text-white mb-3 tracking-tight leading-tight">
//                 Want detailed interview breakdowns?
//             </h3>
//             <p className="text-indigo-100 font-medium mb-8 max-w-xl mx-auto opacity-90">
//                 Explore every interview attempt with scores, answers, and AI feedback to fine-tune your performance.
//             </p>

//             <Link
//                 to="/history"
//                 className="inline-flex items-center gap-3 px-10 py-4 bg-white text-indigo-600 rounded-[1.5rem]
//                 font-black text-sm uppercase tracking-widest hover:bg-slate-50 hover:shadow-xl transition-all active:scale-95 shadow-lg"
//             >
//                 Explore Records <FiArrowRight />
//             </Link>
//         </div>
//       </div>

//     </div>
//   );
// }


//dark mode
// import React from "react";
// import { Link } from "react-router-dom";
// import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
// import WeaknessInsights from "../components/dashboard/WeaknessInsights";
// import { FiActivity, FiArrowRight, FiTarget, FiClock, FiTrendingUp } from "react-icons/fi";

// export default function Activity() {
//   return (
//     <div className="max-w-7xl mx-auto space-y-10 pb-16 animate-fadeIn transition-colors duration-300">

//       {/* HEADER SECTION */}
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//         <div className="space-y-2">
//           <div className="flex items-center gap-3">
//              <div className="p-3 rounded-2xl text-white shadow-xl shadow-indigo-500/20"
//                   style={{ backgroundColor: "var(--accent)" }}>
//                 <FiActivity size={24} />
//              </div>
//              <h1 className="text-4xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
//                 Activity <span style={{ color: "var(--accent)" }}>Trends</span>
//              </h1>
//           </div>
//           <p className="font-medium max-w-2xl" style={{ color: "var(--text-secondary)" }}>
//             Track your interview activity, performance trends, and skill improvement over time.
//           </p>
//         </div>

//         <Link
//           to="/history"
//           className="flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all active:scale-95 group font-black text-sm uppercase tracking-widest shadow-sm"
//           style={{ 
//             backgroundColor: "var(--bg-card)", 
//             borderColor: "var(--border-color)",
//             color: "var(--text-secondary)" 
//           }}
//         >
//           View Full History 
//           <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
//         </Link>
//       </div>

//       {/* TOP METRICS - Deep Slate Glass Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="card p-8 group transition-all hover:translate-y-[-4px] shadow-lg shadow-black/20">
//           <div className="flex items-center gap-4 mb-4">
//              <div className="p-3 rounded-xl border" 
//                   style={{ backgroundColor: "rgba(99, 102, 241, 0.1)", borderColor: "rgba(99, 102, 241, 0.2)", color: "var(--accent)" }}>
//                 <FiActivity size={20}/>
//              </div>
//              <h2 className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Total Interviews</h2>
//           </div>
//           <p className="text-5xl font-black tracking-tighter" style={{ color: "var(--text-primary)" }}>24</p>
//           <p className="text-xs font-bold mt-2 uppercase" style={{ color: "var(--text-secondary)" }}>Across all roles & companies</p>
//         </div>

//         <div className="card p-8 group transition-all hover:translate-y-[-4px] shadow-lg shadow-black/20">
//           <div className="flex items-center gap-4 mb-4">
//              <div className="p-3 rounded-xl border"
//                   style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(16, 185, 129, 0.2)", color: "#10b981" }}>
//                 <FiTarget size={20}/>
//              </div>
//              <h2 className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Average Score</h2>
//           </div>
//           <p className="text-5xl font-black tracking-tighter" style={{ color: "var(--accent)" }}>78%</p>
//           <p className="text-xs font-bold mt-2 uppercase" style={{ color: "var(--text-secondary)" }}>Based on AI evaluation</p>
//         </div>

//         <div className="card p-8 group transition-all hover:translate-y-[-4px] shadow-lg shadow-black/20">
//           <div className="flex items-center gap-4 mb-4">
//              <div className="p-3 rounded-xl border"
//                   style={{ backgroundColor: "rgba(245, 158, 11, 0.1)", borderColor: "rgba(245, 158, 11, 0.2)", color: "#f59e0b" }}>
//                 <FiClock size={20}/>
//              </div>
//              <h2 className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Avg Time</h2>
//           </div>
//           <p className="text-5xl font-black tracking-tighter" style={{ color: "var(--text-primary)" }}>18m</p>
//           <p className="text-xs font-bold mt-2 uppercase" style={{ color: "var(--text-secondary)" }}>Per mock interview session</p>
//         </div>
//       </div>

//       {/* PERFORMANCE CHARTS */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//         <div className="card p-8 shadow-lg shadow-black/20">
//             <AnalyticsCharts />
//         </div>

//         <div className="card p-8 shadow-lg shadow-black/20">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
//               Accuracy Trend
//             </h2>
//             <div className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border"
//                  style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(16, 185, 129, 0.2)", color: "#10b981" }}>
//                 +12% Improvement
//             </div>
//           </div>

//           <p className="font-medium text-sm mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
//             Your accuracy has improved steadily over recent attempts, specifically in Technical Core areas.
//           </p>

//           <div className="h-64 flex items-center justify-center rounded-[2rem] border-2 border-dashed"
//                style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", borderColor: "var(--border-color)" }}>
//             <div className="flex flex-col items-center gap-3" style={{ color: "var(--text-secondary)" }}>
//                 <FiTrendingUp size={32} />
//                 <span className="text-xs font-black uppercase tracking-widest">Accuracy line chart</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* WEAKNESS ANALYSIS */}
//       <div className="space-y-6">
//         <div className="flex items-center gap-3">
//              <div className="w-8 h-1 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
//              <h2 className="text-2xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
//                 Skill Analysis
//              </h2>
//         </div>
//         <div className="card p-2 shadow-sm border-[var(--border-color)]">
//             <WeaknessInsights />
//         </div>
//       </div>

//       {/* ACTION CTA - Permanent Dark Gradient Card */}
//       <div className="relative overflow-hidden rounded-[3rem] p-10 md:p-14 text-center shadow-2xl group"
//            style={{ backgroundColor: "var(--accent)" }}>
//         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-32 -mt-32 rounded-full" />
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 blur-3xl -ml-32 -mb-32 rounded-full" />
        
//         <div className="relative z-10">
//             <h3 className="text-3xl font-black text-white mb-3 tracking-tight leading-tight">
//                 Want detailed interview breakdowns?
//             </h3>
//             <p className="text-indigo-100 font-medium mb-8 max-w-xl mx-auto opacity-90">
//                 Explore every interview attempt with scores, answers, and AI feedback to fine-tune your performance.
//             </p>

//             <Link
//                 to="/history"
//                 className="inline-flex items-center gap-3 px-10 py-4 bg-white text-indigo-600 rounded-[1.5rem]
//                 font-black text-sm uppercase tracking-widest hover:bg-slate-50 hover:shadow-xl transition-all active:scale-95 shadow-lg shadow-black/20"
//             >
//                 Explore Records <FiArrowRight />
//             </Link>
//         </div>
//       </div>

//     </div>
//   );
// }

//next acc claude code
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import API from "../api/api";
import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
import WeaknessInsights from "../components/dashboard/WeaknessInsights";
import {
  FiActivity, FiArrowRight, FiTarget, FiTrendingUp,
  FiMic, FiFileText, FiLoader,
} from "react-icons/fi";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer,
} from "recharts";

export default function Activity() {

  /* ── Summary: totalSessions, performance ── */
  const { data: summary, isLoading: isSummaryLoading } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const res = await API.get("/dashboard/summary");
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
  });

  /* ── Analytics: trend data for Accuracy chart ── */
  const { data: analytics, isLoading: isAnalyticsLoading } = useQuery({
    queryKey: ["dashboard-analytics"],
    queryFn: async () => {
      const res = await API.get("/dashboard/analytics");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  /* ── History stats: liveCount, writtenCount ── */
  const { data: historyData, isLoading: isHistoryLoading } = useQuery({
    queryKey: ["interview-history", "ALL", "newest", "", 1],
    queryFn: async () => {
      const res = await API.get("/interview-history?type=ALL&limit=1&page=1");
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
  });

  const isLoading = isSummaryLoading || isAnalyticsLoading || isHistoryLoading;

  // Real values
  const totalSessions = summary?.totalSessions ?? 0;
  const performance   = summary?.performance   ?? 0;
  const liveCount     = historyData?.stats?.liveCount    ?? 0;
  const writtenCount  = historyData?.stats?.writtenCount ?? 0;

  // Accuracy trend: convert /10 scores to % and compute rolling avg
  const trend = analytics?.trend || [];
  const accuracyData = trend.map((t, idx) => {
    // rolling average of last 3 sessions
    const window = trend.slice(Math.max(0, idx - 2), idx + 1);
    const avg = window.reduce((s, x) => s + x.score, 0) / window.length;
    return {
      date: t.date,
      accuracy: Math.round((avg / 10) * 100),
      score: Math.round((t.score / 10) * 100),
    };
  });

  // Improvement: compare first half avg vs second half avg
  const improvementLabel = (() => {
    if (accuracyData.length < 2) return null;
    const mid   = Math.floor(accuracyData.length / 2);
    const first = accuracyData.slice(0, mid).reduce((s, x) => s + x.accuracy, 0) / mid;
    const last  = accuracyData.slice(mid).reduce((s, x) => s + x.accuracy, 0) / (accuracyData.length - mid);
    const diff  = Math.round(last - first);
    if (diff === 0) return null;
    return { label: `${diff > 0 ? "+" : ""}${diff}% vs earlier`, positive: diff > 0 };
  })();

  // Custom tooltip for accuracy chart
  const AccuracyTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="px-4 py-3 rounded-2xl border text-sm font-bold shadow-xl"
           style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>{label}</p>
        <p style={{ color: "#10b981" }}>Accuracy: <span className="text-white">{payload[0].value}%</span></p>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-16 animate-fadeIn">

      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl text-white shadow-xl shadow-indigo-500/20"
                 style={{ backgroundColor: "var(--accent)" }}>
              <FiActivity size={24} />
            </div>
            <h1 className="text-4xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              Activity <span style={{ color: "var(--accent)" }}>Trends</span>
            </h1>
          </div>
          <p className="font-medium max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            Track your interview activity, performance trends, and skill improvement over time.
          </p>
        </div>

        <Link
          to="/history"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all active:scale-95 group font-black text-sm uppercase tracking-widest shadow-sm"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
        >
          View Full History
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* ── METRIC CARDS ✅ REAL DATA ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Interviews */}
        <MetricCard
          icon={FiActivity}
          iconColor="var(--accent)"
          iconBg="rgba(99,102,241,0.1)"
          iconBorder="rgba(99,102,241,0.2)"
          label="Total Interviews"
          value={isLoading ? null : totalSessions}
          sub="Across all roles & companies"
          valueColor="var(--text-primary)"
        />

        {/* Average Score */}
        <MetricCard
          icon={FiTarget}
          iconColor="#10b981"
          iconBg="rgba(16,185,129,0.1)"
          iconBorder="rgba(16,185,129,0.2)"
          label="Average Score"
          value={isLoading ? null : `${performance}%`}
          sub="Based on AI evaluation"
          valueColor={performance >= 75 ? "#10b981" : performance >= 45 ? "#f59e0b" : performance === 0 ? "var(--text-secondary)" : "#f43f5e"}
        />

        {/* Live vs Written breakdown */}
        <div className="card p-8 group transition-all hover:translate-y-[-4px] shadow-lg shadow-black/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl border"
                 style={{ backgroundColor: "rgba(129,140,248,0.1)", borderColor: "rgba(129,140,248,0.2)", color: "#818cf8" }}>
              <FiMic size={20} />
            </div>
            <h2 className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
              Session Breakdown
            </h2>
          </div>
          {isLoading ? (
            <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
              <FiLoader className="animate-spin" size={16} /> Loading...
            </div>
          ) : (
            <div className="flex items-end gap-6">
              <div>
                <p className="text-4xl font-black tracking-tighter" style={{ color: "#818cf8" }}>{liveCount}</p>
                <p className="text-[10px] font-black uppercase tracking-widest mt-1 flex items-center gap-1"
                   style={{ color: "var(--text-secondary)" }}>
                  <FiMic size={10} /> Live
                </p>
              </div>
              <div className="w-px h-10 self-center" style={{ backgroundColor: "var(--border-color)" }} />
              <div>
                <p className="text-4xl font-black tracking-tighter" style={{ color: "#10b981" }}>{writtenCount}</p>
                <p className="text-[10px] font-black uppercase tracking-widest mt-1 flex items-center gap-1"
                   style={{ color: "var(--text-secondary)" }}>
                  <FiFileText size={10} /> Written
                </p>
              </div>
            </div>
          )}
          <p className="text-xs font-bold mt-3 uppercase" style={{ color: "var(--text-secondary)" }}>
            Interview type split
          </p>
        </div>
      </div>

      {/* ── CHARTS ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Existing AnalyticsCharts (performance trend + weak topics) */}
        <div className="card p-8 shadow-lg shadow-black/20">
          <AnalyticsCharts />
        </div>

        {/* ✅ REAL Accuracy Trend chart */}
        <div className="card p-8 shadow-lg shadow-black/20">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              Accuracy Trend
            </h2>
            {improvementLabel && (
              <div
                className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border"
                style={{
                  backgroundColor: improvementLabel.positive ? "rgba(16,185,129,0.1)" : "rgba(244,63,94,0.1)",
                  borderColor: improvementLabel.positive ? "rgba(16,185,129,0.2)" : "rgba(244,63,94,0.2)",
                  color: improvementLabel.positive ? "#10b981" : "#f43f5e",
                }}
              >
                {improvementLabel.label}
              </div>
            )}
          </div>

          <p className="font-medium text-sm mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Rolling average accuracy across all your interview sessions.
          </p>

          {isAnalyticsLoading ? (
            <div className="h-64 flex items-center justify-center">
              <FiLoader className="animate-spin" size={24} style={{ color: "var(--accent)" }} />
            </div>
          ) : accuracyData.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed"
                 style={{ borderColor: "var(--border-color)" }}>
              <FiTrendingUp size={32} className="mb-3 opacity-20" style={{ color: "var(--text-secondary)" }} />
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
                Complete sessions to see trend
              </p>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={accuracyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }} dy={10} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<AccuracyTooltip />} />
                  <Area type="monotone" dataKey="accuracy"
                    stroke="#10b981" strokeWidth={3}
                    fillOpacity={1} fill="url(#accuracyGradient)"
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#fff", stroke: "#10b981", strokeWidth: 2 }}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* ── WEAKNESS ANALYSIS ── */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-1 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
          <h2 className="text-2xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
            Skill Analysis
          </h2>
        </div>
        <div className="card p-2 shadow-sm">
          <WeaknessInsights />
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="relative overflow-hidden rounded-[3rem] p-10 md:p-14 text-center shadow-2xl"
           style={{ backgroundColor: "var(--accent)" }}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-32 -mt-32 rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 blur-3xl -ml-32 -mb-32 rounded-full" />
        <div className="relative z-10">
          <h3 className="text-3xl font-black text-white mb-3 tracking-tight">
            Want detailed interview breakdowns?
          </h3>
          <p className="text-indigo-100 font-medium mb-8 max-w-xl mx-auto opacity-90">
            Explore every interview attempt with scores, answers, and AI feedback.
          </p>
          <Link
            to="/history"
            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-indigo-600 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-slate-50 hover:shadow-xl transition-all active:scale-95 shadow-lg"
          >
            Explore Records <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable metric card ── */
function MetricCard({ icon: Icon, iconColor, iconBg, iconBorder, label, value, sub, valueColor }) {
  return (
    <div className="card p-8 group transition-all hover:translate-y-[-4px] shadow-lg shadow-black/20">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-xl border"
             style={{ backgroundColor: iconBg, borderColor: iconBorder, color: iconColor }}>
          <Icon size={20} />
        </div>
        <h2 className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
          {label}
        </h2>
      </div>
      {value === null ? (
        <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
          <FiLoader className="animate-spin" size={16} /> Loading...
        </div>
      ) : (
        <p className="text-5xl font-black tracking-tighter" style={{ color: valueColor }}>{value}</p>
      )}
      <p className="text-xs font-bold mt-2 uppercase" style={{ color: "var(--text-secondary)" }}>{sub}</p>
    </div>
  );
}