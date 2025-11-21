import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api.js";

import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Separator } from "../components/ui/separator.jsx";
import { Avatar } from "../components/ui/avatar.jsx";

export default function ReportPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        let res;

        try {
          res = await api.get(`/reports/slug/${slug}`);
        } catch {
          res = await api.get(`/reports/${slug}`);
        }

        if (!active) return;
        setReport(res.data);
      } catch (err) {
        console.error("Report fetch error:", err);
        navigate("/reports");
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => (active = false);
  }, [slug, navigate]);

  if (loading) return <div className="p-6 text-center">Loading report...</div>;
  if (!report) return <div className="p-6">Report not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight break-words">
        {report.title}
      </h1>

      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <Avatar
          src={report.createdBy?.avatarUrl}
          name={report.createdBy?.name}
        />
        <span>{report.createdBy?.name || "Unknown user"}</span>
        <span className="hidden sm:block">•</span>
        <span className="sm:hidden w-full" />
        <span>{new Date(report.createdAt).toLocaleString()}</span>

        {report.status && (
          <Badge variant="outline" className="capitalize ml-auto">
            {report.status}
          </Badge>
        )}
      </div>

      <Separator />

      {report.imageUrl && (
        <Card className="overflow-hidden max-h-[380px] rounded-lg">
          <img
            src={report.imageUrl}
            alt={report.title}
            className="w-full h-full object-cover"
          />
        </Card>
      )}

      <Card className="p-4 md:p-6 leading-relaxed text-[15px] space-y-4">
        <p className="whitespace-pre-line">{report.body}</p>
      </Card>

      {report.location && (
        <div className="text-sm bg-secondary p-3 rounded-md inline-block">
          <strong>Location:</strong> {report.location}
        </div>
      )}

      <button
        onClick={() => navigate("/reports")}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        ← Back to Reports
      </button>
    </div>
  );
}
