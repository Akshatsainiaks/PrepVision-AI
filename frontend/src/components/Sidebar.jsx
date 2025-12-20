import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiMic,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiSettings,
  FiBookOpen,
  FiMap,
  FiActivity,
  FiBell,
  FiHelpCircle,
} from "react-icons/fi";
import React from "react";

export default function Sidebar({ collapsed, setCollapsed }) {
  const sections = [
    {
      title: "Core",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
        { name: "Activity", path: "/activity", icon: <FiActivity /> },
      ],
    },
    {
      title: "Practice",
      items: [
        { name: "Mock Interview", path: "/mock", icon: <FiMic /> },
        {
          name: "Interview History",
          path: "/history",
          icon: <FiBookOpen />,
        },
      ],
    },
    {
      title: "Learning",
      items: [
        { name: "Question Bank", path: "/questions", icon: <FiBookOpen /> },
        { name: "Learning Roadmap", path: "/roadmap", icon: <FiMap /> },
      ],
    },
    {
      title: "Account",
      items: [
        { name: "Profile", path: "/profile", icon: <FiUser /> },
        { name: "Notifications", path: "/notifications", icon: <FiBell /> },
        { name: "Settings", path: "/settings", icon: <FiSettings /> },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)]
      ${collapsed ? "w-20" : "w-64"}
      bg-[#0b1220]
      border-r border-white/10
      transition-all duration-300 z-40`}
    >
      {/* TOGGLE BUTTON */}
      <div className="absolute top-4 -right-3 z-50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-6 h-12 rounded-full
          bg-white/10 hover:bg-white/20
          border border-white/10
          flex items-center justify-center transition"
        >
          {collapsed ? (
            <FiChevronRight className="text-gray-300" />
          ) : (
            <FiChevronLeft className="text-gray-300" />
          )}
        </button>
      </div>

      {/* SCROLLABLE CONTENT */}
      <nav className="mt-8 px-3 h-full flex flex-col">
        {/* MAIN MENU (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {sections.map((section) => (
            <div key={section.title}>
              {/* SECTION TITLE */}
              {!collapsed && (
                <p className="px-4 mb-2 text-xs uppercase tracking-wider text-gray-500">
                  {section.title}
                </p>
              )}

              <div className="flex flex-col gap-1">
                {section.items.map((item) => (
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
              </div>
            </div>
          ))}
        </div>

        {/* HELP SECTION (FIXED AT BOTTOM) */}
        <div className="pt-4 pb-6">
          <div className="h-px bg-white/10 mb-4" />

          <NavLink
            to="/help"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl
              text-sm font-medium transition-all
              ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/10"
              }`
            }
          >
            <FiHelpCircle className="text-xl" />
            {!collapsed && "Help & Support"}
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}
