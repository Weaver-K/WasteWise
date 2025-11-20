// src/middleware/Auth.js
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { syncUser } from "../utils/syncUser.js";

// Initializes Clerk authentication using ONLY the server secret key
export const clerkAuthMiddleware = ClerkExpressWithAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
});

// Protects routes and loads synced user
export async function requireAuth(req, res, next) {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const clerkId = req.auth.userId;

    const user = await syncUser({ clerkId });

    req.user = user;
    next();
  } catch (err) {
    console.error("requireAuth error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}