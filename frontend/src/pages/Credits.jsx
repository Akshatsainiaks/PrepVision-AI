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
//     <div className="min-h-screen transition-colors duration-300 font-sans selection:bg-indigo-500/30" 
//          style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
//       <Navbar />

//       <div className="max-w-5xl mx-auto px-6 py-24 pt-32">
        
//         {/* HEADER */}
//         <header className="flex items-center gap-5 mb-12">
//           <div className="p-4 rounded-3xl text-white shadow-xl shadow-indigo-900/40"
//                style={{ backgroundColor: "var(--accent)" }}>
//             <FiCreditCard size={32} />
//           </div>
//           <div>
//             <h2 className="text-4xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
//               Credit <span style={{ color: "var(--accent)" }}>History</span>
//             </h2>
//             <p className="font-medium" style={{ color: "var(--text-secondary)" }}>
//               Transparent tracking of your earnings and platform usage.
//             </p>
//           </div>
//         </header>

//         {/* DATA CONTAINER */}
//         <div className="card rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 border-[var(--border-color)]"
//              style={{ backgroundColor: "var(--bg-card)" }}>
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b" style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "var(--border-color)" }}>
//                   <th className="p-6 text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Action Type</th>
//                   <th className="p-6 text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Amount</th>
//                   <th className="p-6 text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Transaction Date</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y" style={{ borderColor: "var(--border-color)" }}>
//                 {isLoading && (
//                   <tr>
//                     <td colSpan="3" className="p-16">
//                       <div className="flex flex-col items-center justify-center gap-4">
//                         <FiLoader className="animate-spin" style={{ color: "var(--accent)" }} size={28} />
//                         <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Retrieving Ledger...</span>
//                       </div>
//                     </td>
//                   </tr>
//                 )}

//                 {!isLoading && data?.length === 0 && (
//                   <tr>
//                     <td colSpan="3" className="p-16 text-center">
//                       <div className="flex flex-col items-center gap-3">
//                         <div className="w-14 h-14 rounded-2xl flex items-center justify-center border opacity-20"
//                              style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
//                            <FiClock size={28} />
//                         </div>
//                         <p className="font-bold" style={{ color: "var(--text-primary)" }}>No credit activity found.</p>
//                         <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Your transactions will appear here.</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}

//                 {data?.map((log) => (
//                   <tr
//                     key={log._id}
//                     className="group transition-colors hover:bg-white/[0.02]"
//                   >
//                     <td className="p-6">
//                       <div className="flex items-center gap-4">
//                         <div className={`p-2.5 rounded-xl border transition-all group-hover:scale-110 ${
//                           log.value > 0 
//                           ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
//                           : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
//                         }`}>
//                            {log.value > 0 ? <FiArrowUpRight size={20} /> : <FiArrowDownLeft size={20} />}
//                         </div>
//                         <span className="font-bold capitalize" style={{ color: "var(--text-primary)" }}>
//                           {log.source.replace("_", " ")}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="p-6">
//                       <span
//                         className={`inline-flex items-center px-4 py-1.5 rounded-xl text-sm font-black tracking-tight border ${
//                           log.value > 0
//                             ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
//                             : "bg-rose-500/10 text-rose-400 border-rose-500/20"
//                         }`}
//                       >
//                         {log.value > 0 ? `+${log.value}` : log.value}
//                       </span>
//                     </td>

//                     <td className="p-6">
//                       <div className="flex flex-col gap-1">
//                         <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
//                           {new Date(log.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
//                         </span>
//                         <span className="text-[10px] font-black uppercase tracking-tighter" style={{ color: "var(--text-secondary)" }}>
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
//         <footer className="mt-10 flex items-center justify-center gap-3 border transition-all py-4 px-8 rounded-2xl max-w-fit mx-auto shadow-lg shadow-black/20"
//                 style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
//            <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>
//              Need more credits? <span style={{ color: "var(--accent)" }}>Complete challenges</span> to earn rewards.
//            </p>
//         </footer>
//       </div>
//     </div>
//   );
// }

//next acc claude code
import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import {
  FiCreditCard, FiArrowUpRight, FiArrowDownLeft,
  FiLoader, FiClock, FiFilter, FiTrendingUp,
  FiTrendingDown, FiChevronLeft, FiChevronRight,
  FiHash,
} from "react-icons/fi";

/* ── Debounce ── */
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function Credits() {
  const { user } = useContext(AuthContext);
  const [type, setType] = useState("all");    // all | earned | spent
  const [sort, setSort] = useState("newest"); // newest | oldest
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["credit-history", type, sort, page],
    queryFn: async () => {
      const params = new URLSearchParams({ type, sort, page, limit: 15 });
      const res = await API.get(`/credits/history?${params}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const logs       = data?.history    || [];
  const stats      = data?.stats      || {};
  const pagination = data?.pagination || {};

  const handleFilter = (setter) => (val) => {
    setter(val);
    setPage(1);
  };

  if (isLoading && page === 1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <FiLoader className="w-10 h-10 animate-spin mb-4" style={{ color: "var(--accent)" }} />
        <p className="font-bold uppercase tracking-widest text-xs" style={{ color: "var(--text-secondary)" }}>
          Syncing Ledger...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-rose-400 font-bold">Failed to load credit history.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 pb-16 animate-fadeIn">

      {/* ── HEADER ── */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 pt-6">
        <div className="flex items-center gap-5">
          <div className="p-4 rounded-[22px] text-white shadow-xl shadow-indigo-900/40"
               style={{ backgroundColor: "var(--accent)" }}>
            <FiCreditCard size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              Credit <span style={{ color: "var(--accent)" }}>Ledger</span>
            </h1>
            <p className="font-medium text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
              Transparent tracking of your earnings and platform usage.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 border rounded-2xl text-xs font-bold uppercase tracking-tight"
             style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
          <FiClock style={{ color: "var(--accent)" }} />
          Real-time Sync
        </div>
      </header>

      {/* ── STATS CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        {/* Balance */}
        <div className="card p-6 col-span-2 lg:col-span-1 flex flex-col gap-2 border"
             style={{ borderColor: "rgba(99,102,241,0.2)", backgroundColor: "rgba(99,102,241,0.05)" }}>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
            Current Balance
          </p>
          <p className="text-4xl font-black tracking-tighter" style={{ color: "var(--accent)" }}>
            {stats.balance ?? user?.credits ?? 0}
          </p>
          <p className="text-[10px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>credits</p>
        </div>

        {/* Total Earned */}
        <StatCard
          icon={FiArrowUpRight}
          label="Total Earned"
          value={`+${stats.totalEarned ?? 0}`}
          sub={`+${stats.earnedThisMonth ?? 0} this month`}
          color="#10b981"
          bg="rgba(16,185,129,0.08)"
          border="rgba(16,185,129,0.2)"
        />

        {/* Total Spent */}
        <StatCard
          icon={FiArrowDownLeft}
          label="Total Spent"
          value={`-${stats.totalSpent ?? 0}`}
          sub={`-${stats.spentThisMonth ?? 0} this month`}
          color="#f43f5e"
          bg="rgba(244,63,94,0.08)"
          border="rgba(244,63,94,0.2)"
        />

        {/* Transactions */}
        <StatCard
          icon={FiHash}
          label="Transactions"
          value={stats.totalTransactions ?? 0}
          sub="All time"
          color="#f59e0b"
          bg="rgba(245,158,11,0.08)"
          border="rgba(245,158,11,0.2)"
        />
      </div>

      {/* ── FILTER BAR ── */}
      <div className="flex flex-wrap items-center gap-3 p-2 rounded-[2rem] border mb-6 shadow-lg shadow-black/20"
           style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>

        <div className="flex items-center gap-2 px-4 py-2 border-r"
             style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
          <FiFilter size={15} />
          <span className="text-xs font-black uppercase tracking-widest">Filter</span>
        </div>

        {/* Type pills */}
        <div className="flex items-center gap-2 px-2">
          {[
            { key: "all",    label: "All",    icon: null },
            { key: "earned", label: "Earned", icon: FiTrendingUp },
            { key: "spent",  label: "Spent",  icon: FiTrendingDown },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleFilter(setType)(key)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border"
              style={{
                backgroundColor: type === key ? "var(--accent)" : "transparent",
                borderColor: type === key ? "var(--accent)" : "transparent",
                color: type === key ? "white" : "var(--text-secondary)",
              }}
            >
              {Icon && <Icon size={11} />}
              {label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => handleFilter(setSort)(e.target.value)}
          className="ml-auto bg-transparent border-none rounded-xl px-4 py-2 text-sm font-bold cursor-pointer focus:ring-0"
          style={{ color: "var(--text-secondary)" }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* ── TRANSACTION LIST ── */}
      {logs.length === 0 ? (
        <div className="text-center py-20 card rounded-[2.5rem]">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-20"
               style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-secondary)" }}>
            <FiClock size={32} />
          </div>
          <p className="font-bold text-xl" style={{ color: "var(--text-primary)" }}>No transactions found</p>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            {type !== "all" ? `No ${type} transactions yet.` : "Your credit history will appear here."}
          </p>
        </div>
      ) : (
        <div className={`space-y-3 transition-opacity ${isLoading ? "opacity-50" : "opacity-100"}`}>
          {logs.map((log) => (
            <TransactionRow key={log._id} log={log} />
          ))}
        </div>
      )}

      {/* ── PAGINATION ── */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-10 h-10 rounded-2xl border flex items-center justify-center transition-all disabled:opacity-30 hover:bg-white/5"
            style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
          >
            <FiChevronLeft size={16} />
          </button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 1)
            .reduce((acc, p, idx, arr) => {
              if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((p, idx) =>
              p === "..." ? (
                <span key={`e-${idx}`} className="text-sm" style={{ color: "var(--text-secondary)" }}>…</span>
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

      {/* ── FOOTER ── */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-xl text-[11px] font-bold uppercase tracking-tight"
             style={{ backgroundColor: "rgba(129,140,248,0.05)", borderColor: "rgba(129,140,248,0.1)", color: "var(--accent)" }}>
          <FiClock size={12} />
          Complete mock interviews to earn credits
        </div>
      </div>
    </div>
  );
}

/* ── Transaction Row ── */
function TransactionRow({ log }) {
  const isEarned = log.value > 0;

  return (
    <div
      className="group relative flex justify-between items-center p-5 md:p-6 rounded-[28px] border transition-all duration-200 hover:translate-x-1"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: isEarned ? "rgba(16,185,129,0.2)" : "var(--border-color)",
      }}
    >
      {/* Side accent bar */}
      <span
        className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-10 rounded-l-full"
        style={{
          backgroundColor: isEarned ? "#10b981" : "#334155",
          boxShadow: isEarned ? "0 0 12px rgba(16,185,129,0.4)" : "none",
        }}
      />

      {/* Left: icon + info */}
      <div className="flex items-center gap-5">
        <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
          isEarned ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
        }`}>
          {isEarned ? <FiArrowUpRight size={22} /> : <FiArrowDownLeft size={22} />}
        </div>

        <div>
          <p className="text-base font-bold tracking-tight capitalize leading-tight" style={{ color: "var(--text-primary)" }}>
            {log.source.replace(/_/g, " ")}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md"
                  style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-secondary)" }}>
              {new Date(log.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              {" • "}
              {new Date(log.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            {log.meta?.questionId && (
              <div className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md border font-bold"
                   style={{ backgroundColor: "rgba(129,140,248,0.1)", borderColor: "rgba(129,140,248,0.2)", color: "var(--accent)" }}>
                <FiHash size={9} />
                {String(log.meta.questionId).slice(-6).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right: amount */}
      <div className={`text-xl font-black tracking-tighter text-right ${isEarned ? "text-emerald-400" : "text-rose-400"}`}>
        <span className="text-[10px] block opacity-50 uppercase tracking-tighter -mb-1 font-bold">
          {isEarned ? "Earned" : "Spent"}
        </span>
        {isEarned ? `+${log.value}` : log.value}
      </div>
    </div>
  );
}

/* ── Stat Card ── */
function StatCard({ icon: Icon, label, value, sub, color, bg, border }) {
  return (
    <div className="card p-5 flex flex-col gap-1 border"
         style={{ backgroundColor: bg, borderColor: border }}>
      <div className="flex items-center gap-2 mb-1">
        <Icon size={13} style={{ color }} />
        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
          {label}
        </p>
      </div>
      <p className="text-3xl font-black tracking-tighter" style={{ color }}>{value}</p>
      <p className="text-[10px] font-bold uppercase" style={{ color: "var(--text-secondary)" }}>{sub}</p>
    </div>
  );
}