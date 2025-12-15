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


import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";
import React from "react";

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
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10 text-white">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
          Interview Questions
        </h2>

        <p className="mt-2 text-gray-400">
          Browse questions by company
        </p>

        {/* STATES */}
        {isLoading && (
          <p className="mt-10 text-gray-400">Loading companies...</p>
        )}

        {isError && (
          <p className="mt-10 text-red-400">
            Failed to load companies
          </p>
        )}

        {!isLoading && companies.length === 0 && (
          <p className="mt-10 text-gray-400">
            No companies found yet
          </p>
        )}

        {/* COMPANY FOLDERS */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company}
              onClick={() =>
                navigate(`/company/${encodeURIComponent(company)}`)
              }
              className="cursor-pointer p-6 rounded-2xl bg-white/10 
                         border border-white/20 hover:bg-white/20 
                         transition shadow-lg"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">📁</span>
                <div>
                  <h3 className="text-xl font-semibold text-purple-300">
                    {company}
                  </h3>
                  <p className="text-sm text-gray-400">
                    View all interview questions
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
