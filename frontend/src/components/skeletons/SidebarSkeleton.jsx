import React from "react";

export default function SidebarSkeleton({ collapsed }) {
  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)]
      ${collapsed ? "w-20" : "w-64"}
      bg-[#0b1220]
      border-r border-white/10
      z-40`}
    >
      <div className="mt-8 px-3 space-y-8">
        {/* Repeat fake sections */}
        {[1, 2, 3, 4].map((section) => (
          <div key={section}>
            {/* Section title */}
            {!collapsed && (
              <div className="h-3 w-20 bg-white/10 rounded mb-3 shimmer" />
            )}

            {/* Menu items */}
            <div className="flex flex-col gap-2">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl
                  bg-white/10 shimmer`}
                >
                  {/* Icon */}
                  <div className="w-5 h-5 rounded bg-white/20" />

                  {/* Text */}
                  {!collapsed && (
                    <div className="h-3 w-24 rounded bg-white/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
