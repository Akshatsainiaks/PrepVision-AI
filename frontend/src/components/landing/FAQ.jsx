// src/components/landing/FAQ.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const faqs = [
    {
      q: "How accurate is the AI?",
      a: "Our AI evaluates clarity, correctness, confidence, tone, structure, and communication effectiveness in real time.",
    },
    {
      q: "Can I practice HR questions?",
      a: "Yes. PrepVision AI supports technical, HR, behavioral, and communication interview rounds.",
    },
    {
      q: "Will you use a custom model?",
      a: "Yes. We are actively working on fine-tuned, interview-specific AI models for higher accuracy.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="max-w-4xl mx-auto px-6">
      
      {/* Header */}
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-1 mb-4 text-sm rounded-full bg-white/10 text-purple-300 border border-white/10">
          FAQs
        </span>

        <h2
          className="text-4xl font-extrabold
          bg-gradient-to-r from-purple-400 to-blue-400
          bg-clip-text text-transparent"
        >
          Frequently Asked Questions
        </h2>

        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Everything you need to know about PrepVision AI and how it helps you
          prepare better for interviews.
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <motion.div
            key={i}
            layout
            className="
              rounded-2xl
              bg-white/5 border border-white/10
              backdrop-blur-md
              overflow-hidden
            "
          >
            {/* Question */}
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="
                w-full px-6 py-5
                flex justify-between items-center
                text-left
                hover:bg-white/5 transition
              "
            >
              <span className="text-lg font-medium text-gray-200">
                {f.q}
              </span>

              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                className="text-2xl text-gray-400"
              >
                +
              </motion.span>
            </button>

            {/* Answer */}
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="px-6 pb-6 text-gray-300 text-sm leading-relaxed">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
