// // src/components/RoomsList.jsx
// import React from "react";

// export default function RoomsList({ rooms, active, onSelect }) {
//   return (
//     <div className="w-64 p-3 border-r h-full flex flex-col">
//       <div className="font-bold mb-3">Rooms</div>
//       <div className="space-y-2 flex-1 overflow-auto">
//         {rooms.map((r) => (
//           <button key={r.id} onClick={() => onSelect(r.id)} className={`w-full text-left p-2 rounded flex items-center justify-between ${active === r.id ? "bg-indigo-50" : "hover:bg-gray-50"}`}>
//             <div>
//               <div className="font-medium">{r.name}</div>
//               <div className="text-xs text-gray-500">{r.desc}</div>
//             </div>
//             <div className="text-xs text-gray-400">{r.unread ? r.unread : ""}</div>
//           </button>
//         ))}
//       </div>
//       <div className="mt-3">
//         <input placeholder="New room" className="w-full p-2 border rounded text-sm" onKeyDown={(e) => { if (e.key === "Enter") onSelect(e.target.value.trim()) }} />
//       </div>
//     </div>
//   );
// }


//dark mode
import React from "react";
import { FiHash, FiPlus, FiSearch } from "react-icons/fi";

export default function RoomsList({ rooms, active, onSelect }) {
  return (
    <div className="w-72 h-full flex flex-col border-r transition-colors duration-300"
         style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)" }}>
      
      {/* Search / Filter Header */}
      <div className="p-4">
        <div className="relative group">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors" />
          <input 
            placeholder="Search channels..." 
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs font-medium border outline-none transition-all"
            style={{ 
              backgroundColor: "var(--bg-card)", 
              borderColor: "var(--border-color)",
              color: "var(--text-primary)" 
            }}
          />
        </div>
      </div>

      <div className="px-4 mb-2 flex items-center justify-between">
        <div className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>
          Channels
        </div>
        <button className="p-1 hover:text-[var(--accent)] transition-colors">
          <FiPlus size={14} />
        </button>
      </div>

      {/* ROOMS SCROLL AREA */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1 custom-scrollbar">
        {rooms.map((r) => (
          <button
            key={r.id}
            onClick={() => onSelect(r.id)}
            className={`w-full text-left p-3 rounded-2xl flex items-center gap-3 transition-all group
              ${active === r.id ? "shadow-lg shadow-indigo-500/10" : "hover:bg-white/5"}
            `}
            style={{ 
              backgroundColor: active === r.id ? "rgba(129, 140, 248, 0.1)" : "transparent"
            }}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors border
              ${active === r.id ? "bg-[var(--accent)] border-transparent text-white" : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)]"}
            `}>
              <FiHash size={16} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm truncate" 
                     style={{ color: active === r.id ? "var(--text-primary)" : "var(--text-secondary)" }}>
                  {r.name}
                </div>
                {r.unread > 0 && (
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                        style={{ backgroundColor: "var(--accent)" }}>
                    {r.unread}
                  </span>
                )}
              </div>
              <div className="text-[10px] font-medium truncate opacity-50" 
                   style={{ color: "var(--text-secondary)" }}>
                {r.desc}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* QUICK ADD FOOTER */}
      <div className="p-4 mt-auto border-t" style={{ borderColor: "var(--border-color)" }}>
        <div className="flex items-center gap-2 p-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] focus-within:border-[var(--accent)] transition-all">
          <input 
            placeholder="Join #channel..." 
            className="flex-1 bg-transparent px-2 py-1.5 text-xs font-bold outline-none"
            style={{ color: "var(--text-primary)" }}
            onKeyDown={(e) => { 
              if (e.key === "Enter" && e.target.value.trim()) {
                onSelect(e.target.value.trim());
                e.target.value = "";
              }
            }} 
          />
          <button className="p-1.5 rounded-lg bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
            <FiPlus size={14} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
      `}</style>
    </div>
  );
}