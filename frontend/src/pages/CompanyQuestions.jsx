// import { useParams, useNavigate } from "react-router-dom";
// import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
// // import { API } from "../api/api";
// import API from "../api/api";
// import Navbar from "../components/Navbar";
// import React, { useState, useRef, useEffect } from "react";

// export default function CompanyQuestions() {
//   const { company, type } = useParams();
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("newest");
//   const loaderRef = useRef(null);

//   /* --------------------------------
//      FETCH FOLDERS (TYPE + COUNT)
//   --------------------------------- */
//   const {
//     data: folders = [],
//     isLoading: loadingFolders
//   } = useQuery({
//     queryKey: ["company-folders", company],
//     queryFn: async () => {
//       const res = await API.get(
//         `/questions/company/${company}/types-with-count`
//       );
//       return res.data.folders;
//     }
//   });

//   /* --------------------------------
//      FETCH QUESTIONS (INFINITE SCROLL)
//   --------------------------------- */
//   const {
//     data,
//     isLoading,
//     fetchNextPage,
//     hasNextPage
//   } = useInfiniteQuery({
//     queryKey: ["company-questions", company, type, search, sort],
//     enabled: !!type,
//     queryFn: async ({ pageParam = 1 }) => {
//       const params = new URLSearchParams();
//       params.append("company", company);
//       params.append("type", type);
//       params.append("page", pageParam);
//       params.append("limit", 6);
//       params.append("sort", sort);
//       if (search) params.append("search", search);

//       const res = await API.get(`/questions?${params.toString()}`);
//       return res.data;
//     },
//     getNextPageParam: (lastPage) =>
//       lastPage.page < lastPage.totalPages
//         ? lastPage.page + 1
//         : undefined
//   });

//   const questions =
//     data?.pages.flatMap((p) => p.questions) || [];

//   /* --------------------------------
//      AUTO LOAD ON SCROLL
//   --------------------------------- */
//   useEffect(() => {
//     if (!loaderRef.current || !hasNextPage) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           fetchNextPage();
//         }
//       },
//       { threshold: 1 }
//     );

//     observer.observe(loaderRef.current);
//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage]);

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-6xl mx-auto px-6 py-10 text-white">

//         {/* COMPANY HEADER */}
//         <h2 className="text-4xl font-extrabold text-purple-400">
//           📁 {company}
//         </h2>

//         {/* =================================================
//             ROOT FOLDER VIEW
//         ================================================== */}
//         {!type && (
//           <>
//             <p className="text-gray-400 mt-2">
//               Open a category folder to view questions
//             </p>

//             <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {loadingFolders && (
//                 <p className="text-gray-400">Loading folders...</p>
//               )}

//               {folders.map((f) => (
//                 <div
//                   key={f.type}
//                   onClick={() =>
//                     navigate(`/company/${company}/${f.type}`)
//                   }
//                   className="cursor-pointer p-6 rounded-2xl
//                   bg-white/10 border border-white/20
//                   hover:bg-white/20 hover:scale-[1.03]
//                   transition shadow-lg"
//                 >
//                   <h3 className="text-xl font-semibold text-purple-300">
//                     📂 {f.type}
//                   </h3>
//                   <p className="text-sm text-gray-400">
//                     {f.count} questions
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* =================================================
//             FOLDER OPEN VIEW
//         ================================================== */}
//         {type && (
//           <>
//             {/* Breadcrumb */}
//             <div className="mt-4 text-gray-400">
//               <span
//                 onClick={() => navigate(`/company/${company}`)}
//                 className="cursor-pointer hover:text-purple-400"
//               >
//                 {company}
//               </span>{" "}
//               / <span className="text-purple-400">{type}</span>
//             </div>

//             {/* Search + Sort */}
//             <div className="mt-6 flex flex-col md:flex-row gap-4">
//               <input
//                 type="text"
//                 placeholder="Search in this folder..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="flex-1 p-3 rounded-lg bg-gray-900/40
//                 border border-gray-700 focus:ring-2
//                 focus:ring-purple-500 outline-none"
//               />

//               <select
//                 value={sort}
//                 onChange={(e) => setSort(e.target.value)}
//                 className="p-3 rounded-lg bg-gray-900/40
//                 border border-gray-700 text-white
//                 focus:ring-2 focus:ring-purple-500"
//               >
//                 <option value="newest">Newest</option>
//                 <option value="upvotes">Most Upvoted</option>
//                 <option value="difficulty">Difficulty</option>
//               </select>
//             </div>

//             {/* QUESTIONS */}
//             <div className="mt-8 space-y-6">
//               {questions.map((q) => (
//                 <div
//                   key={q._id}
//                   onClick={() => navigate(`/question/${q._id}`)}
//                   className="cursor-pointer p-6 rounded-2xl
//                   bg-white/10 border border-white/10
//                   hover:bg-white/20 transition shadow-lg"
//                 >
//                   <div className="flex justify-between items-center">
//                     <span className="text-purple-300 font-semibold">
//                       {q.role}
//                     </span>
//                     <span className="text-sm text-gray-400">
//                       {q.difficulty}
//                     </span>
//                   </div>

//                   <p className="mt-3 text-gray-200 text-lg">
//                     {q.question}
//                   </p>
//                 </div>
//               ))}

//               {/* Loader */}
//               {hasNextPage && (
//                 <div
//                   ref={loaderRef}
//                   className="text-center text-gray-400 py-6"
//                 >
//                   Loading more...
//                 </div>
//               )}

//               {!hasNextPage && !isLoading && (
//                 <p className="text-center text-gray-500">
//                   🎉 No more questions
//                 </p>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }


// import { useParams, useNavigate } from "react-router-dom";
// import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
// import API from "../api/api";
// import Navbar from "../components/Navbar";
// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Folder, 
//   ChevronRight, 
//   Search, 
//   Filter, 
//   ArrowLeft, 
//   CircleDot, 
//   LayoutGrid,
//   Loader2
// } from "lucide-react";

// export default function CompanyQuestions() {
//   const { company, type } = useParams();
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("newest");
//   const loaderRef = useRef(null);

//   /* --------------------------------
//      FETCH FOLDERS
//   --------------------------------- */
//   const { data: folders = [], isLoading: loadingFolders } = useQuery({
//     queryKey: ["company-folders", company],
//     queryFn: async () => {
//       const res = await API.get(`/questions/company/${company}/types-with-count`);
//       return res.data.folders;
//     }
//   });

//   /* --------------------------------
//      FETCH QUESTIONS
//   --------------------------------- */
//   const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
//     queryKey: ["company-questions", company, type, search, sort],
//     enabled: !!type,
//     queryFn: async ({ pageParam = 1 }) => {
//       const params = new URLSearchParams();
//       params.append("company", company);
//       params.append("type", type);
//       params.append("page", pageParam);
//       params.append("limit", 6);
//       params.append("sort", sort);
//       if (search) params.append("search", search);

//       const res = await API.get(`/questions?${params.toString()}`);
//       return res.data;
//     },
//     getNextPageParam: (lastPage) =>
//       lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined
//   });

//   const questions = data?.pages.flatMap((p) => p.questions) || [];

//   useEffect(() => {
//     if (!loaderRef.current || !hasNextPage) return;
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) fetchNextPage();
//     }, { threshold: 0.1 });
//     observer.observe(loaderRef.current);
//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage]);

//   return (
//     <div className="min-h-screen bg-[#030712] text-white selection:bg-purple-500/30">
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
//         {/* HEADER SECTION */}
//         <header className="mb-12">
//           <motion.div 
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex items-center gap-4 mb-4"
//           >
//             {type && (
//               <button 
//                 onClick={() => navigate(`/company/${company}`)}
//                 className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
//               >
//                 <ArrowLeft size={20} className="text-purple-400" />
//               </button>
//             )}
//             <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20">
//               <LayoutGrid size={24} className="text-purple-400" />
//             </div>
//             <div>
//               <h2 className="text-4xl font-black tracking-tight text-white uppercase italic">
//                 {company}
//               </h2>
//               <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">
//                 {type ? `${type} Repository` : "Select a specialized track"}
//               </p>
//             </div>
//           </motion.div>
//         </header>

//         {/* =================================================
//             ROOT FOLDER VIEW (Grid of Categories)
//         ================================================== */}
//         {!type && (
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {loadingFolders ? (
//               [...Array(6)].map((_, i) => (
//                 <div key={i} className="h-40 rounded-3xl bg-white/5 animate-pulse border border-white/5" />
//               ))
//             ) : (
//               folders.map((f, idx) => (
//                 <motion.div
//                   key={f.type}
//                   whileHover={{ y: -5, scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => navigate(`/company/${company}/${f.type}`)}
//                   className="group cursor-pointer relative p-8 rounded-[2rem] bg-gray-900/40 border border-white/5 hover:border-purple-500/30 transition-all overflow-hidden"
//                 >
//                   <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
//                     <Folder size={80} className="text-purple-500" />
//                   </div>
                  
//                   <div className="relative z-10">
//                     <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
//                       <Folder size={22} className="text-purple-400" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-gray-100 mb-1 group-hover:text-white">
//                       {f.type}
//                     </h3>
//                     <p className="text-sm text-gray-500 font-semibold uppercase tracking-tighter">
//                       {f.count} Modules Available
//                     </p>
//                   </div>
//                 </motion.div>
//               ))
//             )}
//           </motion.div>
//         )}

//         {/* =================================================
//             FOLDER OPEN VIEW (Question List)
//         ================================================== */}
//         {type && (
//           <div className="space-y-8">
//             {/* Search & Filter Bar */}
//             <motion.div 
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex flex-col md:flex-row gap-4 p-2 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md"
//             >
//               <div className="relative flex-1 group">
//                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
//                 <input
//                   type="text"
//                   placeholder="Filter questions by keywords..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="w-full pl-14 pr-6 py-4 rounded-2xl bg-transparent outline-none text-gray-200 placeholder:text-gray-600 font-medium"
//                 />
//               </div>

//               <div className="flex items-center gap-2 px-2">
//                 <Filter size={16} className="text-gray-500 hidden md:block" />
//                 <select
//                   value={sort}
//                   onChange={(e) => setSort(e.target.value)}
//                   className="p-4 md:py-2 md:px-4 rounded-2xl bg-white/5 border border-white/5 text-gray-300 font-bold text-sm outline-none focus:border-purple-500/50 transition-all cursor-pointer"
//                 >
//                   <option value="newest" className="bg-gray-950">Newest First</option>
//                   <option value="upvotes" className="bg-gray-950">High Impact</option>
//                   <option value="difficulty" className="bg-gray-950">Complexity</option>
//                 </select>
//               </div>
//             </motion.div>

//             {/* QUESTIONS LIST */}
//             <div className="space-y-4">
//               <AnimatePresence mode="popLayout">
//                 {questions.map((q, idx) => (
//                   <motion.div
//                     layout
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: idx * 0.05 }}
//                     key={q._id}
//                     onClick={() => navigate(`/question/${q._id}`)}
//                     className="group cursor-pointer p-6 rounded-[1.5rem] bg-gray-900/20 border border-white/5 hover:border-white/10 hover:bg-gray-900/40 transition-all flex items-start gap-6 relative overflow-hidden"
//                   >
//                     <div className="hidden sm:flex flex-col items-center pt-1">
//                       <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
//                       <div className="w-px h-full bg-white/5 mt-2" />
//                     </div>

//                     <div className="flex-1">
//                       <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
//                         <div className="flex items-center gap-2">
//                           <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-widest border border-purple-500/20">
//                             {q.role}
//                           </span>
//                           <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
//                             q.difficulty === 'Hard' ? 'text-red-400 bg-red-400/5' : 
//                             q.difficulty === 'Medium' ? 'text-orange-400 bg-orange-400/5' : 
//                             'text-green-400 bg-green-400/5'
//                           }`}>
//                             {q.difficulty}
//                           </span>
//                         </div>
//                         <ChevronRight size={18} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
//                       </div>

//                       <p className="text-gray-200 text-lg font-semibold leading-relaxed group-hover:text-purple-100 transition-colors">
//                         {q.question}
//                       </p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>

//               {/* Infinite Scroll Loader */}
//               {hasNextPage && (
//                 <div ref={loaderRef} className="flex justify-center py-12">
//                   <div className="flex items-center gap-3 text-gray-500 font-bold italic">
//                     <Loader2 className="animate-spin" size={20} />
//                     Synchronizing...
//                   </div>
//                 </div>
//               )}

//               {!hasNextPage && !isLoading && questions.length > 0 && (
//                 <div className="text-center py-12">
//                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/5 text-gray-500 text-sm font-bold">
//                      <CircleDot size={14} className="text-green-500" /> End of Repository
//                    </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

//new final
import { useParams, useNavigate } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import API from "../api/api";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Folder, 
  ChevronRight, 
  Search, 
  Filter, 
  ArrowLeft, 
  CircleDot, 
  LayoutGrid,
  Loader2,
  BookOpen
} from "lucide-react";

export default function CompanyQuestions() {
  const { company, type } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const loaderRef = useRef(null);

  /* --------------------------------
     FETCH FOLDERS
  --------------------------------- */
  const { data: folders = [], isLoading: loadingFolders } = useQuery({
    queryKey: ["company-folders", company],
    queryFn: async () => {
      const res = await API.get(`/questions/company/${company}/types-with-count`);
      return res.data.folders;
    }
  });

  /* --------------------------------
     FETCH QUESTIONS
  --------------------------------- */
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["company-questions", company, type, search, sort],
    enabled: !!type,
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams();
      params.append("company", company);
      params.append("type", type);
      params.append("page", pageParam);
      params.append("limit", 6);
      params.append("sort", sort);
      if (search) params.append("search", search);

      const res = await API.get(`/questions?${params.toString()}`);
      return res.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined
  });

  const questions = data?.pages.flatMap((p) => p.questions) || [];

  useEffect(() => {
    if (!loaderRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchNextPage();
    }, { threshold: 0.1 });
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    // Changed to Light Mode Gradient
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 text-slate-900 selection:bg-indigo-100">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* HEADER SECTION */}
        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-5"
          >
            {type && (
              <button 
                onClick={() => navigate(`/company/${company}`)}
                className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="p-4 rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-200">
              <LayoutGrid size={28} />
            </div>
            <div>
              <h2 className="text-5xl font-black tracking-tight text-slate-900 uppercase">
                {company}
              </h2>
              <p className="text-indigo-600 text-sm font-bold tracking-widest uppercase mt-1">
                {type ? `${type} Repository` : "Specialized Interview Tracks"}
              </p>
            </div>
          </motion.div>
        </header>

        {/* =================================================
            ROOT FOLDER VIEW (Grid of Categories)
        ================================================== */}
        {!type && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {loadingFolders ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="h-48 rounded-[2.5rem] bg-white border border-slate-100 animate-pulse" />
              ))
            ) : (
              folders.map((f, idx) => (
                <motion.div
                  key={f.type}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/company/${company}/${f.type}`)}
                  className="group cursor-pointer relative p-10 rounded-[2.5rem] bg-white border border-slate-200 hover:border-indigo-300 transition-all shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 overflow-hidden"
                >
                  {/* Subtle Background Icon */}
                  <div className="absolute -top-4 -right-4 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <Folder size={120} className="text-indigo-600" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <Folder size={26} className="text-indigo-600 group-hover:text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">
                      {f.type}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                            {f.count} Modules
                        </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* =================================================
            FOLDER OPEN VIEW (Question List)
        ================================================== */}
        {type && (
          <div className="space-y-10">
            {/* Search & Filter Bar */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row gap-4 p-3 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/40"
            >
              <div className="relative flex-1 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Filter questions by keywords..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-16 pr-8 py-4 rounded-[2rem] bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-100 outline-none text-slate-700 placeholder:text-slate-400 font-semibold transition-all"
                />
              </div>

              <div className="flex items-center gap-3 px-4 border-l border-slate-100">
                <Filter size={18} className="text-slate-400" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="py-2 px-4 rounded-xl bg-white text-slate-600 font-bold text-sm outline-none cursor-pointer hover:text-indigo-600 transition-colors"
                >
                  <option value="newest">Newest First</option>
                  <option value="upvotes">High Impact</option>
                  <option value="difficulty">Complexity</option>
                </select>
              </div>
            </motion.div>

            {/* QUESTIONS LIST */}
            <div className="space-y-5">
              <AnimatePresence mode="popLayout">
                {questions.map((q, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={q._id}
                    onClick={() => navigate(`/question/${q._id}`)}
                    className="group cursor-pointer p-8 rounded-[2rem] bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/30 transition-all flex items-start gap-8 relative overflow-hidden"
                  >
                    <div className="hidden sm:flex flex-col items-center pt-2">
                      <div className="w-3 h-3 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.4)]" />
                      <div className="w-px h-full bg-slate-100 mt-4" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="px-4 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 text-[11px] font-black uppercase tracking-widest border border-indigo-100">
                            {q.role}
                          </span>
                          <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border ${
                            q.difficulty === 'Hard' ? 'text-rose-600 bg-rose-50 border-rose-100' : 
                            q.difficulty === 'Medium' ? 'text-amber-600 bg-amber-50 border-amber-100' : 
                            'text-emerald-600 bg-emerald-50 border-emerald-100'
                          }`}>
                            {q.difficulty}
                          </span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                            <ChevronRight size={20} />
                        </div>
                      </div>

                      <p className="text-slate-800 text-xl font-bold leading-relaxed group-hover:text-indigo-600 transition-colors">
                        {q.question}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Infinite Scroll Loader */}
              {hasNextPage && (
                <div ref={loaderRef} className="flex justify-center py-16">
                  <div className="flex items-center gap-3 text-slate-400 font-bold">
                    <Loader2 className="animate-spin text-indigo-600" size={24} />
                    <span>Fetching more content...</span>
                  </div>
                </div>
              )}

              {!hasNextPage && !isLoading && questions.length > 0 && (
                <div className="text-center py-16">
                   <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-slate-100 text-slate-500 text-sm font-bold border border-slate-200">
                     <CircleDot size={16} className="text-emerald-500" />
                     Repository Fully Synced
                   </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}