"use client"
import React from 'react';

interface FacebookEmbedProps {
  url: string;
}

const FacebookEmbed: React.FC<FacebookEmbedProps> = ({ url }) => {
  const encodedUrl = encodeURIComponent(url);
  const iframeSrc = `https://www.facebook.com/plugins/post.php?href=${encodedUrl}&show_text=true&width=500`;

  // Use a taller aspect ratio to ensure Facebook content isn't cut off
  return (
    <div className="relative pb-[180%] overflow-hidden">
      <iframe
        src={iframeSrc}
        className="absolute top-0 left-0 w-full h-full border-none"
        scrolling="no"
        frameBorder="0"
        allowTransparency={true}
        allow="encrypted-media"
        allowFullScreen={true}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default FacebookEmbed;