// import React from "react";

// export default function Skeleton({ className = "" }) {
//   return (
//     <div className={`relative overflow-hidden rounded bg-white/10 ${className}`}>
//       <div
//         className="
//           absolute inset-0
//           shimmer
//           bg-gradient-to-r
//           from-transparent
//           via-white/30
//           to-transparent
//         "
//       />
//     </div>
//   );
// }

// import React from "react";

// export default function Skeleton({ className = "", floating = false }) {
//   return (
//     <div 
//       className={`relative overflow-hidden bg-slate-200/60 rounded-xl 
//       ${floating ? "animate-bounce-slow" : ""} ${className}`}
//     >
//       {/* Floating Shimmer Effect */}
//       <div
//         className="
//           absolute inset-0
//           bg-gradient-to-r
//           from-transparent
//           via-white/80
//           to-transparent
//           -translate-x-full
//           animate-[shimmer_2s_infinite]
//         "
//       />
//     </div>
//   );
// }

//dark mode
import React from "react";

/**
 * A sleek, high-end Skeleton loader for the Dark Mode transition.
 * Uses CSS variables for consistent background and shimmer effects.
 */
export default function Skeleton({ className = "", floating = false }) {
  return (
    <div 
      className={`relative overflow-hidden rounded-xl border border-white/[0.02] 
      ${floating ? "animate-pulse" : ""} ${className}`}
      style={{ 
        backgroundColor: "rgba(30, 41, 59, 0.5)" // Mid-point between bg-primary and bg-card
      }}
    >
      {/* Floating Shimmer Effect - Optimized for Dark Backgrounds */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-transparent
          via-white/[0.05]
          to-transparent
          -translate-x-full
          animate-[shimmer_2.5s_infinite]
        "
      />

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}