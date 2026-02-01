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
import React from "react";
import { FiPlay, FiVideo, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function VideoDemo() {
  return (
    <section id="demo" className="max-w-6xl mx-auto px-6 py-24 text-center animate-fadeIn">
      
      {/* Badge - Unified with other Light sections */}
      <span className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] bg-indigo-50 text-indigo-600 border border-indigo-100">
        <FiVideo className="text-sm" />
        Product Demo
      </span>

      {/* Heading - High Contrast Slate */}
      <h3 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
        See PrepVision AI <br />
        <span className="text-indigo-600">in Action</span>
      </h3>

      {/* Subtitle - Refined Slate Typography */}
      <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
        Experience how AI-powered mock interviews, real-time feedback,
        and voice analysis help you crack interviews with confidence.
      </p>

      {/* Video Container - Bento Style with Premium Shadows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="relative max-w-5xl mx-auto mt-16 p-2 bg-white border border-slate-200 rounded-[3rem] shadow-2xl shadow-slate-200/60 overflow-hidden group"
      >
        <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-100 aspect-video shadow-inner">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="PrepVision AI Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Decorative Play Indicator (Overlay on Hover) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="w-20 h-20 bg-indigo-600/10 backdrop-blur-md rounded-full flex items-center justify-center border border-indigo-200/50">
              <FiPlay className="text-indigo-600 translate-x-0.5" size={32} />
           </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <div className="mt-16 space-y-6">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
          Ready to transform your preparation?
        </p>

        <button
          className="group inline-flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-indigo-600 text-white font-black text-lg shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
        >
          Start Free Mock Interview
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </section>
  );
}