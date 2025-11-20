import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // fixed import
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";
import { SidebarProvider } from "./components/ui/sidebar.jsx"; // import SidebarProvider

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkKey}>
      <BrowserRouter>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
