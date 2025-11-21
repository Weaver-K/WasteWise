// src/pages/ReportView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import api, { authRequest } from "../lib/api.js";
import { Input } from "../components/ui/input.jsx";

export default function ReportView() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await api.get("/reports");
        if (!mounted) return;
        const found = Array.isArray(data) ? data.find((r) => r._id === id) : data;
        setReport(found || null);
      } catch (err) {
        console.error(err);
      }
    })();
    return () => (mounted = false);
  }, [id]);

  const postComment = async () => {
    if (!comment.trim()) return;
    try {
      setPosting(true);
      const token = await getToken();
      const res = await authRequest({ method: "post", url: `/reports/${id}/comment`, data: { text: comment } }, token);
      setReport(res.data);
      setComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to post comment");
    } finally {
      setPosting(false);
    }
  };

  if (!report) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{report.title}</h1>
      <p className="text-sm text-muted">{report.createdBy?.name} • {new Date(report.createdAt).toLocaleString()}</p>

      <div className="mt-4">{report.body}</div>

      <div className="mt-8">
        <h2 className="font-semibold mb-2">Comments</h2>
        {report.comments?.length ? (
          report.comments.map((c) => (
            <div key={c._id} className="border-b py-2">
              <div className="text-sm font-semibold">{c.user?.name || "User"}</div>
              <div>{c.text}</div>
            </div>
          ))
        ) : (
          <div className="text-sm text-muted">No comments yet</div>
        )}

        <div className="mt-4 flex gap-2">
          <Input placeholder="Write comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
          <button onClick={postComment} disabled={posting} className="px-3 py-1 rounded bg-green-600 text-white">
            {posting ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
