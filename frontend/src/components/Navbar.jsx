// import React, { useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { AuthContext } from "../context/AuthContext";
// import logo from "../assets/new.png";

// export default function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const navItems = [
//     { label: "Dashboard", path: "/dashboard" },
//     { label: "Questions", path: "/questions" },
//     { label: "Add Question", path: "/add-question" },
//     { label: "Mock", path: "/mock" },
//     { label: "Chat", path: "/chat" },
//     { label: "Leaderboard", path: "/leaderboard" },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
//       <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

//         {/* LOGO */}
//         <div
//           onClick={() => navigate("/")}
//           className="flex items-center gap-3 cursor-pointer"
//         >
//           <img src={logo} alt="PrepVision AI" className="w-11 h-11" />
//           <span className="text-2xl font-bold text-white">PrepVision AI</span>
//         </div>

//         {/* NAV LINKS */}
//         <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
//           {navItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`transition ${
//                 location.pathname === item.path
//                   ? "text-white font-semibold"
//                   : "hover:text-white"
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-5">

//           {/* 🔔 Notifications */}
//           <Link to="/notifications" className="relative hover:scale-110 transition">
//             <IoNotificationsOutline size={26} className="text-gray-300 hover:text-white" />
//             <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white/80" />
//           </Link>

//           {/* 👤 PROFILE AVATAR */}
//           <Link
//             to="/profile"
//             className="w-9 h-9 rounded-full overflow-hidden
//               bg-gradient-to-r from-purple-500 to-blue-500
//               flex items-center justify-center
//               text-white font-bold shadow-lg hover:scale-105 transition"
//           >
//             {user?.avatar ? (
//               <img
//                 src={user.avatar}
//                 alt="avatar"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               user?.name?.charAt(0) || "U"
//             )}
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }



// import React, { useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { AuthContext } from "../context/AuthContext";
// import logo from "../assets/new.png";

// export default function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const navItems = [
//     { label: "Dashboard", path: "/dashboard" },
//     { label: "Questions", path: "/questions" },
//     { label: "Add Question", path: "/add-question" },
//     { label: "Mock", path: "/mock" },
//     { label: "Chat", path: "/chat" },
//     { label: "Leaderboard", path: "/leaderboard" },
//   ];

//   return (
//     <nav
//       className="
//         fixed top-0 left-0 w-full z-50
//         h-16
//         bg-[#0b1220]/90 backdrop-blur-xl
//         border-b border-white/10
//       "
//     >
//       <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-6">

//         {/* LOGO */}
//         <div
//           onClick={() => navigate("/dashboard")}
//           className="flex items-center gap-3 cursor-pointer"
//         >
//           <img
//             src={logo}
//             alt="PrepVision AI"
//             className="w-9 h-9 shrink-0"
//           />
//           <span className="text-xl font-bold text-white whitespace-nowrap">
//             PrepVision AI
//           </span>
//         </div>

//         {/* NAV LINKS */}
//         <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
//           {navItems.map((item) => {
//             const active = location.pathname === item.path;
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`
//                   relative transition-colors
//                   ${active ? "text-white" : "hover:text-white"}
//                 `}
//               >
//                 {item.label}
//                 {active && (
//                   <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500" />
//                 )}
//               </Link>
//             );
//           })}
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-5">

//           {/* 🔔 Notifications */}
//           <Link
//             to="/notifications"
//             className="relative flex items-center justify-center w-9 h-9 rounded-full
//               hover:bg-white/10 transition"
//           >
//             <IoNotificationsOutline
//               size={22}
//               className="text-gray-300"
//             />
//             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#0b1220]" />
//           </Link>

//           {/* 👤 PROFILE */}
//           <Link
//             to="/profile"
//             className="
//               w-9 h-9 rounded-full overflow-hidden
//               bg-gradient-to-br from-indigo-500 to-purple-600
//               flex items-center justify-center
//               text-sm font-bold text-white
//               shadow-md hover:scale-105 transition-transform
//             "
//           >
//             {user?.avatar ? (
//               <img
//                 src={user.avatar}
//                 alt="avatar"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               user?.name?.charAt(0) || "U"
//             )}
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }



// import React, { useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { AuthContext } from "../context/AuthContext";
// import logo from "../assets/new.png";

// export default function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const navItems = [
//     { label: "Dashboard", path: "/dashboard" },
//     { label: "Questions", path: "/questions" },
//     { label: "Add Question", path: "/add-question" },
//     { label: "Mock", path: "/mock" },
//     { label: "Chat", path: "/chat" },
//     { label: "Leaderboard", path: "/leaderboard" },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
//       <div className="h-full flex items-center justify-between pl-6 pr-6">

//         {/* LOGO */}
//         <div
//           onClick={() => navigate("/dashboard")}
//           className="flex items-center gap-3 cursor-pointer shrink-0"
//         >
//           <img src={logo} alt="PrepVision AI" className="w-10 h-10" />
//           <span className="text-xl font-bold text-white whitespace-nowrap">PrepVision AI</span>
//         </div>

//         {/* NAV LINKS - CENTERED */}
//         <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300 absolute left-1/2 -translate-x-1/2">
//           {navItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`transition-colors whitespace-nowrap ${
//                 location.pathname === item.path
//                   ? "text-white font-semibold"
//                   : "hover:text-white"
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-4 shrink-0">

//           {/* 🔔 Notifications */}
//           <Link 
//             to="/notifications" 
//             className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition"
//           >
//             <IoNotificationsOutline size={22} className="text-gray-300 hover:text-white transition" />
//             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-900" />
//           </Link>

//           {/* 👤 PROFILE AVATAR */}
//           <Link
//             to="/profile"
//             className="w-10 h-10 rounded-full overflow-hidden
//               bg-gradient-to-r from-purple-500 to-blue-500
//               flex items-center justify-center
//               text-white font-bold shadow-lg hover:scale-105 transition-transform"
//           >
//             {user?.avatar ? (
//               <img
//                 src={user.avatar}
//                 alt="avatar"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <span className="text-sm">{user?.name?.charAt(0) || "U"}</span>
//             )}
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

// import React, { useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { AuthContext } from "../context/AuthContext";
// import logo from "../assets/new.png";

// export default function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const navItems = [
//     { label: "Dashboard", path: "/dashboard" },
//     { label: "Questions", path: "/questions" },
//     { label: "Add Question", path: "/add-question" },
//     { label: "Mock", path: "/mock" },
//     { label: "Chat", path: "/chat" },
//     { label: "Leaderboard", path: "/leaderboard" },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
//       <div className="h-full flex items-center justify-between px-8">

//         {/* LOGO */}
//         <div
//           onClick={() => navigate("/dashboard")}
//           className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
//         >
//           <div className="p-1.5 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
//             <img src={logo} alt="PrepVision AI" className="w-7 h-7 object-contain" />
//           </div>
//           <span className="text-xl font-black tracking-tight text-slate-900">
//             PrepVision<span className="text-indigo-600">AI</span>
//           </span>
//         </div>

//         {/* NAV LINKS - CENTERED */}
//         <div className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-500 absolute left-1/2 -translate-x-1/2 bg-slate-100/50 p-1 rounded-full border border-slate-200/60">
//           {navItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`px-4 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
//                 location.pathname === item.path
//                   ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200"
//                   : "hover:text-slate-900"
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-3 shrink-0">

//           {/* 🔔 Notifications */}
//           <Link 
//             to="/notifications" 
//             className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all text-slate-600 hover:text-indigo-600"
//           >
//             <IoNotificationsOutline size={20} />
//             <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white" />
//           </Link>

//           <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>

//           {/* 👤 PROFILE AVATAR */}
//           <Link
//             to="/profile"
//             className="flex items-center gap-3 pl-1 pr-1 py-1 rounded-full hover:bg-slate-50 transition-all"
//           >
//             <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md
//               bg-gradient-to-tr from-indigo-500 to-purple-500
//               flex items-center justify-center
//               text-white font-bold transition-transform active:scale-95"
//             >
//               {user?.avatar ? (
//                 <img
//                   src={user.avatar}
//                   alt="avatar"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-xs uppercase tracking-tighter">{user?.name?.charAt(0) || "U"}</span>
//               )}
//             </div>
//             {!location.pathname.includes('mobile') && (
//               <span className="hidden xl:block text-sm font-bold text-slate-700 mr-2">
//                 {user?.name?.split(' ')[0] || "Account"}
//               </span>
//             )}
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }


//dark mode
// import React, { useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { AuthContext } from "../context/AuthContext";
// import logo from "../assets/new.png";

// export default function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const navItems = [
//     { label: "Dashboard", path: "/dashboard" },
//     { label: "Questions", path: "/questions" },
//     { label: "Add Question", path: "/add-question" },
//     { label: "Mock", path: "/mock" },
//     { label: "Chat", path: "/chat" },
//     { label: "Leaderboard", path: "/leaderboard" },
//   ];

//   return (
//     <nav 
//       className="fixed top-0 left-0 w-full h-16 z-50 backdrop-blur-md border-b border-[var(--border-color)]"
//       style={{ backgroundColor: "rgba(15, 23, 42, 0.9)" }} // Fixed Slate-900 with opacity
//     >
//       <div className="h-full flex items-center justify-between px-8">

//         {/* LOGO */}
//         <div
//           onClick={() => navigate("/dashboard")}
//           className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
//         >
//           <div className="p-1.5 rounded-lg bg-indigo-500/10 transition-colors group-hover:bg-indigo-500/20">
//             <img src={logo} alt="PrepVision AI" className="w-7 h-7 object-contain" />
//           </div>
//           <span className="text-xl font-black tracking-tight text-[var(--text-primary)]">
//             PrepVision<span className="text-[var(--accent)]">AI</span>
//           </span>
//         </div>

//         {/* NAV LINKS */}
//         <div className="hidden lg:flex items-center gap-1 text-sm font-semibold absolute left-1/2 -translate-x-1/2 p-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)]">
//           {navItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
//                 location.pathname === item.path
//                   ? "bg-[var(--bg-card)] text-[var(--accent)] border border-[var(--border-color)] shadow-sm"
//                   : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>

//         {/* RIGHT SECTION */}
//         <div className="flex items-center gap-3 shrink-0">
//           <Link 
//             to="/notifications" 
//             className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all"
//           >
//             <IoNotificationsOutline size={20} />
//             <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[var(--accent)] rounded-full border-2 border-[var(--bg-card)]" />
//           </Link>

//           <div className="h-8 w-[1px] bg-[var(--border-color)] mx-1"></div>

//           <Link
//             to="/profile"
//             className="flex items-center gap-3 pl-1 pr-1 py-1 rounded-full hover:bg-white/5 transition-all"
//           >
//             <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[var(--bg-card)] shadow-md bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
//               {user?.avatar ? (
//                 <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
//               ) : (
//                 <span className="text-xs uppercase">{user?.name?.charAt(0) || "U"}</span>
//               )}
//             </div>
//             <span className="hidden xl:block text-sm font-bold text-[var(--text-primary)] mr-2">
//               {user?.name?.split(' ')[0] || "Account"}
//             </span>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoNotificationsOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/new.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
    <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
        >
          <div className="p-1.5 rounded-xl bg-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
            <img src={logo} alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            PrepVision<span className="text-indigo-400">AI</span>
          </span>
        </div>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center bg-slate-800/50 p-1 rounded-full border border-white/5 relative">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-300 z-10 ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-indigo-600 rounded-full -z-10 shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <Link 
            to="/notifications" 
            className="p-2 rounded-full text-slate-400 hover:bg-white/5 hover:text-indigo-400 transition-all relative"
          >
            <IoNotificationsOutline size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-900" />
          </Link>

          <div className="hidden md:block h-6 w-[1px] bg-white/10 mx-1"></div>

          <Link
            to="/profile"
            className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/5"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-500 flex items-center justify-center text-white ring-2 ring-indigo-500/20">
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-bold">{user?.name?.charAt(0) || "U"}</span>
              )}
            </div>
            <span className="hidden xl:block text-xs font-semibold text-white">
              {user?.name?.split(' ')[0] || "Profile"}
            </span>
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-300 hover:bg-white/5 rounded-lg"
          >
            {isOpen ? <IoCloseOutline size={26} /> : <IoMenuOutline size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-slate-900 border-b border-white/10 lg:hidden flex flex-col p-4 gap-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`p-3 rounded-xl transition-colors ${
                  location.pathname === item.path ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}