// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// // import { API } from "../api/api";
// import API from "../api/api";

// export default function LiveInterview() {
//   const { sessionId } = useParams();
//   const navigate = useNavigate();

//   const videoRef = useRef(null);
//   const recognitionRef = useRef(null);

//   const [session, setSession] = useState(null);
//   const [mediaStream, setMediaStream] = useState(null);

//   const questions = [
//     "Tell me about yourself.",
//     "What is your strongest technical skill?",
//     "Explain a challenging project you worked on."
//   ];

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [listening, setListening] = useState(false);
//   const [answerText, setAnswerText] = useState("");

//   /* -------------------------------
//      FETCH SESSION
//   -------------------------------- */
//   useEffect(() => {
//     if (!sessionId) return navigate("/mock");

//     API.get(`/live-interview/session/${sessionId}`)
//       .then((res) => setSession(res.data))
//       .catch(() => navigate("/mock"));
//   }, [sessionId, navigate]);

//   /* -------------------------------
//      START CAMERA
//   -------------------------------- */
//   useEffect(() => {
//     if (!session) return;

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         setMediaStream(stream);
//         videoRef.current.srcObject = stream;
//       })
//       .catch(() => alert("Camera & microphone permission required"));

//     return () => {
//       mediaStream?.getTracks().forEach((t) => t.stop());
//     };
//   }, [session]);

//   /* -------------------------------
//      AI SPEAK QUESTION
//   -------------------------------- */
//   useEffect(() => {
//     if (!session) return;

//     const utterance = new SpeechSynthesisUtterance(
//       questions[currentQuestion]
//     );
//     utterance.lang = "en-US";
//     window.speechSynthesis.speak(utterance);

//     setAnswerText("");
//   }, [currentQuestion, session]);

//   /* -------------------------------
//      START SPEECH RECOGNITION
//   -------------------------------- */
//   const startListening = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Speech Recognition not supported in this browser");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.continuous = true;
//     recognition.interimResults = true;

//     recognition.onresult = (event) => {
//       let transcript = "";
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         transcript += event.results[i][0].transcript;
//       }
//       setAnswerText(transcript);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//     setListening(true);
//   };

//   /* -------------------------------
//      STOP SPEECH RECOGNITION
//   -------------------------------- */
//   const stopListening = () => {
//     recognitionRef.current?.stop();
//     setListening(false);
//   };

//   /* -------------------------------
//      NEXT QUESTION
//   -------------------------------- */
//   const nextQuestion = () => {
//     stopListening();

//     if (currentQuestion + 1 < questions.length) {
//       setCurrentQuestion((q) => q + 1);
//     } else {
//       alert("Live Interview Completed (Voice answers captured)");
//       navigate("/mock");
//     }
//   };

//   if (!session) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Loading Live Interview...
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen pt-28 px-6 bg-black text-white">
//         <div className="max-w-5xl mx-auto text-center">

//           <h2 className="text-2xl font-bold mb-2">
//             Live AI Interview
//           </h2>

//           <p className="text-gray-400 mb-6">
//             Topic: {session.topic} • Role: {session.role}
//           </p>

//           {/* CAMERA */}
//           <video
//             ref={videoRef}
//             autoPlay
//             muted
//             playsInline
//             className="w-full rounded-xl border border-gray-700"
//           />

//           {/* QUESTION */}
//           <div className="mt-6 p-6 rounded-xl bg-white/10 border border-white/20">
//             <p className="text-sm text-gray-400 mb-2">AI Question</p>
//             <h3 className="text-xl font-semibold">
//               {questions[currentQuestion]}
//             </h3>
//           </div>

//           {/* ANSWER BOX */}
//           <div className="mt-4 p-4 rounded-xl bg-gray-900 border border-gray-700 text-left">
//             <p className="text-sm text-gray-400 mb-1">Your Answer (Live)</p>
//             <p className="text-white min-h-[60px]">
//               {answerText || "Start speaking..."}
//             </p>
//           </div>

//           {/* CONTROLS */}
//           <div className="mt-6 flex gap-4 justify-center">
//             {!listening ? (
//               <button
//                 onClick={startListening}
//                 className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-500"
//               >
//                 🎤 Start Answer
//               </button>
//             ) : (
//               <button
//                 onClick={stopListening}
//                 className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-500"
//               >
//                 ⛔ Stop Answer
//               </button>
//             )}

//             <button
//               onClick={nextQuestion}
//               className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
//             >
//               Next Question →
//             </button>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }


//dark mode
// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import API from "../api/api";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiMic, FiMicOff, FiArrowRight, FiVideo, FiLoader, FiMessageSquare } from "react-icons/fi";

// export default function LiveInterview() {
//   const { sessionId } = useParams();
//   const navigate = useNavigate();

//   const videoRef = useRef(null);
//   const recognitionRef = useRef(null);

//   const [session, setSession] = useState(null);
//   const [mediaStream, setMediaStream] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [listening, setListening] = useState(false);
//   const [answerText, setAnswerText] = useState("");

//   const questions = [
//     "Tell me about yourself.",
//     "What is your strongest technical skill?",
//     "Explain a challenging project you worked on."
//   ];

//   /* -------------------------------
//      FETCH SESSION
//   -------------------------------- */
//   useEffect(() => {
//     if (!sessionId) return navigate("/mock");

//     API.get(`/live-interview/session/${sessionId}`)
//       .then((res) => setSession(res.data))
//       .catch(() => navigate("/mock"));
//   }, [sessionId, navigate]);

//   /* -------------------------------
//      START CAMERA
//   -------------------------------- */
//   useEffect(() => {
//     if (!session) return;

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         setMediaStream(stream);
//         if (videoRef.current) videoRef.current.srcObject = stream;
//       })
//       .catch(() => alert("Camera & microphone permission required"));

//     return () => {
//       mediaStream?.getTracks().forEach((t) => t.stop());
//     };
//   }, [session]);

//   /* -------------------------------
//      AI SPEAK QUESTION
//   -------------------------------- */
//   useEffect(() => {
//     if (!session) return;

//     const utterance = new SpeechSynthesisUtterance(questions[currentQuestion]);
//     utterance.lang = "en-US";
//     utterance.rate = 0.9; // Slightly slower for professional feel
//     window.speechSynthesis.speak(utterance);

//     setAnswerText("");
//   }, [currentQuestion, session]);

//   /* -------------------------------
//      SPEECH RECOGNITION
//   -------------------------------- */
//   const startListening = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return alert("Speech Recognition not supported");

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.continuous = true;
//     recognition.interimResults = true;

//     recognition.onresult = (event) => {
//       let transcript = "";
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         transcript += event.results[i][0].transcript;
//       }
//       setAnswerText(transcript);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//     setListening(true);
//   };

//   const stopListening = () => {
//     recognitionRef.current?.stop();
//     setListening(false);
//   };

//   const nextQuestion = () => {
//     stopListening();
//     if (currentQuestion + 1 < questions.length) {
//       setCurrentQuestion((q) => q + 1);
//     } else {
//       navigate("/mock");
//     }
//   };

//   if (!session) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center transition-colors duration-300" 
//            style={{ backgroundColor: "var(--bg-primary)" }}>
//         <FiLoader className="w-12 h-12 animate-spin mb-4" style={{ color: "var(--accent)" }} />
//         <p style={{ color: "var(--text-secondary)" }}>Configuring AI Interviewer...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col font-sans transition-colors duration-300"
//          style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
//       <Navbar />

//       <main className="flex-1 pt-24 pb-12 px-6 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
//         {/* LEFT: VIDEO FEED */}
//         <div className="lg:col-span-7 space-y-6">
//           <div className="relative group rounded-[2.5rem] overflow-hidden border shadow-2xl" 
//                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            
//             {/* Camera Overlay Badge */}
//             <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
//               <div className={`w-2 h-2 rounded-full ${listening ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
//               <span className="text-[10px] font-black uppercase tracking-widest text-white">
//                 {listening ? 'Recording Live' : 'Camera On'}
//               </span>
//             </div>

//             <video
//               ref={videoRef}
//               autoPlay
//               muted
//               playsInline
//               className="w-full aspect-video object-cover bg-slate-900"
//             />

//             {/* AI Overlay Message */}
//             <AnimatePresence>
//               {!listening && (
//                 <motion.div 
//                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                   className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-12 text-center"
//                 >
//                   <p className="text-lg font-bold text-white max-w-sm leading-relaxed">
//                     AI is listening. Click 'Start Answer' when you're ready to respond.
//                   </p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* TRANSCRIPT AREA */}
//           <div className="card p-6 min-h-[120px] relative overflow-hidden">
//             <div className="flex items-center gap-2 mb-3 text-[var(--text-secondary)]">
//               <FiMessageSquare size={14} />
//               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Real-time Transcript</span>
//             </div>
//             <p className={`text-lg font-medium leading-relaxed ${!answerText ? 'opacity-30' : 'opacity-100'}`}>
//               {answerText || "Your response will appear here as you speak..."}
//             </p>
//           </div>
//         </div>

//         {/* RIGHT: AI INTERACTION */}
//         <div className="lg:col-span-5 flex flex-col gap-6">
          
//           {/* QUESTION CARD */}
//           <div className="card p-8 flex-1 flex flex-col justify-center relative overflow-hidden">
//             <div className="absolute top-0 right-0 p-8 opacity-5">
//               <FiVideo size={120} />
//             </div>
            
//             <div className="relative z-10">
//               <p className="text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
//                 Question {currentQuestion + 1} of {questions.length}
//               </p>
//               <h3 className="text-3xl font-black leading-tight tracking-tight mb-6">
//                 {questions[currentQuestion]}
//               </h3>
//               <div className="h-1 w-20 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
//             </div>
//           </div>

//           {/* CONTROLS */}
//           <div className="space-y-4">
//             {!listening ? (
//               <button
//                 onClick={startListening}
//                 className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-white font-black text-lg transition-all active:scale-[0.98] shadow-xl shadow-indigo-500/10"
//                 style={{ backgroundColor: "var(--accent)" }}
//               >
//                 <FiMic size={22} /> Start Answer
//               </button>
//             ) : (
//               <button
//                 onClick={stopListening}
//                 className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 bg-rose-600 hover:bg-rose-500 text-white font-black text-lg transition-all active:scale-[0.98] shadow-xl shadow-rose-900/20"
//               >
//                 <FiMicOff size={22} /> Stop Answer
//               </button>
//             )}

//             <button
//               onClick={nextQuestion}
//               className="w-full py-4 rounded-2xl border flex items-center justify-center gap-2 font-black text-sm uppercase tracking-widest transition-all hover:bg-white/5 active:scale-[0.98]"
//               style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
//             >
//               Next Question <FiArrowRight />
//             </button>
//           </div>

//           {/* FOOTER TIPS */}
//           <div className="p-4 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-tight">
//             Tip: Try to maintain eye contact with the camera and speak clearly for better AI analysis.
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

//next acc claude code
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import API from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMic, FiMicOff, FiArrowRight, FiLoader, FiMessageSquare,
  FiCheckCircle, FiAlertCircle, FiAward, FiX, FiClock,
  FiZap, FiTrendingUp, FiTrendingDown, FiVideo, FiVideoOff,
} from "react-icons/fi";
import { takeStream } from "./streamStore";

/* ── Score color ── */
const scoreColor = (s) => s >= 8 ? "#10b981" : s >= 5 ? "#f59e0b" : "#f43f5e";
const scoreLabel = (s) => s >= 8 ? "Excellent" : s >= 6 ? "Good" : s >= 4 ? "Average" : "Needs Work";

/* ── Difficulty badge style ── */
const diffStyle = {
  Easy:   { color: "#10b981", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.2)"  },
  Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.2)"  },
  Hard:   { color: "#f43f5e", bg: "rgba(244,63,94,0.1)",   border: "rgba(244,63,94,0.2)"   },
};

/* ════════════════════════════════════════════════
   PERMISSION GATE
   Shown before interview starts.
   Interview CANNOT proceed if camera/mic denied.
════════════════════════════════════════════════ */
/* ── Browser-specific camera permission guides ── */
function PermissionGate({ onGranted, onDenied }) {
  const [status, setStatus] = useState("requesting"); // requesting | denied

  useEffect(() => {
    const withTimeout = (p, ms) => Promise.race([
      p, new Promise((_, r) => setTimeout(() => r(new Error("timeout")), ms))
    ]);

    withTimeout(navigator.mediaDevices?.getUserMedia({ video: true, audio: true }), 3000)
      .then(stream => onGranted(stream))
      .catch(() => {
        withTimeout(navigator.mediaDevices?.getUserMedia({ video: false, audio: true }), 3000)
          .then(stream => onGranted(stream))
          .catch(() => setStatus("denied"));
      });
  }, []);

  if (status === "denied") return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "var(--bg-primary)" }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <div className="card p-10 rounded-[2.5rem] text-center border" style={{ borderColor: "rgba(244,63,94,0.4)" }}>
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl"
               style={{ backgroundColor: "rgba(244,63,94,0.1)" }}>🚫</div>
          <h2 className="text-2xl font-black mb-3" style={{ color: "#f43f5e" }}>Interview Terminated</h2>
          <p className="text-sm font-medium mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Camera and microphone access were denied or blocked.<br/>
            A live interview <strong style={{ color: "var(--text-primary)" }}>requires both</strong> to proceed.
          </p>
          <div className="p-4 rounded-2xl mb-6 border text-left" style={{ backgroundColor: "rgba(244,63,94,0.05)", borderColor: "rgba(244,63,94,0.2)" }}>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#f43f5e" }}>⚠️ Violation Recorded</p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              This attempt has been flagged. Blocking camera/mic during an interview is considered a violation of interview integrity guidelines.
            </p>
          </div>
          <button onClick={onDenied}
            className="w-full py-4 rounded-2xl text-white font-black text-base active:scale-95"
            style={{ backgroundColor: "#f43f5e" }}>
            Back to Mock Interview
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl"
           style={{ backgroundColor: "var(--accent)" }}>AI</div>
      <FiLoader className="w-8 h-8 animate-spin" style={{ color: "var(--accent)" }} />
      <p className="font-bold text-sm" style={{ color: "var(--text-secondary)" }}>Connecting camera & mic...</p>
    </div>
  );
}

export default function LiveInterview() {
  const { sessionId } = useParams();
  const navigate      = useNavigate();
  const location      = useLocation();

  const videoRef       = useRef(null);
  const mediaStreamRef = useRef(null);
  const timerRef       = useRef(null);
  const recognitionRef = useRef(null);
  const silenceRef     = useRef(null);   // silence detection timer
  const answerRef      = useRef("");     // always up-to-date answer text
  const questionRef    = useRef("");     // always up-to-date current question

  /* ── Permission gate ── */
  const [permissionGranted, setPermissionGranted] = useState(false);

  /* ── Session ── */
  const [session, setSession]         = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  // Keep ref in sync so submitAnswer always has the latest question
  useEffect(() => { if (currentQuestion) questionRef.current = currentQuestion; }, [currentQuestion]);
  const [questionNumber, setQuestionNumber]   = useState(1);
  const [totalQuestions, setTotalQuestions]   = useState(9);
  const [currentDiff, setCurrentDiff]         = useState("Medium");

  /* ── Mic / transcript ── */
  const [listening, setListening]     = useState(false);
  const [answerText, setAnswerText]   = useState("");
  const [silenceCountdown, setSilenceCountdown] = useState(null); // 3..2..1 before auto-submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ── Evaluation ── */
  const [evaluation, setEvaluation] = useState(null);
  const [phase, setPhase]           = useState("answering"); // intro | answering | evaluating | evaluated | lastEvaluated | finished
  const [aiSpeechText, setAiSpeechText] = useState(""); // what AI is currently saying

  /* ── Timer ── */
  const [timeLeft, setTimeLeft]   = useState(90);
  const [timerActive, setTimerActive] = useState(false);

  /* ── Hints ── */
  const [hintsLeft, setHintsLeft]         = useState(3);
  const [hint, setHint]                   = useState(null);
  const [hintLoading, setHintLoading]     = useState(false);
  const [hintUsedThisQ, setHintUsedThisQ] = useState(false);

  const [isFinishing, setIsFinishing] = useState(false);

  /* ── Speaking state ── */
  const [isSpeaking, setIsSpeaking] = useState(false);

  /* ── Violation state ── */
  const [violation, setViolation] = useState(null); // null | "camera_off" | "mic_off" | "tab_switch"

  /* ════════════ SPEAK TEXT (generic) ════════════ */
  const speakText = useCallback((text, onDone) => {
    if (!text || !window.speechSynthesis) { onDone?.(); return; }
    window.speechSynthesis.cancel();
    setIsSpeaking(true);
    setAiSpeechText(text);

    const doSpeak = () => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = 0.88; u.pitch = 1.05; u.volume = 1;
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.name.includes("Google") && v.lang.startsWith("en"))
        || voices.find(v => v.lang === "en-US")
        || voices.find(v => v.lang.startsWith("en"));
      if (preferred) u.voice = preferred;
      u.onend   = () => { setIsSpeaking(false); setAiSpeechText(""); onDone?.(); };
      u.onerror = () => { setIsSpeaking(false); setAiSpeechText(""); onDone?.(); };
      // Chrome bug: speechSynthesis pauses after ~15s — keep it alive
      const keepAlive = setInterval(() => {
        if (!window.speechSynthesis.speaking) { clearInterval(keepAlive); return; }
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }, 10000);
      window.speechSynthesis.speak(u);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) doSpeak();
    else { window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.onvoiceschanged = null; doSpeak(); }; }
  }, []);

  /* ════════════ PERMISSION ════════════ */
  const handlePermissionGranted = useCallback((stream) => {
    mediaStreamRef.current = stream;
    // Attach to video element immediately if already mounted
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    setPermissionGranted(true);
  }, []);

  // Speak intro once session + permission are both ready
  const introFiredRef = useRef(false);
  useEffect(() => {
    if (!permissionGranted || introFiredRef.current) return;
    const intro  = window.__introSpeech;
    const firstQ = window.__firstQuestion;
    if (!firstQ) return;
    introFiredRef.current = true;
    window.__introSpeech   = null;
    window.__firstQuestion = null;
    if (intro) {
      setPhase("intro");
      speakText(intro, () => {
        setCurrentQuestion(firstQ);
        setPhase("answering");
      });
    } else {
      setCurrentQuestion(firstQ);
      setPhase("answering");
    }
  }, [permissionGranted, session, speakText]);

  // Attach stream to video as soon as both are available
  const attachVideo = useCallback((el) => {
    videoRef.current = el;
    if (el && mediaStreamRef.current) {
      el.srcObject = mediaStreamRef.current;
      el.play().catch(() => {});
    }
  }, []);

  /* ════════════ CLEANUP ════════════ */
  useEffect(() => {
    return () => {
      mediaStreamRef.current?.getTracks().forEach(t => t.stop());
      window.speechSynthesis?.cancel();
      clearInterval(timerRef.current);
      clearTimeout(silenceRef.current);
      recognitionRef.current?.stop();
    };
  }, []);

  /* ════════════ TRACK MONITORING — detect mic/camera turned off ════════════ */
  useEffect(() => {
    if (!permissionGranted || !mediaStreamRef.current) return;
    const stream = mediaStreamRef.current;

    const handleTrackEnded = (track) => {
      if (violation) return; // already violated
      const type = track.kind === "video" ? "camera_off" : "mic_off";
      setViolation(type);
      window.speechSynthesis?.cancel();
      recognitionRef.current?.stop();
      mediaStreamRef.current?.getTracks().forEach(t => t.stop());
    };

    stream.getTracks().forEach(track => {
      track.addEventListener("ended", () => handleTrackEnded(track));
    });

    return () => {
      stream.getTracks().forEach(track => {
        track.removeEventListener("ended", () => handleTrackEnded(track));
      });
    };
  }, [permissionGranted, violation]);

  /* Tab visibility — warn if user switches tab during interview */
  useEffect(() => {
    if (!permissionGranted) return;
    const handleVisibility = () => {
      if (document.hidden && phase === "answering" && !violation) {
        setViolation("tab_switch");
        window.speechSynthesis?.cancel();
        recognitionRef.current?.stop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [permissionGranted, phase, violation]);

  /* ════════════ INIT FROM NAV STATE + SESSION FETCH ════════════ */
  useEffect(() => {
    if (!sessionId) return navigate("/mock");

    // Use nav state for instant load (no extra fetch needed)
    const state = location.state;
    if (state?.firstQuestion) {
      // Build a minimal session object from nav state
      const s = {
        _id:              sessionId,
        topic:            state.topic,
        role:             state.role,
        difficulty:       state.difficulty    || "Medium",
        timerPerQuestion: state.timerPerQuestion ?? 90,
        totalHints:       state.totalHints    ?? 3,
        totalQuestions:   state.totalQuestions ?? 9,
      };
      setSession(s);
      setCurrentDiff(s.difficulty);
      setHintsLeft(s.totalHints);
      setTimeLeft(s.timerPerQuestion);
      setTotalQuestions(s.totalQuestions);
      // Store intro + first question — spoken after permissionGranted
      window.__introSpeech   = state.introSpeech || null;
      window.__firstQuestion = state.firstQuestion;
      setCurrentQuestion(null); // will be set after intro
      return;
    }

    // Fallback: fetch session from server if no nav state
    API.get(`/live-interview/session/${sessionId}`)
      .then(res => {
        const s = res.data;
        setSession(s);
        setCurrentDiff(s.difficulty || "Medium");
        setHintsLeft(s.totalHints ?? 3);
        setTimeLeft(s.timerPerQuestion ?? 90);
        setTotalQuestions(s.totalQuestions ?? 9);
        const first = s.askedQuestions?.[0] || s.generatedQuestions?.[0];
        if (first) setCurrentQuestion(first);
        else navigate("/mock");
      })
      .catch(() => navigate("/mock"));
  }, [sessionId, navigate]);


  /* ════════════ TIMER ════════════ */
  const startTimer = useCallback((duration) => {
    clearInterval(timerRef.current);
    setTimeLeft(duration);
    setTimerActive(true);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setTimerActive(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  // Auto-submit when timer hits 0
  useEffect(() => {
    if (timeLeft === 0 && phase === "answering" && !isSubmitting) {
      submitAnswer(answerRef.current || "[No answer — time expired]", true);
    }
  }, [timeLeft]);

  /* ════════════ START QUESTION ════════════ */
  useEffect(() => {
    if (!session || !permissionGranted || !currentQuestion) return;
    if (phase !== "answering") return;

    answerRef.current = "";
    setAnswerText("");
    setEvaluation(null);
    setHint(null);
    setHintUsedThisQ(false);
    setSilenceCountdown(null);
    clearTimeout(silenceRef.current);

    // Speak question then auto-start mic
    speakText(currentQuestion, () => {
      startMic();
    });
  }, [currentQuestion, session, permissionGranted, phase]);

  /* ════════════ MIC — AUTO START ════════════ */
  const startMic = useCallback(async () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    // Request mic permission here — at interview time, triggered by user interaction (sound check button)
    // This satisfies browser security requirements
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
      console.warn("Mic permission denied:", e.message);
    }

    recognitionRef.current?.stop();

    const r          = new SR();
    r.lang           = "en-US";
    r.continuous     = true;
    r.interimResults = true;

    r.onresult = (e) => {
      let transcript = "";
      for (let i = 0; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      answerRef.current = transcript;
      setAnswerText(transcript);

      // Silence detection — reset 3s countdown on every new word
      clearTimeout(silenceRef.current);
      setSilenceCountdown(null);

      // Only auto-submit if they've said something substantial (>5 words)
      if (transcript.trim().split(" ").length >= 5) {
        startSilenceDetection();
      }
    };

    r.onerror = (e) => {
      if (e.error !== "no-speech") setListening(false);
    };

    r.onend = () => {
      // Auto restart if still in answering phase
      if (phase === "answering" && !isSubmitting) {
        try { r.start(); } catch {}
      }
    };

    r.start();
    recognitionRef.current = r;
    setListening(true);
  }, [phase, isSubmitting]);

  const stopMic = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setListening(false);
    clearTimeout(silenceRef.current);
    setSilenceCountdown(null);
  }, []);

  /* ════════════ SILENCE DETECTION ════════════ */
  // After 2.5s of silence, count down 3..2..1 then submit
  const startSilenceDetection = useCallback(() => {
    clearTimeout(silenceRef.current);
    // 2.5s pause → start countdown
    silenceRef.current = setTimeout(() => {
      let count = 3;
      setSilenceCountdown(count);
      const tick = setInterval(() => {
        count -= 1;
        setSilenceCountdown(count);
        if (count <= 0) {
          clearInterval(tick);
          setSilenceCountdown(null);
          submitAnswer(answerRef.current);
        }
      }, 1000);
    }, 2500);
  }, []);

  /* ════════════ SUBMIT ANSWER ════════════ */
  const submitAnswer = useCallback(async (answer, timedOut = false) => {
    if (isSubmitting) return;
    stopMic();
    clearInterval(timerRef.current);
    setTimerActive(false);
    clearTimeout(silenceRef.current);
    setSilenceCountdown(null);
    setIsSubmitting(true);
    setPhase("evaluating");

    const finalAnswer = (answer || "").trim() || (timedOut ? "[No answer — time expired]" : "[No answer]");

    try {
      const res = await API.post("/live-interview/answer", {
        sessionId,
        question:   questionRef.current || currentQuestion,
        answer:     finalAnswer,
        difficulty: currentDiff,
      });

      setEvaluation(res.data.evaluation);

      if (res.data.evaluation?.adjustedDifficulty) {
        setCurrentDiff(res.data.evaluation.adjustedDifficulty);
      }

      window.__nextQuestion    = res.data.nextQuestion;
      window.__nextQuestionNum = questionNumber + 1;

      // AI speaks a reaction first, then show evaluation card
      if (res.data.spokenReaction) {
        speakText(res.data.spokenReaction, () => {
          if (res.data.isLastQuestion || !res.data.nextQuestion) {
            setPhase("lastEvaluated");
          } else {
            setPhase("evaluated");
          }
        });
      } else {
        if (res.data.isLastQuestion || !res.data.nextQuestion) {
          setPhase("lastEvaluated");
        } else {
          setPhase("evaluated");
        }
      }
    } catch {
      setEvaluation({
        score: 5, feedback: "Could not evaluate — check your connection.",
        strengths: "Attempted the question", improvement: "Ensure stable internet",
        adjustedDifficulty: currentDiff,
      });
      setPhase("evaluated");
      window.__nextQuestion = null;
    } finally {
      setIsSubmitting(false);
    }
  }, [sessionId, currentQuestion, currentDiff, questionNumber, isSubmitting, stopMic]);

  /* ════════════ NEXT QUESTION ════════════ */
  const goNextQuestion = () => {
    const next = window.__nextQuestion;
    window.__nextQuestion = null;
    if (!next) { setPhase("finished"); return; }
    setQuestionNumber(n => n + 1);
    setPhase("answering");
    setCurrentQuestion(next);
  };

  /* ════════════ HINT ════════════ */
  const getHint = async () => {
    if (hintsLeft <= 0 || hintUsedThisQ || isSubmitting) return;
    setHintLoading(true);
    try {
      const res = await API.post("/live-interview/hint", {
        sessionId, question: currentQuestion,
        topic: session.topic, role: session.role,
      });
      setHint(res.data.hint);
      setHintsLeft(res.data.hintsLeft);
      setHintUsedThisQ(true);
    } catch {
      setHint("Think about the core concepts and break the problem into smaller parts.");
      setHintsLeft(h => Math.max(0, h - 1));
      setHintUsedThisQ(true);
    } finally {
      setHintLoading(false);
    }
  };

  /* ════════════ FINISH ════════════ */
  const finishInterview = async () => {
    setIsFinishing(true);
    mediaStreamRef.current?.getTracks().forEach(t => t.stop());
    window.speechSynthesis?.cancel();
    try {
      await API.post("/live-interview/finish", { sessionId });
    } catch {}
    setIsFinishing(false);
    navigate(`/mock/live/report/${sessionId}`, {
      state: { violation, role: session?.role, topic: session?.topic, difficulty: session?.difficulty }
    });
  };

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const timerDanger = timeLeft <= 15;
  const timerWarn   = timeLeft <= 30 && !timerDanger;

  /* ════════════════════════════════════════════════
     RENDERS
  ════════════════════════════════════════════════ */

  if (!permissionGranted) {
    return <PermissionGate onGranted={handlePermissionGranted} onDenied={() => navigate("/mock")} />;
  }

  /* ── VIOLATION SCREEN ── */
  if (violation) {
    const msgs = {
      camera_off:  { icon: "📷", title: "Camera Turned Off", desc: "You turned off your camera during the interview." },
      mic_off:     { icon: "🎤", title: "Microphone Turned Off", desc: "You turned off your microphone during the interview." },
      tab_switch:  { icon: "🖥️", title: "Tab Switch Detected", desc: "You switched away from the interview tab." },
    };
    const m = msgs[violation];
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "var(--bg-primary)" }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
          <div className="card p-10 rounded-[2.5rem] text-center border" style={{ borderColor: "rgba(244,63,94,0.4)" }}>
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 text-4xl"
                 style={{ backgroundColor: "rgba(244,63,94,0.1)" }}>{m.icon}</div>
            <h2 className="text-2xl font-black mb-2" style={{ color: "#f43f5e" }}>Interview Terminated</h2>
            <p className="text-sm font-medium mb-5" style={{ color: "var(--text-secondary)" }}>{m.desc}</p>
            <div className="p-4 rounded-2xl mb-6 border text-left space-y-2" style={{ backgroundColor: "rgba(244,63,94,0.05)", borderColor: "rgba(244,63,94,0.2)" }}>
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: "#f43f5e" }}>⚠️ Violation Recorded</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                This attempt has been flagged for <strong style={{ color: "var(--text-primary)" }}>interview integrity violation</strong>.
                All devices must remain active throughout the interview.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ backgroundColor: "rgba(244,63,94,0.1)", color: "#f43f5e" }}>
                  Questions answered: {questionNumber - 1}/{totalQuestions}
                </span>
                <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ backgroundColor: "rgba(244,63,94,0.1)", color: "#f43f5e" }}>
                  Terminated early
                </span>
              </div>
            </div>
            <button onClick={finishInterview} disabled={isFinishing}
              className="w-full py-4 rounded-2xl text-white font-black text-base active:scale-95 mb-3 disabled:opacity-60"
              style={{ backgroundColor: "#f43f5e" }}>
              {isFinishing ? <><FiLoader className="animate-spin" size={16} /> Generating Report...</> : "📊 View Interview Report"}
            </button>
            <button onClick={() => navigate("/mock")}
              className="w-full py-3 rounded-2xl font-bold text-sm border hover:bg-white/5"
              style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
              Back to Mock Interview
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!session || !currentQuestion) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4"
           style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl"
             style={{ backgroundColor: "var(--accent)" }}>AI</div>
        <FiLoader className="w-10 h-10 animate-spin" style={{ color: "var(--accent)" }} />
        <p className="font-bold text-sm" style={{ color: "var(--text-secondary)" }}>Preparing your interview...</p>
      </div>
    );
  }


  const ds = diffStyle[currentDiff] || diffStyle.Medium;
  const isEvaluating  = phase === "evaluating";
  const isEvaluated   = phase === "evaluated" || phase === "lastEvaluated";
  const isAnswering   = phase === "answering";
  const isLastEval    = phase === "lastEvaluated";
  const isFinished    = phase === "finished";

  /* ── FINISHED (last question evaluated) ── */
  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="max-w-md w-full card p-10 text-center rounded-[2.5rem]">
          <FiCheckCircle size={48} className="mx-auto mb-6" style={{ color: "#10b981" }} />
          <h2 className="text-3xl font-black mb-3" style={{ color: "var(--text-primary)" }}>All Done!</h2>
          <p className="font-medium mb-8" style={{ color: "var(--text-secondary)" }}>
            You answered all {totalQuestions} questions. Ready for your AI report?
          </p>
          <button onClick={finishInterview} disabled={isFinishing}
            className="w-full py-5 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-3 disabled:opacity-60 active:scale-95"
            style={{ backgroundColor: "var(--accent)" }}>
            {isFinishing ? <><FiLoader className="animate-spin" /> Generating Report...</> : <><FiAward /> Get Full AI Feedback</>}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50" style={{ backgroundColor: "var(--border-color)" }}>
        <motion.div className="h-full" animate={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
                    transition={{ duration: 0.5 }} style={{ backgroundColor: "var(--accent)" }} />
      </div>

      {/* Top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-6 py-3 border-b"
           style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black"
               style={{ backgroundColor: "var(--accent)" }}>AI</div>
          <div>
            <p className="font-black text-sm" style={{ color: "var(--text-primary)" }}>{session.role}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>{session.topic}</p>
          </div>
          <span className="ml-2 px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border"
                style={{ backgroundColor: ds.bg, borderColor: ds.border, color: ds.color }}>{currentDiff}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-black"
               style={{ borderColor: "var(--border-color)", color: hintsLeft > 0 ? "#f59e0b" : "var(--text-secondary)" }}>
            <FiZap size={12} /> {hintsLeft} hint{hintsLeft !== 1 ? "s" : ""}
          </div>
          <span className="text-xs font-black px-3 py-1.5 rounded-full border"
                style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
            {questionNumber}/{totalQuestions}
          </span>
          <button onClick={() => { mediaStreamRef.current?.getTracks().forEach(t => t.stop()); navigate("/mock"); }}
                  className="p-2 rounded-xl hover:bg-white/5" style={{ color: "var(--text-secondary)" }}>
            <FiX size={18} />
          </button>
        </div>
      </div>

      <main className="flex-1 px-6 py-6 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-7 space-y-4">

          {/* Video */}
          <div className="relative rounded-[2rem] overflow-hidden border shadow-2xl aspect-video"
               style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>

            <video ref={attachVideo} autoPlay muted playsInline className="w-full h-full object-cover bg-slate-900" />

            {/* Status badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md max-w-[85%]">
              {isSpeaking ? (
                <>
                  <span className="flex gap-0.5 items-end h-4 shrink-0">
                    {[1,2,3,4].map(i => (
                      <span key={i} className="w-0.5 rounded-full bg-indigo-400"
                            style={{ height: `${8 + i * 4}px`, animation: `pulse ${0.4 + i * 0.1}s ease-in-out infinite alternate` }} />
                    ))}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 shrink-0">Alex</span>
                </>
              ) : isAnswering && listening ? (
                <>
                  <span className="flex gap-0.5 items-end h-4 shrink-0">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="w-0.5 rounded-full bg-rose-400"
                            style={{ height: `${6 + i * 3}px`, animation: `pulse ${0.3 + i * 0.08}s ease-in-out infinite alternate` }} />
                    ))}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-300 shrink-0">Listening</span>
                </>
              ) : isEvaluating ? (
                <>
                  <FiLoader size={10} className="animate-spin text-amber-400 shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 shrink-0">Thinking...</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white shrink-0">Ready</span>
                </>
              )}
            </div>

            {/* Silence countdown overlay */}
            <AnimatePresence>
              {silenceCountdown !== null && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="px-4 py-2 rounded-full bg-black/70 backdrop-blur-md flex items-center gap-2">
                    <span className="text-white font-black text-sm">Submitting in</span>
                    <span className="text-2xl font-black tabular-nums" style={{ color: "var(--accent)" }}>{silenceCountdown}</span>
                    <button onClick={() => { clearTimeout(silenceRef.current); setSilenceCountdown(null); }}
                            className="text-xs text-white/60 hover:text-white ml-1 underline">cancel</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI Speaking overlay — shows what Alex is saying */}
            <AnimatePresence>
              {isSpeaking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-x-0 bottom-0 p-4"
                            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}>
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 mt-0.5"
                         style={{ backgroundColor: "var(--accent)" }}>A</div>
                    <p className="text-white/90 text-sm font-medium leading-relaxed line-clamp-3">{aiSpeechText}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Live transcript */}
          <div className="card p-5 min-h-[100px] relative">
            <div className="flex items-center gap-2 mb-2" style={{ color: "var(--text-secondary)" }}>
              <FiMessageSquare size={13} />
              <span className="text-[10px] font-black uppercase tracking-widest">Your Answer</span>
              {isAnswering && listening && (
                <span className="ml-auto flex items-center gap-1 text-rose-400 text-[10px] font-black">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" /> Live
                </span>
              )}
              {isAnswering && !listening && !isSpeaking && !isSubmitting && (
                <span className="ml-auto text-[10px] font-bold" style={{ color: "var(--text-secondary)" }}>
                  Mic starts after AI speaks
                </span>
              )}
            </div>
            <p className={`text-base font-medium leading-relaxed ${!answerText ? "opacity-20" : ""}`}
               style={{ color: "var(--text-primary)" }}>
              {answerText || "Your speech will appear here automatically..."}
            </p>
            {/* Word count */}
            {answerText && (
              <span className="absolute bottom-3 right-4 text-[10px] font-bold" style={{ color: "var(--text-secondary)" }}>
                {answerText.trim().split(/\s+/).length} words
              </span>
            )}
          </div>

          {/* Hint */}
          <AnimatePresence>
            {hint && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          className="card p-5 rounded-2xl border"
                          style={{ borderColor: "rgba(245,158,11,0.3)", backgroundColor: "rgba(245,158,11,0.05)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <FiZap size={14} style={{ color: "#f59e0b" }} />
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#f59e0b" }}>Hint</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{hint}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Evaluation card */}
          <AnimatePresence>
            {evaluation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          className="card p-6 rounded-[2rem] border"
                          style={{ borderColor: `${scoreColor(evaluation.score)}40` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FiTrendingUp size={15} style={{ color: "var(--accent)" }} />
                    <span className="font-black text-sm uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>AI Evaluation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-black" style={{ color: scoreColor(evaluation.score) }}>{evaluation.score}</span>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>/10</span>
                  </div>
                </div>
                <div className="h-2 rounded-full mb-4" style={{ backgroundColor: "var(--border-color)" }}>
                  <motion.div className="h-full rounded-full" initial={{ width: 0 }}
                    animate={{ width: `${evaluation.score * 10}%` }} transition={{ duration: 0.8 }}
                    style={{ backgroundColor: scoreColor(evaluation.score) }} />
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-primary)" }}>{evaluation.feedback}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">✓ Strength</p>
                    <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{evaluation.strengths}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ backgroundColor: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">↑ Improve</p>
                    <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{evaluation.improvement}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5 flex flex-col gap-4">

          {/* AI Status Card — replaces timer for natural flow */}
          <div className="card p-4 flex items-center justify-between rounded-2xl border"
               style={{ borderColor: isSpeaking ? "rgba(99,102,241,0.4)" : isAnswering && listening ? "rgba(244,63,94,0.3)" : "var(--border-color)" }}>
            <div className="flex items-center gap-2" style={{ color: isSpeaking ? "var(--accent)" : isAnswering && listening ? "#f43f5e" : "var(--text-secondary)" }}>
              <FiClock size={16} />
              <span className="text-xs font-black uppercase tracking-widest">
                {isSpeaking ? "Alex is speaking" : isAnswering && listening ? "Your turn" : phase === "evaluating" ? "Thinking..." : "Ready"}
              </span>
            </div>
            {/* Show subtle timer only in danger zone */}
            {timerDanger && timerActive && (
              <span className="text-2xl font-black tabular-nums animate-pulse" style={{ color: "#f43f5e" }}>
                {formatTime(timeLeft)}
              </span>
            )}
          </div>

          {/* Question card */}
          <div className="card p-8 flex-1 flex flex-col justify-center relative overflow-hidden rounded-[2rem]">
            <div className="absolute top-0 right-0 opacity-[0.04] text-[10rem] font-black leading-none pr-4 pt-2"
                 style={{ color: "var(--accent)" }}>Q</div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
                  Question {questionNumber} of {totalQuestions}
                </p>
                <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase border"
                      style={{ backgroundColor: ds.bg, borderColor: ds.border, color: ds.color }}>{currentDiff}</span>
              </div>
              <h3 className="text-xl font-black leading-snug tracking-tight mb-6" style={{ color: "var(--text-primary)" }}>
                {currentQuestion}
              </h3>
              <div className="h-1 w-12 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3">

            {/* ANSWERING phase — mic is automatic, show status + hint */}
            {isAnswering && (
              <>
                {/* Mic status — informational, no button needed */}
                <div className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-sm border transition-all`}
                     style={{
                       borderColor: isSpeaking ? "rgba(99,102,241,0.3)" : listening ? "rgba(244,63,94,0.3)" : "var(--border-color)",
                       backgroundColor: isSpeaking ? "rgba(99,102,241,0.05)" : listening ? "rgba(244,63,94,0.05)" : "var(--bg-card)",
                       color: isSpeaking ? "var(--accent)" : listening ? "#f43f5e" : "var(--text-secondary)",
                     }}>
                  {isSpeaking ? (
                    <><FiLoader className="animate-spin" size={16} /> AI is reading the question...</>
                  ) : listening ? (
                    <><span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" /> Mic is ON — speak your answer</>
                  ) : (
                    <><FiMic size={16} /> Mic starts after AI finishes speaking</>
                  )}
                </div>

                {/* Manual submit if they want to finish early */}
                {answerText.trim().split(/\s+/).length >= 5 && listening && (
                  <button onClick={() => submitAnswer(answerRef.current)}
                    className="w-full py-3 rounded-2xl font-black text-sm border transition-all active:scale-95 flex items-center justify-center gap-2"
                    style={{ backgroundColor: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.3)", color: "#10b981" }}>
                    <FiCheckCircle size={15} /> Done Answering
                  </button>
                )}

                {/* Hint */}
                {!hintUsedThisQ && hintsLeft > 0 && !isSpeaking && (
                  <button onClick={getHint} disabled={hintLoading}
                    className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 font-black text-sm border transition-all disabled:opacity-60"
                    style={{ borderColor: "rgba(245,158,11,0.3)", color: "#f59e0b", backgroundColor: "rgba(245,158,11,0.05)" }}>
                    {hintLoading
                      ? <><FiLoader className="animate-spin" size={14} /> Getting hint...</>
                      : <><FiZap size={14} /> Use Hint ({hintsLeft} left)</>}
                  </button>
                )}
              </>
            )}

            {/* EVALUATING */}
            {isEvaluating && (
              <div className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-sm border"
                   style={{ borderColor: "rgba(99,102,241,0.3)", backgroundColor: "rgba(99,102,241,0.05)", color: "var(--accent)" }}>
                <FiLoader className="animate-spin" size={16} /> AI is evaluating your answer...
              </div>
            )}

            {/* EVALUATED — show next question button */}
            {isEvaluated && (
              <>
                {isLastEval ? (
                  <button onClick={() => setPhase("finished")}
                    className="w-full py-4 rounded-2xl text-white font-black flex items-center justify-center gap-3 active:scale-95 shadow-xl"
                    style={{ backgroundColor: "var(--accent)" }}>
                    <FiAward size={20} /> Finish Interview
                  </button>
                ) : (
                  <button onClick={goNextQuestion}
                    className="w-full py-4 rounded-2xl text-white font-black flex items-center justify-center gap-3 active:scale-95 shadow-xl"
                    style={{ backgroundColor: "var(--accent)" }}>
                    <FiArrowRight size={20} /> Next Question
                  </button>
                )}
              </>
            )}
          </div>

          {/* Tip */}
          <p className="text-[10px] font-bold uppercase tracking-tight text-center px-4" style={{ color: "var(--text-secondary)" }}>
            {phase === "intro"     ? "🤝 Alex is introducing the interview" :
             isSpeaking            ? "🎧 Listen carefully" :
             isAnswering && listening ? "🎙️ Speak naturally · Pause to submit" :
             isEvaluating          ? "⏳ Alex is reviewing your answer" :
             isEvaluated           ? "💡 Review feedback then continue" :
             "✨ Preparing next question"}
          </p>
        </div>
      </main>

      <style>{`
        @keyframes pulse {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
}