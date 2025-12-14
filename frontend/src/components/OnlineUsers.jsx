// src/components/OnlineUsers.jsx
import React from "react";

export default function OnlineUsers({ users = [], onDM }) {
  return (
    <div className="w-64 p-3 border-l h-full flex flex-col">
      <div className="font-bold mb-3">Online</div>
      <div className="space-y-2 overflow-auto flex-1">
        {users.map((u) => (
          <div key={u.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
            <div>
              <div className="font-medium">{u.name}</div>
              <div className="text-xs text-gray-500">{u.email || ""}</div>
            </div>
            {onDM && <button onClick={() => onDM(u.id)} className="text-sm text-indigo-600">DM</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
