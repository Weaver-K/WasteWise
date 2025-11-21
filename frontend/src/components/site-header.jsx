// src/components/site-header.jsx
import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import UserAvatar from "./UserAvatar.jsx";
import { Button } from "./ui/button.jsx";
import { Separator } from "./ui/separator.jsx";
import { SidebarTrigger } from "./ui/sidebar.jsx";

function SiteHeader() {
  return (
    <header className="border-b bg-background sticky top-0 z-40">
      <div className="flex items-center gap-4 px-4 h-14">
        <SidebarTrigger />

        <h1 className="text-lg font-semibold">WasteWise</h1>

        <div className="ml-auto flex items-center gap-3">
          <SignedIn>
            <div className="hidden sm:flex items-center gap-2">
              <UserAvatar size={36} />
            </div>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <Button asChild>
              <a href="/login">Login</a>
            </Button>
          </SignedOut>

          <Separator orientation="vertical" className="h-6 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
