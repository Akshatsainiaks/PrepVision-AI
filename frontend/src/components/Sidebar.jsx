// import { NavLink } from "react-router-dom";
// import {
//   FiHome,
//   FiMic,
//   FiUser,
//   FiChevronLeft,
//   FiChevronRight,
//   FiSettings,
//   FiBookOpen,
//   FiMap,
//   FiActivity,
//   FiBell,
//   FiHelpCircle,
// } from "react-icons/fi";
// import React from "react";

// export default function Sidebar({ collapsed, setCollapsed }) {
//   const sections = [
//     {
//       title: "Core",
//       items: [
//         { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
//         { name: "Activity", path: "/activity", icon: <FiActivity /> },
//       ],
//     },
//     {
//       title: "Practice",
//       items: [
//         { name: "Mock Interview", path: "/mock", icon: <FiMic /> },
//         {
//           name: "Interview History",
//           path: "/history",
//           icon: <FiBookOpen />,
//         },
//       ],
//     },
//     {
//       title: "Learning",
//       items: [
//         { name: "Question Bank", path: "/questions", icon: <FiBookOpen /> },
//         { name: "Learning Roadmap", path: "/roadmap", icon: <FiMap /> },
//       ],
//     },
//     {
//       title: "Account",
//       items: [
//         { name: "Profile", path: "/profile", icon: <FiUser /> },
//         { name: "Notifications", path: "/notifications", icon: <FiBell /> },
//         { name: "Settings", path: "/settings", icon: <FiSettings /> },
//       ],
//     },
//   ];

//   return (
//     <aside
//       className={`fixed top-16 left-0 h-[calc(100vh-4rem)]
//       ${collapsed ? "w-20" : "w-64"}
//       bg-[#0b1220]
//       border-r border-white/10
//       transition-all duration-300 z-40`}
//     >
//       {/* TOGGLE BUTTON */}
//       <div className="absolute top-4 -right-3 z-50">
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="w-6 h-12 rounded-full
//           bg-white/10 hover:bg-white/20
//           border border-white/10
//           flex items-center justify-center transition"
//         >
//           {collapsed ? (
//             <FiChevronRight className="text-gray-300" />
//           ) : (
//             <FiChevronLeft className="text-gray-300" />
//           )}
//         </button>
//       </div>

//       {/* SCROLLABLE CONTENT */}
//       <nav className="mt-8 px-3 h-full flex flex-col">
//         {/* MAIN MENU (SCROLLABLE) */}
//         <div className="flex-1 overflow-y-auto space-y-6 pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
//           {sections.map((section) => (
//             <div key={section.title}>
//               {/* SECTION TITLE */}
//               {!collapsed && (
//                 <p className="px-4 mb-2 text-xs uppercase tracking-wider text-gray-500">
//                   {section.title}
//                 </p>
//               )}

//               <div className="flex flex-col gap-1">
//                 {section.items.map((item) => (
//                   <NavLink
//                     key={item.path}
//                     to={item.path}
//                     className={({ isActive }) =>
//                       `flex items-center gap-4 px-4 py-3 rounded-xl
//                       text-sm font-medium transition-all
//                       ${
//                         isActive
//                           ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
//                           : "text-gray-300 hover:bg-white/10"
//                       }`
//                     }
//                   >
//                     <span className="text-xl">{item.icon}</span>

//                     {!collapsed && (
//                       <span className="whitespace-nowrap">
//                         {item.name}
//                       </span>
//                     )}
//                   </NavLink>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* HELP SECTION (FIXED AT BOTTOM) */}
//         <div className="pt-4 pb-6">
//           <div className="h-px bg-white/10 mb-4" />

//           <NavLink
//             to="/help"
//             className={({ isActive }) =>
//               `flex items-center gap-4 px-4 py-3 rounded-xl
//               text-sm font-medium transition-all
//               ${
//                 isActive
//                   ? "bg-white/10 text-white"
//                   : "text-gray-400 hover:bg-white/10"
//               }`
//             }
//           >
//             <FiHelpCircle className="text-xl" />
//             {!collapsed && "Help & Support"}
//           </NavLink>
//         </div>
//       </nav>
//     </aside>
//   );
// }


// import { NavLink } from "react-router-dom";
// import {
//   FiHome,
//   FiMic,
//   FiUser,
//   FiChevronLeft,
//   FiChevronRight,
//   FiSettings,
//   FiBookOpen,
//   FiMap,
//   FiActivity,
//   FiBell,
//   FiHelpCircle,
// } from "react-icons/fi";
// import React from "react";

// export default function Sidebar({ collapsed, setCollapsed }) {
//   const sections = [
//     {
//       title: "Core",
//       items: [
//         { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
//         { name: "Activity", path: "/activity", icon: <FiActivity /> },
//       ],
//     },
//     {
//       title: "Practice",
//       items: [
//         { name: "Mock Interview", path: "/mock", icon: <FiMic /> },
//         { name: "Interview History", path: "/history", icon: <FiBookOpen /> },
//       ],
//     },
//     {
//       title: "Learning",
//       items: [
//         { name: "Question Bank", path: "/questions", icon: <FiBookOpen /> },
//         { name: "Learning Roadmap", path: "/roadmap", icon: <FiMap /> },
//       ],
//     },
//     {
//       title: "Account",
//       items: [
//         { name: "Profile", path: "/profile", icon: <FiUser /> },
//         { name: "Notifications", path: "/notifications", icon: <FiBell /> },
//         { name: "Settings", path: "/settings", icon: <FiSettings /> },
//       ],
//     },
//   ];

//   return (
//     <aside
//       className={`
//         fixed top-16 left-0
//         h-[calc(100vh-4rem)]
//         ${collapsed ? "w-20" : "w-64"}
//         bg-[#0b1220]/95 backdrop-blur-xl
//         border-r border-white/10
//         transition-[width] duration-300 ease-in-out
//         z-40
//       `}
//     >
//       {/* TOGGLE BUTTON */}
//       <div className="absolute top-4 -right-3 z-50">
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="
//             w-6 h-12 rounded-full
//             bg-[#1a2333] hover:bg-indigo-600
//             border border-white/10
//             flex items-center justify-center
//             transition-colors duration-200
//             shadow-lg
//           "
//         >
//           {collapsed ? (
//             <FiChevronRight className="text-gray-300" />
//           ) : (
//             <FiChevronLeft className="text-gray-300" />
//           )}
//         </button>
//       </div>

//       {/* CONTENT */}
//       <nav className="h-full flex flex-col pt-8 px-3">
//         {/* MAIN MENU */}
//         <div className="flex-1 overflow-y-auto space-y-6 pr-1 custom-sidebar-scroll">
//           {sections.map((section) => (
//             <div key={section.title}>
//               {/* SECTION TITLE */}
//               {!collapsed && (
//                 <p className="px-4 mb-2 text-[10px] uppercase tracking-widest font-semibold text-gray-500">
//                   {section.title}
//                 </p>
//               )}

//               <div className="flex flex-col gap-1">
//                 {section.items.map((item) => (
//                   <NavLink
//                     key={item.path}
//                     to={item.path}
//                     className={({ isActive }) =>
//                       `
//                       flex items-center
//                       ${collapsed ? "justify-center" : "gap-4"}
//                       px-4 py-3 rounded-xl
//                       text-sm font-medium
//                       transition-colors duration-200
//                       ${
//                         isActive
//                           ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg"
//                           : "text-gray-400 hover:bg-white/10 hover:text-white"
//                       }
//                       `
//                     }
//                   >
//                     <span className="text-xl shrink-0">
//                       {item.icon}
//                     </span>

//                     {!collapsed && (
//                       <span className="whitespace-nowrap">
//                         {item.name}
//                       </span>
//                     )}
//                   </NavLink>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* HELP (BOTTOM FIXED) */}
//         <div className="pt-4 pb-6">
//           <div className="h-px bg-white/10 mb-4" />

//           <NavLink
//             to="/help"
//             className={({ isActive }) =>
//               `
//               flex items-center
//               ${collapsed ? "justify-center" : "gap-4"}
//               px-4 py-3 rounded-xl
//               text-sm font-medium
//               transition-colors duration-200
//               ${
//                 isActive
//                   ? "bg-white/10 text-white"
//                   : "text-gray-400 hover:bg-white/10 hover:text-white"
//               }
//               `
//             }
//           >
//             <FiHelpCircle className="text-xl shrink-0" />
//             {!collapsed && <span>Help & Support</span>}
//           </NavLink>
//         </div>
//       </nav>

//       {/* SCROLLBAR */}
//       <style jsx>{`
//         .custom-sidebar-scroll::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-sidebar-scroll::-webkit-scrollbar-thumb {
//           background: rgba(255,255,255,0.08);
//           border-radius: 10px;
//         }
//       `}</style>
//     </aside>
//   );
// }

// import { NavLink } from "react-router-dom";
// import {
//   FiHome,
//   FiMic,
//   FiUser,
//   FiChevronLeft,
//   FiChevronRight,
//   FiSettings,
//   FiBookOpen,
//   FiMap,
//   FiActivity,
//   FiBell,
//   FiHelpCircle,
// } from "react-icons/fi";
// import React from "react";

// export default function Sidebar({ collapsed, setCollapsed }) {
//   const sections = [
//     {
//       title: "Core",
//       items: [
//         { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
//         { name: "Activity", path: "/activity", icon: <FiActivity /> },
//       ],
//     },
//     {
//       title: "Practice",
//       items: [
//         { name: "Mock Interview", path: "/mock", icon: <FiMic /> },
//         { name: "Interview History", path: "/history", icon: <FiBookOpen /> },
//       ],
//     },
//     {
//       title: "Learning",
//       items: [
//         { name: "Question Bank", path: "/questions", icon: <FiBookOpen /> },
//         { name: "Learning Roadmap", path: "/roadmap", icon: <FiMap /> },
//       ],
//     },
//     {
//       title: "Account",
//       items: [
//         { name: "Profile", path: "/profile", icon: <FiUser /> },
//         { name: "Notifications", path: "/notifications", icon: <FiBell /> },
//         { name: "Settings", path: "/settings", icon: <FiSettings /> },
//       ],
//     },
//   ];

//   return (
//     <aside
//       className={`
//         fixed top-16 left-0
//         h-[calc(100vh-4rem)]
//         ${collapsed ? "w-20" : "w-64"}
//         bg-white border-r border-slate-200
//         transition-[width] duration-300 ease-in-out
//         z-40 shadow-sm
//       `}
//     >
//       {/* TOGGLE BUTTON - Now cleaner with Indigo accent */}
//       <div className="absolute top-4 -right-3 z-50">
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="
//             w-6 h-12 rounded-full
//             bg-white hover:bg-indigo-50
//             border border-slate-200
//             flex items-center justify-center
//             transition-all duration-200
//             shadow-md group
//           "
//         >
//           {collapsed ? (
//             <FiChevronRight className="text-slate-500 group-hover:text-indigo-600" />
//           ) : (
//             <FiChevronLeft className="text-slate-500 group-hover:text-indigo-600" />
//           )}
//         </button>
//       </div>

//       {/* CONTENT */}
//       <nav className="h-full flex flex-col pt-8 px-4">
//         {/* MAIN MENU */}
//         <div className="flex-1 overflow-y-auto space-y-7 pr-1 custom-sidebar-scroll">
//           {sections.map((section) => (
//             <div key={section.title}>
//               {/* SECTION TITLE - Darker for readability on light BG */}
//               {!collapsed && (
//                 <p className="px-3 mb-3 text-[11px] uppercase tracking-[0.1em] font-bold text-slate-400">
//                   {section.title}
//                 </p>
//               )}

//               <div className="flex flex-col gap-1.5">
//                 {section.items.map((item) => (
//                   <NavLink
//                     key={item.path}
//                     to={item.path}
//                     className={({ isActive }) =>
//                       `
//                       flex items-center
//                       ${collapsed ? "justify-center" : "gap-3.5"}
//                       px-3.5 py-3 rounded-xl
//                       text-sm font-semibold
//                       transition-all duration-200
//                       ${
//                         isActive
//                           ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
//                           : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
//                       }
//                       `
//                     }
//                   >
//                     <span className="text-xl shrink-0">
//                       {item.icon}
//                     </span>

//                     {!collapsed && (
//                       <span className="whitespace-nowrap tracking-tight">
//                         {item.name}
//                       </span>
//                     )}
//                   </NavLink>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* HELP (BOTTOM FIXED) */}
//         <div className="pt-4 pb-8">
//           <div className="h-px bg-slate-100 mb-4" />

//           <NavLink
//             to="/help"
//             className={({ isActive }) =>
//               `
//               flex items-center
//               ${collapsed ? "justify-center" : "gap-3.5"}
//               px-3.5 py-3 rounded-xl
//               text-sm font-semibold
//               transition-all duration-200
//               ${
//                 isActive
//                   ? "bg-slate-100 text-indigo-600"
//                   : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
//               }
//               `
//             }
//           >
//             <FiHelpCircle className="text-xl shrink-0" />
//             {!collapsed && <span>Help & Support</span>}
//           </NavLink>
//         </div>
//       </nav>

//       {/* LIGHT MODE SCROLLBAR */}
//       <style jsx>{`
//         .custom-sidebar-scroll::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-sidebar-scroll::-webkit-scrollbar-thumb {
//           background: #e2e8f0;
//           border-radius: 10px;
//         }
//         .custom-sidebar-scroll::-webkit-scrollbar-track {
//           background: transparent;
//         }
//       `}</style>
//     </aside>
//   );
// }


// import { NavLink } from "react-router-dom";
// import {
//   FiHome,
//   FiMic,
//   FiUser,
//   FiChevronLeft,
//   FiChevronRight,
//   FiSettings,
//   FiBookOpen,
//   FiMap,
//   FiActivity,
//   FiBell,
//   FiHelpCircle,
// } from "react-icons/fi";
// import React from "react";

// export default function Sidebar({ collapsed, setCollapsed }) {
//   const sections = [
//     {
//       title: "Core",
//       items: [
//         { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
//         { name: "Activity", path: "/activity", icon: <FiActivity /> },
//       ],
//     },
//     {
//       title: "Practice",
//       items: [
//         { name: "Mock Interview", path: "/mock", icon: <FiMic /> },
//         { name: "Interview History", path: "/history", icon: <FiBookOpen /> },
//       ],
//     },
//     {
//       title: "Learning",
//       items: [
//         { name: "Question Bank", path: "/questions", icon: <FiBookOpen /> },
//         { name: "Learning Roadmap", path: "/roadmap", icon: <FiMap /> },
//       ],
//     },
//     {
//       title: "Account",
//       items: [
//         { name: "Profile", path: "/profile", icon: <FiUser /> },
//         { name: "Notifications", path: "/notifications", icon: <FiBell /> },
//         { name: "Settings", path: "/settings", icon: <FiSettings /> },
//       ],
//     },
//   ];

//   return (
//     <aside
//       className={`
//         fixed top-16 left-0
//         h-[calc(100vh-4rem)]
//         ${collapsed ? "w-20" : "w-64"}
//         transition-[width,background-color,border-color] duration-300 ease-in-out
//         z-40 shadow-sm
//       `}
//       style={{ 
//         backgroundColor: "var(--bg-card)", 
//         borderRight: "1px solid var(--border-color)" 
//       }}
//     >
//       {/* TOGGLE BUTTON */}
//       <div className="absolute top-4 -right-3 z-50">
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="
//             w-6 h-12 rounded-full
//             border flex items-center justify-center
//             transition-all duration-200
//             shadow-md group
//           "
//           style={{ 
//             backgroundColor: "var(--bg-card)", 
//             borderColor: "var(--border-color)" 
//           }}
//         >
//           {collapsed ? (
//             <FiChevronRight className="group-hover:text-[var(--accent)]" style={{ color: "var(--text-secondary)" }} />
//           ) : (
//             <FiChevronLeft className="group-hover:text-[var(--accent)]" style={{ color: "var(--text-secondary)" }} />
//           )}
//         </button>
//       </div>

//       {/* CONTENT */}
//       <nav className="h-full flex flex-col pt-8 px-4">
//         {/* MAIN MENU */}
//         <div className="flex-1 overflow-y-auto space-y-7 pr-1 custom-sidebar-scroll">
//           {sections.map((section) => (
//             <div key={section.title}>
//               {!collapsed && (
//                 <p className="px-3 mb-3 text-[11px] uppercase tracking-[0.1em] font-bold" style={{ color: "var(--text-secondary)" }}>
//                   {section.title}
//                 </p>
//               )}

//               <div className="flex flex-col gap-1.5">
//                 {section.items.map((item) => (
//                   <NavLink
//                     key={item.path}
//                     to={item.path}
//                     className={({ isActive }) =>
//                       `
//                       flex items-center
//                       ${collapsed ? "justify-center" : "gap-3.5"}
//                       px-3.5 py-3 rounded-xl
//                       text-sm font-semibold
//                       transition-all duration-200
//                       ${
//                         isActive
//                           ? "text-white shadow-lg"
//                           : "hover:text-[var(--accent)]"
//                       }
//                       `
//                     }
//                     style={({ isActive }) => ({
//                       backgroundColor: isActive ? "var(--accent)" : "transparent",
//                       color: isActive ? "#ffffff" : "var(--text-secondary)",
//                       boxShadow: isActive ? "0 10px 15px -3px rgba(99, 102, 241, 0.3)" : "none"
//                     })}
//                   >
//                     <span className="text-xl shrink-0">
//                       {item.icon}
//                     </span>

//                     {!collapsed && (
//                       <span className="whitespace-nowrap tracking-tight">
//                         {item.name}
//                       </span>
//                     )}
//                   </NavLink>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* HELP (BOTTOM FIXED) */}
//         <div className="pt-4 pb-8">
//           <div className="h-px mb-4" style={{ backgroundColor: "var(--border-color)" }} />

//           <NavLink
//             to="/help"
//             className={({ isActive }) =>
//               `
//               flex items-center
//               ${collapsed ? "justify-center" : "gap-3.5"}
//               px-3.5 py-3 rounded-xl
//               text-sm font-semibold
//               transition-all duration-200
//               ${isActive ? "text-[var(--accent)]" : "hover:text-[var(--accent)]"}
//               `
//             }
//             style={({ isActive }) => ({
//                 backgroundColor: isActive ? "var(--bg-primary)" : "transparent",
//                 color: isActive ? "var(--accent)" : "var(--text-secondary)"
//             })}
//           >
//             <FiHelpCircle className="text-xl shrink-0" />
//             {!collapsed && <span>Help & Support</span>}
//           </NavLink>
//         </div>
//       </nav>

//       <style jsx>{`
//         .custom-sidebar-scroll::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-sidebar-scroll::-webkit-scrollbar-thumb {
//           background: var(--border-color);
//           border-radius: 10px;
//         }
//         .custom-sidebar-scroll::-webkit-scrollbar-track {
//           background: transparent;
//         }
//       `}</style>
//     </aside>
//   );
// }

//dark mode
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
      title: "",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
        { name: "Activity", path: "/activity", icon: <FiActivity /> },
      ],
    },
    {
      title: "Practice",
      items: [
        { name: "Mock Interview", path: "/mock", icon: <FiMic /> },
        { name: "Interview History", path: "/history", icon: <FiBookOpen /> },
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
      className={`
        fixed top-16 left-0
        h-[calc(100vh-4rem)]
        ${collapsed ? "w-20" : "w-64"}
        transition-[width,background-color,border-color] duration-300 ease-in-out
        z-40 shadow-2xl
      `}
      style={{ 
        backgroundColor: "var(--bg-card)", 
        borderRight: "1px solid var(--border-color)" 
      }}
    >
      {/* TOGGLE BUTTON - Floating Neon Style */}
      <div className="absolute top-4 -right-3 z-50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            w-6 h-12 rounded-full
            border flex items-center justify-center
            transition-all duration-200
            shadow-xl group
          "
          style={{ 
            backgroundColor: "var(--bg-card)", 
            borderColor: "var(--border-color)" 
          }}
        >
          {collapsed ? (
            <FiChevronRight className="group-hover:text-[var(--accent)]" style={{ color: "var(--text-secondary)" }} />
          ) : (
            <FiChevronLeft className="group-hover:text-[var(--accent)]" style={{ color: "var(--text-secondary)" }} />
          )}
        </button>
      </div>

      {/* CONTENT */}
      <nav className="h-full flex flex-col pt-8 px-4">
        {/* MAIN MENU */}
        <div className="flex-1 overflow-y-auto space-y-7 pr-1 custom-sidebar-scroll">
          {sections.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <p className="px-4 mb-3 text-[10px] uppercase tracking-[0.2em] font-black opacity-50" 
                   style={{ color: "var(--text-secondary)" }}>
                  {section.title}
                </p>
              )}

              <div className="flex flex-col gap-1.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `
                      flex items-center
                      ${collapsed ? "justify-center" : "gap-4"}
                      px-4 py-3 rounded-2xl
                      text-sm font-bold
                      transition-all duration-300
                      ${
                        isActive
                          ? "shadow-lg shadow-indigo-500/20"
                          : "hover:bg-white/5"
                      }
                      `
                    }
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "var(--accent)" : "transparent",
                      color: isActive ? "#ffffff" : "var(--text-secondary)",
                    })}
                  >
                    <span className={`text-xl shrink-0 transition-transform duration-300 ${collapsed ? "group-hover:scale-110" : ""}`}>
                      {item.icon}
                    </span>

                    {!collapsed && (
                      <span className="whitespace-nowrap tracking-tight">
                        {item.name}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* HELP (BOTTOM FIXED) */}
        <div className="pt-4 pb-8">
          <div className="h-px mb-4 opacity-50" style={{ backgroundColor: "var(--border-color)" }} />

          <NavLink
            to="/help"
            className={({ isActive }) =>
              `
              flex items-center
              ${collapsed ? "justify-center" : "gap-4"}
              px-4 py-3 rounded-2xl
              text-sm font-bold
              transition-all duration-300
              `
            }
            style={({ isActive }) => ({
                backgroundColor: isActive ? "rgba(99, 102, 241, 0.1)" : "transparent",
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
                border: isActive ? "1px solid rgba(99, 102, 241, 0.2)" : "1px solid transparent"
            })}
          >
            <FiHelpCircle className="text-xl shrink-0" />
            {!collapsed && <span>Help & Support</span>}
          </NavLink>
        </div>
      </nav>

      <style jsx>{`
        .custom-sidebar-scroll::-webkit-scrollbar {
          width: 2px;
        }
        .custom-sidebar-scroll::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 10px;
        }
        .custom-sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </aside>
  );
}