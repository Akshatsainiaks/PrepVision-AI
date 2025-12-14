// import { Link, useLocation } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import React from "react";

// import logo from "../assets/new.png";
// import { IoNotificationsOutline } from "react-icons/io5"; // <-- NOTIFICATION ICON

// export default function Navbar() {
//   const location = useLocation();

//   const navItems = [
//     { label: "Dashboard", path: "/dashboard" },
//     { label: "Questions", path: "/questions" },
//     { label: "Add Question", path: "/add-question" },
//     { label: "Mock", path: "/mock" },
//     { label: "Chat", path: "/chat" },
//     { label: "Leaderboard", path: "/leaderboard" },
//   ];

//   return (
//     <nav className="backdrop-blur-xl bg-white/10 
//         border-b border-white/20 shadow-[0_0_20px_rgba(120,64,255,0.2)]
//         sticky top-0 z-50">

//       <div className="flex items-center justify-between px-8 py-3">

//         {/* LOGO */}
//         <Link to="/" className="flex items-center gap-3">
//           <img 
//             src={logo}
//             alt="PrepVision AI"
//             className="h-10 w-auto drop-shadow-lg hover:scale-105 transition"
//           />
//         </Link>

//         {/* NAV LINKS */}
//         <div className="hidden md:flex items-center gap-8">
//           {navItems.map((item, index) => (
//             <Link
//               key={index}
//               to={item.path}
//               className={`text-sm font-medium transition 
//                 ${
//                   location.pathname === item.path
//                     ? "text-purple-400 font-semibold"
//                     : "text-gray-300 hover:text-white"
//                 }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>

//         {/* RIGHT SECTION */}
//         <div className="flex items-center gap-5">

//           {/* NOTIFICATION ICON */}
//           <Link
//             to="/notifications"
//             className="relative hover:scale-110 transition cursor-pointer"
//           >
//             <IoNotificationsOutline size={26} className="text-gray-300 hover:text-white" />

//             {/* UNREAD DOT */}
//             <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 
//               rounded-full border border-white/80 shadow-lg"></span>
//           </Link>

//           {/* PROFILE ICON */}
//           <Link
//             to="/profile"
//             className="w-9 h-9 rounded-full bg-gradient-to-r 
//                 from-purple-500 to-blue-500 flex items-center 
//                 justify-center text-white font-bold shadow-lg hover:scale-105 
//                 transition"
//           >
//             P
//           </Link>

//         </div>

//       </div>
//     </nav>
//   );
// }




import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import logo from "../assets/new.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Questions", path: "/questions" },
    { label: "Add Question", path: "/add-question" },
    { label: "Mock", path: "/mock" },
    { label: "Chat", path: "/chat" },
    { label: "Leaderboard", path: "/leaderboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50
      bg-gray-900/80 backdrop-blur-xl border-b border-white/10">

      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img src={logo} className="w-11 h-11 object-contain" alt="PrepVision AI" />
          <span className="text-2xl font-bold text-white">
            PrepVision AI
          </span>
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
          <Link to="/notifications" className="relative hover:scale-110 transition">
            <IoNotificationsOutline size={26} className="text-gray-300 hover:text-white" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white/80" />
          </Link>

          <Link
            to="/profile"
            className="w-9 h-9 rounded-full bg-gradient-to-r
              from-purple-500 to-blue-500 flex items-center
              justify-center text-white font-bold shadow-lg hover:scale-105 transition"
          >
            P
          </Link>
        </div>

      </div>
    </nav>
  );
}
