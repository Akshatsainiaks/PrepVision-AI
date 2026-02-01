// // src/components/landing/Footer.jsx
// import React from "react";

// export default function Footer() {
//   return (
//     <footer className="border-t border-white/10 bg-gray-950 pt-16 pb-10 text-gray-300">
      
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12">

//         {/* Logo */}
//         <div className="md:col-span-2">
//           <div className="flex items-center gap-3">
//             <img
//               src="/new.png"
//               alt="PrepVision AI"
//               className="w-12 h-12 object-contain"
//             />
//             <h2 className="text-2xl font-bold text-white">
//               PrepVision AI
//             </h2>
//           </div>

//           <p className="mt-4 text-sm text-gray-400 max-w-sm">
//             AI-powered interview preparation platform helping learners
//             practice smarter and perform better.
//           </p>
//         </div>

//         {/* Features */}
//         <div>
//           <h3 className="font-semibold mb-4 text-white">Features</h3>
//           <ul className="space-y-2 text-sm text-gray-400">
//             {[
//               "Mock Interviews",
//               "AI Feedback",
//               "Practice Questions",
//               "Voice Practice",
//               "Learning Roadmap",
//             ].map((item) => (
//               <li
//                 key={item}
//                 className="hover:text-white transition cursor-pointer"
//               >
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Company */}
//         <div>
//           <h3 className="font-semibold mb-4 text-white">Company</h3>
//           <ul className="space-y-2 text-sm text-gray-400">
//             {["About Us", "Pricing", "Careers", "Contact"].map((item) => (
//               <li
//                 key={item}
//                 className="hover:text-white transition cursor-pointer"
//               >
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Policies */}
//         <div>
//           <h3 className="font-semibold mb-4 text-white">Policies</h3>
//           <ul className="space-y-2 text-sm text-gray-400">
//             {["Terms", "Privacy", "Cookies"].map((item) => (
//               <li
//                 key={item}
//                 className="hover:text-white transition cursor-pointer"
//               >
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="text-center text-gray-500 text-sm mt-16">
//         © {new Date().getFullYear()} PrepVision AI — All rights reserved.
//       </div>

//     </footer>
//   );
// }


//new final
// src/components/landing/Footer.jsx
import React from "react";
import { FiArrowUpRight, FiTwitter, FiLinkedin, FiGithub } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 pt-20 pb-10 font-sans selection:bg-indigo-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 lg:gap-16">

          {/* BRANDING SECTION */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100 transition-transform group-hover:scale-110">
                <img
                  src="/new.png"
                  alt="PrepVision AI"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h2 className="text-2xl font-black tracking-tighter text-slate-900">
                PrepVision<span className="text-indigo-600">AI</span>
              </h2>
            </div>

            <p className="text-slate-500 font-medium leading-relaxed max-w-xs">
              Empowering the next generation of professionals with 
              <span className="text-slate-900 font-bold"> AI-driven </span> 
              interview simulations and real-time feedback.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
               {[<FiTwitter />, <FiLinkedin />, <FiGithub />].map((icon, idx) => (
                 <a key={idx} href="#" className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm">
                   {icon}
                 </a>
               ))}
            </div>
          </div>

          {/* LINKS: FEATURES */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Platform</h3>
            <ul className="space-y-4">
              {[
                "Mock Interviews",
                "AI Feedback",
                "Question Bank",
                "Voice Practice",
                "Roadmaps",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1 group transition-colors">
                    {item}
                    <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* LINKS: COMPANY */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Company</h3>
            <ul className="space-y-4">
              {["About Us", "Pricing", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* LINKS: POLICIES */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Policies</h3>
            <ul className="space-y-4">
              {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM DIVIDER & COPYRIGHT */}
        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            © {currentYear} PrepVision AI — Built for the future of work.
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight">System Status: All Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}