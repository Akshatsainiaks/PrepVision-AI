// import axios from "./axios";

// export const getSettings = () =>
//   axios.get("/settings");

// export const updateSecurity = (twoFA) =>
//   axios.put("/settings/security", { twoFA });

// export const updatePrivacy = (profilePublic) =>
//   axios.put("/settings/privacy", { profilePublic });

// export const deleteAccount = () =>
//   axios.delete("/settings/account");

//next acc claude code

import API from "./api";

// GET all settings
export const getSettings = () =>
  API.get("/settings");

// PATCH account info
export const updateAccount = (data) =>
  API.patch("/settings/account", data);

// PATCH password
export const changePassword = (data) =>
  API.patch("/settings/password", data);

// PUT security
export const updateSecurity = (twoFA) =>
  API.put("/settings/security", { twoFA });

// PUT privacy
export const updatePrivacy = (profilePublic) =>
  API.put("/settings/privacy", { profilePublic });

// PUT preferences
export const updatePreferences = (emailNotifications) =>
  API.put("/settings/preferences", { emailNotifications });

// DELETE account (password confirmation required)
export const deleteAccount = (password) =>
  API.delete("/settings/account", { data: { password } });