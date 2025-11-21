// src/components/app-sidebar.jsx
import * as React from "react";
import {
  IconInnerShadowTop,
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
  IconDashboard,
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
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      { title: "Dashboard", url: "/", icon: IconDashboard },
      { title: "Lifecycle", url: "/lifecycle", icon: IconListDetails },
      { title: "Analytics", url: "/analytics", icon: IconChartBar },
      { title: "Projects", url: "/projects", icon: IconFolder },
      { title: "Team", url: "/team", icon: IconUsers },
    ],
    documents: [
      { name: "Data Library", url: "/data", icon: IconDatabase },
      { name: "Reports", url: "/reports", icon: IconReport },
      { name: "Word Assistant", url: "/word", icon: IconFileWord },
    ],
    navSecondary: [
      { title: "Settings", url: "/settings", icon: IconSettings },
      { title: "Get Help", url: "/help", icon: IconHelp },
      { title: "Search", url: "/search", icon: IconSearch },
    ],
  };

  return (
    <Sidebar collapsible={isMobile ? "offcanvas" : "desktop"} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="p-1.5">
              <a href="/" className="flex items-center gap-2">
                <IconInnerShadowTop className="size-5" />
                <span className="font-semibold text-base">Waste Wise.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
        {/* Show toggle for mobile only */}
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
