// src/components/landing/VideoDemo.jsx
import React from "react";

export default function VideoDemo() {
  return (
    <section className="max-w-6xl mx-auto px-6 text-center">
      
      {/* Badge */}
      <span
        className="inline-block mb-4 px-4 py-1 rounded-full text-sm
        bg-white/10 text-purple-300 border border-white/10"
      >
        Product Demo
      </span>

      {/* Heading */}
      <h3
        className="text-4xl font-extrabold mb-4
        bg-gradient-to-r from-purple-400 to-blue-400
        bg-clip-text text-transparent"
      >
        See PrepVision AI in Action
      </h3>

      {/* Subtitle */}
      <p className="text-gray-400 max-w-2xl mx-auto mb-10">
        Experience how AI-powered mock interviews, real-time feedback,
        and voice analysis help you crack interviews with confidence.
      </p>

      {/* Video Container */}
      <div
        className="
          relative max-w-4xl mx-auto
          rounded-3xl overflow-hidden
          bg-black/60 border border-white/10
          shadow-2xl
        "
      >
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="PrepVision AI Demo"
          allowFullScreen
        />
      </div>

      {/* CTA */}
      <div className="mt-10">
        <p className="text-gray-400 mb-4">
          Ready to try it yourself?
        </p>

        <button
          className="
            px-8 py-3 rounded-xl
            bg-gradient-to-r from-purple-600 to-blue-600
            font-semibold
            hover:scale-105 transition
          "
        >
          Start Free Mock Interview
        </button>
      </div>

    </section>
  );
}
