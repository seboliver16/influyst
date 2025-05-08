"use client"

import React from 'react';

// Define an interface for the props
interface YouTubeEmbedProps {
  url: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url }) => {
  const videoId = extractYouTubeId(url);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : "";

  // Use 16:9 aspect ratio (56.25%) which is standard for YouTube videos
  return (
    <div className="relative pb-[56.25%] overflow-hidden">
      <iframe
        src={embedUrl}
        className="absolute top-0 left-0 w-full h-full border-none"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

// Function to extract the YouTube video ID from a given URL
function extractYouTubeId(url: string): string | null {
  // Updated regex to include "shorts"
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|watch\?.*&v=|embed\/|shorts\/)|youtu.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default YouTubeEmbed;