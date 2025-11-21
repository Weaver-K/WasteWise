// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import api, { authRequest } from "../lib/api.js";
import DataTable from "../components/data-table.jsx";
import ChartArea from "../components/chart-area-interactive.jsx";
import { useAuth } from "@clerk/clerk-react";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [u, r] = await Promise.all([api.get("/users"), api.get("/reports")]);
        if (!mounted) return;
        setUsers(u.data || []);
        setReports(r.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const token = await getToken();
      const res = await authRequest({ method: "put", url: `/reports/${id}`, data: { status } }, token);
      setReports((prev) => prev.map((p) => (p._id === id ? res.data : p)));
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const removeReport = async (id) => {
    if (!confirm("Delete report?")) return;
    try {
      const token = await getToken();
      await authRequest({ method: "delete", url: `/reports/${id}` }, token);
      setReports((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  if (loading) return <div className="p-6">Loading admin...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Admin dashboard</h2>
        <p className="text-sm text-muted">Overview of users and reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card p-4 rounded">
          <h3 className="font-semibold mb-2">Reports overview</h3>
          <ChartArea data={reports} />
        </div>

        <div className="bg-card p-4 rounded">
          <h3 className="font-semibold mb-2">Users</h3>
          <DataTable data={users} />
        </div>
      </div>

      <div className="bg-card p-4 rounded">
        <h3 className="font-semibold mb-2">Manage Reports</h3>
        <div className="space-y-3">
          {reports.map((r) => (
            <div key={r._id} className="flex items-center justify-between border p-3 rounded">
              <div>
                <div className="font-semibold">{r.title}</div>
                <div className="text-sm text-muted">{r.createdBy?.name} • {r.status}</div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => changeStatus(r._id, r.status === "pending" ? "resolved" : "pending")} className="px-3 py-1 rounded bg-blue-600 text-white">
                  {r.status === "pending" ? "Mark resolved" : "Mark pending"}
                </button>
                <button onClick={() => removeReport(r._id)} className="px-3 py-1 rounded border text-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
