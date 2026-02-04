
// import { useState } from "react";
// // import { API } from "../api/api";
// import API from "../api/api";
// import { useNavigate, Link } from "react-router-dom";
// import React from "react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//  const handleLogin = async () => {
//   try {
//     const res = await API.post("/auth/login", { email, password });

//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("userId", res.data.user.id);   // ADD THIS
//     localStorage.setItem("name", res.data.user.name);   // ADD THIS

//     navigate("/dashboard");
//   } catch (err) {
//     alert(err.response?.data?.message || "Login error");
//   }
// };

//   return (
//     <div className="min-h-screen flex bg-gray-950 text-white overflow-hidden">

//       {/* LEFT SECTION — AI Brand */}
//       <div className="hidden lg:flex flex-col justify-center px-16 w-1/2 relative">
        
//         {/* Glowing Orb Effect */}
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-500/20 blur-[120px] rounded-full"></div>

//         <h1 className="text-5xl font-extrabold z-10 leading-tight">
//           Ace Your Interview  
//           <span className="text-purple-400"> with AI</span>
//         </h1>

//         <p className="mt-4 text-gray-300 text-lg z-10">
//           Practice real interview questions, improve your skills,  
//           and get instant AI-powered feedback.
//         </p>

//         {/* Animated Highlight Bar */}
//         <div className="w-32 h-2 bg-purple-500 rounded-full mt-6 animate-pulse"></div>
//       </div>

//       {/* RIGHT SECTION — LOGIN CARD */}
//       <div className="flex justify-center items-center w-full lg:w-1/2 p-6">
        
//         <div className="w-[380px] backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-[0_0_25px_rgba(120,64,255,0.4)] animate-fadeIn">

//           <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
//           <p className="text-center text-gray-300 mb-8">
//             Log in to start your AI interview journey
//           </p>

//           {/* EMAIL INPUT */}
//           <label className="text-gray-300 text-sm">Email</label>
//           <input
//             type="email"
//             className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition mb-5"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           {/* PASSWORD INPUT */}
//           <label className="text-gray-300 text-sm">Password</label>
//           <input
//             type="password"
//             className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none transition mb-6"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {/* LOGIN BUTTON */}
//           <button
//             onClick={handleLogin}
//             className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 font-semibold text-white shadow-lg hover:shadow-purple-500/40 transition-all"
//           >
//             Login
//           </button>

//           {/* Separator */}
//           <div className="my-6 border-t border-gray-700"></div>

//           <p className="text-center text-gray-300">
//             New here?{" "}
//             <Link to="/register" className="text-purple-400 font-semibold hover:underline">
//               Create an account
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import API from "../api/api";
// import { useNavigate, Link } from "react-router-dom";
// import React from "react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await API.post("/auth/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("userId", res.data.user.id);
//       localStorage.setItem("name", res.data.user.name);
//       navigate("/dashboard");
//     } catch (err) {
//       alert(err.response?.data?.message || "Login error");
//     }
//   };

//   return (
//     // Changed to a soft gradient background
//     <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900 overflow-hidden font-sans">
      
//       {/* LEFT SECTION — Modern Minimalist Brand */}
//       <div className="hidden lg:flex flex-col justify-center px-20 w-1/2 relative">
        
//         {/* Subtle Decorative Blobs */}
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-200/40 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl"></div>

//         <div className="z-10">
//           <h1 className="text-6xl font-black tracking-tight leading-[1.1]">
//             Ace Your <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
//               Interview with AI
//             </span>
//           </h1>

//           <p className="mt-6 text-slate-600 text-xl max-w-md leading-relaxed">
//             Practice real interview questions, improve your skills,  
//             and get instant feedback from our advanced AI.
//           </p>
// {/* 
//           <div className="flex gap-4 mt-8">
//             <div className="px-4 py-2 bg-white/80 shadow-sm border border-slate-200 rounded-full text-sm font-medium text-slate-700">
//               ✨ 5k+ Students Joined
//             </div>
//           </div> */}
//         </div>
//       </div>

//       {/* RIGHT SECTION — CLEAN LOGIN CARD */}
//       <div className="flex justify-center items-center w-full lg:w-1/2 p-6">
        
//         <div className="w-full max-w-[420px] bg-white border border-slate-200 rounded-3xl p-10 shadow-xl shadow-indigo-100/50">

//           <div className="mb-10">
//             <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
//             <p className="text-slate-500 mt-2">
//               Log in to your dashboard to continue.
//             </p>
//           </div>

//           <div className="space-y-5">
//             {/* EMAIL INPUT */}
//             <div>
//               <label className="block text-slate-700 text-sm font-semibold mb-1.5 ml-1">Email Address</label>
//               <input
//                 type="email"
//                 className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
//                 placeholder="name@company.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             {/* PASSWORD INPUT */}
//             <div>
//               <label className="block text-slate-700 text-sm font-semibold mb-1.5 ml-1">Password</label>
//               <input
//                 type="password"
//                 className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             {/* LOGIN BUTTON */}
//             <button
//               onClick={handleLogin}
//               className="w-full py-4 mt-2 rounded-xl bg-slate-900 hover:bg-indigo-600 font-bold text-white shadow-lg hover:shadow-indigo-200 transition-all duration-300 transform active:scale-[0.98]"
//             >
//               Sign In
//             </button>
//           </div>

//           {/* Separator */}
//           <div className="relative my-8">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-slate-100"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-slate-400">or</span>
//             </div>
//           </div>

//           <p className="text-center text-slate-600">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
//               Sign up free
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

//dark mode
import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import React from "react";
import { FiMail, FiLock, FiArrowRight, FiShield } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("name", res.data.user.name);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="min-h-screen flex transition-colors duration-500 font-sans selection:bg-indigo-500/30" 
         style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      
      {/* LEFT SECTION — Modern Dark Brand */}
      <div className="hidden lg:flex flex-col justify-center px-20 w-1/2 relative overflow-hidden">
        
        {/* Dynamic Background Blurs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]"></div>

        <div className="z-10">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <FiShield /> Secure AI Gateway
          </div> */}
          
          <h1 className="text-7xl font-black tracking-tighter leading-[0.95]">
            Master Your <br />
            <span style={{ color: "var(--accent)" }}>Interview Skills</span>
          </h1>

          <p className="mt-8 text-lg max-w-md leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Unlock your potential with real-time AI simulations, 
            technical drills, and deep behavioral analysis.
          </p>

          {/* <div className="mt-12 flex items-center gap-4">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--bg-primary)] bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
             </div>
             <p className="text-sm font-bold" style={{ color: "var(--text-secondary)" }}>
                Joined by <span className="text-[var(--text-primary)]">5,000+</span> candidates
             </p>
          </div> */}
        </div>
      </div>

      {/* RIGHT SECTION — DARK LOGIN CARD */}
      <div className="flex justify-center items-center w-full lg:w-1/2 p-6 relative">
        
        {/* Mobile-only background glow */}
        <div className="lg:hidden absolute inset-0 bg-indigo-600/5 blur-3xl -z-10"></div>

        <div className="w-full max-w-[440px] rounded-[2.5rem] p-10 shadow-2xl border transition-all"
             style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>

          <div className="mb-10">
            <h2 className="text-3xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>Welcome Back</h2>
            <p className="mt-2 font-medium" style={{ color: "var(--text-secondary)" }}>
              Sign in to your PrepVision account.
            </p>
          </div>

          <div className="space-y-6">
            {/* EMAIL INPUT */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest ml-1" style={{ color: "var(--text-secondary)" }}>Email Address</label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[var(--accent)]" style={{ color: "var(--text-secondary)" }} />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl outline-none transition-all border font-medium"
                  style={{ 
                    backgroundColor: "var(--bg-primary)", 
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)"
                  }}
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Password</label>
                <Link to="/forgot" className="text-[10px] font-black uppercase tracking-tighter hover:text-[var(--accent)] transition-colors" style={{ color: "var(--text-secondary)" }}>Forgot?</Link>
              </div>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[var(--accent)]" style={{ color: "var(--text-secondary)" }} />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl outline-none transition-all border font-medium"
                  style={{ 
                    backgroundColor: "var(--bg-primary)", 
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)"
                  }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              className="group w-full py-4 mt-4 rounded-2xl font-black text-lg text-white shadow-xl transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3"
              style={{ 
                backgroundColor: "var(--accent)",
                boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)"
              }}
            >
              Sign In <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Separator */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: "var(--border-color)" }}></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 font-black uppercase tracking-widest" style={{ backgroundColor: "var(--bg-card)", color: "var(--text-secondary)" }}>OR</span>
            </div>
          </div>

          <p className="text-center font-medium" style={{ color: "var(--text-secondary)" }}>
            New to the platform?{" "}
            <Link to="/register" className="font-black hover:brightness-125 transition-all" style={{ color: "var(--accent)" }}>
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}