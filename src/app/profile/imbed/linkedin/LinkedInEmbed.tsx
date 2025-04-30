"use client"
import React from 'react';

interface LinkedInEmbedProps {
  url: string;
}

const LinkedInEmbed: React.FC<LinkedInEmbedProps> = ({ url }) => {
  return (
    <div style={{ width: '100%' }}> {/* Container that takes full width */}
      <iframe
        src={url}
        width="100%"
        height="494" // Manually set height; adjust based on typical content height
        frameBorder="0"
        allowFullScreen
        title="Embedded LinkedIn Post"
        style={{ border: 'none', overflow: 'hidden' }}
      ></iframe>
    </div>
  );
};

export default LinkedInEmbed;
