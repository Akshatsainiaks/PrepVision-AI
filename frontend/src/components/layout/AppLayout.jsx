// // import { useState } from "react";
// // import Navbar from "../Navbar";
// // import Sidebar from "../Sidebar";
// // import React from "react";
// // import AnnouncementBar from "../dashboard/AnnouncementBar";
// // export default function AppLayout({ children }) {
// //   const [collapsed, setCollapsed] = useState(false);

// //   return (
// //     <div
// //       className="
// //         min-h-screen
// //         bg-[var(--bg-primary)]
// //         text-[var(--text-primary)]
// //         overflow-x-hidden
// //       "
// //     >
// //       {/* TOP NAVBAR */}
// //       <Navbar />

// //       {/* SIDEBAR */}
// //       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

// //       {/* MAIN CONTENT */}
// //       <main
// //         className={`
// //           pt-20 transition-all duration-300 ease-in-out
// //           ${collapsed ? "ml-20" : "ml-64"}
// //         `}
// //       >
// //   {/* 🔔 GLOBAL ANNOUNCEMENT */}
// //         <AnnouncementBar />
// //          <div className="px-8">
// //           <div className="max-w-7xl mx-auto">
// //             {children}
// //           </div>
// //         </div>
// //        </main>
// //      </div>
// //   );
// // }

// // src/components/layout/AppLayout.jsx
// // import { useState } from "react";
// // import Navbar from "../Navbar";
// // import Sidebar from "../Sidebar";
// // import AnnouncementBar from "../dashboard/AnnouncementBar";
// // import React from "react";

// // export default function AppLayout({ children }) {
// //   const [collapsed, setCollapsed] = useState(false);

// //   return (
// //     <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">

// //       {/* FIXED NAVBAR (h-16) */}
// //       <Navbar />

// //       {/* FIXED SIDEBAR */}
// //       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

// //       {/* CONTENT WRAPPER */}
// //       <div
// //         className={`
// //           pt-16
// //           transition-[margin-left] duration-300 ease-in-out
// //           ${collapsed ? "ml-20" : "ml-64"}
// //         `}
// //       >
// //         {/* 🔔 GLOBAL ANNOUNCEMENT */}
// //         <AnnouncementBar />

// //         {/* PAGE CONTENT (NO EXTRA PADDING) */}
// //         <main className="min-h-[calc(100vh-4rem)]">
// //           <div className="max-w-7xl mx-auto px-6">
// //             {children}
// //           </div>
// //         </main>
// //       </div>

// //     </div>
// //   );
// // }


// // // src/components/layout/AppLayout.jsx
// // import { useState } from "react";
// // import Navbar from "../Navbar";
// // import Sidebar from "../Sidebar";
// // import AnnouncementBar from "../dashboard/AnnouncementBar";
// // import React from "react";

// // export default function AppLayout({ children }) {
// //   const [collapsed, setCollapsed] = useState(false);

// //   return (
// //     <div className="min-h-screen bg-[#030712] text-gray-100 overflow-hidden">
      
// //       {/* NAVBAR */}
// //       <Navbar />

// //       {/* SIDEBAR */}
// //       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

// //       {/* MAIN AREA */}
// //       <div
// //         className={`
// //           pt-16
// //           transition-[padding-left] duration-300 ease-in-out
// //           ${collapsed ? "pl-20" : "pl-64"}
// //         `}
// //       >
// //         {/* GLOBAL ANNOUNCEMENT */}
// //         <AnnouncementBar />

// //         {/* PAGE CONTENT */}
// //         <main className="min-h-[calc(100vh-4rem)]">
// //           <div className="max-w-7xl mx-auto px-6 py-6">
// //             {children}
// //           </div>
// //         </main>
// //       </div>

// //     </div>
// //   );
// // }


// // src/components/layout/AppLayout.jsx
// import { useState } from "react";
// import Navbar from "../Navbar";
// import Sidebar from "../Sidebar";
// import AnnouncementBar from "../dashboard/AnnouncementBar";
// import React from "react";

// export default function AppLayout({ children }) {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div className="min-h-screen bg-[#030712] text-gray-100 selection:bg-purple-500/30">
      
//       {/* NAVBAR: Adding a backdrop-blur and z-index 
//           to ensure it stays above the sidebar on mobile 
//       */}
//       <div className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-[#030712]/80">
//         <Navbar />
//       </div>

//       {/* SIDEBAR: Positioned fixed by default in its component */}
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//       {/* MAIN AREA */}
//       <div
//         className={`
//           relative
//           min-h-screen
//           transition-all duration-300 ease-in-out
//           ${collapsed ? "lg:pl-20" : "lg:pl-64"}
//           pl-0 
//         `}
//       >
//         {/* TOP SPACING FOR FIXED NAVBAR */}
//         <div className="h-16" />

//         {/* CONTENT WRAPPER: Subtle gradient background to give depth */}
//         <div className="relative min-h-[calc(100vh-4rem)] flex flex-col">
          
//           {/* Subtle Mesh Background Blobs (Optional for extra flair) */}
//           <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
//             <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
//             <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
//           </div>

//           {/* GLOBAL ANNOUNCEMENT: Using a container to keep it aligned with max-width */}
//           <div className="sticky top-16 z-30 px-4 md:px-8 mt-4">
//              <AnnouncementBar />
//           </div>

//           {/* PAGE CONTENT: Added a slight fade-in animation */}
//           <main className="flex-grow relative z-10">
//             <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
//               {children}
//             </div>
//           </main>

//           {/* FOOTER (Optional placeholder for UI balance) */}
//           <footer className="border-t border-white/5 py-6 px-8 text-center text-gray-500 text-sm">
//             © 2026 InterviewAI • Professional Preparation Platform
//           </footer>
//         </div>
//       </div>

//     </div>
//   );
// }