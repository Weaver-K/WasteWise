/**
 * Checks req.auth (populated by Clerk middleware) and ensures role === 'admin'
 */
export default function isAdmin(req, res, next) {
  try {
    const auth = req.auth;
    if (!auth?.userId) return res.status(401).json({ message: "Unauthorized" });
    
    // Get admin role from Clerk metadata
    const userRole = auth.sessionClaims?.metadata?.role;
    if (userRole !== "admin") return res.status(403).json({ message: "Forbidden - admin only" });
    
    return next();
  } catch (err) {
    console.error("Admin check error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}