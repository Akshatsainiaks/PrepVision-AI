import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiMic,
  FiUser,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Sidebar({ collapsed, setCollapsed }) {
  const { theme } = useContext(ThemeContext);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Mock Interview", path: "/mock", icon: <FiMic /> },
    { name: "Profile", path: "/profile", icon: <FiUser /> },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)]
      ${collapsed ? "w-20" : "w-64"}
      transition-all duration-300 z-40`}
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-color)",
        color: "var(--text-primary)",
      }}
    >
      {/* TOGGLE BAR */}
      <div className="absolute top-4 -right-3 flex items-center justify-center">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-6 h-12 rounded-full
          flex items-center justify-center
          transition"
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid var(--border-color)",
          }}
        >
          {collapsed ? (
            <FiChevronRight className="text-[var(--text-secondary)]" />
          ) : (
            <FiChevronLeft className="text-[var(--text-secondary)]" />
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
                  ? "text-white shadow-lg"
                  : "hover:bg-black/10"
              }`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    background:
                      "linear-gradient(90deg, var(--accent), #6366f1)",
                  }
                : {
                    color: "var(--text-secondary)",
                  }
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
        <div
          className="my-4 h-px"
          style={{ backgroundColor: "var(--border-color)" }}
        />

        {/* LOGOUT */}
        <button
          className="flex items-center gap-4 px-4 py-3
          rounded-xl transition text-sm font-medium"
          style={{
            color: "#ef4444",
          }}
        >
          <FiLogOut className="text-xl" />
          {!collapsed && "Logout"}
        </button>
      </nav>
    </aside>
  );
}
