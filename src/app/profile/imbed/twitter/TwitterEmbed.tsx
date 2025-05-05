"use client"
import React, { useEffect, useState } from 'react';

interface TwitterEmbedProps {
  url: string;
}

const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ url }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tweetId, setTweetId] = useState<string | null>(null);

  useEffect(() => {
    // Clean and process the URL
    let cleanUrl = url.trim();
    if (cleanUrl.startsWith('@')) {
      cleanUrl = cleanUrl.substring(1);
    }

    try {
      // Extract tweet ID from URL
      const tweetRegex = /(?:twitter|x)\.com\/\w+\/status\/(\d+)/i;
      const match = cleanUrl.match(tweetRegex);
      
      if (match && match[1]) {
        setTweetId(match[1]);
        setLoading(false);
      } else {
        console.error("Could not extract tweet ID from URL:", cleanUrl);
        setError("Invalid tweet URL format");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error processing tweet URL:", err);
      setError("Failed to process tweet URL");
      setLoading(false);
    }
  }, [url]);

  const createDirectEmbedUrl = (id: string) => {
    return `https://platform.twitter.com/embed/index.html?dnt=true&embedId=twitter-widget-0&frame=false&hideCard=false&hideThread=false&id=${id}&lang=en&theme=light&widgetsVersion=ed20a2b%3A1601588405575`;
  };

  return (
    <div className="twitter-embed-container w-full overflow-hidden rounded-md">
      {loading && (
        <div className="flex justify-center items-center p-6 bg-gray-50 rounded-md">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          <span className="ml-2 text-gray-600">Loading tweet...</span>
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
          <p className="font-medium mb-2">{error}</p>
          <p className="text-sm text-red-600 mb-3">URL: {url.startsWith('@') ? url.substring(1) : url}</p>
          <a 
            href={url.startsWith('@') ? url.substring(1) : url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-2 inline-block text-blue-600 hover:underline bg-blue-50 px-3 py-2 rounded-md text-sm"
          >
            Open in Browser
          </a>
        </div>
      )}
      
      {tweetId && (
        <div className="twitter-iframe-container bg-white border border-gray-200 rounded-md overflow-hidden">
          <iframe 
            src={createDirectEmbedUrl(tweetId)}
            height="500" 
            width="100%" 
            style={{border: 'none', overflow: 'hidden'}}
            scrolling="no"
            frameBorder="0"
            allowTransparency={true}
            allow="encrypted-media"
            title="X Tweet"
          ></iframe>
        </div>
      )}
    </div>
  );
};

// Add TypeScript interface for the Twitter widget
declare global {
  interface Window {
    twttr: any;
  }
}

export default TwitterEmbed;
