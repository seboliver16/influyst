"use client"
import React from 'react';

// Define an interface for the props
interface InstagramEmbedProps {
  url: string;
}

const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ url }) => {
  const idMatch = url.match(/\/(reel|p)\/([^/?]+)/);
  const instagramId = idMatch ? idMatch[2] : null;
  const embedUrl = instagramId ? `https://www.instagram.com/p/${instagramId}/embed/` : url;

  // Use a slightly larger padding-bottom for Instagram to prevent content from being cut off
  // Instagram typically needs more vertical space than Twitter
  return (
    <div className="relative pb-[190%] overflow-hidden">
      <iframe
        src={embedUrl}
        className="absolute top-0 left-0 w-full h-full border-none"
        frameBorder="0"
        scrolling="no"
        allowTransparency={true}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default InstagramEmbed;
