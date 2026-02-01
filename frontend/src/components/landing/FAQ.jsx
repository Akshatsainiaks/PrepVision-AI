// // src/components/landing/FAQ.jsx
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function FAQ() {
//   const faqs = [
//     {
//       q: "How accurate is the AI?",
//       a: "Our AI evaluates clarity, correctness, confidence, tone, structure, and communication effectiveness in real time.",
//     },
//     {
//       q: "Can I practice HR questions?",
//       a: "Yes. PrepVision AI supports technical, HR, behavioral, and communication interview rounds.",
//     },
//     {
//       q: "Will you use a custom model?",
//       a: "Yes. We are actively working on fine-tuned, interview-specific AI models for higher accuracy.",
//     },
//   ];

//   const [open, setOpen] = useState(null);

//   return (
//     <section id="faq" className="max-w-4xl mx-auto px-6">
      
//       {/* Header */}
//       <div className="text-center mb-10">
//         <span className="inline-block px-4 py-1 mb-4 text-sm rounded-full bg-white/10 text-purple-300 border border-white/10">
//           FAQs
//         </span>

//         <h2
//           className="text-4xl font-extrabold
//           bg-gradient-to-r from-purple-400 to-blue-400
//           bg-clip-text text-transparent"
//         >
//           Frequently Asked Questions
//         </h2>

//         <p className="text-gray-400 mt-4 max-w-xl mx-auto">
//           Everything you need to know about PrepVision AI and how it helps you
//           prepare better for interviews.
//         </p>
//       </div>

//       {/* FAQ List */}
//       <div className="space-y-4">
//         {faqs.map((f, i) => (
//           <motion.div
//             key={i}
//             layout
//             className="
//               rounded-2xl
//               bg-white/5 border border-white/10
//               backdrop-blur-md
//               overflow-hidden
//             "
//           >
//             {/* Question */}
//             <button
//               onClick={() => setOpen(open === i ? null : i)}
//               className="
//                 w-full px-6 py-5
//                 flex justify-between items-center
//                 text-left
//                 hover:bg-white/5 transition
//               "
//             >
//               <span className="text-lg font-medium text-gray-200">
//                 {f.q}
//               </span>

//               <motion.span
//                 animate={{ rotate: open === i ? 45 : 0 }}
//                 className="text-2xl text-gray-400"
//               >
//                 +
//               </motion.span>
//             </button>

//             {/* Answer */}
//             <AnimatePresence>
//               {open === i && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <p className="px-6 pb-6 text-gray-300 text-sm leading-relaxed">
//                     {f.a}
//                   </p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         ))}
//       </div>

//     </section>
//   );
// }


//new final
// src/components/landing/FAQ.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";

export default function FAQ() {
  const faqs = [
    {
      q: "How accurate is the AI?",
      a: "Our AI evaluates clarity, correctness, confidence, tone, structure, and communication effectiveness in real time.",
    },
    {
      q: "Can I practice HR questions?",
      a: "Yes. PrepVision AI supports technical, HR, behavioral, and communication interview rounds.",
    },
    {
      q: "Will you use a custom model?",
      a: "Yes. We are actively working on fine-tuned, interview-specific AI models for higher accuracy.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="max-w-4xl mx-auto px-6 py-24 animate-fadeIn">
      
      {/* Header - Unified with other Light sections */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[11px] font-black uppercase tracking-[0.2em] rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
          <FiHelpCircle className="text-sm" />
          Support Center
        </span>

        <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Frequently Asked <br />
          <span className="text-indigo-600">Questions</span>
        </h2>

        <p className="text-slate-500 mt-6 max-w-xl mx-auto font-medium text-lg leading-relaxed">
          Everything you need to know about PrepVision AI and how it transforms your interview preparation.
        </p>
      </div>

      {/* FAQ List - Crystal Light Style */}
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <motion.div
            key={i}
            layout
            className={`
              rounded-[2rem] transition-all duration-300 border
              ${open === i 
                ? "bg-white border-indigo-200 shadow-xl shadow-indigo-100/50" 
                : "bg-white border-slate-200 hover:border-indigo-100 shadow-sm"}
            `}
          >
            {/* Question */}
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="
                w-full px-8 py-6
                flex justify-between items-center
                text-left transition-colors
              "
            >
              <span className={`text-lg font-bold tracking-tight transition-colors ${open === i ? "text-indigo-600" : "text-slate-800"}`}>
                {f.q}
              </span>

              <div className={`
                p-2 rounded-xl transition-all duration-300
                ${open === i ? "bg-indigo-600 text-white rotate-180 shadow-lg shadow-indigo-200" : "bg-slate-50 text-slate-400"}
              `}>
                <FiChevronDown size={20} />
              </div>
            </button>

            {/* Answer */}
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-8 pb-8">
                    <div className="w-full h-px bg-slate-100 mb-6" />
                    <p className="text-slate-500 text-base font-medium leading-relaxed">
                        {f.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Footer Contact Hint */}
      <div className="mt-12 text-center">
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
            Still have questions? <span className="text-indigo-600 hover:underline cursor-pointer">Contact our team</span>
          </p>
      </div>

    </section>
  );
}