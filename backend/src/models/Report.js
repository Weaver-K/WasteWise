// src/models/Report.js
import mongoose from "mongoose";
import slugify from "slugify";

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, index: true },
  body: { type: String, required: true },
  location: { type: String },
  imageUrl: { type: String },
  status: { type: String, enum: ["pending", "resolved"], default: "pending" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema],
});

// Ensure unique slug generation before validation
reportSchema.pre("validate", async function (next) {
  if (!this.title) return next();

  if (this.slug && !this.isModified("title")) return next();

  const base = slugify(this.title, { lower: true, strict: true });
  let slug = base;
  let i = 1;

  // ensure uniqueness
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const q = { slug };
    if (this._id) q._id = { $ne: this._id };
    // use mongoose.models.Report to avoid model not compiled issues
    // eslint-disable-next-line no-await-in-loop
    const exists = await mongoose.models.Report?.findOne(q);
    if (!exists) break;
    slug = `${base}-${i++}`;
  }

  this.slug = slug;
  next();
});

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);
export default Report;
