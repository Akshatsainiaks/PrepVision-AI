// import React from "react";

// export default function SidebarSkeleton({ collapsed }) {
//   return (
//     <aside
//       className={`fixed top-16 left-0 h-[calc(100vh-4rem)]
//       ${collapsed ? "w-20" : "w-64"}
//       bg-[#0b1220]
//       border-r border-white/10
//       z-40`}
//     >
//       <div className="mt-8 px-3 space-y-8">
//         {/* Repeat fake sections */}
//         {[1, 2, 3, 4].map((section) => (
//           <div key={section}>
//             {/* Section title */}
//             {!collapsed && (
//               <div className="h-3 w-20 bg-white/10 rounded mb-3 shimmer" />
//             )}

//             {/* Menu items */}
//             <div className="flex flex-col gap-2">
//               {[1, 2].map((item) => (
//                 <div
//                   key={item}
//                   className={`flex items-center gap-4 px-4 py-3 rounded-xl
//                   bg-white/10 shimmer`}
//                 >
//                   {/* Icon */}
//                   <div className="w-5 h-5 rounded bg-white/20" />

//                   {/* Text */}
//                   {!collapsed && (
//                     <div className="h-3 w-24 rounded bg-white/20" />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </aside>
//   );
// }

import React from "react";
import Skeleton from "../ui/Skeleton";

export default function SidebarSkeleton({ collapsed }) {
  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}
      bg-white border-r border-slate-200 z-40 shadow-sm`}
    >
      <div className="mt-8 px-4 space-y-10">
        {/* Repeat fake sections to mirror the "CORE", "PRACTICE", and "LEARNING" blocks */}
        {[1, 2, 3].map((section) => (
          <div key={section} className="space-y-4">
            {/* Section title placeholder */}
            {!collapsed && (
              <div className="px-2">
                <Skeleton className="h-3 w-16 rounded-md opacity-50" />
              </div>
            )}

            {/* Menu items list */}
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 px-3 py-3 rounded-2xl bg-transparent"
                >
                  {/* Floating Icon Placeholder */}
                  <Skeleton 
                    className="w-6 h-6 rounded-xl shrink-0" 
                    floating={true} 
                  />

                  {/* Text Placeholder - Only visible when sidebar is expanded */}
                  {!collapsed && (
                    <Skeleton className="h-3 w-32 rounded-lg" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer / Bottom Item Placeholder */}
      <div className="absolute bottom-10 left-0 w-full px-4">
        <div className="flex items-center gap-4 px-3 py-3">
           <Skeleton className="w-6 h-6 rounded-xl shrink-0" floating={true} />
           {!collapsed && <Skeleton className="h-3 w-28 rounded-lg" />}
        </div>
      </div>
    </aside>
  );
}