// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import SectionCards from "../components/section-cards.jsx";
import ChartArea from "../components/chart-area-interactive.jsx";
import DataTable from "../components/data-table.jsx";
import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";

/**
 * WasteWise Analytics Dashboard (Option B)
 * - Top KPI cards
 * - Waste categories pie chart
 * - Monthly collection line chart
 * - Recent reports table
 *
 * This page uses your existing components:
 *  - section-cards.jsx
 *  - chart-area-interactive.jsx
 *  - data-table.jsx
 *
 * If those components accept props, they will render accordingly. If they render static demo UI,
 * this page still provides layout and supplies sample data to the charts/table.
 */
export default function Dashboard() {
  const [stats, setStats] = useState({
    totalReports: 124,
    totalCollectedKg: 4570,
    activeUsers: 872,
    reportsToday: 5,
  });

  // sample data for charts — adapt to your chart component's expected shape
  const wasteByCategory = [
    { name: "Organic", value: 52 },
    { name: "Plastic", value: 22 },
    { name: "Paper", value: 12 },
    { name: "Metal", value: 8 },
    { name: "Glass", value: 6 },
  ];

  const monthlyTrend = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    series: [
      {
        name: "Collected (kg)",
        data: [420, 380, 450, 500, 560, 600, 580, 620],
      },
    ],
  };

  // sample recent reports (if your backend exists, replace with fetch)
  const [recentReports, setRecentReports] = useState([
    {
      _id: "r1",
      title: "Open dumping near river",
      createdBy: { name: "Alice" },
      createdAt: new Date().toISOString(),
      status: "pending",
    },
    {
      _id: "r2",
      title: "Overflowing bin in market",
      createdBy: { name: "Bob" },
      createdAt: new Date().toISOString(),
      status: "resolved",
    },
    {
      _id: "r3",
      title: "Illegal burning spotted",
      createdBy: { name: "Cecilia" },
      createdAt: new Date().toISOString(),
      status: "pending",
    },
  ]);

  // example: if you have an endpoint to fetch dashboard data, you can fetch it here.
  useEffect(() => {
    // Example fetch skeleton — uncomment & adapt if you have an API
    // (async () => {
    //   const res = await fetch(import.meta.env.VITE_API_URL + "/dashboard");
    //   const json = await res.json();
    //   setStats(json.stats);
    //   setRecentReports(json.recentReports);
    //   setWasteByCategory(json.wasteByCategory);
    //   setMonthlyTrend(json.monthlyTrend);
    // })();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top cards (you already have section-cards.jsx — keep it for consistent UI) */}
      <SectionCards
        // If your SectionCards accepts props, pass them. Otherwise it will render prebuilt cards.
        stats={stats}
      />

      {/* Analytics area: left - monthly trend, right - categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">Monthly Collection Trend</h2>
              <p className="text-sm text-muted-foreground">Collected waste over the last months (kg)</p>
            </div>
            <Badge variant="secondary" className="self-start">{stats.totalCollectedKg} kg</Badge>
          </div>

          <div className="mt-4">
            {/* ChartArea typically renders an area/line chart — pass monthlyTrend if supported */}
            <ChartArea data={monthlyTrend} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold">Waste by Category</h3>
          <p className="text-sm text-muted-foreground">Distribution of reported waste categories</p>
          <div className="mt-4">
            {/* If your ChartArea supports pie charts, send a prop — otherwise adapt to your chart component */}
            {/* We'll render the same ChartArea component with pie-like data */}
            <ChartArea pie data={wasteByCategory} />
          </div>
        </Card>
      </div>

      {/* Recent reports list/table */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Recent Reports</h3>
            <p className="text-sm text-muted-foreground">Latest user-submitted reports</p>
          </div>
          <Badge>{recentReports.length} recent</Badge>
        </div>

        <div className="mt-4">
          {/* If DataTable accepts data prop */}
          <DataTable data={recentReports} />
        </div>
      </Card>
    </div>
  );
}

