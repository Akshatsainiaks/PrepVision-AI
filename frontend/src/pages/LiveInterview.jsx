import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
// import { API } from "../api/api";
import API from "../api/api";

export default function LiveInterview() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const recognitionRef = useRef(null);

  const [session, setSession] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);

  const questions = [
    "Tell me about yourself.",
    "What is your strongest technical skill?",
    "Explain a challenging project you worked on."
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [listening, setListening] = useState(false);
  const [answerText, setAnswerText] = useState("");

  /* -------------------------------
     FETCH SESSION
  -------------------------------- */
  useEffect(() => {
    if (!sessionId) return navigate("/mock");

    API.get(`/live-interview/session/${sessionId}`)
      .then((res) => setSession(res.data))
      .catch(() => navigate("/mock"));
  }, [sessionId, navigate]);

  /* -------------------------------
     START CAMERA
  -------------------------------- */
  useEffect(() => {
    if (!session) return;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMediaStream(stream);
        videoRef.current.srcObject = stream;
      })
      .catch(() => alert("Camera & microphone permission required"));

    return () => {
      mediaStream?.getTracks().forEach((t) => t.stop());
    };
  }, [session]);

  /* -------------------------------
     AI SPEAK QUESTION
  -------------------------------- */
  useEffect(() => {
    if (!session) return;

    const utterance = new SpeechSynthesisUtterance(
      questions[currentQuestion]
    );
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);

    setAnswerText("");
  }, [currentQuestion, session]);

  /* -------------------------------
     START SPEECH RECOGNITION
  -------------------------------- */
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setAnswerText(transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  /* -------------------------------
     STOP SPEECH RECOGNITION
  -------------------------------- */
  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  /* -------------------------------
     NEXT QUESTION
  -------------------------------- */
  const nextQuestion = () => {
    stopListening();

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((q) => q + 1);
    } else {
      alert("Live Interview Completed (Voice answers captured)");
      navigate("/mock");
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading Live Interview...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-28 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-2xl font-bold mb-2">
            Live AI Interview
          </h2>

          <p className="text-gray-400 mb-6">
            Topic: {session.topic} • Role: {session.role}
          </p>

          {/* CAMERA */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full rounded-xl border border-gray-700"
          />

          {/* QUESTION */}
          <div className="mt-6 p-6 rounded-xl bg-white/10 border border-white/20">
            <p className="text-sm text-gray-400 mb-2">AI Question</p>
            <h3 className="text-xl font-semibold">
              {questions[currentQuestion]}
            </h3>
          </div>

          {/* ANSWER BOX */}
          <div className="mt-4 p-4 rounded-xl bg-gray-900 border border-gray-700 text-left">
            <p className="text-sm text-gray-400 mb-1">Your Answer (Live)</p>
            <p className="text-white min-h-[60px]">
              {answerText || "Start speaking..."}
            </p>
          </div>

          {/* CONTROLS */}
          <div className="mt-6 flex gap-4 justify-center">
            {!listening ? (
              <button
                onClick={startListening}
                className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-500"
              >
                🎤 Start Answer
              </button>
            ) : (
              <button
                onClick={stopListening}
                className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-500"
              >
                ⛔ Stop Answer
              </button>
            )}

            <button
              onClick={nextQuestion}
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
            >
              Next Question →
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
