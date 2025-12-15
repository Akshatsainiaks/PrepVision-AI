import { useState } from "react";
import Navbar from "../components/Navbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../api/api";
import React from "react";

export default function AddQuestion() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    company: "",
    role: "",
    type: "", // 🔥 FREE TEXT (NOT LIMITED)
    question: "",
    difficulty: "Medium",
    tags: "",
  });

  const [message, setMessage] = useState("");

  // 🟢 Add Question Mutation
  const addQuestionMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await API.post("/questions", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["questions"]);
      setMessage("🎉 Question added successfully!");
      setForm({
        company: "",
        role: "",
        type: "",
        question: "",
        difficulty: "Medium",
        tags: "",
      });
    },
    onError: (err) => {
      setMessage(err.response?.data?.message || "❌ Error adding question");
    },
  });

  const handleSubmit = () => {
    if (!form.company || !form.role || !form.type || !form.question) {
      setMessage("⚠️ Company, Role, Type, and Question are required.");
      return;
    }

    const payload = {
      ...form,
      type: form.type.trim(), // 🔥 normalize
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    };

    addQuestionMutation.mutate(payload);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto px-6 py-10 text-white">
        {/* PAGE TITLE */}
        <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
          Add Interview Question
        </h2>

        {/* FORM CARD */}
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-[0_0_25px_rgba(120,64,255,0.3)]">

          {/* Company */}
          <label className="text-gray-300 text-sm">Company</label>
          <input
            type="text"
            placeholder="Google, Amazon, Meta..."
            className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
                       text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 
                       outline-none transition mb-5"
            value={form.company}
            onChange={(e) =>
              setForm({ ...form, company: e.target.value })
            }
          />

          {/* Role */}
          <label className="text-gray-300 text-sm">Role</label>
          <input
            type="text"
            placeholder="SDE, Data Analyst, Backend Engineer..."
            className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
                       text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 
                       outline-none transition mb-5"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          />

          {/* 🔥 Question Type (UNLIMITED) */}
          <label className="text-gray-300 text-sm">Question Type</label>
          <input
            list="question-type-options"
            placeholder="DSA, DBMS, HR, System Design..."
            className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
                       text-white focus:ring-2 focus:ring-cyan-500 outline-none transition mb-5"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          />

          {/* Suggestions only (NOT LIMITS) */}
          <datalist id="question-type-options">
            <option value="DSA" />
            <option value="DBMS" />
            <option value="Coding" />
            <option value="HR" />
            <option value="System Design" />
            <option value="OS" />
            <option value="CN" />
          </datalist>

          {/* Question */}
          <label className="text-gray-300 text-sm">Interview Question</label>
          <textarea
            placeholder="Write the interview question..."
            className="w-full mt-1 p-3 rounded-lg h-32 bg-gray-900/40 border border-gray-700 
                       text-white placeholder-gray-500 focus:ring-2 focus:ring-teal-500 
                       outline-none transition mb-5"
            value={form.question}
            onChange={(e) =>
              setForm({ ...form, question: e.target.value })
            }
          />

          {/* Difficulty */}
          <label className="text-gray-300 text-sm">Difficulty</label>
          <select
            className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
                       text-white focus:ring-2 focus:ring-indigo-500 outline-none transition mb-5"
            value={form.difficulty}
            onChange={(e) =>
              setForm({ ...form, difficulty: e.target.value })
            }
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          {/* Tags */}
          <label className="text-gray-300 text-sm">Tags</label>
          <input
            type="text"
            placeholder="React, Node.js, DS Algo (comma-separated)"
            className="w-full mt-1 p-3 rounded-lg bg-gray-900/40 border border-gray-700 
                       text-white placeholder-gray-500 focus:ring-2 focus:ring-pink-500 
                       outline-none transition mb-3"
            value={form.tags}
            onChange={(e) =>
              setForm({ ...form, tags: e.target.value })
            }
          />

          {/* TAG PREVIEW */}
          {form.tags && (
            <div className="flex flex-wrap gap-2 mb-5">
              {form.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
                .map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs rounded-full bg-purple-600/30 
                               text-purple-300 border border-purple-500"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={addQuestionMutation.isLoading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 
                       text-white font-semibold shadow-lg hover:shadow-purple-500/40 
                       transition disabled:opacity-50"
          >
            {addQuestionMutation.isLoading ? "Adding..." : "Submit Question"}
          </button>

          {/* Message */}
          {message && (
            <p className="mt-4 text-center font-semibold text-purple-300">
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
