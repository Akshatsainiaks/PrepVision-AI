import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <Navbar />

      {/* SIDEBAR */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* MAIN CONTENT */}
      <main
        className={`pt-20 transition-all duration-300
          ${collapsed ? "ml-20" : "ml-64"}
        `}
      >
        {children}
      </main>
    </div>
  );
}
