// src/components/landing/Testimonials.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Asha R.",
    role: "Frontend Engineer",
    quote: "The AI feedback improved my answers in just two weeks. It felt like having a personal mentor."
  },
  {
    name: "Rajat K.",
    role: "SDE Intern",
    quote: "Mock interviews feel incredibly real. The roadmap helped me focus on exactly what to improve."
  },
  {
    name: "Priya S.",
    role: "Product Manager",
    quote: "Voice practice boosted my confidence a lot. I now speak more clearly in interviews."
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section className="max-w-4xl mx-auto px-6">
      
      {/* Heading */}
      <div className="text-center mb-10">
        <span className="inline-block mb-3 px-4 py-1 rounded-full text-sm
          bg-white/10 text-purple-300 border border-white/10">
          Testimonials
        </span>

        <h3 className="text-4xl font-extrabold
          bg-gradient-to-r from-purple-400 to-blue-400
          bg-clip-text text-transparent">
          What Learners Say
        </h3>

        <p className="text-gray-400 mt-3">
          Trusted by students and professionals preparing for real interviews
        </p>
      </div>

      {/* Card */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="
              p-8 rounded-2xl
              bg-white/5 border border-white/10
              backdrop-blur-md
              shadow-lg
            "
          >
            <div className="flex items-start gap-5">
              
              {/* Avatar */}
              <div className="
                w-14 h-14 rounded-full
                bg-gradient-to-r from-purple-500 to-blue-600
                flex items-center justify-center
                text-white font-bold text-lg
                shrink-0
              ">
                {current.name.split(" ").map(n => n[0]).join("")}
              </div>

              {/* Content */}
              <div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  “{current.quote}”
                </p>

                <div className="mt-4 font-semibold">
                  {current.name}
                  <span className="text-gray-400 text-sm">
                    {" "}• {current.role}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition
                ${i === index ? "bg-white" : "bg-white/30 hover:bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
