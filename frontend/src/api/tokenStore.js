// tokenStore.js — in-memory token store (no localStorage)
// Single source of truth for the auth token across the app

let _token = null;

export const tokenStore = {
  get: () => _token,
  set: (token) => { _token = token; },
  clear: () => { _token = null; },
};