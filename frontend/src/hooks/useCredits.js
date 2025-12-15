// src/hooks/useCredits.js
import { useQuery } from "@tanstack/react-query";
import { API } from "../api/api";

export const useCredits = () =>
  useQuery({
    queryKey: ["credits"],
    queryFn: async () => {
      const res = await API.get("/credits/me");
      return res.data; // { credits }
    }
  });
