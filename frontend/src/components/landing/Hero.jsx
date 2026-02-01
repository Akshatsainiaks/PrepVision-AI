// // src/components/landing/Hero.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// export default function Hero({ onStart }) {
//   return (
//     <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
//       <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//         Ace Your Interviews with AI
//       </h1>

//       <p className="text-gray-300 max-w-xl mx-auto mt-5">
//         Real-time AI interviews, instant feedback, voice analysis & personalized improvement plans.
//       </p>

//       <div className="flex justify-center gap-4 mt-10">
//         <button
//           onClick={onStart}
//           className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600"
//         >
//           Start Exploring
//         </button>

//         <Link to="/register" className="px-6 py-3 rounded-xl bg-white/10">
//           Create Account
//         </Link>
//       </div>
//     </section>
//   );
// }

// new final
// src/components/landing/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Hero({ onStart }) {
  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center text-center px-6 bg-white overflow-hidden">
      
      {/* BACKGROUND DECORATION: Soft light-mode blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50/60 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-50/50 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* TOP BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
            Powered by Gemini 3 Flash
          </span>
        </motion.div>

        {/* MAIN HEADING: Switched to high-contrast Slate */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]"
        >
          Ace Your Interviews <br />
          <span className="text-indigo-600">with Real-time AI</span>
        </motion.h1>

        {/* DESCRIPTION: Refined Slate Typography */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-500 max-w-2xl mx-auto mt-8 text-lg md:text-xl font-medium leading-relaxed"
        >
          Master your delivery with instant feedback, professional voice analysis, 
          and personalized roadmaps designed to land you the job.
        </motion.p>

        {/* ACTIONS: Updated with modern button styles */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-12"
        >
          <button
            onClick={onStart}
            className="group flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-indigo-600 text-white font-black text-lg shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95"
          >
            Start Exploring
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>

          <Link 
            to="/register" 
            className="flex items-center gap-3 px-8 py-5 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-700 font-black text-lg hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 shadow-sm"
          >
            <FiPlay className="text-indigo-600" />
            Watch Demo
          </Link>
        </motion.div>

        {/* TRUST SIGNALS (Optional visual addition) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 pt-10 border-t border-slate-50 flex flex-wrap justify-center gap-8 grayscale opacity-40 group-hover:grayscale-0 transition-all"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Trusted by 5,000+ Candidates</span>
        </motion.div>

      </div>
    </section>
  );
}