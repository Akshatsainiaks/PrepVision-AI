import Skeleton from "../ui/Skeleton";
import Navbar from "../Navbar";
import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">
        <Skeleton className="h-10 w-40 mb-10" />

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 
          rounded-3xl p-8 shadow-xl">

          <div className="flex items-center gap-6">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 bg-black/30 border border-white/10">
              <Skeleton className="h-4 w-32 mb-3" />
              <Skeleton className="h-10 w-24" />
            </div>

            <div className="flex gap-4 items-end">
              <Skeleton className="h-12 w-28 rounded-xl" />
              <Skeleton className="h-12 w-36 rounded-xl" />
              <Skeleton className="h-12 w-28 rounded-xl" />
            </div>
          </div>
        </div>

        <div className="mt-14">
          <Skeleton className="h-6 w-64 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="backdrop-blur-xl bg-white/10 border border-white/20 
                p-5 rounded-2xl flex justify-between"
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
