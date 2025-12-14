import { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import React from "react";

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-gray-950 min-h-screen text-white overflow-x-hidden">
      {/* TOP NAVBAR */}
      <Navbar />

      {/* SIDEBAR */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* MAIN CONTENT */}
      <main
        className={`pt-20 transition-all duration-300 ease-in-out
          ${collapsed ? "ml-20" : "ml-64"}
        `}
      >
        <div className="px-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
