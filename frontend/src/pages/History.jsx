// import React from "react";
// // import { API } from "../api/api";
// import API from "../api/api";
// import { useQuery } from "@tanstack/react-query";

// export default function History() {
//   const { data: history = [], isLoading } = useQuery({
//     queryKey: ["interview-history"],
//     queryFn: async () => {
//       const res = await API.get("/interview-history");
//       return res.data.history || [];
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="space-y-4">
//         <h1 className="text-3xl font-bold">Interview History</h1>
//         <p className="text-gray-400">Loading your interview attempts...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-10">

//       {/* HEADER */}
//       <div>
//         <h1 className="text-4xl font-extrabold mb-3">
//           Interview History
//         </h1>
//         <p className="text-gray-400 max-w-2xl">
//           Review your past mock interviews, scores, and performance details.
//         </p>
//       </div>

//       {/* FILTER BAR (UI READY) */}
//       <div className="flex flex-wrap gap-4">
//         <select className="bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm">
//           <option>All Roles</option>
//           <option>Frontend</option>
//           <option>Backend</option>
//           <option>DevOps</option>
//         </select>

//         <select className="bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm">
//           <option>All Companies</option>
//           <option>Google</option>
//           <option>Amazon</option>
//           <option>Startup</option>
//         </select>

//         <select className="bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm">
//           <option>Latest First</option>
//           <option>Oldest First</option>
//         </select>
//       </div>

//       {/* HISTORY LIST */}
//       {history.length === 0 ? (
//         <div className="text-center py-20 text-gray-500">
//           No interviews attempted yet.
//           <br />
//           Start your first mock interview 🚀
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {history.map((item) => (
//             <div
//               key={item._id}
//               className="bg-white/10 border border-white/10 rounded-2xl p-5
//               hover:bg-white/15 transition flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//             >
//               {/* LEFT INFO */}
//               <div className="space-y-1">
//                 <h3 className="text-lg font-semibold">
//                   {item.company || "General Interview"}
//                 </h3>
//                 <p className="text-sm text-gray-400">
//                   {item.role} • {item.duration || "15"} mins
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {new Date(item.createdAt).toLocaleString()}
//                 </p>
//               </div>

//               {/* RIGHT INFO */}
//               <div className="flex items-center gap-6">
//                 {/* SCORE */}
//                 <div className="text-center">
//                   <p className="text-xs text-gray-400">Score</p>
//                   <p className="text-xl font-bold text-blue-400">
//                     {item.score ?? "--"}%
//                   </p>
//                 </div>

//                 {/* STATUS */}
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-semibold
//                   ${
//                     item.completed
//                       ? "bg-green-500/20 text-green-400"
//                       : "bg-yellow-500/20 text-yellow-400"
//                   }`}
//                 >
//                   {item.completed ? "Completed" : "Incomplete"}
//                 </span>

//                 {/* ACTION */}
//                 <a
//                   href={`/history/${item._id}`}
//                   className="px-4 py-2 rounded-xl bg-white/10
//                   hover:bg-white/20 text-sm font-semibold transition"
//                 >
//                   View
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


//  new final
// import React from "react";
// import API from "../api/api";
// import { useQuery } from "@tanstack/react-query";
// import { 
//   FiClock, 
//   FiBriefcase, 
//   FiCalendar, 
//   FiChevronRight, 
//   FiFilter, 
//   FiLoader, 
//   FiActivity,
//   FiSearch
// } from "react-icons/fi";

// export default function History() {
//   const { data: history = [], isLoading } = useQuery({
//     queryKey: ["interview-history"],
//     queryFn: async () => {
//       const res = await API.get("/interview-history");
//       return res.data.history || [];
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
//         <FiLoader className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
//         <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
//           Loading History...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      
//       {/* HEADER SECTION */}
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//         <div className="space-y-2">
//           <div className="flex items-center gap-3">
//              <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100">
//                 <FiActivity size={24} />
//              </div>
//              <h1 className="text-4xl font-black tracking-tight text-slate-900">
//                 Interview <span className="text-indigo-600">History</span>
//              </h1>
//           </div>
//           <p className="text-slate-500 font-medium max-w-lg">
//             Review your past mock sessions, evaluate AI feedback, and track your growth over time.
//           </p>
//         </div>

//         {/* SEARCH DECORATION (Optional UI addition) */}
//         <div className="relative group hidden sm:block">
//            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//            <input 
//             type="text" 
//             placeholder="Search sessions..." 
//             className="pl-11 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all w-64 shadow-sm"
//            />
//         </div>
//       </div>

//       {/* FILTER BAR - Polished for Light Mode */}
//       <div className="flex flex-wrap items-center gap-3 p-2 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
//         <div className="flex items-center gap-2 px-4 py-2 text-slate-400 border-r border-slate-100">
//            <FiFilter size={16} />
//            <span className="text-xs font-black uppercase tracking-widest">Filters</span>
//         </div>
        
//         <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors focus:ring-0">
//           <option>All Roles</option>
//           <option>Frontend</option>
//           <option>Backend</option>
//           <option>DevOps</option>
//         </select>

//         <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors focus:ring-0">
//           <option>All Companies</option>
//           <option>Google</option>
//           <option>Amazon</option>
//           <option>Startup</option>
//         </select>

//         <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors focus:ring-0 ml-auto">
//           <option>Latest First</option>
//           <option>Oldest First</option>
//         </select>
//       </div>

//       {/* HISTORY LIST */}
//       {history.length === 0 ? (
//         <div className="text-center py-24 bg-white border-2 border-dashed border-slate-100 rounded-[3rem]">
//           <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
//             <FiActivity size={32} />
//           </div>
//           <p className="text-slate-600 font-bold text-xl">No interviews attempted yet.</p>
//           <p className="text-slate-400 text-sm mt-1">Start your first mock interview to see insights here 🚀</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-4">
//           {history.map((item) => (
//             <div
//               key={item._id}
//               className="group bg-white border border-slate-200 rounded-[2rem] p-6 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-6"
//             >
//               {/* LEFT INFO: Brand and Role */}
//               <div className="flex items-center gap-5">
//                 <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
//                   <FiBriefcase size={24} />
//                 </div>
//                 <div className="space-y-1">
//                   <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
//                     {item.company || "General Interview"}
//                   </h3>
//                   <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
//                     <span className="flex items-center gap-1.5"><FiCalendar className="text-indigo-400" /> {new Date(item.createdAt).toLocaleDateString()}</span>
//                     <span className="w-1 h-1 rounded-full bg-slate-200" />
//                     <span className="flex items-center gap-1.5"><FiClock className="text-indigo-400" /> {item.duration || "15"}m</span>
//                   </div>
//                 </div>
//               </div>

//               {/* RIGHT INFO: Score, Status, Action */}
//               <div className="flex items-center justify-between md:justify-end gap-10">
                
//                 {/* ROLE TAG (Visible on Desktop) */}
//                 <span className="hidden lg:block px-4 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-100">
//                     {item.role}
//                 </span>

//                 {/* SCORE POCKET */}
//                 <div className="text-center">
//                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Score</p>
//                   <p className="text-2xl font-black text-indigo-600 tracking-tighter">
//                     {item.score ?? "--"}<span className="text-xs text-slate-300 ml-0.5">/100</span>
//                   </p>
//                 </div>

//                 {/* STATUS & LINK */}
//                 <div className="flex items-center gap-4">
//                     <span
//                     className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border
//                     ${
//                         item.completed
//                         ? "bg-emerald-50 text-emerald-600 border-emerald-100"
//                         : "bg-amber-50 text-amber-600 border-amber-100"
//                     }`}
//                     >
//                     {item.completed ? "Completed" : "Incomplete"}
//                     </span>

//                     <a
//                     href={`/history/${item._id}`}
//                     className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm active:scale-95"
//                     >
//                     <FiChevronRight size={20} />
//                     </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

//dark mode
// import React from "react";
// import API from "../api/api";
// import { useQuery } from "@tanstack/react-query";
// import { 
//   FiClock, 
//   FiBriefcase, 
//   FiCalendar, 
//   FiChevronRight, 
//   FiFilter, 
//   FiLoader, 
//   FiActivity,
//   FiSearch
// } from "react-icons/fi";

// export default function History() {
//   const { data: history = [], isLoading } = useQuery({
//     queryKey: ["interview-history"],
//     queryFn: async () => {
//       const res = await API.get("/interview-history");
//       return res.data.history || [];
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
//         <FiLoader className="w-10 h-10 animate-spin mb-4" style={{ color: "var(--accent)" }} />
//         <p className="font-bold uppercase tracking-widest text-xs" style={{ color: "var(--text-secondary)" }}>
//           Loading History...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12 transition-colors duration-300">
      
//       {/* HEADER SECTION */}
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//         <div className="space-y-2">
//           <div className="flex items-center gap-3">
//              <div className="p-3 rounded-2xl text-white shadow-xl shadow-indigo-900/40" style={{ backgroundColor: "var(--accent)" }}>
//                 <FiActivity size={24} />
//              </div>
//              <h1 className="text-4xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
//                 Interview <span style={{ color: "var(--accent)" }}>History</span>
//              </h1>
//           </div>
//           <p className="font-medium max-w-lg" style={{ color: "var(--text-secondary)" }}>
//             Review your past mock sessions, evaluate AI feedback, and track your growth over time.
//           </p>
//         </div>

//         {/* SEARCH BOX */}
//         <div className="relative group hidden sm:block">
//            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: "var(--text-secondary)" }} />
//            <input 
//             type="text" 
//             placeholder="Search sessions..." 
//             className="pl-11 pr-4 py-2.5 rounded-2xl border text-sm outline-none transition-all w-64 shadow-sm"
//             style={{ 
//               backgroundColor: "var(--bg-card)", 
//               borderColor: "var(--border-color)", 
//               color: "var(--text-primary)" 
//             }}
//            />
//         </div>
//       </div>

//       {/* FILTER BAR */}
//       <div className="flex flex-wrap items-center gap-3 p-2 rounded-[2rem] border shadow-lg shadow-black/20"
//            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
//         <div className="flex items-center gap-2 px-4 py-2 border-r" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
//            <FiFilter size={16} />
//            <span className="text-xs font-black uppercase tracking-widest">Filters</span>
//         </div>
        
//         <select className="bg-transparent border-none rounded-xl px-4 py-2 text-sm font-bold cursor-pointer hover:text-[var(--accent)] transition-colors focus:ring-0" style={{ color: "var(--text-secondary)" }}>
//           <option>All Roles</option>
//           <option>Frontend</option>
//           <option>Backend</option>
//         </select>

//         <select className="bg-transparent border-none rounded-xl px-4 py-2 text-sm font-bold cursor-pointer hover:text-[var(--accent)] transition-colors focus:ring-0" style={{ color: "var(--text-secondary)" }}>
//           <option>All Companies</option>
//           <option>Google</option>
//           <option>Amazon</option>
//         </select>

//         <select className="bg-transparent border-none rounded-xl px-4 py-2 text-sm font-bold cursor-pointer hover:text-[var(--accent)] transition-colors focus:ring-0 ml-auto" style={{ color: "var(--text-secondary)" }}>
//           <option>Latest First</option>
//           <option>Oldest First</option>
//         </select>
//       </div>

//       {/* HISTORY LIST */}
//       {history.length === 0 ? (
//         <div className="text-center py-24 border-2 border-dashed rounded-[3rem]" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
//           <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-20" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-secondary)" }}>
//             <FiActivity size={32} />
//           </div>
//           <p className="font-bold text-xl" style={{ color: "var(--text-primary)" }}>No interviews attempted yet.</p>
//           <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Start your first mock interview to see insights here 🚀</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-4">
//           {history.map((item) => (
//             <div
//               key={item._id}
//               className="group card rounded-[2rem] p-6 hover:border-[var(--accent)] hover:shadow-2xl hover:shadow-indigo-500/5 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-6"
//               style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
//             >
//               {/* LEFT INFO: Brand and Role */}
//               <div className="flex items-center gap-5">
//                 <div className="w-14 h-14 rounded-2xl border flex items-center justify-center transition-all"
//                      style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
//                   <FiBriefcase size={24} className="group-hover:text-[var(--accent)]" />
//                 </div>
//                 <div className="space-y-1">
//                   <h3 className="text-xl font-black tracking-tight group-hover:text-[var(--accent)] transition-colors" style={{ color: "var(--text-primary)" }}>
//                     {item.company || "General Interview"}
//                   </h3>
//                   <div className="flex items-center gap-3 text-sm font-bold" style={{ color: "var(--text-secondary)" }}>
//                     <span className="flex items-center gap-1.5"><FiCalendar className="opacity-70" style={{ color: "var(--accent)" }} /> {new Date(item.createdAt).toLocaleDateString()}</span>
//                     <span className="w-1 h-1 rounded-full bg-slate-700" />
//                     <span className="flex items-center gap-1.5"><FiClock className="opacity-70" style={{ color: "var(--accent)" }} /> {item.duration || "15"}m</span>
//                   </div>
//                 </div>
//               </div>

//               {/* RIGHT INFO: Score, Status, Action */}
//               <div className="flex items-center justify-between md:justify-end gap-10">
                
//                 {/* ROLE TAG */}
//                 <span className="hidden lg:block px-4 py-1.5 border text-[10px] font-black uppercase tracking-widest rounded-xl"
//                       style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
//                     {item.role}
//                 </span>

//                 {/* SCORE POCKET */}
//                 <div className="text-center">
//                   <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: "var(--text-secondary)" }}>Score</p>
//                   <p className="text-2xl font-black tracking-tighter" style={{ color: "var(--accent)" }}>
//                     {item.score ?? "--"}<span className="text-xs ml-0.5 opacity-30" style={{ color: "var(--text-primary)" }}>/100</span>
//                   </p>
//                 </div>

//                 {/* STATUS & LINK */}
//                 <div className="flex items-center gap-4">
//                     <span
//                     className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border
//                     ${
//                         item.completed
//                         ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
//                         : "bg-amber-500/10 text-amber-400 border-amber-500/20"
//                     }`}
//                     >
//                     {item.completed ? "Completed" : "Incomplete"}
//                     </span>

//                     <a
//                     href={`/history/${item._id}`}
//                     className="w-12 h-12 rounded-2xl border flex items-center justify-center transition-all shadow-sm active:scale-95"
//                     style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
//                     >
//                     <FiChevronRight size={20} className="group-hover:text-white" />
//                     </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


//next acc claude code
import React, { useState, useCallback } from "react";
import API from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  FiBriefcase, FiCalendar, FiChevronRight, FiFilter,
  FiLoader, FiActivity, FiSearch, FiMic, FiFileText,
  FiChevronLeft, FiX,
} from "react-icons/fi";

/* ── Debounce hook ── */
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

/* ── Score color helper ── */
function scoreColor(score) {
  if (score >= 75) return "#10b981";
  if (score >= 45) return "#f59e0b";
  return "#f43f5e";
}

export default function History() {
  const [search, setSearch]   = useState("");
  const [type, setType]       = useState("ALL");     // ALL | LIVE | WRITTEN
  const [sort, setSort]       = useState("newest");  // newest | oldest | highest | lowest
  const [page, setPage]       = useState(1);

  const debouncedSearch = useDebounce(search, 400);

  // Reset to page 1 whenever filters change
  const handleFilter = useCallback((setter) => (val) => {
    setter(val);
    setPage(1);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["interview-history", type, sort, debouncedSearch, page],
    queryFn: async () => {
      const params = new URLSearchParams({ type, sort, page, limit: 10 });
      if (debouncedSearch) params.set("search", debouncedSearch);
      const res = await API.get(`/interview-history?${params}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const sessions   = data?.sessions   || [];
  const pagination = data?.pagination || {};
  const stats      = data?.stats      || {};

  if (isLoading && page === 1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
        <FiLoader className="w-10 h-10 animate-spin mb-4" style={{ color: "var(--accent)" }} />
        <p className="font-bold uppercase tracking-widest text-xs" style={{ color: "var(--text-secondary)" }}>
          Loading History...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-rose-400 font-bold">Failed to load history. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">

      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl text-white shadow-xl shadow-indigo-900/40"
                 style={{ backgroundColor: "var(--accent)" }}>
              <FiActivity size={24} />
            </div>
            <h1 className="text-4xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              Interview <span style={{ color: "var(--accent)" }}>History</span>
            </h1>
          </div>
          <p className="font-medium max-w-lg" style={{ color: "var(--text-secondary)" }}>
            Review your past mock sessions, evaluate AI feedback, and track your growth over time.
          </p>
        </div>

        {/* Search */}
        <div className="relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by company, role, topic..."
            className="pl-11 pr-10 py-2.5 rounded-2xl border text-sm outline-none transition-all w-72 shadow-sm"
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

      {/* ── STATS ROW ── */}
      {stats.totalSessions > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Sessions", value: stats.totalSessions, color: "var(--accent)" },
            { label: "Avg Score",      value: `${stats.avgScore}%`, color: stats.avgScore >= 75 ? "#10b981" : stats.avgScore >= 45 ? "#f59e0b" : "#f43f5e" },
            { label: "Live Sessions",  value: stats.liveCount,    color: "#818cf8" },
            { label: "Written",        value: stats.writtenCount, color: "#10b981" },
          ].map((s, i) => (
            <div key={i} className="card p-5 flex flex-col gap-1">
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>{s.label}</p>
              <p className="text-3xl font-black tracking-tighter" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── FILTER BAR ── */}
      <div className="flex flex-wrap items-center gap-3 p-2 rounded-[2rem] border shadow-lg shadow-black/20"
           style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>

        <div className="flex items-center gap-2 px-4 py-2 border-r" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
          <FiFilter size={16} />
          <span className="text-xs font-black uppercase tracking-widest">Filters</span>
        </div>

        {/* Type filter — pill buttons */}
        <div className="flex items-center gap-2 px-2">
          {["ALL", "LIVE", "WRITTEN"].map((t) => (
            <button
              key={t}
              onClick={() => handleFilter(setType)(t)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border ${
                type === t
                  ? "text-white border-[var(--accent)]"
                  : "border-transparent hover:bg-white/5"
              }`}
              style={{
                backgroundColor: type === t ? "var(--accent)" : "transparent",
                color: type === t ? "white" : "var(--text-secondary)",
              }}
            >
              {t === "LIVE" && <FiMic size={11} />}
              {t === "WRITTEN" && <FiFileText size={11} />}
              {t}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => handleFilter(setSort)(e.target.value)}
          className="ml-auto bg-transparent border-none rounded-xl px-4 py-2 text-sm font-bold cursor-pointer focus:ring-0 transition-colors"
          style={{ color: "var(--text-secondary)" }}
        >
          <option value="newest">Latest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Score</option>
          <option value="lowest">Lowest Score</option>
        </select>
      </div>

      {/* ── SESSION LIST ── */}
      {sessions.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed rounded-[3rem]"
             style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-20"
               style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-secondary)" }}>
            <FiActivity size={32} />
          </div>
          <p className="font-bold text-xl" style={{ color: "var(--text-primary)" }}>
            {search ? `No results for "${search}"` : "No interviews yet"}
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            {search ? "Try a different search term" : "Start your first mock interview to see insights here 🚀"}
          </p>
        </div>
      ) : (
        <div className={`grid grid-cols-1 gap-4 transition-opacity ${isLoading ? "opacity-50" : "opacity-100"}`}>
          {sessions.map((item) => (
            <SessionCard key={item._id} item={item} />
          ))}
        </div>
      )}

      {/* ── PAGINATION ── */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-10 h-10 rounded-2xl border flex items-center justify-center transition-all disabled:opacity-30 hover:bg-white/5"
            style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
          >
            <FiChevronLeft size={16} />
          </button>

          {/* Page numbers */}
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 1)
            .reduce((acc, p, idx, arr) => {
              if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((p, idx) =>
              p === "..." ? (
                <span key={`ellipsis-${idx}`} className="text-sm" style={{ color: "var(--text-secondary)" }}>…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="w-10 h-10 rounded-2xl border text-sm font-bold transition-all"
                  style={{
                    backgroundColor: page === p ? "var(--accent)" : "transparent",
                    borderColor: page === p ? "var(--accent)" : "var(--border-color)",
                    color: page === p ? "white" : "var(--text-secondary)",
                  }}
                >
                  {p}
                </button>
              )
            )}

          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={!pagination.hasMore}
            className="w-10 h-10 rounded-2xl border flex items-center justify-center transition-all disabled:opacity-30 hover:bg-white/5"
            style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
          >
            <FiChevronRight size={16} />
          </button>

          <span className="text-xs font-bold ml-2" style={{ color: "var(--text-secondary)" }}>
            {pagination.total} total
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Session Card ── */
function SessionCard({ item }) {
  const color = scoreColor(item.score);
  const isLive = item.type === "LIVE";

  return (
    <div className="group card rounded-[2rem] p-6 hover:border-[var(--accent)] hover:shadow-2xl hover:shadow-indigo-500/5 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-6">

      {/* LEFT: icon + info */}
      <div className="flex items-center gap-5">
        {/* Type icon */}
        <div className="w-14 h-14 rounded-2xl border flex items-center justify-center flex-shrink-0 transition-all"
             style={{
               backgroundColor: isLive ? "rgba(129,140,248,0.1)" : "rgba(16,185,129,0.1)",
               borderColor: isLive ? "rgba(129,140,248,0.2)" : "rgba(16,185,129,0.2)",
               color: isLive ? "#818cf8" : "#10b981",
             }}>
          {isLive ? <FiMic size={22} /> : <FiFileText size={22} />}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xl font-black tracking-tight group-hover:text-[var(--accent)] transition-colors"
                style={{ color: "var(--text-primary)" }}>
              {item.company || "General Interview"}
            </h3>
            {/* Type badge */}
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border"
                  style={{
                    backgroundColor: isLive ? "rgba(129,140,248,0.1)" : "rgba(16,185,129,0.1)",
                    borderColor: isLive ? "rgba(129,140,248,0.2)" : "rgba(16,185,129,0.2)",
                    color: isLive ? "#818cf8" : "#10b981",
                  }}>
              {item.type}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm font-bold" style={{ color: "var(--text-secondary)" }}>
            <span className="flex items-center gap-1.5">
              <FiCalendar size={12} style={{ color: "var(--accent)" }} />
              {new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--border-color)" }} />
            <span className="text-xs">{item.topic}</span>
            {item.questionsCount > 0 && (
              <>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--border-color)" }} />
                <span className="text-xs">{item.questionsCount} questions</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: role + score + status + link */}
      <div className="flex items-center justify-between md:justify-end gap-6 flex-wrap">

        {/* Role tag */}
        <span className="hidden lg:block px-3 py-1.5 border text-[10px] font-black uppercase tracking-widest rounded-xl"
              style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
          {item.role}
        </span>

        {/* Score */}
        <div className="text-center min-w-[56px]">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: "var(--text-secondary)" }}>Score</p>
          <p className="text-2xl font-black tracking-tighter" style={{ color }}>
            {item.score ?? "--"}
            <span className="text-xs ml-0.5 opacity-40" style={{ color: "var(--text-primary)" }}>%</span>
          </p>
        </div>

        {/* Completed badge */}
        <span className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
          Completed
        </span>

        {/* View detail link */}
        <Link
          to={`/history/${item._id}?type=${item.type}`}
          className="w-11 h-11 rounded-2xl border flex items-center justify-center transition-all shadow-sm active:scale-95 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
        >
          <FiChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
}