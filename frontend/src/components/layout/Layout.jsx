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

import { useState } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import AnnouncementBar from "../dashboard/AnnouncementBar";
import React from "react";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    // CHANGE: Changed bg-[#030712] to bg-slate-50 and text-white to text-slate-900
    <div className="bg-slate-50 min-h-screen text-slate-900 flex flex-col font-sans">
      
      {/* NAVBAR stays on top */}
      <Navbar />

      <div className="flex flex-1 pt-16">
        {/* SIDEBAR */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* MAIN CONTENT AREA */}
        <main
          className={`flex-1 transition-all duration-300 ease-in-out min-w-0
            ${collapsed ? "ml-20" : "ml-64"}
          `}
        >
          {/* AnnouncementBar wrapper adjusted for light mode */}
          <div className="px-6 py-4">
            <AnnouncementBar />
          </div>
          
          <div className="p-6 lg:p-10 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}