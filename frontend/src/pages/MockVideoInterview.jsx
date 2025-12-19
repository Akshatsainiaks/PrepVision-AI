import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function MockVideoInterview() {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [micAllowed, setMicAllowed] = useState(false);
  const [error, setError] = useState("");

  /* --------------------------------
     REQUEST CAMERA + MIC
  -------------------------------- */
  useEffect(() => {
    async function requestMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        videoRef.current.srcObject = stream;
        setCameraAllowed(true);
        setMicAllowed(true);
      } catch (err) {
        setError("Camera & Microphone permission is required to continue.");
      }
    }

    requestMedia();
  }, []);

  const startInterview = () => {
    navigate("/mock/video/session");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-28 px-6 text-white
        bg-gradient-to-b from-black via-gray-900 to-black">

        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-extrabold
              bg-gradient-to-r from-purple-400 to-blue-400
              text-transparent bg-clip-text">
              Video Interview Setup
            </h1>

            <p className="text-gray-400 mt-2">
              Camera & microphone are mandatory for this interview
            </p>
          </motion.div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* VIDEO PREVIEW */}
            <div className="p-4 rounded-2xl bg-black/40
              border border-white/20 shadow-xl">

              <video
                ref={videoRef}
                autoPlay
                muted
                className="rounded-xl w-full h-72 object-cover bg-black"
              />

              <div className="mt-3 flex justify-between text-sm text-gray-300">
                <span>
                  🎥 Camera:{" "}
                  <span className={cameraAllowed ? "text-green-400" : "text-red-400"}>
                    {cameraAllowed ? "Active" : "Blocked"}
                  </span>
                </span>

                <span>
                  🎙 Microphone:{" "}
                  <span className={micAllowed ? "text-green-400" : "text-red-400"}>
                    {micAllowed ? "Active" : "Blocked"}
                  </span>
                </span>
              </div>
            </div>

            {/* INFO PANEL */}
            <div className="p-6 rounded-2xl bg-white/10
              border border-white/20 shadow-xl">

              <h2 className="text-xl font-semibold text-purple-300 mb-4">
                AI Will Evaluate
              </h2>

              <ul className="space-y-3 text-gray-300 text-sm">
                <li>👀 Eye contact & focus</li>
                <li>🤲 Hand gestures (future)</li>
                <li>🗣 Voice clarity</li>
                <li>⏱ Response confidence</li>
                <li>😐 Facial expressions</li>
              </ul>

              {error && (
                <div className="mt-4 p-3 rounded-lg bg-red-600/20
                  text-red-300 border border-red-500">
                  {error}
                </div>
              )}

              <button
                disabled={!cameraAllowed || !micAllowed}
                onClick={startInterview}
                className="mt-6 w-full py-3 rounded-lg
                bg-gradient-to-r from-purple-600 to-blue-600
                font-semibold hover:opacity-90 transition
                disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Start Video Interview
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
