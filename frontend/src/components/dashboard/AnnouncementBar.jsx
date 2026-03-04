// import { useEffect, useState } from "react";
// import { X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import React from "react";
// const announcements = [
//   {
//     text: "🚀 New questions added! Explore fresh DSA & System Design problems.",
//     link: "/questions",
//   },
//   {
//     text: "🔥 Don’t break your streak! Practice today & earn more credits.",
//     link: "/mock",
//   },
//   {
//     text: "🎯 AI Voice Practice improved — get clearer feedback now.",
//     link: "/mock",
//   },
// ];

// export default function AnnouncementBar() {
//   const [visible, setVisible] = useState(true);
//   const [index, setIndex] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % announcements.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   if (!visible) return null;

//   return (
//     <div
//       className="mb-10 flex items-center justify-between gap-4
//       px-6 py-3 rounded-xl
//       bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20
//       border border-white/10 backdrop-blur-md
//       shadow-[0_10px_30px_rgba(120,64,255,0.25)]"
//     >
//       <button
//         onClick={() => navigate(announcements[index].link)}
//         className="text-left text-sm md:text-base text-gray-200 hover:text-white transition"
//       >
//         <span className="font-semibold text-white">Update:</span>{" "}
//         {announcements[index].text}
//       </button>

//       <button
//         onClick={() => setVisible(false)}
//         className="text-gray-400 hover:text-white transition"
//         aria-label="Close"
//       >
//         <X size={18} />
//       </button>
//     </div>
//   );
// }


// // src/components/dashboard/AnnouncementBar.jsx
// import { useEffect, useState } from "react";
// import { X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import React from "react";

// const announcements = [
//   {
//     text: "🚀 New questions added! Explore fresh DSA & System Design problems.",
//     link: "/questions",
//   },
//   {
//     text: "🔥 Don’t break your streak! Practice today & earn more credits.",
//     link: "/mock",
//   },
//   {
//     text: "🎯 AI Voice Practice improved — get clearer feedback now.",
//     link: "/mock",
//   },
// ];

// export default function AnnouncementBar() {
//   const navigate = useNavigate();

//   // 🔐 Persist close state
//   const [visible, setVisible] = useState(
//     () => localStorage.getItem("announcement_closed") !== "true"
//   );

//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (!visible) return;

//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % announcements.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [visible]);

//   if (!visible) return null;

//   return (
//     <div
//       className="
//         sticky top-16 z-30
//         mx-6 mt-4
//         flex items-center justify-between gap-4
//         px-5 py-2.5
//         rounded-lg
//         bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20
//         border border-white/10
//         backdrop-blur-md
//       "
//     >
//       <button
//         onClick={() => navigate(announcements[index].link)}
//         className="text-left text-sm text-gray-200 hover:text-white transition"
//       >
//         <span className="font-semibold text-white">Update:</span>{" "}
//         {announcements[index].text}
//       </button>

//       <button
//         onClick={() => {
//           localStorage.setItem("announcement_closed", "true");
//           setVisible(false);
//         }}
//         className="text-gray-400 hover:text-white transition"
//         aria-label="Close announcement"
//       >
//         <X size={16} />
//       </button>
//     </div>
//   );
// }

// // src/components/dashboard/AnnouncementBar.jsx
// import { useEffect, useState } from "react";
// import { X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import React from "react";

// const announcements = [
//   {
//     text: "🚀 New questions added! Explore fresh DSA & System Design problems.",
//     link: "/questions",
//   },
//   {
//     text: "🔥 Don’t break your streak! Practice today & earn more credits.",
//     link: "/mock",
//   },
//   {
//     text: "🎯 AI Voice Practice improved — get clearer feedback now.",
//     link: "/mock",
//   },
// ];

// export default function AnnouncementBar() {
//   const navigate = useNavigate();

//   const [visible, setVisible] = useState(
//     () => localStorage.getItem("announcement_closed") !== "true"
//   );

//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (!visible) return;

//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % announcements.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [visible]);

//   if (!visible) return null;

//   return (
//     <div
//       className="
//         sticky top-16 z-30
//         mx-6 mt-4
//         flex items-center justify-between
//         px-5 py-2.5
//         rounded-lg
//         bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20
//         border border-white/10
//         backdrop-blur-md
//       "
//     >
//       <button
//         onClick={() => navigate(announcements[index].link)}
//         className="text-sm text-gray-200 hover:text-white transition"
//       >
//         <span className="font-semibold text-white">Update:</span>{" "}
//         {announcements[index].text}
//       </button>

//       <button
//         onClick={() => {
//           localStorage.setItem("announcement_closed", "true");
//           setVisible(false);
//         }}
//         className="text-gray-400 hover:text-white transition"
//         aria-label="Close"
//       >
//         <X size={16} />
//       </button>
//     </div>
//   );
// }

// new

// import { useEffect, useState } from "react";
// import { X, ArrowRight, Zap } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import React from "react";

// const announcements = [
//   {
//     tag: "Content",
//     text: "New questions added! Explore fresh DSA & System Design problems.",
//     link: "/questions",
//     color: "text-blue-400"
//   },
//   {
//     tag: "Streak",
//     text: "Don’t break your streak! Practice today & earn more credits.",
//     link: "/mock",
//     color: "text-orange-400"
//   },
//   {
//     tag: "Update",
//     text: "AI Voice Practice improved — get clearer feedback now.",
//     link: "/mock",
//     color: "text-purple-400"
//   },
// ];

// export default function AnnouncementBar() {
//   const navigate = useNavigate();
//   const [visible, setVisible] = useState(
//     () => localStorage.getItem("announcement_closed") !== "true"
//   );
//   const [index, setIndex] = useState(0);
//   const [fade, setFade] = useState(true);

//   useEffect(() => {
//     if (!visible) return;

//     const timer = setInterval(() => {
//       setFade(false); // Start fade out
//       setTimeout(() => {
//         setIndex((prev) => (prev + 1) % announcements.length);
//         setFade(true); // Fade back in with new index
//       }, 500); 
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [visible]);

//   if (!visible) return null;

//   return (
//     <div className="sticky top-[72px] z-30 mx-6 mt-4 group">
//       {/* Outer Container with animated border effect */}
//       <div className="relative overflow-hidden rounded-2xl bg-[#030712]/60 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 hover:border-purple-500/30 px-5 py-3">
        
//         {/* Animated Background Pulse */}
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-transparent opacity-50"></div>

//         <div className="relative flex items-center justify-between gap-4">
//           <div className="flex items-center gap-4 flex-1 overflow-hidden">
//             {/* Live Indicator */}
//             <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/5 border border-white/10">
//                <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
//               </span>
//               <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">Live</span>
//             </div>

//             {/* Announcement Text with Transition */}
//             <button
//               onClick={() => navigate(announcements[index].link)}
//               className={`flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-all duration-500 transform ${
//                 fade ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
//               }`}
//             >
//               <span className={`font-bold text-xs uppercase tracking-tight ${announcements[index].color}`}>
//                 [{announcements[index].tag}]
//               </span>
//               <span className="truncate font-medium">{announcements[index].text}</span>
//               <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
//             </button>
//           </div>

//           {/* Close Button */}
//           <button
//             onClick={() => {
//               localStorage.setItem("announcement_closed", "true");
//               setVisible(false);
//             }}
//             className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
//             aria-label="Close"
//           >
//             <X size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

//new final
// import { useEffect, useState } from "react";
// import { X, ArrowRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import React from "react";

// const announcements = [
//   {
//     tag: "Content",
//     text: "New questions added! Explore fresh DSA & System Design problems.",
//     link: "/questions",
//     color: "text-blue-600",
//     bg: "bg-blue-50",
//     border: "border-blue-100"
//   },
//   {
//     tag: "Streak",
//     text: "Don’t break your streak! Practice today & earn more credits.",
//     link: "/mock",
//     color: "text-orange-600",
//     bg: "bg-orange-50",
//     border: "border-orange-100"
//   },
//   {
//     tag: "Update",
//     text: "AI Voice Practice improved — get clearer feedback now.",
//     link: "/mock",
//     color: "text-indigo-600",
//     bg: "bg-indigo-50",
//     border: "border-indigo-100"
//   },
// ];

// export default function AnnouncementBar() {
//   const navigate = useNavigate();
//   const [visible, setVisible] = useState(
//     () => localStorage.getItem("announcement_closed") !== "true"
//   );
//   const [index, setIndex] = useState(0);
//   const [fade, setFade] = useState(true);

//   useEffect(() => {
//     if (!visible) return;

//     const timer = setInterval(() => {
//       setFade(false);
//       setTimeout(() => {
//         setIndex((prev) => (prev + 1) % announcements.length);
//         setFade(true);
//       }, 500); 
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [visible]);

//   if (!visible) return null;

//   const current = announcements[index];

//   return (
//     <div className="sticky top-[72px] z-30 mx-0 mt-2 group animate-fadeIn">
//       {/* Container - Light theme with soft tint based on category */}
//       <div className={`relative overflow-hidden rounded-2xl border transition-all duration-500 shadow-sm ${current.bg} ${current.border} px-5 py-3`}>
        
//         {/* Subtle Decorative Background Element */}
//         <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/40 to-transparent pointer-events-none"></div>

//         <div className="relative flex items-center justify-between gap-4">
//           <div className="flex items-center gap-4 flex-1 overflow-hidden">
            
//             {/* Live Indicator - Refined for Light Mode */}
//             <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white shadow-sm border border-slate-200/60">
//                <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
//               </span>
//               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Live</span>
//             </div>

//             {/* Announcement Text */}
//             <button
//               onClick={() => navigate(current.link)}
//               className={`flex items-center gap-2 text-sm transition-all duration-500 transform ${
//                 fade ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
//               }`}
//             >
//               <span className={`font-black text-[11px] uppercase tracking-wider ${current.color}`}>
//                 {current.tag}
//               </span>
//               <span className="truncate font-semibold text-slate-700">{current.text}</span>
//               <ArrowRight size={14} className={`shrink-0 transition-all ${current.color} opacity-0 group-hover:opacity-100 group-hover:translate-x-1`} />
//             </button>
//           </div>

//           {/* Close Button */}
//           <button
//             onClick={() => {
//               localStorage.setItem("announcement_closed", "true");
//               setVisible(false);
//             }}
//             className="p-1.5 rounded-lg hover:bg-white/60 text-slate-400 hover:text-slate-600 transition-colors"
//             aria-label="Close"
//           >
//             <X size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

//dark mode
// import { useEffect, useState } from "react";
// import { X, ArrowRight } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
// import React from "react";

// const announcements = [
//   {
//     tag: "Content",
//     text: "New questions added! Explore fresh DSA & System Design problems.",
//     link: "/questions",
//     color: "var(--accent)", 
//     glow: "rgba(99, 102, 241, 0.15)"
//   },
//   {
//     tag: "Streak",
//     text: "Don’t break your streak! Practice today & earn more credits.",
//     link: "/mock",
//     color: "#f59e0b", 
//     glow: "rgba(245, 158, 11, 0.15)"
//   },
//   {
//     tag: "Update",
//     text: "AI Voice Practice improved — get clearer feedback now.",
//     link: "/mock",
//     color: "#10b981", 
//     glow: "rgba(16, 185, 129, 0.15)"
//   },
// ];

// export default function AnnouncementBar() {
//   const navigate = useNavigate();
//   const location = useLocation(); // Hook to listen for URL changes
  
//   const [visible, setVisible] = useState(
//     () => sessionStorage.getItem("announcement_closed") !== "true"
//   );
  
//   const [index, setIndex] = useState(0);
//   const [fade, setFade] = useState(true);

//   // EFFECT 1: Re-check visibility whenever the user navigates
//   useEffect(() => {
//     const isClosed = sessionStorage.getItem("announcement_closed") === "true";
//     setVisible(!isClosed);
//   }, [location]); // Re-run this check every time the URL changes

//   // EFFECT 2: Handle the rotation animation
//   useEffect(() => {
//     if (!visible) return;

//     const timer = setInterval(() => {
//       setFade(false);
//       setTimeout(() => {
//         setIndex((prev) => (prev + 1) % announcements.length);
//         setFade(true);
//       }, 500); 
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [visible]);

//   if (!visible) return null;

//   const current = announcements[index];

//   return (
//     <div className="sticky top-[72px] z-30 mx-6 mt-4 group animate-fadeIn">
//       <div 
//         className="relative overflow-hidden rounded-2xl border transition-all duration-700 shadow-2xl px-5 py-2.5"
//         style={{ 
//           backgroundColor: "var(--bg-card)", 
//           borderColor: "var(--border-color)",
//           boxShadow: `0 10px 30px -10px ${current.glow}` 
//         }}
//       >
//         <div 
//           className="absolute inset-0 opacity-10 transition-all duration-700" 
//           style={{ background: `linear-gradient(90deg, ${current.color}, transparent 40%)` }}
//         />

//         <div className="relative flex items-center justify-between gap-4">
//           <div className="flex items-center gap-5 flex-1 overflow-hidden">
//             <div 
//               className="flex items-center gap-2 px-2.5 py-1 rounded-lg border transition-all"
//               style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)" }}
//             >
//               <span className="relative flex h-1.5 w-1.5">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: current.color }}></span>
//                 <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: current.color }}></span>
//               </span>
//               <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>Live</span>
//             </div>

//             <button
//               onClick={() => navigate(current.link)}
//               className={`flex items-center gap-3 text-sm transition-all duration-500 transform ${
//                 fade ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
//               }`}
//             >
//               <span 
//                 className="font-black text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-md border"
//                 style={{ 
//                   backgroundColor: current.glow, 
//                   color: current.color, 
//                   borderColor: `${current.color}20` 
//                 }}
//               >
//                 {current.tag}
//               </span>
//               <span className="truncate font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
//                 {current.text}
//               </span>
//               <ArrowRight size={14} className="shrink-0 transition-all group-hover:translate-x-1" style={{ color: current.color }} />
//             </button>
//           </div>

//           <button
//             onClick={() => {
//               sessionStorage.setItem("announcement_closed", "true");
//               setVisible(false);
//             }}
//             className="p-1.5 rounded-lg transition-colors hover:bg-white/5"
//             style={{ color: "var(--text-secondary)" }}
//             aria-label="Close"
//           >
//             <X size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

//before is final and change in layout.jsx
import { useEffect, useState } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function AnnouncementBar() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Show once per login session
  useEffect(() => {
    const isClosed = sessionStorage.getItem("announcement_closed");
    if (isClosed !== "true") {
      setVisible(true);
      setTimeout(() => setAnimate(true), 50);
    }
  }, []);

  if (!visible) return null;

  const closeAnnouncement = () => {
    sessionStorage.setItem("announcement_closed", "true");
    setVisible(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md transition-opacity duration-500">
      
      <div
        className={`relative w-[92%] max-w-3xl rounded-3xl border p-12 shadow-2xl transition-all duration-500 ${
          animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{
          background: "linear-gradient(145deg, var(--bg-card), #111827)",
          borderColor: "var(--border-color)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeAnnouncement}
          className="absolute top-6 right-6 text-[var(--text-secondary)] hover:text-white transition"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="text-center space-y-8">
          
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-indigo-600/20 animate-pulse">
              <Sparkles size={36} className="text-indigo-400" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold text-[var(--text-primary)]">
            🚀 What’s New in PrepVisionAI
          </h2>

          {/* Description */}
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            We’ve added new DSA & System Design questions, improved AI Voice Practice,
            and enhanced your daily streak rewards. Stay consistent and level up faster.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            
            <button
              onClick={() => {
                closeAnnouncement();
                navigate("/questions");
              }}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center gap-2 transition"
            >
              Explore Questions <ArrowRight size={16} />
            </button>

            <button
              onClick={() => {
                closeAnnouncement();
                navigate("/mock");
              }}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-semibold flex items-center justify-center gap-2 transition"
            >
              Continue Streak 🔥 <ArrowRight size={16} />
            </button>

            <button
              onClick={() => {
                closeAnnouncement();
                navigate("/mock");
              }}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold flex items-center justify-center gap-2 transition"
            >
              Try AI Voice <ArrowRight size={16} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}