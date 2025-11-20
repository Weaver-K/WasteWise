import React, { useEffect, useState } from "react";
import api from "../lib/api.js";
import DataTable from "../components/data-table.jsx";
import ChartAreaInteractive from "../components/chart-area-interactive.jsx";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <ChartAreaInteractive data={reports} />
        </div>

        <div className="bg-card p-4 rounded">
          <h3 className="font-semibold mb-2">Users</h3>
          <DataTable data={users} />
        </div>
      </div>
    </div>
  );
}
