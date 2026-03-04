


// import { useState } from "react";
// // import { API } from "../api/api";
// import API from "../api/api";
// import { Link, useNavigate } from "react-router-dom";
// import React from "react";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

// const handleSubmit = async () => {
//   try {
//     const res = await API.post("/auth/register", {
//       name, email, password, phone
//     });

//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("userId", res.data.user.id);   // ADD THIS
//     localStorage.setItem("name", res.data.user.name);   // ADD THIS

//     navigate("/dashboard");
//   } catch (err) {
//     alert(err.response?.data?.message || "Registration error");
//   }
// };

//   return (
//     <div className="min-h-screen flex bg-gray-950 text-white overflow-hidden">

//       {/* LEFT SECTION — BRANDING */}
//       <div className="hidden lg:flex flex-col justify-center px-16 w-1/2 relative">
        
//         {/* Glow BG effect */}
//         <div className="absolute inset-0 bg-gradient-to-br 
//             from-purple-600/20 to-blue-400/20 blur-[120px] rounded-full">
//         </div>

//         <h1 className="text-5xl font-extrabold z-10 leading-tight">
//           Join the  
//           <span className="text-purple-400"> AI Interview Revolution</span>
//         </h1>

//         <p className="mt-4 text-gray-300 text-lg z-10">
//           Build your profile and start practicing with AI-driven interview simulations.
//         </p>

//         <div className="w-32 h-2 bg-purple-500 rounded-full mt-6 animate-pulse"></div>
//       </div>

//       {/* RIGHT SECTION — FORM */}
//       <div className="flex justify-center items-center w-full lg:w-1/2 p-6">
        
//         <div className="w-[380px] backdrop-blur-2xl bg-white/10 border border-white/20 
//             rounded-2xl p-8 shadow-[0_0_25px_rgba(120,64,255,0.4)] animate-fadeIn">

//           <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
//           <p className="text-center text-gray-300 mb-8">
//             Become part of an AI-powered learning experience
//           </p>

//           {/* Name */}
//           <label className="text-gray-300 text-sm">Full Name</label>
//           <input
//             type="text"
//             className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
//                 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 
//                 outline-none transition mb-4"
//             placeholder="Enter full name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           {/* Email */}
//           <label className="text-gray-300 text-sm">Email</label>
//           <input
//             type="email"
//             className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
//                 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500
//                 outline-none transition mb-4"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           {/* Phone */}
//           <label className="text-gray-300 text-sm">Phone Number</label>
//           <input
//             type="text"
//             className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
//                 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500
//                 outline-none transition mb-4"
//             placeholder="Enter phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />

//           {/* Password */}
//           <label className="text-gray-300 text-sm">Password</label>
//           <input
//             type="password"
//             className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
//                 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500
//                 outline-none transition mb-6"
//             placeholder="Create password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {/* Register Button */}
//           <button
//             onClick={handleSubmit}
//             className="w-full py-3 rounded-lg bg-gradient-to-r 
//                 from-purple-600 to-blue-600 font-semibold text-white shadow-lg 
//                 hover:shadow-purple-500/40 transition-all"
//           >
//             Register
//           </button>

//           {/* Divider */}
//           <div className="my-6 border-t border-gray-700"></div>

//           <p className="text-center text-gray-300">
//             Already have an account?{" "}
//             <Link to="/login" className="text-purple-400 font-semibold hover:underline">
//               Login
//             </Link>
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import API from "../api/api";
// import { Link, useNavigate } from "react-router-dom";
// import React from "react";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   // const handleSubmit = async () => {
//   //   try {
//   //     const res = await API.post("/auth/register", {
//   //       name, email, password, phone
//   //     });

//   //     localStorage.setItem("token", res.data.token);
//   //     localStorage.setItem("userId", res.data.user.id);
//   //     localStorage.setItem("name", res.data.user.name);

//   //     navigate("/dashboard");
//   //   } catch (err) {
//   //     alert(err.response?.data?.message || "Registration error");
//   //   }
//   // };
//   const handleSubmit = async () => {
//   // ✅ Email validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   // ✅ Phone validation (10 digits only)
//   const phoneRegex = /^[0-9]{10}$/;

//   // ✅ Password validation (all combinations)
//   const passwordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-={}[\]|\\:;"'<>,./]).{8,}$/;

//   if (!emailRegex.test(email)) {
//     alert("Please enter a valid email address");
//     return;
//   }

//   if (!phoneRegex.test(phone)) {
//     alert("Phone number must be exactly 10 digits");
//     return;
//   }

//   if (!passwordRegex.test(password)) {
//     alert(
//       "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long"
//     );
//     return;
//   }

//   try {
//     const res = await API.post("/auth/register", {
//       name,
//       email,
//       password,
//       phone,
//     });

//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("userId", res.data.user.id);
//     localStorage.setItem("name", res.data.user.name);

//     navigate("/dashboard");
//   } catch (err) {
//     alert(err.response?.data?.message || "Registration error");
//   }
// };


//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 overflow-hidden font-sans">

//       {/* LEFT SECTION — MODERN BRANDING */}
//       <div className="hidden lg:flex flex-col justify-center px-20 w-1/2 relative">
        
//         {/* Soft Background Accents */}
//         <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-100/50 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl"></div>

//         <div className="z-10">
//           <h1 className="text-6xl font-black tracking-tight leading-[1.1]">
//             Join the <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
//               AI Interview Revolution
//             </span>
//           </h1>

//           <p className="mt-6 text-slate-600 text-xl max-w-md leading-relaxed">
//             Build your professional profile and start practicing with AI-driven 
//             interview simulations tailored to your career.
//           </p>

//           {/* <div className="mt-8 flex items-center space-x-2">
//             <div className="flex -space-x-2">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
//               ))}
//             </div>
//             <span className="text-sm font-medium text-slate-500">Trusted by 10k+ candidates</span>
//           </div> */}
//         </div>
//       </div>

//       {/* RIGHT SECTION — CLEAN FORM */}
//       <div className="flex justify-center items-center w-full lg:w-1/2 p-6">
        
//         <div className="w-full max-w-[440px] bg-white border border-slate-200 rounded-3xl p-10 shadow-xl shadow-indigo-100/40">

//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
//             <p className="text-slate-500 mt-2">
//               Start your journey to your dream job today.
//             </p>
//           </div>

//           <div className="space-y-4">
//             {/* Full Name */}
//             <div>
//               <label className="block text-slate-700 text-sm font-semibold mb-1 ml-1">Full Name</label>
//               <input
//                 type="text"
//                 className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all"
//                 placeholder="John Doe"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-slate-700 text-sm font-semibold mb-1 ml-1">Email</label>
//               <input
//                 type="email"
//                 className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all"
//                 placeholder="john@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="block text-slate-700 text-sm font-semibold mb-1 ml-1">Phone Number</label>
//               <input
//                 type="text"
//                 className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all"
//                 placeholder="+1 (555) 000-0000"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-slate-700 text-sm font-semibold mb-1 ml-1">Password</label>
//               <input
//                 type="password"
//                 className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             {/* Register Button */}
//             <button
//               onClick={handleSubmit}
//               className="w-full py-4 mt-2 rounded-xl bg-slate-900 hover:bg-purple-600 font-bold text-white shadow-lg hover:shadow-purple-200 transition-all duration-300 transform active:scale-[0.98]"
//             >
//               Get Started
//             </button>
//           </div>

//           {/* Divider */}
//           <div className="relative my-8">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-slate-100"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-slate-400">Already have an account?</span>
//             </div>
//           </div>

//           <p className="text-center">
//             <Link to="/login" className="text-purple-600 font-bold hover:text-purple-700 transition-colors">
//               Sign in to your account
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import API from "../api/api";
// import { Link, useNavigate } from "react-router-dom";
// import React from "react";

// /* ===== Outlined Eye Icons ===== */
// const EyeIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
//     <circle cx="12" cy="12" r="2.5" />
//   </svg>
// );

// const EyeOffIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-6.5 0-10-6-10-6a18.4 18.4 0 0 1 5.06-6.94" />
//     <path d="M1 1l22 22" />
//     <path d="M9.5 9.5a2.5 2.5 0 0 0 3.5 3.5" />
//   </svg>
// );

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});

//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     const newErrors = {};

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10}$/;
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-={}[\]|\\:;"'<>,./]).{8,}$/;

//     if (!name.trim()) newErrors.name = "Full name is required";
//     if (!emailRegex.test(email))
//       newErrors.email = "Enter a valid email address";
//     if (!phoneRegex.test(phone))
//       newErrors.phone = "Enter a valid 10-digit phone number";
//     if (!passwordRegex.test(password))
//       newErrors.password =
//         "Password must be at least 8 characters with uppercase, lowercase, number & special character";

//     if (Object.keys(newErrors).length) {
//       setErrors(newErrors);
//       return;
//     }

//     setErrors({});

//     try {
//       const res = await API.post("/auth/register", {
//         name: name.trim(),
//         email: email.toLowerCase(),
//         phone,
//         password,
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("userId", res.data.user.id);
//       localStorage.setItem("name", res.data.user.name);
//       localStorage.setItem("username", res.data.user.username);

//       navigate("/dashboard");
//     } catch (err) {
//       setErrors({
//         api: err.response?.data?.message || "Registration failed",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 font-sans">
//       {/* LEFT */}
//       <div className="hidden lg:flex flex-col justify-center px-20 w-1/2">
//         <h1 className="text-6xl font-black leading-tight">
//           Join the <br />
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
//             AI Interview Revolution
//           </span>
//         </h1>
//         <p className="mt-6 text-slate-600 text-xl max-w-md">
//           Build your professional profile and start practicing with AI-driven
//           interview simulations tailored to your career.
//         </p>
//       </div>

//       {/* RIGHT */}
//       <div className="flex justify-center items-center w-full lg:w-1/2 p-6">
//         <div className="w-full max-w-[440px] bg-white border rounded-3xl p-10 shadow-xl">
//           <h2 className="text-3xl font-bold">Create Account</h2>
//           <p className="text-slate-500 mt-2">
//             Start your journey to your dream job today.
//           </p>

//           <div className="space-y-4 mt-6">
//             {/* Name */}
//             <div>
//               <label className="text-sm font-semibold">Full Name</label>
//               <input
//                 className={`w-full p-3 rounded-xl bg-slate-50 border ${
//                   errors.name ? "border-red-400" : "border-slate-200"
//                 }`}
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-xs mt-1">{errors.name}</p>
//               )}
//             </div>

//             {/* Email */}
//             <div>
//               <label className="text-sm font-semibold">Email</label>
//               <input
//                 className={`w-full p-3 rounded-xl bg-slate-50 border ${
//                   errors.email ? "border-red-400" : "border-slate-200"
//                 }`}
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//               )}
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="text-sm font-semibold">Phone Number</label>
//               <div
//                 className={`flex items-center rounded-xl bg-slate-50 border ${
//                   errors.phone ? "border-red-400" : "border-slate-200"
//                 }`}
//               >
//                 <div className="px-3 border-r text-slate-600 select-none">
//                   🇮🇳 +91
//                 </div>
//                 <input
//                   type="tel"
//                   maxLength={10}
//                   className="flex-1 p-3 bg-transparent outline-none"
//                   value={phone}
//                   onChange={(e) =>
//                     setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
//                   }
//                 />
//               </div>
//               {errors.phone && (
//                 <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label className="text-sm font-semibold">Password</label>
//               <div
//                 className={`flex items-center rounded-xl bg-slate-50 border ${
//                   errors.password ? "border-red-400" : "border-slate-200"
//                 }`}
//               >
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="flex-1 p-3 bg-transparent outline-none"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="px-4 text-slate-400 hover:text-slate-600"
//                 >
//                   {showPassword ? <EyeOffIcon /> : <EyeIcon />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.password}
//                 </p>
//               )}
//             </div>

//             {errors.api && (
//               <p className="text-red-600 text-sm text-center">
//                 {errors.api}
//               </p>
//             )}

//             <button
//               onClick={handleSubmit}
//               className="w-full py-4 rounded-xl bg-slate-900 hover:bg-purple-600 font-bold text-white"
//             >
//               Get Started
//             </button>
//           </div>

//           <p className="text-center mt-6">
//             <Link to="/login" className="text-purple-600 font-bold">
//               Sign in to your account
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
import { FiUser, FiMail, FiPhone, FiLock, FiArrowRight, FiShield } from "react-icons/fi";

/* ===== Outlined Eye Icons ===== */
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-6.5 0-10-6-10-6a18.4 18.4 0 0 1 5.06-6.94" />
    <path d="M1 1l22 22" />
    <path d="M9.5 9.5a2.5 2.5 0 0 0 3.5 3.5" />
  </svg>
);

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-={}[\]|\\:;"'<>,./]).{8,}$/;

    if (!name.trim()) newErrors.name = "Full name is required";
    if (!emailRegex.test(email)) newErrors.email = "Enter a valid email address";
    if (!phoneRegex.test(phone)) newErrors.phone = "Enter a valid 10-digit phone number";
    if (!passwordRegex.test(password))
      newErrors.password =
        "Password must be at least 8 characters with mixed cases & symbols";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      await API.post("/auth/register", {
        name: name.trim(),
        email: email.toLowerCase(),
        phone,
        password,
      });

      // ✅ Redirect to login page after successful registration
      navigate("/login");

    } catch (err) {
      setErrors({
        api: err.response?.data?.message || "Registration failed",
      });
    }
  };

  const inputWrapper = (error) => `
    flex items-center rounded-2xl border transition-all 
    bg-[var(--bg-primary)] ${
      error ? "border-rose-500/50" : "border-[var(--border-color)]"
    }
    focus-within:border-[var(--accent)] focus-within:ring-4 focus-within:ring-indigo-500/10
  `;

  return (
    <div
      className="min-h-screen flex transition-colors duration-500 font-sans selection:bg-indigo-500/30"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      {/* LEFT SECTION */}
      <div className="hidden lg:flex flex-col justify-center px-20 w-1/2 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]"></div>

        <div className="z-10">
          <h1 className="text-7xl font-black tracking-tighter leading-[0.95]">
            Join the <br />
            <span style={{ color: "var(--accent)" }}>AI Revolution</span>
          </h1>
          <p
            className="mt-8 text-lg max-w-md leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Build your professional profile and start practicing with AI-driven
            simulations tailored to your career trajectory.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex justify-center items-center w-full lg:w-1/2 p-6 overflow-y-auto">
        <div
          className="w-full max-w-[460px] rounded-[2.5rem] p-10 shadow-2xl border transition-all my-8"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
        >
          <h2
            className="text-3xl font-black tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Create Account
          </h2>
          <p
            className="mt-2 font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            Start your journey to your dream job.
          </p>

          <div className="space-y-4 mt-8">
            {/* Name */}
            <div className="space-y-1.5">
              <label
                className="text-xs font-black uppercase tracking-widest ml-1"
                style={{ color: "var(--text-secondary)" }}
              >
                Full Name
              </label>
              <div className={inputWrapper(errors.name)}>
                <FiUser className="ml-4 text-[var(--text-secondary)]" />
                <input
                  className="w-full p-4 bg-transparent outline-none text-sm font-medium"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {errors.name && (
                <p className="text-rose-400 text-[10px] font-bold ml-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                className="text-xs font-black uppercase tracking-widest ml-1"
                style={{ color: "var(--text-secondary)" }}
              >
                Email
              </label>
              <div className={inputWrapper(errors.email)}>
                <FiMail className="ml-4 text-[var(--text-secondary)]" />
                <input
                  className="w-full p-4 bg-transparent outline-none text-sm font-medium"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && (
                <p className="text-rose-400 text-[10px] font-bold ml-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label
                className="text-xs font-black uppercase tracking-widest ml-1"
                style={{ color: "var(--text-secondary)" }}
              >
                Phone Number
              </label>
              <div className={inputWrapper(errors.phone)}>
                <div
                  className="pl-4 pr-3 border-r text-[10px] font-bold tracking-tighter"
                  style={{
                    borderColor: "var(--border-color)",
                    color: "var(--text-secondary)",
                  }}
                >
                  🇮🇳 +91
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  className="flex-1 p-4 bg-transparent outline-none text-sm font-medium"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                />
              </div>
              {errors.phone && (
                <p className="text-rose-400 text-[10px] font-bold ml-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                className="text-xs font-black uppercase tracking-widest ml-1"
                style={{ color: "var(--text-secondary)" }}
              >
                Password
              </label>
              <div className={inputWrapper(errors.password)}>
                <FiLock className="ml-4 text-[var(--text-secondary)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="flex-1 p-4 bg-transparent outline-none text-sm font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-4 transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-400 text-[10px] font-bold leading-tight ml-1">
                  {errors.password}
                </p>
              )}
            </div>

            {errors.api && (
              <p className="text-rose-500 text-xs text-center font-bold p-3 rounded-xl bg-rose-500/5 border border-rose-500/10">
                {errors.api}
              </p>
            )}

            <button
              onClick={handleSubmit}
              className="group w-full py-4 mt-4 rounded-2xl font-black text-lg text-white shadow-xl transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3"
              style={{
                backgroundColor: "var(--accent)",
                boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)",
              }}
            >
              Get Started{" "}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p
            className="text-center mt-8 font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-black hover:brightness-125 transition-all"
              style={{ color: "var(--accent)" }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}