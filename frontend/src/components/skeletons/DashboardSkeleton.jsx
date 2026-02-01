// import React from "react";

// export default function DashboardSkeleton() {
//   return (
//     <div className="animate-pulse">
//       {/* HEADER */}
//       <div className="h-10 w-2/3 rounded-xl bg-white/10 mb-4" />
//       <div className="h-5 w-1/2 rounded-lg bg-white/10 mb-14" />

//       {/* TOP CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {[1, 2, 3].map((i) => (
//           <div
//             key={i}
//             className="p-6 rounded-2xl bg-white/10 border border-white/10 h-48"
//           >
//             <div className="h-5 w-1/3 bg-white/10 rounded mb-6" />
//             <div className="h-10 w-full bg-white/10 rounded mb-4" />
//             <div className="h-4 w-2/3 bg-white/10 rounded" />
//           </div>
//         ))}
//       </div>

//       {/* STREAK + ANALYTICS */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-16">
//         {[1, 2].map((i) => (
//           <div
//             key={i}
//             className="h-64 rounded-2xl bg-white/10 border border-white/10"
//           />
//         ))}
//       </div>

//       {/* INSIGHTS */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-16">
//         {[1, 2].map((i) => (
//           <div
//             key={i}
//             className="h-56 rounded-2xl bg-white/10 border border-white/10"
//           />
//         ))}
//       </div>

//       {/* RECENT ACTIVITY */}
//       <div className="mt-20">
//         <div className="h-6 w-1/4 bg-white/10 rounded mb-6" />
//         <div className="h-40 rounded-2xl bg-white/10 border border-white/10" />
//       </div>
//     </div>
//   );
// }


// src/components/skeletons/DashboardSkeleton.jsx
import React from "react";
import Skeleton from "../ui/Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="animate-fadeIn pb-12 px-4 lg:px-8 pt-6">
      {/* Header Skeleton */}
      <div className="mb-10">
        <Skeleton className="h-12 w-1/3 rounded-2xl mb-4" floating={true} />
        <Skeleton className="h-5 w-1/2 rounded-xl opacity-60" />
      </div>

      {/* 4-Card Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-slate-100 p-6 rounded-[1.5rem] h-64 flex flex-col">
            <Skeleton className="h-3 w-16 mb-4 opacity-40" />
            <div className="flex-1 flex flex-col justify-center">
              <Skeleton className="h-14 w-24 rounded-2xl mb-4" floating={true} />
              <Skeleton className="h-3 w-3/4 rounded-md opacity-50" />
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Skeleton className="h-16 rounded-2xl" />
        <Skeleton className="h-16 rounded-2xl" />
        <Skeleton className="h-16 rounded-2xl" />
      </div>

      {/* Content Area Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Skeleton className="h-96 rounded-[2.5rem]" floating={true} />
        <Skeleton className="h-96 rounded-[2.5rem]" />
      </div>
    </div>
  );
}