import React, { useState } from "react";
import { useNavigate } from "react-dom";
import api from "../lib/api.js";
import { Input } from "../components/ui/input.jsx";
import { Textarea } from "../components/ui/textarea.jsx";

export default function ReportNew() {
  const [form, setForm] = useState({ title: "", body: "", location: "", imageUrl: "" });
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.post("/reports", form);
      nav("/reports");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to create report");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">New Report</h2>

      <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <Textarea placeholder="Description" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
      <Input placeholder="Location (optional)" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <Input placeholder="Image URL (optional)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 rounded-md bg-green-600 text-white" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
        <button type="button" onClick={() => setForm({ title: "", body: "", location: "", imageUrl: "" })} className="px-4 py-2 rounded-md border">
          Reset
        </button>
      </div>
    </form>
  );
}
