import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiMic,
  FiUser,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import React from "react";

export default function Sidebar({ collapsed, setCollapsed }) {
  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Mock Interview", path: "/mock", icon: <FiMic /> },
    { name: "Profile", path: "/profile", icon: <FiUser /> },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)]
      ${collapsed ? "w-20" : "w-64"}
      bg-[#0b1220]
      border-r border-white/10
      transition-all duration-300 z-40`}
    >
      {/* TOGGLE BAR */}
      <div
        className={`absolute top-4 -right-3
        flex items-center justify-center`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-6 h-12 rounded-full
          bg-white/10 hover:bg-white/20
          border border-white/10
          flex items-center justify-center
          transition"
        >
          {collapsed ? (
            <FiChevronRight className="text-gray-300" />
          ) : (
            <FiChevronLeft className="text-gray-300" />
          )}
        </button>
      </div>

      {/* MENU */}
      <nav className="mt-10 flex flex-col gap-1 px-3">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl
              text-sm font-medium transition-all
              ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>

            {!collapsed && (
              <span className="whitespace-nowrap">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}

        {/* DIVIDER */}
        <div className="my-4 h-px bg-white/10" />

        {/* LOGOUT */}
        <button
          className="flex items-center gap-4 px-4 py-3
          text-red-400 hover:bg-red-500/10
          rounded-xl transition text-sm font-medium"
        >
          <FiLogOut className="text-xl" />
          {!collapsed && "Logout"}
        </button>
      </nav>
    </aside>
  );
}
