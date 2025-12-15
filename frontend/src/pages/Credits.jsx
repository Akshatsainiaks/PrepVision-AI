import { useQuery } from "@tanstack/react-query";
import { API } from "../api/api";
import Navbar from "../components/Navbar";
import React from "react";

export default function Credits() {
  const { data, isLoading } = useQuery({
    queryKey: ["credit-history"],
    queryFn: async () => {
      const res = await API.get("/credits/history");
      return res.data.history;
    }
  });

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10 text-white">

        <h2 className="text-4xl font-extrabold text-purple-400">
          💰 Credit History
        </h2>

        <p className="mt-2 text-gray-400">
          Track how you earn and spend credits
        </p>

        {/* TABLE */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border border-white/10 rounded-xl overflow-hidden">
            <thead className="bg-white/10 text-gray-300">
              <tr>
                <th className="p-4 text-left">Action</th>
                <th className="p-4 text-left">Credits</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan="3" className="p-6 text-gray-400">
                    Loading history...
                  </td>
                </tr>
              )}

              {data?.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-6 text-gray-400">
                    No credit activity yet
                  </td>
                </tr>
              )}

              {data?.map((log) => (
                <tr
                  key={log._id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="p-4 capitalize">
                    {log.source.replace("_", " ")}
                  </td>

                  <td
                    className={`p-4 font-semibold ${
                      log.value > 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {log.value > 0 ? `+${log.value}` : log.value}
                  </td>

                  <td className="p-4 text-gray-400">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
