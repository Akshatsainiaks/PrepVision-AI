// import Navbar from "../components/Navbar";
// import { useEffect, useState } from "react";
// import React from "react";
// import { IoNotificationsOutline } from "react-icons/io5";
// // import { API } from "../api/api";
// import API from "../api/api";

// export default function Notifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch notifications
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await API.get("/notifications/me"); // create this API later
//         setNotifications(res.data.notifications || []);
//       } catch (err) {
//         console.error(err);
//       }
//       setLoading(false);
//     })();
//   }, []);

//   const markAllAsRead = async () => {
//     try {
//       await API.post("/notifications/mark-all"); // create backend route later

//       // Update UI instantly
//       setNotifications((prev) =>
//         prev.map((n) => ({ ...n, read: true }))
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white">
//       <Navbar />

//       <div className="max-w-3xl mx-auto p-8">

//         {/* Title */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-4xl font-extrabold bg-gradient-to-r 
//                from-purple-400 to-blue-400 text-transparent bg-clip-text">
//             Notifications
//           </h1>

//           <button
//             onClick={markAllAsRead}
//             className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 
//                 hover:bg-white/20 transition"
//           >
//             Mark all as read
//           </button>
//         </div>

//         {loading ? (
//           <p className="text-gray-400">Loading notifications...</p>
//         ) : notifications.length === 0 ? (
//           <div className="text-center text-gray-400 mt-10">
//             <IoNotificationsOutline size={50} className="mx-auto mb-4" />
//             No notifications yet.
//           </div>
//         ) : (
//           <div className="space-y-5">
//             {notifications.map((n) => (
//               <div
//                 key={n._id}
//                 className={`relative p-5 rounded-xl backdrop-blur-xl bg-white/10 
//                 border border-white/20 shadow-lg transition hover:scale-[1.01]`}
//               >
//                 {/* Unread dot */}
//                 {!n.read && (
//                   <span className="absolute top-3 right-3 w-3 h-3 
//                       bg-purple-500 rounded-full shadow-lg animate-pulse"></span>
//                 )}

//                 <h3 className="text-lg font-semibold">
//                   {n.title || "New Update"}
//                 </h3>

//                 <p className="text-gray-300 mt-1">
//                   {n.message}
//                 </p>

//                 <p className="text-xs text-gray-500 mt-3">
//                   {new Date(n.createdAt).toLocaleString()}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* AI Recommendations */}
//         <div className="mt-12">
//           <h2 className="text-2xl font-semibold mb-4">AI Recommendations</h2>

//           <div className="space-y-4">

//             <div className="p-5 rounded-xl backdrop-blur-xl bg-white/10 
//                 border border-purple-400/20 shadow-purple-500/20 shadow">
//               <h3 className="font-semibold">Your interview accuracy improved!</h3>
//               <p className="text-gray-300 text-sm mt-1">
//                 Try a new mock interview to continue progress.
//               </p>
//             </div>

//             <div className="p-5 rounded-xl backdrop-blur-xl bg-white/10 
//                 border border-blue-400/20 shadow-blue-500/20 shadow">
//               <h3 className="font-semibold">We found 5 new questions for you</h3>
//               <p className="text-gray-300 text-sm mt-1">
//                 Based on your performance, here are relevant topics to practice.
//               </p>
//             </div>

//             <div className="p-5 rounded-xl backdrop-blur-xl bg-white/10 
//                 border border-teal-400/20 shadow-teal-500/20 shadow">
//               <h3 className="font-semibold">Daily Challenge Available</h3>
//               <p className="text-gray-300 text-sm mt-1">
//                 Take a 5-question AI challenge to earn bonus credits.
//               </p>
//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


//final new
// import Navbar from "../components/Navbar";
// import { useEffect, useState } from "react";
// import React from "react";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { FiCheckCircle, FiBell, FiZap, FiTarget, FiStar, FiChevronRight } from "react-icons/fi";
// import API from "../api/api";

// export default function Notifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await API.get("/notifications/me");
//         setNotifications(res.data.notifications || []);
//       } catch (err) {
//         console.error(err);
//       }
//       setLoading(false);
//     })();
//   }, []);

//   const markAllAsRead = async () => {
//     try {
//       await API.post("/notifications/mark-all");
//       setNotifications((prev) =>
//         prev.map((n) => ({ ...n, read: true }))
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     // We remove pt-24 here and move it to the inner container for better layout control
//     <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100">
//       <Navbar />

//       {/* LAYOUT FIX: 
//           - Using "max-w-4xl" instead of "3xl" for better horizontal breathing room.
//           - "pt-28" ensures it clears the fixed Navbar without overlapping.
//       */}
//       <div className="max-w-4xl mx-auto p-6 md:p-10 pt-28">

//         {/* Header Section: Improved with a glass-morphism background for the button */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
//           <div className="flex items-center gap-5">
//             <div className="p-4 bg-indigo-600 rounded-[22px] text-white shadow-xl shadow-indigo-100 ring-4 ring-white">
//               <FiBell size={24} />
//             </div>
//             <div>
//               <h1 className="text-4xl font-black tracking-tight text-slate-900">
//                 InBox
//               </h1>
//               <p className="text-slate-500 font-semibold text-sm mt-0.5 tracking-tight">
//                 {notifications.filter(n => !n.read).length} new updates waiting for you
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={markAllAsRead}
//             className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm active:scale-95 group"
//           >
//             <FiCheckCircle className="group-hover:rotate-12 transition-transform" />
//             Mark all as read
//           </button>
//         </div>

//         {/* Notifications List: Use a Bento-box style container */}
//         <div className="space-y-4">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[32px] border border-slate-100 shadow-sm animate-pulse">
//                 <div className="w-12 h-12 bg-slate-100 rounded-2xl mb-4"></div>
//                 <div className="h-4 w-32 bg-slate-100 rounded-full mb-2"></div>
//                 <div className="h-3 w-48 bg-slate-50 rounded-full"></div>
//             </div>
//           ) : notifications.length === 0 ? (
//             <div className="text-center py-20 bg-white rounded-[32px] border border-slate-200 shadow-sm">
//               <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-5 border border-slate-100 text-slate-300">
//                 <IoNotificationsOutline size={40} />
//               </div>
//               <p className="text-slate-600 font-black text-xl">All caught up!</p>
//               <p className="text-slate-400 text-sm mt-1">We'll let you know when something new arrives.</p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {notifications.map((n) => (
//                 <div
//                   key={n._id}
//                   className={`relative p-5 md:p-7 rounded-[28px] bg-white border transition-all duration-300 hover:translate-x-1 group ${
//                     !n.read ? "border-indigo-200 shadow-lg shadow-indigo-100/20" : "border-slate-100 shadow-sm"
//                   }`}
//                 >
//                   {/* Unread dot: Repositioned for cleaner symmetry */}
//                   {!n.read && (
//                     <span className="absolute top-1/2 -right-1 translate-y-[-50%] w-2 h-8 
//                         bg-indigo-600 rounded-l-full shadow-[0_0_15px_rgba(79,70,229,0.4)]"></span>
//                   )}

//                   <div className="flex gap-5">
//                     <div className={`mt-1 shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${!n.read ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-400"}`}>
//                         <FiBell size={20} />
//                     </div>
//                     <div className="flex-1">
//                         <div className="flex justify-between items-start">
//                             <h3 className={`text-lg font-bold tracking-tight leading-snug ${!n.read ? "text-slate-900" : "text-slate-600"}`}>
//                             {n.title || "New Update"}
//                             </h3>
//                             <FiChevronRight className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
//                         </div>
//                         <p className="text-slate-500 mt-1.5 text-sm leading-relaxed max-w-2xl">
//                         {n.message}
//                         </p>
//                         <div className="flex items-center gap-2 mt-4">
//                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
//                                 {new Date(n.createdAt).toLocaleDateString()} • {new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                             </span>
//                         </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* AI Recommendations Section: Added a soft gradient border effect */}
//         <div className="mt-20">
//           <div className="flex items-center gap-3 mb-8">
//             <div className="p-2.5 bg-amber-100 rounded-xl">
//                 <FiZap className="text-amber-600" size={20} />
//             </div>
//             <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase italic">AI Recommendations</h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {/* Accuracy Suggestion */}
//             <div className="p-6 rounded-[30px] bg-white border border-indigo-100 shadow-xl shadow-indigo-100/10 hover:shadow-indigo-100 transition-all flex flex-col gap-4 group">
//               <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
//                 <FiStar size={22} />
//               </div>
//               <div>
//                 <h3 className="font-bold text-slate-900 leading-tight">Your interview accuracy improved!</h3>
//                 <p className="text-slate-500 text-xs mt-2 leading-relaxed">
//                     Try a new mock session to hit your weekly goal.
//                 </p>
//               </div>
//             </div>

//             {/* Questions Suggestion */}
//             <div className="p-6 rounded-[30px] bg-white border border-blue-100 shadow-xl shadow-blue-100/10 hover:shadow-blue-100 transition-all flex flex-col gap-4 group">
//               <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
//                 <FiZap size={22} />
//               </div>
//               <div>
//                 <h3 className="font-bold text-slate-900 leading-tight">5 new questions found for you</h3>
//                 <p className="text-slate-500 text-xs mt-2 leading-relaxed">
//                     Relevant topics in System Design are now available.
//                 </p>
//               </div>
//             </div>

//             {/* Daily Challenge */}
//             <div className="p-6 rounded-[30px] bg-white border border-emerald-100 shadow-xl shadow-emerald-100/10 hover:shadow-emerald-100 transition-all flex flex-col gap-4 group">
//               <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
//                 <FiTarget size={22} />
//               </div>
//               <div>
//                 <h3 className="font-bold text-slate-900 leading-tight">Daily Challenge Available</h3>
//                 <p className="text-slate-500 text-xs mt-2 leading-relaxed">
//                     Complete 5 questions to earn 50 bonus credits.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

//dark mode
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiCheckCircle, FiBell, FiZap, FiTarget, FiStar, FiChevronRight, FiLoader } from "react-icons/fi";
import API from "../api/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/notifications/me");
        setNotifications(res.data.notifications || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    })();
  }, []);

  const markAllAsRead = async () => {
    try {
      await API.post("/notifications/mark-all");
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 font-sans selection:bg-indigo-500/30" 
         style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 md:p-10 pt-28">

        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className="p-4 rounded-[22px] text-white shadow-xl shadow-indigo-900/40" 
                 style={{ backgroundColor: "var(--accent)" }}>
              <FiBell size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
                InBox
              </h1>
              <p className="font-semibold text-sm mt-0.5 tracking-tight" style={{ color: "var(--text-secondary)" }}>
                {notifications.filter(n => !n.read).length} new updates waiting for you
              </p>
            </div>
          </div>

          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all active:scale-95 group font-bold text-sm shadow-sm"
            style={{ 
              backgroundColor: "var(--bg-card)", 
              borderColor: "var(--border-color)",
              color: "var(--text-secondary)" 
            }}
          >
            <FiCheckCircle className="group-hover:rotate-12 group-hover:text-[var(--accent)] transition-transform" />
            Mark all as read
          </button>
        </div>

        {/* NOTIFICATIONS LIST */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 card rounded-[32px] border-[var(--border-color)] animate-pulse">
                <FiLoader className="w-10 h-10 animate-spin mb-4" style={{ color: "var(--accent)" }} />
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Syncing updates...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-20 card rounded-[32px] border-[var(--border-color)]">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 border opacity-20"
                   style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                <IoNotificationsOutline size={40} />
              </div>
              <p className="font-black text-xl" style={{ color: "var(--text-primary)" }}>All caught up!</p>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>We'll let you know when something new arrives.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n._id}
                  className={`relative p-5 md:p-7 rounded-[28px] border transition-all duration-300 hover:translate-x-1 group ${
                    !n.read ? "shadow-lg shadow-indigo-900/10" : "shadow-sm opacity-70"
                  }`}
                  style={{ 
                    backgroundColor: "var(--bg-card)", 
                    borderColor: !n.read ? "rgba(129, 140, 248, 0.3)" : "var(--border-color)" 
                  }}
                >
                  {/* Unread dot: Repositioned as a vertical glow bar */}
                  {!n.read && (
                    <span className="absolute top-1/2 -right-1 translate-y-[-50%] w-1.5 h-10 
                        rounded-l-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                        style={{ backgroundColor: "var(--accent)" }}></span>
                  )}

                  <div className="flex gap-5">
                    <div className={`mt-1 shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors border ${!n.read ? "bg-indigo-500/10 border-indigo-500/20 text-[var(--accent)]" : "bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-secondary)]"}`}>
                        <FiBell size={20} />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold tracking-tight leading-snug" style={{ color: !n.read ? "var(--text-primary)" : "var(--text-secondary)" }}>
                            {n.title || "New Update"}
                            </h3>
                            <FiChevronRight className="transition-colors" style={{ color: "var(--text-secondary)" }} />
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                        {n.message}
                        </p>
                        <div className="flex items-center gap-2 mt-4">
                            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md"
                                  style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-secondary)" }}>
                                {new Date(n.createdAt).toLocaleDateString()} • {new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI RECOMMENDATIONS SECTION */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl border" style={{ backgroundColor: "rgba(245, 158, 11, 0.1)", borderColor: "rgba(245, 158, 11, 0.2)" }}>
                <FiZap className="text-amber-500" size={20} />
            </div>
            <h2 className="text-2xl font-black tracking-tight uppercase italic" style={{ color: "var(--text-primary)" }}>AI Recommendations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Suggestion 1 */}
            <div className="card p-6 rounded-[30px] border shadow-xl shadow-black/20 hover:border-[var(--accent)] transition-all flex flex-col gap-4 group"
                 style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border"
                   style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--accent)" }}>
                <FiStar size={22} className="group-hover:scale-110" />
              </div>
              <div>
                <h3 className="font-bold leading-tight" style={{ color: "var(--text-primary)" }}>Accuracy Boosted!</h3>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    Try a new mock session to hit your weekly goal.
                </p>
              </div>
            </div>

            {/* Suggestion 2 */}
            <div className="card p-6 rounded-[30px] border shadow-xl shadow-black/20 hover:border-blue-500/40 transition-all flex flex-col gap-4 group"
                 style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border"
                   style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "#3b82f6" }}>
                <FiZap size={22} className="group-hover:scale-110" />
              </div>
              <div>
                <h3 className="font-bold leading-tight" style={{ color: "var(--text-primary)" }}>5 New Questions</h3>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    System Design topics are now available.
                </p>
              </div>
            </div>

            {/* Suggestion 3 */}
            <div className="card p-6 rounded-[30px] border shadow-xl shadow-black/20 hover:border-emerald-500/40 transition-all flex flex-col gap-4 group"
                 style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border"
                   style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "#10b981" }}>
                <FiTarget size={22} className="group-hover:scale-110" />
              </div>
              <div>
                <h3 className="font-bold leading-tight" style={{ color: "var(--text-primary)" }}>Daily Challenge</h3>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    Complete 5 questions to earn 50 bonus credits.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}