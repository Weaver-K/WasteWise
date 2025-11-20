// src/middleware/Admin.js
/**
 * Checks req.user (populated by requireAuth) and ensures role === 'admin'
 */
export default function isAdmin(req, res, next) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (user.role !== "admin") return res.status(403).json({ message: "Forbidden - admin only" });
    return next();
  } catch (err) {
    console.error("Admin check error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
