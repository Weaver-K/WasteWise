// src/components/app-sidebar.jsx
import * as React from "react";
import {
  IconDashboard,
  IconListDetails,
  IconChartBar,
  IconFolder,
  IconUsers,
  IconDatabase,
  IconReport,
  IconFileWord,
  IconSettings,
  IconHelp,
  IconSearch,
  IconInnerShadowTop,
} from "@tabler/icons-react";

import { NavDocuments } from "./nav-documents.jsx";
import { NavMain } from "./nav-main.jsx";
import { NavSecondary } from "./nav-secondary.jsx";
import { NavUser } from "./nav-user.jsx";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar.jsx";

import { useIsMobile } from "../blocks/use-mobile.js";

export function AppSidebar(props) {
  const isMobile = useIsMobile();

  const data = {
    user: {
      name: "Shadcn User",
      email: "demo@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      { title: "Dashboard", url: "/", icon: IconDashboard },
      { title: "Reports", url: "/reports", icon: IconReport },
      { title: "Analytics", url: "/analytics", icon: IconChartBar },
    ],
    documents: [
      { name: "Data Library", url: "/data", icon: IconDatabase },
      { name: "Word Assistant", url: "/word", icon: IconFileWord },
    ],
    navSecondary: [
      { title: "Settings", url: "/settings", icon: IconSettings },
      { title: "Help", url: "/help", icon: IconHelp },
      { title: "Search", url: "/search", icon: IconSearch },
    ],
  };

  return (
    <Sidebar collapsible={isMobile ? "offcanvas" : "desktop"} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="p-2">
              <a href="/" className="flex items-center gap-2">
                <IconInnerShadowTop className="size-5" />
                <span className="font-semibold">WasteWise</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
