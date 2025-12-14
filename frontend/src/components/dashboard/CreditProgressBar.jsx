import React from "react";

export default function CreditProgressBar({ credits = 0, max = 100 }) {
  // Auto-scale max credits dynamically
  const computedMax = Math.max(max, credits);
  
  const percent = Math.min(Math.round((credits / computedMax) * 100), 100);

  let color = "from-green-400 to-green-600";
  if (credits < 30) color = "from-red-400 to-red-600";
  else if (credits < 60) color = "from-yellow-400 to-yellow-600";

  return (
    <div className="mt-3">
      {/* Display amount */}
      <div className="flex justify-between mb-1 text-sm">
        <span className="text-gray-300">{credits} Credits</span>
        <span className="text-gray-500">{percent}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-800/40 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} transition-all duration-700`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <p className="text-gray-400 text-xs mt-2">
        Earn more credits by practicing interviews, contributing questions, and staying active.
      </p>
    </div>
  );
}
