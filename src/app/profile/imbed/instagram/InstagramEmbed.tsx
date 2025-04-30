"use client"
import React from 'react';

// Define an interface for the props
interface InstagramEmbedProps {
  url: string;
}

const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ url }) => {
  const instagramId = extractInstagramId(url);
  const directPostUrl = instagramId ? `https://www.instagram.com/p/${instagramId}/embed` : "https://www.instagram.com";

  return (
    <div className="relative pb-[175.25%]  overflow-hidden"> {/* This creates a container with a 16:9 aspect ratio */}
      <iframe
        src={directPostUrl}
        className="absolute top-0 left-0 w-full h-full border-none" 
        frameBorder="0"
        scrolling="no"
        allowTransparency={true}
        allowFullScreen
      ></iframe>
    </div>
  );
};


function extractInstagramId(url: string) {
  const match = url.match(/\/(reel|p)\/([^/?]+)\//);
  return match ? match[2] : null;
}


export { InstagramEmbed as default };
