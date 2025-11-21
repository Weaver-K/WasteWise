// src/pages/Reports.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    axios.get("http://localhost:5000/api/reports")
      .then(res => {
        if (!mounted) return;
        setReports(res.data || []);
      })
      .catch(err => {
        console.error(err);
        setError(err);
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  if (loading) return <div className="p-6 text-center">Loading reports...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Failed to load reports.</div>;

  if (!reports.length) {
    return <div className="p-6 text-center text-muted-foreground">No reports yet.</div>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <article key={report._id} className="bg-card p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold truncate">{report.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{report.body}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{new Date(report.createdAt).toLocaleDateString()}</span>
              <a href={`/reports/${report._id}`} className="text-sm text-green-600 hover:underline">View</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
