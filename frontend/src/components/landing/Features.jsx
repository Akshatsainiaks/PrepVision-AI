// // src/components/landing/Features.jsx
// import React from "react";
// import { FiMic, FiMessageCircle, FiCpu, FiCheckCircle } from "react-icons/fi";
// import { motion } from "framer-motion";
// import FeatureCard from "./FeatureCard";

// export default function Features() {
//   return (
//     <section
//       id="features"
//       className="min-h-screen flex items-center justify-center px-6"
//     >
//       <div className="max-w-6xl mx-auto">

//         {/* Section heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-14"
//         >
//           <span className="inline-block mb-3 px-4 py-1 rounded-full text-sm
//             bg-white/10 text-purple-300 border border-white/10">
//             Core Features
//           </span>

//           <h2 className="text-4xl md:text-5xl font-extrabold
//             bg-gradient-to-r from-purple-400 to-blue-400
//             bg-clip-text text-transparent">
//             Everything you need to crack interviews
//           </h2>

//           <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
//             Practice smarter with AI-driven interviews, feedback,
//             communication analysis, and a personalized learning roadmap.
//           </p>
//         </motion.div>

//         {/* Features grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           <FeatureCard
//             icon={<FiCpu />}
//             title="AI Mock Interviews"
//             desc="Simulate real interview rounds with AI-driven questions."
//             color="bg-purple-500/10"
//           />

//           <FeatureCard
//             icon={<FiMessageCircle />}
//             title="AI Feedback"
//             desc="Get instant insights on clarity, accuracy, and confidence."
//             color="bg-blue-500/10"
//           />

//           <FeatureCard
//             icon={<FiCheckCircle />}
//             title="Progress Tracking"
//             desc="Track improvement over time with detailed analytics."
//             color="bg-teal-500/10"
//           />

//           <FeatureCard
//             icon={<FiMic />}
//             title="Voice Practice"
//             desc="Improve speaking skills, tone, and communication."
//             color="bg-yellow-500/10"
//           />

//           <FeatureCard
//             icon={<FiMessageCircle />}
//             title="Community Chat"
//             desc="Learn and grow together with peer discussions."
//             color="bg-pink-400/10"
//           />

//           <FeatureCard
//             icon={<FiCpu />}
//             title="Learning Roadmap"
//             desc="Follow a personalized path tailored to your goals."
//             color="bg-green-400/10"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }


//new final
// src/components/landing/Features.jsx
// import React from "react";
// import { FiMic, FiMessageCircle, FiCpu, FiCheckCircle, FiTrendingUp, FiMap } from "react-icons/fi";
// import { motion } from "framer-motion";
// import FeatureCard from "./FeatureCard";

// export default function Features() {
//   return (
//     <section
//       id="features"
//       className="min-h-screen flex items-center justify-center px-6 bg-white py-24"
//     >
//       <div className="max-w-7xl mx-auto">

//         {/* Section heading - Aligned with the new Light Branding */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//           viewport={{ once: true }}
//           className="text-center mb-20"
//         >
//           <span className="inline-flex items-center mb-4 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] bg-indigo-50 text-indigo-600 border border-indigo-100">
//             Comprehensive Suite
//           </span>

//           <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
//             Everything you need <br />
//             <span className="text-indigo-600">to crack interviews</span>
//           </h2>

//           <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
//             Practice smarter with AI-driven simulations, real-time communication analysis, 
//             and a roadmap tailored to your career goals.
//           </p>
//         </motion.div>

//         {/* Features grid - Utilizing the updated FeatureCard props */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           <FeatureCard
//             icon={<FiCpu />}
//             title="AI Mock Interviews"
//             desc="Simulate real-world technical and HR rounds with generative AI."
//             accentColor="indigo"
//           />

//           <FeatureCard
//             icon={<FiTrendingUp />}
//             title="Intelligent Feedback"
//             desc="Get instant scores on clarity, technical accuracy, and sentiment."
//             accentColor="emerald"
//           />

//           <FeatureCard
//             icon={<FiCheckCircle />}
//             title="Progress Analytics"
//             desc="Visualize your improvement over time with detailed performance charts."
//             accentColor="blue"
//           />

//           <FeatureCard
//             icon={<FiMic />}
//             title="Voice Analysis"
//             desc="Refine your tone, pace, and confidence with AI-voice processing."
//             accentColor="amber"
//           />

//           <FeatureCard
//             icon={<FiMessageCircle />}
//             title="Collaborative Learning"
//             desc="Connect with peers to discuss interview experiences and tips."
//             accentColor="rose"
//           />

//           <FeatureCard
//             icon={<FiMap />}
//             title="Smart Roadmap"
//             desc="Follow a personalized skill path based on your interview performance."
//             accentColor="indigo"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

//dark mode
import React from "react";
import { FiMic, FiMessageCircle, FiCpu, FiCheckCircle, FiTrendingUp, FiMap } from "react-icons/fi";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section
      id="features"
      className="min-h-screen flex items-center justify-center px-6 py-24 transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div className="max-w-7xl mx-auto relative">
        
        {/* Ambient background accent for the section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-500/5 blur-[140px] rounded-full" />
        </div>

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="inline-flex items-center mb-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-lg"
                style={{ 
                  backgroundColor: "rgba(99, 102, 241, 0.1)", 
                  color: "var(--accent)", 
                  borderColor: "rgba(99, 102, 241, 0.2)" 
                }}>
            Comprehensive Suite
          </span>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
            The <span style={{ color: "var(--accent)" }}>Intelligence</span> Suite
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed opacity-70" 
             style={{ color: "var(--text-secondary)" }}>
            Practice smarter with AI-driven simulations, real-time communication analysis, 
            and a roadmap tailored to your specific career goals.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FiCpu />}
            title="AI Mock Interviews"
            desc="Simulate real-world technical and HR rounds with generative AI."
            accentColor="indigo"
          />

          <FeatureCard
            icon={<FiTrendingUp />}
            title="Intelligent Feedback"
            desc="Get instant scores on clarity, technical accuracy, and sentiment."
            accentColor="emerald"
          />

          <FeatureCard
            icon={<FiCheckCircle />}
            title="Progress Analytics"
            desc="Visualize your improvement over time with detailed performance charts."
            accentColor="blue"
          />

          <FeatureCard
            icon={<FiMic />}
            title="Voice Analysis"
            desc="Refine your tone, pace, and confidence with AI-voice processing."
            accentColor="amber"
          />

          <FeatureCard
            icon={<FiMessageCircle />}
            title="Collaborative Learning"
            desc="Connect with peers to discuss interview experiences and tips."
            accentColor="rose"
          />

          <FeatureCard
            icon={<FiMap />}
            title="Smart Roadmap"
            desc="Follow a personalized skill path based on your interview performance."
            accentColor="indigo"
          />
        </div>
      </div>
    </section>
  );
}