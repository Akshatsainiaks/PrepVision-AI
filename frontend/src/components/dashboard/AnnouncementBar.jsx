import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";
const announcements = [
  {
    text: "🚀 New questions added! Explore fresh DSA & System Design problems.",
    link: "/questions",
  },
  {
    text: "🔥 Don’t break your streak! Practice today & earn more credits.",
    link: "/mock",
  },
  {
    text: "🎯 AI Voice Practice improved — get clearer feedback now.",
    link: "/mock",
  },
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="mb-10 flex items-center justify-between gap-4
      px-6 py-3 rounded-xl
      bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20
      border border-white/10 backdrop-blur-md
      shadow-[0_10px_30px_rgba(120,64,255,0.25)]"
    >
      <button
        onClick={() => navigate(announcements[index].link)}
        className="text-left text-sm md:text-base text-gray-200 hover:text-white transition"
      >
        <span className="font-semibold text-white">Update:</span>{" "}
        {announcements[index].text}
      </button>

      <button
        onClick={() => setVisible(false)}
        className="text-gray-400 hover:text-white transition"
        aria-label="Close"
      >
        <X size={18} />
      </button>
    </div>
  );
}
