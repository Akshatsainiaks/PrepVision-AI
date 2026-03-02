// import React from "react";

// export default function StreakCard({ streak }) {
//   const fireColor =
//     streak >= 10 ? "text-orange-500" : streak >= 5 ? "text-yellow-400" : "text-red-500";

//   return (
//     <div className="backdrop-blur-xl bg-white/10 border border-white/20 
//       rounded-2xl p-6 shadow-[0_0_25px_rgba(255,150,50,0.25)]
//       hover:shadow-orange-500/30 transition-all">

//       <div className="flex items-center gap-3">
//         <span className={`text-5xl ${fireColor}`}>🔥</span>

//         <div>
//           <h3 className="text-sm text-gray-300 font-medium">Daily Streak</h3>
//           <p className="text-4xl font-extrabold mt-1">{streak} days</p>
//         </div>
//       </div>

//       <p className="text-gray-400 text-xs mt-3">
//         Keep practicing daily to maintain your streak and earn more credits!
//       </p>
//     </div>
//   );
// }


//new
// import React from "react";
// import { FiTrendingUp, FiCalendar } from "react-icons/fi";

// export default function StreakCard({ streak = 0 }) {
//   // Mock logic for the weekly visualizer (can be linked to real data later)
//   const days = ["S", "M", "T", "W", "T", "F", "S"];
//   const currentDay = new Date().getDay();

//   return (
//     <div className="card relative overflow-hidden group">
//       {/* Background Decorative Element */}
//       <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 blur-[50px] rounded-full group-hover:bg-orange-500/20 transition-colors duration-500" />

//       <div className="flex items-start justify-between">
//         <div className="flex items-center gap-5">
//           {/* THE FLAME ICON */}
//           <div className="relative">
//             <div className="absolute inset-0 bg-orange-500 blur-xl opacity-20 animate-pulse"></div>
//             <div className="
//               relative w-14 h-14 rounded-2xl
//               flex items-center justify-center
//               bg-gradient-to-br from-orange-500/20 to-red-500/20
//               border border-orange-500/30 text-2xl
//               shadow-[inset_0_0_15px_rgba(249,115,22,0.2)]
//             ">
//               🔥
//             </div>
//           </div>

//           {/* TEXT CONTENT */}
//           <div>
//             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
//               Activity Streak
//             </p>
//             <div className="flex items-baseline gap-2">
//               <p className="text-4xl font-black text-white tracking-tighter">
//                 {streak}
//               </p>
//               <p className="text-sm font-bold text-orange-500 uppercase italic">Days</p>
//             </div>
//           </div>
//         </div>

//         {/* RECOVERY STATUS */}
//         <div className="text-right hidden sm:block">
//            <div className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-md border border-green-400/20">
//               <FiTrendingUp />
//               ACTIVE
//            </div>
//         </div>
//       </div>

//       {/* WEEKLY VISUALIZER */}
//       <div className="mt-8">
//         <div className="flex justify-between items-center px-1">
//           {days.map((day, idx) => {
//             const isToday = idx === currentDay;
//             const isCompleted = idx < currentDay; // Simplified logic for UI demo

//             return (
//               <div key={idx} className="flex flex-col items-center gap-2">
//                 <div className={`
//                   w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all
//                   ${isToday ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] scale-110' : 
//                     isCompleted ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 
//                     'bg-white/5 text-gray-600 border border-white/5'}
//                 `}>
//                   {day}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* MOTIVATIONAL FOOTER */}
//       <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
//         <p className="text-[11px] text-gray-400 font-medium italic">
//           “Consistency is the secret of masters.”
//         </p>
//         <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
//           <FiCalendar className="text-orange-500" />
//           Next Goal: {streak + (7 - (streak % 7))} Days
//         </div>
//       </div>
//     </div>
//   );
// }


//new final
// import React from "react";
// import { FiTrendingUp, FiCalendar } from "react-icons/fi";

// export default function StreakCard({ streak = 0 }) {
//   const days = ["S", "M", "T", "W", "T", "F", "S"];
//   const currentDay = new Date().getDay();

//   return (
//     <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative overflow-hidden group h-full">
//       {/* Background Decorative Element - Softened for light mode */}
//       <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-50 blur-[50px] rounded-full group-hover:bg-orange-100 transition-colors duration-500" />

//       <div className="flex items-start justify-between relative z-10">
//         <div className="flex items-center gap-5">
//           {/* THE FLAME ICON */}
//           <div className="relative">
//             {/* Soft Glow behind the icon */}
//             <div className="absolute inset-0 bg-orange-200 blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
//             <div className="
//               relative w-14 h-14 rounded-2xl
//               flex items-center justify-center
//               bg-orange-50 border border-orange-100 
//               text-2xl shadow-sm
//             ">
//               🔥
//             </div>
//           </div>

//           {/* TEXT CONTENT */}
//           <div>
//             <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
//               Activity Streak
//             </p>
//             <div className="flex items-baseline gap-2">
//               <p className="text-5xl font-black text-slate-900 tracking-tighter">
//                 {streak}
//               </p>
//               <p className="text-sm font-black text-orange-600 uppercase">Days</p>
//             </div>
//           </div>
//         </div>

//         {/* STATUS BADGE */}
//         <div className="hidden sm:block">
//            <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
//               <FiTrendingUp className="text-sm" />
//               ACTIVE
//            </div>
//         </div>
//       </div>

//       {/* WEEKLY VISUALIZER */}
//       <div className="mt-10 relative z-10">
//         <div className="flex justify-between items-center">
//           {days.map((day, idx) => {
//             const isToday = idx === currentDay;
//             const isCompleted = idx < currentDay;

//             return (
//               <div key={idx} className="flex flex-col items-center gap-2">
//                 <div className={`
//                   w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold transition-all duration-300
//                   ${isToday ? 
//                     'bg-orange-600 text-white shadow-lg shadow-orange-200 scale-110 ring-4 ring-orange-50' : 
//                     isCompleted ? 
//                     'bg-orange-50 text-orange-600 border border-orange-100' : 
//                     'bg-slate-50 text-slate-400 border border-slate-100'}
//                 `}>
//                   {day}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* MOTIVATIONAL FOOTER */}
//       <div className="mt-10 pt-5 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
//         <p className="text-[12px] text-slate-500 font-medium italic">
//           “Consistency is the secret of masters.”
//         </p>
//         <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-tight bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
//           <FiCalendar className="text-orange-500" />
//           <span>Next Goal: <span className="text-slate-700">{streak + (7 - (streak % 7))} Days</span></span>
//         </div>
//       </div>
//     </div>
//   );
// }


//dark mode
// import React from "react";
// import { FiTrendingUp, FiCalendar } from "react-icons/fi";

// export default function StreakCard({ streak = 0 }) {
//   const days = ["S", "M", "T", "W", "T", "F", "S"];
//   const currentDay = new Date().getDay();

//   return (
//     <div className="card p-8 relative overflow-hidden group h-full transition-all duration-300">
//       {/* Background Glow - Now an amber/orange nebula effect */}
//       <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 blur-[60px] rounded-full group-hover:bg-orange-500/20 transition-colors duration-500" />

//       <div className="flex items-start justify-between relative z-10">
//         <div className="flex items-center gap-5">
//           {/* THE FLAME ICON */}
//           <div className="relative">
//             {/* Glow behind the icon optimized for dark mode */}
//             <div className="absolute inset-0 bg-orange-600 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
//             <div 
//               className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg border"
//               style={{ 
//                 backgroundColor: "var(--bg-primary)", 
//                 borderColor: "rgba(249, 115, 22, 0.2)" 
//               }}
//             >
//               🔥
//             </div>
//           </div>

//           {/* TEXT CONTENT */}
//           <div>
//             <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
//               Activity Streak
//             </p>
//             <div className="flex items-baseline gap-2">
//               <p className="text-5xl font-black tracking-tighter text-[var(--text-primary)]">
//                 {streak}
//               </p>
//               <p className="text-sm font-black text-orange-500 uppercase">Days</p>
//             </div>
//           </div>
//         </div>

//         {/* STATUS BADGE */}
//         <div className="hidden sm:block">
//            <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
//               <FiTrendingUp className="text-sm" />
//               ACTIVE
//            </div>
//         </div>
//       </div>

//       {/* WEEKLY VISUALIZER */}
//       <div className="mt-10 relative z-10">
//         <div className="flex justify-between items-center">
//           {days.map((day, idx) => {
//             const isToday = idx === currentDay;
//             const isCompleted = idx < currentDay;

//             return (
//               <div key={idx} className="flex flex-col items-center gap-2">
//                 <div className={`
//                   w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold transition-all duration-300
//                   ${isToday ? 
//                     'bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)] scale-110 ring-4 ring-orange-500/10' : 
//                     isCompleted ? 
//                     'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 
//                     'bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-color)]'}
//                 `}>
//                   {day}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* MOTIVATIONAL FOOTER */}
//       <div className="mt-10 pt-5 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
//         <p className="text-[12px] text-[var(--text-secondary)] font-medium italic">
//           “Consistency is the secret of masters.”
//         </p>
//         <div className="flex items-center gap-2 text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-tight bg-[var(--bg-primary)] px-3 py-1.5 rounded-lg border border-[var(--border-color)]">
//           <FiCalendar className="text-orange-500" />
//           <span>Next Goal: <span className="text-[var(--text-primary)]">{streak + (7 - (streak % 7))} Days</span></span>
//         </div>
//       </div>
//     </div>
//   );
// }


//before is live new changes
import React from "react";
import { FiTrendingUp, FiCalendar } from "react-icons/fi";

/**
 * Props:
 *   streak            — number of consecutive days
 *   activeDaysThisWeek — array of day indices (0=Sun...6=Sat) that had activity
 */
export default function StreakCard({ streak = 0, activeDaysThisWeek = [] }) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDay = new Date().getDay(); // 0=Sun ... 6=Sat

  const activeSet = new Set(activeDaysThisWeek);

  return (
    <div className="card p-8 relative overflow-hidden group h-full transition-all duration-300">

      {/* Background glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 blur-[60px] rounded-full group-hover:bg-orange-500/20 transition-colors duration-500" />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-5">

          {/* Flame icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-orange-600 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
            <div
              className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg border"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "rgba(249, 115, 22, 0.2)",
              }}
            >
              🔥
            </div>
          </div>

          {/* Streak count */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
              Activity Streak
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-5xl font-black tracking-tighter text-[var(--text-primary)]">
                {streak}
              </p>
              <p className="text-sm font-black text-orange-500 uppercase">Days</p>
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div className="hidden sm:block">
          {streak > 0 ? (
            <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <FiTrendingUp className="text-sm" /> ACTIVE
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] font-black text-[var(--text-secondary)] bg-[var(--bg-primary)] px-3 py-1.5 rounded-full border border-[var(--border-color)]">
              INACTIVE
            </div>
          )}
        </div>
      </div>

      {/* ✅ REAL Weekly Visualizer */}
      <div className="mt-10 relative z-10">
        <div className="flex justify-between items-center">
          {days.map((day, idx) => {
            const isToday = idx === currentDay;
            const isActive = activeSet.has(idx);       // ✅ real data
            const isFuture = idx > currentDay;

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div
                  className={`
                    w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold transition-all duration-300
                    ${isToday && isActive
                      ? "bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)] scale-110 ring-4 ring-orange-500/10"
                      : isToday
                      ? "bg-orange-600/40 text-orange-300 scale-105 ring-2 ring-orange-500/20"
                      : isActive
                      ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                      : isFuture
                      ? "bg-[var(--bg-primary)] text-[var(--text-secondary)]/30 border border-[var(--border-color)]/40"
                      : "bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                    }
                  `}
                >
                  {day}
                </div>

                {/* ✅ Active dot indicator */}
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    isActive ? "bg-orange-500" : "bg-transparent"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* ✅ Week summary */}
        <p className="text-center mt-4 text-[11px] font-bold text-[var(--text-secondary)]">
          {activeDaysThisWeek.length === 0
            ? "No activity this week yet — start today! 💪"
            : `${activeDaysThisWeek.length}/7 days active this week`}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-5 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <p className="text-[12px] text-[var(--text-secondary)] font-medium italic">
          "Consistency is the secret of masters."
        </p>
        <div className="flex items-center gap-2 text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-tight bg-[var(--bg-primary)] px-3 py-1.5 rounded-lg border border-[var(--border-color)]">
          <FiCalendar className="text-orange-500" />
          <span>
            Next Goal:{" "}
            <span className="text-[var(--text-primary)]">
              {streak + (7 - (streak % 7))} Days
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}