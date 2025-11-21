// src/lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

export async function authRequest(config, token) {
  const cfg = { ...config, headers: { ...(config.headers || {}) } };
  let t = token;
  if (!t && typeof window !== "undefined") {
    try {
      t = await window?.Clerk?.session?.getToken?.();
    } catch {}
  }
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return api(cfg);
}

export default api;
