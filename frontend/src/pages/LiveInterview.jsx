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
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import { FiMic, FiMicOff, FiArrowRight, FiVideo, FiLoader, FiMessageSquare } from "react-icons/fi";

export default function LiveInterview() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const recognitionRef = useRef(null);

  const [session, setSession] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [listening, setListening] = useState(false);
  const [answerText, setAnswerText] = useState("");

  const questions = [
    "Tell me about yourself.",
    "What is your strongest technical skill?",
    "Explain a challenging project you worked on."
  ];

  /* -------------------------------
     FETCH SESSION
  -------------------------------- */
  useEffect(() => {
    if (!sessionId) return navigate("/mock");

    API.get(`/live-interview/session/${sessionId}`)
      .then((res) => setSession(res.data))
      .catch(() => navigate("/mock"));
  }, [sessionId, navigate]);

  /* -------------------------------
     START CAMERA
  -------------------------------- */
  useEffect(() => {
    if (!session) return;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMediaStream(stream);
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => alert("Camera & microphone permission required"));

    return () => {
      mediaStream?.getTracks().forEach((t) => t.stop());
    };
  }, [session]);

  /* -------------------------------
     AI SPEAK QUESTION
  -------------------------------- */
  useEffect(() => {
    if (!session) return;

    const utterance = new SpeechSynthesisUtterance(questions[currentQuestion]);
    utterance.lang = "en-US";
    utterance.rate = 0.9; // Slightly slower for professional feel
    window.speechSynthesis.speak(utterance);

    setAnswerText("");
  }, [currentQuestion, session]);

  /* -------------------------------
     SPEECH RECOGNITION
  -------------------------------- */
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech Recognition not supported");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setAnswerText(transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const nextQuestion = () => {
    stopListening();
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((q) => q + 1);
    } else {
      navigate("/mock");
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center transition-colors duration-300" 
           style={{ backgroundColor: "var(--bg-primary)" }}>
        <FiLoader className="w-12 h-12 animate-spin mb-4" style={{ color: "var(--accent)" }} />
        <p style={{ color: "var(--text-secondary)" }}>Configuring AI Interviewer...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300"
         style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-6 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: VIDEO FEED */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative group rounded-[2.5rem] overflow-hidden border shadow-2xl" 
               style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            
            {/* Camera Overlay Badge */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
              <div className={`w-2 h-2 rounded-full ${listening ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                {listening ? 'Recording Live' : 'Camera On'}
              </span>
            </div>

            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full aspect-video object-cover bg-slate-900"
            />

            {/* AI Overlay Message */}
            <AnimatePresence>
              {!listening && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-12 text-center"
                >
                  <p className="text-lg font-bold text-white max-w-sm leading-relaxed">
                    AI is listening. Click 'Start Answer' when you're ready to respond.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* TRANSCRIPT AREA */}
          <div className="card p-6 min-h-[120px] relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3 text-[var(--text-secondary)]">
              <FiMessageSquare size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Real-time Transcript</span>
            </div>
            <p className={`text-lg font-medium leading-relaxed ${!answerText ? 'opacity-30' : 'opacity-100'}`}>
              {answerText || "Your response will appear here as you speak..."}
            </p>
          </div>
        </div>

        {/* RIGHT: AI INTERACTION */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* QUESTION CARD */}
          <div className="card p-8 flex-1 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <FiVideo size={120} />
            </div>
            
            <div className="relative z-10">
              <p className="text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <h3 className="text-3xl font-black leading-tight tracking-tight mb-6">
                {questions[currentQuestion]}
              </h3>
              <div className="h-1 w-20 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
            </div>
          </div>

          {/* CONTROLS */}
          <div className="space-y-4">
            {!listening ? (
              <button
                onClick={startListening}
                className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-white font-black text-lg transition-all active:scale-[0.98] shadow-xl shadow-indigo-500/10"
                style={{ backgroundColor: "var(--accent)" }}
              >
                <FiMic size={22} /> Start Answer
              </button>
            ) : (
              <button
                onClick={stopListening}
                className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 bg-rose-600 hover:bg-rose-500 text-white font-black text-lg transition-all active:scale-[0.98] shadow-xl shadow-rose-900/20"
              >
                <FiMicOff size={22} /> Stop Answer
              </button>
            )}

            <button
              onClick={nextQuestion}
              className="w-full py-4 rounded-2xl border flex items-center justify-center gap-2 font-black text-sm uppercase tracking-widest transition-all hover:bg-white/5 active:scale-[0.98]"
              style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
            >
              Next Question <FiArrowRight />
            </button>
          </div>

          {/* FOOTER TIPS */}
          <div className="p-4 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-tight">
            Tip: Try to maintain eye contact with the camera and speak clearly for better AI analysis.
          </div>
        </div>
      </main>
    </div>
  );
}