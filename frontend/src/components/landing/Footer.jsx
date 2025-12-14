// src/components/landing/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gray-950 pt-16 pb-10 text-gray-300">
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12">

        {/* Logo */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src="/new.png"
              alt="PrepVision AI"
              className="w-12 h-12 object-contain"
            />
            <h2 className="text-2xl font-bold text-white">
              PrepVision AI
            </h2>
          </div>

          <p className="mt-4 text-sm text-gray-400 max-w-sm">
            AI-powered interview preparation platform helping learners
            practice smarter and perform better.
          </p>
        </div>

        {/* Features */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Features</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {[
              "Mock Interviews",
              "AI Feedback",
              "Practice Questions",
              "Voice Practice",
              "Learning Roadmap",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-white transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {["About Us", "Pricing", "Careers", "Contact"].map((item) => (
              <li
                key={item}
                className="hover:text-white transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Policies</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {["Terms", "Privacy", "Cookies"].map((item) => (
              <li
                key={item}
                className="hover:text-white transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-16">
        © {new Date().getFullYear()} PrepVision AI — All rights reserved.
      </div>

    </footer>
  );
}
