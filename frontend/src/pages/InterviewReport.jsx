// import React from "react";
// import Navbar from "../components/Navbar";
// import { motion } from "framer-motion";

// export default function InterviewReport() {
//   const report = {
//     overallScore: 72,
//     verdict: "Good, but needs improvement",
//     communication: {
//       confidence: 7,
//       eyeContact: 6,
//       gestures: 5,
//       voiceClarity: 8,
//     },
//     technical: {
//       correct: 3,
//       wrong: 2,
//     },
//     questions: [
//       {
//         q: "Explain closures in JavaScript",
//         feedback: "Good explanation but missed lexical scope",
//         correctAnswer:
//           "A closure is a function that remembers variables from its outer scope even after execution.",
//       },
//       {
//         q: "What is REST API?",
//         feedback: "Correct but lacked real-world example",
//         correctAnswer:
//           "REST is an architectural style using HTTP methods like GET, POST, PUT, DELETE.",
//       },
//     ],
//     improvements: [
//       "Revise JavaScript closures",
//       "Practice system design basics",
//       "Improve eye contact while speaking",
//     ],
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen pt-28 px-6 text-white
//         bg-gradient-to-b from-black via-gray-900 to-black">

//         <div className="max-w-6xl mx-auto space-y-10">

//           {/* OVERALL SCORE */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white/10 border border-white/20
//             rounded-2xl p-8 text-center shadow-xl"
//           >
//             <h2 className="text-4xl font-extrabold text-purple-400">
//               Interview Report
//             </h2>

//             <div className="mt-6 text-6xl font-bold text-green-400">
//               {report.overallScore}/100
//             </div>

//             <p className="mt-2 text-gray-300">
//               {report.verdict}
//             </p>
//           </motion.div>

//           {/* COMMUNICATION */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             <div className="bg-white/10 border border-white/20
//               rounded-xl p-6 shadow">
//               <h3 className="text-xl font-semibold text-purple-300 mb-4">
//                 Communication Analysis
//               </h3>

//               {Object.entries(report.communication).map(([key, val]) => (
//                 <div key={key} className="mb-3">
//                   <div className="flex justify-between text-gray-300">
//                     <span className="capitalize">{key}</span>
//                     <span>{val}/10</span>
//                   </div>

//                   <div className="w-full bg-gray-800/40 rounded-full h-2 mt-1">
//                     <div
//                       className="h-2 bg-purple-500 rounded-full"
//                       style={{ width: `${val * 10}%` }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* TECHNICAL */}
//             <div className="bg-white/10 border border-white/20
//               rounded-xl p-6 shadow">
//               <h3 className="text-xl font-semibold text-purple-300 mb-4">
//                 Technical Performance
//               </h3>

//               <p className="text-gray-300">
//                 ✅ Correct Answers: {report.technical.correct}
//               </p>
//               <p className="text-gray-300">
//                 ❌ Wrong Answers: {report.technical.wrong}
//               </p>
//             </div>
//           </div>

//           {/* QUESTION FEEDBACK */}
//           <div className="bg-white/10 border border-white/20
//             rounded-xl p-6 shadow">
//             <h3 className="text-xl font-semibold text-purple-300 mb-4">
//               Question-wise Feedback
//             </h3>

//             {report.questions.map((q, idx) => (
//               <div
//                 key={idx}
//                 className="mb-6 p-4 bg-black/30
//                 border border-gray-700 rounded-lg"
//               >
//                 <p className="font-semibold text-white">{q.q}</p>

//                 <p className="mt-2 text-yellow-300">
//                   Feedback: {q.feedback}
//                 </p>

//                 <p className="mt-2 text-green-300">
//                   Correct Answer:
//                 </p>

//                 <pre className="whitespace-pre-wrap text-gray-300 mt-1">
//                   {q.correctAnswer}
//                 </pre>
//               </div>
//             ))}
//           </div>

//           {/* IMPROVEMENT PLAN */}
//           <div className="bg-white/10 border border-white/20
//             rounded-xl p-6 shadow">
//             <h3 className="text-xl font-semibold text-purple-300 mb-4">
//               What to Improve Next
//             </h3>

//             <ul className="list-disc list-inside text-gray-300">
//               {report.improvements.map((item, i) => (
//                 <li key={i}>{item}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


//dark mode
import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FiTrendingUp, FiCheckCircle, FiXCircle, FiMessageSquare, FiTarget } from "react-icons/fi";

export default function InterviewReport() {
  const report = {
    overallScore: 72,
    verdict: "Good, but needs improvement",
    communication: {
      confidence: 7,
      eyeContact: 6,
      gestures: 5,
      voiceClarity: 8,
    },
    technical: {
      correct: 3,
      wrong: 2,
    },
    questions: [
      {
        q: "Explain closures in JavaScript",
        feedback: "Good explanation but missed lexical scope",
        correctAnswer:
          "A closure is a function that remembers variables from its outer scope even after execution.",
      },
      {
        q: "What is REST API?",
        feedback: "Correct but lacked real-world example",
        correctAnswer:
          "REST is an architectural style using HTTP methods like GET, POST, PUT, DELETE.",
      },
    ],
    improvements: [
      "Revise JavaScript closures",
      "Practice system design basics",
      "Improve eye contact while speaking",
    ],
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-32 pb-16 px-6 transition-colors duration-300"
           style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>

        <div className="max-w-5xl mx-auto space-y-8">

          {/* OVERALL SCORE - Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-10 text-center shadow-2xl relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 blur-[100px] pointer-events-none" />

            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-4">
              AI Analysis Result
            </h2>

            <div className="text-7xl font-black tracking-tighter mb-4" style={{ color: "var(--accent)" }}>
              {report.overallScore}<span className="text-2xl opacity-30 text-[var(--text-primary)]">/100</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
              <FiTrendingUp /> {report.verdict}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* COMMUNICATION */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <FiMessageSquare className="text-[var(--accent)]" />
                <h3 className="text-xl font-bold tracking-tight">Communication</h3>
              </div>

              <div className="space-y-5">
                {Object.entries(report.communication).map(([key, val]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="capitalize text-[var(--text-secondary)]">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span style={{ color: "var(--accent)" }}>{val}/10</span>
                    </div>

                    <div className="w-full bg-[var(--bg-primary)] rounded-full h-1.5 border border-[var(--border-color)]">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${val * 10}%`, backgroundColor: "var(--accent)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TECHNICAL PERFORMANCE */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <FiTarget className="text-[var(--accent)]" />
                <h3 className="text-xl font-bold tracking-tight">Performance</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                   <div className="flex items-center gap-3">
                      <FiCheckCircle className="text-emerald-500" />
                      <span className="text-sm font-bold">Correct Answers</span>
                   </div>
                   <span className="text-xl font-black text-emerald-500">{report.technical.correct}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                   <div className="flex items-center gap-3">
                      <FiXCircle className="text-rose-500" />
                      <span className="text-sm font-bold">Wrong Answers</span>
                   </div>
                   <span className="text-xl font-black text-rose-500">{report.technical.wrong}</span>
                </div>
              </div>
            </div>
          </div>

          {/* QUESTION FEEDBACK */}
          <div className="card p-8">
            <h3 className="text-xl font-bold tracking-tight mb-8">Detailed Feedback</h3>

            <div className="space-y-6">
              {report.questions.map((q, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-[var(--bg-primary)] border border-[var(--border-color)] relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)] opacity-50" />
                  <p className="font-bold text-lg mb-4">{q.q}</p>

                  <div className="space-y-4">
                    <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl">
                       <p className="text-xs font-black uppercase tracking-widest text-amber-500 mb-1">AI Critique</p>
                       <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">"{q.feedback}"</p>
                    </div>

                    <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl">
                       <p className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-1">Model Answer</p>
                       <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                         {q.correctAnswer}
                       </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IMPROVEMENT PLAN */}
          <div className="card p-8 border-dashed border-[var(--accent)]/30" style={{ backgroundColor: "rgba(129, 140, 248, 0.02)" }}>
            <h3 className="text-xl font-bold tracking-tight mb-6">Preparation Roadmap</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.improvements.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[var(--text-secondary)] text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}