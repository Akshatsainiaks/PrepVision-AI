import Navbar from "../components/Navbar";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);

  const themes = [
    {
      key: "light",
      title: "Light",
      desc: "Bright theme for daylight usage",
    },
    {
      key: "dark",
      title: "Dark",
      desc: "Dark theme for low-light environments",
    },
    {
      key: "system",
      title: "System",
      desc: "Match your device theme automatically",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar />

      <div className="max-w-3xl mx-auto p-8 space-y-10">
        {/* PAGE TITLE */}
        <h2 className="text-4xl font-extrabold text-[var(--accent)]">
          Settings
        </h2>

        {/* ================= APPEARANCE ================= */}
        <div className="card rounded-3xl p-6">
          <h3 className="text-xl font-semibold mb-1">
            Appearance
          </h3>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Customize how PrepVision AI looks on your device
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {themes.map((item) => {
              const active = theme === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => toggleTheme(item.key)}
                  className={`
                    rounded-2xl p-4 border text-left transition-all
                    ${
                      active
                        ? "border-[var(--accent)] bg-[var(--accent)]/10"
                        : "border-[var(--border-color)] hover:border-[var(--accent)]/50"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      {item.title}
                    </span>
                    {active && (
                      <span className="text-xs px-2 py-0.5 rounded-full
                        bg-[var(--accent)] text-white">
                        Active
                      </span>
                    )}
                  </div>

                  <p className="text-xs mt-2 text-[var(--text-muted)]">
                    {item.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= DANGER ZONE ================= */}
        <div className="border border-red-500/30 bg-red-500/10 rounded-3xl p-6">
          <h3 className="text-red-400 font-semibold mb-4">
            Danger Zone
          </h3>

          <button
            onClick={logout}
            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
