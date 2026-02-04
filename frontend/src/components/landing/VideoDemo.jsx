// // src/components/landing/VideoDemo.jsx
// import React from "react";

// export default function VideoDemo() {
//   return (
//     <section className="max-w-6xl mx-auto px-6 text-center">
      
//       {/* Badge */}
//       <span
//         className="inline-block mb-4 px-4 py-1 rounded-full text-sm
//         bg-white/10 text-purple-300 border border-white/10"
//       >
//         Product Demo
//       </span>

//       {/* Heading */}
//       <h3
//         className="text-4xl font-extrabold mb-4
//         bg-gradient-to-r from-purple-400 to-blue-400
//         bg-clip-text text-transparent"
//       >
//         See PrepVision AI in Action
//       </h3>

//       {/* Subtitle */}
//       <p className="text-gray-400 max-w-2xl mx-auto mb-10">
//         Experience how AI-powered mock interviews, real-time feedback,
//         and voice analysis help you crack interviews with confidence.
//       </p>

//       {/* Video Container */}
//       <div
//         className="
//           relative max-w-4xl mx-auto
//           rounded-3xl overflow-hidden
//           bg-black/60 border border-white/10
//           shadow-2xl
//         "
//       >
//         <iframe
//           className="w-full aspect-video"
//           src="https://www.youtube.com/embed/dQw4w9WgXcQ"
//           title="PrepVision AI Demo"
//           allowFullScreen
//         />
//       </div>

//       {/* CTA */}
//       <div className="mt-10">
//         <p className="text-gray-400 mb-4">
//           Ready to try it yourself?
//         </p>

//         <button
//           className="
//             px-8 py-3 rounded-xl
//             bg-gradient-to-r from-purple-600 to-blue-600
//             font-semibold
//             hover:scale-105 transition
//           "
//         >
//           Start Free Mock Interview
//         </button>
//       </div>

//     </section>
//   );
// }


// new final
// src/components/landing/VideoDemo.jsx
// import React from "react";
// import { FiPlay, FiVideo, FiArrowRight } from "react-icons/fi";
// import { motion } from "framer-motion";

// export default function VideoDemo() {
//   return (
//     <section id="demo" className="max-w-6xl mx-auto px-6 py-24 text-center animate-fadeIn">
      
//       {/* Badge - Unified with other Light sections */}
//       <span className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] bg-indigo-50 text-indigo-600 border border-indigo-100">
//         <FiVideo className="text-sm" />
//         Product Demo
//       </span>

//       {/* Heading - High Contrast Slate */}
//       <h3 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
//         See PrepVision AI <br />
//         <span className="text-indigo-600">in Action</span>
//       </h3>

//       {/* Subtitle - Refined Slate Typography */}
//       <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
//         Experience how AI-powered mock interviews, real-time feedback,
//         and voice analysis help you crack interviews with confidence.
//       </p>

//       {/* Video Container - Bento Style with Premium Shadows */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//         viewport={{ once: true }}
//         className="relative max-w-5xl mx-auto mt-16 p-2 bg-white border border-slate-200 rounded-[3rem] shadow-2xl shadow-slate-200/60 overflow-hidden group"
//       >
//         <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-100 aspect-video shadow-inner">
//           <iframe
//             className="w-full h-full"
//             src="https://www.youtube.com/embed/dQw4w9WgXcQ"
//             title="PrepVision AI Demo"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         </div>

//         {/* Decorative Play Indicator (Overlay on Hover) */}
//         <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//            <div className="w-20 h-20 bg-indigo-600/10 backdrop-blur-md rounded-full flex items-center justify-center border border-indigo-200/50">
//               <FiPlay className="text-indigo-600 translate-x-0.5" size={32} />
//            </div>
//         </div>
//       </motion.div>

//       {/* CTA Section */}
//       <div className="mt-16 space-y-6">
//         <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
//           Ready to transform your preparation?
//         </p>

//         <button
//           className="group inline-flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-indigo-600 text-white font-black text-lg shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
//         >
//           Start Free Mock Interview
//           <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
//         </button>
//       </div>

//     </section>
//   );
// }

//dark mode
import React from "react";
import { FiPlay, FiVideo, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function VideoDemo() {
  return (
    <section 
      id="demo" 
      className="max-w-6xl mx-auto px-6 py-24 text-center transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      
      {/* Badge - Cyber Tint */}
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] border shadow-lg"
        style={{ 
          backgroundColor: "rgba(99, 102, 241, 0.1)", 
          color: "var(--accent)", 
          borderColor: "rgba(99, 102, 241, 0.2)" 
        }}
      >
        <FiVideo className="text-sm" />
        Product Demo
      </motion.span>

      {/* Heading - Stark White/Indigo */}
      <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
        Experience the <br />
        <span style={{ color: "var(--accent)" }}>AI Simulation</span>
      </h3>

      {/* Subtitle - Muted Slate */}
      <p className="mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed opacity-70" style={{ color: "var(--text-secondary)" }}>
        Witness the synergy of real-time voice analysis, behavioral tracking, 
        and generative AI feedback in a single, immersive session.
      </p>

      {/* Video Container - The "Obsidian" Player */}
      [Image of a professional dark-themed video player interface with glowing accent borders]
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="relative max-w-5xl mx-auto mt-20 p-1 rounded-[3.5rem] shadow-[0_0_100px_rgba(99,102,241,0.15)] group"
        style={{ backgroundColor: "var(--border-color)" }}
      >
        {/* The Aura Glow behind the player */}
        <div className="absolute inset-0 bg-indigo-500/20 blur-[120px] rounded-full -z-10 group-hover:bg-indigo-500/30 transition-all duration-700" />

        <div className="relative rounded-[3.2rem] overflow-hidden aspect-video shadow-2xl" style={{ backgroundColor: "var(--bg-card)" }}>
          <iframe
            className="w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="PrepVision AI Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          {/* Subtle Scanline Overlay for tech feel */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />
        </div>

        {/* Floating Play Button - Only appears before iframe focus */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
           <div className="w-24 h-24 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 shadow-2xl">
              <FiPlay className="text-white translate-x-0.5" size={40} />
           </div>
        </div>
      </motion.div>

      {/* CTA SECTION */}
      <div className="mt-24 space-y-8">
        <div className="flex flex-col items-center gap-4">
           <div className="h-px w-20 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50" />
           <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: "var(--text-secondary)" }}>
            Ready to evolve?
           </p>
        </div>

        <button
          className="group relative inline-flex items-center gap-4 px-12 py-6 rounded-full font-black text-xl text-white overflow-hidden transition-all active:scale-95 shadow-2xl shadow-indigo-500/20"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
          
          Start Free Session
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}