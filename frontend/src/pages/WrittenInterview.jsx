// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { startWrittenInterview } from "../api/writtenInterviewApi";

// const PRESET_TOPICS = ["DSA", "DBMS", "OS", "CN", "HR", "React"];

// export default function MockWrittenStart() {
//   const navigate = useNavigate();
//   const [topic, setTopic] = useState("");
//   const [level, setLevel] = useState("Medium");
//   const [loading, setLoading] = useState(false);

//   const startInterview = async () => {
//     if (!topic.trim()) return;

//     try {
//       setLoading(true);

//       // 🔥 CALL BACKEND
//       const session = await startWrittenInterview(topic, level);

//       // 🔥 NAVIGATE USING SESSION ID
//       navigate(`/mock/written/interview/${session._id}`);
//     } catch (err) {
//       alert("Failed to start interview");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen pt-28 px-6 text-white
//         bg-gradient-to-b from-black via-gray-900 to-black">

//         <div className="max-w-xl mx-auto">

//           {/* TITLE */}
//           <motion.h2
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-4xl font-extrabold text-center
//             bg-gradient-to-r from-purple-400 to-blue-400
//             text-transparent bg-clip-text"
//           >
//             Written Interview
//           </motion.h2>

//           <p className="text-gray-400 text-center mt-4">
//             Practice AI-generated interview questions by writing your answers.
//           </p>

//           {/* CARD */}
//           <div className="mt-10 p-8 rounded-2xl
//             bg-white/10 backdrop-blur-xl
//             border border-white/20 shadow-xl">

//             {/* TOPICS */}
//             <label className="text-sm text-gray-300">Select a Topic</label>

//             <div className="flex flex-wrap gap-3 mt-3">
//               {PRESET_TOPICS.map((t) => (
//                 <button
//                   key={t}
//                   onClick={() => setTopic(t)}
//                   className={`px-4 py-2 rounded-full text-sm border transition
//                     ${
//                       topic === t
//                         ? "bg-purple-600/30 border-purple-500 text-white"
//                         : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
//                     }`}
//                 >
//                   {t}
//                 </button>
//               ))}
//             </div>

//             {/* CUSTOM TOPIC */}
//             <div className="mt-4">
//               <input
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)}
//                 placeholder="Or enter a custom topic (e.g. Kubernetes)"
//                 className="w-full p-3 rounded-lg
//                 bg-gray-900/50 border border-gray-700
//                 focus:ring-2 focus:ring-purple-500 outline-none"
//               />
//             </div>

//             {/* LEVEL */}
//             <label className="text-sm text-gray-300 mt-6 block">
//               Difficulty Level
//             </label>

//             <div className="flex gap-3 mt-3">
//               {["Easy", "Medium", "Hard"].map((l) => (
//                 <button
//                   key={l}
//                   onClick={() => setLevel(l)}
//                   className={`flex-1 py-2 rounded-lg border transition
//                     ${
//                       level === l
//                         ? "bg-blue-600/30 border-blue-500 text-white"
//                         : "bg-white/5 border-white/20 text-gray-300"
//                     }`}
//                 >
//                   {l}
//                 </button>
//               ))}
//             </div>

//             {/* INFO */}
//             <div className="mt-6 text-sm text-gray-400 space-y-2">
//               <p>• 5 AI-generated questions</p>
//               <p>• Timed evaluation</p>
//               <p>• AI feedback + correct answers</p>
//             </div>

//             {/* START */}
//             <button
//               onClick={startInterview}
//               disabled={!topic.trim() || loading}
//               className={`w-full mt-8 py-3 rounded-lg font-semibold transition
//                 ${
//                   loading
//                     ? "bg-gray-600 cursor-not-allowed"
//                     : "bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
//                 }`}
//             >
//               {loading ? "Starting..." : "Start Written Interview"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


//dark mode
// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { startWrittenInterview } from "../api/writtenInterviewApi";
// import { FiBookOpen, FiZap, FiLayers, FiCheckCircle } from "react-icons/fi";

// const PRESET_TOPICS = ["DSA", "DBMS", "OS", "CN", "HR", "React"];

// export default function MockWrittenStart() {
//   const navigate = useNavigate();
//   const [topic, setTopic] = useState("");
//   const [level, setLevel] = useState("Medium");
//   const [loading, setLoading] = useState(false);

//   const startInterview = async () => {
//     if (!topic.trim()) return;
//     try {
//       setLoading(true);
//       const session = await startWrittenInterview(topic, level);
//       navigate(`/mock/written/interview/${session._id}`);
//     } catch (err) {
//       alert("Failed to start interview");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen transition-colors duration-500 font-sans"
//          style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
//       <Navbar />

//       <div className="max-w-xl mx-auto pt-32 px-6 pb-20">
        
//         {/* TITLE */}
//         <div className="text-center mb-10">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="inline-flex p-3 rounded-2xl mb-4"
//             style={{ backgroundColor: "rgba(129, 140, 248, 0.1)", color: "var(--accent)" }}
//           >
//             <FiBookOpen size={32} />
//           </motion.div>
          
//           <motion.h2
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-4xl font-black tracking-tighter"
//           >
//             Written <span style={{ color: "var(--accent)" }}>Assessment</span>
//           </motion.h2>

//           <p className="mt-4 font-medium" style={{ color: "var(--text-secondary)" }}>
//             Practice AI-generated technical questions by articulating your answers in text.
//           </p>
//         </div>

//         {/* CARD */}
//         <div className="card p-8 rounded-[2.5rem] border shadow-2xl relative overflow-hidden"
//              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
          
//           {/* Decorative Glow */}
//           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -mr-16 -mt-16" />

//           {/* TOPICS */}
//           <div className="flex items-center gap-2 mb-4">
//             <FiLayers className="text-[var(--accent)]" size={14} />
//             <label className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
//               Core Domains
//             </label>
//           </div>

//           <div className="flex flex-wrap gap-2.5 mb-6">
//             {PRESET_TOPICS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTopic(t)}
//                 className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all active:scale-95
//                   ${topic === t
//                       ? "bg-indigo-500/10 border-indigo-500/40 text-[var(--accent)] shadow-[0_0_15px_rgba(99,102,241,0.1)]"
//                       : "bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-indigo-500/30"
//                   }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           {/* CUSTOM TOPIC */}
//           <input
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             placeholder="Or enter a custom topic (e.g. AWS, GraphQL)"
//             className="w-full p-4 rounded-2xl outline-none transition-all border font-medium text-sm mb-8"
//             style={{ 
//               backgroundColor: "var(--bg-primary)", 
//               borderColor: "var(--border-color)",
//               color: "var(--text-primary)"
//             }}
//           />

//           {/* LEVEL */}
//           <div className="flex items-center gap-2 mb-4">
//             <FiZap className="text-[var(--accent)]" size={14} />
//             <label className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
//               Complexity
//             </label>
//           </div>

//           <div className="flex gap-3 mb-10">
//             {["Easy", "Medium", "Hard"].map((l) => (
//               <button
//                 key={l}
//                 onClick={() => setLevel(l)}
//                 className={`flex-1 py-3 rounded-2xl border font-black text-[10px] uppercase tracking-widest transition-all active:scale-95
//                   ${level === l
//                       ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
//                       : "bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-secondary)]"
//                   }`}
//               >
//                 {l}
//               </button>
//             ))}
//           </div>

//           {/* INFO BULLETS */}
//           <div className="p-5 rounded-2xl space-y-3" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
//             {[
//               "5 Targeted AI-generated questions",
//               "Real-time timed evaluation",
//               "AI logic critique & model answers"
//             ].map((text, i) => (
//               <div key={i} className="flex items-center gap-3 text-xs font-bold" style={{ color: "var(--text-secondary)" }}>
//                 <FiCheckCircle className="text-emerald-500" />
//                 {text}
//               </div>
//             ))}
//           </div>

//           {/* START BUTTON */}
//           <button
//             onClick={startInterview}
//             disabled={!topic.trim() || loading}
//             className="group w-full mt-8 py-5 rounded-2xl font-black text-lg text-white shadow-xl transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3"
//             style={{ 
//               backgroundColor: loading ? "var(--bg-primary)" : "var(--accent)",
//               boxShadow: loading ? "none" : "0 10px 15px -3px rgba(99, 102, 241, 0.3)"
//             }}
//           >
//             {loading ? (
//               <><FiLoader className="animate-spin" /> Preparing...</>
//             ) : (
//               <><FiZap /> Launch Session</>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const FiLoader = (props) => (
//   <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
// );


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { startWrittenInterview } from "../api/writtenInterviewApi";
import { FiBookOpen, FiZap, FiLayers, FiCheckCircle, FiChevronRight, FiLoader } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

const PRESET_TOPICS = ["DSA", "DBMS", "OS", "CN", "HR", "React"];

export default function MockWrittenStart() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("Medium");
  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    // Necessary validation for Domain
    if (!topic.trim()) {
      toast.error("Please select or enter a domain topic first!", {
        style: {
          borderRadius: '12px',
          background: '#fee2e2',
          color: '#991b1b',
          fontWeight: 'bold',
        }
      });
      return;
    }

    const loadingToast = toast.loading("Starting interview in 10 sec... be ready!", {
      style: {
        borderRadius: '15px',
        background: '#1e293b',
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        border: '1px solid rgba(129, 140, 248, 0.2)'
      },
    });

    try {
      setLoading(true);
      const session = await startWrittenInterview(topic, level);
      toast.success("Session ready! Redirecting...", { id: loadingToast });
      navigate(`/mock/written/interview/${session._id}`);
    } catch (err) {
      toast.error("Failed to start interview", { 
        id: loadingToast,
        style: { borderRadius: '15px' }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden font-sans"
         style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      
      {/* Toast Provider positioned to the right side */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* LEFT SIDE: IMMERSIVE HERO */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center p-20 relative overflow-hidden border-r"
           style={{ borderColor: "var(--border-color)", backgroundColor: "#050a18" }}>
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 inline-block p-5 rounded-[2rem]"
            style={{ backgroundColor: "#818cf8", color: "#fff" }}
          >
            <FiBookOpen size={48} />
          </motion.div>
          
          <h1 className="text-8xl font-black tracking-tighter leading-[0.85] mb-8 text-white">
            PRACTICE <br /> 
            <span style={{ color: "#818cf8" }}>WRITTEN</span> <br />
            LOGIC.
          </h1>
          
          <p className="max-w-md text-xl font-medium leading-relaxed mb-12 opacity-80 text-gray-300">
            Articulate your technical thoughts. Our AI evaluates not just your answer, 
            but your communication logic and depth.
          </p>

          <div className="space-y-5">
            {[
              { text: "5 Targeted Questions", color: "text-emerald-400" },
              { text: "Instant AI Feedback", color: "text-emerald-400" },
              { text: "Detailed Logic Analysis", color: "text-emerald-400" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 text-lg font-bold text-gray-400">
                <FiCheckCircle className={item.color} size={20} /> {item.text}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      {/* RIGHT SIDE: INTERACTIVE FORM */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 relative overflow-y-auto">
        
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-12 text-center">
             <h2 className="text-4xl font-black tracking-tighter" style={{ color: "var(--accent)" }}>WRITTEN LOGIC</h2>
          </div>

          {/* TOPIC SELECTION */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-5 opacity-60">
              <FiLayers size={14} />
              <label className="text-xs font-black uppercase tracking-[0.2em]">Select Domain</label>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              {PRESET_TOPICS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`py-3.5 rounded-2xl text-xs font-bold border transition-all active:scale-95
                    ${topic === t
                        ? "bg-indigo-500/10 border-indigo-500 text-[var(--accent)] shadow-lg shadow-indigo-500/10"
                        : "bg-transparent border-[var(--border-color)] hover:border-indigo-500/40"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Or type a custom topic..."
              className={`w-full p-5 rounded-2xl outline-none border font-medium text-sm transition-all focus:ring-4 ${!topic && !loading ? 'border-dashed' : ''}`}
              style={{ 
                backgroundColor: "var(--bg-card)", 
                borderColor: topic ? "var(--border-color)" : "rgba(129, 140, 248, 0.3)",
                color: "var(--text-primary)"
              }}
            />
          </div>

          {/* LEVEL SELECTION */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-5 opacity-60">
              <FiZap size={14} />
              <label className="text-xs font-black uppercase tracking-[0.2em]">Complexity</label>
            </div>
            <div className="flex gap-3">
              {["Easy", "Medium", "Hard"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`flex-1 py-4 rounded-2xl border font-black text-[10px] uppercase tracking-widest transition-all active:scale-95
                    ${level === l
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-500"
                        : "bg-transparent border-[var(--border-color)] hover:border-emerald-500/30"
                    }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* ACTION */}
          <button
            onClick={startInterview}
            disabled={loading}
            className="group w-full py-6 rounded-[2rem] font-black text-xl text-white shadow-2xl transition-all flex items-center justify-center gap-4 hover:gap-6 active:scale-[0.98]"
            style={{ 
              backgroundColor: loading ? "var(--border-color)" : "var(--accent)",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 20px 40px -12px rgba(99, 102, 241, 0.35)"
            }}
          >
            {loading ? (
              <><FiLoader className="animate-spin" /> GENERATING...</>
            ) : (
              <>LAUNCH SESSION <FiChevronRight size={24} /></>
            )}
          </button>
          
          <p className="text-center mt-8 text-[10px] font-bold opacity-30 tracking-[0.3em] uppercase">
            AI-POWERED EVALUATION ENGINE
          </p>
        </div>
      </div>
    </div>
  );
}