// src/components/MessageBubble.jsx
import React from "react";
import dayjs from "dayjs";

export default function MessageBubble({ msg, currentUserId }) {
  const mine = msg.user && (msg.user._id === currentUserId || msg.user === currentUserId);
  const time = msg.createdAt ? dayjs(msg.createdAt).format("HH:mm") : "";
  const containerClass = mine ? "justify-end" : "justify-start";
  const bubbleClass = mine ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900";

  return (
    <div className={`flex ${containerClass} mb-3`}>
      <div className={`max-w-[78%] p-3 rounded-2xl shadow ${bubbleClass}`}>
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <div className="text-xs font-semibold">{msg.user?.name || "User"}</div>
          <div className="text-[11px] opacity-70">{time}</div>
        </div>

        {msg.type === "text" && <div className="whitespace-pre-wrap">{msg.message}</div>}

        {msg.type === "file" && (msg.attachments || []).map((a, i) => {
          const mime = (a.mime || "").toLowerCase();
          if (mime.startsWith("image/")) {
            return <a key={i} href={a.url} target="_blank" rel="noreferrer" className="block mb-2"><img src={a.url} alt={a.filename} className="max-h-48 w-auto rounded-md object-cover" /><div className="text-xs mt-1 underline">{a.filename}</div></a>;
          }
          if (mime.startsWith("audio/")) {
            return <div key={i} className="mb-2"><div className="text-xs underline">{a.filename}</div><audio controls src={a.url} className="w-full mt-1" /></div>;
          }
          if (mime.startsWith("video/")) {
            return <div key={i} className="mb-2"><div className="text-xs underline">{a.filename}</div><video controls src={a.url} className="w-full rounded-md mt-1" /></div>;
          }
          return <div key={i} className="mb-2"><a href={a.url} target="_blank" rel="noreferrer" className="underline text-sm">📎 {a.filename}</a></div>;
        })}

        {Array.isArray(msg.readBy) && mine && <div className="text-[11px] text-green-200 mt-2 text-right">Read by {msg.readBy.length}</div>}
      </div>
    </div>
  );
}
