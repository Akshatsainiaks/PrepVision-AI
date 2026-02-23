import React from "react";

export default function ChatLayout({ children }) {
  return (
    <div className="h-[calc(100vh-64px)] flex bg-slate-950 text-white">
      
      {/* CHAT SIDEBAR */}
      <div className="w-72 bg-slate-900 border-r border-white/10 p-4">
        <h2 className="text-lg font-semibold mb-4">Channels</h2>

        <div className="space-y-2">
          <div className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer">
            Global
          </div>

          <div className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer">
            DSA
          </div>

          <div className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer">
            Frontend
          </div>
        </div>
      </div>

      {/* CHAT MAIN AREA */}
      <div className="flex-1 p-6">
        {children}
      </div>

    </div>
  );
}