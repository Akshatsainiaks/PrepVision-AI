// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { API } from "../api/api";
// import { AuthContext } from "../context/AuthContext";
// import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
// import React from "react";

// export default function PublicProfile() {
//   const { username } = useParams();
//   const navigate = useNavigate();
//   const { user: me } = useContext(AuthContext);

//   const myId = me?.id ?? me?._id ?? localStorage.getItem("userId");

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [followLoading, setFollowLoading] = useState(false);

//   /* ================= FETCH PUBLIC PROFILE ================= */
//   useEffect(() => {
//     let mounted = true;

//     (async () => {
//       try {
//         const res = await API.get(`/users/public/${username}`);
//         if (mounted) setData(res.data.user);
//       } catch (err) {
//         console.error("Public profile error:", err);
//       } finally {
//         setLoading(false);
//       }
//     })();

//     return () => (mounted = false);
//   }, [username]);

//   if (loading) return <ProfileSkeleton />;

//   if (!data)
//     return (
//       <>
//         <Navbar />
//         <div className="p-6 text-white text-center">
//           User not found
//         </div>
//       </>
//     );

//   const isMe = String(data._id) === String(myId);

//   /* ================= FOLLOW / UNFOLLOW ================= */
//   const toggleFollow = async () => {
//     try {
//       setFollowLoading(true);

//       if (data.isFollowing) {
//         await API.post(`/users/${data._id}/unfollow`);
//         setData((p) => ({
//           ...p,
//           isFollowing: false,
//           followersCount: p.followersCount - 1,
//         }));
//       } else {
//         await API.post(`/users/${data._id}/follow`);
//         setData((p) => ({
//           ...p,
//           isFollowing: true,
//           followersCount: p.followersCount + 1,
//         }));
//       }
//     } catch {
//       alert("Action failed");
//     } finally {
//       setFollowLoading(false);
//     }
//   };

//   /* ================= MESSAGE ================= */
//   const startMessage = () => {
//     navigate("/chat", {
//       state: { username: data.username },
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
//       <Navbar />

//       <div className="max-w-5xl mx-auto p-8 space-y-12">
//         {/* ================= HEADER ================= */}
//         <div>
//           <h2 className="text-4xl font-extrabold text-[var(--accent)]">
//             @{data.username}
//           </h2>
//           <p className="text-secondary mt-1">Public profile</p>
//         </div>

//         {/* ================= PROFILE CARD ================= */}
//         <div className="card rounded-3xl p-8">
//           <div className="flex items-center gap-6">
//             {/* Avatar */}
//             <div className="w-24 h-24 rounded-full overflow-hidden
//               bg-gradient-to-r from-purple-500 to-blue-500
//               flex items-center justify-center text-4xl font-bold">
//               {data.avatar ? (
//                 <img
//                   src={data.avatar}
//                   alt="avatar"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 data.name?.charAt(0)
//               )}
//             </div>

//             {/* USER INFO */}
//             <div className="flex-1">
//               <h3 className="text-2xl font-semibold">{data.name}</h3>

//               <div className="flex gap-6 mt-2 text-sm text-gray-300">
//                 <span>
//                   <strong>{data.followersCount ?? 0}</strong> Followers
//                 </span>
//                 <span>
//                   <strong>{data.followingCount ?? 0}</strong> Following
//                 </span>
//               </div>

//               {/* ACTIONS */}
//               {!isMe && (
//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={toggleFollow}
//                     disabled={followLoading}
//                     className={`px-5 py-2 rounded-lg font-semibold transition
//                       ${
//                         data.isFollowing
//                           ? "bg-gray-700 hover:bg-gray-600"
//                           : "bg-gradient-to-r from-purple-600 to-blue-600"
//                       }
//                     `}
//                   >
//                     {data.isFollowing ? "Unfollow" : "Follow"}
//                   </button>

//                   <button
//                     onClick={startMessage}
//                     className="px-5 py-2 rounded-lg border border-white/20
//                       hover:bg-white/10 transition"
//                   >
//                     Message
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ================= STATS ================= */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {data.credits !== null && (
//             <StatCard title="Credits" value={data.credits} />
//           )}

//           {data.rank !== null && (
//             <StatCard title="Rank" value={`#${data.rank}`} />
//           )}

//           <StatCard
//             title="Joined"
//             value={new Date(data.createdAt).toLocaleDateString()}
//           />
//         </div>

//         {/* ================= RECENT ACTIVITY ================= */}
//         <div className="card rounded-3xl p-6">
//           <h3 className="text-xl font-semibold mb-3">
//             Recent Activity
//           </h3>
//           <p className="text-sm text-gray-400">
//             Activity feed coming soon…
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SUB COMPONENT ================= */
// function StatCard({ title, value }) {
//   return (
//     <div className="card rounded-2xl p-6 text-center">
//       <div className="text-sm text-gray-400 mb-1">{title}</div>
//       <div className="text-2xl font-bold">{value}</div>
//     </div>
//   );
// }


// new final
// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import API from "../api/api"; // Updated import to match your standard
// import { AuthContext } from "../context/AuthContext";
// import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
// import React from "react";
// import { FiUserPlus, FiUserMinus, FiMessageSquare, FiTrendingUp, FiAward, FiCalendar, FiUser } from "react-icons/fi";

// export default function PublicProfile() {
//   const { username } = useParams();
//   const navigate = useNavigate();
//   const { user: me } = useContext(AuthContext);

//   const myId = me?.id ?? me?._id ?? localStorage.getItem("userId");

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [followLoading, setFollowLoading] = useState(false);

//   /* ================= FETCH PUBLIC PROFILE ================= */
//   useEffect(() => {
//     let mounted = true;

//     (async () => {
//       try {
//         const res = await API.get(`/users/public/${username}`);
//         if (mounted) setData(res.data.user);
//       } catch (err) {
//         console.error("Public profile error:", err);
//       } finally {
//         setLoading(false);
//       }
//     })();

//     return () => (mounted = false);
//   }, [username]);

//   if (loading) return <ProfileSkeleton />;

//   if (!data)
//     return (
//       <div className="min-h-screen bg-slate-50 font-sans">
//         <Navbar />
//         <div className="max-w-md mx-auto mt-20 p-12 text-center bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/50">
//           <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
//             <FiUser size={40} />
//           </div>
//           <h2 className="text-2xl font-black text-slate-900">User not found</h2>
//           <p className="text-slate-500 mt-2 font-medium">The profile you are looking for doesn't exist or has been moved.</p>
//           <button onClick={() => navigate(-1)} className="mt-8 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95">
//             Go Back
//           </button>
//         </div>
//       </div>
//     );

//   const isMe = String(data._id) === String(myId);

//   /* ================= FOLLOW / UNFOLLOW ================= */
//   const toggleFollow = async () => {
//     try {
//       setFollowLoading(true);

//       if (data.isFollowing) {
//         await API.post(`/users/${data._id}/unfollow`);
//         setData((p) => ({
//           ...p,
//           isFollowing: false,
//           followersCount: p.followersCount - 1,
//         }));
//       } else {
//         await API.post(`/users/${data._id}/follow`);
//         setData((p) => ({
//           ...p,
//           isFollowing: true,
//           followersCount: p.followersCount + 1,
//         }));
//       }
//     } catch {
//       alert("Action failed");
//     } finally {
//       setFollowLoading(false);
//     }
//   };

//   const startMessage = () => {
//     navigate("/chat", {
//       state: { username: data.username },
//     });
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans animate-fadeIn">
//       <Navbar />

//       <div className="max-w-5xl mx-auto p-8 pt-24 space-y-10">
        
//         {/* ================= HEADER ================= */}
//         <header className="flex items-center gap-5">
//             <div className="p-4 bg-indigo-600 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
//               <FiUser size={32} />
//             </div>
//             <div>
//               <h2 className="text-4xl font-black tracking-tight text-slate-900 uppercase">
//                 @{data.username}
//               </h2>
//               <p className="text-indigo-600 text-sm font-bold tracking-widest uppercase">Public Expert Profile</p>
//             </div>
//         </header>

//         {/* ================= PROFILE CARD ================= */}
//         <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden">
//           {/* Decorative background element */}
//           <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50" />
          
//           <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10">
//             {/* Avatar */}
//             <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden
//               bg-slate-100 border-4 border-white shadow-xl
//               flex items-center justify-center text-5xl font-black text-slate-400">
//               {data.avatar ? (
//                 <img
//                   src={data.avatar}
//                   alt="avatar"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 data.name?.charAt(0)
//               )}
//             </div>

//             {/* USER INFO */}
//             <div className="flex-1 text-center md:text-left">
//               <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{data.name}</h3>

//               <div className="flex justify-center md:justify-start gap-8 text-sm">
//                 <div className="flex flex-col">
//                   <span className="text-2xl font-black text-slate-900">{data.followersCount ?? 0}</span>
//                   <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Followers</span>
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-2xl font-black text-slate-900">{data.followingCount ?? 0}</span>
//                   <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Following</span>
//                 </div>
//               </div>

//               {/* ACTIONS */}
//               {!isMe && (
//                 <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8">
//                   <button
//                     onClick={toggleFollow}
//                     disabled={followLoading}
//                     className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg active:scale-95
//                       ${
//                         data.isFollowing
//                           ? "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 shadow-none"
//                           : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100"
//                       }
//                     `}
//                   >
//                     {data.isFollowing ? <FiUserMinus /> : <FiUserPlus />}
//                     {data.isFollowing ? "Unfollow" : "Follow"}
//                   </button>

//                   <button
//                     onClick={startMessage}
//                     className="flex items-center gap-2 px-8 py-3.5 rounded-2xl border-2 border-slate-100 bg-white text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-200 transition-all shadow-sm active:scale-95"
//                   >
//                     <FiMessageSquare />
//                     Message
//                   </button>
//                 </div>
//               )}
              
//               {isMe && (
//                 <div className="mt-6">
//                     <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest rounded-full border border-indigo-100">
//                         This is you
//                     </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ================= STATS GRID ================= */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {data.credits !== null && (
//             <StatCard 
//                 title="Total Credits" 
//                 value={data.credits} 
//                 icon={<FiTrendingUp className="text-indigo-600" />} 
//             />
//           )}

//           {data.rank !== null && (
//             <StatCard 
//                 title="Global Rank" 
//                 value={`#${data.rank}`} 
//                 icon={<FiAward className="text-amber-500" />} 
//             />
//           )}

//           <StatCard
//             title="Member Since"
//             value={new Date(data.createdAt).toLocaleDateString()}
//             icon={<FiCalendar className="text-emerald-500" />}
//           />
//         </div>

//         {/* ================= RECENT ACTIVITY ================= */}
//         <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm">
//           <div className="flex items-center gap-3 mb-6">
//               <h3 className="text-xl font-black text-slate-900 tracking-tight">
//                 Recent Activity
//               </h3>
//               <div className="px-3 py-1 bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 rounded-lg">
//                 Feed
//               </div>
//           </div>
//           <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50">
//             <p className="text-slate-400 font-bold italic">
//               Activity feed coming soon to public profiles...
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SUB COMPONENT ================= */
// function StatCard({ title, value, icon }) {
//   return (
//     <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
//       <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
//         {React.cloneElement(icon, { size: 24 })}
//       </div>
//       <div className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">{title}</div>
//       <div className="text-3xl font-black text-slate-900 tracking-tight">{value}</div>
//     </div>
//   );
// }

//dark mode
// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import API from "../api/api";
// import { AuthContext } from "../context/AuthContext";
// import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
// import React from "react";
// import { FiUserPlus, FiUserMinus, FiMessageSquare, FiTrendingUp, FiAward, FiCalendar, FiUser } from "react-icons/fi";

// export default function PublicProfile() {
//   const { username } = useParams();
//   const navigate = useNavigate();
//   const { user: me } = useContext(AuthContext);

//   const myId = me?.id ?? me?._id ?? localStorage.getItem("userId");

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [followLoading, setFollowLoading] = useState(false);

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         const res = await API.get(`/users/public/${username}`);
//         if (mounted) setData(res.data.user);
//       } catch (err) {
//         console.error("Public profile error:", err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//     return () => (mounted = false);
//   }, [username]);

//   if (loading) return <ProfileSkeleton />;

//   if (!data)
//     return (
//       <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg-primary)" }}>
//         <Navbar />
//         <div className="max-w-md mx-auto mt-20 p-12 text-center rounded-[2.5rem] border shadow-2xl"
//              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
//           <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 opacity-20"
//                style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-secondary)" }}>
//             <FiUser size={40} />
//           </div>
//           <h2 className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>User not found</h2>
//           <p className="mt-2 font-medium" style={{ color: "var(--text-secondary)" }}>The profile you are looking for doesn't exist.</p>
//           <button onClick={() => navigate(-1)} 
//                   className="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 hover:brightness-110">
//             Go Back
//           </button>
//         </div>
//       </div>
//     );

//   const isMe = String(data._id) === String(myId);

//   const toggleFollow = async () => {
//     try {
//       setFollowLoading(true);
//       if (data.isFollowing) {
//         await API.post(`/users/${data._id}/unfollow`);
//         setData((p) => ({ ...p, isFollowing: false, followersCount: p.followersCount - 1 }));
//       } else {
//         await API.post(`/users/${data._id}/follow`);
//         setData((p) => ({ ...p, isFollowing: true, followersCount: p.followersCount + 1 }));
//       }
//     } catch {
//       alert("Action failed");
//     } finally {
//       setFollowLoading(false);
//     }
//   };

//   const startMessage = () => {
//     navigate("/chat", { state: { username: data.username } });
//   };

//   return (
//     <div className="min-h-screen transition-colors duration-300 font-sans selection:bg-indigo-500/30"
//          style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
//       <Navbar />

//       <div className="max-w-5xl mx-auto p-8 pt-24 space-y-10">
        
//         {/* HEADER */}
//         <header className="flex items-center gap-5">
//             <div className="p-4 rounded-[2rem] text-white shadow-xl shadow-indigo-900/40"
//                  style={{ backgroundColor: "var(--accent)" }}>
//               <FiUser size={32} />
//             </div>
//             <div>
//               <h2 className="text-4xl font-black tracking-tight uppercase" style={{ color: "var(--text-primary)" }}>
//                 @{data.username}
//               </h2>
//               <p className="text-sm font-bold tracking-widest uppercase" style={{ color: "var(--accent)" }}>Public Expert Profile</p>
//             </div>
//         </header>

//         {/* PROFILE CARD */}
//         <div className="card rounded-[2.5rem] p-10 relative overflow-hidden border"
//              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
//           <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
          
//           <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10">
//             {/* Avatar */}
//             <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center justify-center text-5xl font-black border-4"
//                  style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--bg-card)", color: "var(--text-secondary)" }}>
//               {data.avatar ? (
//                 <img src={data.avatar} alt="avatar" className="w-full h-full object-cover" />
//               ) : (
//                 data.name?.charAt(0)
//               )}
//             </div>

//             <div className="flex-1 text-center md:text-left">
//               <h3 className="text-3xl font-black tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>{data.name}</h3>

//               <div className="flex justify-center md:justify-start gap-8 text-sm">
//                 <div className="flex flex-col">
//                   <span className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>{data.followersCount ?? 0}</span>
//                   <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Followers</span>
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>{data.followingCount ?? 0}</span>
//                   <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Following</span>
//                 </div>
//               </div>

//               {!isMe && (
//                 <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8">
//                   <button
//                     onClick={toggleFollow}
//                     disabled={followLoading}
//                     className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold transition-all active:scale-95 border
//                       ${data.isFollowing
//                           ? "bg-white/5 text-[var(--text-primary)] border-white/10"
//                           : "bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-500/20 hover:brightness-110"
//                       }
//                     `}
//                   >
//                     {data.isFollowing ? <FiUserMinus /> : <FiUserPlus />}
//                     {data.isFollowing ? "Unfollow" : "Follow"}
//                   </button>

//                   <button
//                     onClick={startMessage}
//                     className="flex items-center gap-2 px-8 py-3.5 rounded-2xl border transition-all active:scale-95 shadow-lg"
//                     style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
//                   >
//                     <FiMessageSquare style={{ color: "var(--accent)" }} />
//                     Message
//                   </button>
//                 </div>
//               )}
              
//               {isMe && (
//                 <div className="mt-6">
//                     <span className="px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest"
//                           style={{ backgroundColor: "rgba(129, 140, 248, 0.1)", color: "var(--accent)", borderColor: "rgba(129, 140, 248, 0.2)" }}>
//                         Viewing your profile
//                     </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* STATS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <StatCard title="Total Credits" value={data.credits ?? 0} icon={<FiTrendingUp className="text-indigo-400" />} />
//           <StatCard title="Global Rank" value={`#${data.rank ?? '—'}`} icon={<FiAward className="text-amber-400" />} />
//           <StatCard title="Member Since" value={new Date(data.createdAt).toLocaleDateString()} icon={<FiCalendar className="text-emerald-400" />} />
//         </div>

//         {/* RECENT ACTIVITY */}
//         <div className="card rounded-[2.5rem] p-10 shadow-sm border"
//              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
//           <div className="flex items-center gap-3 mb-6">
//               <h3 className="text-xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>Recent Activity</h3>
//               <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg"
//                    style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-secondary)" }}>Feed</div>
//           </div>
//           <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-[2rem]"
//                style={{ backgroundColor: "rgba(2, 6, 23, 0.3)", borderColor: "var(--border-color)" }}>
//             <p className="font-bold italic" style={{ color: "var(--text-secondary)" }}>
//               Activity feed coming soon to public profiles...
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatCard({ title, value, icon }) {
//   return (
//     <div className="card rounded-3xl p-8 flex flex-col items-center text-center shadow-lg transition-all border group hover:-translate-y-1"
//          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
//       <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors"
//            style={{ backgroundColor: "var(--bg-primary)" }}>
//         {React.cloneElement(icon, { size: 24 })}
//       </div>
//       <div className="text-[11px] font-black uppercase tracking-[0.15em] mb-1" style={{ color: "var(--text-secondary)" }}>{title}</div>
//       <div className="text-3xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>{value}</div>
//     </div>
//   );
// }

import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
import React from "react";
import {
  FiUserPlus,
  FiUserMinus,
  FiMessageSquare,
  FiTrendingUp,
  FiAward,
  FiCalendar,
  FiUser,
} from "react-icons/fi";

export default function PublicProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: me } = useContext(AuthContext);

  const myId = me?.id ?? me?._id ?? localStorage.getItem("userId");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);

  const fetchedRef = useRef(false); // ✅ prevent double API call

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchProfile = async () => {
      try {
        // ✅ CLEAN API (no username in URL)
        const res = await API.get("/users/userprofile", {
          params: { username },
        });

        setData(res.data?.user || null);
      } catch (err) {
        console.error("User profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) return <ProfileSkeleton />;

  if (!data)
    return (
      <div
        className="min-h-screen transition-colors duration-300"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <Navbar />
        <div
          className="max-w-md mx-auto mt-10 p-12 text-center rounded-[2.5rem] border shadow-2xl"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
        >
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 opacity-20"
            style={{
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-secondary)",
            }}
          >
            <FiUser size={40} />
          </div>
          <h2
            className="text-2xl font-black"
            style={{ color: "var(--text-primary)" }}
          >
            User not found
          </h2>
          <p
            className="mt-2 font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            The profile you are looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95 hover:brightness-110"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  // ✅ use user_id instead of _id
  const isMe = String(data.user_id) === String(myId);

  const toggleFollow = async () => {
    try {
      setFollowLoading(true);

      if (data.isFollowing) {
        await API.post(`/users/${data.user_id}/unfollow`);
        setData((p) => ({
          ...p,
          isFollowing: false,
          followersCount: Math.max(0, (p.followersCount || 0) - 1),
        }));
      } else {
        await API.post(`/users/${data.user_id}/follow`);
        setData((p) => ({
          ...p,
          isFollowing: true,
          followersCount: (p.followersCount || 0) + 1,
        }));
      }
    } catch {
      alert("Action failed");
    } finally {
      setFollowLoading(false);
    }
  };

  const startMessage = () => {
    navigate("/chat", { state: { username: data.username } });
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300 font-sans selection:bg-indigo-500/30"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <Navbar />

      <div className="max-w-5xl mx-auto p-8 space-y-10">

        {/* HEADER */}
        <header className="flex items-center gap-5">
          <div
            className="p-4 rounded-[2rem] text-white shadow-xl shadow-indigo-900/40"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <FiUser size={32} />
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-tight uppercase">
              @{data.username}
            </h2>
            <p
              className="text-sm font-bold tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              Public Expert Profile
            </p>
          </div>
        </header>

        {/* PROFILE CARD */}
        <div
          className="card rounded-[2.5rem] p-10 relative overflow-hidden border"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10">
            <div
              className="w-32 h-32 rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center justify-center text-5xl font-black border-4"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--bg-card)",
                color: "var(--text-secondary)",
              }}
            >
              {data.avatar ? (
                <img
                  src={data.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                data.name?.charAt(0)
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-black tracking-tight mb-2">
                {data.name}
              </h3>

              <div className="flex justify-center md:justify-start gap-8 text-sm">
                <div className="flex flex-col">
                  <span className="text-2xl font-black">
                    {data.followersCount ?? 0}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                    Followers
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-2xl font-black">
                    {data.followingCount ?? 0}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                    Following
                  </span>
                </div>
              </div>

              {!isMe && (
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8">
                  <button
                    onClick={toggleFollow}
                    disabled={followLoading}
                    className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold transition-all active:scale-95 border
                      ${
                        data.isFollowing
                          ? "bg-white/5 text-[var(--text-primary)] border-white/10"
                          : "bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-500/20 hover:brightness-110"
                      }
                    `}
                  >
                    {data.isFollowing ? <FiUserMinus /> : <FiUserPlus />}
                    {data.isFollowing ? "Unfollow" : "Follow"}
                  </button>

                  <button
                    onClick={startMessage}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-2xl border transition-all active:scale-95 shadow-lg"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <FiMessageSquare style={{ color: "var(--accent)" }} />
                    Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Credits" value={data.credits ?? 0} icon={<FiTrendingUp />} />
          <StatCard title="Global Rank" value={`#${data.rank ?? "—"}`} icon={<FiAward />} />
          <StatCard
            title="Member Since"
            value={data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "—"}
            icon={<FiCalendar />}
          />
        </div>

        {/* RECENT ACTIVITY (UNCHANGED) */}
        <div
          className="card rounded-[2.5rem] p-10 shadow-sm border"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xl font-black tracking-tight">
              Recent Activity
            </h3>
            <div
              className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg"
              style={{
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-secondary)",
              }}
            >
              Feed
            </div>
          </div>

          <div
            className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-[2rem]"
            style={{
              backgroundColor: "rgba(2, 6, 23, 0.3)",
              borderColor: "var(--border-color)",
            }}
          >
            <p
              className="font-bold italic"
              style={{ color: "var(--text-secondary)" }}
            >
              Activity feed coming soon to public profiles...
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div
      className="card rounded-3xl p-8 flex flex-col items-center text-center shadow-lg transition-all border group hover:-translate-y-1"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-color)",
      }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        {React.cloneElement(icon, { size: 24 })}
      </div>

      <div className="text-[11px] font-black uppercase tracking-[0.15em] mb-1 text-[var(--text-secondary)]">
        {title}
      </div>

      <div className="text-3xl font-black tracking-tight">
        {value}
      </div>
    </div>
  );
}