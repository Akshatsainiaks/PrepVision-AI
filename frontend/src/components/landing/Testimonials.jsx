// // src/components/landing/Testimonials.jsx
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const testimonials = [
//   {
//     name: "Asha R.",
//     role: "Frontend Engineer",
//     quote: "The AI feedback improved my answers in just two weeks. It felt like having a personal mentor."
//   },
//   {
//     name: "Rajat K.",
//     role: "SDE Intern",
//     quote: "Mock interviews feel incredibly real. The roadmap helped me focus on exactly what to improve."
//   },
//   {
//     name: "Priya S.",
//     role: "Product Manager",
//     quote: "Voice practice boosted my confidence a lot. I now speak more clearly in interviews."
//   }
// ];

// export default function Testimonials() {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(
//       () => setIndex((i) => (i + 1) % testimonials.length),
//       5000
//     );
//     return () => clearInterval(timer);
//   }, []);

//   const current = testimonials[index];

//   return (
//     <section className="max-w-4xl mx-auto px-6">
      
//       {/* Heading */}
//       <div className="text-center mb-10">
//         <span className="inline-block mb-3 px-4 py-1 rounded-full text-sm
//           bg-white/10 text-purple-300 border border-white/10">
//           Testimonials
//         </span>

//         <h3 className="text-4xl font-extrabold
//           bg-gradient-to-r from-purple-400 to-blue-400
//           bg-clip-text text-transparent">
//           What Learners Say
//         </h3>

//         <p className="text-gray-400 mt-3">
//           Trusted by students and professionals preparing for real interviews
//         </p>
//       </div>

//       {/* Card */}
//       <div className="relative">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.4 }}
//             className="
//               p-8 rounded-2xl
//               bg-white/5 border border-white/10
//               backdrop-blur-md
//               shadow-lg
//             "
//           >
//             <div className="flex items-start gap-5">
              
//               {/* Avatar */}
//               <div className="
//                 w-14 h-14 rounded-full
//                 bg-gradient-to-r from-purple-500 to-blue-600
//                 flex items-center justify-center
//                 text-white font-bold text-lg
//                 shrink-0
//               ">
//                 {current.name.split(" ").map(n => n[0]).join("")}
//               </div>

//               {/* Content */}
//               <div>
//                 <p className="text-gray-300 text-lg leading-relaxed">
//                   “{current.quote}”
//                 </p>

//                 <div className="mt-4 font-semibold">
//                   {current.name}
//                   <span className="text-gray-400 text-sm">
//                     {" "}• {current.role}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>

//         {/* Dots */}
//         <div className="flex justify-center gap-3 mt-6">
//           {testimonials.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setIndex(i)}
//               className={`w-2.5 h-2.5 rounded-full transition
//                 ${i === index ? "bg-white" : "bg-white/30 hover:bg-white/50"}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


// new final
// // src/components/landing/Testimonials.jsx
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiMessageCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// const testimonials = [
//   {
//     name: "Asha R.",
//     role: "Frontend Engineer",
//     quote: "The AI feedback improved my answers in just two weeks. It felt like having a personal mentor who actually understood technical nuances."
//   },
//   {
//     name: "Rajat K.",
//     role: "SDE Intern",
//     quote: "Mock interviews feel incredibly real. The roadmap helped me focus on exactly what to improve rather than being overwhelmed."
//   },
//   {
//     name: "Priya S.",
//     role: "Product Manager",
//     quote: "Voice practice boosted my confidence a lot. I now speak more clearly and handle follow-up questions with much more composure."
//   }
// ];

// export default function Testimonials() {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(
//       () => setIndex((i) => (i + 1) % testimonials.length),
//       6000
//     );
//     return () => clearInterval(timer);
//   }, []);

//   const nextTestimonial = () => setIndex((i) => (i + 1) % testimonials.length);
//   const prevTestimonial = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

//   const current = testimonials[index];

//   return (
//     <section id="testimonials" className="max-w-5xl mx-auto px-6 py-24 animate-fadeIn">
      
//       {/* Header Section */}
//       <div className="text-center mb-16">
//         <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[11px] font-black uppercase tracking-[0.2em] rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
//           <FiMessageCircle className="text-sm" />
//           Success Stories
//         </span>

//         <h3 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
//           What Our <br />
//           <span className="text-indigo-600">Learners Say</span>
//         </h3>

//         <p className="text-slate-500 mt-6 max-w-xl mx-auto font-medium text-lg">
//           Join thousands of professionals who have mastered their interview skills using PrepVision AI.
//         </p>
//       </div>

//       {/* Main Slider Container */}
//       <div className="relative max-w-4xl mx-auto">
        
//         {/* Navigation Buttons (Desktop) */}
//         <div className="hidden lg:flex absolute -left-20 top-1/2 -translate-y-1/2 items-center">
//             <button onClick={prevTestimonial} className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-lg transition-all active:scale-90">
//                 <FiChevronLeft size={24} />
//             </button>
//         </div>
//         <div className="hidden lg:flex absolute -right-20 top-1/2 -translate-y-1/2 items-center">
//             <button onClick={nextTestimonial} className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-lg transition-all active:scale-90">
//                 <FiChevronRight size={24} />
//             </button>
//         </div>

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, scale: 0.98, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 1.02, y: -20 }}
//             transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
//             className="p-10 md:p-14 rounded-[3rem] bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 relative overflow-hidden group"
//           >
//             {/* Background Decoration */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-indigo-100 transition-colors" />

//             <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10 text-center md:text-left">
              
//               {/* Avatar - Improved styling */}
//               <div className="w-20 h-20 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-100 shrink-0 transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
//                 {current.name.split(" ").map(n => n[0]).join("")}
//               </div>

//               {/* Content Area */}
//               <div className="flex-1">
//                 <p className="text-slate-700 text-xl md:text-2xl font-bold leading-relaxed tracking-tight italic">
//                   “{current.quote}”
//                 </p>

//                 <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row md:items-center gap-4">
//                   <div className="font-black text-slate-900 tracking-tight text-lg uppercase">
//                     {current.name}
//                   </div>
//                   <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300" />
//                   <div className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 text-xs font-black uppercase tracking-widest">
//                     {current.role}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>

//         {/* Dynamic Pagination Dots */}
//         <div className="flex justify-center gap-4 mt-12">
//           {testimonials.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setIndex(i)}
//               className={`h-2 rounded-full transition-all duration-300
//                 ${i === index ? "w-12 bg-indigo-600 shadow-md shadow-indigo-100" : "w-2 bg-slate-200 hover:bg-slate-300"}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

//dark mode
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "Asha R.",
    role: "Frontend Engineer",
    quote: "The AI feedback improved my answers in just two weeks. It felt like having a personal mentor who actually understood technical nuances."
  },
  {
    name: "Rajat K.",
    role: "SDE Intern",
    quote: "Mock interviews feel incredibly real. The roadmap helped me focus on exactly what to improve rather than being overwhelmed."
  },
  {
    name: "Priya S.",
    role: "Product Manager",
    quote: "Voice practice boosted my confidence a lot. I now speak more clearly and handle follow-up questions with much more composure."
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => setIndex((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[index];

  return (
    <section 
      id="testimonials" 
      className="max-w-5xl mx-auto px-6 py-24 transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      
      {/* Header Section */}
      <div className="text-center mb-16 relative">
        {/* Background Glow behind text */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 blur-[100px] -z-10" />

        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border"
              style={{ backgroundColor: "rgba(99, 102, 241, 0.1)", color: "var(--accent)", borderColor: "rgba(99, 102, 241, 0.2)" }}>
          <FiMessageCircle className="text-sm" />
          Success Stories
        </span>

        <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
          Learner <span style={{ color: "var(--accent)" }}>Spotlight</span>
        </h3>

        <p className="mt-6 max-w-xl mx-auto font-medium text-lg leading-relaxed opacity-70" style={{ color: "var(--text-secondary)" }}>
          Join thousands of professionals who have mastered their interview skills using PrepVision AI.
        </p>
      </div>

      {/* Main Slider Container */}
      <div className="relative max-w-4xl mx-auto">
        
        {/* Navigation Buttons (Desktop) */}
        <div className="hidden lg:flex absolute -left-20 top-1/2 -translate-y-1/2 items-center">
            <button 
              onClick={prevTestimonial} 
              className="w-12 h-12 rounded-full border flex items-center justify-center transition-all active:scale-90 shadow-xl"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
            >
                <FiChevronLeft size={24} />
            </button>
        </div>
        <div className="hidden lg:flex absolute -right-20 top-1/2 -translate-y-1/2 items-center">
            <button 
              onClick={nextTestimonial} 
              className="w-12 h-12 rounded-full border flex items-center justify-center transition-all active:scale-90 shadow-xl"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
            >
                <FiChevronRight size={24} />
            </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.02, x: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-10 md:p-14 rounded-[3.5rem] border shadow-2xl relative overflow-hidden group"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
          >
            {/* Background Decoration Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] -mr-32 -mt-32 rounded-full group-hover:bg-indigo-500/10 transition-all duration-700" />

            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10 text-center md:text-left">
              
              {/* Avatar - High Contrast Block */}
              <div className="relative shrink-0">
                <div 
                  className="w-24 h-24 rounded-[2rem] flex items-center justify-center text-white font-black text-3xl shadow-2xl transition-transform duration-500 group-hover:rotate-3"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {current.name.split(" ").map(n => n[0]).join("")}
                </div>
                {/* Small star indicator */}
                <div className="absolute -bottom-2 -right-2 bg-amber-400 p-2 rounded-xl text-slate-900 shadow-xl">
                    <FiStar size={16} fill="currentColor" />
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1">
                <p className="text-xl md:text-3xl font-bold leading-[1.3] tracking-tight italic" style={{ color: "var(--text-primary)" }}>
                  “{current.quote}”
                </p>

                <div className="mt-10 pt-10 border-t flex flex-col md:flex-row md:items-center gap-5" style={{ borderColor: "var(--border-color)" }}>
                  <div className="font-black tracking-widest text-lg uppercase" style={{ color: "var(--text-primary)" }}>
                    {current.name}
                  </div>
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full opacity-20" style={{ backgroundColor: "var(--text-secondary)" }} />
                  <div className="px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-[0.2em]"
                       style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)", color: "var(--accent)" }}>
                    {current.role}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Pagination Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500
                ${i === index ? "w-10 shadow-[0_0_10px_rgba(99,102,241,0.5)]" : "w-1.5 opacity-20 hover:opacity-40"}`}
              style={{ backgroundColor: i === index ? "var(--accent)" : "var(--text-secondary)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}