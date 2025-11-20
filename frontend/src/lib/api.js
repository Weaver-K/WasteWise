import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

/**
 * Attach Clerk authentication token to each request.
 * Works with frontend ClerkProvider.
 */
api.interceptors.request.use(async (config) => {
  try {
    // Clerk injects "window.Clerk"
    const token = await window.Clerk?.session?.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.warn("Clerk token unavailable:", err);
  }

  return config;
});

export default api;
