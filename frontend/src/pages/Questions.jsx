// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import { useQuery } from "@tanstack/react-query";
// import { API } from "../api/api";
// import React from "react";

// export default function Questions() {
//   const [company, setCompany] = useState("");
//   const [role, setRole] = useState("");
//   const [difficulty, setDifficulty] = useState("");
//   const [page, setPage] = useState(1);

//   const limit = 10;

//   const { data, isLoading } = useQuery({
//     queryKey: ["questions", company, role, difficulty, page],
//     queryFn: async () => {
//       const params = new URLSearchParams();
//       if (company) params.append("company", company);
//       if (role) params.append("role", role);
//       if (difficulty) params.append("difficulty", difficulty);
//       params.append("page", page);
//       params.append("limit", limit);

//       const res = await API.get(`/questions?${params.toString()}`);
//       return res.data;
//     },
//     keepPreviousData: true,
//   });

//   const questions = data?.questions ?? [];

//   const difficultyColor = {
//     Easy: "bg-green-600/20 text-green-400 border-green-400/30",
//     Medium: "bg-yellow-600/20 text-yellow-400 border-yellow-400/30",
//     Hard: "bg-red-600/20 text-red-400 border-red-400/30",
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-5xl mx-auto px-6 py-10 text-white">

//         {/* PAGE TITLE */}
//         <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
//           Interview Questions
//         </h2>

//         {/* FILTER BAR */}
//         <div className="mt-6 p-5 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl flex flex-wrap gap-4">

//           <input
//             value={company}
//             onChange={(e) => setCompany(e.target.value)}
//             placeholder="Company (Google, Amazon...)"
//             className="flex-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none"
//           />

//           <input
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             placeholder="Role (SDE, Data Analyst...)"
//             className="flex-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           <select
//             value={difficulty}
//             onChange={(e) => setDifficulty(e.target.value)}
//             className="p-3 rounded-lg bg-gray-900/40 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
//           >
//             <option value="">All Difficulty</option>
//             <option>Easy</option>
//             <option>Medium</option>
//             <option>Hard</option>
//           </select>

//           <button
//             onClick={() => setPage(1)}
//             className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-purple-500/40 transition"
//           >
//             Apply Filters
//           </button>
//         </div>

//         {/* QUESTIONS LIST */}
//         <div className="mt-8 space-y-5">
//           {isLoading && (
//             <div className="text-gray-300 text-lg">Loading questions...</div>
//           )}

//           {!isLoading &&
//             questions.map((q) => (
//               <div
//                 key={q._id}
//                 className="p-6 rounded-xl backdrop-blur-xl bg-white/10 border border-white/10 shadow-[0_0_15px_rgba(120,64,255,0.2)] hover:scale-[1.01] transition-all"
//               >
//                 {/* TOP ROW */}
//                 <div className="flex justify-between items-center">
//                   <div className="text-lg font-semibold text-purple-300">
//                     {q.company} • {q.role}
//                   </div>

//                   <span
//                     className={`px-3 py-1 text-sm rounded-lg border ${difficultyColor[q.difficulty]}`}
//                   >
//                     {q.difficulty}
//                   </span>
//                 </div>

//                 {/* QUESTION */}
//                 <p className="mt-3 text-gray-200 leading-relaxed">
//                   {q.question}
//                 </p>

//                 {/* FOOTER */}
//                 <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
//                   <span>Upvotes: {q.upvotes}</span>

//                   <button
//                     className="px-3 py-1 bg-purple-600/30 border border-purple-500 rounded-lg text-purple-300 hover:bg-purple-500/40 transition"
//                   >
//                     View Details →
//                   </button>
//                 </div>
//               </div>
//             ))}
//         </div>

//         {/* PAGINATION */}
//         <div className="flex justify-between items-center mt-10">
//           <button
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             className="px-5 py-2 rounded-lg bg-white/10 border border-gray-600 hover:bg-white/20 transition"
//           >
//             ← Prev
//           </button>

//           <span className="text-gray-300 text-lg font-semibold">
//             Page {page}
//           </span>

//           <button
//             onClick={() => setPage((p) => p + 1)}
//             className="px-5 py-2 rounded-lg bg-white/10 border border-gray-600 hover:bg-white/20 transition"
//           >
//             Next →
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }


// import Navbar from "../components/Navbar";
// import { useQuery } from "@tanstack/react-query";
// // import { API } from "../api/api";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";
// import React from "react";

// export default function Questions() {
//   const navigate = useNavigate();

//   const {
//     data: companies = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["companies"],
//     queryFn: async () => {
//       const res = await API.get("/questions/companies/list");
//       return res.data.companies;
//     },
//   });

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-6xl mx-auto px-6 py-10 text-white">
//         <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
//           Interview Questions
//         </h2>

//         <p className="mt-2 text-gray-400">
//           Browse questions by company
//         </p>

//         {/* STATES */}
//         {isLoading && (
//           <p className="mt-10 text-gray-400">Loading companies...</p>
//         )}

//         {isError && (
//           <p className="mt-10 text-red-400">
//             Failed to load companies
//           </p>
//         )}

//         {!isLoading && companies.length === 0 && (
//           <p className="mt-10 text-gray-400">
//             No companies found yet
//           </p>
//         )}

//         {/* COMPANY FOLDERS */}
//         <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {companies.map((company) => (
//             <div
//               key={company}
//               onClick={() =>
//                 navigate(`/company/${encodeURIComponent(company)}`)
//               }
//               className="cursor-pointer p-6 rounded-2xl bg-white/10 
//                          border border-white/20 hover:bg-white/20 
//                          transition shadow-lg"
//             >
//               <div className="flex items-center gap-4">
//                 <span className="text-4xl">📁</span>
//                 <div>
//                   <h3 className="text-xl font-semibold text-purple-300">
//                     {company}
//                   </h3>
//                   <p className="text-sm text-gray-400">
//                     View all interview questions
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }


// src/pages/Questions.jsx
// import { useQuery } from "@tanstack/react-query";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";
// import React from "react";

// export default function Questions() {
//   const navigate = useNavigate();

//   const {
//     data: companies = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["companies"],
//     queryFn: async () => {
//       const res = await API.get("/questions/companies/list");
//       return res.data.companies;
//     },
//   });

//   return (
//     <>
//       {/* HEADER */}
//       <header className="mb-8">
//         <h2 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
//           Interview Questions
//         </h2>
//         <p className="mt-1 text-gray-400">
//           Browse questions by company
//         </p>
//       </header>

//       {/* STATES */}
//       {isLoading && (
//         <p className="text-gray-400 mt-6">Loading companies...</p>
//       )}

//       {isError && (
//         <p className="text-red-400 mt-6">
//           Failed to load companies
//         </p>
//       )}

//       {!isLoading && companies.length === 0 && (
//         <p className="text-gray-400 mt-6">
//           No companies found yet
//         </p>
//       )}

//       {/* COMPANY LIST */}
//       <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
//         {companies.map((company) => (
//           <div
//             key={company}
//             onClick={() =>
//               navigate(`/company/${encodeURIComponent(company)}`)
//             }
//             className="
//               cursor-pointer p-5 rounded-xl
//               bg-white/10 border border-white/10
//               hover:bg-white/20 hover:border-white/20
//               transition
//             "
//           >
//             <div className="flex items-center gap-4">
//               <span className="text-3xl">📁</span>
//               <div>
//                 <h3 className="text-lg font-semibold text-purple-300">
//                   {company}
//                 </h3>
//                 <p className="text-xs text-gray-400">
//                   View interview questions
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>
//     </>
//   );
// }


//new final
// import { useQuery } from "@tanstack/react-query";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";
// import React from "react";
// import { FiSearch, FiFolder, FiArrowRight, FiLoader } from "react-icons/fi";

// export default function Questions() {
//   const navigate = useNavigate();

//   const {
//     data: companies = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["companies"],
//     queryFn: async () => {
//       const res = await API.get("/questions/companies/list");
//       return res.data.companies;
//     },
//   });

//   return (
//     <div className="animate-fadeIn pb-12">
//       {/* HEADER */}
//       <header className="mb-10 pt-4">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//           <div>
//             <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
//               Interview <span className="text-indigo-600">Questions</span>
//             </h2>
//             <p className="mt-2 text-slate-500 text-lg font-medium">
//               Targeted practice for top-tier companies.
//             </p>
//           </div>
          
//           {/* Quick Search Decoration (Non-functional as requested) */}
//           <div className="relative group max-w-sm w-full">
//             <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
//             <input 
//               type="text" 
//               placeholder="Filter companies..." 
//               className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
//             />
//           </div>
//         </div>
//       </header>

//       {/* LOADING STATE */}
//       {isLoading && (
//         <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
//           <FiLoader className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
//           <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Fetching Companies...</p>
//         </div>
//       )}

//       {/* ERROR STATE */}
//       {isError && (
//         <div className="p-12 text-center bg-rose-50 border border-rose-100 rounded-3xl">
//           <p className="text-rose-600 font-bold">Failed to load companies. Please check your connection.</p>
//         </div>
//       )}

//       {/* EMPTY STATE */}
//       {!isLoading && !isError && companies.length === 0 && (
//         <div className="p-20 text-center bg-white border-2 border-dashed border-slate-200 rounded-3xl">
//           <FiFolder className="w-12 h-12 text-slate-200 mx-auto mb-4" />
//           <p className="text-slate-500 font-medium">No companies found in the bank yet.</p>
//         </div>
//       )}

//       {/* COMPANY LIST */}
//       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
//         {companies.map((company) => (
//           <div
//             key={company}
//             onClick={() =>
//               navigate(`/company/${encodeURIComponent(company)}`)
//             }
//             className="
//               group cursor-pointer p-6 rounded-3xl
//               bg-white border border-slate-200
//               hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5
//               transition-all duration-300 transform hover:-translate-y-1
//             "
//           >
//             <div className="flex flex-col gap-4">
//               <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:border-indigo-100 group-hover:text-indigo-600 transition-colors">
//                 <FiFolder size={28} />
//               </div>
              
//               <div className="flex items-end justify-between">
//                 <div>
//                   <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
//                     {company}
//                   </h3>
//                   <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-tighter">
//                     Questions Available
//                   </p>
//                 </div>
                
//                 <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
//                   <FiArrowRight />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// }

//dark mode
import { useQuery } from "@tanstack/react-query";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import React from "react";
import { FiSearch, FiFolder, FiArrowRight, FiLoader } from "react-icons/fi";

export default function Questions() {
  const navigate = useNavigate();

  const {
    data: companies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await API.get("/questions/companies/list");
      return res.data.companies;
    },
  });

  return (
    <div className="animate-fadeIn pb-12 transition-colors duration-500"
         style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* HEADER */}
      <header className="mb-10 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter" style={{ color: "var(--text-primary)" }}>
              Interview <span style={{ color: "var(--accent)" }}>Questions</span>
            </h2>
            <p className="mt-2 text-lg font-medium" style={{ color: "var(--text-secondary)" }}>
              Targeted practice for top-tier companies.
            </p>
          </div>
          
          {/* Quick Search Decoration */}
          <div className="relative group max-w-sm w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" 
                      style={{ color: "var(--text-secondary)" }} />
            <input 
              type="text" 
              placeholder="Filter companies..." 
              className="w-full pl-11 pr-4 py-3 rounded-2xl outline-none transition-all border shadow-lg"
              style={{ 
                backgroundColor: "var(--bg-card)", 
                borderColor: "var(--border-color)",
                color: "var(--text-primary)" 
              }}
            />
          </div>
        </div>
      </header>

      {/* LOADING STATE */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 card rounded-3xl border animate-pulse"
             style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
          <FiLoader className="w-10 h-10 animate-spin mb-4" style={{ color: "var(--accent)" }} />
          <p className="font-bold uppercase tracking-widest text-xs" style={{ color: "var(--text-secondary)" }}>Fetching Companies...</p>
        </div>
      )}

      {/* ERROR STATE */}
      {isError && (
        <div className="p-12 text-center rounded-3xl border"
             style={{ backgroundColor: "rgba(225, 29, 72, 0.05)", borderColor: "rgba(225, 29, 72, 0.2)" }}>
          <p className="text-rose-400 font-bold">Failed to load companies. Please check your connection.</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!isLoading && !isError && companies.length === 0 && (
        <div className="p-20 text-center border-2 border-dashed rounded-3xl"
             style={{ backgroundColor: "rgba(15, 23, 42, 0.3)", borderColor: "var(--border-color)" }}>
          <FiFolder className="w-12 h-12 mx-auto mb-4 opacity-20" style={{ color: "var(--text-secondary)" }} />
          <p className="font-medium" style={{ color: "var(--text-secondary)" }}>No companies found in the bank yet.</p>
        </div>
      )}

      {/* COMPANY LIST */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {companies.map((company) => (
          <div
            key={company}
            onClick={() => navigate(`/company/${encodeURIComponent(company)}`)}
            className="group cursor-pointer p-6 rounded-3xl border transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-black/20"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
          >
            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl border flex items-center justify-center transition-colors"
                   style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                <FiFolder size={28} className="group-hover:text-[var(--accent)] group-hover:scale-110 transition-transform" />
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-xl font-black tracking-tight transition-colors" style={{ color: "var(--text-primary)" }}>
                    {company}
                  </h3>
                  <p className="text-sm font-bold mt-1 uppercase tracking-tighter" style={{ color: "var(--text-secondary)" }}>
                    Questions Available
                  </p>
                </div>
                
                <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                     style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-secondary)" }}>
                  <FiArrowRight className="group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}