// import { createContext, useContext, useState, useEffect, useRef } from "react";
// import API from "../api/api";
// import React from "react";
// const NotificationContext = createContext(null);

// let isInitialized = false;
// let globalInterval = null;

// export function NotificationProvider({ children }) {
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [toasts, setToasts] = useState([]);
//   const prevCountRef = useRef(null);

//   const removeToast = (toastId) => {
//     setToasts((prev) => prev.filter((t) => t.toastId !== toastId));
//   };

//   const addToast = (notification) => {
//     const id = notification._id + "_" + Date.now();
//     setToasts((prev) => {
//       if (prev.some((t) => t._id === notification._id)) return prev;
//       return [...prev, { ...notification, toastId: id }];
//     });
//     setTimeout(() => {
//       setToasts((prev) => prev.filter((t) => t.toastId !== id));
//     }, 5000);
//   };

//   const fetchNotifications = async () => {
//     // ✅ Stop polling if no token — user logged out or session expired
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await API.get("/notifications");
//       const data = res?.data;
//       if (!data) return;

//       const newCount = data.unreadCount ?? 0;
//       const newList = data.notifications ?? [];

//       if (prevCountRef.current !== null && newCount > prevCountRef.current) {
//         const newest = newList[0];
//         if (newest) addToast(newest);
//       }

//       prevCountRef.current = newCount;
//       setUnreadCount(newCount);
//       setNotifications(newList);
//     } catch (err) {
//       // ✅ If 401, stop polling — api.js interceptor will handle redirect
//       if (err.response?.status === 401) {
//         clearInterval(globalInterval);
//         globalInterval = null;
//         isInitialized = false;
//       }
//       // Silently fail for other errors
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isInitialized) {
//       fetchNotifications();
//       return;
//     }

//     isInitialized = true;
//     fetchNotifications();
//     globalInterval = setInterval(fetchNotifications, 30_000);

//     return () => {
//       clearInterval(globalInterval);
//       globalInterval = null;
//     };
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   const markAllRead = () => setUnreadCount(0);
//   const decrementUnread = () => setUnreadCount((c) => Math.max(0, c - 1));

//   return (
//     <NotificationContext.Provider
//       value={{
//         unreadCount,
//         setUnreadCount,
//         notifications,
//         setNotifications,
//         loading,
//         markAllRead,
//         decrementUnread,
//         fetchUnread: fetchNotifications,
//         toasts,
//         removeToast,
//       }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// }

// export function useNotifications() {
//   const ctx = useContext(NotificationContext);
//   if (!ctx) throw new Error("useNotifications must be used inside NotificationProvider");
//   return ctx;
// }

import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import React from "react";
import API from "../api/api";
import { AuthContext } from "./AuthContext"; // ← adjust path if needed

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { user } = useContext(AuthContext); // ← gate everything on this

  const [unreadCount, setUnreadCount]   = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading]           = useState(false);
  const [toasts, setToasts]             = useState([]);

  const prevCountRef   = useRef(null);
  const intervalRef    = useRef(null);   // ← instance-level, not global

  const removeToast = (toastId) =>
    setToasts((prev) => prev.filter((t) => t.toastId !== toastId));

  const addToast = (notification) => {
    const id = `${notification._id}_${Date.now()}`;
    setToasts((prev) => {
      if (prev.some((t) => t._id === notification._id)) return prev;
      return [...prev, { ...notification, toastId: id }];
    });
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.toastId !== id));
    }, 5000);
  };

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await API.get("/notifications");
      const data = res?.data;
      if (!data) return;

      const newCount = data.unreadCount ?? 0;
      const newList  = data.notifications ?? [];

      if (prevCountRef.current !== null && newCount > prevCountRef.current) {
        const newest = newList[0];
        if (newest) addToast(newest);
      }

      prevCountRef.current = newCount;
      setUnreadCount(newCount);
      setNotifications(newList);
    } catch (err) {
      if (err.response?.status === 401) {
        // Token expired mid-session — stop polling, AuthContext interceptor handles redirect
        stopPolling();
      }
      // Silently ignore other errors (network blip, etc.)
    } finally {
      setLoading(false);
    }
  }, [stopPolling]);

  // Only start polling when user is logged in
  useEffect(() => {
    if (!user) {
      // User logged out — reset everything and stop polling
      stopPolling();
      setUnreadCount(0);
      setNotifications([]);
      setToasts([]);
      prevCountRef.current = null;
      return;
    }

    // User just logged in — fetch immediately then poll every 30s
    setLoading(true);
    fetchNotifications();
    intervalRef.current = setInterval(fetchNotifications, 30_000);

    return () => stopPolling(); // cleanup on unmount or user change
  }, [user]); // ← re-runs on login/logout only

  const markAllRead    = () => setUnreadCount(0);
  const decrementUnread = () => setUnreadCount((c) => Math.max(0, c - 1));

  return (
    <NotificationContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
        notifications,
        setNotifications,
        loading,
        markAllRead,
        decrementUnread,
        fetchUnread: fetchNotifications,
        toasts,
        removeToast,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used inside NotificationProvider");
  return ctx;
}