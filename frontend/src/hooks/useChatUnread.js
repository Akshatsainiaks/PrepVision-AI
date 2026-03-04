import { useState, useEffect } from "react";

// Reads unread counts from sessionStorage — works across pages
// ChatPage writes to sessionStorage, this hook reads it anywhere

function getTotal() {
  try {
    const dmList      = JSON.parse(sessionStorage.getItem("dmList")      || "[]");
    const groupUnread = JSON.parse(sessionStorage.getItem("groupUnread") || "{}");
    const dmTotal     = dmList.reduce((s, d) => s + (d.unread || 0), 0);
    const grpTotal    = Object.values(groupUnread).reduce((s, v) => s + v, 0);
    return dmTotal + grpTotal;
  } catch { return 0; }
}

export function useChatUnread() {
  const [total, setTotal] = useState(getTotal);

  useEffect(() => {
    // Poll every 2 seconds — cheap and works cross-page
    const id = setInterval(() => setTotal(getTotal()), 2000);

    // Also listen for storage events (other tabs)
    const onStorage = () => setTotal(getTotal());
    window.addEventListener("storage", onStorage);

    // Listen for custom event fired by ChatPage on same tab
    const onUpdate = () => setTotal(getTotal());
    window.addEventListener("chatUnreadUpdate", onUpdate);

    return () => {
      clearInterval(id);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("chatUnreadUpdate", onUpdate);
    };
  }, []);

  return total;
}