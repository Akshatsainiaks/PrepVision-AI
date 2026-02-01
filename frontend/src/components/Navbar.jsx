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
    <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="h-full flex items-center justify-between px-8">

        {/* LOGO */}
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
        >
          <div className="p-1.5 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
            <img src={logo} alt="PrepVision AI" className="w-7 h-7 object-contain" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">
            PrepVision<span className="text-indigo-600">AI</span>
          </span>
        </div>

        {/* NAV LINKS - CENTERED */}
        <div className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-500 absolute left-1/2 -translate-x-1/2 bg-slate-100/50 p-1 rounded-full border border-slate-200/60">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                location.pathname === item.path
                  ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200"
                  : "hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 shrink-0">

          {/* 🔔 Notifications */}
          <Link 
            to="/notifications" 
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all text-slate-600 hover:text-indigo-600"
          >
            <IoNotificationsOutline size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white" />
          </Link>

          <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>

          {/* 👤 PROFILE AVATAR */}
          <Link
            to="/profile"
            className="flex items-center gap-3 pl-1 pr-1 py-1 rounded-full hover:bg-slate-50 transition-all"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md
              bg-gradient-to-tr from-indigo-500 to-purple-500
              flex items-center justify-center
              text-white font-bold transition-transform active:scale-95"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs uppercase tracking-tighter">{user?.name?.charAt(0) || "U"}</span>
              )}
            </div>
            {!location.pathname.includes('mobile') && (
              <span className="hidden xl:block text-sm font-bold text-slate-700 mr-2">
                {user?.name?.split(' ')[0] || "Account"}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}