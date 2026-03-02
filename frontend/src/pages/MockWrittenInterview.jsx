// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { useNavigate, useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   submitWrittenAnswer,
//   finishWrittenInterview,
// } from "../api/writtenInterviewApi";
// // import { API } from "../api/api";
// import API from "../api/api";

// export default function MockWrittenInterview() {
//   const navigate = useNavigate();
//   const { sessionId } = useParams();

//   const [session, setSession] = useState(null);
//   const [current, setCurrent] = useState(0);
//   const [answer, setAnswer] = useState("");
//   const [timeLeft, setTimeLeft] = useState(180);

//   /* -------------------------------
//      FETCH SESSION
//   -------------------------------- */
//   useEffect(() => {
//     if (!sessionId) {
//       navigate("/mock");
//       return;
//     }

//     API.get(`/written-interview/session/${sessionId}`)
//       .then((res) => {
//         setSession(res.data);
//         setAnswer(res.data.questions[0]?.userAnswer || "");
//       })
//       .catch(() => navigate("/mock"));
//   }, [sessionId, navigate]);

//   /* -------------------------------
//      TIMER
//   -------------------------------- */
//   useEffect(() => {
//     if (!session) return;

//     if (timeLeft <= 0) {
//       handleNext();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((t) => t - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, session]);

//   if (!session) return null;

//   const total = session.questions.length;
//   const question = session.questions[current];

//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;

//   /* -------------------------------
//      SAVE ANSWER
//   -------------------------------- */
//   const saveAnswer = async () => {
//     if (!answer.trim()) return;

//     await submitWrittenAnswer({
//       sessionId,
//       index: current,
//       answer,
//     });
//   };

//   /* -------------------------------
//      NEXT QUESTION
//   -------------------------------- */
//   const handleNext = async () => {
//     await saveAnswer();

//     if (current + 1 < total) {
//       const nextIndex = current + 1;
//       setCurrent(nextIndex);
//       setAnswer(session.questions[nextIndex]?.userAnswer || "");
//       setTimeLeft(180);
//     } else {
//       handleFinish();
//     }
//   };

//   /* -------------------------------
//      FINISH INTERVIEW
//   -------------------------------- */
//   const handleFinish = async () => {
//     await saveAnswer();
//     await finishWrittenInterview(sessionId);

//     navigate(`/mock/written/report/${sessionId}`);
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen pt-28 px-6 text-white bg-gradient-to-b from-black via-gray-900 to-black">
//         <div className="max-w-4xl mx-auto">

//           {/* HEADER */}
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-xl font-semibold text-purple-300">
//               {session.topic} Interview ({session.level})
//             </h3>

//             <div className="text-gray-300 font-mono">
//               ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
//             </div>
//           </div>

//           {/* PROGRESS */}
//           <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
//             <div
//               className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all"
//               style={{
//                 width: `${((current + 1) / total) * 100}%`,
//               }}
//             />
//           </div>

//           {/* QUESTION */}
//           <motion.div
//             key={current}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
//           >
//             <p className="text-gray-400 mb-2">
//               Question {current + 1} of {total}
//             </p>

//             <h2 className="text-xl font-semibold text-white">
//               {question.question}
//             </h2>
//           </motion.div>

//           {/* ANSWER INPUT */}
//           <textarea
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//             placeholder="Write your answer here..."
//             className="w-full mt-6 h-48 p-4 rounded-xl bg-gray-900/60 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
//           />

//           {/* ACTIONS */}
//           <div className="flex justify-between mt-6">
//             <button
//               onClick={handleFinish}
//               className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
//             >
//               Finish Early
//             </button>

//             <button
//               onClick={handleNext}
//               className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 font-semibold hover:opacity-90"
//             >
//               {current + 1 === total ? "Finish Interview" : "Next Question →"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


//dark mode
// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { useNavigate, useParams } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { submitWrittenAnswer, finishWrittenInterview } from "../api/writtenInterviewApi";
// import API from "../api/api";
// import { FiClock, FiCheckCircle, FiChevronRight, FiFlag, FiBookOpen } from "react-icons/fi";

// export default function MockWrittenInterview() {
//   const navigate = useNavigate();
//   const { sessionId } = useParams();

//   const [session, setSession] = useState(null);
//   const [current, setCurrent] = useState(0);
//   const [answer, setAnswer] = useState("");
//   const [timeLeft, setTimeLeft] = useState(180);

//   /* FETCH SESSION */
//   useEffect(() => {
//     if (!sessionId) return navigate("/mock");

//     API.get(`/written-interview/session/${sessionId}`)
//       .then((res) => {
//         setSession(res.data);
//         setAnswer(res.data.questions[0]?.userAnswer || "");
//       })
//       .catch(() => navigate("/mock"));
//   }, [sessionId, navigate]);

//   /* TIMER LOGIC */
//   useEffect(() => {
//     if (!session) return;
//     if (timeLeft <= 0) {
//       handleNext();
//       return;
//     }
//     const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft, session]);

//   if (!session) return null;

//   const total = session.questions.length;
//   const question = session.questions[current];
//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;

//   const saveAnswer = async () => {
//     if (!answer.trim()) return;
//     await submitWrittenAnswer({ sessionId, index: current, answer });
//   };

//   const handleNext = async () => {
//     await saveAnswer();
//     if (current + 1 < total) {
//       const nextIndex = current + 1;
//       setCurrent(nextIndex);
//       setAnswer(session.questions[nextIndex]?.userAnswer || "");
//       setTimeLeft(180);
//     } else {
//       handleFinish();
//     }
//   };

//   const handleFinish = async () => {
//     await saveAnswer();
//     await finishWrittenInterview(sessionId);
//     navigate(`/mock/written/report/${sessionId}`);
//   };

//   return (
//     <div className="min-h-screen transition-colors duration-500 font-sans"
//          style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
//       <Navbar />

//       <div className="max-w-4xl mx-auto pt-32 px-6 pb-20">
        
//         {/* HEADER: META & TIMER */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//           <div className="flex items-center gap-3">
//             <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[var(--accent)]">
//                <FiBookOpen size={20} />
//             </div>
//             <div>
//               <h3 className="text-lg font-bold tracking-tight">
//                 {session.topic} <span className="text-[var(--text-secondary)] font-medium">({session.level})</span>
//               </h3>
//             </div>
//           </div>

//           <div className={`flex items-center gap-3 px-5 py-2 rounded-2xl border transition-all ${
//             timeLeft < 30 ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse' : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)]'
//           }`}>
//             <FiClock className={timeLeft < 30 ? 'text-rose-500' : 'text-[var(--accent)]'} />
//             <span className="font-mono font-black text-xl tracking-tighter">
//               {minutes}:{seconds.toString().padStart(2, "0")}
//             </span>
//           </div>
//         </div>

//         {/* PROGRESS BAR */}
//         <div className="w-full bg-[var(--bg-card)] rounded-full h-1.5 mb-10 border border-[var(--border-color)] p-[2px]">
//           <div
//             className="h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(99,102,241,0.3)]"
//             style={{
//               width: `${((current + 1) / total) * 100}%`,
//               backgroundColor: "var(--accent)"
//             }}
//           />
//         </div>

//         {/* QUESTION CARD */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={current}
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -20 }}
//             className="card p-8 rounded-[2.5rem] relative overflow-hidden mb-8"
//           >
//             <div className="absolute top-0 right-0 p-8 opacity-5">
//               <FiBookOpen size={120} />
//             </div>
            
//             <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: "var(--text-secondary)" }}>
//               Question {current + 1} of {total}
//             </p>

//             <h2 className="text-2xl font-black leading-tight tracking-tight relative z-10">
//               {question.question}
//             </h2>
//           </motion.div>
//         </AnimatePresence>

//         {/* ANSWER INPUT */}
//         <div className="relative group">
//            <textarea
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//             placeholder="Type your comprehensive answer here..."
//             className="w-full h-64 p-6 rounded-[2rem] outline-none transition-all border font-medium text-lg resize-none shadow-inner"
//             style={{ 
//               backgroundColor: "var(--bg-card)", 
//               borderColor: "var(--border-color)", 
//               color: "var(--text-primary)"
//             }}
//           />
//           <div className="absolute bottom-6 right-6 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest pointer-events-none">
//             {answer.length} characters
//           </div>
//         </div>

//         {/* ACTIONS */}
//         <div className="flex justify-between items-center mt-10">
//           <button
//             onClick={handleFinish}
//             className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:bg-rose-500/10 hover:text-rose-400"
//             style={{ color: "var(--text-secondary)" }}
//           >
//             <FiFlag /> Finish Early
//           </button>

//           <button
//             onClick={handleNext}
//             className="group flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-black text-lg transition-all active:scale-95 shadow-xl shadow-indigo-500/20"
//             style={{ backgroundColor: "var(--accent)" }}
//           >
//             {current + 1 === total ? "Complete Session" : "Next Question"}
//             <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

//next acc claude code
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { submitWrittenAnswer, finishWrittenInterview } from "../api/writtenInterviewApi";
import API from "../api/api";
import { FiClock, FiCheckCircle, FiChevronRight, FiFlag, FiBookOpen } from "react-icons/fi";
import { useNotifications } from "../context/NotificationContext"; // ✅ import

export default function MockWrittenInterview() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { fetchUnread } = useNotifications(); // ✅ get fetchUnread

  const [session, setSession] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);

  /* FETCH SESSION */
  useEffect(() => {
    if (!sessionId) return navigate("/mock");

    API.get(`/written-interview/session/${sessionId}`)
      .then((res) => {
        setSession(res.data);
        setAnswer(res.data.questions[0]?.userAnswer || "");
      })
      .catch(() => navigate("/mock"));
  }, [sessionId, navigate]);

  /* TIMER LOGIC */
  useEffect(() => {
    if (!session) return;
    if (timeLeft <= 0) {
      handleNext();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, session]);

  if (!session) return null;

  const total = session.questions.length;
  const question = session.questions[current];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const saveAnswer = async () => {
    if (!answer.trim()) return;
    await submitWrittenAnswer({ sessionId, index: current, answer });
  };

  const handleNext = async () => {
    await saveAnswer();
    if (current + 1 < total) {
      const nextIndex = current + 1;
      setCurrent(nextIndex);
      setAnswer(session.questions[nextIndex]?.userAnswer || "");
      setTimeLeft(180);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    await saveAnswer();
    await finishWrittenInterview(sessionId);

    // ✅ Instantly poll for new notification → triggers toast + updates bell
    setTimeout(() => fetchUnread(), 800);

    navigate(`/mock/written/report/${sessionId}`);
  };

  return (
    <div className="min-h-screen transition-colors duration-500 font-sans"
         style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Navbar />

      <div className="max-w-4xl mx-auto pt-32 px-6 pb-20">
        
        {/* HEADER: META & TIMER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[var(--accent)]">
               <FiBookOpen size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">
                {session.topic} <span className="text-[var(--text-secondary)] font-medium">({session.level})</span>
              </h3>
            </div>
          </div>

          <div className={`flex items-center gap-3 px-5 py-2 rounded-2xl border transition-all ${
            timeLeft < 30 ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse' : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)]'
          }`}>
            <FiClock className={timeLeft < 30 ? 'text-rose-500' : 'text-[var(--accent)]'} />
            <span className="font-mono font-black text-xl tracking-tighter">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-[var(--bg-card)] rounded-full h-1.5 mb-10 border border-[var(--border-color)] p-[2px]">
          <div
            className="h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(99,102,241,0.3)]"
            style={{
              width: `${((current + 1) / total) * 100}%`,
              backgroundColor: "var(--accent)"
            }}
          />
        </div>

        {/* QUESTION CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card p-8 rounded-[2.5rem] relative overflow-hidden mb-8"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <FiBookOpen size={120} />
            </div>
            
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: "var(--text-secondary)" }}>
              Question {current + 1} of {total}
            </p>

            <h2 className="text-2xl font-black leading-tight tracking-tight relative z-10">
              {question.question}
            </h2>
          </motion.div>
        </AnimatePresence>

        {/* ANSWER INPUT */}
        <div className="relative group">
           <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your comprehensive answer here..."
            className="w-full h-64 p-6 rounded-[2rem] outline-none transition-all border font-medium text-lg resize-none shadow-inner"
            style={{ 
              backgroundColor: "var(--bg-card)", 
              borderColor: "var(--border-color)", 
              color: "var(--text-primary)"
            }}
          />
          <div className="absolute bottom-6 right-6 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest pointer-events-none">
            {answer.length} characters
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={handleFinish}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:bg-rose-500/10 hover:text-rose-400"
            style={{ color: "var(--text-secondary)" }}
          >
            <FiFlag /> Finish Early
          </button>

          <button
            onClick={handleNext}
            className="group flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-black text-lg transition-all active:scale-95 shadow-xl shadow-indigo-500/20"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {current + 1 === total ? "Complete Session" : "Next Question"}
            <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}