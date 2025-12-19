import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { API } from "../api/api";
import React from "react";

export default function CreditHistory() {
  const [logs, setLogs] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/credits/me");
        setLogs(res.data.logs);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  if (!logs) {
    return (
      <>
        <Navbar />
        <div className="p-8 text-white">Loading credit history...</div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-4xl font-extrabold mb-10 text-purple-400">
          Credit History
        </h2>

        {logs.length === 0 ? (
          <div className="text-gray-400 bg-white/5 p-6 rounded-xl text-center">
            No credit activity found
          </div>
        ) : (
          <div className="space-y-5">
            {logs.map((log) => (
              <div
                key={log._id}
                className="flex justify-between items-center 
                backdrop-blur-xl bg-white/10 border border-white/20 
                p-6 rounded-2xl"
              >
                <div>
                  <p className="font-semibold capitalize">
                    {log.source.replace("_", " ")}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(log.createdAt).toLocaleString()}
                  </p>

                  {log.meta?.questionId && (
                    <p className="text-xs text-gray-500 mt-1">
                      Question ID: {log.meta.questionId}
                    </p>
                  )}
                </div>

                <div
                  className={`text-lg font-bold ${
                    log.value > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {log.value > 0 ? "+" : ""}
                  {log.value} credits
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
