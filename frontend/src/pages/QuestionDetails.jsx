// import { useParams } from "react-router-dom";
// import { useQuery, useMutation } from "@tanstack/react-query";
// // import { API } from "../api/api";
// import API from "../api/api";
// import Navbar from "../components/Navbar";
// import React from "react";

// export default function QuestionDetails() {
//   const { id } = useParams();

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["question", id],
//     queryFn: async () => {
//       const res = await API.get(`/questions/${id}`);
//       return res.data;
//     }
//   });

//   const upvoteMutation = useMutation({
//     mutationFn: async () => {
//       await API.post(`/questions/${id}/upvote`);
//     },
//     onSuccess: refetch
//   });

//   const aiMutation = useMutation({
//     mutationFn: async () => {
//       const res = await API.post(`/questions/${id}/ai-answer`);
//       return res.data;
//     }
//   });

//   if (isLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="pt-28 text-center text-gray-400">
//           Loading question...
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="pt-28 px-6 text-white">
//         <div className="max-w-4xl mx-auto space-y-8">

//           {/* HEADER */}
//           <div>
//             <h1 className="text-4xl font-extrabold text-purple-400">
//               {data.company} • {data.type}
//             </h1>
//             <p className="mt-2 text-gray-400">
//               Role: <span className="text-gray-200">{data.role}</span> •
//               Difficulty: <span className="text-gray-200">{data.difficulty}</span>
//             </p>
//           </div>

//           {/* QUESTION CARD */}
//           <div className="p-6 rounded-2xl bg-white/10 border border-white/10 shadow-lg">
//             <p className="text-lg leading-relaxed text-gray-100">
//               {data.question}
//             </p>
//           </div>

//           {/* META BAR */}
//           <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
//             <span>👤 Added by: {data.addedBy?.name || "Community"}</span>
//             <span>👍 Upvotes: {data.upvotes}</span>
//           </div>

//           {/* ACTION BUTTONS */}
//           <div className="flex gap-4">
//             <button
//               onClick={() => upvoteMutation.mutate()}
//               disabled={upvoteMutation.isLoading}
//               className="px-5 py-2.5 rounded-lg
//               bg-purple-600/20 border border-purple-500
//               hover:bg-purple-600/30 transition
//               disabled:opacity-50"
//             >
//               👍 Upvote
//             </button>

//             <button
//               onClick={() => aiMutation.mutate()}
//               disabled={aiMutation.isLoading}
//               className="px-5 py-2.5 rounded-lg
//               bg-blue-600/30 border border-blue-500
//               hover:bg-blue-600/40 transition
//               disabled:opacity-50"
//             >
//               {aiMutation.isLoading ? "Thinking..." : "🤖 Get AI Answer"}
//             </button>
//           </div>

//           {/* AI LOADING */}
//           {aiMutation.isLoading && (
//             <p className="text-gray-400">
//               🤖 Generating AI answer...
//             </p>
//           )}

//           {/* AI ANSWER */}
//           {aiMutation.data && (
//             <div className="rounded-2xl border border-purple-500/40
//               bg-black/30 shadow-xl">

//               <div className="px-6 py-4 border-b border-purple-500/30">
//                 <h3 className="text-xl font-semibold text-purple-400">
//                   AI Answer
//                 </h3>
//               </div>

//               <div className="p-6">
//                 <pre className="whitespace-pre-wrap text-gray-200 leading-relaxed">
//                   {aiMutation.data.answer}
//                 </pre>

//                 {aiMutation.data.cached && (
//                   <p className="mt-4 text-xs text-green-400">
//                     ✅ Cached answer (no extra credits used)
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </>
//   );
// }

//new final

import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import API from "../api/api";
import React from "react";
import { FiThumbsUp, FiCpu, FiUser, FiBarChart2, FiLoader, FiCheckCircle } from "react-icons/fi";

export default function QuestionDetails() {
  const { id } = useParams();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["question", id],
    queryFn: async () => {
      const res = await API.get(`/questions/${id}`);
      return res.data;
    }
  });

  const upvoteMutation = useMutation({
    mutationFn: async () => {
      await API.post(`/questions/${id}/upvote`);
    },
    onSuccess: refetch
  });

  const aiMutation = useMutation({
    mutationFn: async () => {
      const res = await API.post(`/questions/${id}/ai-answer`);
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
        <FiLoader className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Question...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      
      {/* HEADER SECTION */}
      <header>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100">
            {data.type}
          </span>
          <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${
            data.difficulty?.toLowerCase() === 'hard' 
            ? 'bg-rose-50 text-rose-600 border-rose-100' 
            : 'bg-emerald-50 text-emerald-600 border-emerald-100'
          }`}>
            {data.difficulty}
          </span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {data.company} <span className="text-slate-400 font-light">Interview</span>
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 mt-4 text-sm font-bold text-slate-500">
          <div className="flex items-center gap-2">
            <FiBarChart2 className="text-indigo-500" />
            <span>Role: <span className="text-slate-900">{data.role}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <FiUser className="text-indigo-500" />
            <span>Added by: <span className="text-slate-900">{data.addedBy?.name || "Community"}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <FiThumbsUp className="text-indigo-500" />
            <span>{data.upvotes} <span className="text-slate-400">Upvotes</span></span>
          </div>
        </div>
      </header>

      {/* QUESTION CARD */}
      <section className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-indigo-100/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
        <p className="text-xl leading-relaxed text-slate-700 font-medium">
          {data.question}
        </p>
      </section>

      {/* ACTION BUTTONS */}
      <section className="flex flex-wrap gap-4">
        <button
          onClick={() => upvoteMutation.mutate()}
          disabled={upvoteMutation.isLoading}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl
          bg-white border border-slate-200 text-slate-700 font-bold
          hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 transition-all
          disabled:opacity-50 shadow-sm active:scale-95"
        >
          <FiThumbsUp />
          Upvote
        </button>

        <button
          onClick={() => aiMutation.mutate()}
          disabled={aiMutation.isLoading}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl
          bg-indigo-600 text-white font-bold
          hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all
          disabled:opacity-50 active:scale-95"
        >
          {aiMutation.isLoading ? (
            <>
              <FiLoader className="animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <FiCpu />
              Get AI Answer
            </>
          )}
        </button>
      </section>

      {/* AI ANSWER SECTION */}
      {aiMutation.data && (
        <section className="rounded-3xl border border-indigo-100 bg-white shadow-2xl shadow-indigo-100/50 overflow-hidden animate-fadeIn">
          <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-xl text-white">
                <FiCpu size={20} />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                AI <span className="text-indigo-600">Response</span>
              </h3>
            </div>
            {aiMutation.data.cached && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
                <FiCheckCircle />
                Cached
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="prose prose-slate max-w-none">
              <pre className="whitespace-pre-wrap text-slate-700 leading-relaxed font-sans text-base">
                {aiMutation.data.answer}
              </pre>
            </div>

            {aiMutation.data.cached && (
              <p className="mt-6 text-xs text-slate-400 font-bold italic">
                * This response was previously generated and did not consume extra credits.
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
