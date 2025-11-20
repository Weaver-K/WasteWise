import React from "react";
import { useIsMobile } from "../blocks/use-mobile.js";
import { SidebarTrigger } from "./ui/sidebar.jsx";
import { Button } from "./ui/button.jsx";
import { Separator } from "./ui/separator.jsx";
import UserAvatar from "./UserAvatar.jsx";

export function SiteHeader() {
  const isMobile = useIsMobile();

  return (
    <header className="flex items-center gap-3 border-b px-4 py-3">
      <div className="flex items-center gap-3">
        {/* Sidebar toggle on mobile */}
        <SidebarTrigger className="sm:hidden" />

        <h1 className="text-lg font-semibold">WasteWise</h1>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden sm:block">
          <Button variant="ghost" size="sm">
            <a href="https://ui.shadcn.com/blocks" target="_blank" rel="noreferrer">Blocks</a>
          </Button>
        </div>

        <Separator orientation="vertical" className="hidden sm:block h-6" />

        {/* avatar */}
        <UserAvatar size={36} />
      </div>
    </header>
  );
}
