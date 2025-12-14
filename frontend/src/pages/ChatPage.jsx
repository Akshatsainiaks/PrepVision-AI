// src/pages/ChatPage.jsx
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Navbar from "../components/Navbar";
import RoomsList from "../components/RoomsList";
import OnlineUsers from "../components/OnlineUsers";
import MessageBubble from "../components/MessageBubble";
import FileUploader from "../components/FileUploader";
import { API } from "../api/api";
import { FiSearch } from "react-icons/fi";

const SOCKET_URL = "http://localhost:4000";

export default function ChatPage() {
  const [activeRoom, setActiveRoom] = useState("global");
  const [rooms, setRooms] = useState([
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

  // ------------------------------------------
  // SOCKET CONNECT — RUNS ONCE
  // ------------------------------------------
  useEffect(() => {
    const s = io(SOCKET_URL, { auth: { token } });
    socketRef.current = s;

    s.on("connect", () => {
      s.emit("identify", { id: userId, name: myName });
      s.emit("joinGroup", activeRoom);
    });

    s.on("presence:update", (list) => setOnlineUsers(list));

    // typing indicator
    s.on("userTyping", ({ user, isTyping }) => {
      setTypingUsers((prev) => {
        const copy = { ...prev };
        if (isTyping) copy[user.id] = user;
        else delete copy[user.id];
        return copy;
      });
    });

    // ------------------------------
    // FIXED → Prevent duplicate messages
    // ------------------------------
    s.on("newMessage", (msg) => {
      // 🛑 Ignore message if already in UI
      if (messagesRef.current && document.getElementById(msg._id)) return;

      // 🛑 Ignore own message if optimistic UI already added it
      if (msg.user?._id === userId) return;

      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });

    // read receipts
    s.on("messagesRead", ({ messageIds, userId: reader }) => {
      setMessages((prev) =>
        prev.map((m) =>
          messageIds.includes(m._id)
            ? { ...m, readBy: [...new Set([...(m.readBy || []), reader])] }
            : m
        )
      );
    });

    return () => s.disconnect();
  }, []); // run once only

  // ------------------------------------------
  // LOAD MESSAGES WHEN ROOM CHANGES
  // ------------------------------------------
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

        // clear unread on switch
        setRooms((rs) =>
          rs.map((r) =>
            r.id === activeRoom ? { ...r, unread: 0 } : r
          )
        );

        // mark as read
        const unreadIds = normalized
          .filter((m) => !m.readBy.includes(userId))
          .map((m) => m._id);

        if (socketRef.current && unreadIds.length > 0) {
          socketRef.current.emit("readMessages", {
            groupId: activeRoom,
            messageIds: unreadIds,
            userId
          });
        }
      } catch (err) {
        console.error("load chat error", err);
      } finally {
        scrollToBottom();
      }
    };

    load();

    socketRef.current?.emit("leaveGroup", activeRoom); // safety
    socketRef.current?.emit("joinGroup", activeRoom);
  }, [activeRoom, userId]);

  // ------------------------------------------
  // SCROLL END
  // ------------------------------------------
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesRef.current?.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth"
      });
    }, 50);
  };

  // ------------------------------------------
  // SEND TEXT MESSAGE
  // ------------------------------------------
  const onSend = async () => {
    if (!text.trim()) return;

    const payload = {
      groupId: activeRoom,
      message: text,
      userId,
      type: "text",
      attachments: []
    };

    // optimistic UI
    const temp = {
      ...payload,
      _id: `tmp-${Date.now()}`,
      user: { _id: userId, name: myName },
      createdAt: new Date().toISOString(),
      readBy: [userId]
    };

    setMessages((p) => [...p, temp]);
    scrollToBottom();

    socketRef.current.emit("groupMessage", payload);

    try {
      await API.post("/chat", payload);
    } catch (e) {
      console.error("persist error", e);
    }

    setText("");
  };

  // ------------------------------------------
  // FILE UPLOAD
  // ------------------------------------------
  const onUpload = async (fileMeta) => {
    const attachment = {
      filename: fileMeta.filename,
      url: fileMeta.url,
      mime: fileMeta.mime,
      size: fileMeta.size
    };

    const payload = {
      groupId: activeRoom,
      message: "",
      type: "file",
      attachments: [attachment],
      userId
    };

    const temp = {
      ...payload,
      _id: `tmp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      user: { _id: userId, name: myName }
    };

    setMessages((p) => [...p, temp]);
    scrollToBottom();

    socketRef.current.emit("groupMessage", payload);

    try {
      await API.post("/chat", payload);
    } catch (e) {
      console.error("persist file error", e);
    }
  };

  // typing
  const onTyping = (v) => {
    setText(v);
    socketRef.current?.emit("typing", {
      groupId: activeRoom,
      isTyping: !!v.trim(),
      user: { id: userId, name: myName }
    });
  };

  const shown = messages.filter((m) =>
    search
      ? (m.message || "").toLowerCase().includes(search.toLowerCase())
      : true
  );

  const onStartDM = (otherId) => {
    const a = userId < otherId ? userId : otherId;
    const b = userId < otherId ? otherId : userId;
    const dmId = `dm_${a}_${b}`;

    setRooms((r) =>
      r.some((x) => x.id === dmId)
        ? r
        : [{ id: dmId, name: "Direct", desc: "Private DM" }, ...r]
    );
    setActiveRoom(dmId);
  };

  return (
    <>
    <Navbar />

    <div className="flex h-[85vh] bg-gray-950 text-white overflow-hidden">

      {/* LEFT SIDEBAR — ROOMS */}
      <div className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 
        shadow-[0_0_20px_rgba(120,64,255,0.2)] p-4 flex flex-col">

        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 
        text-transparent bg-clip-text">
          Chat Rooms
        </h3>

        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => setActiveRoom(room.id)}
            className={`p-3 mb-2 rounded-lg cursor-pointer transition 
            ${activeRoom === room.id
              ? "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg"
              : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <div className="font-semibold">{room.name}</div>
            <div className="text-xs text-gray-300">{room.desc}</div>
          </div>
        ))}
      </div>

      {/* MIDDLE CHAT */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="p-4 bg-white/10 backdrop-blur-xl border-b border-white/20 
          flex justify-between items-center shadow-lg">

          <div>
            <div className="text-lg font-bold">
              {rooms.find((r) => r.id === activeRoom)?.name}
            </div>
            <div className="text-xs text-gray-300">
              {rooms.find((r) => r.id === activeRoom)?.desc}
            </div>
          </div>

          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="pl-8 pr-3 py-2 rounded-lg bg-gray-900/40 border border-gray-700 
              placeholder-gray-400 text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <FiSearch className="absolute left-2 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* MESSAGES */}
        <div
          ref={messagesRef}
          className="flex-1 overflow-y-auto p-6 bg-gray-900/40 shadow-inner"
        >
          <div className="max-w-3xl mx-auto space-y-3">

            {shown.map((m) => (
              <div id={m._id} key={m._id}>
                <MessageBubble msg={m} currentUserId={userId} />
              </div>
            ))}

            {/* Typing Indicator */}
            {Object.keys(typingUsers).length > 0 && (
              <div className="text-gray-400 text-sm italic animate-pulse">
                {Object.values(typingUsers).map((u) => u.name).join(", ")} typing…
              </div>
            )}
          </div>
        </div>

        {/* INPUT BAR */}
        <div className="p-4 bg-white/10 backdrop-blur-xl border-t border-white/20 flex items-center gap-3">

          <FileUploader onUploaded={onUpload} />

          <input
            value={text}
            onChange={(e) => onTyping(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            className="flex-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
            placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Type a message..."
          />

          <button
            onClick={onSend}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 
            shadow-lg hover:shadow-purple-500/30 font-semibold"
          >
            Send
          </button>

        </div>
      </div>

      {/* ONLINE USERS — RIGHT SIDEBAR */}
      <div className="w-64 bg-white/10 backdrop-blur-xl border-l border-white/20 
        shadow-[0_0_20px_rgba(120,64,255,0.2)] p-4">

        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 
        text-transparent bg-clip-text">
          Online
        </h3>

        <OnlineUsers users={onlineUsers} onDM={onStartDM} />
      </div>
    </div>
  </>
  );
}
