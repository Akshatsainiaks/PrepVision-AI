import React from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Badge */}
        <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-medium
          bg-white/10 text-purple-300 border border-white/10">
          Who we are
        </span>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold
          bg-gradient-to-r from-purple-400 to-blue-400
          bg-clip-text text-transparent">
          About PrepVision AI
        </h2>

        {/* Description */}
        <p className="text-gray-300 mt-6 text-lg leading-relaxed">
          PrepVision AI helps learners prepare for real interviews using
          <span className="text-white font-medium"> AI-powered mock sessions</span>,
          instant scoring, voice analysis, and personalized improvement roadmaps.
          <br />
          <br />
          Our mission is to make interview preparation
          <span className="text-white font-medium"> smarter, accessible, </span>
          and tailored for every learner — from students to professionals.
        </p>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {[
            { title: "AI Driven", desc: "Smart evaluations & insights" },
            { title: "Real Practice", desc: "Interview-like experience" },
            { title: "Personalized", desc: "Custom improvement roadmap" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
