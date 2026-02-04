// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// // import { API } from "../../api/api";
// import API from "../../api/api";
// import {
//   AreaChart, Area, XAxis, YAxis, Tooltip,
//   BarChart, Bar, ResponsiveContainer
// } from "recharts";

// export default function AnalyticsCharts() {
//   const { data, isLoading } = useQuery({
//     queryKey: ["analytics"],
//     queryFn: async () => {
//       const res = await API.get("/analytics");
//       return res.data;
//     }
//   });

//   if (isLoading) {
//     return (
//       <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl text-center border border-white/20">
//         <p className="text-gray-400">Loading analytics...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-xl">
//       <h2 className="text-xl font-semibold mb-4">Performance Analytics</h2>

//       {/* TREND GRAPH */}
//       <div className="mb-10">
//         <h3 className="text-sm text-gray-300 mb-2">Score Trend</h3>

//         <div className="h-48">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={data.trend}>
//               <defs>
//                 <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
//                   <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
//                 </linearGradient>
//               </defs>

//               <XAxis dataKey="date" stroke="#aaa" />
//               <YAxis stroke="#aaa" domain={[0, 10]} />
//               <Tooltip />

//               <Area
//                 type="monotone"
//                 dataKey="score"
//                 stroke="#a78bfa"
//                 fillOpacity={1}
//                 fill="url(#colorScore)"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* TOPICS BAR GRAPH */}
//       <div>
//         <h3 className="text-sm text-gray-300 mb-2">Weakest Topics</h3>

//         <div className="h-48">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data.topicStats}>
//               <XAxis dataKey="topic" stroke="#aaa" />
//               <YAxis stroke="#aaa" />
//               <Tooltip />

//               <Bar dataKey="mistakes" fill="#ef4444" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }


//new

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import API from "../../api/api";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   BarChart,
//   Bar,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// export default function AnalyticsCharts() {
//   const { data, isLoading } = useQuery({
//     queryKey: ["analytics"],
//     queryFn: async () => {
//       const res = await API.get("/analytics");
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="card flex flex-col items-center justify-center h-[450px] animate-pulse">
//         <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
//         <p className="mt-4 text-sm text-gray-500 font-medium tracking-wide uppercase">
//           Synthesizing Data...
//         </p>
//       </div>
//     );
//   }

//   if (!data || !data.trend?.length) {
//     return (
//       <div className="card flex items-center justify-center h-[450px] border-dashed">
//         <div className="text-center">
//           <div className="text-4xl mb-3">📊</div>
//           <p className="text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">
//             No analytics data yet. Complete mock interviews to see your performance trends.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* SCORE TREND CHART */}
//       <div className="card !p-8">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h2 className="text-lg font-bold text-white tracking-tight">Performance Trend</h2>
//             <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">Consistency Analysis</p>
//           </div>
//           <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-bold text-purple-400 uppercase">
//             Live Data
//           </div>
//         </div>

//         <div className="h-64 w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={data.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//               <defs>
//                 <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
//                   <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
//               <XAxis 
//                 dataKey="date" 
//                 axisLine={false} 
//                 tickLine={false} 
//                 tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 600 }}
//                 dy={10}
//               />
//               <YAxis 
//                 axisLine={false} 
//                 tickLine={false} 
//                 tick={{ fill: '#6b7280', fontSize: 11 }} 
//                 domain={[0, 10]} 
//               />
//               <Tooltip
//                 cursor={{ stroke: '#a855f7', strokeWidth: 1 }}
//                 contentStyle={{
//                   backgroundColor: "rgba(17, 24, 39, 0.8)",
//                   backdropFilter: "blur(8px)",
//                   border: "1px solid rgba(255,255,255,0.1)",
//                   borderRadius: "12px",
//                   boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
//                   padding: "12px"
//                 }}
//                 itemStyle={{ color: "#e9d5ff", fontWeight: "bold" }}
//               />
//               <Area
//                 type="monotone"
//                 dataKey="score"
//                 stroke="#a855f7"
//                 strokeWidth={3}
//                 fillOpacity={1}
//                 fill="url(#scoreGradient)"
//                 animationDuration={2000}
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* WEAK TOPICS CHART */}
//       <div className="card !p-8">
//         <div className="mb-8">
//           <h2 className="text-lg font-bold text-white tracking-tight">Weakest Topics</h2>
//           <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">Focus Areas for Improvement</p>
//         </div>

//         <div className="h-64 w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data.topicStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
//               <XAxis 
//                 dataKey="topic" 
//                 axisLine={false} 
//                 tickLine={false} 
//                 tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 600 }}
//                 dy={10}
//               />
//               <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
//               <Tooltip
//                 cursor={{ fill: 'rgba(255,255,255,0.03)' }}
//                 contentStyle={{
//                   backgroundColor: "rgba(17, 24, 39, 0.8)",
//                   backdropFilter: "blur(8px)",
//                   border: "1px solid rgba(255,255,255,0.1)",
//                   borderRadius: "12px",
//                 }}
//               />
//               <Bar
//                 dataKey="mistakes"
//                 fill="#3b82f6"
//                 radius={[6, 6, 0, 0]}
//                 barSize={32}
//                 animationDuration={1500}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

//new final
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import API from "../../api/api";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   BarChart,
//   Bar,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// export default function AnalyticsCharts() {
//   const { data, isLoading } = useQuery({
//     queryKey: ["analytics"],
//     queryFn: async () => {
//       const res = await API.get("/analytics");
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="bg-white border border-slate-200 rounded-3xl flex flex-col items-center justify-center h-[450px] animate-pulse">
//         <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
//         <p className="mt-4 text-xs text-slate-400 font-bold tracking-widest uppercase">
//           Synthesizing Data...
//         </p>
//       </div>
//     );
//   }

//   if (!data || !data.trend?.length) {
//     return (
//       <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center h-[450px]">
//         <div className="text-center">
//           <div className="text-4xl mb-3 opacity-50">📊</div>
//           <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed font-medium">
//             No analytics data yet. Complete mock interviews to see your performance trends.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* SCORE TREND CHART */}
//       <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h2 className="text-lg font-bold text-slate-900 tracking-tight">Performance Trend</h2>
//             <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Consistency Analysis</p>
//           </div>
//           <div className="px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-[10px] font-bold text-indigo-600 uppercase">
//             Live Updates
//           </div>
//         </div>

//         <div className="h-64 w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={data.trend} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
//               <defs>
//                 <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
//                   <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.01} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//               <XAxis 
//                 dataKey="date" 
//                 axisLine={false} 
//                 tickLine={false} 
//                 tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
//                 dy={10}
//               />
//               <YAxis 
//                 axisLine={false} 
//                 tickLine={false} 
//                 tick={{ fill: '#94a3b8', fontSize: 11 }} 
//                 domain={[0, 10]} 
//               />
//               <Tooltip
//                 cursor={{ stroke: '#4f46e5', strokeWidth: 1.5 }}
//                 contentStyle={{
//                   backgroundColor: "#ffffff",
//                   border: "1px solid #e2e8f0",
//                   borderRadius: "12px",
//                   boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
//                   padding: "10px"
//                 }}
//                 itemStyle={{ color: "#4f46e5", fontWeight: "700", fontSize: "14px" }}
//               />
//               <Area
//                 type="monotone"
//                 dataKey="score"
//                 stroke="#4f46e5"
//                 strokeWidth={3}
//                 fillOpacity={1}
//                 fill="url(#scoreGradient)"
//                 animationDuration={2000}
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* WEAK TOPICS CHART */}
//       <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
//         <div className="mb-8">
//           <h2 className="text-lg font-bold text-slate-900 tracking-tight">Weakest Topics</h2>
//           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Focus Areas for Improvement</p>
//         </div>

//         <div className="h-64 w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data.topicStats} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//               <XAxis 
//                 dataKey="topic" 
//                 axisLine={false} 
//                 tickLine={false} 
//                 tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
//                 dy={10}
//               />
//               <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
//               <Tooltip
//                 cursor={{ fill: '#f8fafc' }}
//                 contentStyle={{
//                   backgroundColor: "#ffffff",
//                   border: "1px solid #e2e8f0",
//                   borderRadius: "12px",
//                   boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
//                 }}
//               />
//               <Bar
//                 dataKey="mistakes"
//                 fill="#6366f1"
//                 radius={[6, 6, 0, 0]}
//                 barSize={32}
//                 animationDuration={1500}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

//dark mode
import React from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../../api/api";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AnalyticsCharts() {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await API.get("/analytics");
      return res.data;
    },
  });

  // Dark Theme Chart Constants
  const colors = {
    accent: "#818cf8",      /* var(--accent) */
    grid: "#1e293b",        /* var(--border-color) */
    text: "#94a3b8",        /* var(--text-secondary) */
    card: "#0f172a",        /* var(--bg-card) */
    tooltipBg: "#1e293b"
  };

  if (isLoading) {
    return (
      <div className="card flex flex-col items-center justify-center h-[450px] animate-pulse">
        <div className="w-10 h-10 border-4 border-slate-800 border-t-[var(--accent)] rounded-full animate-spin"></div>
        <p className="mt-4 text-xs text-[var(--text-secondary)] font-bold tracking-widest uppercase">
          Synthesizing Data...
        </p>
      </div>
    );
  }

  if (!data || !data.trend?.length) {
    return (
      <div className="card border-2 border-dashed border-[var(--border-color)] flex items-center justify-center h-[450px]">
        <div className="text-center">
          <div className="text-4xl mb-3 opacity-30">📊</div>
          <p className="text-sm text-[var(--text-secondary)] max-w-xs mx-auto leading-relaxed font-medium">
            No analytics data yet. Complete mock interviews to see your performance trends.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* SCORE TREND CHART */}
      <div className="card p-8 shadow-xl shadow-black/20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">Performance Trend</h2>
            <p className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-widest mt-1">Consistency Analysis</p>
          </div>
          <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-bold text-[var(--accent)] uppercase">
            Live Updates
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.trend} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.accent} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={colors.accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.grid} />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: colors.text, fontSize: 11, fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: colors.text, fontSize: 11 }} 
                domain={[0, 10]} 
              />
              <Tooltip
                cursor={{ stroke: colors.accent, strokeWidth: 1.5 }}
                contentStyle={{
                  backgroundColor: colors.tooltipBg,
                  border: `1px solid ${colors.grid}`,
                  borderRadius: "12px",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
                  padding: "10px"
                }}
                itemStyle={{ color: colors.accent, fontWeight: "700", fontSize: "14px" }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke={colors.accent}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#scoreGradient)"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* WEAK TOPICS CHART */}
      <div className="card p-8 shadow-xl shadow-black/20">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">Weakest Topics</h2>
          <p className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-widest mt-1">Focus Areas for Improvement</p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.topicStats} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.grid} />
              <XAxis 
                dataKey="topic" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: colors.text, fontSize: 11, fontWeight: 600 }}
                dy={10}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: colors.text, fontSize: 11 }} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{
                  backgroundColor: colors.tooltipBg,
                  border: `1px solid ${colors.grid}`,
                  borderRadius: "12px",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
                }}
                itemStyle={{ color: colors.accent }}
              />
              <Bar
                dataKey="mistakes"
                fill={colors.accent}
                radius={[6, 6, 0, 0]}
                barSize={32}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}