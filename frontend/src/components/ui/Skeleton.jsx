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

import React from "react";

export default function Skeleton({ className = "", floating = false }) {
  return (
    <div 
      className={`relative overflow-hidden bg-slate-200/60 rounded-xl 
      ${floating ? "animate-bounce-slow" : ""} ${className}`}
    >
      {/* Floating Shimmer Effect */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-transparent
          via-white/80
          to-transparent
          -translate-x-full
          animate-[shimmer_2s_infinite]
        "
      />
    </div>
  );
}
