// import { useQuery } from "@tanstack/react-query";
// // import { API } from "../api/api";
// import API from "../api/api";
// import Navbar from "../components/Navbar";
// import React from "react";

// export default function Credits() {
//   const { data, isLoading } = useQuery({
//     queryKey: ["credit-history"],
//     queryFn: async () => {
//       const res = await API.get("/credits/history");
//       return res.data.history;
//     }
//   });

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-5xl mx-auto px-6 py-10 text-white">

//         <h2 className="text-4xl font-extrabold text-purple-400">
//           💰 Credit History
//         </h2>

//         <p className="mt-2 text-gray-400">
//           Track how you earn and spend credits
//         </p>

//         {/* TABLE */}
//         <div className="mt-8 overflow-x-auto">
//           <table className="w-full border border-white/10 rounded-xl overflow-hidden">
//             <thead className="bg-white/10 text-gray-300">
//               <tr>
//                 <th className="p-4 text-left">Action</th>
//                 <th className="p-4 text-left">Credits</th>
//                 <th className="p-4 text-left">Date</th>
//               </tr>
//             </thead>

//             <tbody>
//               {isLoading && (
//                 <tr>
//                   <td colSpan="3" className="p-6 text-gray-400">
//                     Loading history...
//                   </td>
//                 </tr>
//               )}

//               {data?.length === 0 && (
//                 <tr>
//                   <td colSpan="3" className="p-6 text-gray-400">
//                     No credit activity yet
//                   </td>
//                 </tr>
//               )}

//               {data?.map((log) => (
//                 <tr
//                   key={log._id}
//                   className="border-t border-white/10 hover:bg-white/5"
//                 >
//                   <td className="p-4 capitalize">
//                     {log.source.replace("_", " ")}
//                   </td>

//                   <td
//                     className={`p-4 font-semibold ${
//                       log.value > 0
//                         ? "text-green-400"
//                         : "text-red-400"
//                     }`}
//                   >
//                     {log.value > 0 ? `+${log.value}` : log.value}
//                   </td>

//                   <td className="p-4 text-gray-400">
//                     {new Date(log.createdAt).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }


// new final

// import { useQuery } from "@tanstack/react-query";
// import API from "../api/api";
// import Navbar from "../components/Navbar";
// import React from "react";
// import { FiCreditCard, FiArrowUpRight, FiArrowDownLeft, FiLoader, FiClock } from "react-icons/fi";

// export default function Credits() {
//   const { data, isLoading } = useQuery({
//     queryKey: ["credit-history"],
//     queryFn: async () => {
//       const res = await API.get("/credits/history");
//       return res.data.history;
//     }
//   });

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans animate-fadeIn">
//       {/* Navbar is already handled by Layout in your other pages, 
//           but kept here as per your original structure. */}
//       <Navbar />

//       <div className="max-w-5xl mx-auto px-6 py-24">
        
//         {/* HEADER */}
//         <header className="flex items-center gap-4 mb-10">
//           <div className="p-4 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100">
//             <FiCreditCard size={32} />
//           </div>
//           <div>
//             <h2 className="text-4xl font-black tracking-tight text-slate-900">
//               Credit <span className="text-indigo-600">History</span>
//             </h2>
//             <p className="text-slate-500 font-medium">
//               Transparent tracking of your earnings and platform usage.
//             </p>
//           </div>
//         </header>

//         {/* DATA TABLE CONTAINER */}
//         <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-slate-50/50 border-b border-slate-100">
//                   <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Action Type</th>
//                   <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Amount</th>
//                   <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Transaction Date</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-50">
//                 {isLoading && (
//                   <tr>
//                     <td colSpan="3" className="p-12">
//                       <div className="flex flex-col items-center justify-center gap-3">
//                         <FiLoader className="animate-spin text-indigo-500" size={24} />
//                         <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Retrieving Ledger...</span>
//                       </div>
//                     </td>
//                   </tr>
//                 )}

//                 {!isLoading && data?.length === 0 && (
//                   <tr>
//                     <td colSpan="3" className="p-12 text-center">
//                       <div className="flex flex-col items-center gap-2">
//                         <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
//                            <FiClock size={24} />
//                         </div>
//                         <p className="text-slate-500 font-bold">No credit activity found.</p>
//                         <p className="text-slate-400 text-sm">Your transactions will appear here.</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}

//                 {data?.map((log) => (
//                   <tr
//                     key={log._id}
//                     className="group hover:bg-slate-50/50 transition-colors"
//                   >
//                     <td className="p-6">
//                       <div className="flex items-center gap-3">
//                         <div className={`p-2 rounded-lg ${log.value > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
//                            {log.value > 0 ? <FiArrowUpRight /> : <FiArrowDownLeft />}
//                         </div>
//                         <span className="font-bold text-slate-700 capitalize">
//                           {log.source.replace("_", " ")}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="p-6">
//                       <span
//                         className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-black tracking-tight ${
//                           log.value > 0
//                             ? "bg-emerald-100 text-emerald-700"
//                             : "bg-rose-100 text-rose-700"
//                         }`}
//                       >
//                         {log.value > 0 ? `+${log.value}` : log.value}
//                       </span>
//                     </td>

//                     <td className="p-6">
//                       <div className="flex flex-col">
//                         <span className="text-sm font-bold text-slate-600">
//                           {new Date(log.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
//                         </span>
//                         <span className="text-[10px] font-bold text-slate-400 uppercase">
//                           {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* SUMMARY HINT */}
//         <footer className="mt-8 flex items-center justify-center gap-2 text-slate-400 bg-white/50 border border-slate-100 py-3 px-6 rounded-2xl max-w-fit mx-auto shadow-sm">
//            <p className="text-xs font-bold uppercase tracking-widest">
//              Need more credits? Complete challenges to earn rewards.
//            </p>
//         </footer>
//       </div>
//     </div>
//   );
// }

//dark mode
import { useQuery } from "@tanstack/react-query";
import API from "../api/api";
import Navbar from "../components/Navbar";
import React from "react";
import { FiCreditCard, FiArrowUpRight, FiArrowDownLeft, FiLoader, FiClock } from "react-icons/fi";

export default function Credits() {
  const { data, isLoading } = useQuery({
    queryKey: ["credit-history"],
    queryFn: async () => {
      const res = await API.get("/credits/history");
      return res.data.history;
    }
  });

  return (
    <div className="min-h-screen transition-colors duration-300 font-sans selection:bg-indigo-500/30" 
         style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-24 pt-32">
        
        {/* HEADER */}
        <header className="flex items-center gap-5 mb-12">
          <div className="p-4 rounded-3xl text-white shadow-xl shadow-indigo-900/40"
               style={{ backgroundColor: "var(--accent)" }}>
            <FiCreditCard size={32} />
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              Credit <span style={{ color: "var(--accent)" }}>History</span>
            </h2>
            <p className="font-medium" style={{ color: "var(--text-secondary)" }}>
              Transparent tracking of your earnings and platform usage.
            </p>
          </div>
        </header>

        {/* DATA CONTAINER */}
        <div className="card rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 border-[var(--border-color)]"
             style={{ backgroundColor: "var(--bg-card)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b" style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "var(--border-color)" }}>
                  <th className="p-6 text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Action Type</th>
                  <th className="p-6 text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Amount</th>
                  <th className="p-6 text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Transaction Date</th>
                </tr>
              </thead>

              <tbody className="divide-y" style={{ borderColor: "var(--border-color)" }}>
                {isLoading && (
                  <tr>
                    <td colSpan="3" className="p-16">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <FiLoader className="animate-spin" style={{ color: "var(--accent)" }} size={28} />
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Retrieving Ledger...</span>
                      </div>
                    </td>
                  </tr>
                )}

                {!isLoading && data?.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center border opacity-20"
                             style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                           <FiClock size={28} />
                        </div>
                        <p className="font-bold" style={{ color: "var(--text-primary)" }}>No credit activity found.</p>
                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Your transactions will appear here.</p>
                      </div>
                    </td>
                  </tr>
                )}

                {data?.map((log) => (
                  <tr
                    key={log._id}
                    className="group transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl border transition-all group-hover:scale-110 ${
                          log.value > 0 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                           {log.value > 0 ? <FiArrowUpRight size={20} /> : <FiArrowDownLeft size={20} />}
                        </div>
                        <span className="font-bold capitalize" style={{ color: "var(--text-primary)" }}>
                          {log.source.replace("_", " ")}
                        </span>
                      </div>
                    </td>

                    <td className="p-6">
                      <span
                        className={`inline-flex items-center px-4 py-1.5 rounded-xl text-sm font-black tracking-tight border ${
                          log.value > 0
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}
                      >
                        {log.value > 0 ? `+${log.value}` : log.value}
                      </span>
                    </td>

                    <td className="p-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                          {new Date(log.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-tighter" style={{ color: "var(--text-secondary)" }}>
                          {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SUMMARY HINT */}
        <footer className="mt-10 flex items-center justify-center gap-3 border transition-all py-4 px-8 rounded-2xl max-w-fit mx-auto shadow-lg shadow-black/20"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
           <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>
             Need more credits? <span style={{ color: "var(--accent)" }}>Complete challenges</span> to earn rewards.
           </p>
        </footer>
      </div>
    </div>
  );
}