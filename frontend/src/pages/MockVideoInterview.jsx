// import React, { useEffect, useRef, useState } from "react";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function MockVideoInterview() {
//   const videoRef = useRef(null);
//   const navigate = useNavigate();

//   const [cameraAllowed, setCameraAllowed] = useState(false);
//   const [micAllowed, setMicAllowed] = useState(false);
//   const [error, setError] = useState("");

//   /* --------------------------------
//      REQUEST CAMERA + MIC
//   -------------------------------- */
//   useEffect(() => {
//     async function requestMedia() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });

//         videoRef.current.srcObject = stream;
//         setCameraAllowed(true);
//         setMicAllowed(true);
//       } catch (err) {
//         setError("Camera & Microphone permission is required to continue.");
//       }
//     }

//     requestMedia();
//   }, []);

//   const startInterview = () => {
//     navigate("/mock/video/session");
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen pt-28 px-6 text-white
//         bg-gradient-to-b from-black via-gray-900 to-black">

//         <div className="max-w-5xl mx-auto">

//           {/* HEADER */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-8"
//           >
//             <h1 className="text-4xl font-extrabold
//               bg-gradient-to-r from-purple-400 to-blue-400
//               text-transparent bg-clip-text">
//               Video Interview Setup
//             </h1>

//             <p className="text-gray-400 mt-2">
//               Camera & microphone are mandatory for this interview
//             </p>
//           </motion.div>

//           {/* MAIN GRID */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//             {/* VIDEO PREVIEW */}
//             <div className="p-4 rounded-2xl bg-black/40
//               border border-white/20 shadow-xl">

//               <video
//                 ref={videoRef}
//                 autoPlay
//                 muted
//                 className="rounded-xl w-full h-72 object-cover bg-black"
//               />

//               <div className="mt-3 flex justify-between text-sm text-gray-300">
//                 <span>
//                   🎥 Camera:{" "}
//                   <span className={cameraAllowed ? "text-green-400" : "text-red-400"}>
//                     {cameraAllowed ? "Active" : "Blocked"}
//                   </span>
//                 </span>

//                 <span>
//                   🎙 Microphone:{" "}
//                   <span className={micAllowed ? "text-green-400" : "text-red-400"}>
//                     {micAllowed ? "Active" : "Blocked"}
//                   </span>
//                 </span>
//               </div>
//             </div>

//             {/* INFO PANEL */}
//             <div className="p-6 rounded-2xl bg-white/10
//               border border-white/20 shadow-xl">

//               <h2 className="text-xl font-semibold text-purple-300 mb-4">
//                 AI Will Evaluate
//               </h2>

//               <ul className="space-y-3 text-gray-300 text-sm">
//                 <li>👀 Eye contact & focus</li>
//                 <li>🤲 Hand gestures (future)</li>
//                 <li>🗣 Voice clarity</li>
//                 <li>⏱ Response confidence</li>
//                 <li>😐 Facial expressions</li>
//               </ul>

//               {error && (
//                 <div className="mt-4 p-3 rounded-lg bg-red-600/20
//                   text-red-300 border border-red-500">
//                   {error}
//                 </div>
//               )}

//               <button
//                 disabled={!cameraAllowed || !micAllowed}
//                 onClick={startInterview}
//                 className="mt-6 w-full py-3 rounded-lg
//                 bg-gradient-to-r from-purple-600 to-blue-600
//                 font-semibold hover:opacity-90 transition
//                 disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 Start Video Interview
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


//dark mode
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiVideo, FiMic, FiCheck, FiAlertCircle, FiShield, FiCpu } from "react-icons/fi";

export default function MockVideoInterview() {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [micAllowed, setMicAllowed] = useState(false);
  const [error, setError] = useState("");

  /* --------------------------------
     REQUEST CAMERA + MIC
  -------------------------------- */
  useEffect(() => {
    async function requestMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraAllowed(true);
        setMicAllowed(true);
      } catch (err) {
        setError("Camera & Microphone permission is required to continue.");
      }
    }

    requestMedia();
  }, []);

  const startInterview = () => {
    navigate("/mock/video/session");
  };

  return (
    <div className="min-h-screen transition-colors duration-500 font-sans"
         style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Navbar />

      <div className="max-w-6xl mx-auto pt-32 px-6 pb-20">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4">
            <FiShield /> Hardware Validation
          </div>
          <h1 className="text-5xl font-black tracking-tighter leading-tight">
            Interview <span style={{ color: "var(--accent)" }}>Setup</span>
          </h1>
          <p className="mt-2 font-medium" style={{ color: "var(--text-secondary)" }}>
            Please ensure your environment is well-lit and quiet for the best AI analysis.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* VIDEO PREVIEW */}
          <div className="lg:col-span-7 card p-4 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
             {/* Decorative Corner Glow */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -mr-16 -mt-16" />

             <div className="relative aspect-video rounded-3xl bg-black overflow-hidden border border-white/5 shadow-inner">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover mirror"
                />
                
                {/* Active Stream Overlay */}
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                    <div className={`w-2 h-2 rounded-full ${cameraAllowed ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                    <span className="text-[9px] font-black text-white uppercase tracking-tighter">Live Preview</span>
                </div>
             </div>

             <div className="mt-6 flex flex-wrap gap-4 justify-between">
                <StatusBadge icon={<FiVideo />} label="Camera" status={cameraAllowed} />
                <StatusBadge icon={<FiMic />} label="Microphone" status={micAllowed} />
             </div>
          </div>

          {/* INFO PANEL */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="card p-8 rounded-[2.5rem] border-[var(--border-color)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-[var(--accent)] border border-indigo-500/20">
                    <FiCpu size={20} />
                </div>
                <h2 className="text-xl font-bold tracking-tight">AI Evaluation Metrics</h2>
              </div>

              <ul className="space-y-4">
                {[
                    { label: "Eye Contact & Focus", icon: "👀" },
                    { label: "Voice Clarity & Tone", icon: "🗣" },
                    { label: "Response Confidence", icon: "⏱" },
                    { label: "Facial Expression Analysis", icon: "😐" }
                ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-sm font-bold p-3 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                        <span className="text-xl">{item.icon}</span>
                        <span style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                        <FiCheck className="ml-auto text-emerald-500" />
                    </li>
                ))}
              </ul>

              {error && (
                <div className="mt-6 p-4 rounded-2xl flex items-start gap-3 border"
                     style={{ backgroundColor: "rgba(225, 29, 72, 0.05)", borderColor: "rgba(225, 29, 72, 0.2)" }}>
                  <FiAlertCircle className="text-rose-500 mt-0.5 shrink-0" />
                  <p className="text-xs font-bold leading-relaxed text-rose-400">{error}</p>
                </div>
              )}

              <button
                disabled={!cameraAllowed || !micAllowed}
                onClick={startInterview}
                className="group mt-8 w-full py-5 rounded-2xl font-black text-lg text-white shadow-xl transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3"
                style={{ 
                    backgroundColor: "var(--accent)",
                    boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)" 
                }}
              >
                Enter Interview Room <FiCpu className="group-hover:rotate-180 transition-transform duration-700" />
              </button>
            </div>

            <p className="text-center text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
                By starting, you agree to local data processing for AI analysis.
            </p>
          </div>

        </div>
      </div>

      <style jsx>{`
        .mirror { transform: scaleX(-1); }
      `}</style>
    </div>
  );
}

function StatusBadge({ icon, label, status }) {
    return (
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
            <span className={status ? "text-[var(--accent)]" : "text-rose-500"}>{icon}</span>
            <span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>{label}:</span>
            <span className={`text-xs font-black uppercase tracking-widest ${status ? "text-emerald-500" : "text-rose-500"}`}>
                {status ? "Active" : "Blocked"}
            </span>
        </div>
    )
}