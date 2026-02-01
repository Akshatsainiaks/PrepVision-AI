// // src/components/landing/HowItWorks.jsx
// import { motion } from "framer-motion";
// import React from "react";

// const steps = [
//   {
//     step: "01",
//     title: "Choose a Mock",
//     desc: "Select an interview type based on your role and experience level."
//   },
//   {
//     step: "02",
//     title: "Answer Questions",
//     desc: "Respond in real-time just like a real interview scenario."
//   },
//   {
//     step: "03",
//     title: "Get Instant AI Feedback",
//     desc: "Receive detailed feedback on clarity, confidence, and accuracy."
//   }
// ];

// export default function HowItWorks() {
//   return (
//     <section className="max-w-5xl mx-auto text-center px-6">
      
//       {/* Heading */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true }}
//         className="mb-14"
//       >
//         <span className="inline-block mb-3 px-4 py-1 rounded-full text-sm
//           bg-white/10 text-purple-300 border border-white/10">
//           Simple Process
//         </span>

//         <h3 className="text-4xl font-extrabold
//           bg-gradient-to-r from-purple-400 to-blue-400
//           bg-clip-text text-transparent">
//           How It Works
//         </h3>

//         <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
//           A smooth, guided flow that helps you prepare confidently and efficiently.
//         </p>
//       </motion.div>

//       {/* Steps */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {steps.map((item, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             viewport={{ once: true }}
//             whileHover={{ y: -6 }}
//             className="
//               p-6 rounded-2xl
//               bg-white/5 border border-white/10
//               backdrop-blur-md
//               transition-all
//             "
//           >
//             {/* Step Number */}
//             <div className="text-4xl font-extrabold text-purple-400 mb-4">
//               {item.step}
//             </div>

//             {/* Title */}
//             <h4 className="text-lg font-semibold mb-2">
//               {item.title}
//             </h4>

//             {/* Description */}
//             <p className="text-gray-400 text-sm leading-relaxed">
//               {item.desc}
//             </p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }


//new final
// src/components/landing/HowItWorks.jsx
import { motion } from "framer-motion";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const steps = [
  {
    step: "01",
    title: "Choose a Mock",
    desc: "Select an interview type based on your role and experience level."
  },
  {
    step: "02",
    title: "Answer Questions",
    desc: "Respond in real-time just like a real interview scenario."
  },
  {
    step: "03",
    title: "Get Instant AI Feedback",
    desc: "Receive detailed feedback on clarity, confidence, and accuracy."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-6xl mx-auto text-center px-6 py-24 bg-white relative overflow-hidden">
      
      {/* BACKGROUND ACCENT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-50/40 blur-[120px] rounded-full" />
      </div>

      {/* Heading - Aligned with the new Light Branding */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <span className="inline-flex items-center mb-4 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] bg-indigo-50 text-indigo-600 border border-indigo-100">
          Simple Process
        </span>

        <h3 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          How <span className="text-indigo-600">It Works</span>
        </h3>

        <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
          A smooth, guided flow that helps you prepare confidently and efficiently for your next career move.
        </p>
      </motion.div>

      {/* Steps Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        
        {/* DESKTOP CONNECTOR LINE (Hidden on Mobile) */}
        <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-px bg-slate-100 -z-10" />

        {steps.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:border-indigo-300 hover:shadow-indigo-500/5"
          >
            {/* Step Number Badge */}
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl font-black text-indigo-600 mb-8 mx-auto group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-100 transition-all duration-500">
              {item.step}
            </div>

            {/* Title - High Contrast Slate */}
            <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight">
              {item.title}
            </h4>

            {/* Description - Refined Slate Typography */}
            <p className="text-slate-500 text-sm font-bold leading-relaxed uppercase tracking-tighter">
              {item.desc}
            </p>

            {/* STEP ARROW (Visible on Desktop for 01 and 02) */}
            {index < 2 && (
               <div className="hidden lg:flex absolute top-12 -right-6 w-12 h-12 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-300 shadow-sm z-10 group-hover:text-indigo-400 group-hover:border-indigo-100 transition-colors">
                  <FiArrowRight />
               </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA Footer */}
      <div className="mt-20">
        <button className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
          Get Started Now
        </button>
      </div>
    </section>
  );
}