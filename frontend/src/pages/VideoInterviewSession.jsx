// import React, { useEffect, useRef, useState } from "react";
// import Navbar from "../components/Navbar";
// import { motion } from "framer-motion";

// const QUESTIONS = [
//   "Introduce yourself",
//   "Explain closures in JavaScript",
//   "What is a REST API?",
//   "How do you handle failure?",
// ];

// export default function VideoInterviewSession() {
//   const videoRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [listening, setListening] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(60);

//   /* --------------------------------
//      CAMERA + MIC STREAM
//   -------------------------------- */
//   useEffect(() => {
//     async function initMedia() {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       videoRef.current.srcObject = stream;
//     }

//     initMedia();
//   }, []);

//   /* --------------------------------
//      TIMER
//   -------------------------------- */
//   useEffect(() => {
//     if (!listening) return;

//     if (timeLeft === 0) {
//       stopAnswer();
//       return;
//     }

//     const timer = setTimeout(() => {
//       setTimeLeft((t) => t - 1);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [listening, timeLeft]);

//   const startAnswer = () => {
//     setListening(true);
//     setTimeLeft(60);
//   };

//   const stopAnswer = () => {
//     setListening(false);
//   };

//   const nextQuestion = () => {
//     setListening(false);
//     setTimeLeft(60);
//     setCurrentIndex((i) => i + 1);
//   };

//   const isFinished = currentIndex >= QUESTIONS.length;

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen pt-28 px-6 text-white
//         bg-gradient-to-b from-black via-gray-900 to-black">

//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

//           {/* VIDEO PANEL */}
//           <div className="bg-black/40 border border-white/20
//             rounded-2xl p-4 shadow-xl">

//             <video
//               ref={videoRef}
//               autoPlay
//               muted
//               className="rounded-xl w-full h-[360px] object-cover"
//             />

//             <div className="mt-3 flex justify-between text-sm text-gray-300">
//               <span>🎥 Camera Active</span>
//               <span>🎙 Mic Active</span>
//             </div>
//           </div>

//           {/* INTERVIEW PANEL */}
//           <div className="bg-white/10 border border-white/20
//             rounded-2xl p-6 shadow-xl flex flex-col">

//             {!isFinished ? (
//               <>
//                 <motion.div
//                   key={currentIndex}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="mb-6"
//                 >
//                   <h2 className="text-xl font-semibold text-purple-300 mb-2">
//                     Question {currentIndex + 1}
//                   </h2>

//                   <p className="text-lg text-gray-200">
//                     {QUESTIONS[currentIndex]}
//                   </p>
//                 </motion.div>

//                 {/* LISTENING STATUS */}
//                 <div className="mb-4">
//                   {listening ? (
//                     <div className="flex items-center gap-3 text-green-400">
//                       <span className="animate-pulse text-2xl">🎤</span>
//                       AI is listening... ({timeLeft}s)
//                     </div>
//                   ) : (
//                     <div className="text-gray-400">
//                       Click start when ready to answer
//                     </div>
//                   )}
//                 </div>

//                 {/* CONTROLS */}
//                 <div className="mt-auto flex gap-3">
//                   {!listening ? (
//                     <button
//                       onClick={startAnswer}
//                       className="flex-1 py-3 rounded-lg
//                       bg-green-600 hover:bg-green-500
//                       font-semibold transition"
//                     >
//                       Start Answer
//                     </button>
//                   ) : (
//                     <button
//                       onClick={stopAnswer}
//                       className="flex-1 py-3 rounded-lg
//                       bg-red-600 hover:bg-red-500
//                       font-semibold transition"
//                     >
//                       Stop
//                     </button>
//                   )}

//                   <button
//                     onClick={nextQuestion}
//                     className="flex-1 py-3 rounded-lg
//                     bg-purple-600 hover:bg-purple-500
//                     font-semibold transition"
//                   >
//                     Next →
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="text-center my-auto">
//                 <h2 className="text-3xl font-bold text-purple-400">
//                   Interview Completed 🎉
//                 </h2>
//                 <p className="text-gray-300 mt-2">
//                   AI is preparing your report...
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


//dark mode
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FiMic, FiSquare, FiChevronRight, FiCheckCircle, FiLoader, FiVideo } from "react-icons/fi";

const QUESTIONS = [
  "Introduce yourself",
  "Explain closures in JavaScript",
  "What is a REST API?",
  "How do you handle failure?",
];

export default function VideoInterviewSession() {
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  /* --------------------------------
     CAMERA + MIC STREAM
  -------------------------------- */
  useEffect(() => {
    async function initMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Media error:", err);
      }
    }
    initMedia();
  }, []);

  /* --------------------------------
     TIMER LOGIC
  -------------------------------- */
  useEffect(() => {
    if (!listening) return;
    if (timeLeft === 0) {
      setListening(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [listening, timeLeft]);

  const startAnswer = () => {
    setListening(true);
    setTimeLeft(60);
  };

  const stopAnswer = () => {
    setListening(false);
  };

  const nextQuestion = () => {
    setListening(false);
    setTimeLeft(60);
    setCurrentIndex((i) => i + 1);
  };

  const isFinished = currentIndex >= QUESTIONS.length;

  return (
    <div className="min-h-screen transition-colors duration-500 font-sans"
         style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Navbar />

      <div className="max-w-7xl mx-auto pt-32 px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* LEFT: VIDEO FEED PANEL */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="card p-3 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                 style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
              
              {/* Recording Badge */}
              <div className="absolute top-8 left-8 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                <div className={`w-2 h-2 rounded-full ${listening ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  {listening ? 'Session Live' : 'Paused'}
                </span>
              </div>

              <div className="relative aspect-video rounded-3xl bg-black overflow-hidden shadow-inner">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover mirror"
                />
                
                {/* Visual Audio Waveform Placeholder */}
                <AnimatePresence>
                  {listening && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-1 h-8"
                    >
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [4, 24, 8, 32, 4] }}
                          transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                          className="w-1 bg-[var(--accent)] rounded-full"
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="flex justify-between px-4 text-[10px] font-black uppercase tracking-[0.2em]" 
                 style={{ color: "var(--text-secondary)" }}>
              <span>🎥 1080p Stream</span>
              <span>🎙 Encrypted Audio</span>
            </div>
          </div>

          {/* RIGHT: INTERVIEW CONTROL PANEL */}
          <div className="lg:col-span-5 card p-10 rounded-[2.5rem] flex flex-col shadow-2xl border relative overflow-hidden"
               style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            
            {/* Background Icon */}
            <FiVideo className="absolute -bottom-10 -right-10 text-[var(--accent)] opacity-[0.03]" size={300} />

            {!isFinished ? (
              <>
                <div className="relative z-10 flex-1 flex flex-col">
                  <header className="mb-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" 
                       style={{ color: "var(--accent)" }}>
                      Step {currentIndex + 1} of {QUESTIONS.length}
                    </p>
                    <h2 className="text-3xl font-black tracking-tight leading-tight">
                      {QUESTIONS[currentIndex]}
                    </h2>
                  </header>

                  <div className="flex-1 flex flex-col justify-center">
                    {listening ? (
                      <div className="p-8 rounded-3xl border text-center animate-fadeIn"
                           style={{ backgroundColor: "rgba(16, 185, 129, 0.05)", borderColor: "rgba(16, 185, 129, 0.1)" }}>
                        <div className="text-4xl font-black mb-2 tracking-tighter" style={{ color: "#10b981" }}>
                          00:{timeLeft.toString().padStart(2, "0")}
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-500/60">
                          AI is analyzing your voice...
                        </p>
                      </div>
                    ) : (
                      <div className="p-8 rounded-3xl border-2 border-dashed text-center"
                           style={{ borderColor: "var(--border-color)", backgroundColor: "rgba(255,255,255,0.02)" }}>
                        <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                          Ready to answer? Click start to begin recording.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* ACTION CONTROLS */}
                  <div className="mt-12 space-y-4">
                    <div className="flex gap-4">
                      {!listening ? (
                        <button
                          onClick={startAnswer}
                          className="flex-1 py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg transition-all active:scale-95 shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-3"
                        >
                          <FiMic /> Start Answer
                        </button>
                      ) : (
                        <button
                          onClick={stopAnswer}
                          className="flex-1 py-5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-lg transition-all active:scale-95 shadow-xl shadow-rose-900/20 flex items-center justify-center gap-3"
                        >
                          <FiSquare /> Stop
                        </button>
                      )}
                    </div>

                    <button
                      onClick={nextQuestion}
                      className="w-full py-4 rounded-2xl border flex items-center justify-center gap-2 font-black text-sm uppercase tracking-widest transition-all hover:bg-white/5 active:scale-95"
                      style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
                    >
                      Next Question <FiChevronRight />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl"
                     style={{ backgroundColor: "var(--accent)" }}>
                  <FiCheckCircle size={40} className="text-white" />
                </div>
                <h2 className="text-4xl font-black tracking-tight mb-4">
                  Session <span style={{ color: "var(--accent)" }}>Finished</span>
                </h2>
                <div className="flex items-center gap-3 text-sm font-bold" style={{ color: "var(--text-secondary)" }}>
                  <FiLoader className="animate-spin" />
                  AI is compiling your intelligence report...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .mirror { transform: scaleX(-1); }
      `}</style>
    </div>
  );
}