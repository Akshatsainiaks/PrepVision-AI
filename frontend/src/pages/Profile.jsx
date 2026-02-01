// import { useEffect, useState, useContext, useRef } from "react";
// import Navbar from "../components/Navbar";
// // import { API } from "../api/api";
// import API from "../api/api";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
// import React from "react";

// export default function Profile() {
//   const [data, setData] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [showAvatarMenu, setShowAvatarMenu] = useState(false);
//   const [showAvatarPreview, setShowAvatarPreview] = useState(false);

//   const fileInputRef = useRef(null);
//   const avatarMenuRef = useRef(null);

//   const { logout } = useContext(AuthContext);

//   /* ================= FETCH PROFILE ================= */
//   useEffect(() => {
//     let mounted = true;

//     (async () => {
//       try {
//         const res = await API.get("/credits/me");
//         if (mounted) setData(res.data);
//       } catch (err) {
//         console.error("Profile fetch error:", err);
//       }
//     })();

//     return () => (mounted = false);
//   }, []);

//   /* ================= CLOSE AVATAR MENU ================= */
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         avatarMenuRef.current &&
//         !avatarMenuRef.current.contains(e.target)
//       ) {
//         setShowAvatarMenu(false);
//       }
//     };

//     if (showAvatarMenu) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, [showAvatarMenu]);

//   if (!data || !data.user) return <ProfileSkeleton />;

//   /* ================= AVATAR UPLOAD ================= */
//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file || !file.type.startsWith("image/")) return;

//     const formData = new FormData();
//     formData.append("avatar", file);

//     try {
//       setUploading(true);
//       const res = await API.post("/users/avatar", formData);
//       setData((prev) => ({
//         ...prev,
//         user: { ...prev.user, avatar: res.data.avatar },
//       }));
//     } catch {
//       alert("Avatar upload failed");
//     } finally {
//       setUploading(false);
//       e.target.value = "";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
//       <Navbar />

//       <div className="max-w-5xl mx-auto p-8 space-y-12">
//         {/* ================= HEADER ================= */}
//         <div>
//           <h2 className="text-4xl font-extrabold text-[var(--accent)]">
//             Profile
//           </h2>
//           <p className="text-secondary mt-1">
//             Manage your personal information and account preferences
//           </p>
//         </div>

//         {/* ================= PROFILE OVERVIEW ================= */}
//         <div className="card rounded-3xl p-8">
//           <div className="flex items-center gap-6">
//             {/* Avatar */}
//             <div className="relative" ref={avatarMenuRef}>
//               <div
//                 onClick={() => setShowAvatarMenu((p) => !p)}
//                 className="w-20 h-20 rounded-full overflow-hidden
//                 bg-gradient-to-r from-purple-500 to-blue-500
//                 flex items-center justify-center
//                 text-4xl font-bold cursor-pointer"
//               >
//                 {data.user.avatar ? (
//                   <img
//                     src={data.user.avatar}
//                     alt="avatar"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   data.user.name?.charAt(0)
//                 )}
//               </div>

//               {showAvatarMenu && (
//                 <div
//                   className="absolute left-1/2 -translate-x-1/2 mt-2 w-40
//                   rounded-xl shadow-lg z-50"
//                   style={{
//                     backgroundColor: "var(--bg-secondary)",
//                     border: "1px solid var(--border-color)",
//                   }}
//                 >
//                   <button
//                     className="menu-btn"
//                     onClick={() => {
//                       setShowAvatarPreview(true);
//                       setShowAvatarMenu(false);
//                     }}
//                   >
//                     👁 View avatar
//                   </button>
//                   <button
//                     className="menu-btn"
//                     onClick={() => {
//                       fileInputRef.current?.click();
//                       setShowAvatarMenu(false);
//                     }}
//                   >
//                     ⬆ Change avatar
//                   </button>
//                 </div>
//               )}

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleAvatarUpload}
//               />
//             </div>

//             {/* User info */}
//             <div>
//               <h3 className="text-2xl font-semibold">{data.user.name}</h3>
//               <p className="text-secondary">{data.user.email}</p>
//               {uploading && (
//                 <p className="text-xs text-[var(--accent)] mt-1">
//                   Uploading avatar…
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ================= QUICK ACTIONS ================= */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <ActionCard
//             title="Account Settings"
//             desc="Manage password and security"
//             link="/settings"
//           />
//           <ActionCard
//             title="Credit History"
//             desc="View usage and transactions"
//             link="/credit-history"
//           />
//           <ActionCard
//             title="Edit Profile"
//             desc="Update name & personal details"
//             link="/settings"
//           />
//         </div>

//         {/* ================= ACCOUNT INFO ================= */}
//         <div className="card rounded-3xl p-6">
//           <h3 className="text-xl font-semibold mb-4">
//             Account Information
//           </h3>
//           <div className="flex flex-col gap-2 text-sm">
//             <p>
//               <span className="text-secondary">Role:</span>{" "}
//               <strong>User</strong>
//             </p>
//             <p>
//               <span className="text-secondary">Email notifications:</span>{" "}
//               Enabled
//             </p>
//           </div>
//         </div>

//         {/* ================= SECURITY ================= */}
//         <div className="border border-red-500/30 bg-red-500/10 rounded-3xl p-6">
//           <h3 className="text-red-400 font-semibold mb-3">
//             Security
//           </h3>
//           <button
//             onClick={logout}
//             className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* ================= AVATAR PREVIEW ================= */}
//       {showAvatarPreview && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//           <div className="relative animate-fadeIn">
//             <img
//               src={data.user.avatar}
//               alt="avatar preview"
//               className="max-w-sm rounded-2xl"
//             />
//             <button
//               onClick={() => setShowAvatarPreview(false)}
//               className="absolute -top-3 -right-3 bg-red-600 rounded-full px-3 py-1 text-white"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ================= SUB COMPONENT ================= */
// function ActionCard({ title, desc, link }) {
//   return (
//     <Link
//       to={link}
//       className="card rounded-2xl p-6 hover:border-[var(--accent)] transition"
//     >
//       <h4 className="font-semibold mb-1">{title}</h4>
//       <p className="text-sm text-secondary">{desc}</p>
//     </Link>
//   );
// }


//new 

// import { useEffect, useState, useContext, useRef } from "react";
// import API from "../api/api";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
// import React from "react";

// export default function Profile() {
//   const [data, setData] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [showAvatarMenu, setShowAvatarMenu] = useState(false);
//   const [showAvatarPreview, setShowAvatarPreview] = useState(false);

//   const fileInputRef = useRef(null);
//   const avatarMenuRef = useRef(null);

//   const { logout } = useContext(AuthContext);

//   /* FETCH PROFILE */
//   useEffect(() => {
//     let mounted = true;

//     (async () => {
//       try {
//         const res = await API.get("/credits/me");
//         if (mounted) setData(res.data);
//       } catch (err) {
//         console.error("Profile fetch error:", err);
//       }
//     })();

//     return () => (mounted = false);
//   }, []);

//   /* CLOSE AVATAR MENU */
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         avatarMenuRef.current &&
//         !avatarMenuRef.current.contains(e.target)
//       ) {
//         setShowAvatarMenu(false);
//       }
//     };

//     if (showAvatarMenu) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, [showAvatarMenu]);

//   if (!data || !data.user) return <ProfileSkeleton />;

//   /* AVATAR UPLOAD */
//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file || !file.type.startsWith("image/")) return;

//     const formData = new FormData();
//     formData.append("avatar", file);

//     try {
//       setUploading(true);
//       const res = await API.post("/users/avatar", formData);

//       // 🔥 GLOBAL PERSIST
//       localStorage.setItem("avatar", res.data.avatar);

//       setData((prev) => ({
//         ...prev,
//         user: { ...prev.user, avatar: res.data.avatar },
//       }));
//     } catch {
//       alert("Avatar upload failed");
//     } finally {
//       setUploading(false);
//       e.target.value = "";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
//       <div className="max-w-5xl mx-auto p-8 space-y-12">
//         {/* HEADER */}
//         <div>
//           <h2 className="text-4xl font-extrabold text-[var(--accent)]">
//             Profile
//           </h2>
//           <p className="text-secondary mt-1">
//             Manage your personal information and account preferences
//           </p>
//         </div>

//         {/* PROFILE CARD */}
//         <div className="card rounded-3xl p-8">
//           <div className="flex items-center gap-6">
//             <div className="relative" ref={avatarMenuRef}>
//               <div
//                 onClick={() => setShowAvatarMenu((p) => !p)}
//                 className="w-20 h-20 rounded-full overflow-hidden
//                 bg-gradient-to-r from-purple-500 to-blue-500
//                 flex items-center justify-center
//                 text-4xl font-bold cursor-pointer"
//               >
//                 {data.user.avatar ? (
//                   <img
//                     src={data.user.avatar}
//                     alt="avatar"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   data.user.name?.charAt(0)
//                 )}
//               </div>

//               {showAvatarMenu && (
//                 <div
//                   className="absolute left-1/2 -translate-x-1/2 mt-2 w-40
//                   rounded-xl shadow-lg z-50 bg-[var(--bg-secondary)]
//                   border border-[var(--border-color)]"
//                 >
//                   <button
//                     className="menu-btn"
//                     onClick={() => {
//                       setShowAvatarPreview(true);
//                       setShowAvatarMenu(false);
//                     }}
//                   >
//                     👁 View avatar
//                   </button>
//                   <button
//                     className="menu-btn"
//                     onClick={() => {
//                       fileInputRef.current?.click();
//                       setShowAvatarMenu(false);
//                     }}
//                   >
//                     ⬆ Change avatar
//                   </button>
//                 </div>
//               )}

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleAvatarUpload}
//               />
//             </div>

//             <div>
//               <h3 className="text-2xl font-semibold">{data.user.name}</h3>
//               <p className="text-secondary">{data.user.email}</p>
//               {uploading && (
//                 <p className="text-xs text-[var(--accent)] mt-1">
//                   Uploading avatar…
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ACTIONS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <ActionCard title="Account Settings" desc="Manage password" link="/settings" />
//           <ActionCard title="Credit History" desc="View transactions" link="/credit-history" />
//           <ActionCard title="Edit Profile" desc="Update details" link="/settings" />
//         </div>

//         {/* SECURITY */}
//         <div className="border border-red-500/30 bg-red-500/10 rounded-3xl p-6">
//           <h3 className="text-red-400 font-semibold mb-3">Security</h3>
//           <button
//             onClick={logout}
//             className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* AVATAR PREVIEW */}
//       {showAvatarPreview && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//           <div className="relative animate-fadeIn">
//             <img
//               src={data.user.avatar}
//               alt="avatar preview"
//               className="max-w-sm rounded-2xl"
//             />
//             <button
//               onClick={() => setShowAvatarPreview(false)}
//               className="absolute -top-3 -right-3 bg-red-600 rounded-full px-3 py-1 text-white"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* SUB COMPONENT */
// function ActionCard({ title, desc, link }) {
//   return (
//     <Link
//       to={link}
//       className="card rounded-2xl p-6 hover:border-[var(--accent)] transition"
//     >
//       <h4 className="font-semibold mb-1">{title}</h4>
//       <p className="text-sm text-secondary">{desc}</p>
//     </Link>
//   );
// }


// final new
import { useEffect, useState, useContext, useRef } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
import React from "react";
import { FiUser, FiSettings, FiCreditCard, FiEdit3, FiLogOut, FiCamera, FiEye } from "react-icons/fi";

export default function Profile() {
  const [data, setData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [showAvatarPreview, setShowAvatarPreview] = useState(false);

  const fileInputRef = useRef(null);
  const avatarMenuRef = useRef(null);

  const { logout } = useContext(AuthContext);

  /* FETCH PROFILE (Logic preserved) */
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await API.get("/credits/me");
        if (mounted) setData(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    })();
    return () => (mounted = false);
  }, []);

  /* CLOSE AVATAR MENU */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(e.target)) {
        setShowAvatarMenu(false);
      }
    };
    if (showAvatarMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAvatarMenu]);

  if (!data || !data.user) return <ProfileSkeleton />;

  /* AVATAR UPLOAD (Logic preserved) */
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      setUploading(true);
      const res = await API.post("/users/avatar", formData);
      localStorage.setItem("avatar", res.data.avatar);
      setData((prev) => ({
        ...prev,
        user: { ...prev.user, avatar: res.data.avatar },
      }));
    } catch {
      alert("Avatar upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans animate-fadeIn">
      <div className="max-w-5xl mx-auto p-8 space-y-10">
        
        {/* HEADER */}
        <header className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100">
            <FiUser size={28} />
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Profile <span className="text-indigo-600">Settings</span>
            </h2>
            <p className="text-slate-500 font-medium">Manage your identity and account preferences</p>
          </div>
        </header>

        {/* PROFILE CARD */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative" ref={avatarMenuRef}>
              <div
                onClick={() => setShowAvatarMenu((p) => !p)}
                className="group relative w-32 h-32 rounded-full overflow-hidden
                bg-slate-100 border-4 border-white shadow-lg
                flex items-center justify-center
                cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                {data.user.avatar ? (
                  <img
                    src={data.user.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-black text-slate-400">
                    {data.user.name?.charAt(0)}
                  </span>
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <FiCamera className="text-white text-2xl" />
                </div>
              </div>

              {/* ACTION MENU */}
              {showAvatarMenu && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 mt-4 w-48
                  rounded-2xl shadow-2xl z-50 bg-white
                  border border-slate-100 p-2 animate-fadeIn"
                >
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-colors"
                    onClick={() => {
                      setShowAvatarPreview(true);
                      setShowAvatarMenu(false);
                    }}
                  >
                    <FiEye /> View Avatar
                  </button>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-colors"
                    onClick={() => {
                      fileInputRef.current?.click();
                      setShowAvatarMenu(false);
                    }}
                  >
                    <FiCamera /> Change Avatar
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">{data.user.name}</h3>
              <p className="text-slate-500 font-medium text-lg">{data.user.email}</p>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full border border-indigo-100 uppercase tracking-widest">Candidate</span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100 uppercase tracking-widest">Verified</span>
              </div>
              {uploading && (
                <p className="text-xs text-indigo-600 font-bold mt-3 animate-pulse">
                  Syncing avatar to cloud...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ACTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard 
            title="Account Security" 
            desc="Update your password" 
            link="/settings" 
            icon={<FiSettings className="text-blue-500" />} 
          />
          <ActionCard 
            title="Credit Wallet" 
            desc="Track your tokens" 
            link="/credit-history" 
            icon={<FiCreditCard className="text-indigo-500" />} 
          />
          <ActionCard 
            title="Edit Identity" 
            desc="Modify user details" 
            link="/settings" 
            icon={<FiEdit3 className="text-emerald-500" />} 
          />
        </div>

        {/* DANGER ZONE */}
        <div className="border border-rose-100 bg-rose-50 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-rose-600 font-black text-xl">Sign Out</h3>
            <p className="text-rose-400 text-sm font-medium mt-1">Safely terminate your current session</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-lg shadow-rose-100 transition-all active:scale-95"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* AVATAR PREVIEW MODAL */}
      {showAvatarPreview && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="relative animate-fadeIn bg-white p-2 rounded-[2rem] shadow-2xl">
            <img
              src={data.user.avatar}
              alt="avatar preview"
              className="max-w-full max-h-[70vh] rounded-[1.5rem]"
            />
            <button
              onClick={() => setShowAvatarPreview(false)}
              className="absolute -top-4 -right-4 bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* SUB COMPONENT (Improved with Icons) */
function ActionCard({ title, desc, link, icon }) {
  return (
    <Link
      to={link}
      className="group bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-300 transition-all"
    >
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors">
        {React.cloneElement(icon, { size: 22 })}
      </div>
      <h4 className="font-black text-xl text-slate-900 mb-2">{title}</h4>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
    </Link>
  );
}