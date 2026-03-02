// import { useState, useContext } from "react";
// import { useQuery } from "@tanstack/react-query";
// // import { API } from "../api/api";
// import API from "../api/api";
// import Navbar from "../components/Navbar";
// import { AuthContext } from "../context/AuthContext";
// import React from "react";

// export default function LeaderboardPage() {
//   const { user } = useContext(AuthContext);
//   const meId = user?.id ?? user?._id ?? localStorage.getItem("userId");

//   const [page, setPage] = useState(1);
//   const limit = 20;

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["leaderboard", page],
//     queryFn: async () => {
//       const res = await API.get(`/leaderboard?page=${page}&limit=${limit}`);
//       return res.data;
//     },
//     keepPreviousData: true,
//   });

//   if (isLoading)
//     return (
//       <>
//         <Navbar />
//         <div className="p-6 text-white">Loading...</div>
//       </>
//     );

//   if (isError)
//     return (
//       <>
//         <Navbar />
//         <div className="p-6 text-white">Error loading leaderboard.</div>
//       </>
//     );

//   const leaders = data.top || [];

//   const getRankBadge = (rank) => {
//     if (rank === 1) return "🥇";
//     if (rank === 2) return "🥈";
//     if (rank === 3) return "🥉";
//     return `#${rank}`;
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="p-6 max-w-3xl mx-auto text-white">

//         {/* HEADER */}
//         <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
//           Leaderboard
//         </h2>

//         {/* LEADERBOARD PANEL */}
//         <div className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-[0_0_25px_rgba(120,64,255,0.3)] rounded-2xl overflow-hidden divide-y divide-white/10">

//           {leaders.map((u, i) => {
//             const id = u._id ?? u.id;
//             const isMe = String(id) === String(meId);
//             const rank = i + 1 + (page - 1) * limit;

//             return (
//               <div
//                 key={id}
//                 className={`flex items-center justify-between px-6 py-4 transition 
//                   ${isMe ? "bg-purple-600/20 backdrop-blur-lg border-l-4 border-purple-500" : "hover:bg-white/5"}
//                 `}
//               >
//                 {/* Rank + Name */}
//                 <div className="flex items-center gap-3">
//                   <div className="text-2xl">{getRankBadge(rank)}</div>

//                   <div>
//                     <div className="font-semibold text-lg">{u.name}</div>
//                     {isMe && (
//                       <div className="text-xs text-purple-300 font-semibold">(You)</div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Credits */}
//                 <div className="font-bold text-blue-300 text-lg">
//                   {u.credits} credits
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* PAGINATION */}
//         <div className="flex justify-between items-center mt-6">

//           <button
//             disabled={page === 1}
//             onClick={() => setPage((p) => p - 1)}
//             className={`px-4 py-2 rounded-lg border border-white/20 
//               ${page === 1 ? "opacity-40" : "hover:bg-white/10"}
//             `}
//           >
//             ← Previous
//           </button>

//           <span className="text-gray-300">
//             Page {data.page} of {Math.ceil(data.total / data.limit)}
//           </span>

//           <button
//             disabled={page * limit >= data.total}
//             onClick={() => setPage((p) => p + 1)}
//             className={`px-4 py-2 rounded-lg border border-white/20 
//               ${page * limit >= data.total ? "opacity-40" : "hover:bg-white/10"}
//             `}
//           >
//             Next →
//           </button>

//         </div>
//       </div>
//     </>
//   );
// }


//new final
// import { useState, useContext } from "react";
// import { useQuery } from "@tanstack/react-query";
// import API from "../api/api";
// import { AuthContext } from "../context/AuthContext";
// import React from "react";
// // FIX: Import FaTrophy from 'react-icons/fa' instead of 'fi'
// import { FaTrophy } from "react-icons/fa"; 
// import { FiChevronLeft, FiChevronRight, FiLoader, FiUser } from "react-icons/fi";

// export default function LeaderboardPage() {
//   const { user } = useContext(AuthContext);
//   const meId = user?.id ?? user?._id ?? localStorage.getItem("userId");

//   const [page, setPage] = useState(1);
//   const limit = 20;

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["leaderboard", page],
//     queryFn: async () => {
//       const res = await API.get(`/leaderboard?page=${page}&limit=${limit}`);
//       return res.data;
//     },
//   });

//   if (isLoading)
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
//         <FiLoader className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
//         <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Fetching Rankings...</p>
//       </div>
//     );

//   if (isError)
//     return (
//       <div className="max-w-md mx-auto mt-20 p-8 text-center bg-rose-50 border border-rose-100 rounded-3xl">
//         <p className="text-rose-600 font-bold">Error loading leaderboard. Please refresh the page.</p>
//       </div>
//     );

//   const leaders = data?.top || [];

//   const getRankStyle = (rank) => {
//     if (rank === 1) return "bg-amber-100 text-amber-700 border-amber-200 shadow-sm";
//     if (rank === 2) return "bg-slate-100 text-slate-600 border-slate-200 shadow-sm";
//     if (rank === 3) return "bg-orange-100 text-orange-700 border-orange-200 shadow-sm";
//     return "text-slate-400 bg-transparent border-transparent";
//   };

//   const getRankBadge = (rank) => {
//     if (rank === 1) return "🥇";
//     if (rank === 2) return "🥈";
//     if (rank === 3) return "🥉";
//     return rank;
//   };

//   return (
//     <div className="max-w-4xl mx-auto pb-12 animate-fadeIn">
//       {/* HEADER */}
//       <div className="flex items-center gap-4 mb-10">
//         <div className="p-4 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100">
//           <FaTrophy size={32} />
//         </div>
//         <div>
//           <h2 className="text-4xl font-black tracking-tight text-slate-900">
//             Global <span className="text-indigo-600">Leaderboard</span>
//           </h2>
//           <p className="text-slate-500 font-medium">Top contributors and interview masters.</p>
//         </div>
//       </div>

//       {/* LEADERBOARD PANEL */}
//       <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden">
//         <div className="divide-y divide-slate-100">
//           {leaders.map((u, i) => {
//             const id = u._id ?? u.id;
//             const isMe = String(id) === String(meId);
//             const rank = i + 1 + (page - 1) * limit;

//             return (
//               <div
//                 key={id}
//                 className={`flex items-center justify-between px-8 py-5 transition-all duration-300
//                   ${isMe ? "bg-indigo-50/50" : "hover:bg-slate-50"}
//                 `}
//               >
//                 {/* Rank + Name */}
//                 <div className="flex items-center gap-6">
//                   <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-black text-sm transition-all ${getRankStyle(rank)}`}>
//                     {getRankBadge(rank)}
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${isMe ? 'bg-indigo-600' : 'bg-slate-200'}`}>
//                         {u.avatar ? (
//                             <img src={u.avatar} alt={u.name} className="w-full h-full rounded-full object-cover" />
//                         ) : (
//                             <FiUser size={20} className={isMe ? 'text-white' : 'text-slate-400'} />
//                         )}
//                     </div>
//                     <div>
//                       <div className={`font-bold text-lg tracking-tight ${isMe ? 'text-indigo-900' : 'text-slate-800'}`}>
//                         {u.name}
//                       </div>
//                       {isMe && (
//                         <div className="text-[10px] uppercase tracking-widest text-indigo-600 font-black">
//                           Your Ranking
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Credits */}
//                 <div className="flex flex-col items-end">
//                     <div className={`font-black text-xl tracking-tight ${isMe ? 'text-indigo-600' : 'text-slate-900'}`}>
//                     {u.credits}
//                     </div>
//                     <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
//                         Credits
//                     </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* PAGINATION */}
//       <div className="flex justify-between items-center mt-8 px-4">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           className={`flex items-center gap-2 px-6 py-3 rounded-2xl border font-bold transition-all
//             ${page === 1 ? "opacity-30 cursor-not-allowed border-slate-200 text-slate-400" : "bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 shadow-sm"}
//           `}
//         >
//           <FiChevronLeft />
//           Previous
//         </button>

//         <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 rounded-full border border-slate-200">
//             <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
//             Page {data?.page || 1} of {Math.ceil((data?.total || 0) / (data?.limit || limit))}
//             </span>
//         </div>

//         <button
//           disabled={page * limit >= (data?.total || 0)}
//           onClick={() => setPage((p) => p + 1)}
//           className={`flex items-center gap-2 px-6 py-3 rounded-2xl border font-bold transition-all
//             ${page * limit >= (data?.total || 0) ? "opacity-30 cursor-not-allowed border-slate-200 text-slate-400" : "bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 shadow-sm"}
//           `}
//         >
//           Next
//           <FiChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }

// //dark mode
// import { useState, useContext } from "react";
// import { useQuery } from "@tanstack/react-query";
// import API from "../api/api";
// import { AuthContext } from "../context/AuthContext";
// import React from "react";
// import { FaTrophy } from "react-icons/fa"; 
// import { FiChevronLeft, FiChevronRight, FiLoader, FiUser } from "react-icons/fi";

// export default function LeaderboardPage() {
//   const { user } = useContext(AuthContext);
//   const meId = user?.id ?? user?._id ?? localStorage.getItem("userId");

//   const [page, setPage] = useState(1);
//   const limit = 20;

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["leaderboard", page],
//     queryFn: async () => {
//       const res = await API.get(`/leaderboard?page=${page}&limit=${limit}`);
//       return res.data;
//     },
//   });

//   if (isLoading)
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
//         <FiLoader className="w-10 h-10 animate-spin mb-4" style={{ color: "var(--accent)" }} />
//         <p className="text-[var(--text-secondary)] font-bold uppercase tracking-widest text-xs">Fetching Rankings...</p>
//       </div>
//     );

//   if (isError)
//     return (
//       <div className="max-w-md mx-auto mt-20 p-8 text-center rounded-3xl border" 
//            style={{ backgroundColor: "rgba(225, 29, 72, 0.05)", borderColor: "rgba(225, 29, 72, 0.2)" }}>
//         <p className="text-rose-400 font-bold">Error loading leaderboard. Please refresh the page.</p>
//       </div>
//     );

//   const leaders = data?.top || [];

//   const getRankStyle = (rank) => {
//     if (rank === 1) return "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]";
//     if (rank === 2) return "bg-slate-400/10 text-slate-300 border-slate-400/20 shadow-[0_0_15px_rgba(148,163,184,0.1)]";
//     if (rank === 3) return "bg-orange-600/10 text-orange-400 border-orange-600/20 shadow-[0_0_15px_rgba(234,88,12,0.1)]";
//     return "text-[var(--text-secondary)] bg-transparent border-transparent";
//   };

//   const getRankBadge = (rank) => {
//     if (rank === 1) return "🥇";
//     if (rank === 2) return "🥈";
//     if (rank === 3) return "🥉";
//     return rank;
//   };

//   return (
//     <div className="max-w-4xl mx-auto pb-12 animate-fadeIn transition-colors duration-300">
//       {/* HEADER */}
//       <div className="flex items-center gap-4 mb-10">
//         <div className="p-4 rounded-3xl text-white shadow-xl shadow-indigo-900/40" style={{ backgroundColor: "var(--accent)" }}>
//           <FaTrophy size={32} />
//         </div>
//         <div>
//           <h2 className="text-4xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
//             Global <span style={{ color: "var(--accent)" }}>Leaderboard</span>
//           </h2>
//           <p className="font-medium" style={{ color: "var(--text-secondary)" }}>Top contributors and interview masters.</p>
//         </div>
//       </div>

//       {/* LEADERBOARD PANEL */}
//       <div className="card rounded-[2.5rem] shadow-2xl overflow-hidden border-[var(--border-color)]" style={{ backgroundColor: "var(--bg-card)" }}>
//         <div className="divide-y" style={{ borderColor: "var(--border-color)" }}>
//           {leaders.map((u, i) => {
//             const id = u._id ?? u.id;
//             const isMe = String(id) === String(meId);
//             const rank = i + 1 + (page - 1) * limit;

//             return (
//               <div
//                 key={id}
//                 className={`flex items-center justify-between px-8 py-5 transition-all duration-300
//                   ${isMe ? "bg-indigo-500/5" : "hover:bg-white/[0.02]"}
//                 `}
//               >
//                 {/* Rank + Name */}
//                 <div className="flex items-center gap-6">
//                   <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-black text-sm transition-all ${getRankStyle(rank)}`}>
//                     {getRankBadge(rank)}
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md border-2 ${isMe ? 'border-[var(--accent)] bg-[var(--accent)]' : 'bg-[var(--bg-primary)] border-[var(--border-color)]'}`}>
//                         {u.avatar ? (
//                             <img src={u.avatar} alt={u.name} className="w-full h-full rounded-full object-cover" />
//                         ) : (
//                             <FiUser size={20} className={isMe ? 'text-white' : 'text-[var(--text-secondary)]'} />
//                         )}
//                     </div>
//                     <div>
//                       <div className="font-bold text-lg tracking-tight" style={{ color: isMe ? "var(--accent)" : "var(--text-primary)" }}>
//                         {u.name}
//                       </div>
//                       {isMe && (
//                         <div className="text-[10px] uppercase tracking-widest font-black" style={{ color: "var(--accent)" }}>
//                           Your Ranking
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Credits */}
//                 <div className="flex flex-col items-end">
//                     <div className="font-black text-xl tracking-tight" style={{ color: isMe ? "var(--accent)" : "var(--text-primary)" }}>
//                     {u.credits}
//                     </div>
//                     <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
//                         Credits
//                     </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* PAGINATION */}
//       <div className="flex justify-between items-center mt-8 px-4">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           className={`flex items-center gap-2 px-6 py-3 rounded-2xl border font-bold transition-all
//             ${page === 1 
//               ? "opacity-20 cursor-not-allowed border-[var(--border-color)] text-[var(--text-secondary)]" 
//               : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] shadow-lg"
//             }`}
//         >
//           <FiChevronLeft />
//           Previous
//         </button>

//         <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border" 
//              style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)" }}>
//             <span className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
//             Page {data?.page || 1} of {Math.ceil((data?.total || 0) / (data?.limit || limit))}
//             </span>
//         </div>

//         <button
//           disabled={page * limit >= (data?.total || 0)}
//           onClick={() => setPage((p) => p + 1)}
//           className={`flex items-center gap-2 px-6 py-3 rounded-2xl border font-bold transition-all
//             ${page * limit >= (data?.total || 0) 
//               ? "opacity-20 cursor-not-allowed border-[var(--border-color)] text-[var(--text-secondary)]" 
//               : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] shadow-lg"
//             }`}
//         >
//           Next
//           <FiChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }


// dark mode
// import { useState, useContext } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import API from "../api/api";
// import { AuthContext } from "../context/AuthContext";
// import React from "react";
// import { FaTrophy } from "react-icons/fa";
// import { FiChevronLeft, FiChevronRight, FiLoader, FiUser } from "react-icons/fi";

// export default function LeaderboardPage() {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const meId = user?.id ?? user?._id ?? localStorage.getItem("userId");

//   const [page, setPage] = useState(1);
//   const limit = 20;

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["leaderboard", page],
//     queryFn: async () => {
//       const res = await API.get(`/leaderboard?page=${page}&limit=${limit}`);
//       return res.data;
//     },
//   });

//   if (isLoading)
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
//         <FiLoader className="w-10 h-10 animate-spin mb-4" style={{ color: "var(--accent)" }} />
//         <p className="text-[var(--text-secondary)] font-bold uppercase tracking-widest text-xs">
//           Fetching Rankings...
//         </p>
//       </div>
//     );

//   if (isError)
//     return (
//       <div
//         className="max-w-md mx-auto mt-20 p-8 text-center rounded-3xl border"
//         style={{
//           backgroundColor: "rgba(225, 29, 72, 0.05)",
//           borderColor: "rgba(225, 29, 72, 0.2)",
//         }}
//       >
//         <p className="text-rose-400 font-bold">
//           Error loading leaderboard. Please refresh the page.
//         </p>
//       </div>
//     );

//   const leaders = data?.top || [];

//   const getRankStyle = (rank) => {
//     if (rank === 1)
//       return "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]";
//     if (rank === 2)
//       return "bg-slate-400/10 text-slate-300 border-slate-400/20 shadow-[0_0_15px_rgba(148,163,184,0.1)]";
//     if (rank === 3)
//       return "bg-orange-600/10 text-orange-400 border-orange-600/20 shadow-[0_0_15px_rgba(234,88,12,0.1)]";
//     return "text-[var(--text-secondary)] bg-transparent border-transparent";
//   };

//   const getRankBadge = (rank) => {
//     if (rank === 1) return "🥇";
//     if (rank === 2) return "🥈";
//     if (rank === 3) return "🥉";
//     return rank;
//   };

//   return (
//     <div className="max-w-4xl mx-auto pb-12 animate-fadeIn transition-colors duration-300">
      
//       {/* HEADER */}
//       <div className="flex items-center gap-4 mb-10">
//         <div
//           className="p-4 rounded-3xl text-white shadow-xl shadow-indigo-900/40"
//           style={{ backgroundColor: "var(--accent)" }}
//         >
//           <FaTrophy size={32} />
//         </div>
//         <div>
//           <h2
//             className="text-4xl font-black tracking-tight"
//             style={{ color: "var(--text-primary)" }}
//           >
//             Global <span style={{ color: "var(--accent)" }}>Leaderboard</span>
//           </h2>
//           <p
//             className="font-medium"
//             style={{ color: "var(--text-secondary)" }}
//           >
//             Top contributors and interview masters.
//           </p>
//         </div>
//       </div>

//       {/* LEADERBOARD PANEL */}
//       <div
//         className="card rounded-[2.5rem] shadow-2xl overflow-hidden border-[var(--border-color)]"
//         style={{ backgroundColor: "var(--bg-card)" }}
//       >
//         <div className="divide-y" style={{ borderColor: "var(--border-color)" }}>
//           {leaders.map((u, i) => {
//             const id = u._id ?? u.id;
//             const isMe = String(id) === String(meId);
//             const rank = i + 1 + (page - 1) * limit;

//             return (
//               <div
//                 key={id}
//                 onClick={() => navigate(`/profile/${u.username}`)} // ✅ Click to public profile
//                 className={`flex items-center justify-between px-8 py-5 transition-all duration-300 cursor-pointer
//                   ${isMe ? "bg-indigo-500/5" : "hover:bg-white/[0.02]"}
//                 `}
//               >
//                 {/* Rank + Name */}
//                 <div className="flex items-center gap-6">
//                   <div
//                     className={`w-10 h-10 rounded-xl border flex items-center justify-center font-black text-sm transition-all ${getRankStyle(
//                       rank
//                     )}`}
//                   >
//                     {getRankBadge(rank)}
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <div
//                       className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md border-2 ${
//                         isMe
//                           ? "border-[var(--accent)] bg-[var(--accent)]"
//                           : "bg-[var(--bg-primary)] border-[var(--border-color)]"
//                       }`}
//                     >
//                       {u.avatar ? (
//                         <img
//                           src={u.avatar}
//                           alt={u.name}
//                           className="w-full h-full rounded-full object-cover"
//                         />
//                       ) : (
//                         <FiUser
//                           size={20}
//                           className={
//                             isMe
//                               ? "text-white"
//                               : "text-[var(--text-secondary)]"
//                           }
//                         />
//                       )}
//                     </div>

//                     <div>
//                       <div
//                         className="font-bold text-lg tracking-tight"
//                         style={{
//                           color: isMe
//                             ? "var(--accent)"
//                             : "var(--text-primary)",
//                         }}
//                       >
//                         {u.name}
//                       </div>

//                       {/* ✅ USERNAME ADDED */}
//                       <div
//                         className="text-xs font-bold tracking-widest"
//                         style={{ color: "var(--accent)" }}
//                       >
//                         @{u.username}
//                       </div>

//                       {isMe && (
//                         <div
//                           className="text-[10px] uppercase tracking-widest font-black"
//                           style={{ color: "var(--accent)" }}
//                         >
//                           Your Ranking
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Credits */}
//                 <div className="flex flex-col items-end">
//                   <div
//                     className="font-black text-xl tracking-tight"
//                     style={{
//                       color: isMe
//                         ? "var(--accent)"
//                         : "var(--text-primary)",
//                     }}
//                   >
//                     {u.credits}
//                   </div>
//                   <div
//                     className="text-[10px] font-bold uppercase tracking-widest"
//                     style={{ color: "var(--text-secondary)" }}
//                   >
//                     Credits
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* PAGINATION */}
//       <div className="flex justify-between items-center mt-8 px-4">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           className={`flex items-center gap-2 px-6 py-3 rounded-2xl border font-bold transition-all
//             ${
//               page === 1
//                 ? "opacity-20 cursor-not-allowed border-[var(--border-color)] text-[var(--text-secondary)]"
//                 : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] shadow-lg"
//             }`}
//         >
//           <FiChevronLeft />
//           Previous
//         </button>

//         <div
//           className="flex items-center gap-2 px-5 py-2.5 rounded-full border"
//           style={{
//             backgroundColor: "var(--bg-primary)",
//             borderColor: "var(--border-color)",
//           }}
//         >
//           <span
//             className="text-xs font-black uppercase tracking-widest"
//             style={{ color: "var(--text-secondary)" }}
//           >
//             Page {data?.page || 1} of{" "}
//             {Math.ceil((data?.total || 0) / (data?.limit || limit))}
//           </span>
//         </div>

//         <button
//           disabled={page * limit >= (data?.total || 0)}
//           onClick={() => setPage((p) => p + 1)}
//           className={`flex items-center gap-2 px-6 py-3 rounded-2xl border font-bold transition-all
//             ${
//               page * limit >= (data?.total || 0)
//                 ? "opacity-20 cursor-not-allowed border-[var(--border-color)] text-[var(--text-secondary)]"
//                 : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] shadow-lg"
//             }`}
//         >
//           Next
//           <FiChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }

//next acc claude code
import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { FaTrophy } from "react-icons/fa";
import {
  FiChevronLeft, FiChevronRight, FiLoader,
  FiUser, FiSearch, FiX, FiAward,
} from "react-icons/fi";

/* ── Debounce ── */
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function LeaderboardPage() {
  const { user } = useContext(AuthContext);
  const navigate  = useNavigate();
  const meId      = user?.user_id ?? user?.id ?? user?._id;

  const [page, setPage]     = useState(1);
  const [search, setSearch] = useState("");
  const limit = 20;

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["leaderboard", page, debouncedSearch],
    queryFn: async () => {
      const params = new URLSearchParams({ page, limit });
      if (debouncedSearch) params.set("search", debouncedSearch);
      const res = await API.get(`/leaderboard?${params}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const leaders  = data?.top     || [];
  const myRank   = data?.myRank  ?? null;
  const myEntry  = data?.myEntry ?? null;
  const total    = data?.total   ?? 0;

  /* ── Rank helpers ── */
  const getRankStyle = (rank) => {
    if (rank === 1) return { bg: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "rgba(245,158,11,0.3)", glow: "0 0 20px rgba(245,158,11,0.25)" };
    if (rank === 2) return { bg: "rgba(148,163,184,0.12)", color: "#cbd5e1", border: "rgba(148,163,184,0.3)", glow: "0 0 20px rgba(148,163,184,0.15)" };
    if (rank === 3) return { bg: "rgba(234,88,12,0.12)", color: "#fb923c", border: "rgba(234,88,12,0.3)", glow: "0 0 20px rgba(234,88,12,0.15)" };
    return { bg: "transparent", color: "var(--text-secondary)", border: "transparent", glow: "none" };
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  /* ── Top 3 for podium (only on page 1, no search) ── */
  const showPodium = page === 1 && !debouncedSearch && leaders.length >= 3;
  const podiumOrder = showPodium ? [leaders[1], leaders[0], leaders[2]] : []; // 2nd, 1st, 3rd
  const podiumHeights = ["h-24", "h-32", "h-20"];
  const podiumRanks   = [2, 1, 3];

  if (isLoading && page === 1 && !debouncedSearch) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
        <FiLoader className="w-10 h-10 animate-spin mb-4" style={{ color: "var(--accent)" }} />
        <p className="font-bold uppercase tracking-widest text-xs" style={{ color: "var(--text-secondary)" }}>
          Fetching Rankings...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 text-center rounded-3xl border"
           style={{ backgroundColor: "rgba(225,29,72,0.05)", borderColor: "rgba(225,29,72,0.2)" }}>
        <p className="text-rose-400 font-bold">Error loading leaderboard. Please refresh.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-fadeIn">

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-3xl text-white shadow-xl shadow-indigo-900/40"
               style={{ backgroundColor: "var(--accent)" }}>
            <FaTrophy size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              Global <span style={{ color: "var(--accent)" }}>Leaderboard</span>
            </h1>
            <p className="font-medium text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
              Top contributors and interview masters — {total} competitors
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2" size={14}
                    style={{ color: "var(--text-secondary)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search name or @username..."
            className="pl-10 pr-9 py-2.5 rounded-2xl border text-sm outline-none transition-all w-64"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
          />
          {search && (
            <button onClick={() => { setSearch(""); setPage(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-secondary)" }}>
              <FiX size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ── MY RANK CARD ── */}
      {myEntry && myRank && !debouncedSearch && (
        <div
          className="mb-8 p-5 rounded-3xl border flex items-center justify-between cursor-pointer transition-all hover:brightness-110"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(129,140,248,0.06) 100%)",
            borderColor: "rgba(99,102,241,0.3)",
          }}
          onClick={() => myEntry?.username && navigate(`/profile/${myEntry.username}`)}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl border flex items-center justify-center font-black text-sm"
                 style={{ backgroundColor: "rgba(99,102,241,0.15)", borderColor: "rgba(99,102,241,0.3)", color: "var(--accent)" }}>
              {myRank <= 3 ? getRankBadge(myRank) : `#${myRank}`}
            </div>
            <Avatar user={myEntry} isMe size={11} />
            <div className="ml-1">
              <p className="font-black text-base" style={{ color: "var(--accent)" }}>{myEntry.name}</p>
              <p className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>@{myEntry.username} • Your Ranking</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black tracking-tighter" style={{ color: "var(--accent)" }}>{myEntry.credits}</p>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>credits</p>
          </div>
        </div>
      )}

      {/* ── PODIUM (top 3, page 1 only) ── */}
      {showPodium && (
        <div className="flex items-end justify-center gap-4 mb-10 px-4">
          {podiumOrder.map((u, i) => {
            if (!u) return null;
            const rank  = podiumRanks[i];
            const style = getRankStyle(rank);
            const id    = u._id ?? u.id;
            const isMe  = String(id) === String(meId);

            return (
              <div key={id}
                className="flex-1 max-w-[160px] flex flex-col items-center gap-3 cursor-pointer group"
                onClick={() => u?.username && navigate(`/profile/${u.username}`)}
              >
                {/* Crown for #1 */}
                {rank === 1 && (
                  <span className="text-2xl animate-bounce">👑</span>
                )}

                {/* Avatar */}
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-full border-2 flex items-center justify-center overflow-hidden transition-all group-hover:scale-105"
                    style={{ borderColor: style.color, boxShadow: style.glow }}
                  >
                    {u.avatar ? (
                      <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"
                           style={{ backgroundColor: style.bg }}>
                        <FiUser size={24} style={{ color: style.color }} />
                      </div>
                    )}
                  </div>
                  {isMe && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-[var(--bg-card)]"
                          style={{ backgroundColor: "var(--accent)" }} />
                  )}
                </div>

                <div className="text-center">
                  <p className="font-black text-sm truncate max-w-[120px]" style={{ color: isMe ? "var(--accent)" : "var(--text-primary)" }}>
                    {u.name}
                  </p>
                  <p className="text-[10px] font-bold" style={{ color: "var(--text-secondary)" }}>@{u.username}</p>
                  <p className="font-black text-base mt-1" style={{ color: style.color }}>{u.credits}</p>
                  <p className="text-[9px] uppercase tracking-widest font-bold" style={{ color: "var(--text-secondary)" }}>credits</p>
                </div>

                {/* Podium block */}
                <div
                  className={`w-full ${podiumHeights[i]} rounded-t-2xl flex items-start justify-center pt-3 transition-all`}
                  style={{ backgroundColor: style.bg, border: `1px solid ${style.border}`, boxShadow: style.glow }}
                >
                  <span className="text-2xl font-black" style={{ color: style.color }}>
                    {getRankBadge(rank)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── LEADERBOARD LIST ── */}
      {leaders.length === 0 ? (
        <div className="text-center py-20 card rounded-[2.5rem]">
          <FiAward size={32} className="mx-auto mb-4 opacity-20" style={{ color: "var(--text-secondary)" }} />
          <p className="font-bold text-xl" style={{ color: "var(--text-primary)" }}>
            {debouncedSearch ? `No results for "${debouncedSearch}"` : "No users yet"}
          </p>
        </div>
      ) : (
        <div className={`card rounded-[2.5rem] shadow-2xl overflow-hidden transition-opacity ${isLoading ? "opacity-50" : "opacity-100"}`}
             style={{ backgroundColor: "var(--bg-card)" }}>
          <div className="divide-y" style={{ borderColor: "var(--border-color)" }}>
            {leaders.map((u, i) => {
              const id    = u._id ?? u.id;
              const isMe  = String(id) === String(meId);
              const rank  = i + 1 + (page - 1) * limit;
              const style = getRankStyle(rank);

              return (
                <div
                  key={id}
                  onClick={() => u?.username && navigate(`/profile/${u.username}`)}
                  className={`flex items-center justify-between px-6 py-4 transition-all duration-200 cursor-pointer
                    ${isMe ? "bg-indigo-500/5" : "hover:bg-white/[0.02]"}`}
                >
                  {/* Rank + Info */}
                  <div className="flex items-center gap-5">
                    {/* Rank badge */}
                    <div
                      className="w-10 h-10 rounded-xl border flex items-center justify-center font-black text-sm flex-shrink-0 transition-all"
                      style={{
                        backgroundColor: style.bg,
                        color: style.color,
                        borderColor: style.border,
                        boxShadow: style.glow,
                      }}
                    >
                      {getRankBadge(rank)}
                    </div>

                    {/* Avatar */}
                    <Avatar user={u} isMe={isMe} />

                    {/* Name */}
                    <div>
                      <p className="font-bold text-base tracking-tight"
                         style={{ color: isMe ? "var(--accent)" : "var(--text-primary)" }}>
                        {u.name}
                        {isMe && (
                          <span className="ml-2 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: "rgba(99,102,241,0.15)", color: "var(--accent)" }}>
                            You
                          </span>
                        )}
                      </p>
                      <p className="text-xs font-bold" style={{ color: "var(--accent)" }}>@{u.username}</p>
                    </div>
                  </div>

                  {/* Credits */}
                  <div className="flex flex-col items-end">
                    <p className="font-black text-xl tracking-tight"
                       style={{ color: isMe ? "var(--accent)" : "var(--text-primary)" }}>
                      {u.credits}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest"
                       style={{ color: "var(--text-secondary)" }}>
                      Credits
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── PAGINATION ── */}
      {data?.totalPages > 1 && (
        <div className="flex justify-between items-center mt-8 px-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl border font-bold transition-all
              ${page === 1 ? "opacity-20 cursor-not-allowed" : "hover:border-[var(--accent)] hover:text-[var(--accent)] shadow-lg"}`}
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
          >
            <FiChevronLeft /> Previous
          </button>

          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border"
               style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)" }}>
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
              Page {page} of {data?.totalPages}
            </span>
          </div>

          <button
            disabled={!data?.hasMore}
            onClick={() => setPage((p) => p + 1)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl border font-bold transition-all
              ${!data?.hasMore ? "opacity-20 cursor-not-allowed" : "hover:border-[var(--accent)] hover:text-[var(--accent)] shadow-lg"}`}
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
          >
            Next <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Avatar sub-component ── */
function Avatar({ user: u, isMe, size = 10 }) {
  return (
    <div
      className={`w-${size} h-${size} rounded-full flex items-center justify-center flex-shrink-0 border-2 overflow-hidden`}
      style={{
        borderColor: isMe ? "var(--accent)" : "var(--border-color)",
        backgroundColor: isMe ? "var(--accent)" : "var(--bg-primary)",
      }}
    >
      {u?.avatar ? (
        <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
      ) : (
        <FiUser size={16} style={{ color: isMe ? "white" : "var(--text-secondary)" }} />
      )}
    </div>
  );
}