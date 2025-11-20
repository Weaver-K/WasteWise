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

import { requireAuth } from "../middleware/Auth.js";

// slug first
router.get("/slug/:slug", getReportBySlug);

// list + get
router.get("/", getReports);
router.get("/:id", getReport);

// protected
router.post("/", requireAuth, createReport);
router.put("/:id", requireAuth, updateReport);
router.delete("/:id", requireAuth, deleteReport);

// comments
router.post("/:id/comment", requireAuth, addComment);

export default router;
