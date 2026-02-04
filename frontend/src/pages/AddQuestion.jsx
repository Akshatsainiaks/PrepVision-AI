// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// // import { API } from "../api/api";
// import API from "../api/api";
// import React from "react";

// export default function AddQuestion() {
//   const queryClient = useQueryClient();

//   const [form, setForm] = useState({
//     company: "",
//     role: "",
//     type: "", // 🔥 FREE TEXT (NOT LIMITED)
//     question: "",
//     difficulty: "Medium",
//     tags: "",
//   });

//   const [message, setMessage] = useState("");

//   // 🟢 Add Question Mutation
//   const addQuestionMutation = useMutation({
//     mutationFn: async (payload) => {
//       const res = await API.post("/questions", payload);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["questions"]);
//       setMessage("🎉 Question added successfully!");
//       setForm({
//         company: "",
//         role: "",
//         type: "",
//         question: "",
//         difficulty: "Medium",
//         tags: "",
//       });
//     },
//     onError: (err) => {
//       setMessage(err.response?.data?.message || "❌ Error adding question");
//     },
//   });

//   const handleSubmit = () => {
//     if (!form.company || !form.role || !form.type || !form.question) {
//       setMessage("⚠️ Company, Role, Type, and Question are required.");
//       return;
//     }

//     const payload = {
//       ...form,
//       type: form.type.trim(), // 🔥 normalize
//       tags: form.tags
//         ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
//         : [],
//     };

//     addQuestionMutation.mutate(payload);
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-xl mx-auto px-6 py-10 text-white">
//         {/* PAGE TITLE */}
//         <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
//           Add Interview Question
//         </h2>

//         {/* FORM CARD */}
//         <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-[0_0_25px_rgba(120,64,255,0.3)]">

//           {/* Company */}
//           <label className="text-gray-300 text-sm">Company</label>
//           <input
//             type="text"
//             placeholder="Google, Amazon, Meta..."
//             className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
//                        text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 
//                        outline-none transition mb-5"
//             value={form.company}
//             onChange={(e) =>
//               setForm({ ...form, company: e.target.value })
//             }
//           />

//           {/* Role */}
//           <label className="text-gray-300 text-sm">Role</label>
//           <input
//             type="text"
//             placeholder="SDE, Data Analyst, Backend Engineer..."
//             className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
//                        text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 
//                        outline-none transition mb-5"
//             value={form.role}
//             onChange={(e) =>
//               setForm({ ...form, role: e.target.value })
//             }
//           />

//           {/* 🔥 Question Type (UNLIMITED) */}
//           <label className="text-gray-300 text-sm">Question Type</label>
//           <input
//             list="question-type-options"
//             placeholder="DSA, DBMS, HR, System Design..."
//             className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
//                        text-white focus:ring-2 focus:ring-cyan-500 outline-none transition mb-5"
//             value={form.type}
//             onChange={(e) =>
//               setForm({ ...form, type: e.target.value })
//             }
//           />

//           {/* Suggestions only (NOT LIMITS) */}
//           <datalist id="question-type-options">
//             <option value="DSA" />
//             <option value="DBMS" />
//             <option value="Coding" />
//             <option value="HR" />
//             <option value="System Design" />
//             <option value="OS" />
//             <option value="CN" />
//           </datalist>

//           {/* Question */}
//           <label className="text-gray-300 text-sm">Interview Question</label>
//           <textarea
//             placeholder="Write the interview question..."
//             className="w-full mt-1 p-3 rounded-lg h-32 bg-gray-900/40 border border-gray-700 
//                        text-white placeholder-gray-500 focus:ring-2 focus:ring-teal-500 
//                        outline-none transition mb-5"
//             value={form.question}
//             onChange={(e) =>
//               setForm({ ...form, question: e.target.value })
//             }
//           />

//           {/* Difficulty */}
//           <label className="text-gray-300 text-sm">Difficulty</label>
//           <select
//             className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
//                        text-white focus:ring-2 focus:ring-indigo-500 outline-none transition mb-5"
//             value={form.difficulty}
//             onChange={(e) =>
//               setForm({ ...form, difficulty: e.target.value })
//             }
//           >
//             <option>Easy</option>
//             <option>Medium</option>
//             <option>Hard</option>
//           </select>

//           {/* Tags */}
//           <label className="text-gray-300 text-sm">Tags</label>
//           <input
//             type="text"
//             placeholder="React, Node.js, DS Algo (comma-separated)"
//             className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
//                        text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 
//                        outline-none transition mb-3"
//             value={form.tags}
//             onChange={(e) =>
//               setForm({ ...form, tags: e.target.value })
//             }
//           />

//           {/* TAG PREVIEW */}
//           {form.tags && (
//             <div className="flex flex-wrap gap-2 mb-5">
//               {form.tags
//                 .split(",")
//                 .map((tag) => tag.trim())
//                 .filter(Boolean)
//                 .map((tag, idx) => (
//                   <span
//                     key={idx}
//                     className="px-3 py-1 text-xs rounded-full bg-purple-600/30 
//                                text-purple-300 border border-purple-500"
//                   >
//                     #{tag}
//                   </span>
//                 ))}
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             disabled={addQuestionMutation.isLoading}
//             className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 
//                        text-white font-semibold shadow-lg hover:shadow-purple-500/40 
//                        transition disabled:opacity-50"
//           >
//             {addQuestionMutation.isLoading ? "Adding..." : "Submit Question"}
//           </button>

//           {/* Message */}
//           {message && (
//             <p className="mt-4 text-center font-semibold text-purple-300">
//               {message}
//             </p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }


// import { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import API from "../api/api";
// import React from "react";

// export default function AddQuestion() {
//   const queryClient = useQueryClient();

//   const [form, setForm] = useState({
//     company: "",
//     role: "",
//     type: "",
//     question: "",
//     difficulty: "Medium",
//     tags: "",
//   });

//   const [message, setMessage] = useState("");

//   const addQuestionMutation = useMutation({
//     mutationFn: async (payload) => {
//       const res = await API.post("/questions", payload);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["questions"]);
//       setMessage("🎉 Question added successfully!");
//       setForm({
//         company: "",
//         role: "",
//         type: "",
//         question: "",
//         difficulty: "Medium",
//         tags: "",
//       });
//     },
//     onError: (err) => {
//       setMessage(err.response?.data?.message || "❌ Error adding question");
//     },
//   });

//   const handleSubmit = () => {
//     if (!form.company || !form.role || !form.type || !form.question) {
//       setMessage("⚠️ Company, Role, Type, and Question are required.");
//       return;
//     }

//     const payload = {
//       ...form,
//       type: form.type.trim(),
//       tags: form.tags
//         ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
//         : [],
//     };

//     addQuestionMutation.mutate(payload);
//   };

//   return (
//     <div className="max-w-xl mx-auto">
//       {/* PAGE TITLE */}
//       <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
//         Add Interview Question
//       </h2>

//       {/* FORM CARD */}
//       <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-[0_0_25px_rgba(120,64,255,0.3)]">

//         {/* Company */}
//         <label className="text-gray-300 text-sm">Company</label>
//         <input
//           type="text"
//           placeholder="Google, Amazon, Meta..."
//           className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white mb-5"
//           value={form.company}
//           onChange={(e) => setForm({ ...form, company: e.target.value })}
//         />

//         {/* Role */}
//         <label className="text-gray-300 text-sm">Role</label>
//         <input
//           type="text"
//           placeholder="SDE, Data Analyst, Backend Engineer..."
//           className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white mb-5"
//           value={form.role}
//           onChange={(e) => setForm({ ...form, role: e.target.value })}
//         />

//         {/* Question Type */}
//         <label className="text-gray-300 text-sm">Question Type</label>
//         <input
//           list="question-type-options"
//           className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white mb-5"
//           value={form.type}
//           onChange={(e) => setForm({ ...form, type: e.target.value })}
//         />

//         <datalist id="question-type-options">
//           <option value="DSA" />
//           <option value="DBMS" />
//           <option value="Coding" />
//           <option value="HR" />
//           <option value="System Design" />
//           <option value="OS" />
//           <option value="CN" />
//         </datalist>

//         {/* Question */}
//         <label className="text-gray-300 text-sm">Interview Question</label>
//         <textarea
//           className="w-full mt-1 p-3 h-32 rounded-lg bg-gray-900/40 border border-gray-700 text-white mb-5"
//           value={form.question}
//           onChange={(e) => setForm({ ...form, question: e.target.value })}
//         />

//         {/* Difficulty */}
//         <label className="text-gray-300 text-sm">Difficulty</label>
//         <select
//           className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white mb-5"
//           value={form.difficulty}
//           onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
//         >
//           <option>Easy</option>
//           <option>Medium</option>
//           <option>Hard</option>
//         </select>

//         {/* Tags */}
//         <label className="text-gray-300 text-sm">Tags</label>
//         <input
//           type="text"
//           className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white mb-3"
//           value={form.tags}
//           onChange={(e) => setForm({ ...form, tags: e.target.value })}
//         />

//         {/* Submit */}
//         <button
//           onClick={handleSubmit}
//           disabled={addQuestionMutation.isLoading}
//           className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold"
//         >
//           {addQuestionMutation.isLoading ? "Adding..." : "Submit Question"}
//         </button>

//         {message && (
//           <p className="mt-4 text-center text-purple-300 font-semibold">
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

//new final
// import { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import API from "../api/api";
// import React from "react";
// import { FiPlusCircle, FiCheck, FiAlertTriangle, FiLoader } from "react-icons/fi";

// export default function AddQuestion() {
//   const queryClient = useQueryClient();

//   const [form, setForm] = useState({
//     company: "",
//     role: "",
//     type: "",
//     question: "",
//     difficulty: "Medium",
//     tags: "",
//   });

//   const [message, setMessage] = useState("");

//   const addQuestionMutation = useMutation({
//     mutationFn: async (payload) => {
//       const res = await API.post("/questions", payload);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["questions"]);
//       setMessage("🎉 Question added successfully!");
//       setForm({
//         company: "",
//         role: "",
//         type: "",
//         question: "",
//         difficulty: "Medium",
//         tags: "",
//       });
//       // Clear message after 3 seconds
//       setTimeout(() => setMessage(""), 3000);
//     },
//     onError: (err) => {
//       setMessage(err.response?.data?.message || "❌ Error adding question");
//     },
//   });

//   const handleSubmit = () => {
//     if (!form.company || !form.role || !form.type || !form.question) {
//       setMessage("⚠️ Company, Role, Type, and Question are required.");
//       return;
//     }

//     const payload = {
//       ...form,
//       type: form.type.trim(),
//       tags: form.tags
//         ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
//         : [],
//     };

//     addQuestionMutation.mutate(payload);
//   };

//   return (
//     <div className="max-w-2xl mx-auto pb-12 animate-fadeIn">
//       {/* PAGE TITLE */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100">
//           <FiPlusCircle size={28} />
//         </div>
//         <div>
//           <h2 className="text-4xl font-black tracking-tight text-slate-900">
//             Contribute <span className="text-indigo-600">Question</span>
//           </h2>
//           <p className="text-slate-500 font-medium">Help the community by sharing interview experiences.</p>
//         </div>
//       </div>

//       {/* FORM CARD */}
//       <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden">
        
//         {/* Progress bar for form completion (Optional Visual) */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-slate-50">
//             <div 
//                 className="h-full bg-indigo-600 transition-all duration-500" 
//                 style={{ width: `${Object.values(form).filter(Boolean).length * 16.6}%` }} 
//             />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           {/* Company */}
//           <div className="space-y-1.5">
//             <label className="text-slate-700 text-sm font-bold ml-1">Company</label>
//             <input
//               type="text"
//               placeholder="e.g. Google, Amazon"
//               className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all"
//               value={form.company}
//               onChange={(e) => setForm({ ...form, company: e.target.value })}
//             />
//           </div>

//           {/* Role */}
//           <div className="space-y-1.5">
//             <label className="text-slate-700 text-sm font-bold ml-1">Role</label>
//             <input
//               type="text"
//               placeholder="e.g. SDE, Frontend"
//               className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all"
//               value={form.role}
//               onChange={(e) => setForm({ ...form, role: e.target.value })}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             {/* Question Type */}
//             <div className="space-y-1.5">
//                 <label className="text-slate-700 text-sm font-bold ml-1">Question Type</label>
//                 <input
//                 list="question-type-options"
//                 placeholder="Select or Type..."
//                 className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all"
//                 value={form.type}
//                 onChange={(e) => setForm({ ...form, type: e.target.value })}
//                 />
//                 <datalist id="question-type-options">
//                     <option value="DSA" />
//                     <option value="DBMS" />
//                     <option value="Coding" />
//                     <option value="HR" />
//                     <option value="System Design" />
//                     <option value="OS" />
//                     <option value="CN" />
//                 </datalist>
//             </div>

//             {/* Difficulty */}
//             <div className="space-y-1.5">
//                 <label className="text-slate-700 text-sm font-bold ml-1">Difficulty</label>
//                 <select
//                 className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all appearance-none"
//                 value={form.difficulty}
//                 onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
//                 >
//                 <option>Easy</option>
//                 <option>Medium</option>
//                 <option>Hard</option>
//                 </select>
//             </div>
//         </div>

//         {/* Question */}
//         <div className="space-y-1.5 mb-6">
//             <label className="text-slate-700 text-sm font-bold ml-1">Interview Question</label>
//             <textarea
//             placeholder="Type the question details here..."
//             className="w-full p-4 h-40 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all resize-none"
//             value={form.question}
//             onChange={(e) => setForm({ ...form, question: e.target.value })}
//             />
//         </div>

//         {/* Tags */}
//         <div className="space-y-1.5 mb-8">
//             <label className="text-slate-700 text-sm font-bold ml-1">Tags (comma separated)</label>
//             <input
//             type="text"
//             placeholder="arrays, recursion, dynamic programming..."
//             className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all"
//             value={form.tags}
//             onChange={(e) => setForm({ ...form, tags: e.target.value })}
//             />
//         </div>

//         {/* Submit */}
//         <button
//           onClick={handleSubmit}
//           disabled={addQuestionMutation.isLoading}
//           className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg shadow-xl shadow-indigo-100 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3"
//         >
//           {addQuestionMutation.isLoading ? (
//             <>
//                 <FiLoader className="animate-spin" />
//                 Processing...
//             </>
//           ) : (
//             <>
//                 <FiPlusCircle />
//                 Publish Question
//             </>
//           )}
//         </button>

//         {/* Status Message */}
//         {message && (
//           <div className={`mt-6 p-4 rounded-xl border flex items-center gap-3 animate-fadeIn ${
//               message.includes("🎉") 
//               ? "bg-emerald-50 border-emerald-100 text-emerald-700" 
//               : "bg-rose-50 border-rose-100 text-rose-700"
//           }`}>
//             {message.includes("🎉") ? <FiCheck /> : <FiAlertTriangle />}
//             <span className="text-sm font-bold uppercase tracking-tight">{message}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


//dark mode
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api/api";
import React from "react";
import { FiPlusCircle, FiCheck, FiAlertTriangle, FiLoader } from "react-icons/fi";

export default function AddQuestion() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    company: "",
    role: "",
    type: "",
    question: "",
    difficulty: "Medium",
    tags: "",
  });

  const [message, setMessage] = useState("");

  const addQuestionMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await API.post("/questions", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["questions"]);
      setMessage("🎉 Question added successfully!");
      setForm({
        company: "",
        role: "",
        type: "",
        question: "",
        difficulty: "Medium",
        tags: "",
      });
      setTimeout(() => setMessage(""), 3000);
    },
    onError: (err) => {
      setMessage(err.response?.data?.message || "❌ Error adding question");
    },
  });

  const handleSubmit = () => {
    if (!form.company || !form.role || !form.type || !form.question) {
      setMessage("⚠️ Required: Company, Role, Type, and Question.");
      return;
    }

    const payload = {
      ...form,
      type: form.type.trim(),
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    };

    addQuestionMutation.mutate(payload);
  };

  const inputStyles = `
    w-full p-3.5 rounded-xl border outline-none transition-all
    bg-[var(--bg-primary)] border-[var(--border-color)] 
    text-[var(--text-primary)] placeholder-slate-500
    focus:ring-4 focus:ring-indigo-500/10 focus:border-[var(--accent)]
  `;

  return (
    <div className="max-w-2xl mx-auto pb-12 animate-fadeIn transition-colors duration-300">
      {/* PAGE TITLE */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl text-white shadow-xl shadow-indigo-500/20"
             style={{ backgroundColor: "var(--accent)" }}>
          <FiPlusCircle size={28} />
        </div>
        <div>
          <h2 className="text-4xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
            Contribute <span style={{ color: "var(--accent)" }}>Question</span>
          </h2>
          <p className="font-medium" style={{ color: "var(--text-secondary)" }}>
            Help the community by sharing interview experiences.
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="card rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
        
        {/* Form Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--bg-primary)]">
            <div 
                className="h-full transition-all duration-500" 
                style={{ 
                    width: `${Object.values(form).filter(Boolean).length * 16.6}%`,
                    backgroundColor: "var(--accent)"
                }} 
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-1.5">
            <label className="text-sm font-bold ml-1" style={{ color: "var(--text-secondary)" }}>Company</label>
            <input
              type="text"
              placeholder="e.g. Google, Amazon"
              className={inputStyles}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold ml-1" style={{ color: "var(--text-secondary)" }}>Role</label>
            <input
              type="text"
              placeholder="e.g. SDE, Frontend"
              className={inputStyles}
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-1.5">
                <label className="text-sm font-bold ml-1" style={{ color: "var(--text-secondary)" }}>Question Type</label>
                <input
                list="question-type-options"
                placeholder="Select or Type..."
                className={inputStyles}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
                <datalist id="question-type-options">
                    <option value="DSA" />
                    <option value="DBMS" />
                    <option value="Coding" />
                    <option value="HR" />
                    <option value="System Design" />
                </datalist>
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-bold ml-1" style={{ color: "var(--text-secondary)" }}>Difficulty</label>
                <select
                className={`${inputStyles} appearance-none`}
                value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
                </select>
            </div>
        </div>

        {/* Question Area */}
        <div className="space-y-1.5 mb-6">
            <label className="text-sm font-bold ml-1" style={{ color: "var(--text-secondary)" }}>Interview Question</label>
            <textarea
            placeholder="Type the question details here..."
            className={`${inputStyles} h-40 resize-none`}
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            />
        </div>

        {/* Tags */}
        <div className="space-y-1.5 mb-8">
            <label className="text-sm font-bold ml-1" style={{ color: "var(--text-secondary)" }}>Tags (comma separated)</label>
            <input
            type="text"
            placeholder="arrays, recursion, dynamic programming..."
            className={inputStyles}
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={addQuestionMutation.isLoading}
          className="w-full py-4 rounded-2xl text-white font-black text-lg shadow-xl transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3"
          style={{ 
            backgroundColor: "var(--accent)",
            boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.2)"
          }}
        >
          {addQuestionMutation.isLoading ? (
            <><FiLoader className="animate-spin" /> Processing...</>
          ) : (
            <><FiPlusCircle /> Publish Question</>
          )}
        </button>

        {/* Status Message */}
        {message && (
          <div className={`mt-6 p-4 rounded-xl border flex items-center gap-3 animate-fadeIn ${
              message.includes("🎉") 
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
              : "bg-rose-500/10 border-rose-500/20 text-rose-400"
          }`}>
            {message.includes("🎉") ? <FiCheck /> : <FiAlertTriangle />}
            <span className="text-sm font-bold uppercase tracking-tight">{message}</span>
          </div>
        )}
      </div>
    </div>
  );
}