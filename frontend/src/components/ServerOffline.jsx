// import React, { useState } from "react";
// import { FiActivity, FiRefreshCw, FiLoader, FiCloudOff, FiShield } from "react-icons/fi";

// export default function ServerOffline({ onRetry }) {
//   const [isRetrying, setIsRetrying] = useState(false);

//   const handleRetry = async () => {
//     setIsRetrying(true);
//     await onRetry();
//     // A deliberate delay creates a sense of "System Re-validation"
//     setTimeout(() => setIsRetrying(false), 1500);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
//       {/* AMBIENT BACKGROUND: Professional depth layers */}
//       <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/5 blur-[140px] rounded-full" />
//       <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/5 blur-[140px] rounded-full" />

//       <div className="max-w-md w-full text-center space-y-12 animate-fadeIn relative z-10">
        
//         {/* CENTERPIECE: The "System Shield" Core */}
//         <div className="relative inline-block group">
//           <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-all duration-700" />
//           <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-12 rounded-[3.5rem] shadow-2xl transition-transform duration-500 group-hover:scale-105">
//             {isRetrying ? (
//               <FiLoader size={56} className="text-indigo-400 mx-auto animate-spin" />
//             ) : (
//               /* Swapped WiFi icon for CloudOff/Shield for a more premium look */
//               <FiCloudOff size={56} className="text-slate-400 mx-auto opacity-40 group-hover:opacity-60 transition-opacity" />
//             )}
//           </div>
//         </div>

//         {/* MESSAGING: Sincere and Professional */}
//         <div className="space-y-6">
//           <div className="space-y-3">
//             <h1 className="text-4xl font-black tracking-tighter text-white">
//               Just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">moment.</span>
//             </h1>
//             <p className="text-xl font-bold text-slate-200">
//               Thank you for your patience.
//             </p>
//           </div>
          
//           <p className="text-slate-500 text-base leading-relaxed max-w-xs mx-auto font-medium">
//             Our systems are currently busy or under maintenance. We are working to get your dashboard back online as quickly as possible.
//           </p>
//         </div>

//         {/* ACTION: Premium Interaction */}
//         <div className="flex flex-col items-center gap-8">
//           <button
//             onClick={handleRetry}
//             disabled={isRetrying}
//             className={`
//               relative group flex items-center gap-4 px-10 py-5 rounded-2xl font-black text-base transition-all active:scale-95
//               ${isRetrying 
//                 ? "bg-slate-900 text-slate-600 cursor-not-allowed border border-white/5" 
//                 : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_20px_40px_-12px_rgba(79,70,229,0.4)]"}
//             `}
//           >
//             <FiRefreshCw className={`text-lg ${isRetrying ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-700"}`} />
//             {isRetrying ? "Syncing with Server..." : "Check Connection Again"}
//           </button>

//           {/* SYSTEM HEARTBEAT */}
//           <div className="flex flex-col items-center gap-3">
//             <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5">
//                <div className={`w-2 h-2 rounded-full ${isRetrying ? 'bg-indigo-500 animate-pulse' : 'bg-amber-500'}`} />
//                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
//                  {isRetrying ? 'Requesting Data' : 'Waiting for Response'}
//                </span>
//             </div>
//             <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest opacity-50">
//               {/* PrepVision AI Core v3.2 */}
//             </p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef } from "react";
// import { FiRefreshCw, FiLoader, FiCloudOff } from "react-icons/fi";

// export default function ServerOffline({ onRetry }) {
//   const [isRetrying, setIsRetrying] = useState(false);
//   const timerRef = useRef(null);

//   const handleRetry = async () => {
//     // 1. Prevent double clicks while already retrying
//     if (isRetrying) return;

//     // 2. Lock the UI in "Trying Connection" mode
//     setIsRetrying(true);

//     // 3. Start the background server check immediately
//     try {
//       // We don't "await" this here because we want the 10s timer 
//       // to control the UI, not the speed of the server response.
//       onRetry(); 
//     } catch (err) {
//       console.error("Connection check failed:", err);
//     }

//     // 4. Force the UI to wait for exactly 10 seconds before resetting
//     timerRef.current = setTimeout(() => {
//       setIsRetrying(false);
//     }, 10000);
//   };

//   // Cleanup timer on component unmount
//   useEffect(() => {
//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f172a] text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
//       {/* Background Lighting & Effects */}
//       <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-indigo-500/10 blur-[120px] rounded-full" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-blue-500/10 blur-[120px] rounded-full" />
//       <div className="absolute inset-0 opacity-[0.05] bg-[size:32px_32px] bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)]" />

//       <div className="max-w-md w-full text-center space-y-12 relative z-10">
        
//         {/* CENTER ICON BOX */}
//         <div className="relative inline-block group">
//           <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
//           <div className="relative bg-slate-800/40 backdrop-blur-2xl border border-white/10 p-12 rounded-[3.5rem] shadow-2xl transition-transform duration-500">
//             {isRetrying ? (
//               <div className="relative">
//                 <FiLoader size={56} className="text-indigo-400 mx-auto animate-spin" />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
//                 </div>
//               </div>
//             ) : (
//               <FiCloudOff size={56} className="text-slate-300 mx-auto opacity-50 transition-opacity" />
//             )}
//           </div>
//         </div>

//         {/* MESSAGING AREA */}
//         <div className="space-y-6">
//           <div className="space-y-3">
//             <h1 className="text-4xl font-black tracking-tighter text-white">
//               {isRetrying ? (
//                 <>Trying <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">connection.</span></>
//               ) : (
//                 <>Just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">moment.</span></>
//               )}
//             </h1>
//             <p className="text-xl font-bold text-slate-100">
//               {isRetrying ? "Establishing secure handshake..." : "Thank you for your patience."}
//             </p>
//           </div>
          
//           <p className="text-slate-400 text-base leading-relaxed max-w-xs mx-auto font-medium">
//             {isRetrying 
//               ? "We are attempting to reach the PrepVision Neural Net. This usually takes about 10 seconds." 
//               : "Our systems are currently busy or under maintenance. We are working to get your dashboard back online."}
//           </p>
//         </div>

//         {/* ACTION BUTTON */}
//         <div className="flex flex-col items-center gap-8">
//           <button
//             onClick={handleRetry}
//             disabled={isRetrying}
//             className={`
//               relative group flex items-center gap-4 px-10 py-5 rounded-2xl font-black text-base transition-all active:scale-95
//               ${isRetrying 
//                 ? "bg-slate-800/50 text-slate-500 cursor-not-allowed border border-white/5" 
//                 : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_20px_50px_-12px_rgba(79,70,229,0.5)]"}
//             `}
//           >
//             <FiRefreshCw className={`text-lg ${isRetrying ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-700"}`} />
//             {isRetrying ? "Trying Connection..." : "Check Connection Again"}
//           </button>

//           {/* STATUS FOOTER */}
//           <div className="flex flex-col items-center gap-3">
//             <div className="flex items-center gap-3 px-5 py-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
//                <div className={`w-2 h-2 rounded-full ${isRetrying ? 'bg-cyan-400 animate-pulse' : 'bg-amber-400'}`} />
//                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
//                  {isRetrying ? 'Attempting System Sync' : 'Waiting for Response'}
//                </span>
//             </div>
            
//             {/* Visual Progress Bar (Animated) */}
//             {isRetrying && (
//                <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden mt-1">
//                   <div 
//                     className="h-full bg-indigo-500/50" 
//                     style={{ 
//                       width: '100%',
//                       animation: 'progressAnim 10s linear forwards' 
//                     }} 
//                   />
//                </div>
//             )}

//             <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest opacity-60">
//               {/* PREPVISION AI CORE V3.2 */}
//             </p>
//           </div>
//         </div>
//       </div>
      
//       {/* Required CSS for the progress bar animation */}
//       <style>{`
//         @keyframes progressAnim {
//           0% { width: 0%; }
//           100% { width: 100%; }
//         }
//       `}</style>
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef } from "react";
// import { FiRefreshCw, FiLoader, FiCloudOff, FiActivity, FiZap } from "react-icons/fi";

// export default function ServerOffline({ onRetry }) {
//   const [isRetrying, setIsRetrying] = useState(false);
//   const timerRef = useRef(null);

//   const handleRetry = async () => {
//     if (isRetrying) return;

//     setIsRetrying(true);

//     try {
//       // Background trigger for actual auth check
//       onRetry(); 
//     } catch (err) {
//       console.error("Manual sync failed:", err);
//     }

//     // Fixed 10s visual lock to provide consistent user feedback
//     timerRef.current = setTimeout(() => {
//       setIsRetrying(false);
//     }, 10000);
//   };

//   useEffect(() => {
//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
//       {/* BACKGROUND ETHER: Sophisticated radial layers */}
//       <div className="absolute top-[-15%] left-[-10%] w-[65%] h-[65%] bg-indigo-600/10 blur-[140px] rounded-full animate-pulse" />
//       <div className="absolute bottom-[-15%] right-[-10%] w-[65%] h-[65%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse" />
      
//       {/* 2026 MESH: Technical structural grid */}
//       <div className="absolute inset-0 opacity-[0.04] bg-[size:40px_40px] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]" />

//       <div className="max-w-md w-full text-center space-y-12 relative z-10 animate-fadeIn">
        
//         {/* CORE INTERFACE: Glassmorphic Hub */}
//         <div className="relative inline-block group">
//           <div className="absolute inset-[-10px] bg-indigo-500/20 blur-3xl rounded-full group-hover:bg-indigo-500/30 transition-all duration-700" />
//           <div className="relative bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-12 rounded-[3.5rem] shadow-2xl transition-all duration-500 group-hover:scale-105 overflow-hidden">
            
//             {/* Dynamic Scanning Light Effect */}
//             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent h-1/2 w-full animate-scan pointer-events-none" />

//             {isRetrying ? (
//               <div className="relative scale-110">
//                 <FiLoader size={64} className="text-indigo-400 mx-auto animate-spin" />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(129,140,248,0.8)]" />
//                 </div>
//               </div>
//             ) : (
//               <div className="relative">
//                 <FiCloudOff size={64} className="text-slate-400 mx-auto opacity-30 group-hover:opacity-60 transition-opacity duration-700" />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* TYPOGRAPHY: High-definition clarity */}
//         <div className="space-y-6">
//           <div className="space-y-4">
//             <h1 className="text-5xl font-black tracking-tighter text-white leading-tight">
//               {isRetrying ? (
//                 <>Syncing <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 animate-gradient-x">engine.</span></>
//               ) : (
//                 <>Just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">moment.</span></>
//               )}
//             </h1>
//             <p className="text-xl font-bold text-slate-200">
//               {isRetrying ? "Establishing secure handshake..." : "Thank you for your patience."}
//             </p>
//           </div>
          
//           <p className="text-slate-400 text-base leading-relaxed max-w-xs mx-auto font-medium opacity-70">
//             {isRetrying 
//               ? "Re-aligning Neural Net parameters. This process ensures peak inference performance." 
//               : "Our systems are currently busy or under maintenance. We are working to restore your dashboard connectivity."}
//           </p>
//         </div>

//         {/* INTERACTION: High-intent action */}
//         <div className="flex flex-col items-center gap-10">
//           <button
//             onClick={handleRetry}
//             disabled={isRetrying}
//             className={`
//               relative group flex items-center gap-4 px-12 py-5 rounded-[2.2rem] font-black text-lg transition-all active:scale-95
//               ${isRetrying 
//                 ? "bg-slate-900/50 text-slate-600 cursor-not-allowed border border-white/5" 
//                 : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_20px_60px_-12px_rgba(79,70,229,0.6)]"}
//             `}
//           >
//             <FiRefreshCw className={`text-xl ${isRetrying ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-1000"}`} />
//             {isRetrying ? "Attempting Sync..." : "Check Connection Again"}
//             {!isRetrying && (
//               <div className="absolute inset-0 rounded-[2.2rem] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
//             )}
//           </button>

//           {/* TELEMETRY FOOTER */}
//           <div className="flex flex-col items-center gap-5">
//             <div className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-xl">
//                <FiActivity size={14} className={isRetrying ? "text-cyan-400 animate-pulse" : "text-amber-500"} />
//                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
//                  {isRetrying ? 'System Handshake Active' : 'Waiting for Response'}
//                </span>
//             </div>
            
//             {/* Visual Feedback: High-fidelity progress */}
//             {isRetrying && (
//                <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden shadow-inner">
//                   <div 
//                     className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 shadow-[0_0_15px_rgba(129,140,248,0.4)]" 
//                     style={{ 
//                       width: '100%',
//                       animation: 'progressAnim 10s linear forwards' 
//                     }} 
//                   />
//                </div>
//             )}

//             {/* <div className="flex items-center gap-3 opacity-30">
//                <FiZap size={10} className="text-indigo-400" />
//                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">
//                  PrepVision Core v3.2
//                </p>
//             </div> */}
//           </div>
//         </div>
//       </div>
      
//       {/* 2026 Obsidian Keyframes */}
//       <style>{`
//         @keyframes progressAnim {
//           0% { width: 0%; }
//           100% { width: 100%; }
//         }
//         @keyframes gradient-x {
//           0%, 100% { background-size: 200% 200%; background-position: left center; }
//           50% { background-size: 200% 200%; background-position: right center; }
//         }
//         @keyframes scan {
//           0% { transform: translateY(-100%); }
//           100% { transform: translateY(200%); }
//         }
//         .animate-gradient-x {
//           animation: gradient-x 3s ease infinite;
//         }
//         .animate-scan {
//           animation: scan 4s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }


//before this is live
import React, { useState, useEffect, useRef } from "react";
import { FiRefreshCw, FiLoader, FiCloudOff, FiActivity, FiZap } from "react-icons/fi";

export default function ServerOffline({ onRetry }) {
  const [isRetrying, setIsRetrying] = useState(false);
  const timerRef = useRef(null);

  const handleRetry = async () => {
    if (isRetrying) return;

    setIsRetrying(true);

    try {
      onRetry();
    } catch (err) {
      console.error("Manual sync failed:", err);
    }

    // ✅ Changed to 5 seconds
    timerRef.current = setTimeout(() => {
      setIsRetrying(false);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
      <div className="absolute top-[-15%] left-[-10%] w-[65%] h-[65%] bg-indigo-600/10 blur-[140px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[65%] h-[65%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse" />
      
      <div className="absolute inset-0 opacity-[0.04] bg-[size:40px_40px] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]" />

      <div className="max-w-md w-full text-center space-y-12 relative z-10 animate-fadeIn">
        
        <div className="relative inline-block group">
          <div className="absolute inset-[-10px] bg-indigo-500/20 blur-3xl rounded-full group-hover:bg-indigo-500/30 transition-all duration-700" />
          <div className="relative bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-12 rounded-[3.5rem] shadow-2xl transition-all duration-500 group-hover:scale-105 overflow-hidden">
            
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent h-1/2 w-full animate-scan pointer-events-none" />

            {isRetrying ? (
              <div className="relative scale-110">
                <FiLoader size={64} className="text-indigo-400 mx-auto animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(129,140,248,0.8)]" />
                </div>
              </div>
            ) : (
              <div className="relative">
                <FiCloudOff size={64} className="text-slate-400 mx-auto opacity-30 group-hover:opacity-60 transition-opacity duration-700" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tighter text-white leading-tight">
              {isRetrying ? (
                <>Syncing <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 animate-gradient-x">engine.</span></>
              ) : (
                <>Just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">moment.</span></>
              )}
            </h1>
            <p className="text-xl font-bold text-slate-200">
              {isRetrying ? "Establishing secure handshake..." : "Thank you for your patience."}
            </p>
          </div>
          
          <p className="text-slate-400 text-base leading-relaxed max-w-xs mx-auto font-medium opacity-70">
            {isRetrying 
              ? "Re-aligning Neural Net parameters. This process ensures peak inference performance." 
              : "Our systems are currently busy or under maintenance. We are working to restore your dashboard connectivity."}
          </p>
        </div>

        <div className="flex flex-col items-center gap-10">
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className={`
              relative group flex items-center gap-4 px-12 py-5 rounded-[2.2rem] font-black text-lg transition-all active:scale-95
              ${isRetrying 
                ? "bg-slate-900/50 text-slate-600 cursor-not-allowed border border-white/5" 
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_20px_60px_-12px_rgba(79,70,229,0.6)]"}
            `}
          >
            <FiRefreshCw className={`text-xl ${isRetrying ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-1000"}`} />
            {isRetrying ? "Attempting Sync..." : "Check Connection Again"}
            {!isRetrying && (
              <div className="absolute inset-0 rounded-[2.2rem] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            )}
          </button>

          <div className="flex flex-col items-center gap-5">
            <div className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-xl">
               <FiActivity size={14} className={isRetrying ? "text-cyan-400 animate-pulse" : "text-amber-500"} />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                 {isRetrying ? 'System Handshake Active' : 'Waiting for Response'}
               </span>
            </div>
            
            {isRetrying && (
               <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 shadow-[0_0_15px_rgba(129,140,248,0.4)]" 
                    style={{ 
                      width: '100%',
                      animation: 'progressAnim 5s linear forwards' // ✅ changed to 5s
                    }} 
                  />
               </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes progressAnim {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </div>
  );
}