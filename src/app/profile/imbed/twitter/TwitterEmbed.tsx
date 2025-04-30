"use client"
import React, { useEffect } from 'react';

const TwitterEmbed: React.FC<{ url: string }> = ({ url }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <blockquote className="twitter-tweet">
      <a href={url}>Loading Tweet...</a>
    </blockquote>
  );
};

export default TwitterEmbed;
