import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { API } from "../api/api";
import Navbar from "../components/Navbar";
import React from "react";

export default function CompanyQuestions() {
  const { company, type } = useParams();
  const navigate = useNavigate();

  /* --------------------------------
     FETCH FOLDERS (TYPE + COUNT)
  --------------------------------- */
  const {
    data: folders = [],
    isLoading: loadingFolders
  } = useQuery({
    queryKey: ["company-folders", company],
    queryFn: async () => {
      const res = await API.get(
        `/questions/company/${company}/types-with-count`
      );
      return res.data.folders;
    }
  });

  /* --------------------------------
     FETCH QUESTIONS (ONLY IF TYPE)
  --------------------------------- */
  const {
    data: questions = [],
    isLoading: loadingQuestions
  } = useQuery({
    queryKey: ["company-questions", company, type],
    enabled: !!type,
    queryFn: async () => {
      const res = await API.get(
        `/questions?company=${company}&type=${type}`
      );
      return res.data.questions;
    }
  });

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10 text-white">

        {/* COMPANY HEADER */}
        <h2 className="text-4xl font-extrabold text-purple-400 flex items-center gap-3">
          📁 {company}
        </h2>

        {/* =================================================
            FOLDER VIEW (ROOT LEVEL)
        ================================================== */}
        {!type && (
          <>
            <p className="text-gray-400 mt-2">
              Open a category folder to view questions
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {loadingFolders && (
                <p className="text-gray-400">Loading folders...</p>
              )}

              {!loadingFolders && folders.length === 0 && (
                <p className="text-gray-400">
                  No question folders yet
                </p>
              )}

              {folders.map((f) => (
                <div
                  key={f.type}
                  onClick={() =>
                    navigate(`/company/${company}/${f.type}`)
                  }
                  className="cursor-pointer p-6 rounded-2xl
                  bg-white/10 border border-white/20
                  hover:bg-white/20 hover:scale-[1.03]
                  transition shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">📂</span>
                    <div>
                      <h3 className="text-xl font-semibold text-purple-300">
                        {f.type}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {f.count} questions
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* =================================================
            OPENED FOLDER VIEW
        ================================================== */}
        {type && (
          <>
            {/* Breadcrumb */}
            <div className="mt-4 flex items-center gap-2 text-gray-400">
              <span
                onClick={() => navigate(`/company/${company}`)}
                className="cursor-pointer hover:text-purple-400"
              >
                {company}
              </span>
              <span>/</span>
              <span className="text-purple-400 font-semibold">
                {type}
              </span>
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate(`/company/${company}`)}
              className="mt-4 px-4 py-2 rounded-lg
              bg-red-600/30 border border-red-500
              text-red-300 hover:bg-red-600/40 transition"
            >
              ⬅ Back to folders
            </button>

            {/* QUESTIONS LIST */}
            <div className="mt-8 space-y-6">
              {loadingQuestions && (
                <p className="text-gray-400">Loading questions...</p>
              )}

              {!loadingQuestions && questions.length === 0 && (
                <p className="text-gray-400">
                  No questions found in this folder
                </p>
              )}

              {questions.map((q) => (
                <div
                  key={q._id}
                  className="p-6 rounded-2xl bg-white/10
                  border border-white/10 shadow-lg"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300 font-semibold">
                      {q.role}
                    </span>
                    <span className="text-sm text-gray-400">
                      {q.difficulty}
                    </span>
                  </div>

                  <p className="mt-3 text-gray-200 text-lg">
                    {q.question}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
