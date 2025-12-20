import React from "react";

export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* HEADER */}
      <div className="h-10 w-2/3 rounded-xl bg-white/10 mb-4" />
      <div className="h-5 w-1/2 rounded-lg bg-white/10 mb-14" />

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white/10 border border-white/10 h-48"
          >
            <div className="h-5 w-1/3 bg-white/10 rounded mb-6" />
            <div className="h-10 w-full bg-white/10 rounded mb-4" />
            <div className="h-4 w-2/3 bg-white/10 rounded" />
          </div>
        ))}
      </div>

      {/* STREAK + ANALYTICS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-16">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-64 rounded-2xl bg-white/10 border border-white/10"
          />
        ))}
      </div>

      {/* INSIGHTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-16">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-56 rounded-2xl bg-white/10 border border-white/10"
          />
        ))}
      </div>

      {/* RECENT ACTIVITY */}
      <div className="mt-20">
        <div className="h-6 w-1/4 bg-white/10 rounded mb-6" />
        <div className="h-40 rounded-2xl bg-white/10 border border-white/10" />
      </div>
    </div>
  );
}
