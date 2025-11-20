import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import api from "../lib/api"; // small axios instance
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar.jsx";


export default function UserAvatar({ size = 40 }) {
  const { isSignedIn, user } = useUser();
  const [backendAvatar, setBackendAvatar] = useState(null);

  useEffect(() => {
    if (!isSignedIn) return;
    // try to fetch user's profile from backend (optional endpoint /users/me)
    (async () => {
      try {
        const res = await api.get("/users/me");
        setBackendAvatar(res.data?.avatarUrl || null);
      } catch {
        setBackendAvatar(null);
      }
    })();
  }, [isSignedIn]);

  const imageUrl = user?.imageUrl || backendAvatar || "";
  const name = user?.fullName || user?.firstName || "User";

  return <Avatar src={imageUrl} name={name} size={size} />;
}
