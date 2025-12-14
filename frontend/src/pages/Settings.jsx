import Navbar from "../components/Navbar";
import React from "react";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto p-8">
        <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r 
          from-purple-400 to-blue-400 text-transparent bg-clip-text">
          Settings
        </h2>

        <div className="space-y-6">

          {/* Change Password */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 
              p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-2">Change Password</h3>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r 
                from-purple-600 to-blue-600 shadow hover:scale-105 transition">
              Update Password
            </button>
          </div>

          {/* Notification Settings */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 
              p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-2">Notification Preferences</h3>
            <p className="text-gray-400 text-sm">
              Email & system notifications settings coming soon...
            </p>
          </div>

          {/* Account deletion */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 
              p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-2 text-red-400">Delete Account</h3>
            <button className="px-4 py-2 rounded-lg bg-red-600 shadow hover:scale-105 transition">
              Delete My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
