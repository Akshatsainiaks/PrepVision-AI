// // src/components/dashboard/LearningRoadmap.jsx
// import React from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // import { API } from "../../api/api";
// import API from "../../api/api";
// import { FiCheckCircle } from "react-icons/fi";

// export default function LearningRoadmap() {
//   const qc = useQueryClient();

//   const { data, isLoading } = useQuery({
//     queryKey: ["learning-roadmap"],
//     queryFn: async () => {
//       const res = await API.get("/learning-roadmap");
//       return res.data.roadmap || [];
//     },
//     staleTime: 60_000
//   });

//   const completeMut = useMutation({
//     mutationFn: async (milestoneId) => {
//       const res = await API.post("/learning-roadmap/complete", { milestoneId });
//       return res.data;
//     },
//     onSuccess: () => qc.invalidateQueries(["learning-roadmap"])
//   });

//   if (isLoading) {
//     return (
//       <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
//         <p className="text-gray-400">Loading roadmap...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 shadow-xl">
//       <h2 className="text-2xl font-semibold mb-4">Personalized Learning Roadmap</h2>

//       {data.length === 0 ? (
//         <p className="text-gray-400">No roadmap available yet — do a mock interview to generate suggestions.</p>
//       ) : (
//         <div className="space-y-4">
//           {data.map((m) => (
//             <div key={m.id} className="p-4 rounded-lg bg-gray-900/30 border border-white/10 flex items-start justify-between">
//               <div>
//                 <div className="flex items-center gap-3">
//                   <div className="text-sm text-gray-300 font-semibold">{m.title}</div>
//                   <div className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">{m.recommended}</div>
//                 </div>

//                 <div className="text-sm text-gray-400 mt-2">{m.description}</div>

//                 <div className="text-xs text-gray-500 mt-2">Priority: {m.priority}</div>
//               </div>

//               <div className="flex flex-col items-end gap-2">
//                 {m.completed ? (
//                   <div className="flex items-center gap-2 text-green-400 font-semibold">
//                     <FiCheckCircle /> Completed
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => completeMut.mutate(m.id)}
//                     className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold"
//                     disabled={completeMut.isLoading}
//                   >
//                     Mark Complete
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

//new

// import React from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import API from "../../api/api";
// import { FiCheckCircle, FiCircle, FiLoader } from "react-icons/fi";

// export default function LearningRoadmap() {
//   const qc = useQueryClient();

//   const { data, isLoading } = useQuery({
//     queryKey: ["learning-roadmap"],
//     queryFn: async () => {
//       const res = await API.get("/learning-roadmap");
//       return res.data.roadmap || [];
//     },
//     staleTime: 60_000,
//   });

//   const completeMut = useMutation({
//     mutationFn: async (milestoneId) => {
//       const res = await API.post("/learning-roadmap/complete", { milestoneId });
//       return res.data;
//     },
//     onSuccess: () => qc.invalidateQueries(["learning-roadmap"]),
//   });

//   if (isLoading) {
//     return (
//       <div className="card flex flex-col items-center justify-center h-[350px]">
//         <FiLoader className="w-8 h-8 text-purple-500 animate-spin mb-4" />
//         <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Generating Path...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="card h-full">
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h2 className="text-lg font-bold text-white tracking-tight">Learning Roadmap</h2>
//           <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">AI-Curated Growth Path</p>
//         </div>
//         <div className="h-2 w-24 bg-gray-800 rounded-full overflow-hidden">
//           <div 
//             className="h-full bg-green-500 transition-all duration-1000" 
//             style={{ width: `${(data.filter(m => m.completed).length / data.length) * 100}%` }}
//           />
//         </div>
//       </div>

//       {data.length === 0 ? (
//         <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-2xl">
//           <p className="text-sm text-gray-500 max-w-[200px] mx-auto">
//             Complete a mock interview to generate your personalized learning suggestions.
//           </p>
//         </div>
//       ) : (
//         <div className="relative space-y-6">
//           {/* Vertical Timeline Line */}
//           <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-purple-500/50 via-gray-800 to-transparent" />

//           {data.map((m) => (
//             <div
//               key={m.id}
//               className={`relative flex items-start gap-6 transition-all duration-300 ${
//                 m.completed ? "opacity-50 grayscale-[0.5]" : "opacity-100"
//               }`}
//             >
//               {/* Timeline Icon */}
//               <div className="relative z-10 mt-1">
//                 {m.completed ? (
//                   <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center text-green-400">
//                     <FiCheckCircle size={20} />
//                   </div>
//                 ) : (
//                   <div className="w-10 h-10 rounded-full bg-gray-900 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
//                     <FiCircle size={20} />
//                   </div>
//                 )}
//               </div>

//               {/* Content Card */}
//               <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
//                 <div className="flex items-center justify-between gap-4 mb-2">
//                   <div className="flex items-center gap-3">
//                     <h3 className="font-bold text-gray-100 group-hover:text-white transition-colors">
//                       {m.title}
//                     </h3>
//                     <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${
//                       m.priority === "High" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
//                     }`}>
//                       {m.priority}
//                     </span>
//                   </div>
                  
//                   {/* Action Button */}
//                   {!m.completed && (
//                     <button
//                       onClick={() => completeMut.mutate(m.id)}
//                       disabled={completeMut.isLoading}
//                       className="shrink-0 p-2 rounded-lg bg-purple-600/10 text-purple-400 hover:bg-purple-600 hover:text-white transition-all disabled:opacity-50"
//                       title="Mark as complete"
//                     >
//                       {completeMut.variables === m.id ? (
//                         <FiLoader className="animate-spin" />
//                       ) : (
//                         <FiCheckCircle size={18} />
//                       )}
//                     </button>
//                   )}
//                 </div>

//                 <p className="text-sm text-gray-400 leading-relaxed mb-3">
//                   {m.description}
//                 </p>

//                 <div className="flex items-center gap-4">
//                   <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1 italic">
//                     <span className="text-purple-500">#</span> {m.recommended}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


//new final
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../api/api";
import { FiCheckCircle, FiCircle, FiLoader } from "react-icons/fi";

export default function LearningRoadmap() {
  const qc = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["learning-roadmap"],
    queryFn: async () => {
      const res = await API.get("/learning-roadmap");
      return res.data.roadmap || [];
    },
    staleTime: 60_000,
  });

  const completeMut = useMutation({
    mutationFn: async (milestoneId) => {
      const res = await API.post("/learning-roadmap/complete", { milestoneId });
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries(["learning-roadmap"]),
  });

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl flex flex-col items-center justify-center h-[350px]">
        <FiLoader className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Generating Path...</p>
      </div>
    );
  }

  const completionRate = data.length > 0 
    ? (data.filter(m => m.completed).length / data.length) * 100 
    : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm h-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Learning Roadmap</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">AI-Curated Growth Path</p>
        </div>
        
        {/* Progress Display */}
        <div className="flex items-center gap-3 bg-slate-50 px-3 py-2 rounded-2xl border border-slate-100">
          <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-1000 ease-out" 
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <span className="text-xs font-black text-slate-600">{Math.round(completionRate)}%</span>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-3xl">
          <p className="text-sm text-slate-400 max-w-[200px] mx-auto font-medium">
            Complete a mock interview to generate your personalized learning path.
          </p>
        </div>
      ) : (
        <div className="relative space-y-8">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-100" />

          {data.map((m) => (
            <div
              key={m.id}
              className={`relative flex items-start gap-6 transition-all duration-300 ${
                m.completed ? "opacity-60" : "opacity-100"
              }`}
            >
              {/* Timeline Indicator */}
              <div className="relative z-10 mt-1">
                {m.completed ? (
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                    <FiCheckCircle size={20} />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center text-indigo-600 shadow-md shadow-indigo-50">
                    <FiCircle size={20} />
                  </div>
                )}
              </div>

              {/* Milestone Content */}
              <div className={`flex-1 p-5 rounded-2xl transition-all duration-200 group border ${
                m.completed 
                ? "bg-slate-50 border-slate-100" 
                : "bg-white border-slate-200 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50/50"
              }`}>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className={`font-bold transition-colors ${m.completed ? "text-slate-500 line-through" : "text-slate-800"}`}>
                        {m.title}
                      </h3>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter border ${
                        m.priority === "High" 
                        ? "bg-rose-50 text-rose-600 border-rose-100" 
                        : "bg-sky-50 text-sky-600 border-sky-100"
                      }`}>
                        {m.priority}
                      </span>
                    </div>
                  </div>
                  
                  {/* Mark as Complete Action */}
                  {!m.completed && (
                    <button
                      onClick={() => completeMut.mutate(m.id)}
                      disabled={completeMut.isLoading}
                      className="shrink-0 p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 disabled:opacity-50 shadow-sm"
                      title="Mark as complete"
                    >
                      {completeMut.isLoading && completeMut.variables === m.id ? (
                        <FiLoader className="animate-spin" />
                      ) : (
                        <FiCheckCircle size={18} />
                      )}
                    </button>
                  )}
                </div>

                <p className={`text-sm leading-relaxed mb-4 ${m.completed ? "text-slate-400" : "text-slate-500"}`}>
                  {m.description}
                </p>

                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-slate-100 rounded-lg">
                    <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                      <span className="text-indigo-500">#</span> {m.recommended}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}