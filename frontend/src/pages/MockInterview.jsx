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

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaKeyboard, FaVideo } from "react-icons/fa";
import { motion } from "framer-motion";
import API from "../api/api";
import { FiCheckCircle, FiInfo } from "react-icons/fi";

export default function MockInterviewHome() {
  const navigate = useNavigate();

  const startLiveInterview = async () => {
    try {
      const res = await API.post("/live-interview/start", {
        topic: "General",
        role: "SDE",
      });

      navigate(`/mock/live/session/${res.data._id}`);
    } catch (err) {
      alert("Failed to start live interview");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-6 py-12 animate-fadeIn">
      <div className="max-w-5xl mx-auto">

        {/* TITLE SECTION */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black tracking-tight text-slate-900"
          >
            Mock <span className="text-indigo-600">Interview</span>
          </motion.h1>

          <p className="text-slate-500 mt-6 text-lg max-w-2xl mx-auto font-medium">
            Master your delivery with AI-powered simulations. 
            Choose the style that fits your current goals.
          </p>
        </div>

        {/* INTERVIEW MODE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          {/* WRITTEN INTERVIEW */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/mock/written")}
            className="group cursor-pointer relative p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/40 hover:border-purple-300 hover:shadow-purple-100 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
              <FaKeyboard size={30} className="text-purple-600 group-hover:text-white" />
            </div>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Written <br /> Interview
            </h2>

            <p className="text-slate-500 mt-4 font-medium leading-relaxed">
              Perfect your technical articulation. Type your answers and let AI evaluate your logic and depth.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Topic-based questions",
                "Logical evaluation",
                "Detailed feedback report"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                  <FiCheckCircle className="text-purple-500" />
                  {item}
                </div>
              ))}
            </div>

            <span className="absolute top-6 right-6 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 border border-purple-100">
              Beginner Friendly
            </span>
          </motion.div>

          {/* LIVE AI INTERVIEW */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={startLiveInterview}
            className="group cursor-pointer relative p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/40 hover:border-indigo-300 hover:shadow-indigo-100 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <FaVideo size={30} className="text-indigo-600 group-hover:text-white" />
            </div>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Live AI <br /> Interview
            </h2>

            <p className="text-slate-500 mt-4 font-medium leading-relaxed">
              The ultimate simulation. Practice with camera, mic, and real-time AI voice interaction.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Voice-based interaction",
                "Gesture & Eye-contact feedback",
                "Advanced confidence analysis"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                  <FiCheckCircle className="text-indigo-500" />
                  {item}
                </div>
              ))}
            </div>

            <span className="absolute top-6 right-6 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-100">
              ⭐ Recommended
            </span>
          </motion.div>

        </div>

        {/* FOOTER NOTE */}
        <div className="mt-16 flex items-center justify-center gap-3 text-slate-400 bg-white/50 border border-slate-100 py-3 px-6 rounded-2xl max-w-fit mx-auto shadow-sm">
          <FiInfo className="text-indigo-500" />
          <p className="text-sm font-bold uppercase tracking-tight">
            Live interview requires camera & microphone access
          </p>
        </div>

      </div>
    </div>
  );
}