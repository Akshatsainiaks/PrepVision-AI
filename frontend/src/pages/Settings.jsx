import Navbar from "../components/Navbar";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Settings() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar />

      <div className="max-w-3xl mx-auto p-8 space-y-10">
        {/* PAGE TITLE */}
        <h2 className="text-4xl font-extrabold text-[var(--accent)]">
          Settings
        </h2>

        {/* ================= ACCOUNT SETTINGS ================= */}
        <div className="card rounded-3xl p-6">
          <h3 className="text-xl font-semibold mb-2">
            Account
          </h3>
          <p className="text-sm text-secondary mb-4">
            Manage your account security and preferences
          </p>

          <div className="flex flex-col gap-3 text-sm">
            <p>
              <span className="text-secondary">Password:</span>{" "}
              Change your account password from here
            </p>
            <p>
              <span className="text-secondary">Email Notifications:</span>{" "}
              Enabled
            </p>
          </div>
        </div>

        {/* ================= SECURITY ================= */}
        <div className="border border-red-500/30 bg-red-500/10 rounded-3xl p-6">
          <h3 className="text-red-400 font-semibold mb-4">
            Danger Zone
          </h3>

          <button
            onClick={logout}
            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
