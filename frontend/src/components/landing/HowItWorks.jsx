// src/components/landing/HowItWorks.jsx
import { motion } from "framer-motion";
import React from "react";

const steps = [
  {
    step: "01",
    title: "Choose a Mock",
    desc: "Select an interview type based on your role and experience level."
  },
  {
    step: "02",
    title: "Answer Questions",
    desc: "Respond in real-time just like a real interview scenario."
  },
  {
    step: "03",
    title: "Get Instant AI Feedback",
    desc: "Receive detailed feedback on clarity, confidence, and accuracy."
  }
];

export default function HowItWorks() {
  return (
    <section className="max-w-5xl mx-auto text-center px-6">
      
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <span className="inline-block mb-3 px-4 py-1 rounded-full text-sm
          bg-white/10 text-purple-300 border border-white/10">
          Simple Process
        </span>

        <h3 className="text-4xl font-extrabold
          bg-gradient-to-r from-purple-400 to-blue-400
          bg-clip-text text-transparent">
          How It Works
        </h3>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          A smooth, guided flow that helps you prepare confidently and efficiently.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="
              p-6 rounded-2xl
              bg-white/5 border border-white/10
              backdrop-blur-md
              transition-all
            "
          >
            {/* Step Number */}
            <div className="text-4xl font-extrabold text-purple-400 mb-4">
              {item.step}
            </div>

            {/* Title */}
            <h4 className="text-lg font-semibold mb-2">
              {item.title}
            </h4>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
