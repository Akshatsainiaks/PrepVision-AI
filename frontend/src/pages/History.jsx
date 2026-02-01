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
import React from "react";
import API from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { 
  FiClock, 
  FiBriefcase, 
  FiCalendar, 
  FiChevronRight, 
  FiFilter, 
  FiLoader, 
  FiActivity,
  FiSearch
} from "react-icons/fi";

export default function History() {
  const { data: history = [], isLoading } = useQuery({
    queryKey: ["interview-history"],
    queryFn: async () => {
      const res = await API.get("/interview-history");
      return res.data.history || [];
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
        <FiLoader className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
          Loading History...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100">
                <FiActivity size={24} />
             </div>
             <h1 className="text-4xl font-black tracking-tight text-slate-900">
                Interview <span className="text-indigo-600">History</span>
             </h1>
          </div>
          <p className="text-slate-500 font-medium max-w-lg">
            Review your past mock sessions, evaluate AI feedback, and track your growth over time.
          </p>
        </div>

        {/* SEARCH DECORATION (Optional UI addition) */}
        <div className="relative group hidden sm:block">
           <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
           <input 
            type="text" 
            placeholder="Search sessions..." 
            className="pl-11 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all w-64 shadow-sm"
           />
        </div>
      </div>

      {/* FILTER BAR - Polished for Light Mode */}
      <div className="flex flex-wrap items-center gap-3 p-2 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
        <div className="flex items-center gap-2 px-4 py-2 text-slate-400 border-r border-slate-100">
           <FiFilter size={16} />
           <span className="text-xs font-black uppercase tracking-widest">Filters</span>
        </div>
        
        <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors focus:ring-0">
          <option>All Roles</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>DevOps</option>
        </select>

        <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors focus:ring-0">
          <option>All Companies</option>
          <option>Google</option>
          <option>Amazon</option>
          <option>Startup</option>
        </select>

        <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors focus:ring-0 ml-auto">
          <option>Latest First</option>
          <option>Oldest First</option>
        </select>
      </div>

      {/* HISTORY LIST */}
      {history.length === 0 ? (
        <div className="text-center py-24 bg-white border-2 border-dashed border-slate-100 rounded-[3rem]">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
            <FiActivity size={32} />
          </div>
          <p className="text-slate-600 font-bold text-xl">No interviews attempted yet.</p>
          <p className="text-slate-400 text-sm mt-1">Start your first mock interview to see insights here 🚀</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {history.map((item) => (
            <div
              key={item._id}
              className="group bg-white border border-slate-200 rounded-[2rem] p-6 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              {/* LEFT INFO: Brand and Role */}
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                  <FiBriefcase size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {item.company || "General Interview"}
                  </h3>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                    <span className="flex items-center gap-1.5"><FiCalendar className="text-indigo-400" /> {new Date(item.createdAt).toLocaleDateString()}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                    <span className="flex items-center gap-1.5"><FiClock className="text-indigo-400" /> {item.duration || "15"}m</span>
                  </div>
                </div>
              </div>

              {/* RIGHT INFO: Score, Status, Action */}
              <div className="flex items-center justify-between md:justify-end gap-10">
                
                {/* ROLE TAG (Visible on Desktop) */}
                <span className="hidden lg:block px-4 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-100">
                    {item.role}
                </span>

                {/* SCORE POCKET */}
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Score</p>
                  <p className="text-2xl font-black text-indigo-600 tracking-tighter">
                    {item.score ?? "--"}<span className="text-xs text-slate-300 ml-0.5">/100</span>
                  </p>
                </div>

                {/* STATUS & LINK */}
                <div className="flex items-center gap-4">
                    <span
                    className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border
                    ${
                        item.completed
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}
                    >
                    {item.completed ? "Completed" : "Incomplete"}
                    </span>

                    <a
                    href={`/history/${item._id}`}
                    className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm active:scale-95"
                    >
                    <FiChevronRight size={20} />
                    </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}