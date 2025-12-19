import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/new.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Questions", path: "/questions" },
    { label: "Add Question", path: "/add-question" },
    { label: "Mock", path: "/mock" },
    { label: "Chat", path: "/chat" },
    { label: "Leaderboard", path: "/leaderboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img src={logo} alt="PrepVision AI" className="w-11 h-11" />
          <span className="text-2xl font-bold text-white">PrepVision AI</span>
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition ${
                location.pathname === item.path
                  ? "text-white font-semibold"
                  : "hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">

          {/* 🔔 Notifications */}
          <Link to="/notifications" className="relative hover:scale-110 transition">
            <IoNotificationsOutline size={26} className="text-gray-300 hover:text-white" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white/80" />
          </Link>

          {/* 👤 PROFILE AVATAR */}
          <Link
            to="/profile"
            className="w-9 h-9 rounded-full overflow-hidden
              bg-gradient-to-r from-purple-500 to-blue-500
              flex items-center justify-center
              text-white font-bold shadow-lg hover:scale-105 transition"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              user?.name?.charAt(0) || "U"
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
