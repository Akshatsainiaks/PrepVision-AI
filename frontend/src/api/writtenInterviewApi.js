// import { API } from "./api";
import API from "../api/api";

export const startWrittenInterview = async (topic, level) => {
  const res = await API.post("/written-interview/start", { topic, level });
  return res.data;
};

export const submitWrittenAnswer = async (payload) => {
  const res = await API.post("/written-interview/answer", payload);
  return res.data;
};

export const finishWrittenInterview = async (sessionId) => {
  const res = await API.post("/written-interview/finish", { sessionId });
  return res.data;
};

export const getWrittenInterviewSession = async (sessionId) => {
  const res = await API.get(`/written-interview/session/${sessionId}`);
  return res.data;
};
