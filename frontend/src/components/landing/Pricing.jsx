// src/components/landing/Pricing.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-6xl w-full">

        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block mb-3 px-4 py-1 rounded-full text-sm
            bg-white/10 text-purple-300 border border-white/10">
            Pricing
          </span>

          <h3
            className="text-4xl font-extrabold
            bg-gradient-to-r from-purple-400 to-blue-400
            bg-clip-text text-transparent"
          >
            Choose the plan that fits you
          </h3>

          <p className="text-gray-400 mt-3">
            Start free, upgrade when you’re ready
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* FREE */}
          <motion.div
            whileHover={{ y: -8 }}
            className="
              p-8 rounded-2xl
              bg-white/5 border border-white/10
              backdrop-blur-md
              flex flex-col
            "
          >
            <h4 className="text-xl font-semibold mb-1">Free</h4>
            <p className="text-gray-400 text-sm mb-4">Get started</p>

            <div className="text-4xl font-extrabold mb-6">₹0</div>

            <ul className="space-y-3 text-gray-300 text-sm flex-1">
              <li className="flex items-center gap-2">
                <FiCheck className="text-green-400" /> 10 practice questions / month
              </li>
              <li className="flex items-center gap-2">
                <FiCheck className="text-green-400" /> Basic AI feedback
              </li>
              <li className="flex items-center gap-2">
                <FiCheck className="text-green-400" /> Community access
              </li>
            </ul>

            <button
              className="mt-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-medium"
            >
              Get Started
            </button>
          </motion.div>

          {/* PRO (HIGHLIGHTED) */}
          <motion.div
            whileHover={{ y: -10 }}
            className="
              relative p-8 rounded-2xl
              bg-gradient-to-r from-purple-600 to-blue-600
              text-white
              shadow-2xl
              flex flex-col
            "
          >
            {/* Badge */}
            <span
              className="
                absolute -top-4 left-1/2 -translate-x-1/2
                px-4 py-1 text-xs font-semibold rounded-full
                bg-black/30 backdrop-blur border border-white/20
              "
            >
              Most Popular
            </span>

            <h4 className="text-xl font-semibold mb-1">Pro</h4>
            <p className="text-white/80 text-sm mb-4">
              For serious interview prep
            </p>

            <div className="text-4xl font-extrabold mb-6">
              ₹499 <span className="text-sm font-medium">/ month</span>
            </div>

            <ul className="space-y-3 text-sm text-white/90 flex-1">
              <li className="flex items-center gap-2">
                <FiCheck /> Unlimited practice
              </li>
              <li className="flex items-center gap-2">
                <FiCheck /> Premium AI evaluations
              </li>
              <li className="flex items-center gap-2">
                <FiCheck /> Full learning roadmap
              </li>
              <li className="flex items-center gap-2">
                <FiCheck /> Voice & confidence analysis
              </li>
            </ul>

            <button
              className="
                mt-6 py-3 rounded-xl
                bg-white text-gray-900 font-semibold
                hover:bg-gray-100 transition
              "
            >
              Start Pro
            </button>
          </motion.div>

          {/* PREMIUM */}
          <motion.div
            whileHover={{ y: -8 }}
            className="
              p-8 rounded-2xl
              bg-white/5 border border-white/10
              backdrop-blur-md
              flex flex-col
            "
          >
            <h4 className="text-xl font-semibold mb-1">Premium</h4>
            <p className="text-gray-400 text-sm mb-4">
              For teams & organizations
            </p>

            <div className="text-4xl font-extrabold mb-6">Custom</div>

            <ul className="space-y-3 text-gray-300 text-sm flex-1">
              <li className="flex items-center gap-2">
                <FiCheck className="text-green-400" /> Team access
              </li>
              <li className="flex items-center gap-2">
                <FiCheck className="text-green-400" /> Custom evaluations
              </li>
              <li className="flex items-center gap-2">
                <FiCheck className="text-green-400" /> Analytics & reports
              </li>
              <li className="flex items-center gap-2">
                <FiCheck className="text-green-400" /> Dedicated support
              </li>
            </ul>

            <button
              className="mt-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-medium"
            >
              Contact Sales
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
