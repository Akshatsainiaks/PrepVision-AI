// src/components/landing/FeatureCard.jsx
import { motion } from "framer-motion";
import React from "react";

export default function FeatureCard({ icon, title, desc, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="
        p-6 rounded-2xl
        bg-white/5 border border-white/10
        backdrop-blur-md
        transition-all duration-300
      "
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}
      >
        <span className="text-xl text-white">{icon}</span>
      </div>

      {/* Title */}
      <h4 className="text-lg font-semibold mb-2">{title}</h4>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
