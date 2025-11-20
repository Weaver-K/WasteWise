import React, { createContext, useState, useEffect } from "react";
import api from "../lib/api";

export const AuthCtx = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // try to load user from token (optional)
    const token = localStorage.getItem("token");
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  async function login({ token, user }) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  // helper to refresh user from backend if needed
  async function refresh() {
    try {
      const { data } = await api.get("/users/me");
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch {
      logout();
    }
  }

  return (
    <AuthCtx.Provider value={{ user, login, logout, refresh }}>
      {children}
    </AuthCtx.Provider>
  );
}
