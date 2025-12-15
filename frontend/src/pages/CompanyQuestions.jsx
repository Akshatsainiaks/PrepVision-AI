import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { API } from "../api/api";
import Navbar from "../components/Navbar";
import React from "react";

export default function CompanyQuestions() {
  const { company, type } = useParams();
  const navigate = useNavigate();

  const { data: types = [] } = useQuery({
    queryKey: ["company-types", company],
    queryFn: async () => {
      const res = await API.get(`/questions/company/${company}/types`);
      return res.data.types;
    },
  });

  const { data: questions = [], isLoading } = useQuery({
    queryKey: ["company-questions", company, type],
    enabled: !!type,
    queryFn: async () => {
      const res = await API.get(
        `/questions?company=${company}&type=${type}`
      );
      return res.data.questions;
    },
  });

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10 text-white">
        <h2 className="text-4xl font-bold text-purple-400">📁 {company}</h2>

        {!type && (
          <p className="text-gray-400 mt-2">Open a category folder</p>
        )}

        <div className="mt-6 flex gap-3">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => navigate(`/company/${company}/${t}`)}
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20"
            >
              📂 {t}
            </button>
          ))}
        </div>

        {type && (
          <>
            <div className="mt-6 text-xl text-blue-400">
              📂 {company} / {type}
            </div>

            <button
              onClick={() => navigate(`/company/${company}`)}
              className="mt-3 px-4 py-2 bg-red-600/30 border border-red-500 rounded-lg"
            >
              ⬅ Back
            </button>

            <div className="mt-8 space-y-5">
              {isLoading && <p>Loading...</p>}

              {questions.map((q) => (
                <div
                  key={q._id}
                  className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg"
                >
                  <div className="flex justify-between">
                    <span className="text-purple-300">{q.role}</span>
                    <span className="text-sm text-gray-400">
                      {q.difficulty}
                    </span>
                  </div>
                  <p className="mt-3 text-gray-200">{q.question}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
