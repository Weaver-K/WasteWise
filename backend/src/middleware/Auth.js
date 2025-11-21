// src/middleware/Auth.js
import { clerkMiddleware, requireAuth as clerkRequireAuth, getAuth } from "@clerk/express";
import { syncUser } from "../utils/syncUser.js";

// Apply Clerk middleware to all requests
export const clerk = clerkMiddleware();

// Wrap requireAuth as a named export
export const requireAuth = clerkRequireAuth(); // now you can import { requireAuth }

// Middleware to attach MongoDB user
export const attachUser = async (req, res, next) => {
  try {
    const { userId } = getAuth(req); // get userId from Clerk session
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    req.user = await syncUser({ clerkId: userId });
    next();
  } catch (err) {
    console.error("attachUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
