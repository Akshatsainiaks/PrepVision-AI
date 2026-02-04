// import Navbar from "../components/Navbar";
// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// export default function Settings() {
//   const { logout } = useContext(AuthContext);

//   return (
//     <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
//       <Navbar />

//       <div className="max-w-3xl mx-auto p-8 space-y-10">
//         {/* PAGE TITLE */}
//         <h2 className="text-4xl font-extrabold text-[var(--accent)]">
//           Settings
//         </h2>

//         {/* ================= ACCOUNT SETTINGS ================= */}
//         <div className="card rounded-3xl p-6">
//           <h3 className="text-xl font-semibold mb-2">
//             Account
//           </h3>
//           <p className="text-sm text-secondary mb-4">
//             Manage your account security and preferences
//           </p>

//           <div className="flex flex-col gap-3 text-sm">
//             <p>
//               <span className="text-secondary">Password:</span>{" "}
//               Change your account password from here
//             </p>
//             <p>
//               <span className="text-secondary">Email Notifications:</span>{" "}
//               Enabled
//             </p>
//           </div>
//         </div>

//         {/* ================= SECURITY ================= */}
//         <div className="border border-red-500/30 bg-red-500/10 rounded-3xl p-6">
//           <h3 className="text-red-400 font-semibold mb-4">
//             Danger Zone
//           </h3>

//           <button
//             onClick={logout}
//             className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition text-white"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


//dark mode
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiUser, FiLock, FiBell, FiLogOut, FiChevronRight, FiShield } from "react-icons/fi";

export default function Settings() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen transition-colors duration-500 font-sans selection:bg-indigo-500/30" 
         style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* FIXED: Changed pt-32 to pt-12 to remove the excessive top gap */}
      <div className="max-w-3xl mx-auto p-8 pt-12 space-y-10">
        
        {/* HEADER SECTION */}
        <header className="flex items-center gap-5">
            <div className="p-4 rounded-[2rem] text-white shadow-xl shadow-indigo-900/40"
                 style={{ backgroundColor: "var(--accent)" }}>
              <FiShield size={32} />
            </div>
            <div>
              <h2 className="text-4xl font-black tracking-tight">
                System <span style={{ color: "var(--accent)" }}>Settings</span>
              </h2>
              <p className="font-medium text-sm" style={{ color: "var(--text-secondary)" }}>
                Manage your account security and application preferences.
              </p>
            </div>
        </header>

        {/* ================= ACCOUNT SETTINGS ================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 ml-2">
            <FiUser className="text-[var(--accent)]" />
            <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>Account Control</h3>
          </div>

          <div className="card rounded-[2.5rem] overflow-hidden border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            <SettingItem 
              icon={<FiLock />} 
              label="Password & Security" 
              desc="Update your login credentials" 
            />
            <SettingItem 
              icon={<FiBell />} 
              label="Email Notifications" 
              desc="Manage your subscription alerts" 
              status="Enabled"
            />
          </div>
        </div>

        {/* ================= DANGER ZONE ================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 ml-2">
            <FiLogOut className="text-rose-500" />
            <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>Session Management</h3>
          </div>

          <div className="rounded-[2.5rem] p-8 border transition-all"
               style={{ 
                 backgroundColor: "rgba(225, 29, 72, 0.03)", 
                 borderColor: "rgba(225, 29, 72, 0.15)" 
               }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="text-lg font-bold text-rose-400">Logout of Current Session</h4>
                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                  Clears local session tokens and returns you to the login screen.
                </p>
              </div>

              <button
                onClick={logout}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black shadow-lg shadow-rose-900/20 transition-all active:scale-95"
              >
                <FiLogOut />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER INFO */}
        <div className="pt-10 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
              PrepVision Build v2.4.0 • 2026
            </p>
        </div>
      </div>
    </div>
  );
}

/* ================= SUB-COMPONENT ================= */
function SettingItem({ icon, label, desc, status }) {
  return (
    <div className="group flex items-center justify-between p-6 border-b last:border-0 hover:bg-white/[0.02] cursor-pointer transition-all"
         style={{ borderColor: "var(--border-color)" }}>
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors"
             style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-secondary)" }}>
          {React.cloneElement(icon, { size: 20 })}
        </div>
        <div>
          <h4 className="font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>{label}</h4>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{desc}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {status && (
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border"
                style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981", borderColor: "rgba(16, 185, 129, 0.2)" }}>
            {status}
          </span>
        )}
        <FiChevronRight className="transition-transform group-hover:translate-x-1" style={{ color: "var(--text-secondary)" }} />
      </div>
    </div>
  );
}