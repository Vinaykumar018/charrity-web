// src/components/layout/SocialIcons.jsx
import React from "react";

export default function SocialIcons() {
  return (
    <div className="flex gap-4 mt-6">
      {["facebook", "twitter", "instagram", "youtube", "linkedin"].map((platform) => (
        <a
          key={platform}
          href="#"
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-indigo-600 transition"
          aria-label={platform}
        >
          <span className="text-lg">{platform[0].toUpperCase()}</span>
        </a>
      ))}
    </div>
  );
}