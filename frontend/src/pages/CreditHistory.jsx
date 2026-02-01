// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// // import { API } from "../api/api";
// import API from "../api/api";
// import React from "react";

// export default function CreditHistory() {
//   const [logs, setLogs] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await API.get("/credits/me");
//         setLogs(res.data.logs);
//       } catch (err) {
//         console.error(err);
//       }
//     })();
//   }, []);

//   if (!logs) {
//     return (
//       <>
//         <Navbar />
//         <div className="p-8 text-white">Loading credit history...</div>
//       </>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
//       <Navbar />

//       <div className="max-w-4xl mx-auto p-8">
//         <h2 className="text-4xl font-extrabold mb-10 text-purple-400">
//           Credit History
//         </h2>

//         {logs.length === 0 ? (
//           <div className="text-gray-400 bg-white/5 p-6 rounded-xl text-center">
//             No credit activity found
//           </div>
//         ) : (
//           <div className="space-y-5">
//             {logs.map((log) => (
//               <div
//                 key={log._id}
//                 className="flex justify-between items-center 
//                 backdrop-blur-xl bg-white/10 border border-white/20 
//                 p-6 rounded-2xl"
//               >
//                 <div>
//                   <p className="font-semibold capitalize">
//                     {log.source.replace("_", " ")}
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     {new Date(log.createdAt).toLocaleString()}
//                   </p>

//                   {log.meta?.questionId && (
//                     <p className="text-xs text-gray-500 mt-1">
//                       Question ID: {log.meta.questionId}
//                     </p>
//                   )}
//                 </div>

//                 <div
//                   className={`text-lg font-bold ${
//                     log.value > 0
//                       ? "text-green-400"
//                       : "text-red-400"
//                   }`}
//                 >
//                   {log.value > 0 ? "+" : ""}
//                   {log.value} credits
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// new final
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";
import React from "react";
import { FiArrowUpRight, FiArrowDownLeft, FiClock, FiCreditCard, FiHash, FiLoader, FiChevronRight } from "react-icons/fi";

export default function CreditHistory() {
  const [logs, setLogs] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/credits/me");
        setLogs(res.data.logs);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  if (!logs) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <FiLoader className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing Ledger...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100">
      <Navbar />

      {/* LAYOUT FIX: 
          - Changed pt-28 to pt-32 to better clear the Navbar height.
          - Adjusted max-w to 4xl to match the Notifications page perfectly.
      */}
      <div className="max-w-4xl mx-auto p-6 md:p-10 pt-32">
        
        {/* HEADER SECTION - Aligned with Notifications UI */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-indigo-600 rounded-[22px] text-white shadow-xl shadow-indigo-100 ring-4 ring-white">
              <FiCreditCard size={28} />
            </div>
            <div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900">
                Credit <span className="text-indigo-600">Ledger</span>
              </h2>
              <p className="text-slate-500 font-semibold text-sm mt-0.5 tracking-tight">
                Transparent tracking of your earnings and platform usage.
              </p>
            </div>
          </div>
          
          {/* Subtle Stats Badge */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm text-xs font-bold text-slate-500 uppercase tracking-tight">
            <FiClock className="text-indigo-500" />
            Real-time Sync
          </div>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[32px] border border-slate-200 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-5 border border-slate-100 text-slate-300">
              <FiClock size={40} />
            </div>
            <p className="text-slate-600 font-black text-xl">No activity found</p>
            <p className="text-slate-400 text-sm mt-1">Your transaction history will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log._id}
                className={`group relative flex justify-between items-center bg-white border transition-all duration-300 hover:translate-x-1 p-5 md:p-6 rounded-[28px] ${
                  log.value > 0 ? "border-emerald-100 shadow-lg shadow-emerald-100/10" : "border-slate-100 shadow-sm"
                }`}
              >
                {/* Visual Status Indicator (Right Bar) */}
                <span className={`absolute top-1/2 -right-1 translate-y-[-50%] w-1.5 h-10 rounded-l-full ${
                    log.value > 0 ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]" : "bg-slate-200"
                }`}></span>

                <div className="flex items-center gap-5">
                  {/* TRANSACTION ICON - Tinted Backgrounds */}
                  <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    log.value > 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                  }`}>
                    {log.value > 0 ? <FiArrowUpRight size={22} /> : <FiArrowDownLeft size={22} />}
                  </div>

                  <div>
                    <p className="text-lg font-bold text-slate-800 tracking-tight capitalize leading-tight">
                      {log.source.replace("_", " ")}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                            {new Date(log.createdAt).toLocaleDateString()} • {new Date(log.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                        {log.meta?.questionId && (
                            <div className="flex items-center gap-1 text-[10px] bg-indigo-50/50 px-2 py-0.5 rounded-md border border-indigo-100/50 text-indigo-600 font-bold">
                                <FiHash size={10} className="text-indigo-400" />
                                {log.meta.questionId.slice(-6).toUpperCase()}
                            </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                    <div
                      className={`text-xl font-black tracking-tighter text-right ${
                        log.value > 0 ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      <span className="text-[10px] block opacity-40 uppercase tracking-tighter -mb-1 font-bold">
                        {log.value > 0 ? "Earned" : "Spent"}
                      </span>
                      {log.value > 0 ? "+" : ""}
                      {log.value}
                    </div>
                    <FiChevronRight className="text-slate-200 hidden md:block group-hover:text-slate-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FOOTER HINT */}
        <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl text-[11px] font-bold text-indigo-600 uppercase tracking-tight">
                <FiClock />
                Records are updated every 5 minutes
            </div>
        </div>
      </div>
    </div>
  );
}