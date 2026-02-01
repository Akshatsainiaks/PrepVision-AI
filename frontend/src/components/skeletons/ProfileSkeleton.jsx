// import Skeleton from "../ui/Skeleton";
// import Navbar from "../Navbar";
// import React from "react";

// export default function ProfileSkeleton() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
//       <Navbar />

//       <div className="max-w-4xl mx-auto p-8">
//         <Skeleton className="h-10 w-40 mb-10" />

//         <div className="backdrop-blur-xl bg-white/10 border border-white/20 
//           rounded-3xl p-8 shadow-xl">

//           <div className="flex items-center gap-6">
//             <Skeleton className="w-20 h-20 rounded-full" />
//             <div className="space-y-3">
//               <Skeleton className="h-6 w-48" />
//               <Skeleton className="h-4 w-64" />
//             </div>
//           </div>

//           <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="rounded-2xl p-6 bg-black/30 border border-white/10">
//               <Skeleton className="h-4 w-32 mb-3" />
//               <Skeleton className="h-10 w-24" />
//             </div>

//             <div className="flex gap-4 items-end">
//               <Skeleton className="h-12 w-28 rounded-xl" />
//               <Skeleton className="h-12 w-36 rounded-xl" />
//               <Skeleton className="h-12 w-28 rounded-xl" />
//             </div>
//           </div>
//         </div>

//         <div className="mt-14">
//           <Skeleton className="h-6 w-64 mb-6" />
//           <div className="space-y-4">
//             {[1, 2, 3].map((i) => (
//               <div
//                 key={i}
//                 className="backdrop-blur-xl bg-white/10 border border-white/20 
//                 p-5 rounded-2xl flex justify-between"
//               >
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-40" />
//                   <Skeleton className="h-3 w-32" />
//                 </div>
//                 <Skeleton className="h-5 w-20" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Skeleton from "../ui/Skeleton";
import Navbar from "../Navbar";
import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 md:p-10 pt-32 animate-fadeIn">
        
        {/* HEADER SKELETON */}
        <div className="flex items-center gap-4 mb-12">
           <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <div className="w-8 h-8 bg-slate-100 rounded-lg animate-pulse" />
           </div>
           {/* Floating title placeholder */}
           <Skeleton className="h-10 w-48 rounded-2xl" floating={true} />
        </div>

        {/* PROFILE CARD SKELETON */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Floating Squircle Avatar */}
            <Skeleton className="w-24 h-24 rounded-[2rem] shrink-0" floating={true} />
            
            <div className="flex-1 space-y-4 w-full text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-3">
                  <Skeleton className="h-8 w-56 mx-auto md:mx-0" />
                  <Skeleton className="h-4 w-72 mx-auto md:mx-0" />
                </div>
                <Skeleton className="h-10 w-32 rounded-xl mx-auto md:mx-0" />
              </div>
            </div>
          </div>

          {/* STATS SKELETON */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] p-8 bg-slate-50 border border-slate-100">
              <Skeleton className="h-4 w-32 mb-4" />
              <div className="flex items-baseline gap-2">
                <Skeleton className="h-12 w-20 rounded-xl" floating={true} />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-end justify-center md:justify-end">
              <Skeleton className="h-14 w-28 rounded-2xl" />
              <Skeleton className="h-14 w-36 rounded-2xl" />
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY SKELETON */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-8 h-1 bg-indigo-600 rounded-full" />
             <Skeleton className="h-7 w-64" />
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex flex-col md:flex-row justify-between items-center gap-4"
              >
                <div className="flex items-center gap-5 w-full md:w-auto">
                  {/* Floating Activity Icon */}
                  <Skeleton className="w-12 h-12 rounded-xl shrink-0" floating={true} />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-48 md:w-64" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <Skeleton className="h-8 w-24 rounded-lg" />
                    <Skeleton className="h-10 w-10 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}