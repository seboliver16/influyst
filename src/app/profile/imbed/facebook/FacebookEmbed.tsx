"use client"
import React from 'react';

interface FacebookEmbedProps {
  url: string;
}

const FacebookEmbed: React.FC<FacebookEmbedProps> = ({ url }) => {
  const encodedUrl = encodeURIComponent(url);
  const iframeSrc = `https://www.facebook.com/plugins/post.php?href=${encodedUrl}&show_text=true&width=500`;

  return (
    <div className="relative pb-[175.25%] overflow-hidden">
      <iframe
        src={iframeSrc}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        scrolling="no"
        frameBorder="0"
        allowTransparency={true}
        allow="encrypted-media"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
};

export default FacebookEmbed;