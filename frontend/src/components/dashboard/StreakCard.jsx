import React from "react";

export default function StreakCard({ streak }) {
  const fireColor =
    streak >= 10 ? "text-orange-500" : streak >= 5 ? "text-yellow-400" : "text-red-500";

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 
      rounded-2xl p-6 shadow-[0_0_25px_rgba(255,150,50,0.25)]
      hover:shadow-orange-500/30 transition-all">

      <div className="flex items-center gap-3">
        <span className={`text-5xl ${fireColor}`}>🔥</span>

        <div>
          <h3 className="text-sm text-gray-300 font-medium">Daily Streak</h3>
          <p className="text-4xl font-extrabold mt-1">{streak} days</p>
        </div>
      </div>

      <p className="text-gray-400 text-xs mt-3">
        Keep practicing daily to maintain your streak and earn more credits!
      </p>
    </div>
  );
}
