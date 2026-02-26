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
// import { useEffect, useState, useContext, useRef } from "react";
// import API from "../api/api";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
// import React from "react";
// import { FiUser, FiSettings, FiCreditCard, FiEdit3, FiLogOut, FiCamera, FiEye } from "react-icons/fi";

// export default function Profile() {
//   const [data, setData] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [showAvatarMenu, setShowAvatarMenu] = useState(false);
//   const [showAvatarPreview, setShowAvatarPreview] = useState(false);

//   const fileInputRef = useRef(null);
//   const avatarMenuRef = useRef(null);

//   const { logout } = useContext(AuthContext);

//   /* FETCH PROFILE (Logic preserved) */
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
//       if (avatarMenuRef.current && !avatarMenuRef.current.contains(e.target)) {
//         setShowAvatarMenu(false);
//       }
//     };
//     if (showAvatarMenu) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showAvatarMenu]);

//   if (!data || !data.user) return <ProfileSkeleton />;

//   /* AVATAR UPLOAD (Logic preserved) */
//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file || !file.type.startsWith("image/")) return;
//     const formData = new FormData();
//     formData.append("avatar", file);
//     try {
//       setUploading(true);
//       const res = await API.post("/users/avatar", formData);
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
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans animate-fadeIn">
//       <div className="max-w-5xl mx-auto p-8 space-y-10">
        
//         {/* HEADER */}
//         <header className="flex items-center gap-4">
//           <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100">
//             <FiUser size={28} />
//           </div>
//           <div>
//             <h2 className="text-4xl font-black tracking-tight text-slate-900">
//               Profile <span className="text-indigo-600">Settings</span>
//             </h2>
//             <p className="text-slate-500 font-medium">Manage your identity and account preferences</p>
//           </div>
//         </header>

//         {/* PROFILE CARD */}
//         <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50">
//           <div className="flex flex-col md:flex-row items-center gap-8">
//             <div className="relative" ref={avatarMenuRef}>
//               <div
//                 onClick={() => setShowAvatarMenu((p) => !p)}
//                 className="group relative w-32 h-32 rounded-full overflow-hidden
//                 bg-slate-100 border-4 border-white shadow-lg
//                 flex items-center justify-center
//                 cursor-pointer transition-transform hover:scale-105 active:scale-95"
//               >
//                 {data.user.avatar ? (
//                   <img
//                     src={data.user.avatar}
//                     alt="avatar"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-4xl font-black text-slate-400">
//                     {data.user.name?.charAt(0)}
//                   </span>
//                 )}
                
//                 {/* Overlay on hover */}
//                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
//                     <FiCamera className="text-white text-2xl" />
//                 </div>
//               </div>

//               {/* ACTION MENU */}
//               {showAvatarMenu && (
//                 <div
//                   className="absolute left-1/2 -translate-x-1/2 mt-4 w-48
//                   rounded-2xl shadow-2xl z-50 bg-white
//                   border border-slate-100 p-2 animate-fadeIn"
//                 >
//                   <button
//                     className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-colors"
//                     onClick={() => {
//                       setShowAvatarPreview(true);
//                       setShowAvatarMenu(false);
//                     }}
//                   >
//                     <FiEye /> View Avatar
//                   </button>
//                   <button
//                     className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-colors"
//                     onClick={() => {
//                       fileInputRef.current?.click();
//                       setShowAvatarMenu(false);
//                     }}
//                   >
//                     <FiCamera /> Change Avatar
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

//             <div className="text-center md:text-left">
//               <h3 className="text-3xl font-black text-slate-900 tracking-tight">{data.user.name}</h3>
//               <p className="text-slate-500 font-medium text-lg">{data.user.email}</p>
//               <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
//                   <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full border border-indigo-100 uppercase tracking-widest">Candidate</span>
//                   <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100 uppercase tracking-widest">Verified</span>
//               </div>
//               {uploading && (
//                 <p className="text-xs text-indigo-600 font-bold mt-3 animate-pulse">
//                   Syncing avatar to cloud...
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ACTIONS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <ActionCard 
//             title="Account Security" 
//             desc="Update your password" 
//             link="/settings" 
//             icon={<FiSettings className="text-blue-500" />} 
//           />
//           <ActionCard 
//             title="Credit Wallet" 
//             desc="Track your tokens" 
//             link="/credit-history" 
//             icon={<FiCreditCard className="text-indigo-500" />} 
//           />
//           <ActionCard 
//             title="Edit Identity" 
//             desc="Modify user details" 
//             link="/settings" 
//             icon={<FiEdit3 className="text-emerald-500" />} 
//           />
//         </div>

//         {/* DANGER ZONE */}
//         <div className="border border-rose-100 bg-rose-50 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
//           <div>
//             <h3 className="text-rose-600 font-black text-xl">Sign Out</h3>
//             <p className="text-rose-400 text-sm font-medium mt-1">Safely terminate your current session</p>
//           </div>
//           <button
//             onClick={logout}
//             className="flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-lg shadow-rose-100 transition-all active:scale-95"
//           >
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </div>

//       {/* AVATAR PREVIEW MODAL */}
//       {showAvatarPreview && (
//         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
//           <div className="relative animate-fadeIn bg-white p-2 rounded-[2rem] shadow-2xl">
//             <img
//               src={data.user.avatar}
//               alt="avatar preview"
//               className="max-w-full max-h-[70vh] rounded-[1.5rem]"
//             />
//             <button
//               onClick={() => setShowAvatarPreview(false)}
//               className="absolute -top-4 -right-4 bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-600 transition-colors"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* SUB COMPONENT (Improved with Icons) */
// function ActionCard({ title, desc, link, icon }) {
//   return (
//     <Link
//       to={link}
//       className="group bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-300 transition-all"
//     >
//       <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors">
//         {React.cloneElement(icon, { size: 22 })}
//       </div>
//       <h4 className="font-black text-xl text-slate-900 mb-2">{title}</h4>
//       <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
//     </Link>
//   );
// }

//dark mode
// import { useEffect, useState, useContext, useRef } from "react";
// import API from "../api/api";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
// import React from "react";
// import { FiUser, FiSettings, FiCreditCard, FiEdit3, FiLogOut, FiCamera, FiEye } from "react-icons/fi";

// export default function Profile() {
//   const [data, setData] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [showAvatarMenu, setShowAvatarMenu] = useState(false);
//   const [showAvatarPreview, setShowAvatarPreview] = useState(false);

//   const fileInputRef = useRef(null);
//   const avatarMenuRef = useRef(null);

//   const { logout } = useContext(AuthContext);

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

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (avatarMenuRef.current && !avatarMenuRef.current.contains(e.target)) {
//         setShowAvatarMenu(false);
//       }
//     };
//     if (showAvatarMenu) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showAvatarMenu]);

//   if (!data || !data.user) return <ProfileSkeleton />;

//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file || !file.type.startsWith("image/")) return;
//     const formData = new FormData();
//     formData.append("avatar", file);
//     try {
//       setUploading(true);
//       const res = await API.post("/users/avatar", formData);
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
//     <div className="min-h-screen font-sans animate-fadeIn transition-colors duration-300"
//          style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
//       <div className="max-w-5xl mx-auto p-8 space-y-10">
        
//         {/* HEADER */}
//         <header className="flex items-center gap-4">
//           <div className="p-3 rounded-2xl text-white shadow-xl shadow-indigo-500/10" 
//                style={{ backgroundColor: "var(--accent)" }}>
//             <FiUser size={28} />
//           </div>
//           <div>
//             <h2 className="text-4xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
//               Profile <span style={{ color: "var(--accent)" }}>Settings</span>
//             </h2>
//             <p style={{ color: "var(--text-secondary)" }} className="font-medium">Manage your identity and account preferences</p>
//           </div>
//         </header>

//         {/* PROFILE CARD */}
//         <div className="card rounded-[2.5rem] p-10 border border-[var(--border-color)]" 
//              style={{ backgroundColor: "var(--bg-card)" }}>
//           <div className="flex flex-col md:flex-row items-center gap-8">
//             <div className="relative" ref={avatarMenuRef}>
//               <div
//                 onClick={() => setShowAvatarMenu((p) => !p)}
//                 className="group relative w-32 h-32 rounded-full overflow-hidden
//                 border-4 shadow-lg flex items-center justify-center
//                 cursor-pointer transition-transform hover:scale-105 active:scale-95"
//                 style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)" }}
//               >
//                 {data.user.avatar ? (
//                   <img src={data.user.avatar} alt="avatar" className="w-full h-full object-cover" />
//                 ) : (
//                   <span className="text-4xl font-black" style={{ color: "var(--text-secondary)" }}>
//                     {data.user.name?.charAt(0)}
//                   </span>
//                 )}
                
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
//                     <FiCamera className="text-white text-2xl" />
//                 </div>
//               </div>

//               {/* FLOATING ACTION MENU */}
//               {showAvatarMenu && (
//                 <div
//                   className="absolute left-1/2 -translate-x-1/2 mt-4 w-52
//                   rounded-2xl shadow-2xl z-50 p-2 animate-fadeIn border border-[var(--border-color)]"
//                   style={{ backgroundColor: "var(--bg-card)", backdropBlur: "10px" }}
//                 >
//                   <button
//                     className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors hover:bg-white/5"
//                     style={{ color: "var(--text-primary)" }}
//                     onClick={() => {
//                       setShowAvatarPreview(true);
//                       setShowAvatarMenu(false);
//                     }}
//                   >
//                     <FiEye className="text-indigo-400" /> View Avatar
//                   </button>
//                   <button
//                     className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors hover:bg-white/5"
//                     style={{ color: "var(--text-primary)" }}
//                     onClick={() => {
//                       fileInputRef.current?.click();
//                       setShowAvatarMenu(false);
//                     }}
//                   >
//                     <FiCamera className="text-indigo-400" /> Change Avatar
//                   </button>
//                 </div>
//               )}

//               <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
//             </div>

//             <div className="text-center md:text-left">
//               <h3 className="text-3xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>{data.user.name}</h3>
//               <p className="font-medium text-lg" style={{ color: "var(--text-secondary)" }}>{data.user.email}</p>
//               <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
//                   <span className="px-3 py-1 text-[10px] font-bold rounded-full border border-indigo-500/20 uppercase tracking-widest"
//                         style={{ backgroundColor: "rgba(129, 140, 248, 0.1)", color: "var(--accent)" }}>
//                     Candidate
//                   </span>
//                   <span className="px-3 py-1 text-[10px] font-bold rounded-full border border-emerald-500/20 uppercase tracking-widest"
//                         style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
//                     Verified
//                   </span>
//               </div>
//               {uploading && (
//                 <p className="text-xs font-bold mt-4 animate-pulse text-indigo-400">
//                   Updating cloud assets...
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ACTIONS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <ActionCard 
//             title="Account Security" 
//             desc="Update your password and login methods" 
//             link="/settings" 
//             icon={<FiSettings className="text-blue-400" />} 
//           />
//           <ActionCard 
//             title="Credit Wallet" 
//             desc="View token history and balance" 
//             link="/credit-history" 
//             icon={<FiCreditCard className="text-indigo-400" />} 
//           />
//           <ActionCard 
//             title="Edit Identity" 
//             desc="Modify your public profile details" 
//             link="/settings" 
//             icon={<FiEdit3 className="text-emerald-400" />} 
//           />
//         </div>

//         {/* DANGER ZONE - Refined for Dark Mode */}
//         <div className="rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-rose-500/20"
//              style={{ backgroundColor: "rgba(225, 29, 72, 0.03)" }}>
//           <div>
//             <h3 className="font-black text-xl text-rose-500">Sign Out</h3>
//             <p className="text-sm font-medium mt-1 text-rose-400/70">Safely end your current session</p>
//           </div>
//           <button
//             onClick={logout}
//             className="flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-bold shadow-lg shadow-rose-900/20 transition-all hover:bg-rose-700 active:scale-95"
//             style={{ backgroundColor: "#e11d48" }}
//           >
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </div>

//       {/* AVATAR PREVIEW MODAL */}
//       {showAvatarPreview && (
//         <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[60] p-4">
//           <div className="relative animate-fadeIn p-2 rounded-[2.5rem] shadow-2xl border border-[var(--border-color)]" 
//                style={{ backgroundColor: "var(--bg-card)" }}>
//             <img
//               src={data.user.avatar}
//               alt="avatar preview"
//               className="max-w-full max-h-[75vh] rounded-[2rem] object-contain"
//             />
//             <button
//               onClick={() => setShowAvatarPreview(false)}
//               className="absolute -top-4 -right-4 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
//               style={{ backgroundColor: "var(--accent)" }}
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function ActionCard({ title, desc, link, icon }) {
//   return (
//     <Link
//       to={link}
//       className="group card rounded-[2rem] p-8 shadow-sm hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
//       style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
//     >
//       <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:bg-white/5"
//            style={{ backgroundColor: "var(--bg-primary)" }}>
//         {React.cloneElement(icon, { size: 24 })}
//       </div>
//       <h4 className="font-black text-xl mb-2 text-[var(--text-primary)]">{title}</h4>
//       <p className="text-sm font-medium leading-relaxed text-[var(--text-secondary)]">{desc}</p>
//     </Link>
//   );
// }

// import { useEffect, useState, useContext, useRef } from "react";
// import API from "../api/api";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
// import React from "react";
// import { FiUser, FiSettings, FiCreditCard, FiEdit3, FiLogOut, FiCamera, FiEye } from "react-icons/fi";

// export default function Profile() {
//   const [data, setData] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [showAvatarMenu, setShowAvatarMenu] = useState(false);
//   const [showAvatarPreview, setShowAvatarPreview] = useState(false);

//   const fileInputRef = useRef(null);
//   const avatarMenuRef = useRef(null);

//   const { logout } = useContext(AuthContext);

// useEffect(() => {
//   let mounted = true;
//   (async () => {
//     try {
//       const res = await API.get("/auth/me"); // ✅ FIXED
//       if (mounted) setData(res.data);
//     } catch (err) {
//       console.error("Profile fetch error:", err);
//     }
//   })();
//   return () => (mounted = false);
// }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (avatarMenuRef.current && !avatarMenuRef.current.contains(e.target)) {
//         setShowAvatarMenu(false);
//       }
//     };
//     if (showAvatarMenu) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showAvatarMenu]);

//   if (!data || !data.user) return <ProfileSkeleton />;

//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file || !file.type.startsWith("image/")) return;
//     const formData = new FormData();
//     formData.append("avatar", file);
//     try {
//       setUploading(true);
//       const res = await API.post("/users/avatar", formData);
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
//     <div
//       className="min-h-screen font-sans animate-fadeIn transition-colors duration-300"
//       style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
//     >
//       <div className="max-w-5xl mx-auto p-8 space-y-10">
        
//         {/* HEADER */}
//         <header className="flex items-center gap-4">
//           <div
//             className="p-3 rounded-2xl text-white shadow-xl shadow-indigo-500/10"
//             style={{ backgroundColor: "var(--accent)" }}
//           >
//             <FiUser size={28} />
//           </div>
//           <div>
//             <h2 className="text-4xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
//               Profile <span style={{ color: "var(--accent)" }}>Settings</span>
//             </h2>
//             <p style={{ color: "var(--text-secondary)" }} className="font-medium">
//               Manage your identity and account preferences
//             </p>
//           </div>
//         </header>

//         {/* PROFILE CARD */}
//         <div
//           className="card rounded-[2.5rem] p-10 border border-[var(--border-color)]"
//           style={{ backgroundColor: "var(--bg-card)" }}
//         >
//           <div className="flex flex-col md:flex-row items-center gap-8">
//             <div className="relative" ref={avatarMenuRef}>
//               <div
//                 onClick={() => setShowAvatarMenu((p) => !p)}
//                 className="group relative w-32 h-32 rounded-full overflow-hidden
//                 border-4 shadow-lg flex items-center justify-center
//                 cursor-pointer transition-transform hover:scale-105 active:scale-95"
//                 style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)" }}
//               >
//                 {data.user.avatar ? (
//                   <img src={data.user.avatar} alt="avatar" className="w-full h-full object-cover" />
//                 ) : (
//                   <span className="text-4xl font-black" style={{ color: "var(--text-secondary)" }}>
//                     {data.user.name?.charAt(0)}
//                   </span>
//                 )}

//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
//                   <FiCamera className="text-white text-2xl" />
//                 </div>
//               </div>

//               {showAvatarMenu && (
//                 <div
//                   className="absolute left-1/2 -translate-x-1/2 mt-4 w-52
//                   rounded-2xl shadow-2xl z-50 p-2 animate-fadeIn border border-[var(--border-color)]"
//                   style={{ backgroundColor: "var(--bg-card)", backdropBlur: "10px" }}
//                 >
//                   <button
//                     className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors hover:bg-white/5"
//                     style={{ color: "var(--text-primary)" }}
//                     onClick={() => {
//                       setShowAvatarPreview(true);
//                       setShowAvatarMenu(false);
//                     }}
//                   >
//                     <FiEye className="text-indigo-400" /> View Avatar
//                   </button>
//                   <button
//                     className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors hover:bg-white/5"
//                     style={{ color: "var(--text-primary)" }}
//                     onClick={() => {
//                       fileInputRef.current?.click();
//                       setShowAvatarMenu(false);
//                     }}
//                   >
//                     <FiCamera className="text-indigo-400" /> Change Avatar
//                   </button>
//                 </div>
//               )}

//               <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
//             </div>

//             <div className="text-center md:text-left">
//               <h3 className="text-3xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
//                 {data.user.name}
//               </h3>

//               {/* ✅ FIXED HERE */}
//               <p className="font-medium text-lg" style={{ color: "var(--text-secondary)" }}>
//                 @{data.user.username}
//               </p>

//               <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
//                 <span
//                   className="px-3 py-1 text-[10px] font-bold rounded-full border border-indigo-500/20 uppercase tracking-widest"
//                   style={{ backgroundColor: "rgba(129, 140, 248, 0.1)", color: "var(--accent)" }}
//                 >
//                   Candidate
//                 </span>
//                 <span
//                   className="px-3 py-1 text-[10px] font-bold rounded-full border border-emerald-500/20 uppercase tracking-widest"
//                   style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}
//                 >
//                   Verified
//                 </span>
//               </div>

//               {uploading && (
//                 <p className="text-xs font-bold mt-4 animate-pulse text-indigo-400">
//                   Updating cloud assets...
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ACTIONS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <ActionCard title="Account Security" desc="Update your password and login methods" link="/settings" icon={<FiSettings className="text-blue-400" />} />
//           <ActionCard title="Credit Wallet" desc="View token history and balance" link="/credit-history" icon={<FiCreditCard className="text-indigo-400" />} />
//           <ActionCard title="Edit Identity" desc="Modify your public profile details" link="/settings" icon={<FiEdit3 className="text-emerald-400" />} />
//         </div>

//         {/* LOGOUT */}
//         <div className="rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-rose-500/20"
//           style={{ backgroundColor: "rgba(225, 29, 72, 0.03)" }}>
//           <div>
//             <h3 className="font-black text-xl text-rose-500">Sign Out</h3>
//             <p className="text-sm font-medium mt-1 text-rose-400/70">Safely end your current session</p>
//           </div>
//           <button
//             onClick={logout}
//             className="flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-bold shadow-lg shadow-rose-900/20 transition-all hover:bg-rose-700 active:scale-95"
//             style={{ backgroundColor: "#e11d48" }}
//           >
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ActionCard({ title, desc, link, icon }) {
//   return (
//     <Link
//       to={link}
//       className="group card rounded-[2rem] p-8 shadow-sm hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
//       style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
//     >
//       <div
//         className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:bg-white/5"
//         style={{ backgroundColor: "var(--bg-primary)" }}
//       >
//         {React.cloneElement(icon, { size: 24 })}
//       </div>

//       <h4 className="font-black text-xl mb-2 text-[var(--text-primary)]">
//         {title}
//       </h4>

//       <p className="text-sm font-medium leading-relaxed text-[var(--text-secondary)]">
//         {desc}
//       </p>
//     </Link>
//   );
// }

// import { useEffect, useState, useContext, useRef } from "react";
// import API from "../api/api";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
// import React from "react";
// import {
//   FiUser,
//   FiSettings,
//   FiCreditCard,
//   FiEdit3,
//   FiLogOut,
//   FiCamera,
//   FiEye,
// } from "react-icons/fi";

// export default function Profile() {
//   const [data, setData] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [showAvatarMenu, setShowAvatarMenu] = useState(false);
//   const [showAvatarPreview, setShowAvatarPreview] = useState(false);

//   const fileInputRef = useRef(null);
//   const avatarMenuRef = useRef(null);

//   const { user, logout } = useContext(AuthContext);

//   /* ✅ FIX: REMOVE EXTRA API CALL
//      Now Profile reads from AuthContext only
//   */
//   useEffect(() => {
//     if (user) {
//       setData({ user });
//     }
//   }, [user]);

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

//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file || !file.type.startsWith("image/")) return;

//     const formData = new FormData();
//     formData.append("avatar", file);

//     try {
//       setUploading(true);
//       const res = await API.post("/users/avatar", formData);

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
//     <div
//       className="min-h-screen font-sans animate-fadeIn transition-colors duration-300"
//       style={{
//         backgroundColor: "var(--bg-primary)",
//         color: "var(--text-primary)",
//       }}
//     >
//       <div className="max-w-5xl mx-auto p-8 space-y-10">
//         {/* HEADER */}
//         <header className="flex items-center gap-4">
//           <div
//             className="p-3 rounded-2xl text-white shadow-xl shadow-indigo-500/10"
//             style={{ backgroundColor: "var(--accent)" }}
//           >
//             <FiUser size={28} />
//           </div>
//           <div>
//             <h2
//               className="text-4xl font-black tracking-tight"
//               style={{ color: "var(--text-primary)" }}
//             >
//               Profile <span style={{ color: "var(--accent)" }}>Settings</span>
//             </h2>
//             <p
//               style={{ color: "var(--text-secondary)" }}
//               className="font-medium"
//             >
//               Manage your identity and account preferences
//             </p>
//           </div>
//         </header>

//         {/* PROFILE CARD */}
//         <div
//           className="card rounded-[2.5rem] p-10 border border-[var(--border-color)]"
//           style={{ backgroundColor: "var(--bg-card)" }}
//         >
//           <div className="flex flex-col md:flex-row items-center gap-8">
//             <div className="relative" ref={avatarMenuRef}>
//               <div
//                 onClick={() => setShowAvatarMenu((p) => !p)}
//                 className="group relative w-32 h-32 rounded-full overflow-hidden
//                 border-4 shadow-lg flex items-center justify-center
//                 cursor-pointer transition-transform hover:scale-105 active:scale-95"
//                 style={{
//                   backgroundColor: "var(--bg-primary)",
//                   borderColor: "var(--border-color)",
//                 }}
//               >
//                 {data.user.avatar ? (
//                   <img
//                     src={data.user.avatar}
//                     alt="avatar"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span
//                     className="text-4xl font-black"
//                     style={{ color: "var(--text-secondary)" }}
//                   >
//                     {data.user.name?.charAt(0)}
//                   </span>
//                 )}

//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
//                   <FiCamera className="text-white text-2xl" />
//                 </div>
//               </div>

//               {showAvatarMenu && (
//                 <div
//                   className="absolute left-1/2 -translate-x-1/2 mt-4 w-52
//                   rounded-2xl shadow-2xl z-50 p-2 animate-fadeIn border border-[var(--border-color)]"
//                   style={{ backgroundColor: "var(--bg-card)" }}
//                 >
//                   <button
//                     className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors hover:bg-white/5"
//                     style={{ color: "var(--text-primary)" }}
//                     onClick={() => {
//                       setShowAvatarPreview(true);
//                       setShowAvatarMenu(false);
//                     }}
//                   >
//                     <FiEye className="text-indigo-400" /> View Avatar
//                   </button>

//                   <button
//                     className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors hover:bg-white/5"
//                     style={{ color: "var(--text-primary)" }}
//                     onClick={() => {
//                       fileInputRef.current?.click();
//                       setShowAvatarMenu(false);
//                     }}
//                   >
//                     <FiCamera className="text-indigo-400" /> Change Avatar
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

//             <div className="text-center md:text-left">
//               <h3
//                 className="text-3xl font-black tracking-tight"
//                 style={{ color: "var(--text-primary)" }}
//               >
//                 {data.user.name}
//               </h3>

//               <p
//                 className="font-medium text-lg"
//                 style={{ color: "var(--text-secondary)" }}
//               >
//                 @{data.user.username}
//               </p>

//               <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
//                 <span
//                   className="px-3 py-1 text-[10px] font-bold rounded-full border border-indigo-500/20 uppercase tracking-widest"
//                   style={{
//                     backgroundColor: "rgba(129, 140, 248, 0.1)",
//                     color: "var(--accent)",
//                   }}
//                 >
//                   Candidate
//                 </span>

//                 <span
//                   className="px-3 py-1 text-[10px] font-bold rounded-full border border-emerald-500/20 uppercase tracking-widest"
//                   style={{
//                     backgroundColor: "rgba(16, 185, 129, 0.1)",
//                     color: "#10b981",
//                   }}
//                 >
//                   Verified
//                 </span>
//               </div>

//               {uploading && (
//                 <p className="text-xs font-bold mt-4 animate-pulse text-indigo-400">
//                   Updating cloud assets...
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ACTIONS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <ActionCard
//             title="Account Security"
//             desc="Update your password and login methods"
//             link="/settings"
//             icon={<FiSettings className="text-blue-400" />}
//           />
//           <ActionCard
//             title="Credit Wallet"
//             desc="View token history and balance"
//             link="/credit-history"
//             icon={<FiCreditCard className="text-indigo-400" />}
//           />
//           <ActionCard
//             title="Edit Identity"
//             desc="Modify your public profile details"
//             link="/settings"
//             icon={<FiEdit3 className="text-emerald-400" />}
//           />
//         </div>

//         {/* LOGOUT */}
//         <div
//           className="rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-rose-500/20"
//           style={{ backgroundColor: "rgba(225, 29, 72, 0.03)" }}
//         >
//           <div>
//             <h3 className="font-black text-xl text-rose-500">Sign Out</h3>
//             <p className="text-sm font-medium mt-1 text-rose-400/70">
//               Safely end your current session
//             </p>
//           </div>

//           <button
//             onClick={logout}
//             className="flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-bold shadow-lg shadow-rose-900/20 transition-all hover:bg-rose-700 active:scale-95"
//             style={{ backgroundColor: "#e11d48" }}
//           >
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ActionCard({ title, desc, link, icon }) {
//   return (
//     <Link
//       to={link}
//       className="group card rounded-[2rem] p-8 shadow-sm hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
//       style={{
//         backgroundColor: "var(--bg-card)",
//         border: "1px solid var(--border-color)",
//       }}
//     >
//       <div
//         className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:bg-white/5"
//         style={{ backgroundColor: "var(--bg-primary)" }}
//       >
//         {React.cloneElement(icon, { size: 24 })}
//       </div>

//       <h4 className="font-black text-xl mb-2 text-[var(--text-primary)]">
//         {title}
//       </h4>

//       <p className="text-sm font-medium leading-relaxed text-[var(--text-secondary)]">
//         {desc}
//       </p>
//     </Link>
//   );
// }

//before is final before live




// import { useEffect, useState, useContext, useRef } from "react";
// import API from "../api/api";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
// import React from "react";
// import {
//   FiUser,
//   FiSettings,
//   FiCreditCard,
//   FiEdit3,
//   FiLogOut,
//   FiCamera,
//   FiEye,
// } from "react-icons/fi";

// export default function Profile() {
//   const [data, setData] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [showAvatarMenu, setShowAvatarMenu] = useState(false);
//   const [showAvatarPreview, setShowAvatarPreview] = useState(false);

//   const fileInputRef = useRef(null);
//   const avatarMenuRef = useRef(null);

//   // ✅ FIX: Prevent double API call in React 18 StrictMode
//   const hasFetched = useRef(false);

//   const { setUser, logout } = useContext(AuthContext);

//   useEffect(() => {
//     if (hasFetched.current) return; // 🚀 block second call
//     hasFetched.current = true;

//     const loadProfile = async () => {
//       try {
//         const res = await API.get("/auth/myprofile");

//         if (res?.data?.user) {
//           setData({ user: res.data.user });
//           setUser(res.data.user);
//         }
//       } catch (err) {
//         console.error("Profile load error:", err);
//       }
//     };

//     loadProfile();
//   }, []);

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

//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file || !file.type.startsWith("image/")) return;

//     const formData = new FormData();
//     formData.append("avatar", file);

//     try {
//       setUploading(true);
//       const res = await API.post("/users/avatar", formData);

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
//     <div
//       className="min-h-screen font-sans animate-fadeIn transition-colors duration-300"
//       style={{
//         backgroundColor: "var(--bg-primary)",
//         color: "var(--text-primary)",
//       }}
//     >
//       <div className="max-w-5xl mx-auto p-8 space-y-10">
//         {/* HEADER */}
//         <header className="flex items-center gap-4">
//           <div
//             className="p-3 rounded-2xl text-white shadow-xl shadow-indigo-500/10"
//             style={{ backgroundColor: "var(--accent)" }}
//           >
//             <FiUser size={28} />
//           </div>
//           <div>
//             <h2
//               className="text-4xl font-black tracking-tight"
//               style={{ color: "var(--text-primary)" }}
//             >
//               Profile <span style={{ color: "var(--accent)" }}>Settings</span>
//             </h2>
//             <p
//               style={{ color: "var(--text-secondary)" }}
//               className="font-medium"
//             >
//               Manage your identity and account preferences
//             </p>
//           </div>
//         </header>

//         {/* PROFILE CARD */}
//         <div
//           className="card rounded-[2.5rem] p-10 border border-[var(--border-color)]"
//           style={{ backgroundColor: "var(--bg-card)" }}
//         >
//           <div className="flex flex-col md:flex-row items-center gap-8">
//             <div className="relative" ref={avatarMenuRef}>
//               <div
//                 onClick={() => setShowAvatarMenu((p) => !p)}
//                 className="group relative w-32 h-32 rounded-full overflow-hidden
//                 border-4 shadow-lg flex items-center justify-center
//                 cursor-pointer transition-transform hover:scale-105 active:scale-95"
//                 style={{
//                   backgroundColor: "var(--bg-primary)",
//                   borderColor: "var(--border-color)",
//                 }}
//               >
//                 {data.user.avatar ? (
//                   <img
//                     src={data.user.avatar}
//                     alt="avatar"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span
//                     className="text-4xl font-black"
//                     style={{ color: "var(--text-secondary)" }}
//                   >
//                     {data.user.name?.charAt(0)}
//                   </span>
//                 )}

//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
//                   <FiCamera className="text-white text-2xl" />
//                 </div>
//               </div>

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleAvatarUpload}
//               />
//             </div>

//             <div className="text-center md:text-left">
//               <h3 className="text-3xl font-black tracking-tight">
//                 {data.user.name}
//               </h3>

//               <p className="font-medium text-lg text-[var(--text-secondary)]">
//                 @{data.user.username}
//               </p>

//               {uploading && (
//                 <p className="text-xs font-bold mt-4 animate-pulse text-indigo-400">
//                   Updating cloud assets...
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ACTIONS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <ActionCard
//             title="Account Security"
//             desc="Update your password and login methods"
//             link="/settings"
//             icon={<FiSettings className="text-blue-400" />}
//           />
//           <ActionCard
//             title="Credit Wallet"
//             desc="View token history and balance"
//             link="/credit-history"
//             icon={<FiCreditCard className="text-indigo-400" />}
//           />
//           <ActionCard
//             title="Edit Identity"
//             desc="Modify your public profile details"
//             link="/settings"
//             icon={<FiEdit3 className="text-emerald-400" />}
//           />
//         </div>

//         {/* LOGOUT */}
//         <div
//           className="rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-rose-500/20"
//           style={{ backgroundColor: "rgba(225, 29, 72, 0.03)" }}
//         >
//           <div>
//             <h3 className="font-black text-xl text-rose-500">Sign Out</h3>
//             <p className="text-sm font-medium mt-1 text-rose-400/70">
//               Safely end your current session
//             </p>
//           </div>

//           <button
//             onClick={logout}
//             className="flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-bold shadow-lg shadow-rose-900/20 transition-all hover:bg-rose-700 active:scale-95"
//             style={{ backgroundColor: "#e11d48" }}
//           >
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ActionCard({ title, desc, link, icon }) {
//   return (
//     <Link
//       to={link}
//       className="group card rounded-[2rem] p-8 shadow-sm hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
//       style={{
//         backgroundColor: "var(--bg-card)",
//         border: "1px solid var(--border-color)",
//       }}
//     >
//       <div
//         className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:bg-white/5"
//         style={{ backgroundColor: "var(--bg-primary)" }}
//       >
//         {React.cloneElement(icon, { size: 24 })}
//       </div>

//       <h4 className="font-black text-xl mb-2 text-[var(--text-primary)]">
//         {title}
//       </h4>

//       <p className="text-sm font-medium leading-relaxed text-[var(--text-secondary)]">
//         {desc}
//       </p>
//     </Link>
//   );
// }


// import { useEffect, useState, useContext, useRef } from "react";
// import API from "../api/api";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
// import React from "react";
// import {
//   FiUser,
//   FiSettings,
//   FiCreditCard,
//   FiEdit3,
//   FiLogOut,
//   FiCamera,
//   FiEye,
//   FiX,
// } from "react-icons/fi";

// export default function Profile() {
//   const [data, setData] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [showAvatarMenu, setShowAvatarMenu] = useState(false);
//   const [showAvatarPreview, setShowAvatarPreview] = useState(false);

//   const fileInputRef = useRef(null);
//   const avatarMenuRef = useRef(null);

//   const hasFetched = useRef(false);

//   const { setUser, logout } = useContext(AuthContext);

//   useEffect(() => {
//     if (hasFetched.current) return;
//     hasFetched.current = true;

//     const loadProfile = async () => {
//       try {
//         const res = await API.get("/auth/myprofile");

//         if (res?.data?.user) {
//           setData({ user: res.data.user });
//           setUser(res.data.user);
//         }
//       } catch (err) {
//         console.error("Profile load error:", err);
//       }
//     };

//     loadProfile();
//   }, []);

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

//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file || !file.type.startsWith("image/")) return;

//     const formData = new FormData();
//     formData.append("avatar", file);

//     try {
//       setUploading(true);
//       const res = await API.post("/users/avatar", formData);

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
//     <div
//       className="min-h-screen font-sans animate-fadeIn transition-colors duration-300"
//       style={{
//         backgroundColor: "var(--bg-primary)",
//         color: "var(--text-primary)",
//       }}
//     >
//       <div className="max-w-5xl mx-auto p-8 space-y-10">

//         {/* HEADER */}
//         <header className="flex items-center gap-4">
//           <div
//             className="p-3 rounded-2xl text-white shadow-xl shadow-indigo-500/10"
//             style={{ backgroundColor: "var(--accent)" }}
//           >
//             <FiUser size={28} />
//           </div>
//           <div>
//             <h2 className="text-4xl font-black tracking-tight">
//               Profile <span style={{ color: "var(--accent)" }}>Settings</span>
//             </h2>
//             <p className="font-medium text-[var(--text-secondary)]">
//               Manage your identity and account preferences
//             </p>
//           </div>
//         </header>

//         {/* PROFILE CARD */}
//         <div
//           className="card rounded-[2.5rem] p-10 border border-[var(--border-color)]"
//           style={{ backgroundColor: "var(--bg-card)" }}
//         >
//           <div className="flex flex-col md:flex-row items-center gap-8">
//             <div className="relative" ref={avatarMenuRef}>

//               {/* AVATAR */}
//               <div
//                 onClick={() => setShowAvatarMenu((p) => !p)}
//                 className="group relative w-32 h-32 rounded-full overflow-hidden
//                 border-4 shadow-lg flex items-center justify-center
//                 cursor-pointer transition-transform hover:scale-105 active:scale-95"
//                 style={{
//                   backgroundColor: "var(--bg-primary)",
//                   borderColor: "var(--border-color)",
//                 }}
//               >
//                 {data.user.avatar ? (
//                   <img
//                     src={data.user.avatar}
//                     alt="avatar"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-4xl font-black text-[var(--text-secondary)]">
//                     {data.user.name?.charAt(0)}
//                   </span>
//                 )}

//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
//                   <FiCamera className="text-white text-2xl" />
//                 </div>
//               </div>

//               {/* DROPDOWN MENU */}
//               {showAvatarMenu && (
//                 <div
//                   className="absolute left-1/2 -translate-x-1/2 mt-4 w-52
//                   rounded-2xl shadow-2xl z-50 p-2 border border-[var(--border-color)]"
//                   style={{ backgroundColor: "var(--bg-card)" }}
//                 >
//                   <button
//                     className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl hover:bg-white/5"
//                     onClick={() => {
//                       setShowAvatarPreview(true);
//                       setShowAvatarMenu(false);
//                     }}
//                   >
//                     <FiEye className="text-indigo-400" /> View Avatar
//                   </button>

//                   <button
//                     className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl hover:bg-white/5"
//                     onClick={() => {
//                       fileInputRef.current?.click();
//                       setShowAvatarMenu(false);
//                     }}
//                   >
//                     <FiCamera className="text-indigo-400" /> Change Avatar
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

//             {/* USER INFO */}
//             <div className="text-center md:text-left">
//               <h3 className="text-3xl font-black tracking-tight">
//                 {data.user.name}
//               </h3>

//               <p className="font-medium text-lg text-[var(--text-secondary)]">
//                 @{data.user.username}
//               </p>

//               {uploading && (
//                 <p className="text-xs font-bold mt-4 animate-pulse text-indigo-400">
//                   Updating cloud assets...
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ACTIONS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <ActionCard
//             title="Account Security"
//             desc="Update your password and login methods"
//             link="/settings"
//             icon={<FiSettings className="text-blue-400" />}
//           />
//           <ActionCard
//             title="Credit Wallet"
//             desc="View token history and balance"
//             link="/credit-history"
//             icon={<FiCreditCard className="text-indigo-400" />}
//           />
//           <ActionCard
//             title="Edit Identity"
//             desc="Modify your public profile details"
//             link="/settings"
//             icon={<FiEdit3 className="text-emerald-400" />}
//           />
//         </div>

//         {/* LOGOUT */}
//         <div
//           className="rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-rose-500/20"
//           style={{ backgroundColor: "rgba(225, 29, 72, 0.03)" }}
//         >
//           <div>
//             <h3 className="font-black text-xl text-rose-500">Sign Out</h3>
//             <p className="text-sm font-medium mt-1 text-rose-400/70">
//               Safely end your current session
//             </p>
//           </div>

//           <button
//             onClick={logout}
//             className="flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-bold shadow-lg shadow-rose-900/20 hover:bg-rose-700 active:scale-95"
//             style={{ backgroundColor: "#e11d48" }}
//           >
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </div>

//       {/* AVATAR PREVIEW MODAL */}
//       {showAvatarPreview && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="relative">
//             <button
//               onClick={() => setShowAvatarPreview(false)}
//               className="absolute -top-10 right-0 text-white text-xl"
//             >
//               <FiX />
//             </button>

//             {data.user.avatar ? (
//               <img
//                 src={data.user.avatar}
//                 alt="preview"
//                 className="w-80 h-80 object-cover rounded-2xl"
//               />
//             ) : (
//               <div className="w-80 h-80 flex items-center justify-center bg-gray-800 rounded-2xl text-white text-5xl font-bold">
//                 {data.user.name?.charAt(0)}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function ActionCard({ title, desc, link, icon }) {
//   return (
//     <Link
//       to={link}
//       className="group card rounded-[2rem] p-8 shadow-sm hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
//       style={{
//         backgroundColor: "var(--bg-card)",
//         border: "1px solid var(--border-color)",
//       }}
//     >
//       <div
//         className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/5"
//         style={{ backgroundColor: "var(--bg-primary)" }}
//       >
//         {React.cloneElement(icon, { size: 24 })}
//       </div>

//       <h4 className="font-black text-xl mb-2 text-[var(--text-primary)]">
//         {title}
//       </h4>

//       <p className="text-sm font-medium leading-relaxed text-[var(--text-secondary)]">
//         {desc}
//       </p>
//     </Link>
//   );
// }

// import { useEffect, useState, useContext, useRef } from "react";
// import API from "../api/api";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
// import React from "react";
// import {
//   FiUser,
//   FiSettings,
//   FiCreditCard,
//   FiEdit3,
//   FiLogOut,
//   FiCamera,
//   FiEye,
//   FiX,
// } from "react-icons/fi";

// export default function Profile() {
//   const { user, setUser, logout } = useContext(AuthContext);

//   const [uploading, setUploading] = useState(false);
//   const [showAvatarMenu, setShowAvatarMenu] = useState(false);
//   const [showAvatarPreview, setShowAvatarPreview] = useState(false);

//   const fileInputRef = useRef(null);
//   const avatarMenuRef = useRef(null);

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

//   // ✅ Now using context user
//   if (!user) return <ProfileSkeleton />;

//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file || !file.type.startsWith("image/")) return;

//     const formData = new FormData();
//     formData.append("avatar", file);

//     try {
//       setUploading(true);
//       const res = await API.post("/users/avatar", formData);

//       localStorage.setItem("avatar", res.data.avatar);

//       // ✅ update global context user (no local data state)
//       setUser((prev) => ({
//         ...prev,
//         avatar: res.data.avatar,
//       }));
//     } catch {
//       alert("Avatar upload failed");
//     } finally {
//       setUploading(false);
//       e.target.value = "";
//     }
//   };

//   return (
//     <div
//       className="min-h-screen font-sans animate-fadeIn transition-colors duration-300"
//       style={{
//         backgroundColor: "var(--bg-primary)",
//         color: "var(--text-primary)",
//       }}
//     >
//       <div className="max-w-5xl mx-auto p-8 space-y-10">

//         {/* HEADER */}
//         <header className="flex items-center gap-4">
//           <div
//             className="p-3 rounded-2xl text-white shadow-xl shadow-indigo-500/10"
//             style={{ backgroundColor: "var(--accent)" }}
//           >
//             <FiUser size={28} />
//           </div>
//           <div>
//             <h2 className="text-4xl font-black tracking-tight">
//               Profile <span style={{ color: "var(--accent)" }}>Settings</span>
//             </h2>
//             <p className="font-medium text-[var(--text-secondary)]">
//               Manage your identity and account preferences
//             </p>
//           </div>
//         </header>

//         {/* PROFILE CARD */}
//         <div
//           className="card rounded-[2.5rem] p-10 border border-[var(--border-color)]"
//           style={{ backgroundColor: "var(--bg-card)" }}
//         >
//           <div className="flex flex-col md:flex-row items-center gap-8">
//             <div className="relative" ref={avatarMenuRef}>

//               {/* AVATAR */}
//               <div
//                 onClick={() => setShowAvatarMenu((p) => !p)}
//                 className="group relative w-32 h-32 rounded-full overflow-hidden
//                 border-4 shadow-lg flex items-center justify-center
//                 cursor-pointer transition-transform hover:scale-105 active:scale-95"
//                 style={{
//                   backgroundColor: "var(--bg-primary)",
//                   borderColor: "var(--border-color)",
//                 }}
//               >
//                 {user.avatar ? (
//                   <img
//                     src={user.avatar}
//                     alt="avatar"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-4xl font-black text-[var(--text-secondary)]">
//                     {user.name?.charAt(0)}
//                   </span>
//                 )}

//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
//                   <FiCamera className="text-white text-2xl" />
//                 </div>
//               </div>

//               {/* DROPDOWN MENU */}
//               {showAvatarMenu && (
//                 <div
//                   className="absolute left-1/2 -translate-x-1/2 mt-4 w-52
//                   rounded-2xl shadow-2xl z-50 p-2 border border-[var(--border-color)]"
//                   style={{ backgroundColor: "var(--bg-card)" }}
//                 >
//                   <button
//                     className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl hover:bg-white/5"
//                     onClick={() => {
//                       setShowAvatarPreview(true);
//                       setShowAvatarMenu(false);
//                     }}
//                   >
//                     <FiEye className="text-indigo-400" /> View Avatar
//                   </button>

//                   <button
//                     className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl hover:bg-white/5"
//                     onClick={() => {
//                       fileInputRef.current?.click();
//                       setShowAvatarMenu(false);
//                     }}
//                   >
//                     <FiCamera className="text-indigo-400" /> Change Avatar
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

//             {/* USER INFO */}
//             <div className="text-center md:text-left">
//               <h3 className="text-3xl font-black tracking-tight">
//                 {user.name}
//               </h3>

//               <p className="font-medium text-lg text-[var(--text-secondary)]">
//                 @{user.username}
//               </p>

//               {uploading && (
//                 <p className="text-xs font-bold mt-4 animate-pulse text-indigo-400">
//                   Updating cloud assets...
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ACTIONS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <ActionCard
//             title="Account Security"
//             desc="Update your password and login methods"
//             link="/settings"
//             icon={<FiSettings className="text-blue-400" />}
//           />
//           <ActionCard
//             title="Credit Wallet"
//             desc="View token history and balance"
//             link="/credit-history"
//             icon={<FiCreditCard className="text-indigo-400" />}
//           />
//           <ActionCard
//             title="Edit Identity"
//             desc="Modify your public profile details"
//             link="/settings"
//             icon={<FiEdit3 className="text-emerald-400" />}
//           />
//         </div>

//         {/* LOGOUT */}
//         <div
//           className="rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-rose-500/20"
//           style={{ backgroundColor: "rgba(225, 29, 72, 0.03)" }}
//         >
//           <div>
//             <h3 className="font-black text-xl text-rose-500">Sign Out</h3>
//             <p className="text-sm font-medium mt-1 text-rose-400/70">
//               Safely end your current session
//             </p>
//           </div>

//           <button
//             onClick={logout}
//             className="flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-bold shadow-lg shadow-rose-900/20 hover:bg-rose-700 active:scale-95"
//             style={{ backgroundColor: "#e11d48" }}
//           >
//             <FiLogOut /> Logout
//           </button>
//         </div>
//       </div>

//       {/* AVATAR PREVIEW MODAL */}
//       {showAvatarPreview && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="relative">
//             <button
//               onClick={() => setShowAvatarPreview(false)}
//               className="absolute -top-10 right-0 text-white text-xl"
//             >
//               <FiX />
//             </button>

//             {user.avatar ? (
//               <img
//                 src={user.avatar}
//                 alt="preview"
//                 className="w-80 h-80 object-cover rounded-2xl"
//               />
//             ) : (
//               <div className="w-80 h-80 flex items-center justify-center bg-gray-800 rounded-2xl text-white text-5xl font-bold">
//                 {user.name?.charAt(0)}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function ActionCard({ title, desc, link, icon }) {
//   return (
//     <Link
//       to={link}
//       className="group card rounded-[2rem] p-8 shadow-sm hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
//       style={{
//         backgroundColor: "var(--bg-card)",
//         border: "1px solid var(--border-color)",
//       }}
//     >
//       <div
//         className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/5"
//         style={{ backgroundColor: "var(--bg-primary)" }}
//       >
//         {React.cloneElement(icon, { size: 24 })}
//       </div>

//       <h4 className="font-black text-xl mb-2 text-[var(--text-primary)]">
//         {title}
//       </h4>

//       <p className="text-sm font-medium leading-relaxed text-[var(--text-secondary)]">
//         {desc}
//       </p>
//     </Link>
//   );
// }

//before is live
import { useEffect, useState, useContext, useRef } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
import React from "react";
import {
  FiUser,
  FiSettings,
  FiCreditCard,
  FiEdit3,
  FiLogOut,
  FiCamera,
  FiEye,
  FiX,
  FiTrash2,
} from "react-icons/fi";

export default function Profile() {
  const { setUser, logout } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [showAvatarPreview, setShowAvatarPreview] = useState(false);

  const fileInputRef = useRef(null);
  const avatarMenuRef = useRef(null);
  const hasFetched = useRef(false);
  const isUploading = useRef(false); // ✅ guards double upload trigger

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/myprofile");
        if (res?.data?.user) setProfile(res.data.user);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(e.target)) {
        setShowAvatarMenu(false);
      }
    };
    if (showAvatarMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAvatarMenu]);

  if (!profile) return <ProfileSkeleton />;

  // ✅ Fixed: guard double call + explicit multipart header
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (isUploading.current) return;
    isUploading.current = true;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);
      const res = await API.post("/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // ✅ fix "no file uploaded"
      });

      setProfile((prev) => ({ ...prev, avatar: res.data.avatar }));
      setUser((prev) => ({ ...prev, avatar: res.data.avatar }));
    } catch {
      alert("Avatar upload failed");
    } finally {
      setUploading(false);
      isUploading.current = false;
      e.target.value = "";
    }
  };

  // ✅ NEW: Remove avatar
  const handleRemoveAvatar = async () => {
    if (!profile.avatar) return;
    setShowAvatarMenu(false);
    try {
      setRemoving(true);
      await API.delete("/users/avatar");
      setProfile((prev) => ({ ...prev, avatar: "" }));
      setUser((prev) => ({ ...prev, avatar: "" }));
    } catch {
      alert("Failed to remove avatar");
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div
      className="min-h-screen font-sans animate-fadeIn transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div className="max-w-5xl mx-auto p-8 space-y-10">

        {/* HEADER */}
        <header className="flex items-center gap-4">
          <div
            className="p-3 rounded-2xl text-white shadow-xl shadow-indigo-500/10"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <FiUser size={28} />
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-tight">
              Profile <span style={{ color: "var(--accent)" }}>Settings</span>
            </h2>
            <p className="font-medium text-[var(--text-secondary)]">
              Manage your identity and account preferences
            </p>
          </div>
        </header>

        {/* PROFILE CARD */}
        <div
          className="card rounded-[2.5rem] p-10 border border-[var(--border-color)]"
          style={{ backgroundColor: "var(--bg-card)" }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative" ref={avatarMenuRef}>

              {/* AVATAR CIRCLE */}
              <div
                onClick={() => setShowAvatarMenu((p) => !p)}
                className="group relative w-32 h-32 rounded-full overflow-hidden
                border-4 shadow-lg flex items-center justify-center
                cursor-pointer transition-transform hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                {profile.avatar ? (
                  <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-black text-[var(--text-secondary)]">
                    {profile.name?.charAt(0)}
                  </span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <FiCamera className="text-white text-2xl" />
                </div>
              </div>

              {/* DROPDOWN MENU */}
              {showAvatarMenu && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 mt-4 w-52 rounded-2xl shadow-2xl z-50 p-2 border border-[var(--border-color)]"
                  style={{ backgroundColor: "var(--bg-card)" }}
                >
                  {/* View — only if avatar exists */}
                  {profile.avatar && (
                    <button
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl hover:bg-white/5"
                      onClick={() => { setShowAvatarPreview(true); setShowAvatarMenu(false); }}
                    >
                      <FiEye className="text-indigo-400" /> View Avatar
                    </button>
                  )}

                  {/* Upload / Change */}
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl hover:bg-white/5"
                    onClick={() => { fileInputRef.current?.click(); setShowAvatarMenu(false); }}
                  >
                    <FiCamera className="text-indigo-400" />
                    {profile.avatar ? "Change Avatar" : "Upload Avatar"}
                  </button>

                  {/* Remove — only if avatar exists */}
                  {profile.avatar && (
                    <button
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl hover:bg-rose-500/10 text-rose-400"
                      onClick={handleRemoveAvatar}
                    >
                      <FiTrash2 className="text-rose-400" /> Remove Avatar
                    </button>
                  )}
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

            {/* USER INFO */}
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-black tracking-tight">{profile.name}</h3>
              <p className="font-medium text-lg text-[var(--text-secondary)]">@{profile.username}</p>

              {/* ✅ Followers / Following */}
              <div className="flex justify-center md:justify-start gap-8 mt-5">
                <div className="flex flex-col">
                  <span className="text-2xl font-black">{profile.followersCount ?? 0}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">Followers</span>
                </div>
                <div className="w-px bg-[var(--border-color)]" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black">{profile.followingCount ?? 0}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">Following</span>
                </div>
              </div>

              {uploading && (
                <p className="text-xs font-bold mt-4 animate-pulse text-indigo-400">Uploading avatar...</p>
              )}
              {removing && (
                <p className="text-xs font-bold mt-4 animate-pulse text-rose-400">Removing avatar...</p>
              )}
            </div>
          </div>
        </div>

        {/* ACTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard title="Account Security" desc="Update your password and login methods" link="/settings" icon={<FiSettings className="text-blue-400" />} />
          <ActionCard title="Credit Wallet" desc="View token history and balance" link="/credit-history" icon={<FiCreditCard className="text-indigo-400" />} />
          <ActionCard title="Edit Identity" desc="Modify your public profile details" link="/settings" icon={<FiEdit3 className="text-emerald-400" />} />
        </div>

        {/* LOGOUT */}
        <div
          className="rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-rose-500/20"
          style={{ backgroundColor: "rgba(225, 29, 72, 0.03)" }}
        >
          <div>
            <h3 className="font-black text-xl text-rose-500">Sign Out</h3>
            <p className="text-sm font-medium mt-1 text-rose-400/70">Safely end your current session</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-bold shadow-lg shadow-rose-900/20 hover:bg-rose-700 active:scale-95"
            style={{ backgroundColor: "#e11d48" }}
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* AVATAR PREVIEW MODAL */}
      {showAvatarPreview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative">
            <button onClick={() => setShowAvatarPreview(false)} className="absolute -top-10 right-0 text-white text-xl">
              <FiX />
            </button>
            {profile.avatar ? (
              <img src={profile.avatar} alt="preview" className="w-80 h-80 object-cover rounded-2xl" />
            ) : (
              <div className="w-80 h-80 flex items-center justify-center bg-gray-800 rounded-2xl text-white text-5xl font-bold">
                {profile.name?.charAt(0)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ActionCard({ title, desc, link, icon }) {
  return (
    <Link
      to={link}
      className="group card rounded-[2rem] p-8 shadow-sm hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
      style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/5"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <h4 className="font-black text-xl mb-2 text-[var(--text-primary)]">{title}</h4>
      <p className="text-sm font-medium leading-relaxed text-[var(--text-secondary)]">{desc}</p>
    </Link>
  );
}