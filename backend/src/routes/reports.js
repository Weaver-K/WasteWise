// src/routes/reports.js
import express from "express";
const router = express.Router();

import {
  createReport,
  getReports,
  getReport,
  updateReport,
  deleteReport,
  addComment,
  getReportBySlug,
} from "../controllers/reportController.js";

import { requireAuth, attachUser } from "../middleware/Auth.js";

// slug first
router.get("/slug/:slug", getReportBySlug);

// public routes
router.get("/", getReports);
router.get("/:id", getReport);

// protected routes: attachUser ensures req.user exists
router.post("/", requireAuth, attachUser, createReport);
router.put("/:id", requireAuth, attachUser, updateReport);
router.delete("/:id", requireAuth, attachUser, deleteReport);

// comments
router.post("/:id/comment", requireAuth, attachUser, addComment);

export default router;
