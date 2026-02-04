// // src/components/MessageBubble.jsx
// import React from "react";
// import dayjs from "dayjs";

// export default function MessageBubble({ msg, currentUserId }) {
//   const mine = msg.user && (msg.user._id === currentUserId || msg.user === currentUserId);
//   const time = msg.createdAt ? dayjs(msg.createdAt).format("HH:mm") : "";
//   const containerClass = mine ? "justify-end" : "justify-start";
//   const bubbleClass = mine ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900";

//   return (
//     <div className={`flex ${containerClass} mb-3`}>
//       <div className={`max-w-[78%] p-3 rounded-2xl shadow ${bubbleClass}`}>
//         <div className="flex items-baseline justify-between gap-2 mb-1">
//           <div className="text-xs font-semibold">{msg.user?.name || "User"}</div>
//           <div className="text-[11px] opacity-70">{time}</div>
//         </div>

//         {msg.type === "text" && <div className="whitespace-pre-wrap">{msg.message}</div>}

//         {msg.type === "file" && (msg.attachments || []).map((a, i) => {
//           const mime = (a.mime || "").toLowerCase();
//           if (mime.startsWith("image/")) {
//             return <a key={i} href={a.url} target="_blank" rel="noreferrer" className="block mb-2"><img src={a.url} alt={a.filename} className="max-h-48 w-auto rounded-md object-cover" /><div className="text-xs mt-1 underline">{a.filename}</div></a>;
//           }
//           if (mime.startsWith("audio/")) {
//             return <div key={i} className="mb-2"><div className="text-xs underline">{a.filename}</div><audio controls src={a.url} className="w-full mt-1" /></div>;
//           }
//           if (mime.startsWith("video/")) {
//             return <div key={i} className="mb-2"><div className="text-xs underline">{a.filename}</div><video controls src={a.url} className="w-full rounded-md mt-1" /></div>;
//           }
//           return <div key={i} className="mb-2"><a href={a.url} target="_blank" rel="noreferrer" className="underline text-sm">📎 {a.filename}</a></div>;
//         })}

//         {Array.isArray(msg.readBy) && mine && <div className="text-[11px] text-green-200 mt-2 text-right">Read by {msg.readBy.length}</div>}
//       </div>
//     </div>
//   );
// }


//dark mode
import React from "react";
import dayjs from "dayjs";
import { FiFile, FiImage, FiMusic, FiVideo, FiCheck } from "react-icons/fi";

export default function MessageBubble({ msg, currentUserId }) {
  const mine = msg.user && (msg.user._id === currentUserId || msg.user === currentUserId);
  const time = msg.createdAt ? dayjs(msg.createdAt).format("HH:mm") : "";
  
  const containerClass = mine ? "justify-end" : "justify-start";
  
  // Custom Dark Mode styles for bubbles
  const bubbleStyle = mine 
    ? { backgroundColor: "var(--accent)", color: "#ffffff" }
    : { backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" };

  return (
    <div className={`flex ${containerClass} mb-4 animate-fadeIn px-4`}>
      <div 
        className={`max-w-[80%] md:max-w-[70%] p-4 rounded-[1.5rem] shadow-xl transition-all ${
          mine ? "rounded-tr-none shadow-indigo-500/10" : "rounded-tl-none"
        }`}
        style={bubbleStyle}
      >
        {/* HEADER: NAME & TIME */}
        <div className="flex items-center justify-between gap-4 mb-1.5">
          <div className="text-[10px] font-black uppercase tracking-widest opacity-80">
            {mine ? "You" : (msg.user?.name || "Member")}
          </div>
          <div className="text-[10px] font-medium opacity-50">{time}</div>
        </div>

        {/* TEXT CONTENT */}
        {msg.type === "text" && (
          <div className="text-sm leading-relaxed font-medium whitespace-pre-wrap">
            {msg.message}
          </div>
        )}

        {/* ATTACHMENTS */}
        {msg.type === "file" && (msg.attachments || []).map((a, i) => {
          const mime = (a.mime || "").toLowerCase();
          
          // Image Rendering
          if (mime.startsWith("image/")) {
            return (
              <a key={i} href={a.url} target="_blank" rel="noreferrer" className="block mt-2 group">
                <div className="relative rounded-xl overflow-hidden border border-white/10">
                  <img src={a.url} alt={a.filename} className="max-h-64 w-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="flex items-center gap-2 mt-2 text-[10px] font-bold opacity-70">
                   <FiImage /> {a.filename}
                </div>
              </a>
            );
          }

          // Audio Rendering
          if (mime.startsWith("audio/")) {
            return (
              <div key={i} className="mt-3 p-3 rounded-xl bg-black/20 border border-white/5">
                <div className="flex items-center gap-2 text-[10px] font-bold mb-2">
                   <FiMusic /> {a.filename}
                </div>
                <audio controls src={a.url} className="w-full h-8 brightness-90 contrast-125" />
              </div>
            );
          }

          // Video Rendering
          if (mime.startsWith("video/")) {
            return (
              <div key={i} className="mt-3 rounded-xl overflow-hidden bg-black/40 border border-white/10">
                <video controls src={a.url} className="w-full max-h-64" />
                <div className="p-2 flex items-center gap-2 text-[10px] font-bold opacity-70">
                   <FiVideo /> {a.filename}
                </div>
              </div>
            );
          }

          // Default File Rendering
          return (
            <div key={i} className="mt-2">
              <a 
                href={a.url} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-3 p-3 rounded-xl bg-black/10 hover:bg-black/20 border border-white/5 transition-colors"
              >
                <div className="p-2 bg-white/10 rounded-lg"><FiFile /></div>
                <div className="flex-1 min-w-0">
                   <div className="text-xs font-bold truncate">{a.filename}</div>
                   <div className="text-[9px] opacity-50 uppercase tracking-tighter">Download File</div>
                </div>
              </a>
            </div>
          );
        })}

        {/* READ RECEIPTS */}
        {Array.isArray(msg.readBy) && mine && (
          <div className="mt-3 flex items-center justify-end gap-1 opacity-60">
             <div className="text-[9px] font-black uppercase tracking-tighter">
                Seen by {msg.readBy.length}
             </div>
             <FiCheck size={10} className="text-emerald-300" />
          </div>
        )}
      </div>
    </div>
  );
}