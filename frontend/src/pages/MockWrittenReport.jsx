// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { motion } from "framer-motion";
// import { getWrittenInterviewSession } from "../api/writtenInterviewApi";

// export default function MockWrittenReport() {
//   const { sessionId } = useParams();
//   const navigate = useNavigate();

//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   /* -------------------------------
//      FETCH SESSION
//   -------------------------------- */
//   useEffect(() => {
//     if (!sessionId) {
//       navigate("/mock");
//       return;
//     }

//     getWrittenInterviewSession(sessionId)
//       .then((data) => {
//         setSession(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         navigate("/mock");
//       });
//   }, [sessionId, navigate]);

//   /* -------------------------------
//      LOADING STATE
//   -------------------------------- */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Loading interview report...
//       </div>
//     );
//   }

//   if (!session) return null;

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen pt-28 px-6 text-white bg-gradient-to-b from-black via-gray-900 to-black">
//         <div className="max-w-5xl mx-auto">

//           {/* HEADER */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-10"
//           >
//             <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
//               Interview Report
//             </h1>
//             <p className="text-gray-400 mt-2">
//               {session.topic} • {session.level} Level
//             </p>
//           </motion.div>

//           {/* QUESTIONS */}
//           <div className="space-y-6">
//             {session.questions.map((q, idx) => (
//               <div
//                 key={q._id}
//                 className="p-6 rounded-2xl bg-white/10 border border-white/20 shadow-lg"
//               >
//                 <h3 className="text-lg font-semibold text-white">
//                   Q{idx + 1}. {q.question}
//                 </h3>

//                 <p className="mt-3 text-gray-300">
//                   <span className="text-gray-400">Your Answer:</span>
//                   <br />
//                   {q.userAnswer || "— Not Answered —"}
//                 </p>

//                 <div className="mt-4 flex gap-4 text-sm">
//                   <span className="px-3 py-1 rounded-full bg-green-600/20 text-green-300">
//                     Score: {q.aiScore ?? "—"}
//                   </span>

//                   <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-300">
//                     {q.aiFeedback || "Feedback Pending"}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ACTIONS */}
//           <div className="mt-10">
//             <button
//               onClick={() => navigate("/mock")}
//               className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
//             >
//               Take Another Interview
//             </button>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }


//dark mode
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { getWrittenInterviewSession } from "../api/writtenInterviewApi";
import { FiAward, FiBookOpen, FiCornerDownRight, FiLoader, FiRotateCcw } from "react-icons/fi";

export default function MockWrittenReport() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      navigate("/mock");
      return;
    }

    getWrittenInterviewSession(sessionId)
      .then((data) => {
        setSession(data);
        setLoading(false);
      })
      .catch(() => {
        navigate("/mock");
      });
  }, [sessionId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center transition-colors duration-300"
           style={{ backgroundColor: "var(--bg-primary)" }}>
        <FiLoader className="w-10 h-10 animate-spin mb-4" style={{ color: "var(--accent)" }} />
        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>
          Compiling AI Insights...
        </p>
      </div>
    );
  }

  if (!session) return null;

  // Calculate Average Score
  const avgScore = session.questions.reduce((acc, curr) => acc + (curr.aiScore || 0), 0) / session.questions.length;

  return (
    <div className="min-h-screen transition-colors duration-300 font-sans"
         style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Navbar />

      <div className="max-w-4xl mx-auto pt-32 px-6 pb-20">
        
        {/* HEADER & SUMMARY CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-10 rounded-[2.5rem] relative overflow-hidden mb-12"
        >
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <FiAward size={150} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4"
                   style={{ backgroundColor: "rgba(129, 140, 248, 0.1)", borderColor: "rgba(129, 140, 248, 0.2)", color: "var(--accent)" }}>
                <span className="text-[10px] font-black uppercase tracking-widest">Written Assessment</span>
              </div>
              <h1 className="text-5xl font-black tracking-tighter leading-tight">
                Interview <span style={{ color: "var(--accent)" }}>Report</span>
              </h1>
              <p className="mt-2 font-medium" style={{ color: "var(--text-secondary)" }}>
                {session.topic} • {session.level} Level
              </p>
            </div>

            <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: "var(--text-secondary)" }}>Overall Performance</p>
                <div className="text-6xl font-black tracking-tighter" style={{ color: "var(--accent)" }}>
                    {Math.round(avgScore)}%
                </div>
            </div>
          </div>
        </motion.div>

        {/* QUESTIONS BREAKDOWN */}
        <div className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] ml-2 mb-4" style={{ color: "var(--text-secondary)" }}>
            Response Breakdown
          </h2>
          
          {session.questions.map((q, idx) => (
            <div
              key={q._id}
              className="card p-8 rounded-[2rem] border transition-all hover:border-[var(--accent)]"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
            >
              <div className="flex justify-between items-start gap-4 mb-6">
                <h3 className="text-xl font-bold tracking-tight max-w-2xl leading-snug">
                  <span className="opacity-30 mr-2">0{idx + 1}.</span> {q.question}
                </h3>
                <div className="px-4 py-1.5 rounded-xl border text-sm font-black tracking-tighter"
                     style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--accent)" }}>
                  {q.aiScore ?? "—"}/10
                </div>
              </div>

              {/* USER ANSWER */}
              <div className="mb-6 p-5 rounded-2xl border" style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)" }}>
                <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest opacity-40">
                    <FiCornerDownRight /> Your Response
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-medium">
                  {q.userAnswer || "— Not Answered —"}
                </p>
              </div>

              {/* AI FEEDBACK */}
              <div className="p-5 rounded-2xl border" 
                   style={{ backgroundColor: "rgba(129, 140, 248, 0.05)", borderColor: "rgba(129, 140, 248, 0.1)" }}>
                <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                    <FiBookOpen /> AI Feedback
                </div>
                <p className="text-sm leading-relaxed font-semibold italic" style={{ color: "var(--text-primary)" }}>
                  "{q.aiFeedback || "Processing feedback..."}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate("/mock")}
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:translate-y-[-2px] active:scale-95"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
          >
            <FiRotateCcw className="group-hover:rotate-[-45deg] transition-transform" />
            Take Another Interview
          </button>
        </div>

      </div>
    </div>
  );
}