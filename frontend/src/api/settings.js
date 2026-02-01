import axios from "./axios";

export const getSettings = () =>
  axios.get("/settings");

export const updateSecurity = (twoFA) =>
  axios.put("/settings/security", { twoFA });

export const updatePrivacy = (profilePublic) =>
  axios.put("/settings/privacy", { profilePublic });

export const deleteAccount = () =>
  axios.delete("/settings/account");
