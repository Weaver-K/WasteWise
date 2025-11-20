// src/routes/users.js
import express from "express";
const router = express.Router();

import { listUsers, getMe } from "../controllers/userController.js";
import { requireAuth } from "../middleware/Auth.js";
import isAdmin from "../middleware/Admin.js";

router.get("/", requireAuth, isAdmin, listUsers);
router.get("/me", requireAuth, getMe);

export default router;
