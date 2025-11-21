// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import SiteHeader from "./components/site-header.jsx";
import AppSidebar from "./components/app-sidebar.jsx";

// Dashboard
import Dashboard from "./pages/Dashboard.jsx";

// Reports
import Reports from "./pages/Reports.jsx";
import ReportNew from "./pages/ReportNew.jsx";
import ReportView from "./pages/ReportView.jsx";

// Admin
import Admin from "./pages/Admin.jsx";

// Sidebar Pages (placeholders)
import Lifecycle from "./pages/Lifecycle.jsx";
import Analytics from "./pages/Analytics.jsx";
import Projects from "./pages/Projects.jsx";
import Team from "./pages/Team.jsx";
import DataLibrary from "./pages/DataLibrary.jsx";
import WordAssistant from "./pages/WordAssistant.jsx";
import Search from "./pages/Search.jsx";
import Settings from "./pages/Settings.jsx";
import Help from "./pages/Help.jsx";

export default function App() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <SiteHeader />

        <main className="flex-1 p-6">
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Reports */}
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/new" element={<ReportNew />} />
            <Route path="/reports/:id" element={<ReportView />} />

            {/* Admin */}
            <Route path="/admin" element={<Admin />} />

            {/* Sidebar Pages */}
            <Route path="/lifecycle" element={<Lifecycle />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/team" element={<Team />} />

            <Route path="/data" element={<DataLibrary />} />
            <Route path="/word" element={<WordAssistant />} />

            <Route path="/search" element={<Search />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
