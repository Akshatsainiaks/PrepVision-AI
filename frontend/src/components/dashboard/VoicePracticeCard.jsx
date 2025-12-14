import React, { useState } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";

export default function VoicePracticeCard() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  let mediaRecorder;
  let audioChunks = [];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      audioChunks = [];
      mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });

        // Convert audio to text (offline for now)
        const reader = new FileReader();
        reader.onload = () => {
          setTranscript("🎤 Voice captured! (Implement AI speech analysis next)");
        };
        reader.readAsArrayBuffer(audioBlob);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Mic error:", err);
      alert("Microphone access is required for voice practice.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    setRecording(false);
  };

  return (
    <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-purple-600/20 rounded-full">
          <FaMicrophone className="text-purple-300 text-xl" />
        </div>

        <div>
          <h3 className="text-lg font-semibold">Voice Practice</h3>
          <p className="text-gray-400 text-sm">
            Practice speaking answers with your voice.
          </p>
        </div>
      </div>

      <div className="mt-4">
        {!recording ? (
          <button
            onClick={startRecording}
            className="w-full py-2 rounded-lg bg-gradient-to-r 
              from-purple-600 to-blue-600 font-semibold shadow-lg 
              hover:scale-105 transition flex items-center justify-center gap-2"
          >
            <FaMicrophone /> Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="w-full py-2 rounded-lg bg-gradient-to-r 
              from-red-600 to-pink-600 font-semibold shadow-lg 
              hover:scale-105 transition flex items-center justify-center gap-2"
          >
            <FaStop /> Stop Recording
          </button>
        )}
      </div>

      {transcript && (
        <div className="mt-3 p-3 bg-black/20 rounded-lg border border-white/10 text-gray-300 text-sm">
          {transcript}
        </div>
      )}
    </div>
  );
}
