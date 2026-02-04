// // src/pages/Landing.jsx
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiMic, FiMessageCircle, FiCpu, FiCheckCircle } from "react-icons/fi";
// import { motion } from "framer-motion";
// import LandingNavbar from "../components/LandingNavbar";

// /* ------------------ Feature Card ------------------ */
// const FeatureCard = ({ icon, title, desc, color }) => (
//   <motion.div
//     whileHover={{ scale: 1.03 }}
//     className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
//   >
//     <div className={`p-3 rounded-lg inline-flex items-center justify-center mb-4 ${color}`}>
//       {icon}
//     </div>
//     <h4 className="text-lg font-semibold mb-2">{title}</h4>
//     <p className="text-gray-300 text-sm">{desc}</p>
//   </motion.div>
// );

// /* ------------------ Testimonials ------------------ */
// const Testimonials = () => {
//   const data = [
//     { name: "Asha R.", role: "Frontend Engineer", quote: "The AI feedback improved my answers in 2 weeks!" },
//     { name: "Rajat K.", role: "SDE Intern", quote: "Mock interviews feel real. The roadmap helped me focus." },
//     { name: "Priya S.", role: "Product Manager", quote: "Voice practice boosted my confidence!" },
//   ];

//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const t = setInterval(() => setIndex((i) => (i + 1) % data.length), 5000);
//     return () => clearInterval(t);
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
//         <div className="flex items-start gap-4">
//           <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold">
//             {data[index].name.split(" ").map((n) => n[0]).join("")}
//           </div>
//           <div>
//             <div className="font-semibold">
//               {data[index].name}{" "}
//               <span className="text-gray-400 text-sm">• {data[index].role}</span>
//             </div>
//             <p className="text-gray-300 mt-2">{data[index].quote}</p>
//           </div>
//         </div>

//         {/* FIXED DOT BUTTONS */}
//         <div className="flex gap-2 mt-4">
//           {data.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setIndex(i)}
//               className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/30"}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ------------------ Pricing ------------------ */
// const Pricing = () => (
//   <div id="pricing" className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
//     {/* Free */}
//     <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
//       <h3 className="text-xl font-semibold mb-2">Free</h3>
//       <div className="text-3xl font-extrabold my-4">₹0</div>
//       <ul className="text-gray-300 text-sm space-y-2 mb-4">
//         <li>10 practice questions / month</li>
//         <li>Basic AI feedback</li>
//         <li>Community access</li>
//       </ul>
//       <button className="px-4 py-2 rounded-lg bg-white/10">Get Free</button>
//     </motion.div>

//     {/* Pro */}
//     <motion.div
//       whileHover={{ y: -6 }}
//       className="p-6 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl"
//     >
//       <h3 className="text-xl font-semibold mb-2">Pro</h3>
//       <div className="text-3xl font-extrabold my-4">₹499 / mo</div>
//       <ul className="text-white/90 text-sm space-y-2 mb-4">
//         <li>Unlimited practice</li>
//         <li>Premium AI evaluations</li>
//         <li>Full roadmap access</li>
//       </ul>
//       <button className="px-4 py-2 rounded-lg bg-white/10">Start Pro</button>
//     </motion.div>

//     {/* Premium */}
//     <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
//       <h3 className="text-xl font-semibold mb-2">Premium</h3>
//       <div className="text-3xl font-extrabold my-4">Custom</div>
//       <ul className="text-gray-300 text-sm space-y-2 mb-4">
//         <li>Teams & Enterprise</li>
//         <li>Custom Evaluations</li>
//         <li>Dedicated Support</li>
//       </ul>
//       <button className="px-4 py-2 rounded-lg bg-white/10">Contact</button>
//     </motion.div>
//   </div>
// );

// /* ------------------ How It Works ------------------ */
// const HowItWorks = () => (
//   <div className="max-w-5xl mx-auto text-center">
//     <h3 className="text-3xl font-bold mb-6">How It Works</h3>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {[1, 2, 3].map((step) => (
//         <motion.div
//           key={step}
//           whileHover={{ scale: 1.03 }}
//           className="p-6 bg-white/5 border border-white/10 rounded-xl"
//         >
//           <div className="text-3xl mb-3">{step}</div>
//           <h4 className="font-semibold">
//             {step === 1
//               ? "Choose a Mock"
//               : step === 2
//               ? "Answer Questions"
//               : "Get Instant AI Feedback"}
//           </h4>
//         </motion.div>
//       ))}
//     </div>
//   </div>
// );

// /* ------------------ VIDEO DEMO ------------------ */
// const VideoDemo = () => (
//   <div className="max-w-5xl mx-auto">
//     <h3 className="text-2xl font-semibold text-center mb-4">Watch a Demo</h3>
//     <div className="rounded-2xl overflow-hidden bg-black/60 p-6">
//       <iframe
//         className="w-full max-w-3xl mx-auto aspect-video rounded-lg"
//         src="https://www.youtube.com/embed/dQw4w9WgXcQ"
//         title="Demo"
//         allowFullScreen
//       />
//     </div>
//   </div>
// );

// /* ------------------ FAQ ------------------ */
// const FAQ = () => {
//   const faqs = [
//     { q: "How accurate is the AI?", a: "Our AI checks clarity, correctness, tone, confidence, and structure." },
//     { q: "Can I practice HR questions?", a: "Yes — supports technical, HR, behavioral & communication rounds." },
//     { q: "Will you use a custom model?", a: "Yes, custom fine-tuned models are coming soon." }
//   ];

//   const [open, setOpen] = useState(null);

//   return (
//     <div id="faq" className="max-w-3xl mx-auto space-y-4">
//       {faqs.map((f, i) => (
//         <motion.div key={i} className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
//           <button
//             onClick={() => setOpen(open === i ? null : i)}
//             className="px-6 py-4 w-full flex justify-between text-left"
//           >
//             <span className="text-lg text-gray-200">{f.q}</span>
//             <span className="text-gray-400 text-xl">{open === i ? "-" : "+"}</span>
//           </button>

//           {open === i && <p className="px-6 pb-4 text-gray-300 text-sm">{f.a}</p>}
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// /* ------------------ ABOUT US ------------------ */
// const AboutUs = () => (
//   <div className="max-w-4xl mx-auto text-center">
//     <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//       About Us
//     </h2>

//     <p className="text-gray-300 mt-4 text-lg leading-relaxed">
//       MyAI helps learners prepare for real interviews using AI-powered mock sessions,
//       instant scoring, voice analysis, and personalized improvement roadmaps.
//       <br />
//       <br />
//       Our mission is to make interview preparation smarter, accessible, and tailored to every learner.
//     </p>
//   </div>
// );

// /* ------------------ FOOTER ------------------ */
// const Footer = () => (
//   <footer className="mt-20 border-t border-white/10 bg-gray-950 pb-12 pt-16 text-gray-300">
//     <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12">

//       {/* Logo */}
//       <div className="col-span-1 md:col-span-2">
//         <div className="flex items-center gap-3">
//           <img src="/new.png" alt="MyAI Logo" className="w-12 h-12 object-contain" />
//           <h2 className="text-2xl font-bold">PrepVision AI</h2>
//         </div>
//       </div>

//       {/* Features */}
//       <div>
//         <h3 className="font-semibold mb-3">Features</h3>
//         <ul className="space-y-2 text-sm text-gray-400">
//           <li>Mock Interviews</li>
//           <li>AI Feedback</li>
//           <li>Practice Questions</li>
//           <li>Voice Practice</li>
//           <li>Learning Roadmap</li>
//         </ul>
//       </div>

//       {/* Organization */}
//       <div>
//         <h3 className="font-semibold mb-3">For Organization</h3>
//         <ul className="space-y-2 text-sm text-gray-400">
//           <li>AI Interview Tools</li>
//           <li>Candidate Assessment</li>
//           <li>Team Analytics</li>
//           <li>Hiring Dashboard</li>
//         </ul>
//       </div>

//       {/* Company */}
//       <div>
//         <h3 className="font-semibold mb-3">Company</h3>
//         <ul className="space-y-2 text-sm text-gray-400">
//           <li>About Us</li>
//           <li>Pricing</li>
//           <li>Careers</li>
//           <li>Contact</li>
//         </ul>
//       </div>

//       {/* Policies */}
//       <div>
//         <h3 className="font-semibold mb-3">Policies</h3>
//         <ul className="space-y-2 text-sm text-gray-400">
//           <li>Terms & Conditions</li>
//           <li>Privacy Policy</li>
//           <li>Cookie Policy</li>
//         </ul>
//       </div>
//     </div>

//     <div className="text-center text-gray-500 text-sm mt-16">
//       © {new Date().getFullYear()} MyAI — All rights reserved.
//     </div>
//   </footer>
// );

// /* ------------------ MAIN PAGE ------------------ */
// export default function Landing() {
//   const navigate = useNavigate();

//   const handleStartExplore = () => {
//     const token = localStorage.getItem("token");
//     token ? navigate("/dashboard") : navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white">
//       <LandingNavbar />

//       {/* HERO */}
//       <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
//         <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//           Ace Your Interviews with AI
//         </h1>

//         <p className="text-gray-300 max-w-xl mx-auto mt-5">
//           Real-time AI interviews, instant feedback, voice analysis & personalized improvement plans.
//         </p>

//         <div className="flex justify-center gap-4 mt-10">
//           <button
//             onClick={handleStartExplore}
//             className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600"
//           >
//             Start Exploring
//           </button>

//           <Link to="/register" className="px-6 py-3 rounded-xl bg-white/10">
//             Create Account
//           </Link>
//         </div>
//       </section>

//       {/* SECTIONS */}
//       <section id="about" className="min-h-screen flex items-center justify-center">
//         <AboutUs />
//       </section>

//       <section id="features" className="min-h-screen flex items-center justify-center px-6">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           <FeatureCard icon={<FiCpu />} title="AI Mock Interviews" desc="Simulate real interview rounds." color="bg-purple-500/10" />
//           <FeatureCard icon={<FiMessageCircle />} title="AI Feedback" desc="Instant insights & scoring." color="bg-blue-500/10" />
//           <FeatureCard icon={<FiCheckCircle />} title="Progress Tracking" desc="Track improvement daily." color="bg-teal-500/10" />
//           <FeatureCard icon={<FiMic />} title="Voice Practice" desc="Improve communication & clarity." color="bg-yellow-500/10" />
//           <FeatureCard icon={<FiMessageCircle />} title="Community Chat" desc="Learn with peers." color="bg-pink-400/10" />
//           <FeatureCard icon={<FiCpu />} title="Learning Roadmap" desc="Personalized guidance." color="bg-green-400/10" />
//         </div>
//       </section>

//       <section className="min-h-screen flex items-center justify-center">
//         <HowItWorks />
//       </section>

//       <section className="min-h-screen flex items-center justify-center px-6">
//         <div>
//           <h3 className="text-3xl font-semibold text-center mb-6">What learners say</h3>
//           <Testimonials />
//         </div>
//       </section>

//       <section id="pricing" className="min-h-screen flex items-center justify-center px-6">
//         <div>
//           <h3 className="text-3xl font-semibold text-center mb-6">Pricing</h3>
//           <Pricing />
//         </div>
//       </section>

//       <section className="min-h-screen flex items-center justify-center px-6">
//         <VideoDemo />
//       </section>

//       <section className="min-h-screen flex items-center justify-center px-6">
//         <div>
//           <h3 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
//             Frequently Asked Questions
//           </h3>
//           <FAQ />
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }



// // src/pages/Landing.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import LandingNavbar from "../components/LandingNavbar";

// // landing sections
// import AboutUs from "../components/landing/AboutUs";
// import Features from "../components/landing/Features";
// import HowItWorks from "../components/landing/HowItWorks";
// import Testimonials from "../components/landing/Testimonials";
// import Pricing from "../components/landing/Pricing";
// import VideoDemo from "../components/landing/VideoDemo";
// import FAQ from "../components/landing/FAQ";
// import Footer from "../components/landing/Footer";

// export default function Landing() {
//   const navigate = useNavigate();

//   const handleStartExplore = () => {
//     const token = localStorage.getItem("token");
//     token ? navigate("/dashboard") : navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white">
//       {/* NAVBAR */}
//       <LandingNavbar />

//       {/* ================= HERO ================= */}
//       <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
//         <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//           Ace Your Interviews with AI
//         </h1>

//         <p className="text-gray-300 max-w-xl mx-auto mt-5">
//           Real-time AI interviews, instant feedback, voice analysis &
//           personalized improvement plans.
//         </p>

//         <div className="flex justify-center gap-4 mt-10">
//           <button
//             onClick={handleStartExplore}
//             className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-semibold"
//           >
//             Start Exploring
//           </button>

//           <Link
//             to="/register"
//             className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
//           >
//             Create Account
//           </Link>
//         </div>
//       </section>

//       {/* ================= ABOUT ================= */}
//       <section
//         id="about"
//         className="min-h-screen flex items-center justify-center px-6"
//       >
//         <AboutUs />
//       </section>

//       {/* ================= FEATURES ================= */}
//       <section
//         id="features"
//         className="min-h-screen flex items-center justify-center px-6"
//       >
//         <Features />
//       </section>

//       {/* ================= HOW IT WORKS ================= */}
//       <section className="min-h-screen flex items-center justify-center px-6">
//         <HowItWorks />
//       </section>

//       {/* ================= TESTIMONIALS ================= */}
//       <section className="min-h-screen flex items-center justify-center px-6">
//         <div>
        
//           <Testimonials />
//         </div>
//       </section>

//       {/* ================= PRICING ================= */}
//       <section
//         id="pricing"
//         className="min-h-screen flex items-center justify-center px-6"
//       >
//         <div>
          
//           <Pricing />
//         </div>
//       </section>

//       {/* ================= VIDEO DEMO ================= */}
//       <section className="min-h-screen flex items-center justify-center px-6">
//         <VideoDemo />
//       </section>

//       {/* ================= FAQ ================= */}
//       <section className="min-h-screen flex items-center justify-center px-6">
//         <div>
         
//           <FAQ />
//         </div>
//       </section>

//       {/* ================= FOOTER ================= */}
//       <Footer />
//     </div>
//   );
// }

//new final
// // src/pages/Landing.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import LandingNavbar from "../components/LandingNavbar";
// import { motion } from "framer-motion";
// import { FiArrowRight, FiPlay } from "react-icons/fi";

// // landing sections
// import AboutUs from "../components/landing/AboutUs";
// import Features from "../components/landing/Features";
// import HowItWorks from "../components/landing/HowItWorks";
// import Testimonials from "../components/landing/Testimonials";
// import Pricing from "../components/landing/Pricing";
// import VideoDemo from "../components/landing/VideoDemo";
// import FAQ from "../components/landing/FAQ";
// import Footer from "../components/landing/Footer";

// export default function Landing() {
//   const navigate = useNavigate();

//   const handleStartExplore = () => {
//     const token = localStorage.getItem("token");
//     token ? navigate("/dashboard") : navigate("/login");
//   };

//   return (
//     // FIX: Change background from bg-gray-950 to bg-white and text-white to text-slate-900
//     <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
      
//       {/* NAVBAR */}
//       <LandingNavbar />

//       {/* ================= HERO SECTION ================= */}
//       {/* FIX: Ensure bg-white and clear padding to avoid overlapping navbar */}
//       <section className="min-h-screen relative flex flex-col items-center justify-center text-center px-6 bg-white overflow-hidden pt-20">
        
//         {/* Background Decorative Blurs */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
//           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50/60 blur-[120px] rounded-full" />
//           <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-50/50 blur-[100px] rounded-full" />
//         </div>

//         <div className="relative z-10 max-w-5xl mx-auto">
//           {/* Badge */}
//           {/* <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-8"
//           >
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
//             </span>
//             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
//               Powered by Gemini 3 Flash
//             </span>
//           </motion.div> */}

//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 leading-[1.1]"
//           >
//             Ace Your Interviews <br />
//             <span className="text-indigo-600 font-black">with Real-time AI</span>
//           </motion.h1>

//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-slate-500 max-w-2xl mx-auto mt-8 text-lg md:text-xl font-medium leading-relaxed"
//           >
//             Real-time AI interviews, instant feedback, voice analysis & personalized improvement plans designed to land you the job.
//           </motion.p>

//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-12"
//           >
//             <button
//               onClick={handleStartExplore}
//               className="group flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-indigo-600 text-white font-black text-lg shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
//             >
//               Start Exploring
//               <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
//             </button>

//             <Link
//               to="/register"
//               className="flex items-center gap-3 px-8 py-5 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-700 font-black text-lg hover:bg-slate-50 transition-all shadow-sm"
//             >
//               <FiPlay className="text-indigo-600" />
//               Watch Demo
//             </Link>
//           </motion.div>
//         </div>
//       </section>

//       {/* ================= ABOUT ================= */}
//       {/* FIX: Removed min-h-screen wrappers that cause empty dark space and set bg-white */}
//       <section id="about" className="bg-white">
//         <AboutUs />
//       </section>

//       {/* ================= FEATURES ================= */}
//       <section id="features" className="bg-white">
//         <Features />
//       </section>

//       {/* ================= HOW IT WORKS ================= */}
//       <section className="bg-white">
//         <HowItWorks />
//       </section>

//       {/* ================= TESTIMONIALS ================= */}
//       <section className="bg-white">
//         <Testimonials />
//       </section>

//       {/* ================= PRICING ================= */}
//       <section id="pricing" className="bg-white">
//         <Pricing />
//       </section>

//       {/* ================= VIDEO DEMO ================= */}
//       <section className="bg-white">
//         <VideoDemo />
//       </section>

//       {/* ================= FAQ ================= */}
//       <section className="bg-white">
//         <FAQ />
//       </section>

//       {/* ================= FOOTER ================= */}
//       <Footer />
//     </div>
//   );
// }

// src/pages/Landing.jsx
// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import LandingNavbar from "../components/LandingNavbar";
// import { motion } from "framer-motion";
// import { FiArrowRight, FiPlay } from "react-icons/fi";

// // landing sections
// import AboutUs from "../components/landing/AboutUs";
// import Features from "../components/landing/Features";
// import HowItWorks from "../components/landing/HowItWorks";
// import Testimonials from "../components/landing/Testimonials";
// import Pricing from "../components/landing/Pricing";
// import VideoDemo from "../components/landing/VideoDemo";
// import FAQ from "../components/landing/FAQ";
// import Footer from "../components/landing/Footer";

// export default function Landing() {
//   const navigate = useNavigate();

//   // FIX: Force a global style reset to purge dashboard "dark-mode" remnants
//   useEffect(() => {
//     // Explicitly override body styles that might persist from the dashboard
//     document.body.style.backgroundColor = "#ffffff";
//     document.body.className = "bg-white antialiased";
    
//     // Cleanup on unmount if navigating back to dashboard
//     return () => {
//       document.body.style.backgroundColor = "";
//     };
//   }, []);

//   const handleStartExplore = () => {
//     const token = localStorage.getItem("token");
//     token ? navigate("/dashboard") : navigate("/login");
//   };

//   return (
//     /**
//      * MAIN WRAPPER - Forced high-contrast Crystal Light theme
//      * explicitly declared to prevent background bleed from dashboard states.
//      */
//     <div className="relative min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 overflow-x-hidden">
      
//       {/* NAVBAR */}
//       <LandingNavbar />

//       {/* ================= HERO SECTION ================= */}
//       {/* Increased padding-top (pt-32) and bg-white ensures visibility against light navbar */}
//       <section className="min-h-[90vh] relative flex flex-col items-center justify-center text-center px-6 bg-white overflow-hidden pt-32">
        
//         {/* Background Decorative Blurs - Refined opacity for light mode */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
//           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50/60 blur-[120px] rounded-full" />
//           <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-50/40 blur-[100px] rounded-full" />
//         </div>

//         <div className="relative z-10 max-w-5xl mx-auto">
//           {/* Main Heading: High-contrast Slate-900 */}
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//             className="text-6xl md:text-[5.5rem] font-black tracking-tight text-slate-900 leading-[1.05]"
//           >
//             Ace Your Interviews <br />
//             <span className="text-indigo-600">with Real-time AI</span>
//           </motion.h1>

//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
//             className="text-slate-500 max-w-2xl mx-auto mt-10 text-lg md:text-xl font-medium leading-relaxed"
//           >
//             Real-time AI interviews, instant feedback, voice analysis & personalized 
//             improvement plans designed to land you the job.
//           </motion.p>

//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
//             className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-14"
//           >
//             <button
//               onClick={handleStartExplore}
//               className="group flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-indigo-600 text-white font-black text-lg shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
//             >
//               Start Exploring
//               <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
//             </button>

//             <Link
//               to="/register"
//               className="flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-white border-2 border-slate-100 text-slate-700 font-black text-lg hover:bg-slate-50 transition-all shadow-sm"
//             >
//               <FiPlay className="text-indigo-600" />
//               Watch Demo
//             </Link>
//           </motion.div>
//         </div>
//       </section>

//       {/* ================= CONTENT MAIN ================= 
//           Wrapping sections in a solid bg-white main container to prevent "half-and-half" gaps 
//       */}
//       <main className="bg-white">
//         <section id="about" className="py-24">
//           <AboutUs />
//         </section>

//         <section id="features" className="py-24">
//           <Features />
//         </section>

//         <section className="py-24 bg-white">
//           <HowItWorks />
//         </section>

//         {/* Subtle section tint for visual separation without breaking Crystal Light theme */}
//         <section className="py-24 bg-slate-50/50">
//           <Testimonials />
//         </section>

//         <section id="pricing" className="py-24">
//           <Pricing />
//         </section>

//         <section className="py-24 bg-white">
//           <VideoDemo />
//         </section>

//         <section className="py-24">
//           <FAQ />
//         </section>
//       </main>

//       {/* ================= FOOTER ================= */}
//       <Footer />
//     </div>
//   );
// }


//dark mode
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LandingNavbar from "../components/LandingNavbar";
import { motion } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";

// landing sections
import AboutUs from "../components/landing/AboutUs";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Testimonials from "../components/landing/Testimonials";
import Pricing from "../components/landing/Pricing";
import VideoDemo from "../components/landing/VideoDemo";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";

export default function Landing() {
  const navigate = useNavigate();

  // Updated to ensure the body stays dark for the whole project
  useEffect(() => {
    document.body.style.backgroundColor = "var(--bg-primary)";
    document.body.className = "antialiased selection:bg-indigo-500/30";
    
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleStartExplore = () => {
    const token = localStorage.getItem("token");
    token ? navigate("/dashboard") : navigate("/login");
  };

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden transition-colors duration-500" 
         style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      
      {/* NAVBAR */}
      <LandingNavbar />

      {/* ================= HERO SECTION ================= */}
      <section className="min-h-[95vh] relative flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-32">
        
        {/* Background Decorative Blurs - Optimized for Dark UI */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[140px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Next-Gen AI Interview Prep
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[6.5rem] font-black tracking-tighter leading-[0.95] text-[var(--text-primary)]"
          >
            Ace Your Interviews <br />
            <span style={{ color: "var(--accent)" }}>with Real-time AI</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto mt-10 text-lg md:text-xl font-medium leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Simulate real pressure, receive instant feedback, and refine your voice analysis with the 
            AI-driven prep tool designed to land you at your dream company.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-14"
          >
            <button
              onClick={handleStartExplore}
              className="group flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-black text-lg transition-all active:scale-95 shadow-2xl shadow-indigo-500/20"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Get Started Now
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              to="/register"
              className="flex items-center gap-3 px-10 py-5 rounded-2xl border font-black text-lg transition-all shadow-lg"
              style={{ 
                backgroundColor: "var(--bg-card)", 
                borderColor: "var(--border-color)",
                color: "var(--text-primary)" 
              }}
            >
              <FiPlay style={{ color: "var(--accent)" }} />
              Watch Demo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTENT MAIN ================= */}
      <main>
        <div className="space-y-32 pb-32">
          <section id="about">
            <AboutUs />
          </section>

          <section id="features" className="relative">
             {/* Section glow */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/5 blur-[120px] -z-10" />
            <Features />
          </section>

          <section>
            <HowItWorks />
          </section>

          <section className="py-24 rounded-[4rem] border-y" 
                   style={{ backgroundColor: "rgba(15, 23, 42, 0.3)", borderColor: "var(--border-color)" }}>
            <Testimonials />
          </section>

          <section id="pricing">
            <Pricing />
          </section>

          <section>
            <VideoDemo />
          </section>

          <section>
            <FAQ />
          </section>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}