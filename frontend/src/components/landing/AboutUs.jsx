// import React from "react";
// import { motion } from "framer-motion";

// export default function AboutUs() {
//   return (
//     <section
//       id="about"
//       className="min-h-screen flex items-center justify-center px-6"
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         viewport={{ once: true }}
//         className="max-w-4xl mx-auto text-center"
//       >
//         {/* Badge */}
//         <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-medium
//           bg-white/10 text-purple-300 border border-white/10">
//           Who we are
//         </span>

//         {/* Heading */}
//         <h2 className="text-4xl md:text-5xl font-extrabold
//           bg-gradient-to-r from-purple-400 to-blue-400
//           bg-clip-text text-transparent">
//           About PrepVision AI
//         </h2>

//         {/* Description */}
//         <p className="text-gray-300 mt-6 text-lg leading-relaxed">
//           PrepVision AI helps learners prepare for real interviews using
//           <span className="text-white font-medium"> AI-powered mock sessions</span>,
//           instant scoring, voice analysis, and personalized improvement roadmaps.
//           <br />
//           <br />
//           Our mission is to make interview preparation
//           <span className="text-white font-medium"> smarter, accessible, </span>
//           and tailored for every learner — from students to professionals.
//         </p>

//         {/* Highlight cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
//           {[
//             { title: "AI Driven", desc: "Smart evaluations & insights" },
//             { title: "Real Practice", desc: "Interview-like experience" },
//             { title: "Personalized", desc: "Custom improvement roadmap" },
//           ].map((item, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ y: -6 }}
//               className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
//             >
//               <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
//               <p className="text-sm text-gray-400">{item.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// }


// new final
import React from "react";
import { motion } from "framer-motion";
import { FiCpu, FiTarget, FiTrendingUp } from "react-icons/fi";

export default function AboutUs() {
  const features = [
    { 
      title: "AI Driven", 
      desc: "Smart evaluations & real-time insights.", 
      icon: <FiCpu className="text-indigo-600" />,
      bg: "bg-indigo-50",
      border: "border-indigo-100"
    },
    { 
      title: "Real Practice", 
      desc: "Simulation of high-stakes interviews.", 
      icon: <FiTarget className="text-emerald-600" />,
      bg: "bg-emerald-50",
      border: "border-emerald-100"
    },
    { 
      title: "Personalized", 
      desc: "Custom AI improvement roadmaps.", 
      icon: <FiTrendingUp className="text-amber-600" />,
      bg: "bg-amber-50",
      border: "border-amber-100"
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 bg-white relative overflow-hidden"
    >
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[120px] opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        {/* Badge - Polished for Light Mode */}
        <span className="inline-flex items-center mb-6 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] bg-indigo-50 text-indigo-600 border border-indigo-100">
          Our Identity
        </span>

        {/* Heading - High Contrast Slate */}
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
          Redefining Interview <br />
          <span className="text-indigo-600">Preparation with AI</span>
        </h2>

        {/* Description - Slate Typography */}
        <p className="text-slate-500 mt-8 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium">
          PrepVision AI helps learners master real-world interviews through
          <span className="text-slate-900 font-bold"> AI-powered simulations</span>, 
          instant scoring, and professional voice analysis.
          <br className="hidden md:block" />
          <br className="hidden md:block" />
          Our mission is to make career growth 
          <span className="text-indigo-600 font-bold"> smarter, accessible, </span>
          and tailored for every professional journey.
        </p>

        {/* Feature Cards - Bento Grid Style */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          {features.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/40 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                {React.cloneElement(item.icon, { size: 24 })}
              </div>
              <h4 className="font-black text-xl text-slate-900 mb-3 tracking-tight">{item.title}</h4>
              <p className="text-sm font-bold text-slate-400 leading-relaxed uppercase tracking-tighter">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}