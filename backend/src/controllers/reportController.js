// src/controllers/reportController.js
import Report from "../models/Report.js";
import User from "../models/User.js";

/* Create a report */
export async function createReport(req, res) {
  try {
    const { title, body, location, imageUrl } = req.body;

    // req.user populated by attachUser middleware
    const createdBy = req.user?._id ?? null;

    const report = new Report({
      title,
      body,
      location,
      imageUrl,
      createdBy,
    });

    await report.save();
    await report.populate("createdBy", "name email avatarUrl");

    return res.json(report);
  } catch (err) {
    console.error("createReport error:", err);
    return res.status(500).json({ message: "Failed to create report" });
  }
}

/* Get all reports (public route) */
export async function getReports(req, res) {
  try {
    const reports = await Report.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email avatarUrl")
      .populate("comments.user", "name email avatarUrl");
    return res.json(reports);
  } catch (err) {
    console.error("getReports error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

/* Get report by id */
export async function getReport(req, res) {
  try {
    const { id } = req.params;
    const report = await Report.findById(id)
      .populate("createdBy", "name email avatarUrl")
      .populate("comments.user", "name email avatarUrl");

    if (!report) return res.status(404).json({ message: "Report not found" });
    return res.json(report);
  } catch (err) {
    console.error("getReport error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

/* Get report by slug */
export async function getReportBySlug(req, res) {
  try {
    const { slug } = req.params;
    const report = await Report.findOne({ slug })
      .populate("createdBy", "name email avatarUrl")
      .populate("comments.user", "name email avatarUrl");

    if (!report) return res.status(404).json({ message: "Report not found" });
    return res.json(report);
  } catch (err) {
    console.error("getReportBySlug error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

/* Update report */
export async function updateReport(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const report = await Report.findByIdAndUpdate(id, updates, { new: true })
      .populate("createdBy", "name email avatarUrl")
      .populate("comments.user", "name email avatarUrl");

    if (!report) return res.status(404).json({ message: "Report not found" });
    return res.json(report);
  } catch (err) {
    console.error("updateReport error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

/* Delete report */
export async function deleteReport(req, res) {
  try {
    const { id } = req.params;
    const doc = await Report.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ message: "Report not found" });
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error("deleteReport error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

/* Add a comment (req.user required) */
export async function addComment(req, res) {
  try {
    const { id } = req.params;
    const { text } = req.body;

    // req.user populated by attachUser middleware
    const userRef = req.user?._id;
    if (!userRef) return res.status(401).json({ message: "Unauthorized" });

    const report = await Report.findById(id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    report.comments.push({ user: userRef, text });
    await report.save();
    await report.populate("comments.user", "name email avatarUrl");

    return res.json(report);
  } catch (err) {
    console.error("addComment error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
