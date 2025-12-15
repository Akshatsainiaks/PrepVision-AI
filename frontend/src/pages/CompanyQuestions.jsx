import { useParams, useNavigate } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { API } from "../api/api";
import Navbar from "../components/Navbar";
import React, { useState, useRef, useEffect } from "react";

export default function CompanyQuestions() {
  const { company, type } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const loaderRef = useRef(null);

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
     FETCH QUESTIONS (INFINITE SCROLL)
  --------------------------------- */
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ["company-questions", company, type, search, sort],
    enabled: !!type,
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams();
      params.append("company", company);
      params.append("type", type);
      params.append("page", pageParam);
      params.append("limit", 6);
      params.append("sort", sort);
      if (search) params.append("search", search);

      const res = await API.get(`/questions?${params.toString()}`);
      return res.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined
  });

  const questions =
    data?.pages.flatMap((p) => p.questions) || [];

  /* --------------------------------
     AUTO LOAD ON SCROLL
  --------------------------------- */
  useEffect(() => {
    if (!loaderRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10 text-white">

        {/* COMPANY HEADER */}
        <h2 className="text-4xl font-extrabold text-purple-400">
          📁 {company}
        </h2>

        {/* =================================================
            ROOT FOLDER VIEW
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
                  <h3 className="text-xl font-semibold text-purple-300">
                    📂 {f.type}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {f.count} questions
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* =================================================
            FOLDER OPEN VIEW
        ================================================== */}
        {type && (
          <>
            {/* Breadcrumb */}
            <div className="mt-4 text-gray-400">
              <span
                onClick={() => navigate(`/company/${company}`)}
                className="cursor-pointer hover:text-purple-400"
              >
                {company}
              </span>{" "}
              / <span className="text-purple-400">{type}</span>
            </div>

            {/* Search + Sort */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search in this folder..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 p-3 rounded-lg bg-gray-900/40
                border border-gray-700 focus:ring-2
                focus:ring-purple-500 outline-none"
              />

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="p-3 rounded-lg bg-gray-900/40
                border border-gray-700 text-white
                focus:ring-2 focus:ring-purple-500"
              >
                <option value="newest">Newest</option>
                <option value="upvotes">Most Upvoted</option>
                <option value="difficulty">Difficulty</option>
              </select>
            </div>

            {/* QUESTIONS */}
            <div className="mt-8 space-y-6">
              {questions.map((q) => (
                <div
                  key={q._id}
                  onClick={() => navigate(`/question/${q._id}`)}
                  className="cursor-pointer p-6 rounded-2xl
                  bg-white/10 border border-white/10
                  hover:bg-white/20 transition shadow-lg"
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

              {/* Loader */}
              {hasNextPage && (
                <div
                  ref={loaderRef}
                  className="text-center text-gray-400 py-6"
                >
                  Loading more...
                </div>
              )}

              {!hasNextPage && !isLoading && (
                <p className="text-center text-gray-500">
                  🎉 No more questions
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
