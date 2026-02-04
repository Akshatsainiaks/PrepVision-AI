// import React from "react";

// export default function CreditProgressBar({ credits = 0, max = 100 }) {
//   // Auto-scale max credits dynamically
//   const computedMax = Math.max(max, credits);
  
//   const percent = Math.min(Math.round((credits / computedMax) * 100), 100);

//   let color = "from-green-400 to-green-600";
//   if (credits < 30) color = "from-red-400 to-red-600";
//   else if (credits < 60) color = "from-yellow-400 to-yellow-600";

//   return (
//     <div className="mt-3">
//       {/* Display amount */}
//       <div className="flex justify-between mb-1 text-sm">
//         <span className="text-gray-300">{credits} Credits</span>
//         <span className="text-gray-500">{percent}%</span>
//       </div>

//       {/* Progress Bar */}
//       <div className="w-full h-3 bg-gray-800/40 rounded-full overflow-hidden">
//         <div
//           className={`h-full bg-gradient-to-r ${color} transition-all duration-700`}
//           style={{ width: `${percent}%` }}
//         ></div>
//       </div>

//       <p className="text-gray-400 text-xs mt-2">
//         Earn more credits by practicing interviews, contributing questions, and staying active.
//       </p>
//     </div>
//   );
// }


//new 
// import React from "react";

// export default function CreditProgressBar({ credits = 0, max = 100 }) {
//   // Auto-scale max credits dynamically
//   const computedMax = Math.max(max, credits);
//   const percent = Math.min(
//     Math.round((credits / computedMax) * 100),
//     100
//   );

//   // Determine color based on credit health
//   const getStatusColor = () => {
//     if (percent < 20) return "from-red-500 to-orange-500 shadow-red-500/40";
//     if (percent < 50) return "from-orange-400 to-yellow-400 shadow-orange-400/30";
//     return "from-purple-500 to-blue-500 shadow-purple-500/40";
//   };

//   return (
//     <div className="space-y-4">
//       {/* LABEL & PERCENTAGE */}
//       <div className="flex items-end justify-between">
//         <div className="space-y-1">
//           <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
//             Resource Usage
//           </p>
//           <div className="flex items-baseline gap-1">
//             <span className="text-2xl font-black text-white">{credits}</span>
//             <span className="text-xs font-bold text-gray-500">/ {computedMax}</span>
//           </div>
//         </div>
//         <div className="text-right">
//           <span className={`text-sm font-black ${percent < 20 ? 'text-red-400' : 'text-purple-400'}`}>
//             {percent}%
//           </span>
//         </div>
//       </div>

//       {/* REFINED BAR */}
//       <div className="relative">
//         {/* Track */}
//         <div className="w-full h-3 rounded-full bg-white/5 border border-white/5 p-[2px] overflow-hidden">
//           {/* Progress Fill */}
//           <div
//             className={`
//               h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out shadow-[0_0_12px]
//               ${getStatusColor()}
//             `}
//             style={{ width: `${percent}%` }}
//           >
//             {/* Animated Shine Effect */}
//             <div className="w-full h-full relative overflow-hidden">
//                 <div className="absolute inset-0 bg-white/20 skew-x-[-20deg] animate-[shimmer_2s_infinite] w-1/2" />
//             </div>
//           </div>
//         </div>
        
//         {/* Segment Markers (Adds a technical look) */}
//         <div className="absolute inset-0 flex justify-between px-2 pointer-events-none">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="w-px h-full bg-black/20"></div>
//           ))}
//         </div>
//       </div>

//       {/* REFINED FOOTER */}
//       <div className="flex items-start gap-2 bg-purple-500/5 border border-purple-500/10 p-3 rounded-xl">
//         <div className="mt-1">
//            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
//         </div>
//         <p className="text-[11px] text-gray-400 leading-snug">
//           Practice interviews to <span className="text-gray-200 font-semibold">recharge</span> your credits.
//         </p>
//       </div>
//     </div>
//   );
// }

//new final
// import React from "react";

// export default function CreditProgressBar({ credits = 0, max = 100 }) {
//   // Auto-scale max credits dynamically
//   const computedMax = Math.max(max, credits);
//   const percent = Math.min(
//     Math.round((credits / computedMax) * 100),
//     100
//   );

//   // Determine color based on credit health (Updated for light mode visibility)
//   const getStatusColor = () => {
//     if (percent < 20) return "from-red-500 to-rose-500 shadow-red-100";
//     if (percent < 50) return "from-amber-400 to-orange-400 shadow-orange-100";
//     return "from-indigo-500 to-blue-500 shadow-indigo-100";
//   };

//   return (
//     <div className="space-y-4">
//       {/* LABEL & PERCENTAGE */}
//       <div className="flex items-end justify-between">
//         <div className="space-y-1">
//           <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
//             Resource Usage
//           </p>
//           <div className="flex items-baseline gap-1">
//             <span className="text-2xl font-black text-slate-900">{credits}</span>
//             <span className="text-xs font-bold text-slate-400">/ {computedMax}</span>
//           </div>
//         </div>
//         <div className="text-right">
//           <span className={`text-sm font-black ${percent < 20 ? 'text-red-500' : 'text-indigo-600'}`}>
//             {percent}%
//           </span>
//         </div>
//       </div>

//       {/* REFINED BAR */}
//       <div className="relative">
//         {/* Track - Now a light slate instead of transparent black */}
//         <div className="w-full h-3.5 rounded-full bg-slate-100 border border-slate-200 p-[2px] overflow-hidden shadow-inner">
//           {/* Progress Fill */}
//           <div
//             className={`
//               h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out shadow-lg
//               ${getStatusColor()}
//             `}
//             style={{ width: `${percent}%` }}
//           >
//             {/* Animated Shine Effect */}
//             <div className="w-full h-full relative overflow-hidden">
//                 <div className="absolute inset-0 bg-white/30 skew-x-[-20deg] animate-[shimmer_2s_infinite] w-1/2" />
//             </div>
//           </div>
//         </div>
        
//         {/* Segment Markers - Softened for light theme */}
//         <div className="absolute inset-0 flex justify-between px-2 pointer-events-none">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="w-px h-full bg-white/30"></div>
//           ))}
//         </div>
//       </div>

//       {/* REFINED FOOTER - Now using Indigo/Slate tint */}
//       <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-100 p-3 rounded-xl">
//         <div className="mt-1">
//            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
//         </div>
//         <p className="text-[11px] text-slate-600 leading-snug">
//           Practice interviews to <span className="text-indigo-700 font-bold uppercase tracking-tight">recharge</span> your credits.
//         </p>
//       </div>
//     </div>
//   );
// }


//dark mode
import React from "react";

export default function CreditProgressBar({ credits = 0, max = 100 }) {
  // Auto-scale max credits dynamically
  const computedMax = Math.max(max, credits);
  const percent = Math.min(
    Math.round((credits / computedMax) * 100),
    100
  );

  // Determine color based on credit health (Updated for Dark Mode Glow)
  const getStatusColor = () => {
    if (percent < 20) return "from-rose-500 to-red-600 shadow-rose-900/40";
    if (percent < 50) return "from-amber-400 to-orange-500 shadow-orange-900/40";
    return "from-indigo-400 to-blue-500 shadow-indigo-900/40";
  };

  return (
    <div className="space-y-4">
      {/* LABEL & PERCENTAGE */}
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
            Resource Usage
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[var(--text-primary)]">{credits}</span>
            <span className="text-xs font-bold text-[var(--text-secondary)]">/ {computedMax}</span>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-sm font-black ${percent < 20 ? 'text-rose-500' : 'text-[var(--accent)]'}`}>
            {percent}%
          </span>
        </div>
      </div>

      {/* REFINED BAR */}
      <div className="relative">
        {/* Track - Deep Slate with subtle inset shadow */}
        <div className="w-full h-3.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] p-[2px] overflow-hidden">
          {/* Progress Fill */}
          <div
            className={`
              h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out shadow-lg
              ${getStatusColor()}
            `}
            style={{ width: `${percent}%` }}
          >
            {/* Animated Shine Effect */}
            <div className="w-full h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 skew-x-[-20deg] animate-[shimmer_2s_infinite] w-1/2" />
            </div>
          </div>
        </div>
        
        {/* Segment Markers - Darkened for high-end look */}
        <div className="absolute inset-0 flex justify-between px-2 pointer-events-none opacity-20">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-px h-full bg-black"></div>
          ))}
        </div>
      </div>

      {/* REFINED FOOTER - Indigo tint on dark bg */}
      <div className="flex items-start gap-3 bg-indigo-500/5 border border-indigo-500/10 p-3 rounded-xl">
        <div className="mt-1">
           <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
        </div>
        <p className="text-[11px] text-[var(--text-secondary)] leading-snug">
          Practice interviews to <span className="text-[var(--accent)] font-bold uppercase tracking-tight">recharge</span> your credits.
        </p>
      </div>
    </div>
  );
}