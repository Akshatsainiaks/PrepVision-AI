// // src/components/OnlineUsers.jsx
// import React from "react";

// export default function OnlineUsers({ users = [], onDM }) {
//   return (
//     <div className="w-64 p-3 border-l h-full flex flex-col">
//       <div className="font-bold mb-3">Online</div>
//       <div className="space-y-2 overflow-auto flex-1">
//         {users.map((u) => (
//           <div key={u.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
//             <div>
//               <div className="font-medium">{u.name}</div>
//               <div className="text-xs text-gray-500">{u.email || ""}</div>
//             </div>
//             {onDM && <button onClick={() => onDM(u.id)} className="text-sm text-indigo-600">DM</button>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


//dark mode
import React from "react";
import { FiMessageSquare, FiUser } from "react-icons/fi";

export default function OnlineUsers({ users = [], onDM }) {
  return (
    <div className="w-72 h-full flex flex-col border-l transition-colors duration-300"
         style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)" }}>
      
      {/* HEADER */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-1">
          <div className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>
            Participants
          </div>
          <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            {users.length}
          </span>
        </div>
      </div>

      {/* USERS LIST */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-1 custom-scrollbar">
        {users.length === 0 ? (
          <div className="text-center py-10 opacity-30">
            <FiUser className="mx-auto mb-2" size={24} style={{ color: "var(--text-secondary)" }} />
            <p className="text-xs font-bold uppercase tracking-widest">No users online</p>
          </div>
        ) : (
          users.map((u) => (
            <div 
              key={u.id} 
              className="group flex items-center justify-between p-3 rounded-2xl transition-all hover:bg-white/5"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Avatar with Status Indicator */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black border transition-all"
                       style={{ 
                         backgroundColor: "var(--bg-card)", 
                         borderColor: "var(--border-color)",
                         color: "var(--text-secondary)" 
                       }}>
                    {u.avatar ? (
                      <img src={u.avatar} alt="" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      u.name?.charAt(0).toUpperCase()
                    )}
                  </div>
                  {/* Presence Glow Dot */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[var(--bg-primary)] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                </div>

                <div className="min-w-0">
                  <div className="font-bold text-sm truncate" style={{ color: "var(--text-primary)" }}>
                    {u.name}
                  </div>
                  <div className="text-[10px] font-medium truncate opacity-50 uppercase tracking-tighter" style={{ color: "var(--text-secondary)" }}>
                    {u.role || "Member"}
                  </div>
                </div>
              </div>

              {/* Action Button - Reveal on Hover */}
              {onDM && (
                <button 
                  onClick={() => onDM(u.id)} 
                  className="p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-[var(--accent)] hover:text-white"
                  style={{ color: "var(--accent)" }}
                  title="Direct Message"
                >
                  <FiMessageSquare size={16} />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* FOOTER - USER TIP */}
      <div className="p-6 border-t" style={{ borderColor: "var(--border-color)" }}>
        <div className="p-4 rounded-2xl text-[10px] font-bold leading-relaxed uppercase tracking-tight"
             style={{ backgroundColor: "rgba(99, 102, 241, 0.05)", color: "var(--text-secondary)" }}>
          Tip: Click the message icon next to a user to start a private DM.
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
      `}</style>
    </div>
  );
}