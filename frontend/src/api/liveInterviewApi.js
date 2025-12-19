import { API } from "./api";

export const submitLiveAnswer = (payload) =>
  API.post("/live-interview/answer", payload);

export const finishLiveInterview = (sessionId) =>
  API.post("/live-interview/finish", { sessionId });
