// src/controllers/userController.js
import User from "../models/User.js";

/* List users (admin) */
export async function listUsers(req, res) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.json(users);
  } catch (err) {
    console.error("listUsers error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

/* Get current user (based on req.user populated by requireAuth) */
export async function getMe(req, res) {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    return res.json(req.user);
  } catch (err) {
    console.error("getMe error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
