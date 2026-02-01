// // src/components/landing/Pricing.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import { FiCheck } from "react-icons/fi";

// export default function Pricing() {
//   return (
//     <section
//       id="pricing"
//       className="min-h-screen flex items-center justify-center px-6"
//     >
//       <div className="max-w-6xl w-full">

//         {/* Heading */}
//         <div className="text-center mb-12">
//           <span className="inline-block mb-3 px-4 py-1 rounded-full text-sm
//             bg-white/10 text-purple-300 border border-white/10">
//             Pricing
//           </span>

//           <h3
//             className="text-4xl font-extrabold
//             bg-gradient-to-r from-purple-400 to-blue-400
//             bg-clip-text text-transparent"
//           >
//             Choose the plan that fits you
//           </h3>

//           <p className="text-gray-400 mt-3">
//             Start free, upgrade when you’re ready
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

//           {/* FREE */}
//           <motion.div
//             whileHover={{ y: -8 }}
//             className="
//               p-8 rounded-2xl
//               bg-white/5 border border-white/10
//               backdrop-blur-md
//               flex flex-col
//             "
//           >
//             <h4 className="text-xl font-semibold mb-1">Free</h4>
//             <p className="text-gray-400 text-sm mb-4">Get started</p>

//             <div className="text-4xl font-extrabold mb-6">₹0</div>

//             <ul className="space-y-3 text-gray-300 text-sm flex-1">
//               <li className="flex items-center gap-2">
//                 <FiCheck className="text-green-400" /> 10 practice questions / month
//               </li>
//               <li className="flex items-center gap-2">
//                 <FiCheck className="text-green-400" /> Basic AI feedback
//               </li>
//               <li className="flex items-center gap-2">
//                 <FiCheck className="text-green-400" /> Community access
//               </li>
//             </ul>

//             <button
//               className="mt-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-medium"
//             >
//               Get Started
//             </button>
//           </motion.div>

//           {/* PRO (HIGHLIGHTED) */}
//           <motion.div
//             whileHover={{ y: -10 }}
//             className="
//               relative p-8 rounded-2xl
//               bg-gradient-to-r from-purple-600 to-blue-600
//               text-white
//               shadow-2xl
//               flex flex-col
//             "
//           >
//             {/* Badge */}
//             <span
//               className="
//                 absolute -top-4 left-1/2 -translate-x-1/2
//                 px-4 py-1 text-xs font-semibold rounded-full
//                 bg-black/30 backdrop-blur border border-white/20
//               "
//             >
//               Most Popular
//             </span>

//             <h4 className="text-xl font-semibold mb-1">Pro</h4>
//             <p className="text-white/80 text-sm mb-4">
//               For serious interview prep
//             </p>

//             <div className="text-4xl font-extrabold mb-6">
//               ₹499 <span className="text-sm font-medium">/ month</span>
//             </div>

//             <ul className="space-y-3 text-sm text-white/90 flex-1">
//               <li className="flex items-center gap-2">
//                 <FiCheck /> Unlimited practice
//               </li>
//               <li className="flex items-center gap-2">
//                 <FiCheck /> Premium AI evaluations
//               </li>
//               <li className="flex items-center gap-2">
//                 <FiCheck /> Full learning roadmap
//               </li>
//               <li className="flex items-center gap-2">
//                 <FiCheck /> Voice & confidence analysis
//               </li>
//             </ul>

//             <button
//               className="
//                 mt-6 py-3 rounded-xl
//                 bg-white text-gray-900 font-semibold
//                 hover:bg-gray-100 transition
//               "
//             >
//               Start Pro
//             </button>
//           </motion.div>

//           {/* PREMIUM */}
//           <motion.div
//             whileHover={{ y: -8 }}
//             className="
//               p-8 rounded-2xl
//               bg-white/5 border border-white/10
//               backdrop-blur-md
//               flex flex-col
//             "
//           >
//             <h4 className="text-xl font-semibold mb-1">Premium</h4>
//             <p className="text-gray-400 text-sm mb-4">
//               For teams & organizations
//             </p>

//             <div className="text-4xl font-extrabold mb-6">Custom</div>

//             <ul className="space-y-3 text-gray-300 text-sm flex-1">
//               <li className="flex items-center gap-2">
//                 <FiCheck className="text-green-400" /> Team access
//               </li>
//               <li className="flex items-center gap-2">
//                 <FiCheck className="text-green-400" /> Custom evaluations
//               </li>
//               <li className="flex items-center gap-2">
//                 <FiCheck className="text-green-400" /> Analytics & reports
//               </li>
//               <li className="flex items-center gap-2">
//                 <FiCheck className="text-green-400" /> Dedicated support
//               </li>
//             </ul>

//             <button
//               className="mt-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-medium"
//             >
//               Contact Sales
//             </button>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// }


// new final
// src/components/landing/Pricing.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiCheck, FiArrowRight, FiZap, FiStar } from "react-icons/fi";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="min-h-screen flex items-center justify-center px-6 bg-white py-24 animate-fadeIn"
    >
      <div className="max-w-7xl w-full mx-auto">

        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[11px] font-black uppercase tracking-[0.2em] rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
            <FiZap className="text-sm" />
            Flexible Investment
          </span>

          <h3 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Choose the plan <br />
            <span className="text-indigo-600">that fits you</span>
          </h3>

          <p className="text-slate-500 mt-6 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Start for free and scale your interview mastery as you grow. No hidden fees, just pure growth.
          </p>
        </div>

        {/* Pricing Cards - Crystal Light Aesthetic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* FREE PLAN */}
          <motion.div
            whileHover={{ y: -10 }}
            className="p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/40 flex flex-col group transition-all duration-300 hover:border-slate-300"
          >
            <div className="mb-8">
              <h4 className="text-2xl font-black text-slate-900 mb-1">Free</h4>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Trial Account</p>
            </div>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">₹0</span>
              <span className="text-slate-400 font-bold text-sm">/ forever</span>
            </div>

            <ul className="space-y-4 text-slate-600 font-medium text-sm flex-1 mb-10">
              <li className="flex items-center gap-3">
                <div className="p-1 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100"><FiCheck /></div>
                10 practice questions / month
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100"><FiCheck /></div>
                Basic AI evaluation reports
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100"><FiCheck /></div>
                Community forum access
              </li>
            </ul>

            <button className="w-full py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 font-black text-sm uppercase tracking-widest hover:bg-slate-100 hover:border-slate-300 transition-all active:scale-95">
              Get Started
            </button>
          </motion.div>

          {/* PRO PLAN (MOST POPULAR) */}
          <motion.div
            whileHover={{ y: -12 }}
            className="relative p-10 rounded-[2.5rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-200 flex flex-col transform md:scale-105 z-10 overflow-hidden"
          >
            {/* Background Pattern Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-16 -mt-16 rounded-full" />
            
            {/* Popular Badge */}
            <div className="absolute top-6 right-10 flex items-center gap-1.5 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full bg-white text-indigo-600 shadow-lg">
              <FiStar />
              Most Popular
            </div>

            <div className="mb-8">
              <h4 className="text-2xl font-black text-white mb-1">Pro</h4>
              <p className="text-indigo-100 font-bold uppercase tracking-widest text-[10px]">For Career Seekers</p>
            </div>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black text-white tracking-tighter">₹499</span>
              <span className="text-indigo-100 font-bold text-sm">/ month</span>
            </div>

            <ul className="space-y-4 text-indigo-50 font-medium text-sm flex-1 mb-10">
              <li className="flex items-center gap-3">
                <div className="p-1 bg-white/20 rounded-md border border-white/10"><FiCheck /></div>
                Unlimited interview practice
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1 bg-white/20 rounded-md border border-white/10"><FiCheck /></div>
                Premium Gemini evaluations
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1 bg-white/20 rounded-md border border-white/10"><FiCheck /></div>
                Full personalized roadmaps
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1 bg-white/20 rounded-md border border-white/10"><FiCheck /></div>
                Voice & confidence analysis
              </li>
            </ul>

            <button className="w-full py-4 rounded-2xl bg-white text-indigo-600 font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-900/20 hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2">
              Start Masterclass <FiArrowRight />
            </button>
          </motion.div>

          {/* PREMIUM PLAN */}
          <motion.div
            whileHover={{ y: -10 }}
            className="p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/40 flex flex-col group transition-all duration-300 hover:border-slate-300"
          >
            <div className="mb-8">
              <h4 className="text-2xl font-black text-slate-900 mb-1">Premium</h4>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Enterprise Edition</p>
            </div>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">Custom</span>
            </div>

            <ul className="space-y-4 text-slate-600 font-medium text-sm flex-1 mb-10">
              <li className="flex items-center gap-3">
                <div className="p-1 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100"><FiCheck /></div>
                Multi-user team access
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100"><FiCheck /></div>
                Custom grading rubrics
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100"><FiCheck /></div>
                Enterprise analytics & reports
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100"><FiCheck /></div>
                Dedicated account manager
              </li>
            </ul>

            <button className="w-full py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 font-black text-sm uppercase tracking-widest hover:bg-slate-100 hover:border-slate-300 transition-all active:scale-95">
              Contact Sales
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}