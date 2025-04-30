"use client"
import React, { useEffect } from 'react';

const TikTokEmbed: React.FC<{ url: string }> = ({ url }) => {
  useEffect(() => {
    // Dynamically load the TikTok embed script
    const script = document.createElement('script');
    script.setAttribute('src', 'https://www.tiktok.com/embed.js');
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative pb-[175.25%]  mx-auto overflow-hidden">
      <blockquote className="tiktok-embed" cite={url} data-video-id={url.split('/').pop()} style={{ width: '100%', height: '100%', position: 'absolute', top: '0', left: '0' }}>
        <section>
          <a target="_blank" rel="noopener noreferrer" href={url}>Loading TikTok...</a>
        </section>
      </blockquote>
    </div>
  );
};

export default TikTokEmbed;
