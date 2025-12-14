import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { API } from "../api/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications
  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/notifications/me"); // create this API later
        setNotifications(res.data.notifications || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    })();
  }, []);

  const markAllAsRead = async () => {
    try {
      await API.post("/notifications/mark-all"); // create backend route later

      // Update UI instantly
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto p-8">

        {/* Title */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r 
               from-purple-400 to-blue-400 text-transparent bg-clip-text">
            Notifications
          </h1>

          <button
            onClick={markAllAsRead}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                hover:bg-white/20 transition"
          >
            Mark all as read
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            <IoNotificationsOutline size={50} className="mx-auto mb-4" />
            No notifications yet.
          </div>
        ) : (
          <div className="space-y-5">
            {notifications.map((n) => (
              <div
                key={n._id}
                className={`relative p-5 rounded-xl backdrop-blur-xl bg-white/10 
                border border-white/20 shadow-lg transition hover:scale-[1.01]`}
              >
                {/* Unread dot */}
                {!n.read && (
                  <span className="absolute top-3 right-3 w-3 h-3 
                      bg-purple-500 rounded-full shadow-lg animate-pulse"></span>
                )}

                <h3 className="text-lg font-semibold">
                  {n.title || "New Update"}
                </h3>

                <p className="text-gray-300 mt-1">
                  {n.message}
                </p>

                <p className="text-xs text-gray-500 mt-3">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* AI Recommendations */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">AI Recommendations</h2>

          <div className="space-y-4">

            <div className="p-5 rounded-xl backdrop-blur-xl bg-white/10 
                border border-purple-400/20 shadow-purple-500/20 shadow">
              <h3 className="font-semibold">Your interview accuracy improved!</h3>
              <p className="text-gray-300 text-sm mt-1">
                Try a new mock interview to continue progress.
              </p>
            </div>

            <div className="p-5 rounded-xl backdrop-blur-xl bg-white/10 
                border border-blue-400/20 shadow-blue-500/20 shadow">
              <h3 className="font-semibold">We found 5 new questions for you</h3>
              <p className="text-gray-300 text-sm mt-1">
                Based on your performance, here are relevant topics to practice.
              </p>
            </div>

            <div className="p-5 rounded-xl backdrop-blur-xl bg-white/10 
                border border-teal-400/20 shadow-teal-500/20 shadow">
              <h3 className="font-semibold">Daily Challenge Available</h3>
              <p className="text-gray-300 text-sm mt-1">
                Take a 5-question AI challenge to earn bonus credits.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
