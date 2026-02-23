// // src/pages/ChatPage.jsx
// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import Navbar from "../components/Navbar";
// import RoomsList from "../components/RoomsList";
// import OnlineUsers from "../components/OnlineUsers";
// import MessageBubble from "../components/MessageBubble";
// import FileUploader from "../components/FileUploader";
// // import { API } from "../api/api";
// import API from "../api/api";
// import { FiSearch } from "react-icons/fi";

// const SOCKET_URL = "http://localhost:4000";

// export default function ChatPage() {
//   const [activeRoom, setActiveRoom] = useState("global");
//   const [rooms, setRooms] = useState([
//     { id: "global", name: "Global", desc: "General chat", unread: 0 },
//     { id: "dsa", name: "DSA", desc: "Algorithms discussion", unread: 0 },
//     { id: "frontend", name: "Frontend", desc: "React / UI", unread: 0 }
//   ]);

//   const [messages, setMessages] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [text, setText] = useState("");
//   const [typingUsers, setTypingUsers] = useState({});
//   const [search, setSearch] = useState("");

//   const socketRef = useRef(null);
//   const messagesRef = useRef(null);

//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");
//   const myName = localStorage.getItem("name") || "You";

//   // ------------------------------------------
//   // SOCKET CONNECT — RUNS ONCE
//   // ------------------------------------------
//   useEffect(() => {
//     const s = io(SOCKET_URL, { auth: { token } });
//     socketRef.current = s;

//     s.on("connect", () => {
//       s.emit("identify", { id: userId, name: myName });
//       s.emit("joinGroup", activeRoom);
//     });

//     s.on("presence:update", (list) => setOnlineUsers(list));

//     // typing indicator
//     s.on("userTyping", ({ user, isTyping }) => {
//       setTypingUsers((prev) => {
//         const copy = { ...prev };
//         if (isTyping) copy[user.id] = user;
//         else delete copy[user.id];
//         return copy;
//       });
//     });

//     // ------------------------------
//     // FIXED → Prevent duplicate messages
//     // ------------------------------
//     s.on("newMessage", (msg) => {
//       // 🛑 Ignore message if already in UI
//       if (messagesRef.current && document.getElementById(msg._id)) return;

//       // 🛑 Ignore own message if optimistic UI already added it
//       if (msg.user?._id === userId) return;

//       setMessages((prev) => [...prev, msg]);
//       scrollToBottom();
//     });

//     // read receipts
//     s.on("messagesRead", ({ messageIds, userId: reader }) => {
//       setMessages((prev) =>
//         prev.map((m) =>
//           messageIds.includes(m._id)
//             ? { ...m, readBy: [...new Set([...(m.readBy || []), reader])] }
//             : m
//         )
//       );
//     });

//     return () => s.disconnect();
//   }, []); // run once only

//   // ------------------------------------------
//   // LOAD MESSAGES WHEN ROOM CHANGES
//   // ------------------------------------------
//   useEffect(() => {
//     if (!activeRoom) return;

//     const load = async () => {
//       try {
//         const res = await API.get(`/chat/${activeRoom}`);

//         const normalized = (res.data || []).map((m) => ({
//           ...m,
//           attachments: m.attachments || [],
//           readBy: m.readBy || []
//         }));

//         setMessages(normalized);

//         // clear unread on switch
//         setRooms((rs) =>
//           rs.map((r) =>
//             r.id === activeRoom ? { ...r, unread: 0 } : r
//           )
//         );

//         // mark as read
//         const unreadIds = normalized
//           .filter((m) => !m.readBy.includes(userId))
//           .map((m) => m._id);

//         if (socketRef.current && unreadIds.length > 0) {
//           socketRef.current.emit("readMessages", {
//             groupId: activeRoom,
//             messageIds: unreadIds,
//             userId
//           });
//         }
//       } catch (err) {
//         console.error("load chat error", err);
//       } finally {
//         scrollToBottom();
//       }
//     };

//     load();

//     socketRef.current?.emit("leaveGroup", activeRoom); // safety
//     socketRef.current?.emit("joinGroup", activeRoom);
//   }, [activeRoom, userId]);

//   // ------------------------------------------
//   // SCROLL END
//   // ------------------------------------------
//   const scrollToBottom = () => {
//     setTimeout(() => {
//       messagesRef.current?.scrollTo({
//         top: messagesRef.current.scrollHeight,
//         behavior: "smooth"
//       });
//     }, 50);
//   };

//   // ------------------------------------------
//   // SEND TEXT MESSAGE
//   // ------------------------------------------
//   const onSend = async () => {
//     if (!text.trim()) return;

//     const payload = {
//       groupId: activeRoom,
//       message: text,
//       userId,
//       type: "text",
//       attachments: []
//     };

//     // optimistic UI
//     const temp = {
//       ...payload,
//       _id: `tmp-${Date.now()}`,
//       user: { _id: userId, name: myName },
//       createdAt: new Date().toISOString(),
//       readBy: [userId]
//     };

//     setMessages((p) => [...p, temp]);
//     scrollToBottom();

//     socketRef.current.emit("groupMessage", payload);

//     try {
//       await API.post("/chat", payload);
//     } catch (e) {
//       console.error("persist error", e);
//     }

//     setText("");
//   };

//   // ------------------------------------------
//   // FILE UPLOAD
//   // ------------------------------------------
//   const onUpload = async (fileMeta) => {
//     const attachment = {
//       filename: fileMeta.filename,
//       url: fileMeta.url,
//       mime: fileMeta.mime,
//       size: fileMeta.size
//     };

//     const payload = {
//       groupId: activeRoom,
//       message: "",
//       type: "file",
//       attachments: [attachment],
//       userId
//     };

//     const temp = {
//       ...payload,
//       _id: `tmp-${Date.now()}`,
//       createdAt: new Date().toISOString(),
//       user: { _id: userId, name: myName }
//     };

//     setMessages((p) => [...p, temp]);
//     scrollToBottom();

//     socketRef.current.emit("groupMessage", payload);

//     try {
//       await API.post("/chat", payload);
//     } catch (e) {
//       console.error("persist file error", e);
//     }
//   };

//   // typing
//   const onTyping = (v) => {
//     setText(v);
//     socketRef.current?.emit("typing", {
//       groupId: activeRoom,
//       isTyping: !!v.trim(),
//       user: { id: userId, name: myName }
//     });
//   };

//   const shown = messages.filter((m) =>
//     search
//       ? (m.message || "").toLowerCase().includes(search.toLowerCase())
//       : true
//   );

//   const onStartDM = (otherId) => {
//     const a = userId < otherId ? userId : otherId;
//     const b = userId < otherId ? otherId : userId;
//     const dmId = `dm_${a}_${b}`;

//     setRooms((r) =>
//       r.some((x) => x.id === dmId)
//         ? r
//         : [{ id: dmId, name: "Direct", desc: "Private DM" }, ...r]
//     );
//     setActiveRoom(dmId);
//   };

//   return (
//     <>
//     <Navbar />

//     <div className="flex h-[85vh] bg-gray-950 text-white overflow-hidden">

//       {/* LEFT SIDEBAR — ROOMS */}
//       <div className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 
//         shadow-[0_0_20px_rgba(120,64,255,0.2)] p-4 flex flex-col">

//         <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 
//         text-transparent bg-clip-text">
//           Chat Rooms
//         </h3>

//         {rooms.map((room) => (
//           <div
//             key={room.id}
//             onClick={() => setActiveRoom(room.id)}
//             className={`p-3 mb-2 rounded-lg cursor-pointer transition 
//             ${activeRoom === room.id
//               ? "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
//               : "bg-white/5 hover:bg-white/10"
//             }`}
//           >
//             <div className="font-semibold">{room.name}</div>
//             <div className="text-xs text-gray-300">{room.desc}</div>
//           </div>
//         ))}
//       </div>

//       {/* MIDDLE CHAT */}
//       <div className="flex-1 flex flex-col">

//         {/* HEADER */}
//         <div className="p-4 bg-white/10 backdrop-blur-xl border-b border-white/20 
//           flex justify-between items-center shadow-lg">

//           <div>
//             <div className="text-lg font-bold">
//               {rooms.find((r) => r.id === activeRoom)?.name}
//             </div>
//             <div className="text-xs text-gray-300">
//               {rooms.find((r) => r.id === activeRoom)?.desc}
//             </div>
//           </div>

//           <div className="relative">
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search"
//               className="pl-8 pr-3 py-2 rounded-lg bg-gray-900/40 border border-gray-700 
//               placeholder-gray-400 text-white focus:ring-2 focus:ring-purple-500 outline-none"
//             />
//             <FiSearch className="absolute left-2 top-2.5 text-gray-400" />
//           </div>
//         </div>

//         {/* MESSAGES */}
//         <div
//           ref={messagesRef}
//           className="flex-1 overflow-y-auto p-6 bg-gray-900/40 shadow-inner"
//         >
//           <div className="max-w-3xl mx-auto space-y-3">

//             {shown.map((m) => (
//               <div id={m._id} key={m._id}>
//                 <MessageBubble msg={m} currentUserId={userId} />
//               </div>
//             ))}

//             {/* Typing Indicator */}
//             {Object.keys(typingUsers).length > 0 && (
//               <div className="text-gray-400 text-sm italic animate-pulse">
//                 {Object.values(typingUsers).map((u) => u.name).join(", ")} typing…
//               </div>
//             )}
//           </div>
//         </div>

//         {/* INPUT BAR */}
//         <div className="p-4 bg-white/10 backdrop-blur-xl border-t border-white/20 flex items-center gap-3">

//           <FileUploader onUploaded={onUpload} />

//           <input
//             value={text}
//             onChange={(e) => onTyping(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && onSend()}
//             className="flex-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
//             placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
//             placeholder="Type a message..."
//           />

//           <button
//             onClick={onSend}
//             className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 
//             shadow-lg hover:shadow-purple-500/30 font-semibold"
//           >
//             Send
//           </button>

//         </div>
//       </div>

//       {/* ONLINE USERS — RIGHT SIDEBAR */}
//       <div className="w-64 bg-white/10 backdrop-blur-xl border-l border-white/20 
//         shadow-[0_0_20px_rgba(120,64,255,0.2)] p-4">

//         <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 
//         text-transparent bg-clip-text">
//           Online
//         </h3>

//         <OnlineUsers users={onlineUsers} onDM={onStartDM} />
//       </div>
//     </div>
//   </>
//   );
// }


// // src/pages/ChatPage.jsx
// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import Navbar from "../components/Navbar";
// import RoomsList from "../components/RoomsList";
// import OnlineUsers from "../components/OnlineUsers";
// import MessageBubble from "../components/MessageBubble";
// import FileUploader from "../components/FileUploader";
// import API from "../api/api";
// import { FiSearch, FiSend, FiHash, FiUsers, FiInfo } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";

// const SOCKET_URL = "http://localhost:4000";

// export default function ChatPage() {
//   const [activeRoom, setActiveRoom] = useState("global");
//   const [rooms, setRooms] = useState([
//     { id: "global", name: "Global", desc: "General chat", unread: 0 },
//     { id: "dsa", name: "DSA", desc: "Algorithms discussion", unread: 0 },
//     { id: "frontend", name: "Frontend", desc: "React / UI", unread: 0 }
//   ]);

//   const [messages, setMessages] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [text, setText] = useState("");
//   const [typingUsers, setTypingUsers] = useState({});
//   const [search, setSearch] = useState("");

//   const socketRef = useRef(null);
//   const messagesRef = useRef(null);

//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");
//   const myName = localStorage.getItem("name") || "You";

//   // --- SOCKET LOGIC ---
//   useEffect(() => {
//     const s = io(SOCKET_URL, { auth: { token } });
//     socketRef.current = s;
//     s.on("connect", () => {
//       s.emit("identify", { id: userId, name: myName });
//       s.emit("joinGroup", activeRoom);
//     });
//     s.on("presence:update", (list) => setOnlineUsers(list));
//     s.on("userTyping", ({ user, isTyping }) => {
//       setTypingUsers((prev) => {
//         const copy = { ...prev };
//         if (isTyping) copy[user.id] = user;
//         else delete copy[user.id];
//         return copy;
//       });
//     });
//     s.on("newMessage", (msg) => {
//       if (messagesRef.current && document.getElementById(msg._id)) return;
//       if (msg.user?._id === userId) return;
//       setMessages((prev) => [...prev, msg]);
//       scrollToBottom();
//     });
//     s.on("messagesRead", ({ messageIds, userId: reader }) => {
//       setMessages((prev) =>
//         prev.map((m) =>
//           messageIds.includes(m._id)
//             ? { ...m, readBy: [...new Set([...(m.readBy || []), reader])] }
//             : m
//         )
//       );
//     });
//     return () => s.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!activeRoom) return;
//     const load = async () => {
//       try {
//         const res = await API.get(`/chat/${activeRoom}`);
//         const normalized = (res.data || []).map((m) => ({
//           ...m,
//           attachments: m.attachments || [],
//           readBy: m.readBy || []
//         }));
//         setMessages(normalized);
//         setRooms((rs) => rs.map((r) => r.id === activeRoom ? { ...r, unread: 0 } : r));
//         const unreadIds = normalized.filter((m) => !m.readBy.includes(userId)).map((m) => m._id);
//         if (socketRef.current && unreadIds.length > 0) {
//           socketRef.current.emit("readMessages", { groupId: activeRoom, messageIds: unreadIds, userId });
//         }
//       } catch (err) { console.error(err); } 
//       finally { scrollToBottom(); }
//     };
//     load();
//     socketRef.current?.emit("leaveGroup", activeRoom);
//     socketRef.current?.emit("joinGroup", activeRoom);
//   }, [activeRoom, userId]);

//   const scrollToBottom = () => {
//     setTimeout(() => {
//       messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
//     }, 50);
//   };

//   const onSend = async () => {
//     if (!text.trim()) return;
//     const payload = { groupId: activeRoom, message: text, userId, type: "text", attachments: [] };
//     const temp = { ...payload, _id: `tmp-${Date.now()}`, user: { _id: userId, name: myName }, createdAt: new Date().toISOString(), readBy: [userId] };
//     setMessages((p) => [...p, temp]);
//     scrollToBottom();
//     socketRef.current.emit("groupMessage", payload);
//     try { await API.post("/chat", payload); } catch (e) { console.error(e); }
//     setText("");
//   };

//   const onUpload = async (fileMeta) => {
//     const attachment = { filename: fileMeta.filename, url: fileMeta.url, mime: fileMeta.mime, size: fileMeta.size };
//     const payload = { groupId: activeRoom, message: "", type: "file", attachments: [attachment], userId };
//     const temp = { ...payload, _id: `tmp-${Date.now()}`, createdAt: new Date().toISOString(), user: { _id: userId, name: myName } };
//     setMessages((p) => [...p, temp]);
//     scrollToBottom();
//     socketRef.current.emit("groupMessage", payload);
//     try { await API.post("/chat", payload); } catch (e) { console.error(e); }
//   };

//   const onTyping = (v) => {
//     setText(v);
//     socketRef.current?.emit("typing", { groupId: activeRoom, isTyping: !!v.trim(), user: { id: userId, name: myName } });
//   };

//   const onStartDM = (otherId) => {
//     const a = userId < otherId ? userId : otherId;
//     const b = userId < otherId ? otherId : userId;
//     const dmId = `dm_${a}_${b}`;
//     setRooms((r) => r.some((x) => x.id === dmId) ? r : [{ id: dmId, name: "Direct", desc: "Private DM" }, ...r]);
//     setActiveRoom(dmId);
//   };

//   const shown = messages.filter((m) =>
//     search ? (m.message || "").toLowerCase().includes(search.toLowerCase()) : true
//   );

//   return (
//     <div className="h-screen bg-[#030712] text-white flex flex-col font-sans selection:bg-purple-500/30">
//       <Navbar />

//       <div className="flex-1 flex overflow-hidden p-4 gap-4 max-w-[1600px] mx-auto w-full">
        
//         {/* ROOMS SIDEBAR */}
//         <motion.aside 
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="w-72 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] flex flex-col overflow-hidden"
//         >
//           <div className="p-6">
//             <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6 px-2">Channels</h3>
//             <div className="space-y-2">
//               {rooms.map((room) => (
//                 <div
//                   key={room.id}
//                   onClick={() => setActiveRoom(room.id)}
//                   className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-3
//                   ${activeRoom === room.id
//                     ? "bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-white"
//                     : "bg-transparent border border-transparent text-gray-400 hover:bg-white/5"
//                   }`}
//                 >
//                   <div className={`p-2 rounded-lg ${activeRoom === room.id ? "bg-purple-500 text-white shadow-[0_0_15px_#a855f7]" : "bg-white/5"}`}>
//                     <FiHash />
//                   </div>
//                   <div>
//                     <div className="font-bold text-sm tracking-tight">{room.name}</div>
//                     <div className="text-[10px] opacity-60 font-medium">{room.desc}</div>
//                   </div>
//                   {activeRoom === room.id && (
//                     <motion.div layoutId="activeRoom" className="absolute left-0 w-1 h-6 bg-purple-500 rounded-r-full" />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </motion.aside>

//         {/* MAIN CHAT AREA */}
//         <motion.main 
//           initial={{ opacity: 0, scale: 0.98 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="flex-1 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl relative"
//         >
//           {/* Background Mesh */}
//           <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
//             <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/40 blur-[120px] rounded-full" />
//           </div>

//           {/* CHAT HEADER */}
//           <header className="px-8 py-6 bg-white/5 border-b border-white/10 flex justify-between items-center backdrop-blur-md z-10">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-black text-xl shadow-lg shadow-purple-500/20">
//                 {rooms.find((r) => r.id === activeRoom)?.name[0]}
//               </div>
//               <div>
//                 <h2 className="text-xl font-black tracking-tight leading-none mb-1">
//                   {rooms.find((r) => r.id === activeRoom)?.name}
//                 </h2>
//                 <span className="flex items-center gap-1.5 text-[10px] text-green-400 font-bold uppercase tracking-wider">
//                   <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
//                   {onlineUsers.length} Online Now
//                 </span>
//               </div>
//             </div>

//             <div className="relative group hidden md:block">
//               <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Find in messages..."
//                 className="pl-12 pr-6 py-2.5 rounded-full bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-sm w-64 transition-all"
//               />
//             </div>
//           </header>

//           {/* MESSAGES THREAD */}
//           <div
//             ref={messagesRef}
//             className="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar z-10"
//           >
//             <div className="max-w-4xl mx-auto">
//               <AnimatePresence mode="popLayout">
//                 {shown.map((m) => (
//                   <motion.div 
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     id={m._id} 
//                     key={m._id}
//                     className="mb-4"
//                   >
//                     <MessageBubble msg={m} currentUserId={userId} />
//                   </motion.div>
//                 ))}
//               </AnimatePresence>

//               {/* Typing Indicator Animated */}
//               <AnimatePresence>
//                 {Object.keys(typingUsers).length > 0 && (
//                   <motion.div 
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0 }}
//                     className="flex items-center gap-2 text-purple-400 text-xs font-bold py-2 italic"
//                   >
//                     <div className="flex gap-1">
//                       <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms'}} />
//                       <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms'}} />
//                       <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms'}} />
//                     </div>
//                     {Object.values(typingUsers).map((u) => u.name).join(", ")} is typing...
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* CHAT INPUT BAR - FIXED TAGS HERE */}
//           <footer className="p-6 bg-white/5 border-t border-white/10 backdrop-blur-xl z-10">
//             <div className="max-w-4xl mx-auto flex items-end gap-4">
//               <div className="p-1 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
//                 <FileUploader onUploaded={onUpload} />
//               </div>
              
//               <div className="flex-1 relative group">
//                 <textarea
//                   rows="1"
//                   value={text}
//                   onChange={(e) => onTyping(e.target.value)}
//                   onKeyDown={(e) => {
//                     if(e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault();
//                       onSend();
//                     }
//                   }}
//                   className="w-full p-4 pr-14 rounded-[1.5rem] bg-white/5 border border-white/10 placeholder-gray-500 focus:border-purple-500/40 outline-none transition-all resize-none overflow-hidden text-sm"
//                   placeholder={`Message #${rooms.find((r) => r.id === activeRoom)?.name.toLowerCase()}...`}
//                 />
//                 <button
//                   onClick={onSend}
//                   disabled={!text.trim()}
//                   className={`absolute right-3 bottom-3 p-2.5 rounded-xl transition-all
//                   ${text.trim() ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20 scale-100" : "bg-white/5 text-gray-600 scale-90 pointer-events-none"}`}
//                 >
//                   <FiSend size={18} />
//                 </button>
//               </div>
//             </div>
//           </footer>
//         </motion.main>

//         {/* ONLINE USERS SIDEBAR */}
//         <motion.aside 
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="w-72 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] flex flex-col overflow-hidden hidden xl:flex"
//         >
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-6 px-2">
//               <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Participants</h3>
//               <FiUsers className="text-gray-500" />
//             </div>
//             <div className="space-y-1">
//               <OnlineUsers users={onlineUsers} onDM={onStartDM} />
//             </div>
//           </div>
          
//           <div className="mt-auto p-6">
//             <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-white/5">
//               <FiInfo className="text-purple-400 mb-2" />
//               <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-tighter">
//                 Keep discussions professional and respectful in all rooms.
//               </p>
//             </div>
//           </div>
//         </motion.aside>

//       </div>

//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 4px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//       `}</style>
//     </div>
//   );
// }

//new final

// // src/pages/ChatPage.jsx
// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import Navbar from "../components/Navbar";
// import RoomsList from "../components/RoomsList";
// import OnlineUsers from "../components/OnlineUsers";
// import MessageBubble from "../components/MessageBubble";
// import FileUploader from "../components/FileUploader";
// import API from "../api/api";
// import { FiSearch, FiSend, FiHash, FiUsers, FiInfo, FiPlus } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";

// const SOCKET_URL = "http://localhost:4000";

// export default function ChatPage() {
//   const [activeRoom, setActiveRoom] = useState("global");
//   const [rooms, setRooms] = useState([
//     { id: "global", name: "Global", desc: "General chat", unread: 0 },
//     { id: "dsa", name: "DSA", desc: "Algorithms discussion", unread: 0 },
//     { id: "frontend", name: "Frontend", desc: "React / UI", unread: 0 }
//   ]);

//   const [messages, setMessages] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [text, setText] = useState("");
//   const [typingUsers, setTypingUsers] = useState({});
//   const [search, setSearch] = useState("");

//   const socketRef = useRef(null);
//   const messagesRef = useRef(null);

//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");
//   const myName = localStorage.getItem("name") || "You";

//   // --- SOCKET LOGIC (No changes to logic) ---
//   useEffect(() => {
//     const s = io(SOCKET_URL, { auth: { token } });
//     socketRef.current = s;
//     s.on("connect", () => {
//       s.emit("identify", { id: userId, name: myName });
//       s.emit("joinGroup", activeRoom);
//     });
//     s.on("presence:update", (list) => setOnlineUsers(list));
//     s.on("userTyping", ({ user, isTyping }) => {
//       setTypingUsers((prev) => {
//         const copy = { ...prev };
//         if (isTyping) copy[user.id] = user;
//         else delete copy[user.id];
//         return copy;
//       });
//     });
//     s.on("newMessage", (msg) => {
//       if (messagesRef.current && document.getElementById(msg._id)) return;
//       if (msg.user?._id === userId) return;
//       setMessages((prev) => [...prev, msg]);
//       scrollToBottom();
//     });
//     s.on("messagesRead", ({ messageIds, userId: reader }) => {
//       setMessages((prev) =>
//         prev.map((m) =>
//           messageIds.includes(m._id)
//             ? { ...m, readBy: [...new Set([...(m.readBy || []), reader])] }
//             : m
//         )
//       );
//     });
//     return () => s.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!activeRoom) return;
//     const load = async () => {
//       try {
//         const res = await API.get(`/chat/${activeRoom}`);
//         const normalized = (res.data || []).map((m) => ({
//           ...m,
//           attachments: m.attachments || [],
//           readBy: m.readBy || []
//         }));
//         setMessages(normalized);
//         setRooms((rs) => rs.map((r) => r.id === activeRoom ? { ...r, unread: 0 } : r));
//         const unreadIds = normalized.filter((m) => !m.readBy.includes(userId)).map((m) => m._id);
//         if (socketRef.current && unreadIds.length > 0) {
//           socketRef.current.emit("readMessages", { groupId: activeRoom, messageIds: unreadIds, userId });
//         }
//       } catch (err) { console.error(err); } 
//       finally { scrollToBottom(); }
//     };
//     load();
//     socketRef.current?.emit("leaveGroup", activeRoom);
//     socketRef.current?.emit("joinGroup", activeRoom);
//   }, [activeRoom, userId]);

//   const scrollToBottom = () => {
//     setTimeout(() => {
//       messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
//     }, 50);
//   };

//   const onSend = async () => {
//     if (!text.trim()) return;
//     const payload = { groupId: activeRoom, message: text, userId, type: "text", attachments: [] };
//     const temp = { ...payload, _id: `tmp-${Date.now()}`, user: { _id: userId, name: myName }, createdAt: new Date().toISOString(), readBy: [userId] };
//     setMessages((p) => [...p, temp]);
//     scrollToBottom();
//     socketRef.current.emit("groupMessage", payload);
//     try { await API.post("/chat", payload); } catch (e) { console.error(e); }
//     setText("");
//   };

//   const onUpload = async (fileMeta) => {
//     const attachment = { filename: fileMeta.filename, url: fileMeta.url, mime: fileMeta.mime, size: fileMeta.size };
//     const payload = { groupId: activeRoom, message: "", type: "file", attachments: [attachment], userId };
//     const temp = { ...payload, _id: `tmp-${Date.now()}`, createdAt: new Date().toISOString(), user: { _id: userId, name: myName } };
//     setMessages((p) => [...p, temp]);
//     scrollToBottom();
//     socketRef.current.emit("groupMessage", payload);
//     try { await API.post("/chat", payload); } catch (e) { console.error(e); }
//   };

//   const onTyping = (v) => {
//     setText(v);
//     socketRef.current?.emit("typing", { groupId: activeRoom, isTyping: !!v.trim(), user: { id: userId, name: myName } });
//   };

//   const onStartDM = (otherId) => {
//     const a = userId < otherId ? userId : otherId;
//     const b = userId < otherId ? otherId : userId;
//     const dmId = `dm_${a}_${b}`;
//     setRooms((r) => r.some((x) => x.id === dmId) ? r : [{ id: dmId, name: "Direct", desc: "Private DM" }, ...r]);
//     setActiveRoom(dmId);
//   };

//   const shown = messages.filter((m) =>
//     search ? (m.message || "").toLowerCase().includes(search.toLowerCase()) : true
//   );

//   return (
//     <div className="h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-100">
//       <Navbar />

//       <div className="flex-1 flex overflow-hidden p-6 gap-6 max-w-[1800px] mx-auto w-full">
        
//         {/* ROOMS SIDEBAR - Crystal Light Style */}
//         <motion.aside 
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="w-80 bg-white border border-slate-200 rounded-[2.5rem] flex flex-col shadow-xl shadow-slate-200/50 overflow-hidden"
//         >
//           <div className="p-8">
//             <div className="flex items-center justify-between mb-8 px-2">
//                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Channels</h3>
//                 <button className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-indigo-600 transition-colors">
//                     <FiPlus />
//                 </button>
//             </div>
//             <div className="space-y-3">
//               {rooms.map((room) => (
//                 <div
//                   key={room.id}
//                   onClick={() => setActiveRoom(room.id)}
//                   className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-4
//                   ${activeRoom === room.id
//                     ? "bg-indigo-50 text-indigo-700 shadow-sm"
//                     : "bg-transparent text-slate-500 hover:bg-slate-50"
//                   }`}
//                 >
//                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeRoom === room.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-slate-100 text-slate-400"}`}>
//                     <FiHash size={18} />
//                   </div>
//                   <div className="flex-1">
//                     <div className={`font-bold text-sm tracking-tight ${activeRoom === room.id ? "text-indigo-900" : "text-slate-700"}`}>{room.name}</div>
//                     <div className="text-[10px] font-bold uppercase tracking-tight opacity-60">{room.desc}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </motion.aside>

//         {/* MAIN CHAT AREA - Crisp White Style */}
//         <motion.main 
//           initial={{ opacity: 0, scale: 0.98 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="flex-1 bg-white border border-slate-200 rounded-[3rem] flex flex-col overflow-hidden shadow-2xl shadow-indigo-100/30 relative"
//         >
//           {/* Subtle Decorative Gradient */}
//           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 blur-[100px] -z-10 rounded-full" />

//           {/* CHAT HEADER */}
//           <header className="px-10 py-6 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md z-10">
//             <div className="flex items-center gap-5">
//               <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center font-black text-2xl text-white shadow-xl shadow-indigo-200 transition-transform hover:scale-105 cursor-default">
//                 {rooms.find((r) => r.id === activeRoom)?.name[0]}
//               </div>
//               <div>
//                 <h2 className="text-2xl font-black tracking-tight text-slate-900 mb-1">
//                   {rooms.find((r) => r.id === activeRoom)?.name}
//                 </h2>
//                 <div className="flex items-center gap-2">
//                     <span className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-black uppercase tracking-widest">
//                         <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//                         {onlineUsers.length} active
//                     </span>
//                 </div>
//               </div>
//             </div>

//             <div className="relative group hidden lg:block">
//               <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search history..."
//                 className="pl-14 pr-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-indigo-400/50 outline-none text-sm w-72 transition-all shadow-inner"
//               />
//             </div>
//           </header>

//           {/* MESSAGES THREAD */}
//           <div
//             ref={messagesRef}
//             className="flex-1 overflow-y-auto p-10 space-y-6 custom-scrollbar z-10 bg-slate-50/30"
//           >
//             <div className="max-w-5xl mx-auto">
//               <AnimatePresence mode="popLayout">
//                 {shown.map((m) => (
//                   <motion.div 
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     id={m._id} 
//                     key={m._id}
//                     className="mb-6"
//                   >
//                     <MessageBubble msg={m} currentUserId={userId} />
//                   </motion.div>
//                 ))}
//               </AnimatePresence>

//               {/* Typing Indicator */}
//               <AnimatePresence>
//                 {Object.keys(typingUsers).length > 0 && (
//                   <motion.div 
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0 }}
//                     className="flex items-center gap-3 text-indigo-500 text-xs font-black py-4 italic"
//                   >
//                     <div className="flex gap-1.5 px-3 py-2 bg-indigo-50 rounded-full border border-indigo-100">
//                       <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms'}} />
//                       <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms'}} />
//                       <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms'}} />
//                     </div>
//                     <span>{Object.values(typingUsers).map((u) => u.name).join(", ")} is typing</span>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* CHAT INPUT BAR */}
//           <footer className="p-8 bg-white border-t border-slate-100 z-10">
//             <div className="max-w-5xl mx-auto flex items-end gap-5">
//               <div className="p-1 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 transition-all shadow-sm">
//                 <FileUploader onUploaded={onUpload} />
//               </div>
              
//               <div className="flex-1 relative group">
//                 <textarea
//                   rows="1"
//                   value={text}
//                   onChange={(e) => onTyping(e.target.value)}
//                   onKeyDown={(e) => {
//                     if(e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault();
//                       onSend();
//                     }
//                   }}
//                   className="w-full p-5 pr-16 rounded-[2rem] bg-slate-50 border border-slate-200 placeholder-slate-400 focus:bg-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all resize-none overflow-hidden text-sm font-medium shadow-inner"
//                   placeholder={`Send message to #${rooms.find((r) => r.id === activeRoom)?.name.toLowerCase()}...`}
//                 />
//                 <button
//                   onClick={onSend}
//                   disabled={!text.trim()}
//                   className={`absolute right-3.5 bottom-3.5 p-3 rounded-2xl transition-all shadow-lg active:scale-95
//                   ${text.trim() 
//                     ? "bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700" 
//                     : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"}`}
//                 >
//                   <FiSend size={20} />
//                 </button>
//               </div>
//             </div>
//           </footer>
//         </motion.main>

//         {/* ONLINE USERS SIDEBAR */}
//         <motion.aside 
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="w-80 bg-white border border-slate-200 rounded-[2.5rem] flex flex-col shadow-xl shadow-slate-200/50 overflow-hidden hidden xl:flex"
//         >
//           <div className="p-8">
//             <div className="flex items-center justify-between mb-8 px-2">
//               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Participants</h3>
//               <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
//                 <FiUsers size={16} />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <OnlineUsers users={onlineUsers} onDM={onStartDM} />
//             </div>
//           </div>
          
//           <div className="mt-auto p-8">
//             <div className="p-6 rounded-[2rem] bg-indigo-50 border border-indigo-100 shadow-sm">
//               <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 mb-4 shadow-sm">
//                   <FiInfo size={20} />
//               </div>
//               <p className="text-xs font-bold text-indigo-900 leading-relaxed uppercase tracking-tight">
//                 Guidelines: Keep discussions professional and supportive.
//               </p>
//             </div>
//           </div>
//         </motion.aside>

//       </div>

//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 6px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//       `}</style>
//     </div>
//   );
// }

//dark mode
// src/pages/ChatPage.jsx
// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import Navbar from "../components/Navbar";
// import RoomsList from "../components/RoomsList";
// import OnlineUsers from "../components/OnlineUsers";
// import MessageBubble from "../components/MessageBubble";
// import FileUploader from "../components/FileUploader";
// import API from "../api/api";
// import { FiSearch, FiSend, FiHash, FiUsers, FiInfo, FiPlus } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";

// const SOCKET_URL = "http://localhost:4000";

// export default function ChatPage() {
//   const [activeRoom, setActiveRoom] = useState("global");
//   const [rooms, setRooms] = useState([
//     { id: "global", name: "Global", desc: "General chat", unread: 0 },
//     { id: "dsa", name: "DSA", desc: "Algorithms discussion", unread: 0 },
//     { id: "frontend", name: "Frontend", desc: "React / UI", unread: 0 }
//   ]);

//   const [messages, setMessages] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [text, setText] = useState("");
//   const [typingUsers, setTypingUsers] = useState({});
//   const [search, setSearch] = useState("");

//   const socketRef = useRef(null);
//   const messagesRef = useRef(null);

//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");
//   const myName = localStorage.getItem("name") || "You";

//   useEffect(() => {
//     const s = io(SOCKET_URL, { auth: { token } });
//     socketRef.current = s;
//     s.on("connect", () => {
//       s.emit("identify", { id: userId, name: myName });
//       s.emit("joinGroup", activeRoom);
//     });
//     s.on("presence:update", (list) => setOnlineUsers(list));
//     s.on("userTyping", ({ user, isTyping }) => {
//       setTypingUsers((prev) => {
//         const copy = { ...prev };
//         if (isTyping) copy[user.id] = user;
//         else delete copy[user.id];
//         return copy;
//       });
//     });
//     s.on("newMessage", (msg) => {
//       if (messagesRef.current && document.getElementById(msg._id)) return;
//       if (msg.user?._id === userId) return;
//       setMessages((prev) => [...prev, msg]);
//       scrollToBottom();
//     });
//     s.on("messagesRead", ({ messageIds, userId: reader }) => {
//       setMessages((prev) =>
//         prev.map((m) =>
//           messageIds.includes(m._id)
//             ? { ...m, readBy: [...new Set([...(m.readBy || []), reader])] }
//             : m
//         )
//       );
//     });
//     return () => s.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!activeRoom) return;
//     const load = async () => {
//       try {
//         const res = await API.get(`/chat/${activeRoom}`);
//         const normalized = (res.data || []).map((m) => ({
//           ...m,
//           attachments: m.attachments || [],
//           readBy: m.readBy || []
//         }));
//         setMessages(normalized);
//         setRooms((rs) => rs.map((r) => r.id === activeRoom ? { ...r, unread: 0 } : r));
//         const unreadIds = normalized.filter((m) => !m.readBy.includes(userId)).map((m) => m._id);
//         if (socketRef.current && unreadIds.length > 0) {
//           socketRef.current.emit("readMessages", { groupId: activeRoom, messageIds: unreadIds, userId });
//         }
//       } catch (err) { console.error(err); } 
//       finally { scrollToBottom(); }
//     };
//     load();
//     socketRef.current?.emit("leaveGroup", activeRoom);
//     socketRef.current?.emit("joinGroup", activeRoom);
//   }, [activeRoom, userId]);

//   const scrollToBottom = () => {
//     setTimeout(() => {
//       messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
//     }, 50);
//   };

//   const onSend = async () => {
//     if (!text.trim()) return;
//     const payload = { groupId: activeRoom, message: text, userId, type: "text", attachments: [] };
//     const temp = { ...payload, _id: `tmp-${Date.now()}`, user: { _id: userId, name: myName }, createdAt: new Date().toISOString(), readBy: [userId] };
//     setMessages((p) => [...p, temp]);
//     scrollToBottom();
//     socketRef.current.emit("groupMessage", payload);
//     try { await API.post("/chat", payload); } catch (e) { console.error(e); }
//     setText("");
//   };

//   const onUpload = async (fileMeta) => {
//     const attachment = { filename: fileMeta.filename, url: fileMeta.url, mime: fileMeta.mime, size: fileMeta.size };
//     const payload = { groupId: activeRoom, message: "", type: "file", attachments: [attachment], userId };
//     const temp = { ...payload, _id: `tmp-${Date.now()}`, createdAt: new Date().toISOString(), user: { _id: userId, name: myName } };
//     setMessages((p) => [...p, temp]);
//     scrollToBottom();
//     socketRef.current.emit("groupMessage", payload);
//     try { await API.post("/chat", payload); } catch (e) { console.error(e); }
//   };

//   const onTyping = (v) => {
//     setText(v);
//     socketRef.current?.emit("typing", { groupId: activeRoom, isTyping: !!v.trim(), user: { id: userId, name: myName } });
//   };

//   const onStartDM = (otherId) => {
//     const a = userId < otherId ? userId : otherId;
//     const b = userId < otherId ? otherId : userId;
//     const dmId = `dm_${a}_${b}`;
//     setRooms((r) => r.some((x) => x.id === dmId) ? r : [{ id: dmId, name: "Direct", desc: "Private DM" }, ...r]);
//     setActiveRoom(dmId);
//   };

//   const shown = messages.filter((m) =>
//     search ? (m.message || "").toLowerCase().includes(search.toLowerCase()) : true
//   );

//   return (
//     <div className="h-screen flex flex-col font-sans selection:bg-indigo-500/30" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
//       <Navbar />

//       <div className="flex-1 flex overflow-hidden p-6 gap-6 max-w-[1800px] mx-auto w-full">
        
//         {/* ROOMS SIDEBAR */}
//         <motion.aside 
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="w-80 rounded-[2.5rem] flex flex-col shadow-2xl overflow-hidden border"
//           style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
//         >
//           <div className="p-8">
//             <div className="flex items-center justify-between mb-8 px-2">
//                 <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>Channels</h3>
//                 <button className="p-1.5 rounded-lg transition-colors hover:bg-white/5" style={{ color: "var(--text-secondary)" }}>
//                     <FiPlus />
//                 </button>
//             </div>
//             <div className="space-y-3">
//               {rooms.map((room) => (
//                 <div
//                   key={room.id}
//                   onClick={() => setActiveRoom(room.id)}
//                   className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-4
//                   ${activeRoom === room.id ? "shadow-lg" : "hover:bg-white/5"}`}
//                   style={{ 
//                     backgroundColor: activeRoom === room.id ? "rgba(129, 140, 248, 0.1)" : "transparent",
//                     color: activeRoom === room.id ? "var(--accent)" : "var(--text-secondary)"
//                   }}
//                 >
//                   <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
//                        style={{ 
//                          backgroundColor: activeRoom === room.id ? "var(--accent)" : "var(--bg-primary)",
//                          color: activeRoom === room.id ? "white" : "var(--text-secondary)",
//                          boxShadow: activeRoom === room.id ? "0 10px 15px -3px rgba(129, 140, 248, 0.3)" : "none"
//                        }}>
//                     <FiHash size={18} />
//                   </div>
//                   <div className="flex-1">
//                     <div className="font-bold text-sm tracking-tight" style={{ color: activeRoom === room.id ? "var(--text-primary)" : "inherit" }}>{room.name}</div>
//                     <div className="text-[10px] font-bold uppercase tracking-tight opacity-60">{room.desc}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </motion.aside>

//         {/* MAIN CHAT AREA */}
//         <motion.main 
//           initial={{ opacity: 0, scale: 0.98 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="flex-1 rounded-[3rem] flex flex-col overflow-hidden shadow-2xl relative border"
//           style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
//         >
//           {/* Subtle Decorative Gradient */}
//           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -z-10 rounded-full" />

//           {/* CHAT HEADER */}
//           <header className="px-10 py-6 border-b flex justify-between items-center backdrop-blur-md z-10" style={{ borderColor: "var(--border-color)", backgroundColor: "rgba(15, 23, 42, 0.8)" }}>
//             <div className="flex items-center gap-5">
//               <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-xl transition-transform hover:scale-105 cursor-default"
//                    style={{ backgroundColor: "var(--accent)", boxShadow: "0 10px 15px -3px rgba(129, 140, 248, 0.3)" }}>
//                 {rooms.find((r) => r.id === activeRoom)?.name[0]}
//               </div>
//               <div>
//                 <h2 className="text-2xl font-black tracking-tight mb-1" style={{ color: "var(--text-primary)" }}>
//                   {rooms.find((r) => r.id === activeRoom)?.name}
//                 </h2>
//                 <div className="flex items-center gap-2">
//                     <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest" style={{ color: "#10b981" }}>
//                         <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//                         {onlineUsers.length} active
//                     </span>
//                 </div>
//               </div>
//             </div>

//             <div className="relative group hidden lg:block">
//               <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 transition-colors" style={{ color: "var(--text-secondary)" }} />
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search history..."
//                 className="pl-14 pr-6 py-3 rounded-2xl outline-none text-sm w-72 transition-all border"
//                 style={{ 
//                     backgroundColor: "var(--bg-primary)", 
//                     borderColor: "var(--border-color)",
//                     color: "var(--text-primary)"
//                 }}
//               />
//             </div>
//           </header>

//           {/* MESSAGES THREAD */}
//           <div
//             ref={messagesRef}
//             className="flex-1 overflow-y-auto p-10 space-y-6 custom-scrollbar z-10"
//             style={{ backgroundColor: "rgba(2, 6, 23, 0.2)" }}
//           >
//             <div className="max-w-5xl mx-auto">
//               <AnimatePresence mode="popLayout">
//                 {shown.map((m) => (
//                   <motion.div 
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     id={m._id} 
//                     key={m._id}
//                     className="mb-6"
//                   >
//                     <MessageBubble msg={m} currentUserId={userId} />
//                   </motion.div>
//                 ))}
//               </AnimatePresence>

//               {/* Typing Indicator */}
//               <AnimatePresence>
//                 {Object.keys(typingUsers).length > 0 && (
//                   <motion.div 
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0 }}
//                     className="flex items-center gap-3 text-xs font-black py-4 italic"
//                     style={{ color: "var(--accent)" }}
//                   >
//                     <div className="flex gap-1.5 px-3 py-2 rounded-full border" style={{ backgroundColor: "rgba(129, 140, 248, 0.1)", borderColor: "rgba(129, 140, 248, 0.2)" }}>
//                       <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms'}} />
//                       <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms'}} />
//                       <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms'}} />
//                     </div>
//                     <span>{Object.values(typingUsers).map((u) => u.name).join(", ")} is typing</span>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* CHAT INPUT BAR */}
//           <footer className="p-8 z-10 border-t" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
//             <div className="max-w-5xl mx-auto flex items-end gap-5">
//               <div className="p-1 rounded-2xl border transition-all shadow-sm" style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)" }}>
//                 <FileUploader onUploaded={onUpload} />
//               </div>
              
//               <div className="flex-1 relative group">
//                 <textarea
//                   rows="1"
//                   value={text}
//                   onChange={(e) => onTyping(e.target.value)}
//                   onKeyDown={(e) => {
//                     if(e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault();
//                       onSend();
//                     }
//                   }}
//                   className="w-full p-5 pr-16 rounded-[2rem] outline-none transition-all resize-none overflow-hidden text-sm font-medium border"
//                   placeholder={`Send message to #${rooms.find((r) => r.id === activeRoom)?.name.toLowerCase()}...`}
//                   style={{ 
//                     backgroundColor: "var(--bg-primary)", 
//                     borderColor: "var(--border-color)",
//                     color: "var(--text-primary)"
//                   }}
//                 />
//                 <button
//                   onClick={onSend}
//                   disabled={!text.trim()}
//                   className="absolute right-3.5 bottom-3.5 p-3 rounded-2xl transition-all shadow-lg active:scale-95"
//                   style={{ 
//                     backgroundColor: text.trim() ? "var(--accent)" : "rgba(255,255,255,0.05)",
//                     color: text.trim() ? "white" : "var(--text-secondary)",
//                     boxShadow: text.trim() ? "0 10px 15px -3px rgba(129, 140, 248, 0.3)" : "none"
//                   }}
//                 >
//                   <FiSend size={20} />
//                 </button>
//               </div>
//             </div>
//           </footer>
//         </motion.main>

//         {/* ONLINE USERS SIDEBAR */}
//         <motion.aside 
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="w-80 rounded-[2.5rem] flex flex-col shadow-2xl overflow-hidden hidden xl:flex border"
//           style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
//         >
//           <div className="p-8">
//             <div className="flex items-center justify-between mb-8 px-2">
//               <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>Participants</h3>
//               <div className="p-2 rounded-xl" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-secondary)" }}>
//                 <FiUsers size={16} />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <OnlineUsers users={onlineUsers} onDM={onStartDM} />
//             </div>
//           </div>
          
//           <div className="mt-auto p-8">
//             <div className="p-6 rounded-[2rem] border shadow-sm" style={{ backgroundColor: "rgba(129, 140, 248, 0.05)", borderColor: "rgba(129, 140, 248, 0.1)" }}>
//               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 shadow-sm" style={{ color: "var(--accent)" }}>
//                   <FiInfo size={20} />
//               </div>
//               <p className="text-xs font-bold leading-relaxed uppercase tracking-tight" style={{ color: "var(--text-primary)" }}>
//                 Guidelines: Keep discussions professional and supportive.
//               </p>
//             </div>
//           </div>
//         </motion.aside>

//       </div>

//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 6px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//       `}</style>
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import Navbar from "../components/Navbar";
// import OnlineUsers from "../components/OnlineUsers";
// import MessageBubble from "../components/MessageBubble";
// import FileUploader from "../components/FileUploader";
// import API from "../api/api";
// import { FiSearch, FiSend, FiHash, FiUsers, FiInfo, FiPlus } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";

// const SOCKET_URL = "http://localhost:4000";

// export default function ChatPage() {

//   /* ---------------- PREVENT BODY SCROLL ---------------- */
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const [activeRoom, setActiveRoom] = useState("global");
//   const [rooms, setRooms] = useState([
//     { id: "global", name: "Global", desc: "General chat", unread: 0 },
//     { id: "dsa", name: "DSA", desc: "Algorithms discussion", unread: 0 },
//     { id: "frontend", name: "Frontend", desc: "React / UI", unread: 0 }
//   ]);

//   const [messages, setMessages] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [text, setText] = useState("");
//   const [typingUsers, setTypingUsers] = useState({});
//   const [search, setSearch] = useState("");

//   const socketRef = useRef(null);
//   const messagesRef = useRef(null);

//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");
//   const myName = localStorage.getItem("name") || "You";

//   /* ---------------- SOCKET CONNECTION ---------------- */
//   useEffect(() => {
//     const s = io(SOCKET_URL, { auth: { token } });
//     socketRef.current = s;

//     s.on("connect", () => {
//       s.emit("identify", { id: userId, name: myName });
//       s.emit("joinGroup", activeRoom);
//     });

//     s.on("presence:update", (list) => setOnlineUsers(list));

//     s.on("userTyping", ({ user, isTyping }) => {
//       setTypingUsers((prev) => {
//         const copy = { ...prev };
//         if (isTyping) copy[user.id] = user;
//         else delete copy[user.id];
//         return copy;
//       });
//     });

//     s.on("newMessage", (msg) => {
//       if (messagesRef.current && document.getElementById(msg._id)) return;
//       if (msg.user?._id === userId) return;
//       setMessages((prev) => [...prev, msg]);
//       scrollToBottom();
//     });

//     return () => s.disconnect();
//   }, []);

//   /* ---------------- LOAD ROOM ---------------- */
//   useEffect(() => {
//     if (!activeRoom) return;

//     const load = async () => {
//       try {
//         const res = await API.get(`/chat/${activeRoom}`);
//         const normalized = (res.data || []).map((m) => ({
//           ...m,
//           attachments: m.attachments || [],
//           readBy: m.readBy || []
//         }));
//         setMessages(normalized);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         scrollToBottom();
//       }
//     };

//     load();
//   }, [activeRoom]);

//   const scrollToBottom = () => {
//     setTimeout(() => {
//       messagesRef.current?.scrollTo({
//         top: messagesRef.current.scrollHeight,
//         behavior: "smooth"
//       });
//     }, 50);
//   };

//   const onSend = async () => {
//     if (!text.trim()) return;

//     const payload = {
//       groupId: activeRoom,
//       message: text,
//       userId,
//       type: "text",
//       attachments: []
//     };

//     const temp = {
//       ...payload,
//       _id: `tmp-${Date.now()}`,
//       user: { _id: userId, name: myName },
//       createdAt: new Date().toISOString()
//     };

//     setMessages((p) => [...p, temp]);
//     scrollToBottom();

//     socketRef.current.emit("groupMessage", payload);
//     try { await API.post("/chat", payload); } catch (e) {}

//     setText("");
//   };

//   const shown = messages.filter((m) =>
//     search ? (m.message || "").toLowerCase().includes(search.toLowerCase()) : true
//   );

//   return (
//     <div
//       className="h-screen flex flex-col overflow-hidden font-sans"
//       style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
//     >
//       <Navbar />

//       {/* MAIN WRAPPER */}
//       <div className="flex-1 flex overflow-hidden gap-6 px-6 py-6 max-w-[1800px] mx-auto w-full">

//         {/* ROOMS SIDEBAR */}
//         <motion.aside
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="w-80 rounded-[2.5rem] flex flex-col shadow-2xl overflow-hidden border"
//           style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
//         >
//           <div className="p-8 space-y-3">
//             {rooms.map((room) => (
//               <div
//                 key={room.id}
//                 onClick={() => setActiveRoom(room.id)}
//                 className={`p-4 rounded-2xl cursor-pointer transition-all
//                 ${activeRoom === room.id ? "bg-indigo-500/10 text-indigo-400" : "hover:bg-white/5 text-slate-400"}`}
//               >
//                 <div className="font-bold text-sm">{room.name}</div>
//                 <div className="text-[10px] uppercase opacity-60">{room.desc}</div>
//               </div>
//             ))}
//           </div>
//         </motion.aside>

//         {/* MAIN CHAT */}
//         <motion.main
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="flex-1 rounded-[3rem] flex flex-col overflow-hidden shadow-2xl border"
//           style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
//         >

//           {/* HEADER */}
//           <header className="px-10 py-6 border-b flex justify-between items-center"
//             style={{ borderColor: "var(--border-color)" }}
//           >
//             <h2 className="text-2xl font-black">
//               {rooms.find((r) => r.id === activeRoom)?.name}
//             </h2>

//             <div className="relative hidden lg:block">
//               <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2" />
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search history..."
//                 className="pl-14 pr-6 py-3 rounded-2xl border outline-none"
//               />
//             </div>
//           </header>

//           {/* MESSAGE AREA (ONLY SCROLLABLE PART) */}
//           <div
//             ref={messagesRef}
//             className="flex-1 overflow-y-auto p-10 space-y-6"
//           >
//             <div className="max-w-5xl mx-auto">
//               {shown.map((m) => (
//                 <div key={m._id}>
//                   <MessageBubble msg={m} currentUserId={userId} />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* INPUT */}
//           <footer className="p-8 border-t"
//             style={{ borderColor: "var(--border-color)" }}
//           >
//             <div className="max-w-5xl mx-auto flex items-end gap-5">
//               <FileUploader />
//               <div className="flex-1 relative">
//                 <textarea
//                   rows="1"
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault();
//                       onSend();
//                     }
//                   }}
//                   className="w-full p-5 pr-16 rounded-2xl border resize-none"
//                 />
//                 <button
//                   onClick={onSend}
//                   className="absolute right-3 bottom-3 p-3 bg-indigo-500 text-white rounded-xl"
//                 >
//                   <FiSend />
//                 </button>
//               </div>
//             </div>
//           </footer>

//         </motion.main>

//         {/* ONLINE USERS */}
//         <motion.aside
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="w-80 rounded-[2.5rem] hidden xl:flex flex-col shadow-2xl overflow-hidden border"
//           style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
//         >
//           <div className="p-8">
//             <OnlineUsers users={onlineUsers} />
//           </div>
//         </motion.aside>

//       </div>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import OnlineUsers from "../components/OnlineUsers";
import MessageBubble from "../components/MessageBubble";
import FileUploader from "../components/FileUploader";
import API from "../api/api";
import { FiSearch, FiSend } from "react-icons/fi";
import { motion } from "framer-motion";

/* ✅ FIXED SOCKET URL */
const SOCKET_URL =
  import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace("/api", "")
    : "http://localhost:4000";

export default function ChatPage() {

  /* ---------------- PREVENT BODY SCROLL ---------------- */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [activeRoom, setActiveRoom] = useState("global");
  const [rooms] = useState([
    { id: "global", name: "Global", desc: "General chat", unread: 0 },
    { id: "dsa", name: "DSA", desc: "Algorithms discussion", unread: 0 },
    { id: "frontend", name: "Frontend", desc: "React / UI", unread: 0 }
  ]);

  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [text, setText] = useState("");
  const [typingUsers, setTypingUsers] = useState({});
  const [search, setSearch] = useState("");

  const socketRef = useRef(null);
  const messagesRef = useRef(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const myName = localStorage.getItem("name") || "You";

  /* ---------------- SOCKET CONNECTION ---------------- */
  useEffect(() => {

    const s = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
      auth: { token }
    });

    socketRef.current = s;

    s.on("connect", () => {
      s.emit("identify", { id: userId, name: myName });
      s.emit("joinGroup", activeRoom);
    });

    s.on("presence:update", (list) => setOnlineUsers(list));

    s.on("userTyping", ({ user, isTyping }) => {
      setTypingUsers((prev) => {
        const copy = { ...prev };
        if (isTyping) copy[user.id] = user;
        else delete copy[user.id];
        return copy;
      });
    });

    s.on("newMessage", (msg) => {
      if (messagesRef.current && document.getElementById(msg._id)) return;
      if (msg.user?._id === userId) return;
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });

    return () => s.disconnect();

  }, []);

  /* ---------------- LOAD ROOM ---------------- */
  useEffect(() => {
    if (!activeRoom) return;

    const load = async () => {
      try {
        const res = await API.get(`/chat/${activeRoom}`);
        const normalized = (res.data || []).map((m) => ({
          ...m,
          attachments: m.attachments || [],
          readBy: m.readBy || []
        }));
        setMessages(normalized);
      } catch (err) {
        console.error(err);
      } finally {
        scrollToBottom();
      }
    };

    load();
  }, [activeRoom]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesRef.current?.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth"
      });
    }, 50);
  };

  const onSend = async () => {
    if (!text.trim()) return;

    const payload = {
      groupId: activeRoom,
      message: text,
      userId,
      type: "text",
      attachments: []
    };

    const temp = {
      ...payload,
      _id: `tmp-${Date.now()}`,
      user: { _id: userId, name: myName },
      createdAt: new Date().toISOString()
    };

    setMessages((p) => [...p, temp]);
    scrollToBottom();

    socketRef.current.emit("groupMessage", payload);
    try { await API.post("/chat", payload); } catch (e) {}

    setText("");
  };

  const shown = messages.filter((m) =>
    search ? (m.message || "").toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div
      className="h-screen flex flex-col overflow-hidden font-sans"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <Navbar />

      <div className="flex-1 flex overflow-hidden gap-6 px-6 py-6 max-w-[1800px] mx-auto w-full">

        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-80 rounded-[2.5rem] flex flex-col shadow-2xl overflow-hidden border"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
        >
          <div className="p-8 space-y-3">
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setActiveRoom(room.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all
                ${activeRoom === room.id ? "bg-indigo-500/10 text-indigo-400" : "hover:bg-white/5 text-slate-400"}`}
              >
                <div className="font-bold text-sm">{room.name}</div>
                <div className="text-[10px] uppercase opacity-60">{room.desc}</div>
              </div>
            ))}
          </div>
        </motion.aside>

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 rounded-[3rem] flex flex-col overflow-hidden shadow-2xl border"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
        >

          <header className="px-10 py-6 border-b flex justify-between items-center"
            style={{ borderColor: "var(--border-color)" }}
          >
            <h2 className="text-2xl font-black">
              {rooms.find((r) => r.id === activeRoom)?.name}
            </h2>

            <div className="relative hidden lg:block">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search history..."
                className="pl-14 pr-6 py-3 rounded-2xl border outline-none"
              />
            </div>
          </header>

          <div ref={messagesRef} className="flex-1 overflow-y-auto p-10 space-y-6">
            <div className="max-w-5xl mx-auto">
              {shown.map((m) => (
                <div key={m._id}>
                  <MessageBubble msg={m} currentUserId={userId} />
                </div>
              ))}
            </div>
          </div>

          <footer className="p-8 border-t"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="max-w-5xl mx-auto flex items-end gap-5">
              <FileUploader />
              <div className="flex-1 relative">
                <textarea
                  rows="1"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      onSend();
                    }
                  }}
                  className="w-full p-5 pr-16 rounded-2xl border resize-none"
                />
                <button
                  onClick={onSend}
                  className="absolute right-3 bottom-3 p-3 bg-indigo-500 text-white rounded-xl"
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </footer>

        </motion.main>

        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-80 rounded-[2.5rem] hidden xl:flex flex-col shadow-2xl overflow-hidden border"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
        >
          <div className="p-8">
            <OnlineUsers users={onlineUsers} />
          </div>
        </motion.aside>

      </div>
    </div>
  );
}