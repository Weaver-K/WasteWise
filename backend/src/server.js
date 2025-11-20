// src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import reportsRoutes from "./routes/reports.js";
import usersRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";

import { clerkAuthMiddleware } from "./middleware/Auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// connect to DB
connectDB();

// Clerk middleware must be mounted *before* routes so `req.auth` is set.
app.use(clerkAuthMiddleware);

// routes
app.use("/api/reports", reportsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/admin", adminRoutes);

// health
app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
