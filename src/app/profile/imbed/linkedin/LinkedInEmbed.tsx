"use client"
import React, { useState, useEffect } from 'react';

interface LinkedInEmbedProps {
  url: string;
}

const LinkedInEmbed: React.FC<LinkedInEmbedProps> = ({ url }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string>(url);

  useEffect(() => {
    // Process and validate LinkedIn URL
    try {
      let formattedUrl = url;
      
      // Check if URL doesn't have https:// prefix and add it
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        formattedUrl = 'https://' + url;
      }
      
      // Extract post ID for embedding if it's a post URL
      if (formattedUrl.includes('linkedin.com/posts/') || 
          formattedUrl.includes('linkedin.com/feed/update/')) {
        
        // For URLs like linkedin.com/posts/username_detail_activity-postid
        const postMatch = formattedUrl.match(/linkedin\.com\/posts\/.*?activity-(\d+)/);
        
        // For URLs like linkedin.com/feed/update/urn:li:activity:postid
        const feedMatch = formattedUrl.match(/linkedin\.com\/feed\/update\/urn:li:activity:(\d+)/);
        
        const postId = postMatch ? postMatch[1] : feedMatch ? feedMatch[1] : null;
        
        if (postId) {
          // Construct embed URL with the post ID
          const embedUrl = `https://www.linkedin.com/embed/feed/update/urn:li:activity:${postId}`;
          setProcessedUrl(embedUrl);
        } else {
          // If we couldn't extract a post ID, use original URL but flag a warning
          setError("LinkedIn URL format might not be embeddable. Trying best effort display.");
        }
      } else if (!formattedUrl.includes('linkedin.com')) {
        setError("URL doesn't appear to be a LinkedIn URL");
      }
      
      setLoading(false);
    } catch (err) {
      setError("Error processing LinkedIn URL");
      setLoading(false);
    }
  }, [url]);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setError("Failed to load LinkedIn content");
    setLoading(false);
  };

  if (error) {
    return (
      <div className="p-4 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
        <p>{error}</p>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-2 inline-block text-blue-600 hover:underline"
        >
          View on LinkedIn
        </a>
      </div>
    );
  }

  return (
    <div className="relative pb-[175.25%] overflow-hidden">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading LinkedIn content...</span>
        </div>
      )}
      
      <iframe
        src={processedUrl}
        className="absolute top-0 left-0 w-full h-full border-none"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        title="Embedded LinkedIn Post"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default LinkedInEmbed;
