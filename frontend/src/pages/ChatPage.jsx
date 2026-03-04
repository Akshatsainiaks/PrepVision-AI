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

// import React, { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
// import Navbar from "../components/Navbar";
// import OnlineUsers from "../components/OnlineUsers";
// import MessageBubble from "../components/MessageBubble";
// import FileUploader from "../components/FileUploader";
// import API from "../api/api";
// import { FiSearch, FiSend } from "react-icons/fi";
// import { motion } from "framer-motion";

// /* ✅ FIXED SOCKET URL */
// const SOCKET_URL =
//   import.meta.env.VITE_API_URL
//     ? import.meta.env.VITE_API_URL.replace("/api", "")
//     : "http://localhost:4000";

// export default function ChatPage() {

//   /* ---------------- PREVENT BODY SCROLL ---------------- */
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const [activeRoom, setActiveRoom] = useState("global");
//   const [rooms] = useState([
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

//     const s = io(SOCKET_URL, {
//       transports: ["websocket"],
//       withCredentials: true,
//       auth: { token }
//     });

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

//       <div className="flex-1 flex overflow-hidden gap-6 px-6 py-6 max-w-[1800px] mx-auto w-full">

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

//         <motion.main
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="flex-1 rounded-[3rem] flex flex-col overflow-hidden shadow-2xl border"
//           style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
//         >

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

//           <div ref={messagesRef} className="flex-1 overflow-y-auto p-10 space-y-6">
//             <div className="max-w-5xl mx-auto">
//               {shown.map((m) => (
//                 <div key={m._id}>
//                   <MessageBubble msg={m} currentUserId={userId} />
//                 </div>
//               ))}
//             </div>
//           </div>

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



// next acc claude code
import React, { useEffect, useRef, useState, useContext } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { tokenStore } from "../api/tokenStore";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSend, FiMessageSquare, FiSearch, FiUsers, FiChevronDown,
  FiChevronRight, FiSmile, FiMoreHorizontal, FiMapPin, FiX,
  FiEdit2, FiTrash2, FiPlus, FiMic, FiVideo, FiPhone, FiInfo,
  FiSettings, FiLogOut, FiUserPlus, FiCheck, FiPaperclip,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import { BsReply } from "react-icons/bs";
import { MdAnnouncement } from "react-icons/md";

const SOCKET_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace("/api", "")
  : "http://localhost:4000";

const QUICK_REACTIONS = ["👍","❤️","😂","😮","🎉","🔥","✅","💡"];
const EMOJI_LIST = [
  "😀","😂","😍","🤔","😎","🥳","😭","🤯","👍","👎","❤️","🔥",
  "✅","❌","⚡","🎉","🏆","💡","🚀","💯","🙌","👏","🤝","💪",
  "🧠","👀","📌","📎","🔗","⭐","🌟","💎","🎯","📊","💻","🖥️",
];
const GROUP_EMOJIS = ["👥","🚀","🎯","💡","🔥","⚡","🎨","🧠","🏆","💎","🌐","🎪"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getUserName = (user) => {
  if (!user) return "Unknown";
  if (typeof user === "object" && user.name) return user.name;
  return "Unknown";
};
const getUserId = (u) => (typeof u === "object" ? u?._id : u)?.toString();
const isValidId  = (id) => typeof id === "string" && /^[a-f\d]{24}$/i.test(id);

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name, size = 32, status, emoji, avatar, onClick }) {
  const COLORS = ["#6366f1","#8b5cf6","#ec4899","#f59e0b","#10b981","#3b82f6","#ef4444","#06b6d4"];
  const safeName = typeof name === "string" && name.length <= 30 ? name : "?";
  const bg = COLORS[(safeName?.charCodeAt(0) || 0) % COLORS.length];
  const STATUS_COLOR = { online: "#22c55e", away: "#f59e0b", busy: "#ef4444", offline: "#6b7280" };
  return (
    <div className={`relative shrink-0 select-none ${onClick ? "cursor-pointer" : ""}`}
      style={{ width: size, height: size }} onClick={onClick}>
      {avatar ? (
        <img src={avatar} alt={safeName}
          className="rounded-xl w-full h-full object-cover"
          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
      ) : null}
      <div className="rounded-xl flex items-center justify-center text-white font-black w-full h-full"
        style={{
          backgroundColor: emoji ? "rgba(99,102,241,0.15)" : bg,
          fontSize: emoji ? size * 0.55 : size * 0.38,
          display: avatar ? "none" : "flex",
          position: avatar ? "absolute" : "relative",
          top: 0, left: 0,
        }}>
        {emoji || safeName?.charAt(0)?.toUpperCase() || "?"}
      </div>
      {status && (
        <span className="absolute -bottom-0.5 -right-0.5 rounded-full border-2"
          style={{ width: size * 0.3, height: size * 0.3, backgroundColor: STATUS_COLOR[status] || "#22c55e", borderColor: "var(--bg-card)" }} />
      )}
    </div>
  );
}

// ─── Emoji Picker ─────────────────────────────────────────────────────────────
function EmojiPicker({ onSelect, onClose }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
      className="absolute bottom-full mb-2 left-0 z-50 rounded-2xl border p-3 shadow-2xl"
      style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", width: 280 }}>
      <div className="grid grid-cols-9 gap-1">
        {EMOJI_LIST.map(e => (
          <button key={e} onClick={() => { onSelect(e); onClose(); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all text-base">{e}</button>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Reaction Bar ─────────────────────────────────────────────────────────────
function ReactionBar({ reactions = {}, onReact, msgId, isMe }) {
  if (!Object.keys(reactions).length) return null;
  return (
    <div className={`flex flex-wrap gap-1 mt-1.5 ${isMe ? "justify-end" : ""}`}>
      {Object.entries(reactions).map(([emoji, users]) => (
        <button key={emoji} onClick={() => onReact(msgId, emoji)}
          title={`${users.length} reaction${users.length > 1 ? "s" : ""}`}
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border transition-all hover:scale-110 active:scale-95"
          style={{
            background: "rgba(99,102,241,0.12)",
            borderColor: "rgba(99,102,241,0.25)",
            color: "var(--text-primary)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.15)"
          }}>
          <span>{emoji}</span>
          <span className="font-black text-[10px]" style={{ color: "var(--accent)" }}>{users.length}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Message Actions ──────────────────────────────────────────────────────────
function MsgActions({ msg, isMe, onReact, onReply, onPin, onDelete, onEdit, onClose }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.85, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.85 }}
      className="absolute -top-12 right-0 z-50 flex items-center gap-0.5 px-2 py-1.5 rounded-2xl border shadow-xl"
      style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
      {QUICK_REACTIONS.slice(0, 5).map(e => (
        <button key={e} onClick={() => { onReact(msg._id, e); onClose(); }}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-base hover:bg-white/10 transition-all hover:scale-110">{e}</button>
      ))}
      <div className="w-px h-5 mx-1" style={{ background: "var(--border-color)" }} />
      <button onClick={() => { onReply(msg); onClose(); }} title="Reply"
        className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
        style={{ color: "var(--text-secondary)" }}><BsReply size={15} /></button>
      <button onClick={() => { onPin(msg); onClose(); }} title="Pin"
        className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
        style={{ color: "var(--text-secondary)" }}><FiMapPin size={13} /></button>
      {isMe && (
        <>
          <button onClick={() => { onEdit(msg); onClose(); }} title="Edit"
            className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
            style={{ color: "var(--text-secondary)" }}><FiEdit2 size={13} /></button>
          <button onClick={() => { onDelete(msg._id); onClose(); }} title="Delete"
            className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-red-500/10 transition-all"
            style={{ color: "#ef4444" }}><FiTrash2 size={13} /></button>
        </>
      )}
    </motion.div>
  );
}

// ─── Message ──────────────────────────────────────────────────────────────────
function Message({ msg, isMe, showHeader, isAnnounce, onReact, onReply, onPin, onDelete, onEdit }) {
  const [hovered, setHovered]         = useState(false);
  const [showActions, setShowActions] = useState(false);
  const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = new Date(msg.createdAt).toLocaleDateString([], { month: "short", day: "numeric" });

  if (isAnnounce) {
    return (
      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
        className="mx-4 my-3 p-4 rounded-2xl border"
        style={{ background: "rgba(245,158,11,0.05)", borderColor: "rgba(245,158,11,0.15)" }}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: "rgba(245,158,11,0.12)" }}>📢</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-black text-sm" style={{ color: "#f59e0b" }}>{getUserName(msg.user)}</span>
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full"
                style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>ANNOUNCEMENT</span>
              <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>{date} · {time}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{msg.message}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`relative flex flex-col ${isMe ? "items-end" : "items-start"} px-4`}
      style={{ marginTop: showHeader ? 12 : 2 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setShowActions(false); }}>

      {/* Reply preview */}
      {msg.replyTo && (
        <div className={`flex items-center gap-2 mb-1 px-3 py-1 rounded-lg border-l-2 text-xs opacity-60 truncate max-w-sm ${isMe ? "flex-row-reverse border-r-2 border-l-0" : ""}`}
          style={{ borderColor: "var(--accent)", background: "rgba(99,102,241,0.04)", color: "var(--text-secondary)" }}>
          <BsReply size={11} style={{ flexShrink: 0 }} />
          <span className="font-bold shrink-0" style={{ color: "var(--accent)" }}>{getUserName(msg.replyTo?.user)}</span>
          <span className="truncate">{msg.replyTo.message?.slice(0, 60)}</span>
        </div>
      )}

      <div className={`flex items-end gap-2 max-w-xl ${isMe ? "flex-row-reverse" : ""}`}>
        {!isMe && showHeader && <Avatar name={getUserName(msg.user)} size={32} avatar={msg.user?.avatar}
          onClick={() => msg.user?._id && window.__navigateToProfile?.(msg.user._id)} />}
        {!isMe && !showHeader && <div style={{ width: 32 }} />}

        <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
          {/* Name + time header */}
          {showHeader && (
            <div className={`flex items-baseline gap-2 mb-0.5 px-1 ${isMe ? "flex-row-reverse" : ""}`}>
              <span className="font-black text-xs" style={{ color: isMe ? "var(--accent)" : "var(--text-primary)" }}>
                {isMe ? "You" : getUserName(msg.user)}
              </span>
              <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>{time}</span>
              {msg.edited && <span className="text-[9px] italic" style={{ color: "var(--text-secondary)" }}>(edited)</span>}
              {msg.pinned && <FiMapPin size={10} style={{ color: "#f59e0b" }} />}
            </div>
          )}

          {/* Bubble */}
          <div className="relative group">
            <div className="px-4 py-2.5 text-sm leading-relaxed break-words"
              style={{
                background: isMe ? "var(--accent)" : "var(--bg-card)",
                color: isMe ? "#fff" : "var(--text-primary)",
                borderRadius: isMe ? "1.2rem 1.2rem 0.2rem 1.2rem" : "0.2rem 1.2rem 1.2rem 1.2rem",
                maxWidth: 480,
                whiteSpace: "pre-wrap",
              }}>
              {msg.message?.split(/(@\w+)/g).map((part, i) =>
                part.startsWith("@")
                  ? <span key={i} className="font-bold" style={{ color: isMe ? "rgba(255,255,255,0.9)" : "var(--accent)" }}>{part}</span>
                  : part
              )}
            </div>

            {/* Hover actions */}
            <AnimatePresence>
              {hovered && (
                <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                  className={`absolute -top-9 ${isMe ? "right-0" : "left-0"} flex items-center gap-0.5 px-2 py-1.5 rounded-2xl border shadow-xl z-10`}
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                  {QUICK_REACTIONS.slice(0, 5).map(e => (
                    <button key={e} onClick={() => onReact(msg._id, e)}
                      className="w-7 h-7 rounded-xl flex items-center justify-center text-base hover:bg-white/10 transition-all hover:scale-110">{e}</button>
                  ))}
                  <div className="w-px h-4 mx-0.5" style={{ background: "var(--border-color)" }} />
                  <button onClick={() => onReply(msg)} className="w-7 h-7 rounded-xl flex items-center justify-center hover:bg-white/10"
                    style={{ color: "var(--text-secondary)" }}><BsReply size={13} /></button>
                  <button onClick={() => onPin(msg)} className="w-7 h-7 rounded-xl flex items-center justify-center hover:bg-white/10"
                    style={{ color: "var(--text-secondary)" }}><FiMapPin size={11} /></button>
                  {isMe && <>
                    <button onClick={() => onEdit(msg)} className="w-7 h-7 rounded-xl flex items-center justify-center hover:bg-white/10"
                      style={{ color: "var(--text-secondary)" }}><FiEdit2 size={11} /></button>
                    <button onClick={() => onDelete(msg._id)} className="w-7 h-7 rounded-xl flex items-center justify-center hover:bg-red-500/10"
                      style={{ color: "#ef4444" }}><FiTrash2 size={11} /></button>
                  </>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Reactions */}
          <ReactionBar reactions={msg.reactions || {}} onReact={onReact} msgId={msg._id} isMe={isMe} />

          {/* Time (when no header) */}
          {!showHeader && hovered && (
            <span className="text-[9px] px-1 mt-0.5" style={{ color: "var(--text-secondary)" }}>{time}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── DM Bubble ────────────────────────────────────────────────────────────────
function DMMsg({ msg, isMe, onReact }) {
  const [hovered, setHovered] = useState(false);
  const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
      className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : ""}`}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {!isMe && <Avatar name={getUserName(msg.user)} size={30} avatar={msg.user?.avatar}
        onClick={() => msg.user?._id && window.__navigateToProfile?.(msg.user._id)} />}
      <div className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`} style={{ maxWidth: 320 }}>
        <div className="relative px-4 py-2.5 text-sm leading-relaxed break-words"
          style={{
            background: isMe ? "var(--accent)" : "var(--bg-card)",
            color: isMe ? "#fff" : "var(--text-primary)",
            borderRadius: isMe ? "1.2rem 1.2rem 0.2rem 1.2rem" : "0.2rem 1.2rem 1.2rem 1.2rem",
          }}>
          {msg.message}
          <AnimatePresence>
            {hovered && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                className={`absolute -top-9 ${isMe ? "right-0" : "left-0"} flex gap-0.5 px-2 py-1 rounded-xl border shadow-lg`}
                style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                {QUICK_REACTIONS.slice(0, 5).map(e => (
                  <button key={e} onClick={() => onReact(msg._id, e)}
                    className="w-6 h-6 flex items-center justify-center text-sm hover:scale-110 transition-transform">{e}</button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <ReactionBar reactions={msg.reactions || {}} onReact={onReact} msgId={msg._id} />
        <span className="text-[9px] px-1" style={{ color: "var(--text-secondary)" }}>{time}</span>
      </div>
    </motion.div>
  );
}

// ─── Date Divider ─────────────────────────────────────────────────────────────
function DateDivider({ date }) {
  return (
    <div className="flex items-center gap-3 px-5 my-5">
      <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border"
        style={{ color: "var(--text-secondary)", borderColor: "var(--border-color)", background: "var(--bg-card)" }}>{date}</span>
      <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
function ChatInput({ value, onChange, onSend, placeholder, replyTo, onCancelReply, editMsg, onCancelEdit, disabled, members, onAttach }) {
  const [showEmoji, setShowEmoji]           = useState(false);
  const [mentionQuery, setMentionQuery]     = useState(null);
  const [mentionResults, setMentionResults] = useState([]);
  const [attachment, setAttachment]         = useState(null);
  const textareaRef = useRef(null);
  const fileRef     = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const type = file.type.startsWith("image/") ? "image"
      : file.type.startsWith("video/") ? "video" : "document";
    const preview = type === "image" ? URL.createObjectURL(file) : null;
    setAttachment({ file, preview, type, name: file.name, size: (file.size / 1024).toFixed(0) + " KB" });
    e.target.value = "";
  };

  const removeAttachment = () => {
    if (attachment?.preview) URL.revokeObjectURL(attachment.preview);
    setAttachment(null);
  };

  // Detect @mention as user types
  const handleChange = (val) => {
    onChange(val);
    const textarea = textareaRef.current;
    if (!textarea) return;
    const cursor = textarea.selectionStart;
    const textUpToCursor = val.slice(0, cursor);
    const match = textUpToCursor.match(/@(\w*)$/);
    if (match && members?.length) {
      const q = match[1].toLowerCase();
      setMentionQuery(match[1]);
      setMentionResults(
        members.filter(m => {
          const name = getUserName(m.user).toLowerCase();
          return name.includes(q);
        }).slice(0, 6)
      );
    } else {
      setMentionQuery(null);
      setMentionResults([]);
    }
  };

  const insertMention = (member) => {
    const textarea = textareaRef.current;
    const cursor = textarea.selectionStart;
    const textUpToCursor = value.slice(0, cursor);
    const beforeMention = textUpToCursor.replace(/@\w*$/, "");
    const afterCursor = value.slice(cursor);
    // Use username if available, else name without spaces
    const handle = member.user?.username || getUserName(member.user).replace(/\s+/g, "").toLowerCase();
    const newVal = `${beforeMention}@${handle} ${afterCursor}`;
    onChange(newVal);
    setMentionQuery(null);
    setMentionResults([]);
    setTimeout(() => {
      const pos = beforeMention.length + handle.length + 2;
      textarea.setSelectionRange(pos, pos);
      textarea.focus();
    }, 0);
  };

  return (
    <div className="px-4 py-3 border-t shrink-0" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
      {replyTo && (
        <div className="flex items-center justify-between mb-2 px-3 py-2 rounded-xl border-l-4 text-xs"
          style={{ background: "rgba(99,102,241,0.07)", borderColor: "var(--accent)", color: "var(--text-secondary)" }}>
          <div className="flex items-center gap-2 min-w-0">
            <BsReply size={12} style={{ color: "var(--accent)", flexShrink: 0 }} />
            <span className="truncate">Replying to <strong style={{ color: "var(--accent)" }}>{getUserName(replyTo.user)}</strong> · {replyTo.message?.slice(0, 60)}</span>
          </div>
          <button onClick={onCancelReply} className="p-1 rounded hover:bg-white/10 shrink-0 ml-2"><FiX size={11} /></button>
        </div>
      )}
      {editMsg && (
        <div className="flex items-center justify-between mb-2 px-3 py-2 rounded-xl border-l-4 text-xs"
          style={{ background: "rgba(245,158,11,0.07)", borderColor: "#f59e0b", color: "var(--text-secondary)" }}>
          <div className="flex items-center gap-2">
            <FiEdit2 size={11} style={{ color: "#f59e0b" }} />
            <span>Editing message</span>
          </div>
          <button onClick={onCancelEdit} className="p-1 rounded hover:bg-white/10"><FiX size={11} /></button>
        </div>
      )}

      {/* Attachment preview */}
      {attachment && (
        <div className="mb-2 flex items-center gap-3 px-3 py-2 rounded-xl border"
          style={{ background: "rgba(99,102,241,0.05)", borderColor: "rgba(99,102,241,0.2)" }}>
          {attachment.type === "image" && (
            <img src={attachment.preview} alt="preview" className="w-12 h-12 rounded-lg object-cover shrink-0" />
          )}
          {attachment.type === "video" && (
            <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "rgba(99,102,241,0.15)" }}>🎬</div>
          )}
          {attachment.type === "document" && (
            <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0"
              style={{ background: "rgba(99,102,241,0.15)" }}>📄</div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>{attachment.name}</p>
            <p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>{attachment.size}</p>
          </div>
          <button onClick={removeAttachment} className="p-1 rounded-lg hover:bg-white/10"
            style={{ color: "var(--text-secondary)" }}><FiX size={13} /></button>
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*,video/*,.pdf,.doc,.docx,.txt,.zip"
        className="hidden" onChange={handleFileChange} />
      <div className="relative flex items-end gap-2">
        {/* Attachment button */}
        <button onClick={() => fileRef.current?.click()} disabled={disabled}
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all shrink-0 mb-0.5 border"
          style={{ color: attachment ? "var(--accent)" : "var(--text-secondary)", borderColor: attachment ? "var(--accent)" : "var(--border-color)", background: attachment ? "rgba(99,102,241,0.08)" : "var(--bg-primary)" }}
          title="Attach file">
          <FiPaperclip size={15} />
        </button>
        <div className="relative flex-1">
          {/* @mention dropdown */}
          <AnimatePresence>
            {mentionResults.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                className="absolute bottom-full mb-2 left-0 w-56 rounded-2xl border shadow-2xl overflow-hidden z-50"
                style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                <div className="px-3 py-1.5 border-b" style={{ borderColor: "var(--border-color)" }}>
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                    @ Mention
                  </span>
                </div>
                {mentionResults.map((m, i) => (
                  <button key={i} onClick={() => insertMention(m)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-white/5 transition-all">
                    <Avatar name={getUserName(m.user)} size={26} />
                    <div className="text-left">
                      <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{getUserName(m.user)}</p>
                      <p className="text-[10px]" style={{ color: "var(--accent)" }}>
                        @{m.user?.username || getUserName(m.user).replace(/\s+/g, "").toLowerCase()}
                      </p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <textarea ref={textareaRef} rows={1} value={value}
            onChange={e => handleChange(e.target.value)} disabled={disabled}
            onKeyDown={e => {
              if (e.key === "Escape") { setMentionQuery(null); setMentionResults([]); }
              if (e.key === "Enter" && !e.shiftKey && mentionResults.length === 0) { e.preventDefault(); onSend(); }
              if (e.key === "Enter" && !e.shiftKey && mentionResults.length > 0) { e.preventDefault(); insertMention(mentionResults[0]); }
            }}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 pr-10 rounded-xl border resize-none outline-none text-sm disabled:opacity-40"
            style={{ background: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-primary)", maxHeight: 140, lineHeight: 1.6 }} />
          <div className="absolute right-2 bottom-2">
            <div className="relative">
              <button onClick={() => setShowEmoji(v => !v)} disabled={disabled}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all"
                style={{ color: "var(--text-secondary)" }}>😊</button>
              <AnimatePresence>
                {showEmoji && <EmojiPicker onSelect={e => { onChange(value + e); setShowEmoji(false); }} onClose={() => setShowEmoji(false)} />}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <button onClick={() => { if (attachment) { onAttach?.(attachment); setAttachment(null); } onSend(); }}
          disabled={(!value.trim() && !attachment) || disabled}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90 disabled:opacity-25 shrink-0 mb-0.5"
          style={{ background: (value.trim() || attachment) ? "var(--accent)" : "var(--bg-primary)", color: (value.trim() || attachment) ? "#fff" : "var(--text-secondary)", border: `1px solid ${(value.trim() || attachment) ? "transparent" : "var(--border-color)"}` }}>
          <FiSend size={14} />
        </button>
      </div>
      <p className="text-[10px] mt-1 px-1" style={{ color: "var(--text-secondary)" }}>Enter to send · Shift+Enter for new line · @ to mention · 📎 attach files</p>
    </div>
  );
}

// ─── Create Group Modal ───────────────────────────────────────────────────────
function CreateGroupModal({ allUsers, onlineUsers, onClose, onCreate }) {
  const [name, setName]         = useState("");
  const [desc, setDesc]         = useState("");
  const [emoji, setEmoji]       = useState("👥");
  const [selected, setSelected] = useState([]);
  const [search, setSearch]     = useState("");
  const [loading, setLoading]   = useState(false);

  const toggle = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const q = search.startsWith("@") ? search.slice(1).toLowerCase() : search.toLowerCase();
  const filtered = search.trim()
    ? allUsers.filter(u => search.startsWith("@")
        ? u.username?.toLowerCase().includes(q)
        : u.name?.toLowerCase().includes(q) || u.username?.toLowerCase().includes(q))
    : [];

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await onCreate({ name, description: desc, avatar: emoji, memberIds: selected });
      onClose();
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden"
        style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--border-color)" }}>
          <h2 className="font-black text-sm">Create Group</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10"
            style={{ color: "var(--text-secondary)" }}><FiX size={14} /></button>
        </div>
        <div className="p-5 space-y-4">
          {/* Emoji picker */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest mb-2 block" style={{ color: "var(--text-secondary)" }}>Icon</label>
            <div className="flex flex-wrap gap-2">
              {GROUP_EMOJIS.map(e => (
                <button key={e} onClick={() => setEmoji(e)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all"
                  style={{ background: emoji === e ? "var(--accent)" : "var(--bg-primary)", border: `1px solid ${emoji === e ? "transparent" : "var(--border-color)"}` }}>
                  {e}
                </button>
              ))}
            </div>
          </div>
          {/* Name */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Group Name *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Study Buddies"
              className="w-full px-3 py-2 rounded-xl border outline-none text-sm"
              style={{ background: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-primary)" }} />
          </div>
          {/* Description */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Description</label>
            <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="What's this group about?"
              className="w-full px-3 py-2 rounded-xl border outline-none text-sm"
              style={{ background: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-primary)" }} />
          </div>
          {/* Members */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest mb-2 block" style={{ color: "var(--text-secondary)" }}>
              Add Members ({selected.length} selected)
            </label>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
              className="w-full px-3 py-1.5 rounded-xl border outline-none text-xs mb-2"
              style={{ background: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-primary)" }} />
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {!search.trim() ? (
                <p className="text-[10px] text-center py-3 opacity-30" style={{ color: "var(--text-secondary)" }}>Type @username or name to search</p>
              ) : filtered.length === 0 ? (
                <p className="text-xs text-center py-4 opacity-40" style={{ color: "var(--text-secondary)" }}>No users found</p>
              ) : filtered.map(u => {
                const id = u._id || u.id;
                const isOnline = onlineUsers.some(o => o.id === id);
                return (
                  <button key={id} onClick={() => toggle(id)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all hover:bg-white/5"
                    style={{ background: selected.includes(id) ? "rgba(99,102,241,0.1)" : "transparent" }}>
                    <Avatar name={u.name} size={28} status={isOnline ? "online" : "offline"} />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>{u.name}</p>
                      {u.username && <p className="text-[10px]" style={{ color: "var(--accent)" }}>@{u.username}</p>}
                    </div>
                    {selected.includes(id) && <FiCheck size={14} style={{ color: "var(--accent)" }} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="px-5 pb-5 flex gap-2">
          <button onClick={onClose}
            className="flex-1 py-2 rounded-xl text-sm font-bold border transition-all"
            style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>Cancel</button>
          <button onClick={handleCreate} disabled={!name.trim() || loading}
            className="flex-1 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
            style={{ background: "var(--accent)", color: "#fff" }}>
            {loading ? "Creating..." : "Create Group"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Group Settings Modal ─────────────────────────────────────────────────────
function GroupSettingsModal({ group, allUsers, onlineUsers, userId, onClose, onUpdate, onLeave, onDelete, onAddMembers, onRemoveMember, onMakeAdmin }) {
  const [name, setName]         = useState(group.name);
  const [desc, setDesc]         = useState(group.description || "");
  const [tab, setTab]           = useState("info");
  const [selected, setSelected] = useState([]);
  const [search, setSearch]     = useState("");

  const isAdmin   = group.members?.some(m => getUserId(m.user) === userId && m.role === "admin");
  const memberIds = group.members?.map(m => getUserId(m.user)) || [];
  const query = search.startsWith("@") ? search.slice(1).toLowerCase() : search.toLowerCase();
  const nonMembers = allUsers.filter(u => {
    const id = u._id || u.id;
    if (memberIds.includes(id)) return false;
    if (!search.trim()) return false;
    return search.startsWith("@")
      ? u.username?.toLowerCase().includes(query)
      : u.name?.toLowerCase().includes(query) || u.username?.toLowerCase().includes(query);
  });

  const toggle = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden"
        style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--border-color)" }}>
          <h2 className="font-black text-sm">Group Settings</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10"
            style={{ color: "var(--text-secondary)" }}><FiX size={14} /></button>
        </div>
        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: "var(--border-color)" }}>
          {["info","members"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="flex-1 py-2.5 text-xs font-black uppercase tracking-widest transition-all"
              style={{ color: tab === t ? "var(--accent)" : "var(--text-secondary)", borderBottom: tab === t ? "2px solid var(--accent)" : "2px solid transparent" }}>
              {t}
            </button>
          ))}
        </div>

        <div className="p-5">
          {tab === "info" && (
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Name</label>
                <input value={name} onChange={e => setName(e.target.value)} disabled={!isAdmin}
                  className="w-full px-3 py-2 rounded-xl border outline-none text-sm disabled:opacity-50"
                  style={{ background: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-primary)" }} />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Description</label>
                <input value={desc} onChange={e => setDesc(e.target.value)} disabled={!isAdmin}
                  className="w-full px-3 py-2 rounded-xl border outline-none text-sm disabled:opacity-50"
                  style={{ background: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-primary)" }} />
              </div>
              {isAdmin && (
                <button onClick={() => onUpdate({ name, description: desc })}
                  className="w-full py-2 rounded-xl text-sm font-bold"
                  style={{ background: "var(--accent)", color: "#fff" }}>Save Changes</button>
              )}
              <div className="pt-2 space-y-2 border-t" style={{ borderColor: "var(--border-color)" }}>
                <button onClick={onLeave}
                  className="w-full py-2 rounded-xl text-sm font-bold border flex items-center justify-center gap-2 hover:bg-red-500/10 transition-all"
                  style={{ borderColor: "rgba(239,68,68,0.3)", color: "#ef4444" }}>
                  <FiLogOut size={14} /> Leave Group
                </button>
                {isAdmin && (
                  <button onClick={onDelete}
                    className="w-full py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-80 transition-all"
                    style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444" }}>
                    <FiTrash2 size={14} /> Delete Group
                  </button>
                )}
              </div>
            </div>
          )}

          {tab === "members" && (
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
                Members ({group.members?.length || 0})
              </p>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {group.members?.map(m => {
                  const u = m.user;
                  const mid = getUserId(u);
                  return (
                    <div key={mid} className="flex items-center gap-2.5 px-2 py-2 rounded-xl">
                      <Avatar name={getUserName(u)} size={28} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>{getUserName(u)}</p>
                        <p className="text-[10px]" style={{ color: m.role === "admin" ? "var(--accent)" : "var(--text-secondary)" }}>
                          {m.role === "admin" ? "Admin" : "Member"}
                        </p>
                      </div>
                      {isAdmin && mid !== userId && (
                        <div className="flex items-center gap-1">
                          {m.role !== "admin" && (
                            <button onClick={() => onMakeAdmin(mid)} title="Make Admin"
                              className="px-2 py-0.5 rounded-lg text-[10px] font-black border hover:bg-indigo-500/10 transition-all"
                              style={{ borderColor: "rgba(99,102,241,0.3)", color: "var(--accent)" }}>Admin</button>
                          )}
                          <button onClick={() => onRemoveMember(mid)} title="Remove"
                            className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-red-500/10 transition-all"
                            style={{ color: "#ef4444" }}><FiTrash2 size={11} /></button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {isAdmin && (
                <>
                  <p className="text-[10px] font-black uppercase tracking-widest pt-2 border-t" style={{ color: "var(--text-secondary)", borderColor: "var(--border-color)" }}>
                    Add Members
                  </p>
                  <div className="relative">
                    <FiSearch size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }} />
                    <input value={search} onChange={e => setSearch(e.target.value)}
                      placeholder="Search @username or name..."
                      className="w-full pl-7 pr-3 py-1.5 rounded-xl border outline-none text-xs"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-primary)" }} />
                  </div>
                  {search.trim() && (
                    <div className="space-y-1 max-h-32 overflow-y-auto rounded-xl border"
                      style={{ background: "var(--bg-primary)", borderColor: "var(--border-color)" }}>
                      {nonMembers.length === 0 ? (
                        <p className="text-xs text-center py-3 opacity-40" style={{ color: "var(--text-secondary)" }}>No users found</p>
                      ) : nonMembers.map(u => {
                        const id = u._id || u.id;
                        const isOnline = onlineUsers.some(o => o.id === id);
                        return (
                          <button key={id} onClick={() => toggle(id)}
                            className="w-full flex items-center gap-2.5 px-2 py-2 hover:bg-white/5 transition-all"
                            style={{ background: selected.includes(id) ? "rgba(99,102,241,0.1)" : "transparent" }}>
                            <Avatar name={u.name} size={26} status={isOnline ? "online" : "offline"} />
                            <div className="flex-1 min-w-0 text-left">
                              <p className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>{u.name}</p>
                              {u.username && <p className="text-[10px]" style={{ color: "var(--accent)" }}>@{u.username}</p>}
                            </div>
                            {selected.includes(id) && <FiCheck size={12} style={{ color: "var(--accent)" }} />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {!search.trim() && (
                    <p className="text-[10px] text-center py-1 opacity-30" style={{ color: "var(--text-secondary)" }}>
                      Type @username or name to search
                    </p>
                  )}
                  {selected.length > 0 && (
                    <button onClick={() => { onAddMembers(selected); setSelected([]); setSearch(""); }}
                      className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                      style={{ background: "var(--accent)", color: "#fff" }}>
                      <FiUserPlus size={12} /> Add {selected.length} Member{selected.length > 1 ? "s" : ""}
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── DM Search ────────────────────────────────────────────────────────────────
function DMSearch({ allUsers, onlineUsers, onOpen, activePeerId }) {
  const [search, setSearch] = useState("");

  const query = search.startsWith("@") ? search.slice(1).toLowerCase() : search.toLowerCase();
  const isSearching = search.trim().length > 0;

  const filtered = isSearching
    ? allUsers.filter(u =>
        search.startsWith("@")
          ? u.username?.toLowerCase().includes(query)  // @username search
          : u.name?.toLowerCase().includes(query) || u.username?.toLowerCase().includes(query)
      )
    : [];

  return (
    <div className="px-2 mb-1">
      <div className="relative mb-1">
        <FiSearch size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }} />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search name or @username..."
          className="w-full pl-7 pr-3 py-1.5 rounded-xl border outline-none text-xs"
          style={{ background: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-primary)" }} />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-secondary)" }}><FiX size={10} /></button>
        )}
      </div>

      {/* Search results */}
      {isSearching && (
        <div className="space-y-0.5 max-h-48 overflow-y-auto rounded-xl border mb-1"
          style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
          {filtered.length === 0 ? (
            <p className="text-[10px] px-3 py-3 opacity-40 text-center" style={{ color: "var(--text-secondary)" }}>
              No user found for "{search}"
            </p>
          ) : filtered.map(u => {
            const id = u._id || u.id;
            const isOnline = onlineUsers.some(o => o.id === id);
            return (
              <button key={id} onClick={() => { onOpen({ id, name: u.name, avatar: u.avatar }); setSearch(""); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-white/5 transition-all"
                style={{ background: activePeerId === id ? "rgba(99,102,241,0.1)" : "transparent" }}>
                <Avatar name={u.name} size={28} status={isOnline ? "online" : "offline"} />
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>{u.name}</p>
                  <p className="text-[10px] truncate" style={{ color: "var(--accent)" }}>@{u.username}</p>
                </div>
                {isOnline && <span className="text-[9px] font-bold" style={{ color: "#22c55e" }}>online</span>}
              </button>
            );
          })}
        </div>
      )}

      {!isSearching && onlineUsers.length === 0 && (
        <p className="text-[10px] px-2 py-1 opacity-30 text-center" style={{ color: "var(--text-secondary)" }}>
          Type @username or name to search
        </p>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  MAIN ChatPage
// ══════════════════════════════════════════════════════════════════════════════
// ─── My Space ─────────────────────────────────────────────────────────────────
function MySpace({ myName }) {
  const STORAGE_KEY = "myspace_notes";
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
  });
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); } catch {}
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [notes]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setNotes(prev => [...prev, { id: Date.now(), text, time: new Date().toISOString() }]);
    setInput("");
  };

  const deleteNote = (id) => setNotes(prev => prev.filter(n => n.id !== id));

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b shrink-0" style={{ borderColor: "var(--border-color)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
            style={{ background: "rgba(99,102,241,0.15)" }}>📝</div>
          <div>
            <h2 className="font-black text-base" style={{ color: "var(--text-primary)" }}>My Space</h2>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Private notes · Only you can see this</p>
          </div>
        </div>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {notes.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 opacity-40">
            <div className="text-5xl">📝</div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Your private space</p>
            <p className="text-xs text-center" style={{ color: "var(--text-secondary)" }}>Jot down notes, reminders, ideas — only visible to you</p>
          </div>
        )}
        {notes.map(note => (
          <motion.div key={note.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            className="group flex items-start gap-3 justify-end">
            <div className="relative max-w-lg px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed"
              style={{ background: "var(--accent)", color: "#fff" }}>
              <p className="whitespace-pre-wrap">{note.text}</p>
              <p className="text-[10px] mt-1 opacity-60">
                {new Date(note.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              <button onClick={() => deleteNote(note.id)}
                className="absolute -top-2 -left-2 w-5 h-5 rounded-full items-center justify-center hidden group-hover:flex"
                style={{ background: "#ef4444", color: "#fff" }}>
                <FiX size={10} />
              </button>
            </div>
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-3 border-t shrink-0" style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}>
        <div className="flex items-end gap-2">
          <textarea value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Write a note, idea, or reminder..."
            rows={1} className="flex-1 resize-none rounded-2xl px-4 py-2.5 text-sm outline-none border"
            style={{ background: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-primary)", maxHeight: 120 }} />
          <button onClick={send} disabled={!input.trim()}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90 disabled:opacity-25 shrink-0 mb-0.5"
            style={{ background: input.trim() ? "var(--accent)" : "var(--bg-primary)", color: input.trim() ? "#fff" : "var(--text-secondary)", border: `1px solid ${input.trim() ? "transparent" : "var(--border-color)"}` }}>
            <FiSend size={14} />
          </button>
        </div>
        <p className="text-[10px] mt-1 px-1" style={{ color: "var(--text-secondary)" }}>Enter to save · Shift+Enter for new line · Stored locally on your device</p>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // View state
  const [view, setView]               = useState("announcement");
  const [activeGroup, setActiveGroup] = useState(null);
  const [activePeer, setActivePeer]   = useState(null);

  // Data
  const [messages, setMessages]       = useState([]);
  const [groups, setGroups]           = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [dmList, setDmList] = useState(() => {
    try {
      const raw = JSON.parse(sessionStorage.getItem("dmList") || localStorage.getItem("dmList") || "[]");
      const seen = new Set();
      return raw.filter(d => { const k = d.peer?.id || d.roomId; if (seen.has(k)) return false; seen.add(k); return true; });
    } catch { return []; }
  });
  const [announceMsgs, setAnnounceMsgs] = useState([]);
  const [aiMessages, setAiMessages]   = useState([{
    id: "welcome", role: "assistant",
    content: "👋 Hi! I'm your AI interview coach.\n\nI can help you with:\n• DSA problems & Big O analysis\n• System design interviews\n• Behavioral questions (STAR method)\n• Code review & optimization\n\nWhat would you like to work on?",
  }]);

  // UI state
  const [text, setText]               = useState("");
  const [typingUsers, setTypingUsers] = useState({});
  const [aiLoading, setAiLoading]     = useState(false);
  const [replyTo, setReplyTo]         = useState(null);
  const [editMsg, setEditMsg]         = useState(null);
  const [pinnedMsgs, setPinnedMsgs]   = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showGroupSettings, setShowGroupSettings] = useState(false);
  const [collapsed, setCollapsed]     = useState({ dms: false, groups: false });
  const [rightPanel, setRightPanel]   = useState(null); // members | pinned
  const [showMembers, setShowMembers] = useState(false);

  const [groupUnread, setGroupUnread] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("groupUnread") || "{}"); } catch { return {}; }
  });
  const [allUsers, setAllUsers]       = useState([]);

  const socketRef   = useRef(null);
  const messagesEnd = useRef(null);
  const typingTimer = useRef(null);
  const isTypingRef = useRef(false);

  const userId = user?.user_id?.toString() || user?._id?.toString() || "";
  const token  = tokenStore.get() || "";
  const myName = user?.name || "You";

  // expose navigate for avatar clicks inside Message component
  useEffect(() => {
    window.__navigateToProfile = (uid) => {
      if (uid === userId) { navigate("/myprofile"); return; }
      // lookup username from allUsers stored in window
      const found = window.__allUsers?.find(u => (u._id || u.id) === uid);
      const username = found?.username;
      if (username) navigate(`/profile/${username}`);
      else navigate(`/profile/${uid}`); // fallback
    };
    return () => { delete window.__navigateToProfile; };
  }, [userId, navigate]);

  // Keep allUsers accessible to the global navigate helper
  useEffect(() => { window.__allUsers = allUsers; }, [allUsers]);

  const isAdmin = view === "announcement"
    ? (user?.roles?.includes("admin") || false)
    : view === "group" && activeGroup
      ? activeGroup.members?.some(m => getUserId(m.user) === userId && m.role === "admin")
      : false;

  const isReadonly = view === "announcement" && !isAdmin;

  const scrollBottom = () => setTimeout(() => messagesEnd.current?.scrollIntoView({ behavior: "smooth" }), 60);

  // ── Socket ───────────────────────────────────────────────────
  useEffect(() => {
    if (!userId) return; // wait for auth
    let active = true;
    const s = io(SOCKET_URL, { transports: ["websocket"], withCredentials: true, auth: { token } });
    socketRef.current = s;

    s.on("connect", () => {
      if (!active) return;
      s.emit("identify", { name: myName });
      s.emit("joinGroup", "announcements");
      // Auto-join all existing DM rooms so messages arrive even without clicking
      try {
        const saved = JSON.parse(sessionStorage.getItem("dmList") || "[]");
        saved.forEach(d => {
          if (d.peer?.id) s.emit("joinDM", { peerId: d.peer.id });
        });
      } catch {}
    });

    s.on("presence:update", setOnlineUsers);

    s.on("userTyping", ({ user: u, isTyping }) => {
      setTypingUsers(prev => {
        const c = { ...prev };
        if (isTyping) c[u.id] = u;
        else delete c[u.id];
        return c;
      });
    });

    s.on("newMessage", msg => {
      // Check if this message belongs to current view
      const currentDMRoom = view === "dm" && activePeer
        ? "dm_" + [userId, activePeer?.id].sort().join("_") : null;
      const currentGroupId = activeGroup?._id;
      const msgRoom = msg.roomId || msg.groupId;

      const isCurrentRoom = msgRoom === currentDMRoom || msgRoom === currentGroupId
        || msgRoom === "announcements";

      if (isCurrentRoom || !msgRoom) {
        setMessages(prev => {
          const withoutTemp = prev.filter(m =>
            !(m._id?.startsWith("tmp-") && m.message === msg.message && getUserId(m.user) === getUserId(msg.user))
          );
          if (withoutTemp.some(m => m._id === msg._id)) return withoutTemp;
          return [...withoutTemp, msg];
        });
        scrollBottom();
      }

      // Track group unread
      if (msg.groupId && msg.groupId !== "announcements") {
        const isFromMe = getUserId(msg.user) === userId;
        if (!isFromMe) {
          setGroupUnread(prev => {
            if (window.__activeGroupId === msg.groupId) return prev;
            return { ...prev, [msg.groupId]: (prev[msg.groupId] || 0) + 1 };
          });
        }
      }
    });

    s.on("messageReaction", ({ msgId, reactions }) => {
      setMessages(prev => prev.map(m => m._id === msgId ? { ...m, reactions } : m));
    });
    s.on("messageDeleted", ({ msgId }) => setMessages(prev => prev.filter(m => m._id !== msgId)));
    s.on("messageEdited",  ({ msgId, message, edited }) => {
      setMessages(prev => prev.map(m => m._id === msgId ? { ...m, message, edited } : m));
    });

    s.on("dmNotification", ({ from, roomId }) => {
      setDmList(prev => {
        const exists = prev.find(d => d.roomId === roomId);
        // Only increment if not currently viewing this DM
        const isViewing = window.__activeDMRoomId === roomId;
        const increment = isViewing ? 0 : 1;
        if (exists) return prev.map(d => d.roomId === roomId ? { ...d, unread: (d.unread || 0) + increment } : d);
        // Enrich from with username from allUsers
        const full = window.__allUsers?.find(u => (u._id || u.id) === from?.id);
        const enriched = full ? { id: full._id || full.id, name: full.name, username: full.username, avatar: full.avatar } : from;
        return [{ roomId, peer: enriched, unread: increment }, ...prev];
      });
    });

    s.on("groupUpdated", (updatedGroup) => {
      setGroups(prev => prev.map(g => g._id === updatedGroup._id ? updatedGroup : g));
      if (activeGroup?._id === updatedGroup._id) setActiveGroup(updatedGroup);
    });

    return () => { active = false; s.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // ── Persist groupUnread ──────────────────────────────────────
  useEffect(() => {
    try { sessionStorage.setItem("groupUnread", JSON.stringify(groupUnread)); } catch {}
    try { localStorage.setItem("groupUnread", JSON.stringify(groupUnread)); } catch {}
  }, [groupUnread]);

  // ── Persist dmList unread ────────────────────────────────────
  useEffect(() => {
    try { sessionStorage.setItem("dmList", JSON.stringify(dmList)); } catch {}
    try { localStorage.setItem("dmList", JSON.stringify(dmList)); } catch {}
  }, [dmList]);

  // ── Expose active group/DM ids for unread tracking ──────────
  useEffect(() => {
    window.__activeGroupId  = view === "group" ? activeGroup?._id : null;
    window.__activeDMRoomId = view === "dm" && activePeer
      ? "dm_" + [userId, activePeer.id].sort().join("_") : null;
    if (view === "group" && activeGroup?._id) {
      setGroupUnread(prev => { const n = { ...prev }; delete n[activeGroup._id]; return n; });
    }
  }, [view, activeGroup?._id, activePeer?.id]);

  // ── Persist dmList — deduplicate on save ────────────────────
  useEffect(() => {
    const seen = new Set();
    const deduped = dmList.filter(d => {
      const key = d.peer?.id || d.roomId;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    try { sessionStorage.setItem("dmList", JSON.stringify(deduped)); } catch {}
  }, [dmList]);
  useEffect(() => {
    API.get("/chat/announcements").then(r => setAnnounceMsgs(r.data || [])).catch(() => {});
  }, []);

  // ── Fetch all users (for DM search + group add) ─────────────
  useEffect(() => {
    if (!userId) return;
    API.get("/users/all", { headers: { "Cache-Control": "no-cache" }, params: { _t: Date.now() } })
      .then(r => {
        if (!Array.isArray(r.data)) return;
        setAllUsers(r.data);
        // Enrich any dmList entries that are missing username
        setDmList(prev => prev.map(d => {
          const full = r.data.find(u => (u._id || u.id) === d.peer?.id);
          if (!full) return d;
          return { ...d, peer: { ...d.peer, username: full.username, avatar: full.avatar, name: full.name } };
        }));
      })
      .catch(() => {});
  }, [userId]);

  // ── Clear stale groupUnread on mount ────────────────────────
  useEffect(() => {
    if (!groups.length) return;
    // Remove any stale keys that don't belong to current groups
    setGroupUnread(prev => {
      const validIds = groups.map(g => g._id);
      const cleaned = {};
      for (const id of validIds) {
        if (prev[id]) cleaned[id] = prev[id];
      }
      return cleaned;
    });
  }, [groups]);
  useEffect(() => {
    if (!userId) return;
    API.get("/groups").then(r => setGroups(r.data || [])).catch(() => {});
  }, [userId]);

  // ── Fetch messages on view/room change ───────────────────────
  useEffect(() => {
    if (view === "ai" || view === "announcement") return;
    if (!userId) return; // wait for auth
    const controller = new AbortController();

    const roomId = view === "dm" && activePeer
      ? "dm_" + [userId, activePeer.id].sort().join("_")
      : activeGroup?._id;

    if (!roomId) return;
    setMessages([]);

    const url = view === "group"
      ? `/groups/${roomId}/messages`
      : `/chat/${roomId}`;

    API.get(url, { signal: controller.signal })
      .then(r => { if (!controller.signal.aborted) { setMessages(r.data || []); scrollBottom(); } })
      .catch(err => { if (err?.name !== "CanceledError" && err?.name !== "AbortError") console.error(err); });

    return () => controller.abort();
  }, [view, activeGroup?._id, activePeer?.id, userId]);

  // ── Switch to group ──────────────────────────────────────────
  const switchGroup = (group) => {
    if (activeGroup) socketRef.current?.emit("leaveGroup", activeGroup._id);
    socketRef.current?.emit("joinGroup", group._id);
    setActiveGroup(group);
    setView("group");
    setMessages([]);
    setReplyTo(null);
    setRightPanel(null);
    setGroupUnread(prev => { const n = { ...prev }; delete n[group._id]; return n; });
  };

  // ── Open DM ──────────────────────────────────────────────────
  const openDM = (peer) => {
    const id = peer._id || peer.id;
    const fullUser = allUsers.find(u => (u._id || u.id) === id);
    const enrichedPeer = {
      id,
      name:     fullUser?.name     || peer.name,
      username: fullUser?.username || peer.username || null,
      avatar:   fullUser?.avatar   || peer.avatar   || null,
    };
    const roomId = "dm_" + [userId, id].sort().join("_");
    window.__activeDMRoomId = roomId;
    setActivePeer(enrichedPeer);
    setView("dm");
    setMessages([]);
    setRightPanel(null);
    // Join the DM room via socket so real-time messages work
    socketRef.current?.emit("joinDM", { peerId: id, roomId });
    // Clear unread for this DM
    setDmList(prev => {
      const exists = prev.find(d => d.peer?.id === id);
      const updated = exists
        ? prev.map(d => d.peer?.id === id ? { ...d, peer: enrichedPeer, unread: 0 } : d)
        : [{ roomId, peer: enrichedPeer, unread: 0 }, ...prev];
      // deduplicate
      const seen = new Set();
      return updated.filter(d => { const k = d.peer?.id || d.roomId; if (seen.has(k)) return false; seen.add(k); return true; });
    });
  };

  // ── Send ─────────────────────────────────────────────────────
  const onSend = async () => {
    if (!text.trim()) return;
    if (view === "ai") { sendAI(); return; }
    if (isReadonly) return;

    const roomId = view === "dm" && activePeer
      ? "dm_" + [userId, activePeer.id].sort().join("_")
      : view === "group" ? activeGroup?._id
      : "announcements";

    if (!roomId) return;

    if (editMsg) {
      const updated = text.trim();
      setMessages(prev => prev.map(m => m._id === editMsg._id ? { ...m, message: updated, edited: true } : m));
      socketRef.current?.emit("editMessage", { msgId: editMsg._id, message: updated, groupId: roomId });
      try { await API.patch(`/chat/${editMsg._id}`, { message: updated }); } catch {}
      setText(""); setEditMsg(null);
      return;
    }

    const temp = {
      _id: `tmp-${Date.now()}`, message: text.trim(),
      user: { _id: userId, name: myName }, createdAt: new Date().toISOString(), replyTo: replyTo || null,
    };
    setMessages(p => [...p, temp]);
    if (view === "announcement") setAnnounceMsgs(p => [...p, temp]);
    scrollBottom();

    if (view === "dm") {
      const roomId = "dm_" + [userId, activePeer?.id].sort().join("_");
      socketRef.current?.emit("directMessage", { toId: activePeer?.id, roomId, message: text.trim(), type: "text" });
    } else {
      socketRef.current?.emit("groupMessage", { groupId: roomId, message: text.trim(), type: "text", replyTo: replyTo?._id || null });
    }

    setText(""); setReplyTo(null);
  };

  // ── AI ───────────────────────────────────────────────────────
  const sendAI = async () => {
    const userMsg = text.trim();
    setAiMessages(p => [...p, { id: Date.now(), role: "user", content: userMsg }]);
    setText(""); setAiLoading(true); scrollBottom();
    try {
      const res = await API.post("/chat/ai", { message: userMsg });
      setAiMessages(p => [...p, { id: Date.now() + 1, role: "assistant", content: res.data.reply }]);
    } catch {
      setAiMessages(p => [...p, { id: Date.now() + 1, role: "assistant", content: "Sorry, I'm having trouble right now!" }]);
    } finally { setAiLoading(false); scrollBottom(); }
  };

  // ── Typing ───────────────────────────────────────────────────
  const handleTyping = val => {
    setText(val);
    if (view === "ai") return;
    const room = view === "dm" ? "dm_" + [userId, activePeer?.id].sort().join("_")
      : view === "group" ? activeGroup?._id : "announcements";
    if (!room) return;
    if (!isTypingRef.current) { isTypingRef.current = true; socketRef.current?.emit("typing", { groupId: room, isTyping: true }); }
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => { isTypingRef.current = false; socketRef.current?.emit("typing", { groupId: room, isTyping: false }); }, 1500);
  };

  // ── Reactions ────────────────────────────────────────────────
  const handleReact = (msgId, emoji) => {
    const roomId = view === "dm" ? "dm_" + [userId, activePeer?.id].sort().join("_") : activeGroup?._id || "announcements";
    setMessages(prev => prev.map(m => {
      if (m._id !== msgId) return m;
      const reactions = { ...(m.reactions || {}) };
      const users = reactions[emoji] || [];
      if (users.includes(userId)) reactions[emoji] = users.filter(u => u !== userId);
      else reactions[emoji] = [...users, userId];
      if (!reactions[emoji]?.length) delete reactions[emoji];
      return { ...m, reactions };
    }));
    socketRef.current?.emit("reactToMessage", { msgId, emoji, groupId: roomId });
    try { API.post(`/chat/${msgId}/react`, { emoji }); } catch {}
  };

  // ── Pin ──────────────────────────────────────────────────────
  const handlePin = msg => setPinnedMsgs(prev => prev.find(m => m._id === msg._id) ? prev.filter(m => m._id !== msg._id) : [...prev, msg]);

  // ── Delete ───────────────────────────────────────────────────
  const handleDelete = msgId => {
    const roomId = view === "dm" ? "dm_" + [userId, activePeer?.id].sort().join("_") : activeGroup?._id || "announcements";
    setMessages(prev => prev.filter(m => m._id !== msgId));
    socketRef.current?.emit("deleteMessage", { msgId, groupId: roomId });
    try { API.delete(`/chat/${msgId}`); } catch {}
  };

  // ── Edit ─────────────────────────────────────────────────────
  const handleEdit = msg => { setEditMsg(msg); setText(msg.message); };

  // ── Create group ─────────────────────────────────────────────
  const handleCreateGroup = async (data) => {
    const res = await API.post("/groups", data);
    setGroups(prev => [res.data, ...prev]);
    switchGroup(res.data);
  };

  // ── Group settings actions ───────────────────────────────────
  const handleUpdateGroup = async (data) => {
    const res = await API.patch(`/groups/${activeGroup._id}`, data);
    setGroups(prev => prev.map(g => g._id === res.data._id ? res.data : g));
    setActiveGroup(res.data);
    setShowGroupSettings(false);
  };

  const handleLeaveGroup = async () => {
    await API.delete(`/groups/${activeGroup._id}/members/${userId}`);
    setGroups(prev => prev.filter(g => g._id !== activeGroup._id));
    setActiveGroup(null); setView("announcement"); setShowGroupSettings(false);
  };

  const handleDeleteGroup = async () => {
    await API.delete(`/groups/${activeGroup._id}`);
    setGroups(prev => prev.filter(g => g._id !== activeGroup._id));
    setActiveGroup(null); setView("announcement"); setShowGroupSettings(false);
  };

  const handleAddMembers = async (memberIds) => {
    const res = await API.post(`/groups/${activeGroup._id}/members`, { userIds: memberIds });
    setGroups(prev => prev.map(g => g._id === res.data._id ? res.data : g));
    setActiveGroup(res.data);
  };

  const handleRemoveMember = async (memberId) => {
    const res = await API.delete(`/groups/${activeGroup._id}/members/${memberId}`);
    if (res.data.deleted) { setGroups(prev => prev.filter(g => g._id !== activeGroup._id)); setActiveGroup(null); setView("announcement"); }
    else { setGroups(prev => prev.map(g => g._id === res.data._id ? res.data : g)); setActiveGroup(res.data); }
  };

  const handleMakeAdmin = async (memberId) => {
    const res = await API.patch(`/groups/${activeGroup._id}/members/${memberId}/admin`);
    setGroups(prev => prev.map(g => g._id === res.data._id ? res.data : g));
    setActiveGroup(res.data);
  };

  // ── Grouped messages ─────────────────────────────────────────
  const displayMessages = view === "announcement" ? announceMsgs : messages;
  const groupedMessages = displayMessages.reduce((acc, msg, i) => {
    const d = new Date(msg.createdAt).toDateString();
    const prevD = displayMessages[i - 1] ? new Date(displayMessages[i - 1].createdAt).toDateString() : null;
    if (d !== prevD) acc.push({ type: "date", date: new Date(msg.createdAt).toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }), key: `date-${i}` });
    acc.push({ type: "msg", msg, i });
    return acc;
  }, []);

  const typingList  = Object.values(typingUsers).filter(u => u.id !== userId);
  const otherOnline = onlineUsers.filter(u => u.id !== userId);

  const totalDMUnread    = dmList.reduce((s, d) => s + (d.unread || 0), 0);
  const totalGroupUnread = Object.values(groupUnread).reduce((s, v) => s + v, 0);
  const totalUnread      = totalDMUnread + totalGroupUnread;

  // ── Update page title with unread count ──────────────────────
  useEffect(() => {
    document.title = totalUnread > 0 ? `(${totalUnread}) PrepVision AI` : "PrepVision AI";
    window.dispatchEvent(new Event("chatUnreadUpdate"));
    return () => { document.title = "PrepVision AI"; };
  }, [totalUnread]);

  // Expose totalUnread for Navbar badge
  useEffect(() => { window.__chatUnread = totalUnread; }, [totalUnread]);
  const offlineDMs  = dmList.filter(d => !otherOnline.find(u => u.id === d.peer?.id));

  // ── Render DM item in sidebar ────────────────────────────────
  const renderDMItem = (d) => {
    const isOnline = otherOnline.some(u => u.id === d.peer?.id);
    const isActive = view === "dm" && activePeer?.id === d.peer?.id;
    return (
      <div key={d.roomId} className="group relative">
        <button onClick={() => openDM(d.peer)}
          className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-all"
          style={{ background: isActive ? "rgba(99,102,241,0.1)" : "transparent" }}>
          <div className="relative shrink-0">
            <Avatar name={d.peer?.name} size={28} avatar={d.peer?.avatar} />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
              style={{ backgroundColor: isOnline ? "#22c55e" : "#6b7280", borderColor: "var(--bg-card)" }} />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>{d.peer?.name}</p>
            <p className="text-[10px]" style={{ color: isOnline ? "#22c55e" : "var(--text-secondary)" }}>
              {isOnline ? "● Online" : "○ Offline"}
            </p>
          </div>
          {d.unread > 0 && (
            <span className="w-5 h-5 rounded-full text-[9px] font-black text-white flex items-center justify-center shrink-0"
              style={{ background: "var(--accent)" }}>{d.unread > 9 ? "9+" : d.unread}</span>
          )}
        </button>
        <button onClick={() => window.__navigateToProfile?.(d.peer?.id)}
          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all px-2 py-0.5 rounded-lg text-[10px] font-bold"
          style={{ background: "rgba(99,102,241,0.15)", color: "var(--accent)" }}>
          Profile
        </button>
      </div>
    );
  };

  // ── Header info ──────────────────────────────────────────────
  const headerName = view === "announcement" ? "Announcements" : view === "ai" ? "AI Coach"
    : view === "myspace" ? "My Space"
    : view === "dm" ? activePeer?.name : activeGroup?.name || "Select a group";
  const headerDesc = view === "announcement" ? "System announcements only" : view === "ai" ? "Groq-powered interview assistant"
    : view === "myspace" ? "Private notes — only visible to you"
    : view === "dm" ? "Direct Message" : activeGroup?.description || "";

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <Navbar />
      <div className="flex-1 flex overflow-hidden min-h-0">

        {/* ══ SIDEBAR ══════════════════════════════════════════ */}
        <aside className="w-64 flex flex-col border-r shrink-0" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">

            {/* Total unread summary */}
            {totalUnread > 0 && (
              <div className="mx-2 mb-2 px-3 py-2 rounded-xl flex items-center gap-2"
                style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0"
                  style={{ background: "var(--accent)" }}>{totalUnread > 99 ? "99+" : totalUnread}</div>
                <span className="text-xs font-bold" style={{ color: "var(--accent)" }}>unread message{totalUnread > 1 ? "s" : ""}</span>
              </div>
            )}

            {/* 📝 My Space */}
            <button onClick={() => { setView("myspace"); setActiveGroup(null); setActivePeer(null); setMessages([]); }}
              className="mx-2 flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 transition-all"
              style={{ background: view === "myspace" ? "rgba(99,102,241,0.12)" : "transparent" }}>
              <div className="w-7 h-7 rounded-xl flex items-center justify-center text-base shrink-0"
                style={{ background: "rgba(99,102,241,0.15)" }}>📝</div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs font-bold" style={{ color: view === "myspace" ? "var(--accent)" : "var(--text-primary)" }}>My Space</p>
                <p className="text-[10px] opacity-50" style={{ color: "var(--text-secondary)" }}>Notes & reminders</p>
              </div>
            </button>

            {/* Announcements */}
            <button onClick={() => { setView("announcement"); setActiveGroup(null); setActivePeer(null); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all mb-1"
              style={{ background: view === "announcement" ? "rgba(245,158,11,0.12)" : "transparent" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                style={{ background: view === "announcement" ? "rgba(245,158,11,0.2)" : "rgba(245,158,11,0.08)" }}>📢</div>
              <div className="text-left leading-tight flex-1 min-w-0">
                <div className="text-xs font-bold truncate" style={{ color: view === "announcement" ? "#f59e0b" : "var(--text-secondary)" }}>Announcements</div>
                <div className="text-[10px] opacity-50">System updates only</div>
              </div>
            </button>

            {/* AI Coach */}
            <button onClick={() => { setView("ai"); setActiveGroup(null); setActivePeer(null); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all mb-1"
              style={{ background: view === "ai" ? "rgba(99,102,241,0.15)" : "transparent" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                style={{ background: view === "ai" ? "var(--accent)" : "rgba(99,102,241,0.12)" }}>🤖</div>
              <div className="text-left leading-tight flex-1 min-w-0">
                <div className="text-xs font-bold" style={{ color: view === "ai" ? "var(--accent)" : "var(--text-secondary)" }}>AI Coach</div>
                <div className="text-[10px] opacity-50">Interview assistant</div>
              </div>
              <HiOutlineSparkles size={12} className="opacity-60 shrink-0" />
            </button>

            <div className="border-t mx-1 my-2" style={{ borderColor: "var(--border-color)" }} />

            {/* DMs */}
            <button onClick={() => setCollapsed(p => ({ ...p, dms: !p.dms }))}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
              style={{ color: "var(--text-secondary)" }}>
              <div className="flex items-center gap-1.5">
                {collapsed.dms ? <FiChevronRight size={10} /> : <FiChevronDown size={10} />}
                <span className="text-[10px] font-black uppercase tracking-widest">Direct Messages</span>
              </div>
              {totalDMUnread > 0 && (
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full text-white"
                  style={{ background: "var(--accent)" }}>{totalDMUnread > 99 ? "99+" : totalDMUnread}</span>
              )}
            </button>
            {!collapsed.dms && (
              <>
                {/* Recent DM conversations */}
                {/* Recent DMs - split into received and sent */}
                {dmList.length > 0 && (
                  <div className="px-2 mb-1">
                    {/* People who messaged you (unread first) */}
                    {dmList.filter(d => d.unread > 0).length > 0 && (
                      <p className="text-[9px] font-black uppercase tracking-widest px-1 py-1 opacity-40"
                        style={{ color: "var(--text-secondary)" }}>Unread</p>
                    )}
                    {dmList.filter(d => d.unread > 0).map(d => renderDMItem(d))}

                    {/* All recent conversations */}
                    {dmList.filter(d => !d.unread || d.unread === 0).length > 0 && (
                      <p className="text-[9px] font-black uppercase tracking-widest px-1 py-1 opacity-40 mt-1"
                        style={{ color: "var(--text-secondary)" }}>Recent</p>
                    )}
                    {dmList.filter(d => !d.unread || d.unread === 0).map(d => renderDMItem(d))}
                  </div>
                )}
                {/* Search all users for DM */}
                <DMSearch allUsers={allUsers.filter(u => (u._id || u.id) !== userId)} onlineUsers={otherOnline} onOpen={openDM} activePeerId={activePeer?.id} dmList={dmList} />
              </>
            )}

            <div className="border-t mx-1 my-2" style={{ borderColor: "var(--border-color)" }} />

            {/* Groups */}
            <div className="flex items-center">
              <button onClick={() => setCollapsed(p => ({ ...p, groups: !p.groups }))}
                className="flex-1 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
                style={{ color: "var(--text-secondary)" }}>
                {collapsed.groups ? <FiChevronRight size={10} /> : <FiChevronDown size={10} />}
                <span className="text-[10px] font-black uppercase tracking-widest">Groups</span>
                {totalGroupUnread > 0 && (
                  <span className="ml-1 text-[9px] font-black px-1.5 py-0.5 rounded-full text-white"
                    style={{ background: "var(--accent)" }}>{totalGroupUnread > 99 ? "99+" : totalGroupUnread}</span>
                )}
              </button>
              <button onClick={() => setShowCreateGroup(true)}
                className="w-6 h-6 mr-2 rounded flex items-center justify-center hover:bg-white/10 transition-all"
                style={{ color: "var(--text-secondary)" }} title="Create group"><FiPlus size={11} /></button>
            </div>
            {!collapsed.groups && (
              <>
                {groups.length === 0 && (
                  <p className="text-[10px] px-3 py-2 opacity-30" style={{ color: "var(--text-secondary)" }}>No groups yet — create one!</p>
                )}
                {groups.map(g => {
                  const active = view === "group" && activeGroup?._id === g._id;
                  const unread = groupUnread[g._id] || 0;
                  return (
                    <button key={g._id} onClick={() => switchGroup(g)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 transition-all"
                      style={{ background: active ? "rgba(99,102,241,0.12)" : "transparent" }}>
                      <Avatar name={g.name} size={26} emoji={g.avatar} />
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-xs font-semibold truncate" style={{ color: active ? "var(--text-primary)" : "var(--text-secondary)" }}>{g.name}</p>
                        <p className="text-[10px] truncate opacity-50">{g.members?.length || 0} members</p>
                      </div>
                      {unread > 0 && (
                        <span className="w-5 h-5 rounded-full text-[10px] font-black text-white flex items-center justify-center shrink-0"
                          style={{ background: "var(--accent)" }}>{unread > 99 ? "99+" : unread}</span>
                      )}
                      {active && unread === 0 && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--accent)" }} />}
                    </button>
                  );
                })}
              </>
            )}
          </div>

          {/* Profile footer */}
          <div className="p-3 border-t cursor-pointer hover:bg-white/5 transition-all"
            style={{ borderColor: "var(--border-color)" }}
            onClick={() => navigate("/myprofile")}>
            <div className="flex items-center gap-2.5">
              <Avatar name={myName} size={34} status="online" avatar={user?.avatar} />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-black truncate" style={{ color: "var(--text-primary)" }}>{myName}</div>
                <div className="text-[10px] font-semibold" style={{ color: "#22c55e" }}>● Online</div>
              </div>
            </div>
          </div>
        </aside>

        {/* ══ MAIN ═════════════════════════════════════════════ */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-2.5 border-b shrink-0"
            style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            <div className="flex items-center gap-3 min-w-0">
              {view === "announcement" ? (
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: "rgba(245,158,11,0.1)" }}>📢</div>
              ) : view === "ai" ? (
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: "rgba(99,102,241,0.12)" }}>🤖</div>
              ) : view === "dm" && activePeer ? (
                <Avatar name={activePeer.name} size={36} status="online" avatar={activePeer.avatar}
                  onClick={() => window.__navigateToProfile?.(activePeer.id)} />
              ) : view === "group" && activeGroup ? (
                <Avatar name={activeGroup.name} size={36} emoji={activeGroup.avatar} />
              ) : (
                <div className="w-9 h-9 rounded-xl" style={{ background: "var(--bg-primary)" }} />
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-black text-sm truncate">{headerName}</h2>
                  {isReadonly && (
                    <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full border shrink-0"
                      style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.2)", color: "#f59e0b" }}>READ ONLY</span>
                  )}
                </div>
                <p className="text-[11px] truncate" style={{ color: "var(--text-secondary)" }}>{headerDesc}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {view === "group" && activeGroup && (
                <>
                  <button onClick={() => setShowMembers(v => !v)} title="Members"
                    className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
                    style={{ color: showMembers ? "var(--accent)" : "var(--text-secondary)" }}><FiUsers size={15} /></button>
                  <button onClick={() => setShowGroupSettings(true)} title="Settings"
                    className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
                    style={{ color: "var(--text-secondary)" }}><FiSettings size={14} /></button>
                </>
              )}
              {view === "dm" && activePeer && (
                <>
                  <button title="Voice call" className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
                    style={{ color: "var(--text-secondary)" }}><FiPhone size={14} /></button>
                  <button title="Video call" className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
                    style={{ color: "var(--text-secondary)" }}><FiVideo size={14} /></button>
                </>
              )}
              {view === "channels" && (
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(16,185,129,0.08)", color: "#10b981" }}>● {onlineUsers.length} online</span>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 flex overflow-hidden min-h-0">
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto" style={{ background: "var(--bg-primary)" }}>

                {/* Empty state */}
                {view !== "ai" && displayMessages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full gap-4 select-none" style={{ opacity: 0.2 }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
                      style={{ background: "rgba(99,102,241,0.08)" }}>
                      {view === "dm" && !activePeer ? "💬" : view === "group" && !activeGroup ? "👥" : "💬"}
                    </div>
                    <div className="text-center">
                      <p className="font-black text-sm">
                        {view === "dm" && !activePeer ? "Select someone to message"
                          : view === "group" && !activeGroup ? "Select or create a group"
                          : "No messages yet"}
                      </p>
                      <p className="text-xs mt-1">Start the conversation!</p>
                    </div>
                  </div>
                )}

                {/* Channel/Group/Announcement messages */}
                {view !== "ai" && view !== "dm" && (
                  <div className="py-2">
                    {groupedMessages.map(item =>
                      item.type === "date"
                        ? <DateDivider key={item.key} date={item.date} />
                        : (
                          <Message key={item.msg._id} msg={item.msg}
                            isMe={getUserId(item.msg.user) === userId || getUserName(item.msg.user) === myName}
                            showHeader={(() => {
                              const prev = displayMessages[item.i - 1];
                              return !prev || getUserId(prev.user) !== getUserId(item.msg.user)
                                || (new Date(item.msg.createdAt) - new Date(prev.createdAt)) > 300_000;
                            })()}
                            isAnnounce={view === "announcement"}
                            onReact={handleReact} onReply={setReplyTo}
                            onPin={handlePin} onDelete={handleDelete} onEdit={handleEdit}
                          />
                        )
                    )}
                  </div>
                )}

                {/* DM messages */}
                {view === "dm" && activePeer && (
                  <div className="px-6 py-4 space-y-3">
                    {messages.map(m => (
                      <DMMsg key={m._id} msg={m} isMe={getUserId(m.user) === userId || getUserName(m.user) === myName} onReact={handleReact} />
                    ))}
                  </div>
                )}

                {/* My Space */}
                {view === "myspace" && (
                  <MySpace userId={userId} myName={myName} />
                )}

                {/* AI messages */}
                {view === "ai" && (
                  <div className="px-6 py-4 space-y-5">
                    {aiMessages.map(m => (
                      <motion.div key={m.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                        {m.role === "assistant"
                          ? <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg border shrink-0"
                              style={{ background: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.2)" }}>🤖</div>
                          : <Avatar name={myName} size={36} />}
                        <div className="max-w-2xl px-4 py-3 text-sm leading-relaxed"
                          style={{
                            background: m.role === "user" ? "var(--accent)" : "var(--bg-card)",
                            color: m.role === "user" ? "#fff" : "var(--text-primary)",
                            borderRadius: m.role === "user" ? "1.2rem 1.2rem 0.2rem 1.2rem" : "0.2rem 1.2rem 1.2rem 1.2rem",
                            whiteSpace: "pre-wrap",
                          }}>{m.content}</div>
                      </motion.div>
                    ))}
                    {aiLoading && (
                      <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg border shrink-0"
                          style={{ background: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.2)" }}>🤖</div>
                        <div className="px-4 py-3.5 flex gap-1.5 items-center"
                          style={{ background: "var(--bg-card)", borderRadius: "0.2rem 1.2rem 1.2rem 1.2rem" }}>
                          {[0,1,2].map(i => <span key={i} className="w-2 h-2 rounded-full animate-bounce"
                            style={{ background: "var(--accent)", animationDelay: `${i * 0.15}s` }} />)}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Typing */}
                {typingList.length > 0 && view !== "ai" && (
                  <div className="flex items-center gap-2 px-6 pb-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                    <div className="flex gap-1">
                      {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ background: "var(--text-secondary)", animationDelay: `${i * 0.12}s` }} />)}
                    </div>
                    <span className="font-bold">{typingList.map(u => u.name).join(", ")}</span>
                    {typingList.length === 1 ? " is" : " are"} typing...
                  </div>
                )}
                <div ref={messagesEnd} />
              </div>

              {/* Input */}
              {isReadonly ? (
                <div className="px-5 py-3 border-t text-center shrink-0"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>📢 Read-only · Only admins can post here</p>
                </div>
              ) : (view === "ai" || view === "announcement" || (view === "dm" && activePeer) || (view === "group" && activeGroup)) && (
                <>
                  {view === "ai" && (
                    <div className="px-4 pt-3 flex gap-2 flex-wrap" style={{ background: "var(--bg-card)" }}>
                      {["Explain Big O", "System design tips", "React hooks", "Binary search", "STAR method", "Mock question"].map(q => (
                        <button key={q} onClick={() => setText(q)}
                          className="px-3 py-1 rounded-full text-xs font-semibold border hover:border-indigo-400/50 hover:text-indigo-400 transition-all"
                          style={{ background: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>{q}</button>
                      ))}
                    </div>
                  )}
                  {view !== "myspace" && <ChatInput value={text} onChange={handleTyping} onSend={onSend}
                    placeholder={
                      view === "ai" ? "Ask your AI coach anything..."
                      : view === "dm" ? `Message ${activePeer?.name}...`
                      : view === "group" ? `Message ${activeGroup?.name}...`
                      : "Post announcement..."
                    }
                    members={view === "group" ? activeGroup?.members || [] : []}
                    onAttach={(att) => {
                      // For now show attachment as message with file info
                      // Full upload can be added with Cloudinary later
                      const msg = att.type === "image"
                        ? `[📷 Image: ${att.name}]`
                        : att.type === "video"
                        ? `[🎬 Video: ${att.name}]`
                        : `[📄 File: ${att.name} (${att.size})]`;
                      setText(prev => prev ? prev + " " + msg : msg);
                    }}
                    replyTo={replyTo} onCancelReply={() => setReplyTo(null)}
                    editMsg={editMsg} onCancelEdit={() => { setEditMsg(null); setText(""); }} />}
                </>
              )}
            </div>

            {/* Members sidebar for groups */}
            <AnimatePresence>
              {showMembers && view === "group" && activeGroup && (
                <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="w-56 border-l flex flex-col shrink-0"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                  <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--border-color)" }}>
                    <div className="flex items-center gap-2">
                      <FiUsers size={13} style={{ color: "var(--accent)" }} />
                      <span className="font-black text-xs">Members</span>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
                        style={{ background: "rgba(99,102,241,0.1)", color: "var(--accent)" }}>{activeGroup.members?.length}</span>
                    </div>
                    <button onClick={() => setShowMembers(false)}
                      className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-white/10"
                      style={{ color: "var(--text-secondary)" }}><FiX size={12} /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2">
                    {activeGroup.members?.map(m => {
                      const u = m.user;
                      const isOnline = onlineUsers.some(o => o.id === getUserId(u));
                      return (
                        <div key={getUserId(u)} className="flex items-center gap-2.5 px-2 py-2 rounded-xl">
                          <Avatar name={getUserName(u)} size={28} status={isOnline ? "online" : "offline"} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>{getUserName(u)}</p>
                            <p className="text-[10px]" style={{ color: m.role === "admin" ? "var(--accent)" : isOnline ? "#22c55e" : "var(--text-secondary)" }}>
                              {m.role === "admin" ? "Admin" : isOnline ? "Online" : "Offline"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Modals */}
      {showCreateGroup && (
        <CreateGroupModal allUsers={allUsers.filter(u => u._id !== userId)} onlineUsers={otherOnline}
          onClose={() => setShowCreateGroup(false)} onCreate={handleCreateGroup} />
      )}
      {showGroupSettings && activeGroup && (
        <GroupSettingsModal group={activeGroup}
          allUsers={allUsers.filter(u => u._id !== userId)}
          onlineUsers={otherOnline} userId={userId}
          onClose={() => setShowGroupSettings(false)}
          onUpdate={handleUpdateGroup} onLeave={handleLeaveGroup}
          onDelete={handleDeleteGroup} onAddMembers={handleAddMembers}
          onRemoveMember={handleRemoveMember} onMakeAdmin={handleMakeAdmin} />
      )}
    </div>
  );
}