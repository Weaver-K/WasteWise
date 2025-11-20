// src/routes/admin.js
import express from "express";
const router = express.Router();

import { requireAuth } from "../middleware/Auth.js";
import isAdmin from "../middleware/Admin.js";

// example admin-only route
router.get("/dashboard", requireAuth, isAdmin, (req, res) => {
  res.json({ message: "Admin dashboard active" });
});

export default router;
