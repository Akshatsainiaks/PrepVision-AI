// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// // import { API } from "../../api/api";
// import API from "../../api/api";
// import { FiLoader } from "react-icons/fi";

// export default function RecentAttempts() {
//   const { data, isLoading } = useQuery({
//     queryKey: ["recent-interviews"],
//     queryFn: async () => {
//       const res = await API.get("/interview-history");
//       return res.data.sessions || [];
//     }
//   });

//   if (isLoading) {
//     return (
//       <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
//         <div className="animate-spin text-center">
//           <FiLoader className="text-white text-2xl mx-auto" />
//         </div>
//       </div>
//     );
//   }

//   if (data.length === 0) {
//     return (
//       <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
//         <h2 className="text-xl font-semibold mb-3">Recent Attempts</h2>
//         <p className="text-gray-400 text-sm">
//           No interview attempts yet. Start a mock interview to see results here!
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-lg">
//       <h2 className="text-2xl font-semibold mb-4">Recent Attempts</h2>

//       <div className="space-y-4">
//         {data.map((session, index) => {
//           const avgScore =
//             session.questions?.length > 0
//               ? session.questions.reduce((sum, q) => sum + (q.aiScore || 0), 0) /
//                 session.questions.length
//               : 0;

//           return (
//             <div
//               key={session._id}
//               className="p-4 bg-gray-900/30 rounded-xl border border-white/10"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <div className="text-lg font-bold">
//                     {session.company} – {session.role}
//                   </div>
//                   <div className="text-xs text-gray-400">
//                     {new Date(session.createdAt).toLocaleString()}
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <div className="text-2xl font-extrabold text-purple-400">
//                     {avgScore.toFixed(1)}/10
//                   </div>
//                   <div className="text-xs text-gray-400">Avg Score</div>
//                 </div>
//               </div>

//               <a
//                 href={`/mock?session=${session._id}`}
//                 className="text-blue-400 text-sm underline hover:text-blue-300 mt-2 inline-block"
//               >
//                 View Details →
//               </a>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


//new

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import API from "../../api/api";
// import { FiLoader, FiArrowRight, FiBriefcase, FiCalendar, FiActivity } from "react-icons/fi";
// import { Link } from "react-router-dom";

// export default function RecentAttempts() {
//   const { data = [], isLoading } = useQuery({
//     queryKey: ["recent-interviews"],
//     queryFn: async () => {
//       const res = await API.get("/interview-history");
//       return res.data.sessions || [];
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center py-16 bg-white/[0.02] rounded-3xl border border-white/5">
//         <div className="relative flex items-center justify-center">
//           <div className="absolute w-12 h-12 border-2 border-purple-500/20 rounded-full animate-ping"></div>
//           <FiLoader className="animate-spin text-purple-500 text-2xl relative z-10" />
//         </div>
//         <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
//           Syncing Records
//         </p>
//       </div>
//     );
//   }

//   if (data.length === 0) {
//     return (
//       <div className="p-12 text-center border-2 border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
//         <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 text-gray-600">
//           <FiActivity size={24} />
//         </div>
//         <p className="text-sm text-gray-400 font-medium">No activity detected.</p>
//         <p className="text-xs text-gray-600 mt-2 italic">Start a mock interview to track your performance history.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4 px-1 pb-4">
//       {data.map((session) => {
//         const avgScore =
//           session.questions?.length > 0
//             ? session.questions.reduce((sum, q) => sum + (q.aiScore || 0), 0) /
//               session.questions.length
//             : 0;

//         const getScoreTheme = (score) => {
//           if (score >= 8) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/5";
//           if (score >= 5) return "text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-amber-500/5";
//           return "text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-rose-500/5";
//         };

//         return (
//           <div
//             key={session._id}
//             className="group relative flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/5 hover:border-purple-500/40 hover:bg-white/[0.06] transition-all duration-500 shadow-xl"
//           >
//             {/* Top Shine Effect on Hover */}
//             <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

//             {/* LEFT: INFO */}
//             <div className="flex items-center gap-5">
//               <div className="hidden sm:flex w-12 h-12 rounded-xl bg-gray-950 border border-white/10 items-center justify-center text-gray-500 group-hover:text-purple-400 group-hover:border-purple-500/30 transition-all duration-300">
//                 <FiBriefcase size={20} />
//               </div>
//               <div>
//                 <h3 className="text-base font-bold text-gray-100 tracking-tight group-hover:text-white transition-colors">
//                   {session.company}
//                 </h3>
//                 <div className="flex items-center gap-3 mt-1.5">
//                   <span className="text-xs font-semibold text-gray-500 tracking-wide">{session.role}</span>
//                   <div className="w-1 h-1 rounded-full bg-gray-700"></div>
//                   <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
//                     <FiCalendar size={12} className="text-purple-500/70" />
//                     {new Date(session.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT: SCORE & ACTION */}
//             <div className="flex items-center gap-8">
//               <div className="text-right hidden xs:block">
//                 <div className={`inline-flex items-center px-3 py-1 rounded-lg border text-sm font-black tracking-tight shadow-sm ${getScoreTheme(avgScore)}`}>
//                   {avgScore.toFixed(1)} <span className="opacity-40 text-[10px] ml-1">/ 10</span>
//                 </div>
//                 <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600 mt-2">AI Analysis</p>
//               </div>

//               <Link
//                 to={`/mock?session=${session._id}`}
//                 className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 text-gray-400 group-hover:bg-purple-600 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-all duration-300 transform group-hover:translate-x-1"
//               >
//                 <FiArrowRight size={20} />
//               </Link>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

//new final
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import API from "../../api/api";
// import { FiLoader, FiArrowRight, FiBriefcase, FiCalendar, FiActivity } from "react-icons/fi";
// import { Link } from "react-router-dom";

// export default function RecentAttempts() {
//   const { data = [], isLoading } = useQuery({
//     queryKey: ["recent-interviews"],
//     queryFn: async () => {
//       const res = await API.get("/interview-history");
//       return res.data.sessions || [];
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
//         <div className="relative flex items-center justify-center">
//           <div className="absolute w-12 h-12 border-2 border-indigo-100 rounded-full animate-ping"></div>
//           <FiLoader className="animate-spin text-indigo-600 text-2xl relative z-10" />
//         </div>
//         <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
//           Syncing Records
//         </p>
//       </div>
//     );
//   }

//   if (data.length === 0) {
//     return (
//       <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
//         <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200 text-slate-300 shadow-sm">
//           <FiActivity size={28} />
//         </div>
//         <p className="text-sm text-slate-600 font-bold">No activity detected yet.</p>
//         <p className="text-xs text-slate-400 mt-2">Complete a mock interview to see your history here.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-3">
//       {data.map((session) => {
//         const avgScore =
//           session.questions?.length > 0
//             ? session.questions.reduce((sum, q) => sum + (q.aiScore || 0), 0) /
//               session.questions.length
//             : 0;

//         const getScoreTheme = (score) => {
//           if (score >= 8) return "text-emerald-700 bg-emerald-50 border-emerald-100";
//           if (score >= 5) return "text-amber-700 bg-amber-50 border-amber-100";
//           return "text-rose-700 bg-rose-50 border-rose-100";
//         };

//         return (
//           <div
//             key={session._id}
//             className="group relative flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-50/50 transition-all duration-300"
//           >
//             {/* LEFT: INFO */}
//             <div className="flex items-center gap-4">
//               <div className="hidden sm:flex w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all duration-300">
//                 <FiBriefcase size={20} />
//               </div>
//               <div>
//                 <h3 className="text-base font-bold text-slate-900 tracking-tight">
//                   {session.company}
//                 </h3>
//                 <div className="flex items-center gap-3 mt-1">
//                   <span className="text-xs font-semibold text-slate-500">{session.role}</span>
//                   <div className="w-1 h-1 rounded-full bg-slate-300"></div>
//                   <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold">
//                     <FiCalendar size={12} className="text-indigo-400" />
//                     {new Date(session.createdAt).toLocaleDateString(undefined, { 
//                       month: 'short', 
//                       day: 'numeric', 
//                       year: 'numeric' 
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT: SCORE & ACTION */}
//             <div className="flex items-center gap-6">
//               <div className="text-right hidden xs:block">
//                 <div className={`inline-flex items-center px-3 py-1 rounded-lg border text-sm font-black tracking-tight ${getScoreTheme(avgScore)}`}>
//                   {avgScore.toFixed(1)} <span className="opacity-50 text-[10px] ml-1">/ 10</span>
//                 </div>
//                 <p className="text-[9px] uppercase tracking-widest font-black text-slate-400 mt-1.5 ml-1">AI Score</p>
//               </div>

//               <Link
//                 to={`/mock?session=${session._id}`}
//                 className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 shadow-sm transition-all duration-300"
//               >
//                 <FiArrowRight size={20} />
//               </Link>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

//dark mode
import React from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../../api/api";
import { FiLoader, FiArrowRight, FiBriefcase, FiCalendar, FiActivity } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function RecentAttempts() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["recent-interviews"],
    queryFn: async () => {
      const res = await API.get("/interview-history");
      return res.data.sessions || [];
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 card shadow-sm">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-12 h-12 border-2 border-indigo-500/20 rounded-full animate-ping"></div>
          <FiLoader className="animate-spin text-[var(--accent)] text-2xl relative z-10" />
        </div>
        <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
          Syncing Records
        </p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="p-12 text-center border-2 border-dashed border-[var(--border-color)] rounded-[2rem] bg-[var(--bg-primary)]/30">
        <div className="w-14 h-14 bg-[var(--bg-card)] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[var(--border-color)] text-[var(--text-secondary)] shadow-sm">
          <FiActivity size={28} />
        </div>
        <p className="text-sm text-[var(--text-primary)] font-bold">No activity detected yet.</p>
        <p className="text-xs text-[var(--text-secondary)] mt-2">Complete a mock interview to see your history here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((session) => {
        const avgScore =
          session.questions?.length > 0
            ? session.questions.reduce((sum, q) => sum + (q.aiScore || 0), 0) /
              session.questions.length
            : 0;

        const getScoreTheme = (score) => {
          if (score >= 8) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
          if (score >= 5) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
          return "text-rose-400 bg-rose-500/10 border-rose-500/20";
        };

        return (
          <div
            key={session._id}
            className="group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border"
            style={{ 
                backgroundColor: "var(--bg-card)", 
                borderColor: "var(--border-color)" 
            }}
          >
            {/* Hover Glow Background */}
            <div className="absolute inset-0 rounded-2xl bg-indigo-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* LEFT: INFO */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="hidden sm:flex w-12 h-12 rounded-xl border items-center justify-center transition-all duration-300"
                   style={{ 
                       backgroundColor: "var(--bg-primary)", 
                       borderColor: "var(--border-color)",
                       color: "var(--text-secondary)" 
                   }}>
                <FiBriefcase size={20} className="group-hover:text-[var(--accent)]" />
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {session.company}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-semibold text-[var(--text-secondary)]">{session.role}</span>
                  <div className="w-1 h-1 rounded-full bg-[var(--border-color)]"></div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--text-secondary)]">
                    <FiCalendar size={12} className="text-indigo-400/80" />
                    {new Date(session.createdAt).toLocaleDateString(undefined, { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: SCORE & ACTION */}
            <div className="flex items-center gap-6 relative z-10">
              <div className="text-right hidden xs:block">
                <div className={`inline-flex items-center px-3 py-1 rounded-lg border text-sm font-black tracking-tight ${getScoreTheme(avgScore)}`}>
                  {avgScore.toFixed(1)} <span className="opacity-40 text-[10px] ml-1">/ 10</span>
                </div>
                <p className="text-[9px] uppercase tracking-widest font-black text-[var(--text-secondary)] mt-1.5 ml-1">AI Score</p>
              </div>

              <Link
                to={`/mock?session=${session._id}`}
                className="flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300"
                style={{ 
                    backgroundColor: "var(--bg-primary)", 
                    borderColor: "var(--border-color)",
                    color: "var(--text-secondary)" 
                }}
              >
                <FiArrowRight size={20} className="group-hover:text-[var(--text-primary)]" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}