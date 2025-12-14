// src/components/RoomsList.jsx
import React from "react";

export default function RoomsList({ rooms, active, onSelect }) {
  return (
    <div className="w-64 p-3 border-r h-full flex flex-col">
      <div className="font-bold mb-3">Rooms</div>
      <div className="space-y-2 flex-1 overflow-auto">
        {rooms.map((r) => (
          <button key={r.id} onClick={() => onSelect(r.id)} className={`w-full text-left p-2 rounded flex items-center justify-between ${active === r.id ? "bg-indigo-50" : "hover:bg-gray-50"}`}>
            <div>
              <div className="font-medium">{r.name}</div>
              <div className="text-xs text-gray-500">{r.desc}</div>
            </div>
            <div className="text-xs text-gray-400">{r.unread ? r.unread : ""}</div>
          </button>
        ))}
      </div>
      <div className="mt-3">
        <input placeholder="New room" className="w-full p-2 border rounded text-sm" onKeyDown={(e) => { if (e.key === "Enter") onSelect(e.target.value.trim()) }} />
      </div>
    </div>
  );
}
