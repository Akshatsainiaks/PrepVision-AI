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
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import React from "react";
import { FaTrophy } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight, FiLoader, FiUser } from "react-icons/fi";

export default function LeaderboardPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const meId = user?.id ?? user?._id ?? localStorage.getItem("userId");

  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["leaderboard", page],
    queryFn: async () => {
      const res = await API.get(`/leaderboard?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
        <FiLoader className="w-10 h-10 animate-spin mb-4" style={{ color: "var(--accent)" }} />
        <p className="text-[var(--text-secondary)] font-bold uppercase tracking-widest text-xs">
          Fetching Rankings...
        </p>
      </div>
    );

  if (isError)
    return (
      <div
        className="max-w-md mx-auto mt-20 p-8 text-center rounded-3xl border"
        style={{
          backgroundColor: "rgba(225, 29, 72, 0.05)",
          borderColor: "rgba(225, 29, 72, 0.2)",
        }}
      >
        <p className="text-rose-400 font-bold">
          Error loading leaderboard. Please refresh the page.
        </p>
      </div>
    );

  const leaders = data?.top || [];

  const getRankStyle = (rank) => {
    if (rank === 1)
      return "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]";
    if (rank === 2)
      return "bg-slate-400/10 text-slate-300 border-slate-400/20 shadow-[0_0_15px_rgba(148,163,184,0.1)]";
    if (rank === 3)
      return "bg-orange-600/10 text-orange-400 border-orange-600/20 shadow-[0_0_15px_rgba(234,88,12,0.1)]";
    return "text-[var(--text-secondary)] bg-transparent border-transparent";
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-fadeIn transition-colors duration-300">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-10">
        <div
          className="p-4 rounded-3xl text-white shadow-xl shadow-indigo-900/40"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <FaTrophy size={32} />
        </div>
        <div>
          <h2
            className="text-4xl font-black tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Global <span style={{ color: "var(--accent)" }}>Leaderboard</span>
          </h2>
          <p
            className="font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            Top contributors and interview masters.
          </p>
        </div>
      </div>

      {/* LEADERBOARD PANEL */}
      <div
        className="card rounded-[2.5rem] shadow-2xl overflow-hidden border-[var(--border-color)]"
        style={{ backgroundColor: "var(--bg-card)" }}
      >
        <div className="divide-y" style={{ borderColor: "var(--border-color)" }}>
          {leaders.map((u, i) => {
            const id = u._id ?? u.id;
            const isMe = String(id) === String(meId);
            const rank = i + 1 + (page - 1) * limit;

            return (
              <div
                key={id}
                onClick={() => navigate(`/profile/${u.username}`)} // ✅ Click to public profile
                className={`flex items-center justify-between px-8 py-5 transition-all duration-300 cursor-pointer
                  ${isMe ? "bg-indigo-500/5" : "hover:bg-white/[0.02]"}
                `}
              >
                {/* Rank + Name */}
                <div className="flex items-center gap-6">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center font-black text-sm transition-all ${getRankStyle(
                      rank
                    )}`}
                  >
                    {getRankBadge(rank)}
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md border-2 ${
                        isMe
                          ? "border-[var(--accent)] bg-[var(--accent)]"
                          : "bg-[var(--bg-primary)] border-[var(--border-color)]"
                      }`}
                    >
                      {u.avatar ? (
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <FiUser
                          size={20}
                          className={
                            isMe
                              ? "text-white"
                              : "text-[var(--text-secondary)]"
                          }
                        />
                      )}
                    </div>

                    <div>
                      <div
                        className="font-bold text-lg tracking-tight"
                        style={{
                          color: isMe
                            ? "var(--accent)"
                            : "var(--text-primary)",
                        }}
                      >
                        {u.name}
                      </div>

                      {/* ✅ USERNAME ADDED */}
                      <div
                        className="text-xs font-bold tracking-widest"
                        style={{ color: "var(--accent)" }}
                      >
                        @{u.username}
                      </div>

                      {isMe && (
                        <div
                          className="text-[10px] uppercase tracking-widest font-black"
                          style={{ color: "var(--accent)" }}
                        >
                          Your Ranking
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Credits */}
                <div className="flex flex-col items-end">
                  <div
                    className="font-black text-xl tracking-tight"
                    style={{
                      color: isMe
                        ? "var(--accent)"
                        : "var(--text-primary)",
                    }}
                  >
                    {u.credits}
                  </div>
                  <div
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Credits
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-8 px-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl border font-bold transition-all
            ${
              page === 1
                ? "opacity-20 cursor-not-allowed border-[var(--border-color)] text-[var(--text-secondary)]"
                : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] shadow-lg"
            }`}
        >
          <FiChevronLeft />
          Previous
        </button>

        <div
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <span
            className="text-xs font-black uppercase tracking-widest"
            style={{ color: "var(--text-secondary)" }}
          >
            Page {data?.page || 1} of{" "}
            {Math.ceil((data?.total || 0) / (data?.limit || limit))}
          </span>
        </div>

        <button
          disabled={page * limit >= (data?.total || 0)}
          onClick={() => setPage((p) => p + 1)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl border font-bold transition-all
            ${
              page * limit >= (data?.total || 0)
                ? "opacity-20 cursor-not-allowed border-[var(--border-color)] text-[var(--text-secondary)]"
                : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] shadow-lg"
            }`}
        >
          Next
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}