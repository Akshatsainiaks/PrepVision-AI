// // src/components/landing/FeatureCard.jsx
// import { motion } from "framer-motion";
// import React from "react";

// export default function FeatureCard({ icon, title, desc, color }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//       viewport={{ once: true }}
//       whileHover={{ y: -6 }}
//       className="
//         p-6 rounded-2xl
//         bg-white/5 border border-white/10
//         backdrop-blur-md
//         transition-all duration-300
//       "
//     >
//       {/* Icon */}
//       <div
//         className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}
//       >
//         <span className="text-xl text-white">{icon}</span>
//       </div>

//       {/* Title */}
//       <h4 className="text-lg font-semibold mb-2">{title}</h4>

//       {/* Description */}
//       <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
//     </motion.div>
//   );
// }


//new final
// src/components/landing/FeatureCard.jsx
import { motion } from "framer-motion";
import React from "react";

/**
 * FEATURE CARD - Crystal Light Edition
 * @param {ReactNode} icon - Icon component from react-icons
 * @param {string} title - Heading text
 * @param {string} desc - Description text
 * @param {string} accentColor - Tailwind color class (e.g., "indigo")
 */
export default function FeatureCard({ icon, title, desc, accentColor = "indigo" }) {
  // Map color strings to specific Tailwind utility classes for light mode
  const colorMap = {
    indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-100" },
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
    amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
    rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100" },
  };

  const theme = colorMap[accentColor] || colorMap.indigo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="
        p-8 rounded-[2.5rem]
        bg-white border border-slate-200
        shadow-xl shadow-slate-200/40
        transition-all duration-300
        hover:border-indigo-300 hover:shadow-indigo-500/5
        group
      "
    >
      {/* Icon Container with soft tint */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 
        transition-transform group-hover:scale-110 duration-500
        ${theme.bg} ${theme.text} border ${theme.border}`}
      >
        {React.cloneElement(icon, { size: 24 })}
      </div>

      {/* Title - High Contrast Slate */}
      <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight">
        {title}
      </h4>

      {/* Description - Refined Slate Typography */}
      <p className="text-slate-500 text-sm font-medium leading-relaxed uppercase tracking-tighter">
        {desc}
      </p>

      {/* Subtle Bottom Accent (Optional) */}
      <div className={`h-1 w-12 rounded-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme.bg.replace('50', '200')}`} />
    </motion.div>
  );
}