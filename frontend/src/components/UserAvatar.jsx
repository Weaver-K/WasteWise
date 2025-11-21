// src/components/UserAvatar.jsx
import React from "react";

/**
 * UserAvatar: safe avatar component that avoids src=""
 * Props:
 * - src (string) avatar url
 * - name (string) fallback initials
 * - size (number) px
 */
export default function UserAvatar({ src, name, size = 32 }) {
  // ensure src is either a valid string or null (not empty string)
  const safeSrc = src && src.length ? src : null;

  const initials = (name || "")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return safeSrc ? (
    <img
      src={safeSrc}
      alt={name || "Avatar"}
      width={size}
      height={size}
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  ) : (
    <div
      className="rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-medium"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {initials || "U"}
    </div>
  );
}
