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

  return (
    <div className="linkedin-embed-container w-full">
      {loading && (
        <div className="flex justify-center items-center p-6 bg-gray-50 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading LinkedIn content...</span>
        </div>
      )}
      
      {error && (
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
      )}
      
      <iframe
        src={processedUrl}
        width="100%"
        height="550"
        frameBorder="0"
        allowFullScreen
        title="Embedded LinkedIn Post"
        style={{ 
          border: 'none', 
          overflow: 'hidden', 
          display: loading ? 'none' : 'block' 
        }}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      ></iframe>
    </div>
  );
};

export default LinkedInEmbed;
