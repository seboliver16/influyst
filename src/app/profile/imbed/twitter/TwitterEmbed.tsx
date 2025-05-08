"use client"
import React, { useEffect, useState } from 'react';

interface TwitterEmbedProps {
  url: string;
}

const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ url }) => {
  const [tweetId, setTweetId] = useState<string | null>(null);

  useEffect(() => {
    let cleanUrl = url.trim();
    if (cleanUrl.startsWith('@')) {
      cleanUrl = cleanUrl.substring(1);
    }
    const match = cleanUrl.match(/(?:twitter|x)\.com\/[\w_]+\/status\/(\d+)/i);
    if (match) {
      setTweetId(match[1]);
    }
  }, [url]);

  if (!tweetId) return null;

  const embedUrl = `https://platform.twitter.com/embed/index.html?dnt=true&embedId=twitter-widget-0&frame=false&hideCard=false&hideThread=false&id=${tweetId}&lang=en&theme=light&widgetsVersion=ed20a2b%3A1601588405575`;

  return (
    <div className="relative pb-[160%] overflow-hidden">
      <iframe
        src={embedUrl}
        className="absolute top-0 left-0 w-full h-full border-none"
        scrolling="no"
        frameBorder="0"
        allow="encrypted-media"
        allowFullScreen
        loading="lazy"
        title="X Tweet"
      />
    </div>
  );
};

export default TwitterEmbed;
