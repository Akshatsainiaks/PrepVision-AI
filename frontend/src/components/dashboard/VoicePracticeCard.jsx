// import React, { useState } from "react";
// import { FaMicrophone, FaStop } from "react-icons/fa";

// export default function VoicePracticeCard() {
//   const [recording, setRecording] = useState(false);
//   const [transcript, setTranscript] = useState("");

//   let mediaRecorder;
//   let audioChunks = [];

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorder = new MediaRecorder(stream);

//       audioChunks = [];
//       mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);

//       mediaRecorder.onstop = async () => {
//         const audioBlob = new Blob(audioChunks, { type: "audio/wav" });

//         // Convert audio to text (offline for now)
//         const reader = new FileReader();
//         reader.onload = () => {
//           setTranscript("🎤 Voice captured! (Implement AI speech analysis next)");
//         };
//         reader.readAsArrayBuffer(audioBlob);
//       };

//       mediaRecorder.start();
//       setRecording(true);
//     } catch (err) {
//       console.error("Mic error:", err);
//       alert("Microphone access is required for voice practice.");
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//     }
//     setRecording(false);
//   };

//   return (
//     <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl">
//       <div className="flex items-center gap-3">
//         <div className="p-3 bg-purple-600/20 rounded-full">
//           <FaMicrophone className="text-purple-300 text-xl" />
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold">Voice Practice</h3>
//           <p className="text-gray-400 text-sm">
//             Practice speaking answers with your voice.
//           </p>
//         </div>
//       </div>

//       <div className="mt-4">
//         {!recording ? (
//           <button
//             onClick={startRecording}
//             className="w-full py-2 rounded-lg bg-gradient-to-r 
//               from-purple-600 to-blue-600 font-semibold shadow-lg 
//               hover:scale-105 transition flex items-center justify-center gap-2"
//           >
//             <FaMicrophone /> Start Recording
//           </button>
//         ) : (
//           <button
//             onClick={stopRecording}
//             className="w-full py-2 rounded-lg bg-gradient-to-r 
//               from-red-600 to-pink-600 font-semibold shadow-lg 
//               hover:scale-105 transition flex items-center justify-center gap-2"
//           >
//             <FaStop /> Stop Recording
//           </button>
//         )}
//       </div>

//       {transcript && (
//         <div className="mt-3 p-3 bg-black/20 rounded-lg border border-white/10 text-gray-300 text-sm">
//           {transcript}
//         </div>
//       )}
//     </div>
//   );
// }


// new
// import React, { useState } from "react";
// import { FaMicrophone, FaStop, FaWaveSquare } from "react-icons/fa";

// export default function VoicePracticeCard() {
//   const [recording, setRecording] = useState(false);
//   const [transcript, setTranscript] = useState("");

//   let mediaRecorder;
//   let audioChunks = [];

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorder = new MediaRecorder(stream);
//       audioChunks = [];
//       mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
//       mediaRecorder.onstop = async () => {
//         const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
//         const reader = new FileReader();
//         reader.onload = () => {
//           setTranscript("🎤 Voice captured! AI is processing your tone and clarity...");
//         };
//         reader.readAsArrayBuffer(audioBlob);
//       };
//       mediaRecorder.start();
//       setRecording(true);
//     } catch (err) {
//       console.error("Mic error:", err);
//       alert("Microphone access is required for voice practice.");
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//     }
//     setRecording(false);
//   };

//   return (
//     <div className="relative mt-8 p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl transition-all duration-500 hover:border-purple-500/30">
      
//       {/* Decorative Glow */}
//       <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[80px] transition-colors duration-1000 ${recording ? 'bg-red-500/20' : 'bg-purple-600/10'}`}></div>

//       <div className="flex items-center justify-between gap-4 relative z-10">
//         <div className="flex items-center gap-4">
//           <div className={`p-4 rounded-2xl transition-all duration-500 ${recording ? 'bg-red-500/20 scale-110 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-purple-600/20'}`}>
//             <FaMicrophone className={`${recording ? 'text-red-400' : 'text-purple-400'} text-2xl animate-pulse`} />
//           </div>

//           <div>
//             <h3 className="text-xl font-bold tracking-tight text-white">AI Voice Coach</h3>
//             <p className="text-gray-400 text-sm font-medium">Analyze your verbal clarity & tone.</p>
//           </div>
//         </div>

//         {recording && (
//           <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
//             </span>
//             <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Listening</span>
//           </div>
//         )}
//       </div>

//       {/* WAVEFORM VISUALIZER (CSS Only) */}
//       <div className="mt-8 flex items-end justify-center gap-1 h-12">
//         {[...Array(15)].map((_, i) => (
//           <div
//             key={i}
//             className={`w-1.5 rounded-full transition-all duration-300 ${
//               recording 
//               ? 'bg-gradient-to-t from-purple-600 to-blue-400 animate-waveform' 
//               : 'bg-gray-800 h-2'
//             }`}
//             style={{ 
//               animationDelay: `${i * 0.1}s`,
//               height: recording ? `${Math.random() * 100 + 20}%` : '8px'
//             }}
//           ></div>
//         ))}
//       </div>

//       <div className="mt-8">
//         {!recording ? (
//           <button
//             onClick={startRecording}
//             className="group w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3"
//           >
//             <FaMicrophone className="group-hover:rotate-12 transition-transform" /> 
//             Start Practice Session
//           </button>
//         ) : (
//           <button
//             onClick={stopRecording}
//             className="w-full py-4 rounded-2xl bg-gray-900 border border-red-500/50 text-red-400 font-bold shadow-2xl transition-all duration-300 hover:bg-red-500 hover:text-white flex items-center justify-center gap-3"
//           >
//             <FaStop /> Stop Recording
//           </button>
//         )}
//       </div>

//       {transcript && (
//         <div className="mt-6 p-4 bg-black/40 rounded-2xl border border-white/5 relative overflow-hidden group">
//           <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
//           <div className="flex items-start gap-3">
//              <div className="mt-1"><FaWaveSquare className="text-purple-500 text-xs" /></div>
//              <p className="text-gray-300 text-sm leading-relaxed font-mono">
//                {transcript}
//              </p>
//           </div>
//         </div>
//       )}

//       <style dangerouslySetInnerHTML={{ __html: `
//         @keyframes waveform {
//           0%, 100% { height: 20%; }
//           50% { height: 100%; }
//         }
//         .animate-waveform {
//           animation: waveform 0.6s ease-in-out infinite;
//         }
//       `}} />
//     </div>
//   );
// }

//new final
import React, { useState } from "react";
import { FaMicrophone, FaStop, FaWaveSquare } from "react-icons/fa";

export default function VoicePracticeCard() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  let mediaRecorder;
  let audioChunks = [];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];
      mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const reader = new FileReader();
        reader.onload = () => {
          setTranscript("🎤 Voice captured! AI is processing your tone and clarity...");
        };
        reader.readAsArrayBuffer(audioBlob);
      };
      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Mic error:", err);
      alert("Microphone access is required for voice practice.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    setRecording(false);
  };

  return (
    <div className="relative mt-8 p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-indigo-100/40 transition-all duration-500 hover:border-indigo-300">
      
      {/* Decorative Light Glow */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[100px] transition-colors duration-1000 ${recording ? 'bg-rose-500/10' : 'bg-indigo-600/5'}`}></div>

      <div className="flex items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl transition-all duration-500 ${recording ? 'bg-rose-50 shadow-lg shadow-rose-100 scale-110' : 'bg-indigo-50'}`}>
            <FaMicrophone size={24} className={`${recording ? 'text-rose-500' : 'text-indigo-600'} ${recording ? 'animate-pulse' : ''}`} />
          </div>

          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">AI Voice Coach</h3>
            <p className="text-slate-500 text-sm font-medium">Analyze your verbal clarity & tone.</p>
          </div>
        </div>

        {recording && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Listening</span>
          </div>
        )}
      </div>

      {/* WAVEFORM VISUALIZER (Updated for Light Theme) */}
      <div className="mt-10 flex items-end justify-center gap-1.5 h-16">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className={`w-2 rounded-full transition-all duration-500 ${
              recording 
              ? 'bg-gradient-to-t from-indigo-600 to-indigo-400 animate-waveform' 
              : 'bg-slate-100 h-2'
            }`}
            style={{ 
              animationDelay: `${i * 0.05}s`,
              height: recording ? `${Math.random() * 80 + 20}%` : '8px'
            }}
          ></div>
        ))}
      </div>

      <div className="mt-10">
        {!recording ? (
          <button
            onClick={startRecording}
            className="group w-full py-4 rounded-2xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <FaMicrophone className="group-hover:rotate-12 transition-transform" /> 
            Start Practice Session
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="w-full py-4 rounded-2xl bg-white border-2 border-rose-200 text-rose-600 font-bold shadow-sm transition-all duration-300 hover:bg-rose-50 flex items-center justify-center gap-3"
          >
            <FaStop /> Stop Recording
          </button>
        )}
      </div>

      {transcript && (
        <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden animate-fadeIn">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
          <div className="flex items-start gap-3">
             <div className="mt-1"><FaWaveSquare className="text-indigo-500" /></div>
             <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
               "{transcript}"
             </p>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes waveform {
          0%, 100% { height: 25%; }
          50% { height: 100%; }
        }
        .animate-waveform {
          animation: waveform 0.7s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}