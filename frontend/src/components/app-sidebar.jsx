import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
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
      { title: "Dashboard", url: "#", icon: IconDashboard },
      { title: "Lifecycle", url: "#", icon: IconListDetails },
      { title: "Analytics", url: "#", icon: IconChartBar },
      { title: "Projects", url: "#", icon: IconFolder },
      { title: "Team", url: "#", icon: IconUsers },
    ],
    documents: [
      { name: "Data Library", url: "#", icon: IconDatabase },
      { name: "Reports", url: "#", icon: IconReport },
      { name: "Word Assistant", url: "#", icon: IconFileWord },
    ],
    navSecondary: [
      { title: "Settings", url: "#", icon: IconSettings },
      { title: "Get Help", url: "#", icon: IconHelp },
      { title: "Search", url: "#", icon: IconSearch },
    ],
  };

  return (
    <Sidebar collapsible={isMobile ? "offcanvas" : "desktop"} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="p-1.5">
              <a href="#">
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
        {isMobile && <SidebarTrigger />}
      </SidebarFooter>
    </Sidebar>
  );
}
