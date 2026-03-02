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
// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { FiUser, FiLock, FiBell, FiLogOut, FiChevronRight, FiShield } from "react-icons/fi";

// export default function Settings() {
//   const { logout } = useContext(AuthContext);

//   return (
//     <div className="min-h-screen transition-colors duration-500 font-sans selection:bg-indigo-500/30" 
//          style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
//       {/* FIXED: Changed pt-32 to pt-12 to remove the excessive top gap */}
//       <div className="max-w-3xl mx-auto p-8 pt-12 space-y-10">
        
//         {/* HEADER SECTION */}
//         <header className="flex items-center gap-5">
//             <div className="p-4 rounded-[2rem] text-white shadow-xl shadow-indigo-900/40"
//                  style={{ backgroundColor: "var(--accent)" }}>
//               <FiShield size={32} />
//             </div>
//             <div>
//               <h2 className="text-4xl font-black tracking-tight">
//                 System <span style={{ color: "var(--accent)" }}>Settings</span>
//               </h2>
//               <p className="font-medium text-sm" style={{ color: "var(--text-secondary)" }}>
//                 Manage your account security and application preferences.
//               </p>
//             </div>
//         </header>

//         {/* ================= ACCOUNT SETTINGS ================= */}
//         <div className="space-y-4">
//           <div className="flex items-center gap-2 mb-2 ml-2">
//             <FiUser className="text-[var(--accent)]" />
//             <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>Account Control</h3>
//           </div>

//           <div className="card rounded-[2.5rem] overflow-hidden border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
//             <SettingItem 
//               icon={<FiLock />} 
//               label="Password & Security" 
//               desc="Update your login credentials" 
//             />
//             <SettingItem 
//               icon={<FiBell />} 
//               label="Email Notifications" 
//               desc="Manage your subscription alerts" 
//               status="Enabled"
//             />
//           </div>
//         </div>

//         {/* ================= DANGER ZONE ================= */}
//         <div className="space-y-4">
//           <div className="flex items-center gap-2 mb-2 ml-2">
//             <FiLogOut className="text-rose-500" />
//             <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>Session Management</h3>
//           </div>

//           <div className="rounded-[2.5rem] p-8 border transition-all"
//                style={{ 
//                  backgroundColor: "rgba(225, 29, 72, 0.03)", 
//                  borderColor: "rgba(225, 29, 72, 0.15)" 
//                }}>
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//               <div>
//                 <h4 className="text-lg font-bold text-rose-400">Logout of Current Session</h4>
//                 <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
//                   Clears local session tokens and returns you to the login screen.
//                 </p>
//               </div>

//               <button
//                 onClick={logout}
//                 className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black shadow-lg shadow-rose-900/20 transition-all active:scale-95"
//               >
//                 <FiLogOut />
//                 Sign Out
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* FOOTER INFO */}
//         <div className="pt-10 text-center">
//             <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
//               PrepVision Build v2.4.0 • 2026
//             </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SUB-COMPONENT ================= */
// function SettingItem({ icon, label, desc, status }) {
//   return (
//     <div className="group flex items-center justify-between p-6 border-b last:border-0 hover:bg-white/[0.02] cursor-pointer transition-all"
//          style={{ borderColor: "var(--border-color)" }}>
//       <div className="flex items-center gap-5">
//         <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors"
//              style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-secondary)" }}>
//           {React.cloneElement(icon, { size: 20 })}
//         </div>
//         <div>
//           <h4 className="font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>{label}</h4>
//           <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{desc}</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         {status && (
//           <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border"
//                 style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981", borderColor: "rgba(16, 185, 129, 0.2)" }}>
//             {status}
//           </span>
//         )}
//         <FiChevronRight className="transition-transform group-hover:translate-x-1" style={{ color: "var(--text-secondary)" }} />
//       </div>
//     </div>
//   );
// }


// next acc claude code
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  FiUser, FiLock, FiBell, FiLogOut, FiShield,
  FiAlertTriangle, FiCheck, FiEye, FiEyeOff, FiLoader,
  FiGlobe, FiTrash2, FiPhone, FiInfo,
} from "react-icons/fi";
import {
  getSettings,
  updateAccount,
  changePassword,
  updateSecurity,
  updatePrivacy,
  updatePreferences,
  deleteAccount,
} from "../api/settings";
import { useNotifications } from "../context/NotificationContext"; // ✅

/* ── Toast ── */
function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };
  return { toasts, success: (m) => add(m, "success"), error: (m) => add(m, "error"), info: (m) => add(m, "info") };
}

const TABS = [
  { id: "account",     label: "Account",     icon: FiUser },
  { id: "security",    label: "Security",    icon: FiLock },
  { id: "preferences", label: "Preferences", icon: FiBell },
  { id: "danger",      label: "Danger Zone", icon: FiAlertTriangle },
];

export default function Settings() {
  const { user, setUser, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("account");
  const toast = useToast();
  const { fetchUnread } = useNotifications(); // ✅

  const [settings, setSettings] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phone: "",
    usernameChangesLeft: 2,
    usernameWindowDays: 15,
    canChangePassword: true,
    passwordDaysLeft: 0,
    twoFA: false,
    profilePublic: true,
    emailNotifications: true,
  });

  useEffect(() => {
    getSettings()
      .then((res) => setSettings((prev) => ({ ...prev, ...res.data })))
      .catch(() => toast.error("Failed to load settings"));
  }, []);

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>

      {/* ── Toast Stack ── */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toast.toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-bold border animate-slideInRight"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: t.type === "success" ? "rgba(16,185,129,0.3)" : t.type === "error" ? "rgba(225,29,72,0.3)" : "rgba(129,140,248,0.3)",
              color: t.type === "success" ? "#10b981" : t.type === "error" ? "#f43f5e" : "#818cf8",
            }}
          >
            {t.type === "success" ? <FiCheck size={15} /> : t.type === "error" ? <FiAlertTriangle size={15} /> : <FiInfo size={15} />}
            <span style={{ color: "var(--text-primary)" }}>{t.message}</span>
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 pt-10 pb-16">

        {/* HEADER */}
        <header className="flex items-center gap-5 mb-10">
          <div className="p-4 rounded-[2rem] text-white shadow-xl shadow-indigo-900/40" style={{ backgroundColor: "var(--accent)" }}>
            <FiShield size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">
              System <span style={{ color: "var(--accent)" }}>Settings</span>
            </h1>
            <p className="text-sm font-medium mt-0.5" style={{ color: "var(--text-secondary)" }}>
              Manage your account, security, and preferences.
            </p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* SIDEBAR */}
          <aside className="lg:w-56 flex-shrink-0">
            <nav className="flex lg:flex-col gap-2">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isDanger = tab.id === "danger";
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 text-left w-full
                      ${isActive
                        ? isDanger ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                          : "text-white border border-[var(--accent)]/30"
                        : isDanger ? "text-rose-400/60 hover:bg-rose-500/10 hover:text-rose-400"
                          : "text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]"
                      }`}
                    style={isActive && !isDanger ? { backgroundColor: "var(--accent)", boxShadow: "0 4px 24px rgba(99,102,241,0.25)" } : {}}
                  >
                    <Icon size={16} />
                    <span className="hidden sm:inline lg:inline">{tab.label}</span>
                  </button>
                );
              })}
              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-[var(--text-secondary)] hover:bg-white/5 hover:text-rose-400 transition-all"
              >
                <FiLogOut size={16} />
                <span className="hidden sm:inline lg:inline">Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* CONTENT */}
          <main className="flex-1 min-w-0">
            {activeTab === "account"     && <AccountSection settings={settings} setSettings={setSettings} setUser={setUser} toast={toast} />}
            {activeTab === "security"    && <SecuritySection settings={settings} setSettings={setSettings} toast={toast} fetchUnread={fetchUnread} />}
            {activeTab === "preferences" && <PreferencesSection settings={settings} setSettings={setSettings} toast={toast} />}
            {activeTab === "danger"      && <DangerSection logout={logout} toast={toast} />}
          </main>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ACCOUNT SECTION
═══════════════════════════════════════════ */
function AccountSection({ settings, setSettings, setUser, toast }) {
  const [form, setForm] = useState({
    name: settings.name || "",
    username: settings.username || "",
    phone: settings.phone || "",
  });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({ name: settings.name || "", username: settings.username || "", phone: settings.phone || "" });
  }, [settings.name, settings.username, settings.phone]);

  const handleChange = (e) => {
    let value = e.target.value;
    // ✅ Strip @ if user types it manually
    if (e.target.name === "username") value = value.replace(/^@/, "");
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
    setStatus(null); setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading"); setError("");
    try {
      const res = await updateAccount(form);
      setUser?.((prev) => ({ ...prev, ...res.data.user }));
      setSettings((prev) => ({
        ...prev,
        ...res.data.user,
        usernameChangesLeft: res.data.usernameChangesLeft,
      }));
      setStatus("success");
      toast.success("Account updated successfully");
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update account";
      setError(msg);
      setStatus("error");
      toast.error(msg);
    }
  };

  const changesLeft = settings.usernameChangesLeft ?? 2;
  const usernameChanged = form.username !== settings.username;

  return (
    <SectionCard title="Account Information" icon={FiUser} desc="Update your name, username, and phone number.">
      <form onSubmit={handleSubmit} className="space-y-5 mt-6">

        {/* Name */}
        <Field label="Full Name">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="input-field" />
        </Field>

        {/* Username — ✅ @ shown as static prefix, input never contains @ */}
        <Field
          label="Username"
          hint={
            <span className={`flex items-center gap-1.5 ${changesLeft === 0 ? "text-rose-400" : changesLeft === 1 ? "text-amber-400" : "text-[var(--text-secondary)]"}`}>
              <FiInfo size={11} />
              {changesLeft === 0
                ? `Limit reached — next change available in ${settings.usernameWindowDays} days`
                : `${changesLeft} change${changesLeft !== 1 ? "s" : ""} remaining in the next ${settings.usernameWindowDays} days`}
            </span>
          }
        >
          <div className="relative">
            {/* ✅ Static @ prefix — purely visual, not part of the value */}
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-sm select-none pointer-events-none"
              style={{ color: "var(--accent)" }}
            >
              @
            </span>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="your_username"
              disabled={changesLeft === 0}
              className={`input-field pl-8 ${changesLeft === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {usernameChanged && changesLeft > 0 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
                uses 1 change
              </span>
            )}
          </div>
        </Field>

        {/* Email — permanent */}
        <Field label="Email Address" hint="Email is permanent and cannot be changed.">
          <div className="relative">
            <input value={settings.email || ""} disabled className="input-field opacity-50 cursor-not-allowed pr-24" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black px-2 py-0.5 rounded-full bg-[var(--bg-primary)] border"
                  style={{ color: "var(--text-secondary)", borderColor: "var(--border-color)" }}>
              Permanent
            </span>
          </div>
        </Field>

        {/* Phone */}
        <Field label="Phone Number" hint="OTP verification will be added soon.">
          <div className="relative">
            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2" size={14} style={{ color: "var(--text-secondary)" }} />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9876543210" className="input-field pl-9" />
          </div>
        </Field>

        {error && <ErrorMsg message={error} />}

        <div className="flex items-center gap-4 pt-2">
          <SubmitButton status={status} label="Save Changes" loadingLabel="Saving..." />
          {status === "success" && <SuccessMsg message="Saved!" />}
        </div>
      </form>
    </SectionCard>
  );
}

/* ═══════════════════════════════════════════
   SECURITY SECTION
═══════════════════════════════════════════ */
function SecuritySection({ settings, setSettings, toast, fetchUnread }) {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [twoFALoading, setTwoFALoading] = useState(false);
  // ✅ Local lock — immediately prevents re-submission after success
  const [justChanged, setJustChanged] = useState(false);
  const canChange = settings.canChangePassword && !justChanged;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus(null); setError("");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!canChange) return;
    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match"); setStatus("error"); return;
    }
    setStatus("loading"); setError("");
    try {
      const res = await changePassword(form);

      // ✅ Save new token so user stays logged in after password change
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setJustChanged(true); // ✅ Immediately locks form — prevents double submit
      setSettings((prev) => ({ ...prev, canChangePassword: false, passwordDaysLeft: res.data.passwordDaysLeft || 30 }));
      setStatus("success");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => fetchUnread(), 800);
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to change password";
      setError(msg); setStatus("error");
      toast.error(msg);
    }
  };

  const handleTwoFAToggle = async () => {
    setTwoFALoading(true);
    try {
      const newVal = !settings.twoFA;
      await updateSecurity(newVal);
      setSettings((prev) => ({ ...prev, twoFA: newVal }));
      toast.success(`Two-factor authentication ${newVal ? "enabled" : "disabled"}`);
    } catch {
      toast.error("Failed to update 2FA");
    } finally {
      setTwoFALoading(false);
    }
  };

  const strength = getPasswordStrength(form.newPassword);

  return (
    <div className="space-y-6">

      {/* Change Password */}
      <SectionCard title="Change Password" icon={FiLock} desc="Keep your account secure with a strong, unique password.">

        {!settings.canChangePassword && (
          <div className="mt-6 flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-sm font-semibold"
               style={{ backgroundColor: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.2)", color: "#f59e0b" }}>
            <FiInfo size={15} className="flex-shrink-0" />
            Password can be changed once every 30 days. Available again in{" "}
            <strong>{settings.passwordDaysLeft} day{settings.passwordDaysLeft !== 1 ? "s" : ""}</strong>.
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-5 mt-6">
          <Field label="Current Password">
            <PasswordInput name="currentPassword" value={form.currentPassword} onChange={handleChange}
              show={show.current} onToggle={() => setShow((s) => ({ ...s, current: !s.current }))}
              placeholder="Enter current password" disabled={!canChange} />
          </Field>

          <Field label="New Password">
            <PasswordInput name="newPassword" value={form.newPassword} onChange={handleChange}
              show={show.new} onToggle={() => setShow((s) => ({ ...s, new: !s.new }))}
              placeholder="Min 8 chars, letter + number" disabled={!canChange} />
            {form.newPassword && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                         style={{ backgroundColor: strength.score >= i ? strength.color : "var(--border-color)" }} />
                  ))}
                </div>
                <p className="text-[11px] font-bold" style={{ color: strength.color }}>{strength.label}</p>
              </div>
            )}
          </Field>

          <Field label="Confirm New Password">
            <PasswordInput name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
              show={show.confirm} onToggle={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
              placeholder="Repeat new password" disabled={!canChange} />
            {form.confirmPassword && (
              <p className={`text-[11px] font-bold mt-1 ${form.newPassword === form.confirmPassword ? "text-emerald-400" : "text-rose-400"}`}>
                {form.newPassword === form.confirmPassword ? "✓ Passwords match" : "✗ Passwords don't match"}
              </p>
            )}
          </Field>

          {error && <ErrorMsg message={error} />}

          <div className="flex items-center gap-4 pt-2">
            <SubmitButton status={status} label="Update Password" loadingLabel="Updating..." disabled={!canChange} />
          </div>
        </form>
      </SectionCard>

      {/* 2FA */}
      <SectionCard title="Two-Factor Authentication" icon={FiShield} desc="Add an extra layer of security to your account.">
        <div className="flex items-center justify-between mt-6">
          <div>
            <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
              {settings.twoFA ? "2FA is enabled" : "2FA is disabled"}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
              {settings.twoFA ? "Your account is protected with two-factor authentication." : "Enable to require a code on login."}
            </p>
          </div>
          <Toggle checked={settings.twoFA} onChange={handleTwoFAToggle} loading={twoFALoading} color="#818cf8" />
        </div>
      </SectionCard>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PREFERENCES SECTION
═══════════════════════════════════════════ */
function PreferencesSection({ settings, setSettings, toast }) {
  const [loadingKey, setLoadingKey] = useState(null);

  const handleToggle = async (key, apiFn) => {
    setLoadingKey(key);
    try {
      const newVal = !settings[key];
      await apiFn(newVal);
      setSettings((prev) => ({ ...prev, [key]: newVal }));
      toast.success(`${key === "emailNotifications" ? "Email notifications" : "Profile visibility"} ${newVal ? "enabled" : "disabled"}`);
    } catch {
      toast.error("Failed to update preference");
    } finally {
      setLoadingKey(null);
    }
  };

  return (
    <SectionCard title="Preferences" icon={FiBell} desc="Control notifications and privacy settings.">
      <div className="mt-6 divide-y" style={{ borderColor: "var(--border-color)" }}>
        <PreferenceRow
          icon={FiBell} label="Email Notifications" color="#10b981"
          desc="Receive updates about your sessions, streaks, and weekly reports."
          checked={settings.emailNotifications}
          loading={loadingKey === "emailNotifications"}
          onChange={() => handleToggle("emailNotifications", updatePreferences)}
        />
        <PreferenceRow
          icon={FiGlobe} label="Public Profile" color="#818cf8"
          desc="Allow other users to view your profile, followers, and activity."
          checked={settings.profilePublic}
          loading={loadingKey === "profilePublic"}
          onChange={() => handleToggle("profilePublic", updatePrivacy)}
        />
      </div>
    </SectionCard>
  );
}

/* ═══════════════════════════════════════════
   DANGER ZONE
═══════════════════════════════════════════ */
function DangerSection({ logout, toast }) {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!password) { setError("Please enter your password"); return; }
    setStatus("loading"); setError("");
    try {
      await deleteAccount(password);
      setStatus("success");
      toast.success("Account deleted. Signing out...");
      setTimeout(() => logout(), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete account";
      setError(msg); setStatus("error");
      toast.error(msg);
    }
  };

  return (
    <>
      <SectionCard title="Danger Zone" icon={FiAlertTriangle} desc="These actions are permanent and cannot be undone." danger>
        <div className="mt-6 rounded-2xl border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
             style={{ borderColor: "rgba(225,29,72,0.2)", backgroundColor: "rgba(225,29,72,0.03)" }}>
          <div>
            <h4 className="font-bold text-rose-400">Delete Account</h4>
            <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
              Permanently deletes your account, all sessions, streaks, and data.
            </p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-all active:scale-95 whitespace-nowrap shadow-lg shadow-rose-900/20">
            <FiTrash2 size={14} /> Delete Account
          </button>
        </div>
      </SectionCard>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}>
          <div className="w-full max-w-md rounded-3xl p-8 border shadow-2xl"
               style={{ backgroundColor: "var(--bg-card)", borderColor: "rgba(225,29,72,0.3)" }}>
            <div className="w-14 h-14 rounded-2xl bg-rose-500/15 flex items-center justify-center mb-5 border border-rose-500/20">
              <FiTrash2 size={24} className="text-rose-400" />
            </div>
            <h3 className="text-xl font-black text-[var(--text-primary)] mb-2">Delete your account?</h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              This will permanently erase your account, interview history, streaks, and all data.
              <strong className="text-rose-400"> This cannot be undone.</strong>
            </p>
            <Field label="Confirm your password">
              <PasswordInput name="deletePassword" value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                show={showPass} onToggle={() => setShowPass((s) => !s)}
                placeholder="Enter your password to confirm" />
            </Field>
            {error && <p className="text-sm text-rose-400 font-semibold mt-3 flex items-center gap-2"><FiAlertTriangle size={13} /> {error}</p>}
            {status === "success" && <p className="text-sm text-emerald-400 font-semibold mt-3 flex items-center gap-2"><FiCheck size={13} /> Deleting...</p>}
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowModal(false); setPassword(""); setError(""); setStatus(null); }}
                disabled={status === "loading" || status === "success"}
                className="flex-1 py-3 rounded-2xl font-bold text-sm border transition-all hover:bg-white/5 disabled:opacity-40"
                style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                Cancel
              </button>
              <button onClick={handleDelete} disabled={status === "loading" || status === "success"}
                className="flex-1 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2">
                {status === "loading" ? <><FiLoader className="animate-spin" size={14} /> Deleting...</> : <><FiTrash2 size={14} /> Confirm Delete</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════
   SHARED SUB-COMPONENTS
═══════════════════════════════════════════ */
function SectionCard({ title, icon: Icon, desc, children, danger }) {
  return (
    <div className="rounded-3xl border p-8"
         style={{ backgroundColor: "var(--bg-card)", borderColor: danger ? "rgba(225,29,72,0.2)" : "var(--border-color)" }}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
             style={{ backgroundColor: danger ? "rgba(225,29,72,0.1)" : "var(--bg-primary)", color: danger ? "#f43f5e" : "var(--accent)" }}>
          <Icon size={18} />
        </div>
        <div>
          <h2 className="font-black text-lg tracking-tight" style={{ color: "var(--text-primary)" }}>{title}</h2>
          <p className="text-xs mt-0.5 font-medium" style={{ color: "var(--text-secondary)" }}>{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>{label}</label>
      {children}
      {hint && <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>{hint}</p>}
    </div>
  );
}

function PasswordInput({ name, value, onChange, show, onToggle, placeholder, disabled }) {
  return (
    <div className="relative">
      <input name={name} type={show ? "text" : "password"} value={value} onChange={onChange}
        placeholder={placeholder} disabled={disabled}
        className={`input-field pr-12 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} />
      <button type="button" onClick={onToggle} disabled={disabled}
        className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: "var(--text-secondary)" }}>
        {show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
      </button>
    </div>
  );
}

function Toggle({ checked, onChange, loading, color }) {
  return (
    <button type="button" onClick={onChange} disabled={loading}
      className="relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0 disabled:opacity-60"
      style={{ backgroundColor: checked ? color : "var(--border-color)" }}>
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${checked ? "left-[calc(100%-1.375rem)]" : "left-0.5"}`} />
      {loading && <span className="absolute inset-0 flex items-center justify-center"><FiLoader size={10} className="animate-spin text-white" /></span>}
    </button>
  );
}

function PreferenceRow({ icon: Icon, label, desc, checked, onChange, loading, color }) {
  return (
    <div className="flex items-center justify-between py-5 gap-4">
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
             style={{ backgroundColor: "var(--bg-primary)", color }}>
          <Icon size={16} />
        </div>
        <div>
          <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{label}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{desc}</p>
        </div>
      </div>
      <Toggle checked={checked} onChange={onChange} loading={loading} color={color} />
    </div>
  );
}

function SubmitButton({ status, label, loadingLabel, disabled }) {
  return (
    <button type="submit" disabled={status === "loading" || disabled}
      className="px-6 py-3 rounded-2xl text-white font-bold text-sm transition-all active:scale-95 disabled:opacity-60 flex items-center gap-2"
      style={{ backgroundColor: "var(--accent)" }}>
      {status === "loading" ? <><FiLoader className="animate-spin" size={14} /> {loadingLabel}</> : label}
    </button>
  );
}

function ErrorMsg({ message }) {
  return (
    <p className="text-sm text-rose-400 font-semibold flex items-center gap-2">
      <FiAlertTriangle size={14} /> {message}
    </p>
  );
}

function SuccessMsg({ message }) {
  return (
    <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-400">
      <FiCheck size={14} /> {message}
    </span>
  );
}

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8)  score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password) && /[^a-zA-Z0-9]/.test(password)) score++;
  const levels = [
    { score: 1, label: "Weak",   color: "#f43f5e" },
    { score: 2, label: "Fair",   color: "#f59e0b" },
    { score: 3, label: "Good",   color: "#818cf8" },
    { score: 4, label: "Strong", color: "#10b981" },
  ];
  return levels[score - 1] || { score: 1, label: "Weak", color: "#f43f5e" };
}