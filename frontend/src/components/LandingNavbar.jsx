// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function LandingNavbar() {
//   const [scroll, setScroll] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const onScroll = () => setScroll(window.scrollY > 50);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const handleLogoClick = () => {
//     navigate("/");                 // go to landing page
//     window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
//       ${
//         scroll
//           ? "bg-gray-900/70 backdrop-blur-xl border-b border-white/10"
//           : "bg-transparent"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

//         {/* LOGO + NAME */}
//         <div
//           className="flex items-center gap-3 cursor-pointer"
//           onClick={handleLogoClick}
//         >
//           <img
//             src="/new.png"
//             className="w-11 h-11 object-contain"
//             alt="PrepVision AI"
//           />
//           <span className="text-2xl font-bold text-white">
//             PrepVision AI
//           </span>
//         </div>

//         {/* NAV LINKS */}
//         <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
//           <a href="#about" className="hover:text-white transition">
//             About Us
//           </a>
//           <a href="#features" className="hover:text-white transition">
//             Features
//           </a>
//           <a href="#pricing" className="hover:text-white transition">
//             Pricing
//           </a>

//           {/* NEW CAREERS PAGE */}
//           <Link
//             to="/careers"
//             className="hover:text-white transition"
//           >
//             Careers
//           </Link>
//         </div>

//         {/* SIGN IN */}
//         <div>
//           <Link
//             to="/login"
//             className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 
//             hover:bg-white/20 transition text-sm font-medium"
//           >
//             Sign In
//           </Link>
//         </div>

//       </div>
//     </nav>
//   );
// }

//  new final

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiArrowRight, FiMenu } from "react-icons/fi";

// export default function LandingNavbar() {
//   const [scroll, setScroll] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const onScroll = () => setScroll(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const handleLogoClick = () => {
//     navigate("/");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 font-sans
//       ${
//         scroll
//           ? "py-3 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm"
//           : "py-6 bg-transparent" // Transparent at top, but we need dark text for light mode hero
//       }`}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

//         {/* LOGO + NAME */}
//         <div
//           className="flex items-center gap-3 group cursor-pointer"
//           onClick={handleLogoClick}
//         >
//           {/* FIXED: Removed brightness-0 invert to keep brand colors visible on light hero */}
//           <div className={`p-1.5 rounded-xl transition-all duration-300 ${
//             scroll ? 'bg-indigo-600 shadow-lg shadow-indigo-100' : 'bg-indigo-600/10 ring-1 ring-indigo-600/20'
//           }`}>
//             <img
//               src="/new.png"
//               className="w-8 h-8 object-contain transition-all"
//               alt="PrepVision AI"
//             />
//           </div>
//           {/* FIXED: Forced slate-900 even when not scrolled to match light hero */}
//           <span className={`text-xl font-black tracking-tight transition-colors duration-300 ${
//             scroll ? 'text-slate-900' : 'text-slate-900' 
//           }`}>
//             PrepVision<span className="text-indigo-600">AI</span>
//           </span>
//         </div>

//         {/* NAV LINKS - Center Aligned */}
//         {/* FIXED: Changed text-white/90 to text-slate-600 for visibility on light hero */}
//         <div className={`hidden md:flex items-center gap-10 text-[13px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
//           scroll ? 'text-slate-500' : 'text-slate-600'
//         }`}>
//           <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
//           <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
//           <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
//           <Link to="/careers" className="hover:text-indigo-600 transition-colors">Careers</Link>
//         </div>

//         {/* ACTIONS */}
//         <div className="flex items-center gap-4">
//           <Link
//             to="/login"
//             className={`px-6 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 flex items-center gap-2
//             ${
//               scroll 
//                 ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700" 
//                 : "bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700" // FIXED: Solid button for visibility
//             }`}
//           >
//             Sign In
//             <FiArrowRight size={14} className="opacity-70" />
//           </Link>
          
//           {/* Mobile Menu Toggle - FIXED color to slate-900 */}
//           <button className={`md:hidden p-2 rounded-lg transition-colors text-slate-900`}>
//             <FiMenu size={24} />
//           </button>
//         </div>

//       </div>
//     </nav>
//   );
// }

//dark mode
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiMenu } from "react-icons/fi";

export default function LandingNavbar() {
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 font-sans
      ${
        scroll
          ? "py-3 backdrop-blur-2xl border-b shadow-2xl"
          : "py-6 bg-transparent"
      }`}
      style={{ 
        backgroundColor: scroll ? "rgba(2, 6, 23, 0.8)" : "transparent",
        borderColor: scroll ? "var(--border-color)" : "transparent"
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* LOGO + NAME */}
        <div
          className="flex items-center gap-3 group cursor-pointer"
          onClick={handleLogoClick}
        >
          <div className="p-1.5 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-500/20 transition-all duration-300 group-hover:scale-105">
            <img
              src="/new.png"
              className="w-8 h-8 object-contain"
              alt="PrepVision AI"
            />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            PrepVision<span className="text-indigo-500">AI</span>
          </span>
        </div>

        {/* NAV LINKS - Center Aligned */}
        <div className={`hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${
          scroll ? 'text-slate-400' : 'text-slate-300'
        }`}>
          <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
          <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          <Link to="/careers" className="hover:text-indigo-400 transition-colors">Careers</Link>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-7 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] transition-all duration-300 active:scale-95 flex items-center gap-3 text-white shadow-xl shadow-indigo-500/20 hover:brightness-110"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Launch App
            <FiArrowRight size={14} className="opacity-70 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 rounded-lg text-white opacity-80 hover:opacity-100">
            <FiMenu size={24} />
          </button>
        </div>

      </div>
    </nav>
  );
}