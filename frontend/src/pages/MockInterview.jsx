// import React from "react";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";
// import { FaKeyboard, FaVideo } from "react-icons/fa";
// import { motion } from "framer-motion";
// // import { API } from "../api/api"; // ✅ ADD THIS
// import API from "../api/api";

// export default function MockInterviewHome() {
//   const navigate = useNavigate();

//   /* -------------------------------
//      START LIVE INTERVIEW (FIX)
//   -------------------------------- */
//   const startLiveInterview = async () => {
//     try {
//       const res = await API.post("/live-interview/start", {
//         topic: "General",
//         role: "SDE",
//       });

//       navigate(`/mock/live/session/${res.data._id}`);
//     } catch (err) {
//       alert("Failed to start live interview");
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div
//         className="min-h-screen pt-28 px-6 text-white
//         bg-gradient-to-b from-black via-gray-900 to-black"
//       >
//         <div className="max-w-5xl mx-auto text-center">

//           {/* TITLE */}
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-4xl md:text-5xl font-extrabold
//             bg-gradient-to-r from-purple-400 to-blue-400
//             text-transparent bg-clip-text"
//           >
//             Mock Interview
//           </motion.h1>

//           <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
//             Practice interviews powered by AI.
//             Choose your preferred interview style.
//           </p>

//           {/* CARDS */}
//           <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">

//             {/* WRITTEN */}
//             <motion.div
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => navigate("/mock/written")}
//               className="cursor-pointer relative p-8 rounded-2xl
//               bg-white/10 backdrop-blur-xl border border-white/20
//               hover:border-purple-500 transition-all"
//             >
//               <FaKeyboard size={36} className="text-purple-400 mx-auto" />

//               <h2 className="text-2xl font-bold mt-5">
//                 Written Interview
//               </h2>

//               <p className="text-gray-300 mt-3">
//                 Answer interview questions by typing.
//                 AI evaluates correctness and depth.
//               </p>

//               <ul className="mt-5 text-sm text-gray-400 space-y-1">
//                 <li>• Topic-based questions</li>
//                 <li>• Logical evaluation</li>
//                 <li>• Detailed feedback</li>
//               </ul>

//               <span
//                 className="absolute top-4 right-4
//                 text-xs px-3 py-1 rounded-full
//                 bg-purple-600/20 text-purple-300"
//               >
//                 Beginner Friendly
//               </span>
//             </motion.div>

//             {/* LIVE (FIXED) */}
//             <motion.div
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={startLiveInterview}  
//               className="cursor-pointer relative p-8 rounded-2xl
//               bg-white/10 backdrop-blur-xl border border-white/20
//               hover:border-blue-500 transition-all"
//             >
//               <FaVideo size={36} className="text-blue-400 mx-auto" />

//               <h2 className="text-2xl font-bold mt-5">
//                 Live AI Interview
//               </h2>

//               <p className="text-gray-300 mt-3">
//                 Real interview using camera, microphone and AI voice.
//               </p>

//               <ul className="mt-5 text-sm text-gray-400 space-y-1">
//                 <li>• Voice-based questions</li>
//                 <li>• Gesture & eye-contact feedback</li>
//                 <li>• Confidence analysis</li>
//               </ul>

//               <span
//                 className="absolute top-4 right-4
//                 text-xs px-3 py-1 rounded-full
//                 bg-blue-600/20 text-blue-300"
//               >
//                 ⭐ Recommended
//               </span>
//             </motion.div>

//           </div>

//           {/* FOOT NOTE */}
//           <p className="mt-10 text-sm text-gray-500">
//             ⚠ Live interview requires camera & microphone access
//           </p>

//         </div>
//       </div>
//     </>
//   );
// }


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaKeyboard, FaVideo } from "react-icons/fa";
// import { motion } from "framer-motion";
// import API from "../api/api";

// export default function MockInterviewHome() {
//   const navigate = useNavigate();

//   const startLiveInterview = async () => {
//     try {
//       const res = await API.post("/live-interview/start", {
//         topic: "General",
//         role: "SDE",
//       });

//       navigate(`/mock/live/session/${res.data._id}`);
//     } catch (err) {
//       alert("Failed to start live interview");
//     }
//   };

//   return (
//     <div
//       className="
//         min-h-[calc(100vh-4rem)]
//         px-6 py-10 text-white
//         bg-gradient-to-b from-black via-gray-900 to-black
//       "
//     >
//       <div className="max-w-5xl mx-auto text-center">

//         {/* TITLE */}
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-4xl md:text-5xl font-extrabold
//           bg-gradient-to-r from-purple-400 to-blue-400
//           text-transparent bg-clip-text"
//         >
//           Mock Interview
//         </motion.h1>

//         <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
//           Practice interviews powered by AI.
//           Choose your preferred interview style.
//         </p>

//         {/* CARDS */}
//         <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">

//           {/* WRITTEN */}
//           <motion.div
//             whileHover={{ scale: 1.04 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => navigate("/mock/written")}
//             className="cursor-pointer relative p-8 rounded-2xl
//             bg-white/10 backdrop-blur-xl border border-white/20
//             hover:border-purple-500 transition-all"
//           >
//             <FaKeyboard size={36} className="text-purple-400 mx-auto" />

//             <h2 className="text-2xl font-bold mt-5">
//               Written Interview
//             </h2>

//             <p className="text-gray-300 mt-3">
//               Answer interview questions by typing.
//               AI evaluates correctness and depth.
//             </p>

//             <ul className="mt-5 text-sm text-gray-400 space-y-1">
//               <li>• Topic-based questions</li>
//               <li>• Logical evaluation</li>
//               <li>• Detailed feedback</li>
//             </ul>

//             <span
//               className="absolute top-4 right-4
//               text-xs px-3 py-1 rounded-full
//               bg-purple-600/20 text-purple-300"
//             >
//               Beginner Friendly
//             </span>
//           </motion.div>

//           {/* LIVE */}
//           <motion.div
//             whileHover={{ scale: 1.04 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={startLiveInterview}
//             className="cursor-pointer relative p-8 rounded-2xl
//             bg-white/10 backdrop-blur-xl border border-white/20
//             hover:border-blue-500 transition-all"
//           >
//             <FaVideo size={36} className="text-blue-400 mx-auto" />

//             <h2 className="text-2xl font-bold mt-5">
//               Live AI Interview
//             </h2>

//             <p className="text-gray-300 mt-3">
//               Real interview using camera, microphone and AI voice.
//             </p>

//             <ul className="mt-5 text-sm text-gray-400 space-y-1">
//               <li>• Voice-based questions</li>
//               <li>• Gesture & eye-contact feedback</li>
//               <li>• Confidence analysis</li>
//             </ul>

//             <span
//               className="absolute top-4 right-4
//               text-xs px-3 py-1 rounded-full
//               bg-blue-600/20 text-blue-300"
//             >
//               ⭐ Recommended
//             </span>
//           </motion.div>

//         </div>

//         {/* FOOT NOTE */}
//         <p className="mt-10 text-sm text-gray-500">
//           ⚠ Live interview requires camera & microphone access
//         </p>

//       </div>
//     </div>
//   );
// }


//new final

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaKeyboard, FaVideo } from "react-icons/fa";
// import { motion } from "framer-motion";
// import API from "../api/api";
// import { FiCheckCircle, FiInfo } from "react-icons/fi";

// export default function MockInterviewHome() {
//   const navigate = useNavigate();

//   const startLiveInterview = async () => {
//     try {
//       const res = await API.post("/live-interview/start", {
//         topic: "General",
//         role: "SDE",
//       });

//       navigate(`/mock/live/session/${res.data._id}`);
//     } catch (err) {
//       alert("Failed to start live interview");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-6 py-12 animate-fadeIn">
//       <div className="max-w-5xl mx-auto">

//         {/* TITLE SECTION */}
//         <div className="text-center mb-16">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-5xl md:text-6xl font-black tracking-tight text-slate-900"
//           >
//             Mock <span className="text-indigo-600">Interview</span>
//           </motion.h1>

//           <p className="text-slate-500 mt-6 text-lg max-w-2xl mx-auto font-medium">
//             Master your delivery with AI-powered simulations. 
//             Choose the style that fits your current goals.
//           </p>
//         </div>

//         {/* INTERVIEW MODE CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

//           {/* WRITTEN INTERVIEW */}
//           <motion.div
//             whileHover={{ y: -8, scale: 1.01 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => navigate("/mock/written")}
//             className="group cursor-pointer relative p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/40 hover:border-purple-300 hover:shadow-purple-100 transition-all duration-300"
//           >
//             <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
//               <FaKeyboard size={30} className="text-purple-600 group-hover:text-white" />
//             </div>

//             <h2 className="text-3xl font-black text-slate-900 tracking-tight">
//               Written <br /> Interview
//             </h2>

//             <p className="text-slate-500 mt-4 font-medium leading-relaxed">
//               Perfect your technical articulation. Type your answers and let AI evaluate your logic and depth.
//             </p>

//             <div className="mt-8 space-y-3">
//               {[
//                 "Topic-based questions",
//                 "Logical evaluation",
//                 "Detailed feedback report"
//               ].map((item) => (
//                 <div key={item} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
//                   <FiCheckCircle className="text-purple-500" />
//                   {item}
//                 </div>
//               ))}
//             </div>

//             <span className="absolute top-6 right-6 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 border border-purple-100">
//               Beginner Friendly
//             </span>
//           </motion.div>

//           {/* LIVE AI INTERVIEW */}
//           <motion.div
//             whileHover={{ y: -8, scale: 1.01 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={startLiveInterview}
//             className="group cursor-pointer relative p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/40 hover:border-indigo-300 hover:shadow-indigo-100 transition-all duration-300"
//           >
//             <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
//               <FaVideo size={30} className="text-indigo-600 group-hover:text-white" />
//             </div>

//             <h2 className="text-3xl font-black text-slate-900 tracking-tight">
//               Live AI <br /> Interview
//             </h2>

//             <p className="text-slate-500 mt-4 font-medium leading-relaxed">
//               The ultimate simulation. Practice with camera, mic, and real-time AI voice interaction.
//             </p>

//             <div className="mt-8 space-y-3">
//               {[
//                 "Voice-based interaction",
//                 "Gesture & Eye-contact feedback",
//                 "Advanced confidence analysis"
//               ].map((item) => (
//                 <div key={item} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
//                   <FiCheckCircle className="text-indigo-500" />
//                   {item}
//                 </div>
//               ))}
//             </div>

//             <span className="absolute top-6 right-6 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-100">
//               ⭐ Recommended
//             </span>
//           </motion.div>

//         </div>

//         {/* FOOTER NOTE */}
//         <div className="mt-16 flex items-center justify-center gap-3 text-slate-400 bg-white/50 border border-slate-100 py-3 px-6 rounded-2xl max-w-fit mx-auto shadow-sm">
//           <FiInfo className="text-indigo-500" />
//           <p className="text-sm font-bold uppercase tracking-tight">
//             Live interview requires camera & microphone access
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }

//dark mode
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaKeyboard, FaVideo } from "react-icons/fa";
// import { motion } from "framer-motion";
// import API from "../api/api";
// import { FiCheckCircle, FiInfo } from "react-icons/fi";

// export default function MockInterviewHome() {
//   const navigate = useNavigate();

//   const startLiveInterview = async () => {
//     try {
//       const res = await API.post("/live-interview/start", {
//         topic: "General",
//         role: "SDE",
//       });
//       navigate(`/mock/live/session/${res.data._id}`);
//     } catch (err) {
//       alert("Failed to start live interview");
//     }
//   };

//   return (
//     <div className="min-h-screen px-6 py-12 animate-fadeIn transition-colors duration-500"
//          style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
//       <div className="max-w-5xl mx-auto">

//         {/* TITLE SECTION */}
//         <div className="text-center mb-16 relative">
//           {/* Subtle background glow */}
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 blur-[100px] -z-10" />
          
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-5xl md:text-6xl font-black tracking-tighter"
//           >
//             Mock <span style={{ color: "var(--accent)" }}>Interview</span>
//           </motion.h1>

//           <p className="mt-6 text-lg max-w-2xl mx-auto font-medium" style={{ color: "var(--text-secondary)" }}>
//             Master your delivery with AI-powered simulations. 
//             Choose the style that fits your current goals.
//           </p>
//         </div>

//         {/* INTERVIEW MODE CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

//           {/* WRITTEN INTERVIEW */}
//           <motion.div
//             whileHover={{ y: -8, scale: 1.01 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => navigate("/mock/written")}
//             className="group cursor-pointer relative p-10 rounded-[2.5rem] border transition-all duration-300 shadow-2xl"
//             style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
//           >
//             <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 border"
//                  style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "#a855f7" }}>
//               <FaKeyboard size={30} className="group-hover:scale-110 transition-transform" />
//             </div>

//             <h2 className="text-3xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
//               Written <br /> Interview
//             </h2>

//             <p className="mt-4 font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>
//               Perfect your technical articulation. Type your answers and let AI evaluate your logic and depth.
//             </p>

//             <div className="mt-8 space-y-3">
//               {[
//                 "Topic-based questions",
//                 "Logical evaluation",
//                 "Detailed feedback report"
//               ].map((item) => (
//                 <div key={item} className="flex items-center gap-3 font-bold text-sm">
//                   <FiCheckCircle style={{ color: "#a855f7" }} />
//                   {item}
//                 </div>
//               ))}
//             </div>

//             <span className="absolute top-6 right-6 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border"
//                   style={{ backgroundColor: "rgba(168, 85, 247, 0.1)", color: "#a855f7", borderColor: "rgba(168, 85, 247, 0.2)" }}>
//               Beginner Friendly
//             </span>
//           </motion.div>

//           {/* LIVE AI INTERVIEW */}
//           <motion.div
//             whileHover={{ y: -8, scale: 1.01 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={startLiveInterview}
//             className="group cursor-pointer relative p-10 rounded-[2.5rem] border transition-all duration-300 shadow-2xl"
//             style={{ 
//                 backgroundColor: "var(--bg-card)", 
//                 borderColor: "var(--accent)", // Highlighted border for recommendation
//                 boxShadow: "0 20px 40px -15px rgba(99, 102, 241, 0.15)"
//             }}
//           >
//             <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white transition-all duration-300 shadow-lg"
//                  style={{ backgroundColor: "var(--accent)", boxShadow: "0 10px 20px -5px rgba(99, 102, 241, 0.4)" }}>
//               <FaVideo size={30} className="group-hover:rotate-6 transition-transform" />
//             </div>

//             <h2 className="text-3xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
//               Live AI <br /> Interview
//             </h2>

//             <p className="mt-4 font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>
//               The ultimate simulation. Practice with camera, mic, and real-time AI voice interaction.
//             </p>

//             <div className="mt-8 space-y-3">
//               {[
//                 "Voice-based interaction",
//                 "Gesture & Eye-contact feedback",
//                 "Advanced confidence analysis"
//               ].map((item) => (
//                 <div key={item} className="flex items-center gap-3 font-bold text-sm">
//                   <FiCheckCircle style={{ color: "var(--accent)" }} />
//                   {item}
//                 </div>
//               ))}
//             </div>

//             <span className="absolute top-6 right-6 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full text-white shadow-lg"
//                   style={{ backgroundColor: "var(--accent)" }}>
//               ⭐ Recommended
//             </span>
//           </motion.div>

//         </div>

//         {/* FOOTER NOTE */}
//         <div className="mt-16 flex items-center justify-center gap-3 py-3 px-6 rounded-2xl max-w-fit mx-auto shadow-sm border"
//              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
//           <FiInfo style={{ color: "var(--accent)" }} />
//           <p className="text-sm font-bold uppercase tracking-tight">
//             Live interview requires camera & microphone access
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }

//next acc claude code
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaKeyboard, FaVideo } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/api";
import { FiCheckCircle, FiInfo, FiX, FiLoader, FiChevronDown } from "react-icons/fi";

/* ── Config options ── */
const TOPICS = [
  "Data Structures & Algorithms", "System Design", "DBMS", "Operating Systems",
  "Computer Networks", "Object Oriented Programming", "JavaScript", "React",
  "Node.js", "Python", "Java", "SQL", "Machine Learning", "General",
];

const ROLES = [
  "Software Development Engineer (SDE)",
  "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "Data Engineer", "ML Engineer", "DevOps Engineer", "Product Manager",
];

const DIFFICULTIES = [
  { value: "Easy",   label: "Easy",   desc: "6 questions · 2 min each · Beginner",  color: "#10b981" },
  { value: "Medium", label: "Medium", desc: "9 questions · 90 sec each · Intermediate", color: "#f59e0b" },
  { value: "Hard",   label: "Hard",   desc: "12 questions · 60 sec each · Advanced", color: "#f43f5e" },
];

export default function MockInterviewHome() {
  const navigate = useNavigate();

  const [showModal, setShowModal]       = useState(false);
  const [topic, setTopic]               = useState("Data Structures & Algorithms");
  const [role, setRole]                 = useState("Software Development Engineer (SDE)");
  const [difficulty, setDifficulty]     = useState("Medium");
  const [isStarting, setIsStarting]     = useState(false);
  const [error, setError]               = useState("");

  const openModal = () => {
    setError("");
    setShowModal(true);
  };

  const startLiveInterview = async () => {
    setIsStarting(true);
    setError("");
    try {
      const res = await API.post("/live-interview/start", { topic, role, difficulty });

      // Controller returns { sessionId, questions, topic, role, difficulty, ... }
      const sessionId = res.data.sessionId;
      if (!sessionId) throw new Error("No session ID returned");

      setShowModal(false);
      navigate(`/mock/live/session/${sessionId}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to start interview. Please try again.");
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 animate-fadeIn transition-colors duration-500"
         style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <div className="max-w-5xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 blur-[100px] -z-10" />
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                     className="text-5xl md:text-6xl font-black tracking-tighter">
            Mock <span style={{ color: "var(--accent)" }}>Interview</span>
          </motion.h1>
          <p className="mt-6 text-lg max-w-2xl mx-auto font-medium" style={{ color: "var(--text-secondary)" }}>
            Master your delivery with AI-powered simulations.
            Choose the style that fits your current goals.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          {/* Written Interview */}
          <motion.div whileHover={{ y: -8, scale: 1.01 }} whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/mock/written")}
            className="group cursor-pointer relative p-10 rounded-[2.5rem] border transition-all duration-300 shadow-2xl"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border"
                 style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "#a855f7" }}>
              <FaKeyboard size={30} className="group-hover:scale-110 transition-transform" />
            </div>
            <h2 className="text-3xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              Written <br /> Interview
            </h2>
            <p className="mt-4 font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Perfect your technical articulation. Type your answers and let AI evaluate your logic and depth.
            </p>
            <div className="mt-8 space-y-3">
              {["Topic-based questions", "Logical evaluation", "Detailed feedback report"].map((item) => (
                <div key={item} className="flex items-center gap-3 font-bold text-sm">
                  <FiCheckCircle style={{ color: "#a855f7" }} /> {item}
                </div>
              ))}
            </div>
            <span className="absolute top-6 right-6 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border"
                  style={{ backgroundColor: "rgba(168,85,247,0.1)", color: "#a855f7", borderColor: "rgba(168,85,247,0.2)" }}>
              Beginner Friendly
            </span>
          </motion.div>

          {/* Live AI Interview */}
          <motion.div whileHover={{ y: -8, scale: 1.01 }} whileTap={{ scale: 0.98 }}
            onClick={openModal}
            className="group cursor-pointer relative p-10 rounded-[2.5rem] border transition-all duration-300 shadow-2xl"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--accent)", boxShadow: "0 20px 40px -15px rgba(99,102,241,0.15)" }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg"
                 style={{ backgroundColor: "var(--accent)", boxShadow: "0 10px 20px -5px rgba(99,102,241,0.4)" }}>
              <FaVideo size={30} className="group-hover:rotate-6 transition-transform" />
            </div>
            <h2 className="text-3xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              Live AI <br /> Interview
            </h2>
            <p className="mt-4 font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              The ultimate simulation. Practice with camera, mic, and real-time AI voice interaction.
            </p>
            <div className="mt-8 space-y-3">
              {["Voice-based interaction", "Adaptive difficulty", "AI follow-up questions"].map((item) => (
                <div key={item} className="flex items-center gap-3 font-bold text-sm">
                  <FiCheckCircle style={{ color: "var(--accent)" }} /> {item}
                </div>
              ))}
            </div>
            <span className="absolute top-6 right-6 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full text-white shadow-lg"
                  style={{ backgroundColor: "var(--accent)" }}>
              ⭐ Recommended
            </span>
          </motion.div>
        </div>

        {/* Footer note */}
        <div className="mt-16 flex items-center justify-center gap-3 py-3 px-6 rounded-2xl max-w-fit mx-auto shadow-sm border"
             style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
          <FiInfo style={{ color: "var(--accent)" }} />
          <p className="text-sm font-bold uppercase tracking-tight">
            Live interview requires camera & microphone access
          </p>
        </div>
      </div>

      {/* ── SETUP MODAL ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
            onClick={(e) => e.target === e.currentTarget && !isStarting && setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-[2rem] border shadow-2xl p-8"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>
                    Configure Interview
                  </h3>
                  <p className="text-sm font-medium mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    AI will generate questions based on your selections
                  </p>
                </div>
                {!isStarting && (
                  <button onClick={() => setShowModal(false)}
                    className="p-2 rounded-xl hover:bg-white/5 transition-all"
                    style={{ color: "var(--text-secondary)" }}>
                    <FiX size={20} />
                  </button>
                )}
              </div>

              {/* Topic */}
              <div className="mb-5">
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2"
                       style={{ color: "var(--text-secondary)" }}>Topic</label>
                <div className="relative">
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    disabled={isStarting}
                    className="w-full appearance-none px-4 py-3 rounded-2xl border text-sm font-bold outline-none transition-all disabled:opacity-50"
                    style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
                  >
                    {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <FiChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                                 style={{ color: "var(--text-secondary)" }} />
                </div>
              </div>

              {/* Role */}
              <div className="mb-5">
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2"
                       style={{ color: "var(--text-secondary)" }}>Target Role</label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled={isStarting}
                    className="w-full appearance-none px-4 py-3 rounded-2xl border text-sm font-bold outline-none transition-all disabled:opacity-50"
                    style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
                  >
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <FiChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                                 style={{ color: "var(--text-secondary)" }} />
                </div>
              </div>

              {/* Difficulty */}
              <div className="mb-8">
                <label className="block text-[10px] font-black uppercase tracking-widest mb-3"
                       style={{ color: "var(--text-secondary)" }}>Difficulty</label>
                <div className="grid grid-cols-3 gap-3">
                  {DIFFICULTIES.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDifficulty(d.value)}
                      disabled={isStarting}
                      className="p-3 rounded-2xl border text-center transition-all disabled:opacity-50"
                      style={{
                        backgroundColor: difficulty === d.value ? `${d.color}15` : "var(--bg-primary)",
                        borderColor: difficulty === d.value ? d.color : "var(--border-color)",
                      }}
                    >
                      <p className="font-black text-sm" style={{ color: difficulty === d.value ? d.color : "var(--text-primary)" }}>
                        {d.label}
                      </p>
                      <p className="text-[9px] font-bold mt-0.5 leading-tight" style={{ color: "var(--text-secondary)" }}>
                        {d.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-4 p-3 rounded-xl text-sm font-bold text-rose-400 border border-rose-500/20 bg-rose-500/5">
                  {error}
                </div>
              )}

              {/* Start button */}
              <button
                onClick={startLiveInterview}
                disabled={isStarting}
                className="w-full py-4 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70 shadow-xl"
                style={{ backgroundColor: "var(--accent)" }}
              >
                {isStarting ? (
                  <><FiLoader className="animate-spin" /> AI is generating questions...</>
                ) : (
                  <><FaVideo /> Start Live Interview</>
                )}
              </button>

              {isStarting && (
                <p className="text-center text-xs font-bold mt-3" style={{ color: "var(--text-secondary)" }}>
                  This may take 10–20 seconds...
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}