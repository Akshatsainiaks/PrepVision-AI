// src/components/landing/Features.jsx
import React from "react";
import { FiMic, FiMessageCircle, FiCpu, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section
      id="features"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block mb-3 px-4 py-1 rounded-full text-sm
            bg-white/10 text-purple-300 border border-white/10">
            Core Features
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold
            bg-gradient-to-r from-purple-400 to-blue-400
            bg-clip-text text-transparent">
            Everything you need to crack interviews
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Practice smarter with AI-driven interviews, feedback,
            communication analysis, and a personalized learning roadmap.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FiCpu />}
            title="AI Mock Interviews"
            desc="Simulate real interview rounds with AI-driven questions."
            color="bg-purple-500/10"
          />

          <FeatureCard
            icon={<FiMessageCircle />}
            title="AI Feedback"
            desc="Get instant insights on clarity, accuracy, and confidence."
            color="bg-blue-500/10"
          />

          <FeatureCard
            icon={<FiCheckCircle />}
            title="Progress Tracking"
            desc="Track improvement over time with detailed analytics."
            color="bg-teal-500/10"
          />

          <FeatureCard
            icon={<FiMic />}
            title="Voice Practice"
            desc="Improve speaking skills, tone, and communication."
            color="bg-yellow-500/10"
          />

          <FeatureCard
            icon={<FiMessageCircle />}
            title="Community Chat"
            desc="Learn and grow together with peer discussions."
            color="bg-pink-400/10"
          />

          <FeatureCard
            icon={<FiCpu />}
            title="Learning Roadmap"
            desc="Follow a personalized path tailored to your goals."
            color="bg-green-400/10"
          />
        </div>
      </div>
    </section>
  );
}
