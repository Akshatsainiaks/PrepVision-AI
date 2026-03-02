import { useNotifications } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import React from "react";

const TYPE_CONFIG = {
  streak:      { emoji: "🔥", color: "#fb923c", glow: "rgba(251,146,60,0.35)",  border: "rgba(251,146,60,0.3)",  bg: "rgba(251,146,60,0.07)"  },
  credit:      { emoji: "💰", color: "#34d399", glow: "rgba(52,211,153,0.35)",  border: "rgba(52,211,153,0.3)",  bg: "rgba(52,211,153,0.07)"  },
  follow:      { emoji: "👤", color: "#a78bfa", glow: "rgba(167,139,250,0.35)", border: "rgba(167,139,250,0.3)", bg: "rgba(167,139,250,0.07)" },
  interview:   { emoji: "🎯", color: "#60a5fa", glow: "rgba(96,165,250,0.35)",  border: "rgba(96,165,250,0.3)",  bg: "rgba(96,165,250,0.07)"  },
  achievement: { emoji: "🏆", color: "#fbbf24", glow: "rgba(251,191,36,0.35)",  border: "rgba(251,191,36,0.3)",  bg: "rgba(251,191,36,0.07)"  },
  system:      { emoji: "📢", color: "#94a3b8", glow: "rgba(148,163,184,0.35)", border: "rgba(148,163,184,0.3)", bg: "rgba(148,163,184,0.07)" },
};

export default function NotificationToastStack() {
  const { toasts, removeToast } = useNotifications();
  const navigate = useNavigate();

  if (!toasts.length) return null;

  return (
    <>
      {/* ✅ Top-right position */}
      <div
        className="fixed top-6 right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none"
        style={{ width: "420px", maxWidth: "calc(100vw - 48px)" }}
      >
        {toasts.map((toast, index) => {
          const cfg = TYPE_CONFIG[toast.type] || TYPE_CONFIG.system;
          return (
            <div
              key={toast.toastId}
              className="pointer-events-auto w-full"
              style={{
                animation: "toastUp 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Outer glow ring */}
              <div
                className="rounded-2xl p-[1px]"
                style={{
                  background: `linear-gradient(135deg, ${cfg.border}, transparent 60%, ${cfg.border})`,
                  boxShadow: `0 0 40px ${cfg.glow}, 0 20px 60px rgba(0,0,0,0.7)`,
                }}
              >
                <div
                  className="relative flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer overflow-hidden"
                  style={{
                    background: "rgba(6,11,25,0.97)",
                    backdropFilter: "blur(32px)",
                  }}
                  onClick={() => {
                    removeToast(toast.toastId);
                    navigate("/notifications");
                  }}
                >
                  {/* Shimmer sweep on mount */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(105deg, transparent 40%, ${cfg.bg} 50%, transparent 60%)`,
                      animation: "shimmer 1.2s ease-out forwards",
                    }}
                  />

                  {/* Progress drain bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)`,
                      animation: "drainBar 5s linear forwards",
                      transformOrigin: "left",
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{
                      background: cfg.bg,
                      border: `1px solid ${cfg.border}`,
                      boxShadow: `0 0 20px ${cfg.glow}`,
                    }}
                  >
                    {cfg.emoji}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md"
                        style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                      >
                        {toast.type}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">just now</span>
                    </div>
                    <p className="text-[15px] font-black text-white leading-snug">
                      {toast.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed line-clamp-1">
                      {toast.message}
                    </p>
                  </div>

                  {/* Close */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeToast(toast.toastId);
                    }}
                    className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/10 text-slate-500 hover:text-white"
                  >
                    <FiX size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes toastUp {
          from { opacity: 0; transform: translateY(24px) scale(0.92); filter: blur(4px); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0);   }
        }
        @keyframes drainBar {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
        @keyframes shimmer {
          from { transform: translateX(-100%); }
          to   { transform: translateX(200%);  }
        }
      `}</style>
    </>
  );
}