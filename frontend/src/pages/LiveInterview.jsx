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
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMic, FiMicOff, FiArrowRight, FiLoader, FiMessageSquare,
  FiCheckCircle, FiAlertCircle, FiAward, FiX, FiClock,
  FiZap, FiTrendingUp, FiTrendingDown, FiVideo, FiVideoOff,
} from "react-icons/fi";

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
function BrowserGuides() {
  const [open, setOpen] = useState(null);
  const guides = [
    {
      browser: "Chrome", icon: "🟡",
      link: "chrome://settings/content/camera",
      steps: ["Click 🔒 in address bar", "Click 'Site settings'", "Set Camera & Mic to Allow", "Refresh page"],
    },
    {
      browser: "Firefox", icon: "🦊",
      link: "about:preferences#privacy",
      steps: ["Click 🔒 in address bar", "Click the blocked camera/mic icon", "Select 'Allow'", "Refresh page"],
    },
    {
      browser: "Safari", icon: "🧭",
      link: null,
      steps: ["Safari menu → Settings for This Website", "Set Camera & Microphone to Allow", "Refresh page"],
    },
    {
      browser: "Edge", icon: "🔵",
      link: "edge://settings/content/camera",
      steps: ["Click 🔒 in address bar", "Click 'Permissions for this site'", "Set Camera & Mic to Allow", "Refresh page"],
    },
  ];
  return (
    <div className="space-y-2">
      {guides.map(({ browser, icon, link, steps }) => (
        <div key={browser} className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border-color)" }}>
          <button
            onClick={() => setOpen(open === browser ? null : browser)}
            className="w-full flex items-center gap-3 p-4 font-black text-sm text-left"
            style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
            <span className="text-lg">{icon}</span>
            <span className="flex-1">{browser}</span>
            <span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>
              {open === browser ? "▲" : "▾"}
            </span>
          </button>
          {open === browser && (
            <div className="px-4 pb-4 pt-1" style={{ backgroundColor: "var(--bg-primary)" }}>
              <ol className="space-y-1.5 mb-3">
                {steps.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                    <span className="font-black shrink-0" style={{ color: "var(--accent)" }}>{i + 1}.</span> {s}
                  </li>
                ))}
              </ol>
              {link && (
                <button
                  onClick={() => { try { window.open(link, "_blank"); } catch(e) {} }}
                  className="w-full py-2 rounded-xl text-xs font-black border flex items-center justify-center gap-2"
                  style={{ borderColor: "rgba(99,102,241,0.3)", color: "var(--accent)", backgroundColor: "rgba(99,102,241,0.05)" }}>
                  🔗 Open {browser} Settings
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PermissionGate({ onGranted, onDenied }) {
  const [step, setStep]               = useState("camera"); // camera | sound
  const [status, setStatus]           = useState("idle");   // idle | requesting | granted | denied | notfound | error
  const [soundTested, setSoundTested] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const videoPreviewRef               = useRef(null);
  const streamRef                     = useRef(null);

  const requestPermissions = async () => {
    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoPreviewRef.current) videoPreviewRef.current.srcObject = stream;
      setStatus("granted");
      setTimeout(() => setStep("sound"), 900);
    } catch (err) {
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") setStatus("denied");
      else if (err.name === "NotFoundError") setStatus("notfound");
      else setStatus("error");
    }
  };

  const testSound = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setSoundPlaying(true);
    const u = new SpeechSynthesisUtterance(
      "Hello! I am your AI interviewer. Your interview is about to begin. Good luck!"
    );
    u.lang = "en-US"; u.rate = 0.9; u.pitch = 1; u.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const eng = voices.find(v => v.lang.startsWith("en"));
    if (eng) u.voice = eng;
    u.onend   = () => { setSoundPlaying(false); setSoundTested(true); };
    u.onerror = () => { setSoundPlaying(false); setSoundTested(true); };
    window.speechSynthesis.speak(u);
  };

  const proceedToInterview = () => {
    window.speechSynthesis.cancel();
    onGranted(streamRef.current);
  };

  const isIdle    = status === "idle";
  const isPending = status === "requesting";
  const isGranted = status === "granted";

  /* ════════════ STEP 2: SOUND CHECK ════════════ */
  if (step === "sound") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6"
           style={{ backgroundColor: "var(--bg-primary)" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md">
          <div className="card p-10 rounded-[2.5rem] text-center">

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                     style={{ backgroundColor: "#10b981" }}>✓</div>
                <span className="text-xs font-black" style={{ color: "#10b981" }}>Camera & Mic</span>
              </div>
              <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                     style={{ backgroundColor: "var(--accent)" }}>2</div>
                <span className="text-xs font-black" style={{ color: "var(--accent)" }}>Sound Check</span>
              </div>
            </div>

            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl"
                 style={{ backgroundColor: "rgba(99,102,241,0.1)", border: "2px solid rgba(99,102,241,0.3)" }}>
              🔊
            </div>

            <h2 className="text-2xl font-black mb-2" style={{ color: "var(--text-primary)" }}>
              Sound Check
            </h2>
            <p className="font-medium text-sm mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              The AI interviewer speaks questions aloud. Test the sound before starting.
            </p>

            {/* How to fix sound — always visible */}
            <div className="p-4 rounded-2xl text-left mb-6 border"
                 style={{ backgroundColor: "rgba(245,158,11,0.05)", borderColor: "rgba(245,158,11,0.25)" }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: "#f59e0b" }}>
                🔇 Can't hear anything? Fix it:
              </p>
              <ol className="space-y-2 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                <li className="flex gap-2">
                  <span className="font-black shrink-0" style={{ color: "#f59e0b" }}>1.</span>
                  Check your <strong style={{ color: "var(--text-primary)" }}>device volume</strong> is not muted
                </li>
                <li className="flex gap-2">
                  <span className="font-black shrink-0" style={{ color: "#f59e0b" }}>2.</span>
                  Right-click browser tab →
                  <strong style={{ color: "var(--text-primary)" }}> "Unmute tab"</strong>
                </li>
                <li className="flex gap-2">
                  <span className="font-black shrink-0" style={{ color: "#f59e0b" }}>3.</span>
                  Look for <strong style={{ color: "var(--text-primary)" }}>🔇 in address bar</strong> and click to unmute
                </li>
                <li className="flex gap-2">
                  <span className="font-black shrink-0" style={{ color: "#f59e0b" }}>4.</span>
                  Ensure headphones or speakers are plugged in
                </li>
              </ol>
            </div>

            {/* Test sound button */}
            <button onClick={testSound} disabled={soundPlaying}
              className="w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-3 border-2 transition-all active:scale-95 mb-3 disabled:opacity-60"
              style={{
                borderColor:     soundTested ? "rgba(16,185,129,0.5)" : "rgba(99,102,241,0.4)",
                backgroundColor: soundTested ? "rgba(16,185,129,0.08)" : "rgba(99,102,241,0.08)",
                color:           soundTested ? "#10b981" : "var(--accent)",
              }}>
              {soundPlaying
                ? <><span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse inline-block" /> AI is speaking...</>
                : soundTested
                  ? <><FiCheckCircle size={18} /> Heard it! Sound is working</>
                  : <>🔊 Play Test Voice</>}
            </button>

            {/* Start button */}
            <button onClick={proceedToInterview}
              className="w-full py-4 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl mb-3"
              style={{ backgroundColor: "var(--accent)" }}>
              {soundTested ? "✅ Start Interview" : "Start Without Sound Test"}
            </button>

            {!soundTested && (
              <p className="text-xs font-bold mb-3" style={{ color: "var(--text-secondary)" }}>
                Recommended: test sound first so you can hear the questions
              </p>
            )}

            <button onClick={onDenied}
              className="w-full py-2.5 rounded-2xl font-bold text-sm border hover:bg-white/5"
              style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ════════════ STEP 1: CAMERA & MIC ════════════ */
  return (
    <div className="min-h-screen flex items-center justify-center p-6"
         style={{ backgroundColor: "var(--bg-primary)" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-md">

        {(isIdle || isPending || isGranted) && (
          <div className="card p-10 rounded-[2.5rem] text-center">

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                     style={{ backgroundColor: "var(--accent)" }}>1</div>
                <span className="text-xs font-black" style={{ color: "var(--accent)" }}>Camera & Mic</span>
              </div>
              <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: "var(--border-color)" }} />
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border"
                     style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>2</div>
                <span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>Sound Check</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-8">
              {[FiVideo, FiMic].map((Icon, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: "var(--border-color)" }} />}
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500"
                       style={{
                         backgroundColor: isGranted ? "rgba(16,185,129,0.1)" : "rgba(99,102,241,0.1)",
                         borderColor:     isGranted ? "rgba(16,185,129,0.4)" : "rgba(99,102,241,0.3)",
                         color:           isGranted ? "#10b981" : "var(--accent)",
                       }}>
                    <Icon size={28} />
                  </div>
                </React.Fragment>
              ))}
            </div>

            <h2 className="text-2xl font-black mb-2" style={{ color: "var(--text-primary)" }}>
              Camera & Mic Required
            </h2>
            <p className="font-medium text-sm mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              This live interview requires your camera and microphone.
              The interview <strong style={{ color: "var(--text-primary)" }}>will not start</strong> without both permissions.
            </p>

            <div className="space-y-3 mb-8 text-left">
              {[
                { icon: FiVideo, label: "Camera — for live video feed" },
                { icon: FiMic,   label: "Microphone — for voice answers" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-500"
                     style={{ borderColor: isGranted ? "rgba(16,185,129,0.3)" : "var(--border-color)", backgroundColor: "var(--bg-primary)" }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-500"
                       style={{ backgroundColor: isGranted ? "rgba(16,185,129,0.1)" : "rgba(99,102,241,0.1)", color: isGranted ? "#10b981" : "var(--accent)" }}>
                    <Icon size={15} />
                  </div>
                  <span className="font-bold text-sm flex-1" style={{ color: "var(--text-primary)" }}>{label}</span>
                  {isGranted && <FiCheckCircle size={16} style={{ color: "#10b981" }} />}
                  {isPending && <FiLoader size={14} className="animate-spin" style={{ color: "var(--accent)" }} />}
                </div>
              ))}
            </div>

            <div className={`mb-6 rounded-2xl overflow-hidden border transition-all duration-500 ${isGranted ? "h-44 opacity-100" : "h-0 opacity-0"}`}
                 style={{ borderColor: "rgba(16,185,129,0.3)" }}>
              <video ref={videoPreviewRef} autoPlay muted playsInline className="w-full h-full object-cover bg-slate-900" />
            </div>

            {isIdle && (
              <button onClick={requestPermissions}
                className="w-full py-4 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl"
                style={{ backgroundColor: "var(--accent)" }}>
                <FiVideo size={20} /> Allow Camera & Mic
              </button>
            )}
            {isPending && (
              <button disabled
                className="w-full py-4 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-3 opacity-70 cursor-not-allowed"
                style={{ backgroundColor: "var(--accent)" }}>
                <FiLoader className="animate-spin" size={20} /> Waiting for permission...
              </button>
            )}
            {isGranted && (
              <div className="py-3 font-black text-base flex items-center justify-center gap-3"
                   style={{ color: "#10b981" }}>
                <FiCheckCircle size={20} /> Granted — moving to sound check...
              </div>
            )}

            <button onClick={onDenied}
              className="mt-4 w-full py-3 rounded-2xl font-bold text-sm border transition-all hover:bg-white/5"
              style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
              Cancel Interview
            </button>
          </div>
        )}

        {status === "denied" && (
          <div className="card rounded-[2.5rem] overflow-hidden border" style={{ borderColor: "rgba(244,63,94,0.3)" }}>
            {/* Red header */}
            <div className="p-8 text-center" style={{ backgroundColor: "rgba(244,63,94,0.07)" }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(244,63,94,0.15)" }}>
                <FiVideoOff size={30} style={{ color: "#f43f5e" }} />
              </div>
              <h2 className="text-xl font-black mb-1" style={{ color: "var(--text-primary)" }}>Camera / Mic Blocked</h2>
              <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                You blocked access. Here's how to enable it for each browser:
              </p>
            </div>

            {/* Browser fix guides */}
            <div className="p-6 space-y-3">
              <BrowserGuides />
            </div>

            <div className="px-6 pb-6 space-y-2">
              <button onClick={() => { setStatus("idle"); }}
                className="w-full py-4 rounded-2xl text-white font-black active:scale-95 transition-all shadow-lg"
                style={{ backgroundColor: "var(--accent)" }}>
                ✅ I've enabled it — Try Again
              </button>
              <button onClick={onDenied}
                className="w-full py-3 rounded-2xl font-bold text-sm border hover:bg-white/5"
                style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                Go Back
              </button>
            </div>
          </div>
        )}

        {status === "notfound" && (
          <div className="card rounded-[2.5rem] overflow-hidden border" style={{ borderColor: "rgba(245,158,11,0.3)" }}>
            <div className="p-8 text-center" style={{ backgroundColor: "rgba(245,158,11,0.07)" }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(245,158,11,0.15)" }}>
                <FiAlertCircle size={30} style={{ color: "#f59e0b" }} />
              </div>
              <h2 className="text-xl font-black mb-1" style={{ color: "var(--text-primary)" }}>No Camera or Mic Detected</h2>
              <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                Your device has no camera or microphone. Here's how to fix it:
              </p>
            </div>
            <div className="p-6 space-y-3">
              {[
                { icon: "🎙️", title: "Use a USB or Bluetooth mic/headset", desc: "Plug in a headset or external microphone and refresh the page." },
                { icon: "📷", title: "Use a USB webcam", desc: "Connect a USB webcam. Built-in laptop cameras work too — check if it's enabled in device manager." },
                { icon: "📱", title: "Use your phone instead", desc: "Open this site on your phone — it has a built-in camera and mic." },
                { icon: "⚙️", title: "Check device manager (Windows)", desc: "Search 'Device Manager' → Cameras / Audio inputs — make sure no device shows a ⚠️ icon.", link: "ms-settings:sound", linkLabel: "Open Sound Settings" },
              ].map(({ icon, title, desc, link, linkLabel }) => (
                <div key={title} className="p-4 rounded-2xl border" style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-primary)" }}>
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0">{icon}</span>
                    <div className="flex-1">
                      <p className="font-black text-sm mb-1" style={{ color: "var(--text-primary)" }}>{title}</p>
                      <p className="text-xs font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
                      {link && (
                        <button onClick={() => { try { window.open(link, "_blank"); } catch(e) {} }}
                          className="mt-2 px-3 py-1.5 rounded-xl text-xs font-black border"
                          style={{ borderColor: "rgba(99,102,241,0.3)", color: "var(--accent)" }}>
                          🔗 {linkLabel}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6 space-y-2">
              <button onClick={() => setStatus("idle")}
                className="w-full py-4 rounded-2xl text-white font-black active:scale-95 shadow-lg"
                style={{ backgroundColor: "var(--accent)" }}>
                ✅ I've connected a device — Try Again
              </button>
              <button onClick={onDenied}
                className="w-full py-3 rounded-2xl font-bold text-sm border hover:bg-white/5"
                style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                Go Back
              </button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="card rounded-[2.5rem] overflow-hidden border" style={{ borderColor: "rgba(244,63,94,0.2)" }}>
            <div className="p-8 text-center" style={{ backgroundColor: "rgba(244,63,94,0.05)" }}>
              <FiAlertCircle size={36} className="mx-auto mb-3" style={{ color: "#f43f5e" }} />
              <h2 className="text-xl font-black mb-1" style={{ color: "var(--text-primary)" }}>Something Went Wrong</h2>
              <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>An unexpected error occurred accessing your devices.</p>
            </div>
            <div className="p-6 space-y-3">
              {[
                { icon: "🔄", title: "Refresh and try again", desc: "Sometimes a simple page refresh resolves the issue." },
                { icon: "🔒", title: "Check browser permissions", desc: "Click the 🔒 lock icon in the address bar and ensure camera & mic are set to Allow." },
                { icon: "🌐", title: "Try a different browser", desc: "Chrome and Edge have the best support for camera/mic access. Try switching browsers." },
                { icon: "🔌", title: "Restart your browser", desc: "Fully close and reopen your browser, then try again." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="p-4 rounded-2xl border flex items-start gap-3" style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-primary)" }}>
                  <span className="text-xl shrink-0">{icon}</span>
                  <div>
                    <p className="font-black text-sm mb-0.5" style={{ color: "var(--text-primary)" }}>{title}</p>
                    <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6 space-y-2">
              <button onClick={() => setStatus("idle")}
                className="w-full py-4 rounded-2xl text-white font-black active:scale-95 shadow-lg"
                style={{ backgroundColor: "var(--accent)" }}>
                Try Again
              </button>
              <button onClick={onDenied}
                className="w-full py-3 rounded-2xl font-bold text-sm border hover:bg-white/5"
                style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                Go Back
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}


export default function LiveInterview() {
  const { sessionId } = useParams();
  const navigate      = useNavigate();

  const videoRef        = useRef(null);
  const recognitionRef  = useRef(null);
  const mediaStreamRef  = useRef(null);
  const timerRef        = useRef(null);

  /* ── Permission gate — must be granted before interview loads ── */
  const [permissionGranted, setPermissionGranted] = useState(false);

  /* ── Session state ── */
  const [session, setSession]         = useState(null);
  const [questions, setQuestions]     = useState([]);
  const [currentQ, setCurrentQ]       = useState(0);
  const [currentDiff, setCurrentDiff] = useState("Medium");

  /* ── Answer state ── */
  const [listening, setListening]       = useState(false);
  const [answerText, setAnswerText]     = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ── Evaluation state ── */
  const [evaluation, setEvaluation]     = useState(null);
  const [followUp, setFollowUp]         = useState(null);
  const [showFollowUp, setShowFollowUp] = useState(false);

  /* ── Timer state ── */
  const [timeLeft, setTimeLeft] = useState(90);
  const [timedOut, setTimedOut] = useState(false);

  /* ── Hint state ── */
  const [hintsLeft, setHintsLeft]         = useState(3);
  const [hint, setHint]                   = useState(null);
  const [hintLoading, setHintLoading]     = useState(false);
  const [hintUsedThisQ, setHintUsedThisQ] = useState(false);

  /* ── UI state ── */
  const [answeredAll, setAnsweredAll] = useState(false);
  const [summary, setSummary]         = useState(null);
  const [isFinishing, setIsFinishing] = useState(false);
  const [phase, setPhase]             = useState("answering"); // answering | evaluated

  /* ── Permission granted: save stream, flip gate ── */
  const handlePermissionGranted = useCallback((stream) => {
    mediaStreamRef.current = stream;
    setPermissionGranted(true);
  }, []);

  /* ── Attach stream to video element once both are ready ── */
  useEffect(() => {
    if (!permissionGranted || !mediaStreamRef.current || !videoRef.current) return;
    videoRef.current.srcObject = mediaStreamRef.current;
  }, [permissionGranted, session]); // re-run when session loads so videoRef is mounted

  /* ═══════════════ FETCH SESSION ═══════════════ */
  useEffect(() => {
    if (!sessionId) return navigate("/mock");
    API.get(`/live-interview/session/${sessionId}`)
      .then((res) => {
        const s = res.data;
        setSession(s);
        setQuestions(s.generatedQuestions || []);
        setCurrentDiff(s.difficulty || "Medium");
        setHintsLeft(s.totalHints ?? 3);
        setTimeLeft(s.timerPerQuestion ?? 90);
      })
      .catch(() => navigate("/mock"));
  }, [sessionId, navigate]);

  /* ═══════════════ CLEANUP ON UNMOUNT ═══════════════ */
  useEffect(() => {
    return () => {
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
      window.speechSynthesis?.cancel();
      clearInterval(timerRef.current);
    };
  }, []);

  /* ═══════════════ SPEAK QUESTION ═══════════════ */
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakQuestion = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const speak = () => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang   = "en-US";
      u.rate   = 0.9;
      u.pitch  = 1;
      u.volume = 1;

      // Pick first English voice available, else use browser default
      const voices = window.speechSynthesis.getVoices();
      const eng = voices.find((v) => v.lang.startsWith("en"));
      if (eng) u.voice = eng;

      u.onstart = () => setIsSpeaking(true);
      u.onend   = () => setIsSpeaking(false);
      u.onerror = (e) => { console.error("TTS error", e); setIsSpeaking(false); };

      window.speechSynthesis.speak(u);
    };

    // If voices already loaded speak immediately, else wait
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      speak();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        speak();
      };
    }
  }, []);

  /* ═══════════════ TIMER ═══════════════ */
  const startTimer = useCallback((duration) => {
    clearInterval(timerRef.current);
    setTimeLeft(duration);
    setTimedOut(false);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setTimedOut(true);
          recognitionRef.current?.stop();
          setListening(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  /* ═══════════════ NEW QUESTION SETUP ═══════════════ */
  useEffect(() => {
    // Only start question after permission is granted
    if (!session || !permissionGranted || questions.length === 0 || answeredAll) return;
    setAnswerText("");
    setEvaluation(null);
    setFollowUp(null);
    setShowFollowUp(false);
    setHint(null);
    setHintUsedThisQ(false);
    setTimedOut(false);
    setPhase("answering");
    speakQuestion(questions[currentQ]);
    startTimer(session.timerPerQuestion ?? 90);
  }, [currentQ, session, permissionGranted, questions, answeredAll, speakQuestion, startTimer]);

  /* ═══════════════ SPEECH RECOGNITION ═══════════════ */
  const startListening = () => {
    if (timedOut) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert("Speech recognition not supported. Please use Chrome.");

    const r          = new SR();
    r.lang           = "en-US";
    r.continuous     = true;
    r.interimResults = true;

    r.onresult = (e) => {
      let t = "";
      for (let i = e.resultIndex; i < e.results.length; i++) t += e.results[i][0].transcript;
      setAnswerText(t);
    };
    r.onerror = () => setListening(false);
    r.start();
    recognitionRef.current = r;
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  /* ═══════════════ SUBMIT ANSWER ═══════════════ */
  const submitAnswer = async (isTimedOut = false) => {
    const answer = answerText.trim() || (isTimedOut ? "[No answer — time expired]" : "");
    if (!answer && !isTimedOut) return;

    stopListening();
    clearInterval(timerRef.current);
    setIsSubmitting(true);

    try {
      const res = await API.post("/live-interview/answer", {
        sessionId,
        questionIndex: currentQ,
        question:      questions[currentQ],
        answer,
        topic:         session.topic,
        role:          session.role,
        difficulty:    currentDiff,
      });
      setEvaluation(res.data.evaluation);
      setFollowUp(res.data.followUp || null);
      if (res.data.evaluation?.adjustedDifficulty) setCurrentDiff(res.data.evaluation.adjustedDifficulty);
      setPhase("evaluated");
    } catch {
      setEvaluation({ score: 5, feedback: "Could not evaluate — check your connection.", strengths: "Attempted the question", improvement: "Ensure stable internet for AI evaluation", adjustedDifficulty: currentDiff });
      setPhase("evaluated");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ═══════════════ GET HINT ═══════════════ */
  const getHint = async () => {
    if (hintsLeft <= 0 || hintUsedThisQ) return;
    setHintLoading(true);
    try {
      const res = await API.post("/live-interview/hint", { sessionId, question: questions[currentQ], topic: session.topic, role: session.role });
      setHint(res.data.hint);
      setHintsLeft(res.data.hintsLeft);
      setHintUsedThisQ(true);
    } catch {
      setHint("Think about the core concepts and break the problem into smaller parts.");
      setHintsLeft((h) => Math.max(0, h - 1));
      setHintUsedThisQ(true);
    } finally {
      setHintLoading(false);
    }
  };

  /* ═══════════════ NEXT QUESTION ═══════════════ */
  const nextQuestion = () => {
    if (currentQ + 1 < questions.length) setCurrentQ((q) => q + 1);
    else { setAnsweredAll(true); clearInterval(timerRef.current); }
  };

  /* ═══════════════ USE FOLLOW-UP ═══════════════ */
  const useFollowUp = () => {
    if (!followUp) return;
    setQuestions((prev) => { const next = [...prev]; next.splice(currentQ + 1, 0, followUp); return next; });
    setShowFollowUp(false);
    nextQuestion();
  };

  /* ═══════════════ FINISH ═══════════════ */
  const finishInterview = async () => {
    setIsFinishing(true);
    try {
      const res = await API.post("/live-interview/finish", { sessionId });
      setSummary(res.data.summary);
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    } catch {
      setSummary({ avgScore: 0, overallFeedback: "Session complete.", totalQuestions: questions.length, questions: [] });
    } finally {
      setIsFinishing(false);
    }
  };

  /* ═══════════════ TIMER EXPIRED AUTO-SUBMIT ═══════════════ */
  useEffect(() => {
    if (timedOut && phase === "answering") submitAnswer(true);
  }, [timedOut]);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const timerDanger = timeLeft <= 15;
  const timerWarn   = timeLeft <= 30 && !timerDanger;

  /* ════════════════════════════════════════════════
     RENDER: PERMISSION GATE FIRST
     Interview is completely blocked until allowed
  ════════════════════════════════════════════════ */
  if (!permissionGranted) {
    return (
      <PermissionGate
        onGranted={handlePermissionGranted}
        onDenied={() => navigate("/mock")}
      />
    );
  }

  /* ─────────────── LOADING SESSION ─────────────── */
  if (!session || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4"
           style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl"
             style={{ backgroundColor: "var(--accent)" }}>AI</div>
        <FiLoader className="w-10 h-10 animate-spin" style={{ color: "var(--accent)" }} />
        <p className="font-bold text-sm" style={{ color: "var(--text-secondary)" }}>
          Loading interview session...
        </p>
      </div>
    );
  }

  /* ─────────────── SUMMARY SCREEN ─────────────── */
  if (summary) {
    const avg = summary.avgScore;
    return (
      <div className="min-h-screen flex items-center justify-center p-6"
           style={{ backgroundColor: "var(--bg-primary)" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl w-full space-y-5">
          <div className="card p-10 text-center rounded-[2.5rem]">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white"
                 style={{ backgroundColor: "var(--accent)" }}>
              <FiAward size={36} />
            </div>
            <h2 className="text-4xl font-black mb-1" style={{ color: "var(--text-primary)" }}>Interview Complete!</h2>
            <p className="font-medium mb-6" style={{ color: "var(--text-secondary)" }}>
              {session.role} · {session.topic} · {session.difficulty}
            </p>
            <div className="text-8xl font-black tracking-tighter mb-1" style={{ color: scoreColor(avg) }}>
              {avg}<span className="text-3xl opacity-40">/10</span>
            </div>
            <p className="font-black text-lg mb-1" style={{ color: scoreColor(avg) }}>{scoreLabel(avg)}</p>
            <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
              {summary.totalQuestions} questions · {summary.hintsUsed ?? 0} hints used
            </p>
            <div className="h-2 rounded-full mx-auto max-w-xs mb-8" style={{ backgroundColor: "var(--border-color)" }}>
              <div className="h-full rounded-full transition-all duration-1000"
                   style={{ width: `${avg * 10}%`, backgroundColor: scoreColor(avg) }} />
            </div>
            {summary.overallFeedback && (
              <div className="p-5 rounded-2xl text-left mb-8"
                   style={{ backgroundColor: "var(--bg-primary)", borderLeft: "4px solid var(--accent)" }}>
                <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--text-primary)" }}>
                  {summary.overallFeedback}
                </p>
              </div>
            )}
            <div className="flex gap-4">
              <button onClick={() => navigate("/history")}
                className="flex-1 py-4 rounded-2xl border font-bold hover:bg-white/5"
                style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}>
                View History
              </button>
              <button onClick={() => navigate("/mock")}
                className="flex-1 py-4 rounded-2xl text-white font-bold active:scale-95"
                style={{ backgroundColor: "var(--accent)" }}>
                New Interview
              </button>
            </div>
          </div>

          {summary.questions?.length > 0 && (
            <div className="card rounded-[2rem] overflow-hidden">
              <div className="p-5 border-b" style={{ borderColor: "var(--border-color)" }}>
                <h3 className="font-black" style={{ color: "var(--text-primary)" }}>Question Breakdown</h3>
              </div>
              <div className="divide-y" style={{ borderColor: "var(--border-color)" }}>
                {summary.questions.map((q, i) => (
                  <div key={i} className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <p className="font-bold text-sm flex-1" style={{ color: "var(--text-primary)" }}>
                        Q{i + 1}: {q.question}
                      </p>
                      <span className="font-black flex-shrink-0 text-lg" style={{ color: scoreColor(q.aiScore) }}>
                        {q.aiScore ?? "—"}/10
                      </span>
                    </div>
                    {q.aiFeedback && (
                      <p className="text-xs leading-relaxed mt-1" style={{ color: "var(--text-secondary)" }}>
                        {q.aiFeedback}
                      </p>
                    )}
                    {q.hintUsed && (
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mt-1 inline-block"
                            style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>
                        Hint used
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  /* ─────────────── ALL ANSWERED ─────────────── */
  if (answeredAll) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6"
           style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="max-w-md w-full card p-10 text-center rounded-[2.5rem]">
          <FiCheckCircle size={48} className="mx-auto mb-6" style={{ color: "#10b981" }} />
          <h2 className="text-3xl font-black mb-3" style={{ color: "var(--text-primary)" }}>All Done!</h2>
          <p className="font-medium mb-8" style={{ color: "var(--text-secondary)" }}>
            You answered all {questions.length} questions. Ready for your AI report?
          </p>
          <button onClick={finishInterview} disabled={isFinishing}
            className="w-full py-5 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-3 disabled:opacity-60 transition-all active:scale-95"
            style={{ backgroundColor: "var(--accent)" }}>
            {isFinishing
              ? <><FiLoader className="animate-spin" /> Generating AI Report...</>
              : <><FiAward /> Get Full AI Feedback</>}
          </button>
        </div>
      </div>
    );
  }

  /* ─────────────── MAIN INTERVIEW ─────────────── */
  const ds = diffStyle[currentDiff] || diffStyle.Medium;

  return (
    <div className="min-h-screen flex flex-col font-sans"
         style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50" style={{ backgroundColor: "var(--border-color)" }}>
        <motion.div className="h-full" animate={{ width: `${(currentQ / questions.length) * 100}%` }}
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
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
              {session.topic}
            </p>
          </div>
          <span className="ml-2 px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border"
                style={{ backgroundColor: ds.bg, borderColor: ds.border, color: ds.color }}>
            {currentDiff}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-black"
               style={{ borderColor: "var(--border-color)", color: hintsLeft > 0 ? "#f59e0b" : "var(--text-secondary)" }}>
            <FiZap size={12} />
            {hintsLeft} hint{hintsLeft !== 1 ? "s" : ""}
          </div>
          <span className="text-xs font-black px-3 py-1.5 rounded-full border"
                style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
            {currentQ + 1}/{questions.length}
          </span>
          <button onClick={() => { mediaStreamRef.current?.getTracks().forEach(t => t.stop()); navigate("/mock"); }}
                  className="p-2 rounded-xl hover:bg-white/5" style={{ color: "var(--text-secondary)" }}>
            <FiX size={18} />
          </button>
        </div>
      </div>

      <main className="flex-1 px-6 py-6 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 space-y-4">

          {/* Video — always shows since permission was granted */}
          <div className="relative rounded-[2rem] overflow-hidden border shadow-2xl"
               style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md">
              <div className={`w-2 h-2 rounded-full ${listening ? "bg-rose-500 animate-pulse" : "bg-emerald-500"}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                {listening ? "Recording" : "Ready"}
              </span>
            </div>

            <video ref={videoRef} autoPlay muted playsInline
                   className="w-full aspect-video object-cover bg-slate-900" />

            <AnimatePresence>
              {!listening && phase === "answering" && !timedOut && !isSubmitting && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                  <p className="text-white font-bold text-lg max-w-xs text-center px-6">
                    Press <span className="text-indigo-300">Start Answer</span> and speak clearly
                  </p>
                </motion.div>
              )}
              {timedOut && phase === "answering" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-rose-900/60 backdrop-blur-[2px] flex items-center justify-center">
                  <p className="text-white font-black text-xl">⏰ Time's Up!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Transcript */}
          <div className="card p-5 min-h-[90px]">
            <div className="flex items-center gap-2 mb-2" style={{ color: "var(--text-secondary)" }}>
              <FiMessageSquare size={13} />
              <span className="text-[10px] font-black uppercase tracking-widest">Live Transcript</span>
              {listening && (
                <span className="ml-auto flex items-center gap-1 text-rose-400 text-[10px] font-black">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  Recording
                </span>
              )}
            </div>
            <p className={`text-base font-medium leading-relaxed ${!answerText ? "opacity-20" : ""}`}
               style={{ color: "var(--text-primary)" }}>
              {answerText || "Your speech will appear here in real-time..."}
            </p>
          </div>

          {/* Hint card */}
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

          {/* AI Evaluation */}
          <AnimatePresence>
            {evaluation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          className="card p-6 rounded-[2rem] border"
                          style={{ borderColor: `${scoreColor(evaluation.score)}40` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FiTrendingUp size={15} style={{ color: "var(--accent)" }} />
                    <span className="font-black text-sm uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>
                      AI Evaluation
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-black" style={{ color: scoreColor(evaluation.score) }}>
                      {evaluation.score}
                    </span>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>/10</span>
                  </div>
                </div>
                <div className="h-2 rounded-full mb-4" style={{ backgroundColor: "var(--border-color)" }}>
                  <motion.div className="h-full rounded-full"
                    initial={{ width: 0 }} animate={{ width: `${evaluation.score * 10}%` }}
                    transition={{ duration: 0.8 }}
                    style={{ backgroundColor: scoreColor(evaluation.score) }} />
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-primary)" }}>
                  {evaluation.feedback}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="p-3 rounded-xl"
                       style={{ backgroundColor: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">✓ Strength</p>
                    <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{evaluation.strengths}</p>
                  </div>
                  <div className="p-3 rounded-xl"
                       style={{ backgroundColor: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">↑ Improve</p>
                    <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{evaluation.improvement}</p>
                  </div>
                </div>
                {evaluation.adjustedDifficulty !== session.difficulty && (
                  <div className="flex items-center gap-2 text-xs font-bold"
                       style={{ color: evaluation.score >= 8 ? "#10b981" : "#f43f5e" }}>
                    {evaluation.score >= 8
                      ? <><FiTrendingUp size={12} /> Difficulty increased to {evaluation.adjustedDifficulty}</>
                      : <><FiTrendingDown size={12} /> Difficulty adjusted to {evaluation.adjustedDifficulty}</>}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-5 flex flex-col gap-4">

          {/* Timer */}
          <div className={`card p-4 flex items-center justify-between rounded-2xl border transition-all ${timerDanger ? "animate-pulse" : ""}`}
               style={{
                 borderColor: timerDanger ? "rgba(244,63,94,0.4)" : timerWarn ? "rgba(245,158,11,0.3)" : "var(--border-color)",
                 backgroundColor: timerDanger ? "rgba(244,63,94,0.05)" : "var(--bg-card)",
               }}>
            <div className="flex items-center gap-2"
                 style={{ color: timerDanger ? "#f43f5e" : timerWarn ? "#f59e0b" : "var(--text-secondary)" }}>
              <FiClock size={16} />
              <span className="text-xs font-black uppercase tracking-widest">Time Left</span>
            </div>
            <span className="text-3xl font-black tabular-nums"
                  style={{ color: timerDanger ? "#f43f5e" : timerWarn ? "#f59e0b" : "var(--text-primary)" }}>
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Question card */}
          <div className="card p-8 flex-1 flex flex-col justify-center relative overflow-hidden rounded-[2rem]">
            <div className="absolute top-0 right-0 opacity-[0.04] text-[10rem] font-black leading-none pr-4 pt-2"
                 style={{ color: "var(--accent)" }}>Q</div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
                  Question {currentQ + 1} of {questions.length}
                </p>
                <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase border"
                      style={{ backgroundColor: ds.bg, borderColor: ds.border, color: ds.color }}>
                  {currentDiff}
                </span>
              </div>
              <h3 className="text-xl font-black leading-snug tracking-tight mb-6"
                  style={{ color: "var(--text-primary)" }}>
                {questions[currentQ]}
              </h3>
              <div className="h-1 w-12 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3">
            {phase === "answering" && !timedOut && (
              <>
                {!listening ? (
                  <button onClick={startListening}
                    className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-white font-black transition-all active:scale-[0.98] shadow-xl"
                    style={{ backgroundColor: "var(--accent)" }}>
                    <FiMic size={20} /> Start Answer
                  </button>
                ) : (
                  <button onClick={stopListening}
                    className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 bg-rose-600 hover:bg-rose-500 text-white font-black transition-all active:scale-[0.98]">
                    <FiMicOff size={20} /> Stop Recording
                  </button>
                )}

                {answerText && !listening && (
                  <button onClick={() => submitAnswer(false)} disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-sm uppercase tracking-widest border transition-all disabled:opacity-60"
                    style={{ backgroundColor: "rgba(16,185,129,0.1)", borderColor: "rgba(16,185,129,0.3)", color: "#10b981" }}>
                    {isSubmitting
                      ? <><FiLoader className="animate-spin" /> Evaluating...</>
                      : <><FiCheckCircle /> Submit for AI Review</>}
                  </button>
                )}

                {!hintUsedThisQ && hintsLeft > 0 && (
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

            {phase === "evaluated" && (
              <>
                {followUp && !showFollowUp && (
                  <button onClick={() => setShowFollowUp(true)}
                    className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm border transition-all"
                    style={{ borderColor: "rgba(129,140,248,0.3)", color: "var(--accent)", backgroundColor: "rgba(99,102,241,0.05)" }}>
                    <FiZap size={14} /> Add AI Follow-up Question
                  </button>
                )}

                {showFollowUp && followUp && (
                  <div className="card p-4 rounded-2xl border"
                       style={{ borderColor: "rgba(129,140,248,0.3)", backgroundColor: "rgba(99,102,241,0.05)" }}>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
                      Follow-up Question
                    </p>
                    <p className="text-sm font-medium mb-3" style={{ color: "var(--text-primary)" }}>{followUp}</p>
                    <div className="flex gap-2">
                      <button onClick={useFollowUp}
                        className="flex-1 py-2 rounded-xl text-white font-bold text-xs"
                        style={{ backgroundColor: "var(--accent)" }}>
                        Add to Interview
                      </button>
                      <button onClick={() => setShowFollowUp(false)}
                        className="py-2 px-4 rounded-xl font-bold text-xs border"
                        style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                        Skip
                      </button>
                    </div>
                  </div>
                )}

                <button onClick={nextQuestion}
                  className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-white font-black transition-all active:scale-[0.98] shadow-xl"
                  style={{ backgroundColor: "var(--accent)" }}>
                  {currentQ + 1 < questions.length
                    ? <><FiArrowRight size={20} /> Next Question</>
                    : <><FiAward size={20} /> Finish Interview</>}
                </button>
              </>
            )}
          </div>

          {/* Replay + tip row */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => speakQuestion(questions[currentQ])}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-black transition-all hover:bg-white/5 active:scale-95"
              style={{ borderColor: "var(--border-color)", color: isSpeaking ? "var(--accent)" : "var(--text-secondary)" }}
              title="Replay question">
              {isSpeaking
                ? <><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse inline-block" /> Speaking...</>
                : <>🔊 Replay</>}
            </button>
            <p className="text-[10px] font-bold uppercase tracking-tight text-right flex-1"
               style={{ color: "var(--text-secondary)" }}>
              💡 {evaluation ? "Review feedback then continue" : "Speak clearly · Be specific"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}