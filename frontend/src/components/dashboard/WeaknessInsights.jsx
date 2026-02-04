// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// // import { API } from "../../api/api";
// import API from "../../api/api";
// import { FiTrendingDown } from "react-icons/fi";
// import { MdLightbulbOutline } from "react-icons/md";

// export default function WeaknessInsights() {

//   const { data, isLoading } = useQuery({
//     queryKey: ["weakness-insights"],
//     queryFn: async () => {
//       const res = await API.get("/weakness-insights");
//       return res.data;
//     }
//   });

//   if (isLoading) {
//     return (
//       <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
//         <p className="text-gray-400">Loading insights...</p>
//       </div>
//     );
//   }

//   const weaknesses = data.weaknesses || [];
//   const recommendations = data.recommendations || [];

//   return (
//     <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-xl">
//       <h2 className="text-2xl font-semibold mb-4">Weakness Insights</h2>

//       {/* WEAK AREAS */}
//       {weaknesses.length === 0 ? (
//         <p className="text-gray-400 text-sm mb-4">
//           You have no significant weak areas yet. Keep practicing!
//         </p>
//       ) : (
//         <div className="space-y-3 mb-6">
//           {weaknesses.map((w, idx) => (
//             <div
//               key={idx}
//               className="bg-gray-900/30 p-4 rounded-xl border border-white/10 flex items-center gap-3"
//             >
//               <FiTrendingDown className="text-red-400 text-2xl" />
//               <div>
//                 <div className="font-bold text-lg">{w.topic}</div>
//                 <div className="text-gray-400 text-sm">
//                   Weakness Score: {(w.weaknessScore * 100).toFixed(0)}%
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* RECOMMENDATIONS */}
//       <div>
//         <h3 className="text-lg font-semibold mb-3">Recommendations</h3>

//         <ul className="space-y-2">
//           {recommendations.map((rec, idx) => (
//             <li
//               key={idx}
//               className="flex items-center gap-2 text-gray-300 bg-gray-900/20 p-3 rounded-lg border border-white/10"
//             >
//               <MdLightbulbOutline className="text-yellow-400 text-xl" />
//               {rec}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }


//new 

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import API from "../../api/api";
// import { FiTrendingDown, FiAlertCircle, FiZap } from "react-icons/fi";
// import { MdLightbulbOutline } from "react-icons/md";

// export default function WeaknessInsights() {
//   const { data, isLoading } = useQuery({
//     queryKey: ["weakness-insights"],
//     queryFn: async () => {
//       const res = await API.get("/weakness-insights");
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="card flex flex-col items-center justify-center h-[320px] animate-pulse">
//         <div className="w-10 h-10 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin mb-4"></div>
//         <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Processing Insights...</p>
//       </div>
//     );
//   }

//   const weaknesses = data?.weaknesses || [];
//   const recommendations = data?.recommendations || [];

//   return (
//     <div className="card h-full flex flex-col">
//       {/* HEADER */}
//       <div className="mb-8">
//         <div className="flex items-center gap-2">
//            <FiAlertCircle className="text-rose-400" />
//            <h2 className="text-lg font-bold text-white tracking-tight">Growth Areas</h2>
//         </div>
//         <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">Focus targets for your next session</p>
//       </div>

//       <div className="flex-1 space-y-8">
//         {/* WEAK AREAS */}
//         <div className="space-y-4">
//           {weaknesses.length === 0 ? (
//             <div className="p-6 border border-dashed border-white/5 rounded-2xl text-center">
//               <p className="text-sm text-gray-500 italic">No significant weak areas detected. You're performing consistently!</p>
//             </div>
//           ) : (
//             weaknesses.map((w, idx) => (
//               <div key={idx} className="group">
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all">
//                       <FiTrendingDown />
//                     </div>
//                     <p className="text-sm font-bold text-gray-200">{w.topic}</p>
//                   </div>
//                   <span className="text-[10px] font-black text-rose-400 uppercase tracking-tighter">
//                     Severity: {(w.weaknessScore * 100).toFixed(0)}%
//                   </span>
//                 </div>
                
//                 {/* Visual Severity Bar */}
//                 <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
//                    <div 
//                     className="h-full bg-rose-500 shadow-[0_0_8px_#f43f5e] transition-all duration-1000" 
//                     style={{ width: `${w.weaknessScore * 100}%` }}
//                    />
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* RECOMMENDATIONS */}
//         {recommendations.length > 0 && (
//           <div className="pt-6 border-t border-white/5">
//             <div className="flex items-center gap-2 mb-4">
//               <FiZap className="text-blue-400" />
//               <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Actionable Advice</p>
//             </div>

//             <ul className="space-y-3">
//               {recommendations.map((rec, idx) => (
//                 <li
//                   key={idx}
//                   className="flex items-start gap-4 p-4 rounded-2xl bg-blue-500/[0.03] border border-blue-500/10 hover:border-blue-500/30 transition-all group"
//                 >
//                   <div className="mt-0.5">
//                     <MdLightbulbOutline className="text-blue-400 text-lg group-hover:scale-110 transition-transform" />
//                   </div>
//                   <span className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
//                     {rec}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* FOOTER HINT */}
//       <div className="mt-8 text-center">
//          <p className="text-[10px] text-gray-600 font-medium">AI analysis based on your last 5 sessions</p>
//       </div>
//     </div>
//   );
// }

//new final

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import API from "../../api/api";
// import { FiTrendingDown, FiAlertCircle, FiZap, FiLoader } from "react-icons/fi";
// import { MdLightbulbOutline } from "react-icons/md";

// export default function WeaknessInsights() {
//   const { data, isLoading } = useQuery({
//     queryKey: ["weakness-insights"],
//     queryFn: async () => {
//       const res = await API.get("/weakness-insights");
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="bg-white border border-slate-200 rounded-3xl flex flex-col items-center justify-center h-[320px] shadow-sm animate-pulse">
//         <FiLoader className="w-8 h-8 text-rose-500 animate-spin mb-4" />
//         <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Processing Insights...</p>
//       </div>
//     );
//   }

//   const weaknesses = data?.weaknesses || [];
//   const recommendations = data?.recommendations || [];

//   return (
//     <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm h-full flex flex-col transition-all duration-300">
//       {/* HEADER */}
//       <div className="mb-8">
//         <div className="flex items-center gap-2.5">
//            <div className="p-2 bg-rose-50 rounded-lg">
//               <FiAlertCircle className="text-rose-500 text-lg" />
//            </div>
//            <div>
//               <h2 className="text-xl font-bold text-slate-900 tracking-tight">Growth Areas</h2>
//               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Focus targets for improvement</p>
//            </div>
//         </div>
//       </div>

//       <div className="flex-1 space-y-8">
//         {/* WEAK AREAS */}
//         <div className="space-y-5">
//           {weaknesses.length === 0 ? (
//             <div className="p-8 border-2 border-dashed border-slate-100 rounded-2xl text-center bg-slate-50/50">
//               <p className="text-sm text-slate-500 font-medium italic">No significant weak areas detected. You're performing consistently!</p>
//             </div>
//           ) : (
//             weaknesses.map((w, idx) => (
//               <div key={idx} className="group">
//                 <div className="flex items-center justify-between mb-2.5">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-all duration-300">
//                       <FiTrendingDown />
//                     </div>
//                     <p className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{w.topic}</p>
//                   </div>
//                   <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter border ${
//                     w.weaknessScore > 0.7 ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'
//                   }`}>
//                     Severity: {(w.weaknessScore * 100).toFixed(0)}%
//                   </span>
//                 </div>
                
//                 {/* Refined Severity Bar */}
//                 <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
//                    <div 
//                     className={`h-full transition-all duration-1000 ease-out shadow-sm ${
//                       w.weaknessScore > 0.7 ? 'bg-rose-500' : 'bg-amber-500'
//                     }`} 
//                     style={{ width: `${w.weaknessScore * 100}%` }}
//                    />
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* ACTIONABLE RECOMMENDATIONS */}
//         {recommendations.length > 0 && (
//           <div className="pt-8 border-t border-slate-100">
//             <div className="flex items-center gap-2 mb-5">
//               <div className="p-1.5 bg-indigo-50 rounded-md">
//                 <FiZap className="text-indigo-600" />
//               </div>
//               <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Actionable Advice</p>
//             </div>

//             <ul className="space-y-3">
//               {recommendations.map((rec, idx) => (
//                 <li
//                   key={idx}
//                   className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-300 group shadow-sm"
//                 >
//                   <div className="mt-0.5 shrink-0">
//                     <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:border-indigo-100">
//                       <MdLightbulbOutline className="text-indigo-600 text-lg transition-transform group-hover:scale-110" />
//                     </div>
//                   </div>
//                   <span className="text-sm text-slate-600 leading-relaxed font-medium transition-colors group-hover:text-slate-900">
//                     {rec}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* FOOTER HINT */}
//       <div className="mt-8 pt-4 border-t border-slate-50 text-center">
//          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
//            AI analysis based on your last 5 sessions
//          </p>
//       </div>
//     </div>
//   );
// }

//dark mode
import React from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../../api/api";
import { FiTrendingDown, FiAlertCircle, FiZap, FiLoader } from "react-icons/fi";
import { MdLightbulbOutline } from "react-icons/md";

export default function WeaknessInsights() {
  const { data, isLoading } = useQuery({
    queryKey: ["weakness-insights"],
    queryFn: async () => {
      const res = await API.get("/weakness-insights");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="card flex flex-col items-center justify-center h-[320px] animate-pulse">
        <FiLoader className="w-8 h-8 text-rose-500 animate-spin mb-4" />
        <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Processing Insights...</p>
      </div>
    );
  }

  const weaknesses = data?.weaknesses || [];
  const recommendations = data?.recommendations || [];

  return (
    <div className="card p-8 h-full flex flex-col transition-all duration-300 shadow-xl shadow-black/20">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5">
           <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20">
              <FiAlertCircle className="text-rose-500 text-lg" />
           </div>
           <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">Growth Areas</h2>
              <p className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-widest mt-0.5">Focus targets for improvement</p>
           </div>
        </div>
      </div>

      <div className="flex-1 space-y-8">
        {/* WEAK AREAS */}
        <div className="space-y-5">
          {weaknesses.length === 0 ? (
            <div className="p-8 border-2 border-dashed border-[var(--border-color)] rounded-2xl text-center bg-[var(--bg-primary)]/30">
              <p className="text-sm text-[var(--text-secondary)] font-medium italic">No significant weak areas detected. You're performing consistently!</p>
            </div>
          ) : (
            weaknesses.map((w, idx) => (
              <div key={idx} className="group">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600 transition-all duration-300">
                      <FiTrendingDown />
                    </div>
                    <p className="text-sm font-bold text-[var(--text-primary)] transition-colors">{w.topic}</p>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter border ${
                    w.weaknessScore > 0.7 
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    Severity: {(w.weaknessScore * 100).toFixed(0)}%
                  </span>
                </div>
                
                {/* Refined Severity Bar */}
                <div className="w-full h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden border border-[var(--border-color)]">
                   <div 
                    className={`h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(225,29,72,0.2)] ${
                      w.weaknessScore > 0.7 ? 'bg-rose-600' : 'bg-amber-500'
                    }`} 
                    style={{ width: `${w.weaknessScore * 100}%` }}
                   />
                </div>
              </div>
            ))
          )}
        </div>

        {/* ACTIONABLE RECOMMENDATIONS */}
        {recommendations.length > 0 && (
          <div className="pt-8 border-t border-[var(--border-color)]">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-1.5 bg-indigo-500/10 rounded-md border border-indigo-500/20">
                <FiZap className="text-[var(--accent)]" />
              </div>
              <p className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-widest">Actionable Advice</p>
            </div>

            <ul className="space-y-3">
              {recommendations.map((rec, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all duration-300 group shadow-sm"
                >
                  <div className="mt-0.5 shrink-0">
                    <div className="p-2 bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] group-hover:border-[var(--accent)]/40">
                      <MdLightbulbOutline className="text-[var(--accent)] text-lg transition-transform group-hover:scale-110" />
                    </div>
                  </div>
                  <span className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium transition-colors group-hover:text-[var(--text-primary)]">
                    {rec}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* FOOTER HINT */}
      <div className="mt-8 pt-4 border-t border-[var(--border-color)] text-center">
         <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">
           AI analysis based on your last 5 sessions
         </p>
      </div>
    </div>
  );
}