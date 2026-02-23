// // import { useState } from "react";
// // import Sidebar from "../Sidebar";
// // import Navbar from "../Navbar";
// // import React from "react";
// // export default function Layout({ children }) {
// //   const [collapsed, setCollapsed] = useState(false);

// //   return (
// //     <div className="bg-gray-950 min-h-screen text-white">
// //       <Navbar />

// //       {/* SIDEBAR */}
// //       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

// //       {/* MAIN CONTENT */}
// //       <main
// //         className={`pt-20 transition-all duration-300
// //           ${collapsed ? "ml-20" : "ml-64"}
// //         `}
// //       >
// //         {children}
// //       </main>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import Sidebar from "../Sidebar";
// import Navbar from "../Navbar";
// import AnnouncementBar from "../dashboard/AnnouncementBar";
// import React from "react";

// export default function Layout({ children }) {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div className="bg-[#030712] min-h-screen text-white flex flex-col">
//       {/* NAVBAR stays on top */}
//       <Navbar />

//       <div className="flex flex-1 pt-16">
//         {/* SIDEBAR - Keep it fixed or relative based on your Sidebar component */}
//         <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//         {/* MAIN CONTENT AREA */}
//         <main
//           className={`flex-1 transition-all duration-300 ease-in-out min-w-0
//             ${collapsed ? "ml-20" : "ml-64"}
//           `}
//         >
//           {/* AnnouncementBar inside the content area to prevent overlap */}
//           <div className="px-6 py-2">
//             <AnnouncementBar />
//           </div>
          
//           <div className="p-6 lg:p-10 max-w-[1600px] mx-auto">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import Sidebar from "../Sidebar";
// import Navbar from "../Navbar";
// import AnnouncementBar from "../dashboard/AnnouncementBar";
// import React from "react";

// export default function Layout({ children }) {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     // CHANGE: Changed bg-[#030712] to bg-slate-50 and text-white to text-slate-900
//     <div className="bg-slate-50 min-h-screen text-slate-900 flex flex-col font-sans">
      
//       {/* NAVBAR stays on top */}
//       <Navbar />

//       <div className="flex flex-1 pt-16">
//         {/* SIDEBAR */}
//         <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//         {/* MAIN CONTENT AREA */}
//         <main
//           className={`flex-1 transition-all duration-300 ease-in-out min-w-0
//             ${collapsed ? "ml-20" : "ml-64"}
//           `}
//         >
//           {/* AnnouncementBar wrapper adjusted for light mode */}
//           <div className="px-6 py-4">
//             <AnnouncementBar />
//           </div>
          
//           <div className="p-6 lg:p-10 max-w-[1600px] mx-auto">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import Sidebar from "../Sidebar";
// import Navbar from "../Navbar";
// import AnnouncementBar from "../dashboard/AnnouncementBar";
// import React from "react";

// export default function Layout({ children }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [isAtTop, setIsAtTop] = useState(true);

//   // Track scroll position to hide/show announcement bar
//   useEffect(() => {
//     const handleScroll = () => {
//       // If scroll is more than 10px, hide the bar
//       if (window.scrollY > 10) {
//         setIsAtTop(false);
//       } else {
//         setIsAtTop(true);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div 
//       className="min-h-screen flex flex-col font-sans selection:bg-indigo-500/30"
//       style={{ 
//         backgroundColor: "var(--bg-primary)", 
//         color: "var(--text-primary)"         
//       }}
//     >
//       <Navbar />

//       <div className="flex flex-1 pt-16">
//         <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//         <main
//           className={`flex-1 transition-all duration-300 ease-in-out min-w-0 flex flex-col
//             ${collapsed ? "ml-20" : "ml-64"}
//           `}
//         >
//           {/* Wraps AnnouncementBar in a transition div. 
//             It will only show when isAtTop is true.
//           */}
//           <div 
//             className={`transition-all duration-500 ease-in-out overflow-hidden ${
//               isAtTop ? "max-h-20 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
//             }`}
//           >
//             <AnnouncementBar />
//           </div>
          
//           <div className="p-6 lg:p-10 max-w-[1600px] mx-auto w-full min-h-[calc(100vh-4rem)]">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import AnnouncementBar from "../dashboard/AnnouncementBar";
import React from "react";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();

  // Detect chat page
  const isChatPage = location.pathname.startsWith("/chat");

  // Track scroll position to hide/show announcement bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col font-sans selection:bg-indigo-500/30"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      {/* Navbar always visible */}
      <Navbar />

      <div className="flex flex-1 pt-16">
        
        {/* Hide Sidebar on Chat Page */}
        {!isChatPage && (
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        )}

        <main
          className={`flex-1 transition-all duration-300 ease-in-out min-w-0 flex flex-col
            ${
              isChatPage
                ? "ml-0" // No margin on chat
                : collapsed
                ? "ml-20"
                : "ml-64"
            }
          `}
        >
          {/* Hide AnnouncementBar on Chat */}
          {!isChatPage && (
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isAtTop
                  ? "max-h-20 opacity-100 mt-4"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <AnnouncementBar />
            </div>
          )}

          <div
            className={`${
              isChatPage
                ? "p-0 h-[calc(100vh-4rem)]"
                : "p-6 lg:p-10 max-w-[1600px] mx-auto w-full min-h-[calc(100vh-4rem)]"
            }`}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}