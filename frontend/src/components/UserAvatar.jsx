// src/components/UserAvatar.jsx
import React, { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { authRequest } from "../lib/api.js";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar.jsx";

export default function UserAvatar({ size = 36 }) {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [backendAvatar, setBackendAvatar] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (!isSignedIn) {
      setBackendAvatar(null);
      return;
    }
    (async () => {
      try {
        const token = await getToken();
        const res = await authRequest({ method: "get", url: "/users/me" }, token);
        if (!mounted) return;
        setBackendAvatar(res.data?.avatarUrl || null);
      } catch (err) {
        setBackendAvatar(null);
      }
    })();
    return () => (mounted = false);
  }, [isSignedIn, getToken]);

  const imageUrl = user?.imageUrl || backendAvatar || "";
  const name = user?.fullName || user?.firstName || "User";

  return (
    <Avatar style={{ width: size, height: size }}>
      {imageUrl ? <AvatarImage src={imageUrl} alt={name} /> : <AvatarFallback>{name?.[0]}</AvatarFallback>}
    </Avatar>
  );
}
