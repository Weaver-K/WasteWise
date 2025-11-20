import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // <-- correct import
import "./index.css";

import { AppSidebar } from "./components/app-sidebar.jsx";
import { SiteHeader } from "./components/site-header.jsx";

import Reports from "./pages/Reports.jsx";
import ReportNew from "./pages/ReportNew.jsx";
import ReportView from "./pages/ReportView.jsx";
import Admin from "./pages/Admin.jsx";
import ReportPage from "./pages/ReportPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header always on top */}
      <SiteHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <AppSidebar />

        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/reports" replace />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/new" element={<ReportNew />} />
            <Route path="/reports/:id" element={<ReportView />} />
            <Route path="/report/:slug" element={<ReportPage />} />
            <Route path="/admin" element={<Admin />} />
            {/* fallback */}
            <Route path="*" element={<Navigate to="/reports" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
