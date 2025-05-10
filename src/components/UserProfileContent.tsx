"use client";

import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { User, Partner, ContentExample, ServiceOffering, Testimonial } from '../app/user'; // Adjust path as needed
import { CustomizationSettings, ContentGridOption, ContentSectionOption, DEFAULT_CUSTOMIZATION, FontFamilyOption } from '../app/types/customization'; // Adjust path as needed
import LayoutWrapper from '../../components/layouts/LayoutWrapper';
import {
  FiMail,
  FiCopy,
  FiInstagram,
  FiYoutube,
  FiTwitter,
  FiLink,
  FiHeart,
  FiMapPin,
  FiCalendar,
  FiPackage,
  FiDollarSign,
  FiSmartphone,
  FiMonitor,
  FiExternalLink,
  FiMessageCircle,
  FiVideo,
  FiGrid,
  FiGlobe,
  FiClock,
  FiArrowLeft,
  FiPlayCircle,
  FiShare,
  FiAlertTriangle
} from 'react-icons/fi';
import {
  RiTiktokFill
} from 'react-icons/ri';
import { getPrimaryButtonClasses, getButtonContrastColor, getSecondaryButtonClasses } from "../lib/utils"; // Adjust path as needed
import TwitterEmbed from '../app/profile/imbed/twitter/TwitterEmbed';
import InstagramEmbed from '../app/profile/imbed/instagram/InstagramEmbed';
import YouTubeEmbed from '../app/profile/imbed/youtube/YouTubeEmbed';
import TikTokEmbed from '../app/profile/imbed/tiktok/TikTokEmbed';
import FacebookEmbed from '../app/profile/imbed/facebook/FacebookEmbed';
import LinkedInEmbed from '../app/profile/imbed/linkedin/LinkedInEmbed';
import { getContainerStyle } from "../lib/profile-helpers"; // Adjust path as needed
import { hexToRgb } from '../lib/profile-helpers';

// Import UI components separately
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Declare Window.twttr as any to avoid conflicts with other declarations
declare global {
  interface Window {
    twttr: any;
  }
}

// Augment CSSProperties to allow custom properties
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}

interface UserProfileContentProps {
  user: User;
  customization: CustomizationSettings;
  viewMode?: 'mobile' | 'desktop'; // Optional: To handle specific view mode adjustments if needed
}

// Update the CustomizationSettings interface with ALL properties from ProfilePreview
declare module '../app/types/customization' {
  interface CustomizationSettings {
    // Existing new properties
    coverImageHeight?: 'small' | 'medium' | 'large' | 'custom';
    customCoverHeight?: string;
    contentWidth?: 'narrow' | 'medium' | 'wide' | 'full' | 'custom';
    cardBorderColor?: string;
    cardBackgroundColor?: string;
    cardShadowIntensity?: 'none' | 'light' | 'medium' | 'strong' | 'custom';
    bioSectionSpacing?: 'compact' | 'comfortable' | 'spacious' | 'custom';
    enableGlassmorphism?: boolean;
    
    // Additional properties to ensure compatibility with ProfilePreview
    coverImageStretch?: boolean;
    backgroundImageAttachment?: 'scroll' | 'fixed' | 'parallax';
    profileHeaderHeight?: number;
    profileImageBorderWidth?: number;
    profileImageSize?: 'small' | 'medium' | 'large' | 'custom';
    showSocialIconsInHeader?: boolean;
    sectionSpacing?: 'compact' | 'normal' | 'relaxed' | 'custom';
    sectionAlignment?: 'left' | 'center' | 'right';
    sectionBorderRadius?: string;
    sectionMaxWidth?: string;
  }
}

// Helper Functions (Extracted from ProfilePreview)
const getFontFamily = (fontFamily: string) => {
  switch (fontFamily) {
    case 'poppins': return 'Poppins, sans-serif';
    case 'roboto': return 'Roboto, sans-serif';
    case 'montserrat': return 'Montserrat, sans-serif';
    case 'playfair': return 'Playfair Display, serif';
    case 'opensans': return 'Open Sans, sans-serif';
    case 'lato': return 'Lato, sans-serif';
    case 'raleway': return 'Raleway, sans-serif';
    case 'merriweather': return 'Merriweather, serif';
    case 'josefin': return 'Josefin Sans, sans-serif';
    case 'quicksand': return 'Quicksand, sans-serif';
    default: return 'Inter, sans-serif';
  }
};

const getAnimationClasses = (customization: CustomizationSettings) => {
  switch (customization.animations) {
    case 'none': return '';
    case 'moderate': return 'transition-all duration-500 hover:scale-[1.02] hover:shadow-lg';
    case 'advanced': return 'transition-all duration-500 hover:scale-[1.03] hover:shadow-xl transform-gpu';
    default: return 'transition-all duration-300 hover:scale-[1.01] hover:shadow-sm'; // minimal
  }
};

const getCardRadius = (customization: CustomizationSettings) => {
  switch (customization.cardStyle) {
    case 'sharp': return '0px';
    case 'pill': return '24px';
    case 'neumorphic': return '1rem';
    default: return '0.5rem'; // rounded
  }
};

const getBorderWidth = (customization: CustomizationSettings) => {
  switch (customization.borderWidth) {
    case 'none': return '0px';
    case 'medium': return '2px';
    case 'thick': return '3px';
    default: return '1px'; // thin
  }
};

// Enhanced card styling with more customization options
const getCardStyles = (customization: CustomizationSettings): React.CSSProperties => {
  const baseStyle = {
    borderRadius: 'var(--card-radius)',
    borderWidth: 'var(--border-width)',
    borderColor: customization.cardBorderColor || `rgba(var(--accent-rgb), ${customization.theme === 'dark' ? 0.3 : 0.2})`,
    backgroundColor: customization.cardBackgroundColor || (customization.theme === 'dark' ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.95)'),
    transition: 'all 0.3s ease',
  };

  // Apply shadow based on intensity setting
  const shadowStyle = () => {
    switch (customization.cardShadowIntensity) {
      case 'none':
        return { boxShadow: 'none' };
      case 'light':
        return { boxShadow: customization.theme === 'dark' ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)' };
      case 'strong':
        return { boxShadow: customization.theme === 'dark' ? '0 10px 25px rgba(0, 0, 0, 0.5)' : '0 10px 25px rgba(0, 0, 0, 0.15)' };
      default: // medium (default)
        return { boxShadow: customization.theme === 'dark' ? '0 6px 16px rgba(0, 0, 0, 0.4)' : '0 6px 16px rgba(0, 0, 0, 0.1)' };
    }
  };

  switch (customization.cardStyle) {
    case 'neumorphic':
      return {
        ...baseStyle,
        boxShadow: customization.theme === 'dark'
          ? '5px 5px 10px #1a1a1a, -5px -5px 10px #333333'
          : '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff',
        background: customization.cardBackgroundColor || (customization.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'),
        border: 'none'
      };
    case 'sharp':
      return {
        ...baseStyle,
        ...shadowStyle(),
      };
    default:
      return {
        ...baseStyle,
        ...shadowStyle(),
      };
  }
};

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'instagram': return <FiInstagram />;
    case 'youtube': return <FiYoutube />;
    case 'twitter': return <FiTwitter />;
    case 'tiktok': return <RiTiktokFill />;
    default: return <FiGlobe />;
  }
};

// Enhanced glassmorphism effect
const getGlassmorphismClasses = (customization: CustomizationSettings) => {
  if (!customization.enableGlassmorphism && !customization.enableBackdropFilter) {
    return '';
  }
  
  return 'backdrop-blur-md border border-white/20 dark:border-gray-800/30 ' + 
    (customization.theme === 'dark' 
      ? 'bg-gray-900/60 dark:bg-gray-900/60' 
      : 'bg-white/50 dark:bg-gray-900/60');
};

// Responsive cover image height
const getCoverImageHeight = (customization: CustomizationSettings): string => {
  switch (customization.coverImageHeight) {
    case 'small': return '120px';
    case 'large': return '300px';
    case 'custom': return customization.customCoverHeight || '200px';
    default: return '200px'; // medium (default)
  }
};

// Content width control
const getContentWidthClass = (customization: CustomizationSettings): string => {
  switch (customization.contentWidth) {
    case 'narrow': return 'max-w-3xl';
    case 'medium': return 'max-w-5xl';
    case 'full': return 'max-w-full';
    default: return 'max-w-6xl'; // wide (default)
  }
};

// Bio section spacing control
const getBioSectionSpacing = (customization: CustomizationSettings): string => {
  switch (customization.bioSectionSpacing) {
    case 'compact': return 'py-3 space-y-2';
    case 'spacious': return 'py-6 space-y-6';
    default: return 'py-4 space-y-4'; // comfortable (default)
  }
};

// Create CustomizationContext for use in embedded components
const CustomizationContext = React.createContext<{customization: CustomizationSettings}>({
  customization: DEFAULT_CUSTOMIZATION
});

// Enhance the embedded media content with better height for videos/reels
const EmbeddedMediaContent: React.FC<{ content: ContentExample, user: User }> = ({ content, user }) => {
  const { customization } = useContext(CustomizationContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Add Twitter script loading effect
  useEffect(() => {
    if (content.platform === 'Twitter' || content.platform === 'X') {
      // Clean up URL if it has @ prefix
      let cleanUrl = content.url.trim();
      if (cleanUrl.startsWith('@')) {
        cleanUrl = cleanUrl.substring(1);
      }
      
      // Load Twitter widgets.js script if not already loaded
      if (!document.getElementById('twitter-widget-script')) {
        const script = document.createElement('script');
        script.id = 'twitter-widget-script';
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.charset = 'utf-8';
        document.body.appendChild(script);
        
        // Force Twitter widgets to process the page again
        if (window.twttr && window.twttr.widgets) {
          setTimeout(() => {
            window.twttr.widgets.load();
          }, 100);
        }
        
        return () => {
          // Optional: Remove the script when component unmounts if needed
          const existingScript = document.getElementById('twitter-widget-script');
          if (existingScript) {
            document.body.removeChild(existingScript);
          }
        };
      } else if (window.twttr && window.twttr.widgets) {
        // If script already exists, just process widgets
        setTimeout(() => {
          window.twttr.widgets.load();
        }, 100);
      }
    }
  }, [content.platform, content.url]);

  // Get the appropriate height based on platform
  const getEmbedHeight = (platform: string): string => {
    switch(platform) {
      case 'TikTok': return 'h-[750px]';
      case 'Instagram': 
        return content.url?.includes('/reel/') ? 'h-[750px]' : 'h-[650px]';
      case 'YouTube': return 'h-[400px] md:h-[500px]';
      default: return 'h-96';
    }
  };

  const getPlatformUrl = (url: string, platform: string): string => {
    try {
      const urlObj = new URL(url);
      if (platform === 'Instagram') {
        const idMatch = urlObj.pathname.match(/\/(reel|p)\/([^/?]+)/);
        const instagramId = idMatch ? idMatch[2] : null;
        if (instagramId) {
          return `https://www.instagram.com/p/${instagramId}/embed/`;
        } 
        // Fallback if ID extraction fails, try previous method (less reliable)
        console.warn("Could not extract Instagram ID from URL:", url, "Falling back to simple embed.");
        if (urlObj.pathname.includes('/p/') || urlObj.pathname.includes('/reel/')) {
          if (urlObj.pathname.endsWith('/embed/') || urlObj.pathname.endsWith('/embed')) {
            return url;
          }
          const basePath = urlObj.pathname.endsWith('/') ? urlObj.pathname : `${urlObj.pathname}/`;
          return `${urlObj.origin}${basePath}embed/`;
        }
        return url.includes('?') ? `${url}&embed=1` : `${url}?embed=1`;
      }
      
      if (platform === 'Twitter' || platform === 'X') {
        try {
          // Clean URL if it has @ prefix
          let cleanUrl = url.trim();
          if (cleanUrl.startsWith('@')) {
            cleanUrl = cleanUrl.substring(1);
          }
          
          // Ensure URL is properly formatted
          if (!cleanUrl.startsWith('http')) {
            cleanUrl = `https://${cleanUrl}`;
          }
          
          // Extract tweet ID using a more flexible regex that works with both twitter.com and x.com
          const tweetRegex = /(?:twitter|x)\.com\/([^\/]+)\/status(?:es)?\/(\d+)/i;
          const match = cleanUrl.match(tweetRegex);
          const tweetId = match ? match[2] : null;
          
          if (tweetId) {
            console.log("Successfully extracted tweet ID:", tweetId, "from URL:", cleanUrl);
            // Use the exact same embed URL format that's working in TwitterEmbed.tsx
            return `https://platform.twitter.com/embed/index.html?dnt=true&embedId=twitter-widget-0&frame=false&hideCard=false&hideThread=false&id=${tweetId}&lang=en&theme=${customization.theme || 'light'}&widgetsVersion=ed20a2b%3A1601588405575`;
          }
          
          console.warn("Could not extract Tweet ID from URL:", cleanUrl);
          return cleanUrl; // Return the cleaned URL as fallback
        } catch (e) {
          console.error("Error processing Twitter/X URL:", url, e);
          return url;
        }
      }
      
      // YouTube, TikTok and other platforms remain the same
      if (platform === 'YouTube') {
        if (urlObj.hostname === 'youtu.be') {
          return `https://www.youtube.com/embed${urlObj.pathname}`;
        }
        if (urlObj.pathname.startsWith('/embed/')) return url;
        const videoId = urlObj.searchParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      }
      if (platform === 'TikTok') {
        if (url.includes('/video/')) {
           const videoId = url.substring(url.lastIndexOf('/video/') + 7);
           return `https://www.tiktok.com/embed/v2/${videoId}`;
        }
        return url;
      }
      return url;
    } catch (e) {
      console.error("Error parsing or forming platform URL", e);
      return url;
    }
  };

  // Specific attributes for Twitter/X embeds
  const isTwitter = content.platform === 'Twitter' || content.platform === 'X';

  // For Twitter, return a simplified card that always works instead of relying on Twitter's embedding
  if (isTwitter) {
    // Clean URL if it has @ prefix
    let tweetUrl = content.url.trim();
    if (tweetUrl.startsWith('@')) {
      tweetUrl = tweetUrl.substring(1);
    }
    
    // Ensure URL is properly formatted
    if (!tweetUrl.startsWith('http')) {
      tweetUrl = `https://${tweetUrl}`;
    }
    
    // Extract tweet ID for display
    const tweetRegex = /(?:twitter|x)\.com\/([^\/]+)\/status(?:es)?\/(\d+)/i;
    const match = tweetUrl.match(tweetRegex);
    const username = match ? match[1] : 'twitter';
    
    return (
      <div className="twitter-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FiTwitter className="h-5 w-5 text-[#1DA1F2]" />
            <span className="font-medium">Twitter</span>
          </div>
          
          <a 
            href={tweetUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            <FiExternalLink className="h-4 w-4" />
          </a>
        </div>
        
        <div className="p-5">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <svg className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium mb-1">@{username}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {content.title || "View this tweet on Twitter/X"}
              </p>
              <a
                href={tweetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                <FiExternalLink className="mr-2 h-3.5 w-3.5" />
                View tweet
              </a>
            </div>
          </div>
        </div>
        
        {content.performanceMetrics && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800/50 flex space-x-3 text-xs text-gray-500 dark:text-gray-400">
            {content.performanceMetrics.views && (
              <div className="flex items-center">
                <FiVideo className="mr-1" size={12} />
                {content.performanceMetrics.views.toLocaleString()} views
              </div>
            )}
            {content.performanceMetrics.likes && (
              <div className="flex items-center">
                <FiHeart className="mr-1" size={12} />
                {content.performanceMetrics.likes.toLocaleString()} likes
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // For other platforms, use the iframe approach
  return (
    <div className={`relative overflow-hidden ${customization.cardStyle === 'sharp' ? '' : 'rounded-b-md'}`}> 
      {!isLoaded && (
        <div className={`w-full ${getEmbedHeight(content.platform)} flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse rounded-b-md`}>
          <FiPlayCircle className="h-16 w-16 text-gray-400 dark:text-gray-500" />
        </div>
      )}
      <iframe
        key={content.url}
        title={`${content.title} by ${user.name || user.username}`}
        src={getPlatformUrl(content.url, content.platform)}
        className={`w-full ${isLoaded ? getEmbedHeight(content.platform) : 'h-0 opacity-0'} transition-all duration-300 ease-in-out ${customization.cardStyle === 'sharp' ? '' : 'rounded-b-md'}`}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        frameBorder="0"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          console.warn(`Error loading iframe for ${content.url}`);
          setHasError(true);
        }}
        loading="lazy"
      ></iframe>
    </div>
  );
};

// Content Card
const ContentCard: React.FC<{
  content: ContentExample,
  customization: CustomizationSettings,
  user: User,
  glassEffect: string,
  cardStyle: React.CSSProperties,
  animationClasses: string,
  viewMode?: 'mobile' | 'desktop'
}> = ({ content, customization, user, glassEffect, cardStyle, animationClasses, viewMode }) => {

  const isTwitterPlatform = (content.platform === 'Twitter' || content.platform === 'X');
  const isInstagram = content.platform === 'Instagram';
  const isYouTube = content.platform === 'YouTube';
  const isTikTok = content.platform === 'TikTok';
  const isFacebook = content.platform === 'Facebook';
  const isLinkedIn = content.platform === 'LinkedIn';

  // Apply interactive effects from customization
  const interactiveClasses = customization.enableInteractiveElements 
    ? getInteractiveClasses(customization)
    : '';
  
  // Apply card tilt effect if enabled
  const tiltProps = customization.enableCardTiltEffect ? {
    'data-tilt': 'true',
    'data-tilt-max': '10',
    'data-tilt-speed': '400',
    'data-tilt-glare': 'true',
    'data-tilt-max-glare': '0.3'
  } : {};

  const cardClasses = `
    border rounded-lg overflow-hidden
    ${glassEffect}
    ${customization.enableHoverEffects ? animationClasses : ''}
    ${interactiveClasses}
    ${(customization.hideContentOnMobile && viewMode === 'mobile') ? 'hidden' : 'block'}
  `;

  const PlatformHeader = () => (
    <div className="flex items-center space-x-2 p-3 border-b bg-gray-50 dark:bg-gray-800/50" style={{borderColor: `rgba(var(--accent-rgb), ${customization.theme === 'dark' ? 0.2 : 0.1})`}}>
      <span className="flex-shrink-0 text-gray-600 dark:text-gray-300">
        {getSocialIcon(content.platform)}
      </span>
      <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{content.platform}</span>
      {content.url && (
        <a href={content.url} target="_blank" rel="noopener noreferrer" className="ml-auto text-xs" style={{color: 'var(--link-color)'}}>
          <FiExternalLink className="inline h-3 w-3" />
        </a>
      )}
    </div>
  );

  const SponsoredBadge = () => (
    content.sponsored && (
      <div className="absolute bottom-2 left-2 z-10">
        <Badge
          variant="outline"
          className={`
            bg-black/60 text-white border-none text-xs px-1.5 py-0.5
            ${customization.cardStyle === 'pill' ? 'rounded-full' : 'rounded-sm'}
          `}
        >
          <FiPackage className="mr-1 h-3 w-3" /> Sponsored
        </Badge>
      </div>
    )
  );

  const PerformanceMetrics = () => (
    content.performanceMetrics && (
      <div className="flex flex-wrap gap-x-3 gap-y-1 p-3 text-xs border-t text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50" style={{borderColor: `rgba(var(--accent-rgb), ${customization.theme === 'dark' ? 0.2 : 0.1})`}}>
        {content.performanceMetrics.views && (
          <div className="flex items-center">
            <FiVideo className="mr-1" size={12} />
            {content.performanceMetrics.views.toLocaleString()} views
          </div>
        )}
        {content.performanceMetrics.likes && (
          <div className="flex items-center">
            <FiHeart className="mr-1" size={12} />
            {content.performanceMetrics.likes.toLocaleString()} likes
          </div>
        )}
        {content.performanceMetrics.comments && (
          <div className="flex items-center">
            <FiMessageCircle className="mr-1" size={12} />
            {content.performanceMetrics.comments.toLocaleString()} comments
          </div>
        )}
        {content.performanceMetrics.shares && (
          <div className="flex items-center">
            <FiShare className="mr-1" size={12} />
            {content.performanceMetrics.shares.toLocaleString()} shares
          </div>
        )}
      </div>
    )
  );

  const ThumbnailView = () => (
    <a href={content.url} target="_blank" rel="noopener noreferrer" className="block relative h-40 group">
      {content.imageUrl ? (
        <Image
          src={content.imageUrl}
          alt={content.title || 'Content thumbnail'}
          fill
          className="object-cover"
        />
      ) : (
        <div className="h-full flex items-center justify-center text-4xl bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600">
          {getSocialIcon(content.platform)}
        </div>
      )}
      {(content.platform === 'YouTube' || content.platform === 'TikTok') && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
          <FiPlayCircle className="text-white h-12 w-12" />
        </div>
      )}
      <div className="absolute top-2 right-2 z-10">
        <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-black/60 text-white border-none">
          {content.platform}
        </Badge>
      </div>
      <SponsoredBadge />
      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
        <h3 className="text-white text-sm font-medium line-clamp-2">{content.title}</h3>
      </div>
    </a>
  );

  return (
    <Card 
      className={cardClasses}
      style={{
        ...cardStyle,
      }}
      {...tiltProps}
    >
      <PlatformHeader />

      {/* Embed wrapper */}
      <div className="relative w-full"> 
        {isTwitterPlatform && customization.enableEmbeddedContent !== false && (
          <TwitterEmbed url={content.url} />
        )}
        {isInstagram && customization.enableEmbeddedContent !== false && (
          <InstagramEmbed url={content.url} />
        )}
        {isYouTube && customization.enableEmbeddedContent !== false && (
          <YouTubeEmbed url={content.url} />
        )}
        {isTikTok && customization.enableEmbeddedContent !== false && (
          <TikTokEmbed url={content.url} />
        )}
        {isFacebook && customization.enableEmbeddedContent !== false && (
          <FacebookEmbed url={content.url} />
        )}
        {isLinkedIn && customization.enableEmbeddedContent !== false && (
          <LinkedInEmbed url={content.url} />
        )}
        {(!isTwitterPlatform && !isInstagram && !isYouTube && !isTikTok && !isFacebook && !isLinkedIn) && <ThumbnailView />}
        {customization.enableEmbeddedContent !== false && <SponsoredBadge />}
      </div>

      <PerformanceMetrics />
    </Card>
  );
};

// Partner Card
const PartnerCard: React.FC<{
  partner: Partner;
  customization: CustomizationSettings;
  glassEffect: string;
  animationClasses: string;
}> = ({ partner, customization, glassEffect, animationClasses }) => {
  return (
    <div
      className={`
        p-4 border rounded-lg ${glassEffect}
        ${customization.enableHoverEffects ? animationClasses : ''}
      `}
      style={{
        borderRadius: customization.cardStyle === 'pill' ? '16px' : getCardRadius(customization),
        borderColor: `rgba(var(--accent-rgb), ${customization.theme === 'dark' ? 0.3 : 0.2})`
      }}
    >
      <div className="flex items-start space-x-4">
        {partner.logoUrl && (
          <div className="flex-shrink-0">
            <div className="h-16 w-16 relative rounded border border-gray-200 dark:border-gray-700 overflow-hidden bg-white"> {/* Added bg-white for transparent logos */}
              <Image
                src={partner.logoUrl}
                alt={partner.company}
                fill
                className="object-contain p-1" // Added padding
              />
            </div>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate" style={{ color: 'var(--heading-color)' }}>{partner.company}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1" style={{ color: 'var(--body-color)' }}>{partner.description}</p>

          {partner.link && (
            <a
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center text-sm hover:underline" // Added hover effect
              style={{ color: 'var(--link-color)' }}
            >
              <FiExternalLink className="mr-1" size={14} /> Visit Partner
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Add this helper function for responsive content grid classes
const getContentGridClasses = (customization: CustomizationSettings): string => {
  // Add items-start to prevent grid items from stretching vertically
  const baseGridClasses = "grid items-start"; 

  switch (customization.contentGridLayout) {
    case 'minimal': 
      return `${baseGridClasses} grid-cols-1 sm:grid-cols-2 gap-4`;
    
    case 'expanded': 
      return `${baseGridClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`;
    
    case 'featured': 
      // First item is featured (larger) with the rest in a grid
      return 'grid grid-cols-1 gap-6 [&>*:first-child]:sm:col-span-2 [&>*:first-child]:sm:row-span-2 [&>*:first-child]:sm:scale-100 sm:grid-cols-2 lg:grid-cols-3';
    
    case 'masonry':
      // Pinterest-style masonry grid
      return 'columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 [&>*]:mb-4 [&>*]:break-inside-avoid [&>*]:inline-block [&>*]:w-full';
    
    case 'alternating':
      // Alternating full-width and two-column rows
      return 'grid grid-cols-1 md:grid-cols-2 gap-6 [&>*:nth-child(4n+1)]:md:col-span-2 [&>*:nth-child(4n+4)]:md:col-span-2';
    
    case 'interactive':
      // Interactive grid with hover effects
      return `${baseGridClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 [&>*]:transition-all [&>*]:duration-300 [&>*:hover]:scale-105 [&>*:hover]:shadow-lg [&>*:hover]:z-10 [&>*]:cursor-pointer`;
    
    default: // standard
      return `${baseGridClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`;
  }
};

// Add a new helper function to get layout classes based on layout option
const getLayoutClasses = (customization: CustomizationSettings): string => {
  switch (customization.layout) {
    case 'minimal':
      return 'max-w-3xl mx-auto space-y-8'; // Single-column, narrower with more spacing
    
    case 'centered':
      return 'max-w-4xl mx-auto text-center flex flex-col items-center space-y-10'; // Centered content, medium width
    
    case 'grid':
      return 'max-w-7xl mx-auto grid-focused grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'; // Wider container optimized for grid layouts
    
    case 'sidebar':
      // Fixed sidebar with main content properly positioned
      return 'max-w-6xl mx-auto md:flex md:gap-8 sidebar-layout'; // Flexible layout with sidebar
    
    case 'creator':
      // New layout focused on creator with profile pic at top and gradient into content
      return 'max-w-5xl mx-auto creator-layout space-y-12'; // Creative profile-focused layout
    
    case 'magazine':
      // Dynamic multi-column layout inspired by editorial design with proper spacing
      return 'max-w-6xl mx-auto magazine-layout md:columns-2 lg:columns-3 space-y-10 gap-8';
    
    case 'portfolio':
      // Image-focused layout ideal for visual creators with proper card alignment
      return 'max-w-7xl mx-auto portfolio-layout grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg';
    
    case 'creative':
      // Unique asymmetrical layout with creative positioning and improved styling
      return 'max-w-7xl mx-auto creative-layout grid grid-cols-1 md:grid-cols-6 gap-6 [&>section:nth-child(odd)]:md:col-span-4 [&>section:nth-child(even)]:md:col-span-2 [&>section:nth-child(3n)]:md:col-span-3 [&>section:nth-child(5n)]:md:col-span-6';
    
    case 'masonry':
      // Pinterest-style grid with varying heights and improved spacing
      return 'max-w-7xl mx-auto masonry-layout columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 [&>*]:mb-6 [&>*]:break-inside-avoid [&>*]:inline-block [&>*]:w-full';
    
    case 'fullscreen':
      // Immersive full-viewport sections with enhanced animations and transitions
      return 'max-w-none mx-auto fullscreen-layout space-y-24 [&>section]:min-h-[80vh] [&>section]:flex [&>section]:flex-col [&>section]:justify-center [&>section]:items-center [&>section]:p-12 [&>section]:relative [&>section]:rounded-lg [&>section]:shadow-lg [&>section]:overflow-hidden [&>section:nth-child(odd)]:bg-gradient-to-r [&>section:nth-child(odd)]:from-gray-50/80 [&>section:nth-child(odd)]:to-white/80 [&>section:nth-child(even)]:bg-gradient-to-l [&>section:nth-child(even)]:from-gray-50/80 [&>section:nth-child(even)]:to-white/80 dark:[&>section:nth-child(odd)]:from-gray-900/80 dark:[&>section:nth-child(odd)]:to-gray-800/80 dark:[&>section:nth-child(even)]:from-gray-900/80 dark:[&>section:nth-child(even)]:to-gray-800/80';
    
    case 'cards':
      // Content displayed as interactive cards with refined styling
      return 'max-w-6xl mx-auto cards-layout grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 [&>section]:bg-white [&>section]:dark:bg-gray-800 [&>section]:p-8 [&>section]:rounded-xl [&>section]:shadow-md [&>section]:border [&>section]:dark:border-gray-700 [&>section]:hover:shadow-lg [&>section]:transition-all [&>section]:duration-300';
    
    case 'carousel':
      // Horizontal scrolling sections with improved visual indicators
      return 'max-w-none mx-auto carousel-layout space-y-16 [&>section]:pb-4 [&>section]:relative [&>section:after]:content-[""] [&>section:after]:absolute [&>section:after]:bottom-0 [&>section:after]:left-0 [&>section:after]:right-0 [&>section:after]:h-1 [&>section:after]:bg-gradient-to-r [&>section:after]:from-transparent [&>section:after]:via-accent-color/30 [&>section:after]:to-transparent [&>section]:overflow-x-auto [&>section]:scrollbar-thin [&>section]:whitespace-nowrap [&>section]:scrollbar-thumb-gray-300 [&>section]:scrollbar-track-gray-100 [&>section]:dark:scrollbar-thumb-gray-600 [&>section]:dark:scrollbar-track-gray-800 [&>section]:p-4 [&>section>*]:inline-block [&>section>*]:whitespace-normal [&>section>*]:w-[280px] [&>section>*:not(:last-child)]:mr-6 [&>section]:after:z-10';
    
    default: // 'default'
      return 'max-w-6xl mx-auto standard-layout grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8'; // Standard two-column layout
  }
};

// Get additional styling for profile image based on customization
const getProfileImageClasses = (customization: CustomizationSettings): string => {
  // Shape
  let shapeClass = 'rounded-full'; // default circle
  if (customization.profileImageShape) {
    switch (customization.profileImageShape) {
      case 'square':
        shapeClass = 'rounded-none';
        break;
      case 'rounded':
        shapeClass = 'rounded-lg';
        break;
      case 'hexagon':
        shapeClass = 'clip-path-hexagon'; // Updated class for hexagon shape
        break;
      case 'circle':
      default:
        shapeClass = 'rounded-full';
        break;
    }
  }
  
  // Size
  let sizeClass = 'w-24 h-24'; // default medium
  if (customization.profileImageSize) {
    switch (customization.profileImageSize) {
      case 'small':
        sizeClass = 'w-16 h-16';
        break;
      case 'large':
        sizeClass = 'w-32 h-32';
        break;
      case 'custom':
        if (customization.customProfileImageSize) {
          const size = customization.customProfileImageSize;
          sizeClass = `w-[${size}px] h-[${size}px]`;
        } else {
          sizeClass = 'w-24 h-24';
        }
        break;
      case 'medium':
      default:
        sizeClass = 'w-24 h-24';
        break;
    }
  }
  
  // Border
  let borderClass = 'border-4 border-white dark:border-gray-800';
  if (customization.profileImageBorderWidth !== undefined) {
    borderClass = `border-[${customization.profileImageBorderWidth}px] border-white dark:border-gray-800`;
  }
  
  return `${shapeClass} ${sizeClass} ${borderClass} object-cover shadow-lg`;
};

// Get image filter style based on customization
const getImageFilterStyle = (customization: CustomizationSettings): React.CSSProperties => {
  if (!customization.imageFilter || customization.imageFilter === 'none') {
    return {};
  }
  
  switch (customization.imageFilter) {
    case 'grayscale':
      return { filter: 'grayscale(100%)' };
    case 'sepia':
      return { filter: 'sepia(80%)' };
    case 'blur':
      return { filter: 'blur(1px)' };
    case 'brightness':
      return { filter: 'brightness(120%)' };
    case 'contrast':
      return { filter: 'contrast(120%)' };
    case 'hue-rotate':
      return { filter: 'hue-rotate(90deg)' };
    case 'custom':
      if (customization.customImageFilter) {
        return { filter: customization.customImageFilter };
      }
      return {};
    default:
      return {};
  }
};

// Get interactive element classes based on customization
const getInteractiveClasses = (customization: CustomizationSettings): string => {
  if (!customization.enableInteractiveElements) {
    return '';
  }
  
  switch (customization.interactiveElementStyle) {
    case 'hover':
      return 'hover:scale-105 hover:shadow-md transition-all duration-300';
    case 'click':
      return 'active:scale-95 transition-all duration-300';
    case 'scroll':
      return 'scroll-reveal'; // This would need special handling
    case 'custom':
      return 'custom-interactive'; // This would need special handling
    default:
      return 'hover:scale-105 hover:shadow-md transition-all duration-300';
  }
};

// Get section entrance animation classes based on customization
const getSectionEntranceAnimationClasses = (customization: CustomizationSettings): string => {
  if (!customization.enableSectionEntranceAnimations) {
    return '';
  }

  const baseClass = 'transition-all duration-700';
  
  switch (customization.sectionEntranceAnimationStyle) {
    case 'fade':
      return `${baseClass} animate-fade-in`;
    case 'slide':
      return `${baseClass} animate-slide-up`;
    case 'zoom':
      return `${baseClass} animate-zoom-in`;
    case 'flip':
      return `${baseClass} animate-flip`;
    default:
      return `${baseClass} animate-fade-in`;
  }
};

// Get scroll effects classes based on customization
const getScrollEffectClasses = (customization: CustomizationSettings): string => {
  if (!customization.scrollEffects || customization.scrollEffects === 'none') {
    return '';
  }
  
  switch (customization.scrollEffects) {
    case 'fade':
      return 'scroll-fade';
    case 'reveal':
      return 'scroll-reveal';
    case 'parallax':
      return 'scroll-parallax';
    case 'zoom':
      return 'scroll-zoom';
    case 'blur':
      return 'scroll-blur';
    default:
      return '';
  }
};

// --- Main User Profile Content Component ---

export const UserProfileContent: React.FC<UserProfileContentProps> = ({ user, customization, viewMode }) => {
  // Standardize viewMode: if undefined (public page), default to 'desktop' behavior for all components
  const effectiveViewMode = viewMode || 'desktop';
  
  // Apply default customization if not provided
  const mergedCustomization = {
    ...DEFAULT_CUSTOMIZATION,
    ...customization
  };
  
  // Apply container and layout styles
  const containerStyle = getContainerStyle(mergedCustomization);
  const layoutClasses = getLayoutClasses(mergedCustomization);
  
  // Get profile image styling
  const profileImageClasses = getProfileImageClasses(mergedCustomization);
  const imageFilterStyle = getImageFilterStyle(mergedCustomization);
  
  // Get interactive elements styling
  const interactiveClasses = getInteractiveClasses(mergedCustomization);

  // Set up CSS variables for consistent styling
  const customStyles = {
    '--accent-color': mergedCustomization.accentColor,
    '--accent-rgb': hexToRgb(mergedCustomization.accentColor),
    '--secondary-color': mergedCustomization.secondaryColor || mergedCustomization.accentColor,
    '--heading-color': mergedCustomization.headingColor || (mergedCustomization.theme === 'dark' ? '#f3f4f6' : '#1f2937'),
    '--body-color': mergedCustomization.bodyTextColor || (mergedCustomization.theme === 'dark' ? '#d1d5db' : '#4b5563'),
    '--link-color': mergedCustomization.linkTextColor || mergedCustomization.accentColor,
    '--border-color': `rgba(var(--accent-rgb), ${mergedCustomization.theme === 'dark' ? 0.3 : 0.2})`,
    '--creator-text-color': mergedCustomization.theme === 'dark' ? '#ffffff' : '#1f2937',
    '--creator-secondary-text-color': mergedCustomization.theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(31, 41, 55, 0.8)',
    fontFamily: getFontFamily(mergedCustomization.fontFamily),
  } as React.CSSProperties;

  // Get content width class for responsive layout
  const contentWidthClass = getContentWidthClass(mergedCustomization);
  
  // Get card style with enhanced customization
  const cardStyle = getCardStyles(mergedCustomization);
  
  // Get glass effect classes
  const glassEffect = getGlassmorphismClasses(mergedCustomization);
  
  // Get animation classes
  const animationClasses = getAnimationClasses(mergedCustomization);

  // *** Reinstated: Get the background container style (for page background) ***
  const containerStyleForPage = getContainerStyle(mergedCustomization);
  
  // *** Reinstated: Get the cover image style (for profile header) ***
  const coverImageStyle = mergedCustomization.coverImageUrl ? {
    backgroundImage: `url(${mergedCustomization.coverImageUrl})`,
    backgroundSize: mergedCustomization.coverImageStretch ? 'cover' : 'contain', // Use stretch property
    backgroundPosition: 'center',
    backgroundRepeat: mergedCustomization.coverImageStretch ? 'no-repeat' : 'repeat', // Use stretch property
    height: getCoverImageHeight(mergedCustomization),
    position: 'relative' as const
  } : {
    background: `linear-gradient(to right, ${mergedCustomization.accentColor}, ${mergedCustomization.secondaryColor || mergedCustomization.accentColor})`,
    height: getCoverImageHeight(mergedCustomization),
    position: 'relative' as const
  };

  // Add darkened overlay if enabled
  if (mergedCustomization.coverDarken && mergedCustomization.coverImageUrl) {
    // Ensure backgroundImage is initialized before modifying
    coverImageStyle.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${mergedCustomization.coverImageUrl})`;
  }
  
  // Make profile card completely opaque (0% transparency)
  const profileCardStyle = {
    ...cardStyle,
    backgroundColor: mergedCustomization.theme === 'dark' 
      ? 'rgb(24, 24, 27)' // Completely opaque dark
      : 'rgb(255, 255, 255)', // Completely opaque light
    backdropFilter: 'none', // Disable backdrop filter for complete opacity
    WebkitBackdropFilter: 'none', // For Safari support
    // Ensure border properties are correctly inherited or set if needed
    borderColor: cardStyle.borderColor, 
    borderWidth: cardStyle.borderWidth,
  };

  // Bio section spacing class
  const bioSectionSpacingClass = getBioSectionSpacing(mergedCustomization);

  // Map section keys to rendering functions
  const renderSection: Record<ContentSectionOption, () => React.ReactNode> = {
    socialStats: () => user?.socialMedia && Array.isArray(user.socialMedia) && user.socialMedia.length > 0 && (
      <Card className={`${customization.enableHoverEffects ? animationClasses : ''}`} style={cardStyle}>
        <CardHeader className="p-4">
          <CardTitle style={{ color: 'var(--heading-color)' }}>Social Media Stats</CardTitle>
          <CardDescription>Follower counts and engagement rates</CardDescription>
        </CardHeader>
        <CardContent className="p-5">
          <div className={`
            ${customization.socialDisplayStyle === 'simple'
              ? 'flex flex-wrap gap-6'
              : customization.socialDisplayStyle === 'cards'
                ? 'grid grid-cols-1 md:grid-cols-3 gap-6'
                : 'grid grid-cols-1 md:grid-cols-3 gap-6' // Default is cards
            }
          `}>
            {user.socialMedia.map((social, index) => {
              if (!social.platform || !social.followerCount) return null;

              if (customization.socialDisplayStyle === 'simple') {
                return (
                  <div key={index} className="flex items-center space-x-3 py-2">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                      {getSocialIcon(social.platform)}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{social.platform}</div>
                      <div className="font-semibold text-lg">{social.followerCount.toLocaleString()}</div>
                    </div>
                  </div>
                );
              }

              // Detailed cards (default)
              return (
                <div
                  key={index}
                  className={`
                    p-6 border rounded-lg flex flex-col items-center
                    ${glassEffect}
                    ${animationClasses}
                  `}
                  style={{
                    borderRadius: customization.cardStyle === 'pill' ? '16px' : getCardRadius(customization),
                    borderColor: 'var(--border-color)'
                  }}
                >
                  <div className="mb-3 font-medium flex items-center">
                    <div className="mr-2 text-gray-800 dark:text-gray-200 text-xl">
                      {getSocialIcon(social.platform)}
                    </div>
                    <span className="text-lg">{social.platform}</span>
                  </div>
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: 'var(--accent-color)' }}
                  >
                    {social.followerCount.toLocaleString()}
                  </div>
                  {social.engagementRate && (
                    <div className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                      {social.engagementRate}% Engagement
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    ),
    socialLinks: () => user?.socialMedia && Array.isArray(user.socialMedia) && user.socialMedia.filter(s => s.url).length > 0 && (
      <Card className={`${customization.enableHoverEffects ? animationClasses : ''}`} style={cardStyle}>
        <CardHeader className="p-4">
          <CardTitle style={{ color: 'var(--heading-color)' }}>Connect with Me</CardTitle>
          <CardDescription>Find me on other platforms</CardDescription>
        </CardHeader>
        <CardContent className="p-5">
          <div className="flex flex-wrap gap-4">
            {user.socialMedia
              .filter(social => social.url)
              .map((social, index) => (
                <Button
                  key={index}
                  asChild
                  size="lg"
                  className={`${getPrimaryButtonClasses(customization.buttonStyle)} ${customization.cardStyle === 'pill' ? 'rounded-full' : ''}`}
                  style={{
                    color: getButtonContrastColor(customization.buttonStyle, customization.theme),
                    background: customization.buttonStyle === 'gradient'
                      ? `linear-gradient(to right, ${customization.accentColor}, ${customization.secondaryColor || customization.accentColor})`
                      : customization.buttonStyle !== 'outline' ? customization.accentColor : undefined,
                    borderColor: customization.buttonStyle === 'outline' ? customization.accentColor : undefined,
                    padding: '0.75rem 1.25rem'
                  }}
                >
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <div className="mr-2 h-5 w-5">{getSocialIcon(social.platform)}</div>
                    {social.platform}
                  </a>
                </Button>
              ))}
          </div>
        </CardContent>
      </Card>
    ),
    content: () => user?.contentExamples && Array.isArray(user.contentExamples) && user.contentExamples.length > 0 && (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--heading-color)' }}>
          Featured Content
        </h2>
        <div className={getContentGridClasses(mergedCustomization)}>
          {user.contentExamples.map((example, index) => (
            <ContentCard 
              key={`${example.url}-${index}`}
              content={example} 
              customization={mergedCustomization} 
              user={user}
              glassEffect={glassEffect}
              cardStyle={cardStyle}
              animationClasses={animationClasses}
              viewMode={effectiveViewMode}
            />
          ))}
        </div>
      </section>
    ),
    testimonials: () => user?.testimonials && Array.isArray(user.testimonials) && user.testimonials.length > 0 && (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--heading-color)' }}>
          Client Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.testimonials.map((testimonial, i) => (
            <Card key={i} className={`overflow-hidden ${glassEffect} ${animationClasses}`} style={cardStyle}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <Avatar className="h-12 w-12 border-2" style={{ borderColor: 'var(--accent-color)' }}>
                      {testimonial.logo ? (
                        <AvatarImage src={testimonial.logo} alt={testimonial.company} />
                      ) : (
                        <AvatarFallback>{testimonial.company.substring(0, 2)}</AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 dark:text-gray-300 mb-3 italic" style={{ color: 'var(--body-color)' }}>
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div>
                      <p className="font-semibold" style={{ color: 'var(--heading-color)' }}>{testimonial.company}</p>
                      {testimonial.personName && (
                        <p className="text-sm" style={{ color: 'var(--body-color)' }}>{testimonial.personName}, {testimonial.position}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    ),
    services: () => user?.services && Array.isArray(user.services) && user.services.length > 0 && (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--heading-color)' }}>
          Services & Rates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.services.map((service, i) => (
            <Card key={i} className={`overflow-hidden ${glassEffect} ${animationClasses}`} style={cardStyle}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle style={{ color: 'var(--heading-color)' }}>{service.name}</CardTitle>
                  {service.price && (
                    <Badge variant="outline" className="text-sm font-medium" 
                      style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}>
                      {service.price}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300" style={{ color: 'var(--body-color)' }}>
                  {service.description}
                </p>
                {service.deliverables && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {service.deliverables.map((item: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        {item}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    ),
    partnerships: () => user?.partners && Array.isArray(user.partners) && user.partners.length > 0 && (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--heading-color)' }}>
          Brand Partnerships
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.partners.map((partner, i) => (
            <PartnerCard
              key={i}
              partner={partner}
              customization={mergedCustomization}
              glassEffect={glassEffect}
              animationClasses={animationClasses}
            />
          ))}
        </div>
      </section>
    ),
    contact: () => (
      // Placeholder - Add contact form or info here if needed later
      null
    ),
    gallery: () => null,
    schedule: () => null,
    pricing: () => null,
    newsletter: () => null,
    achievements: () => null,
    reviews: () => null
  };

  // Function to render sections based on order
  const renderOrderedSections = () => {
    // Get section animation classes
    const sectionAnimationClasses = getSectionEntranceAnimationClasses(mergedCustomization);
    const scrollEffectClasses = getScrollEffectClasses(mergedCustomization);
    
    // Get the content section order from customization, fallback to default order
    const orderedSections = mergedCustomization.contentSectionOrder || DEFAULT_CUSTOMIZATION.contentSectionOrder || [];
    
    // Only render sections that have content
    return orderedSections
      .filter(sectionKey => {
        // Skip sections with no content
        if (sectionKey === 'socialStats' && (!user?.socialMedia || user.socialMedia.length === 0)) return false;
        if (sectionKey === 'socialLinks' && (!user?.socialMedia || user.socialMedia.filter(s => s.url).length === 0)) return false;
        if (sectionKey === 'content' && (!user?.contentExamples || user.contentExamples.length === 0)) return false;
        if (sectionKey === 'testimonials' && (!user?.testimonials || user.testimonials.length === 0)) return false;
        if (sectionKey === 'services' && (!user?.services || user.services.length === 0)) return false;
        if (sectionKey === 'partnerships' && (!user?.partners || user.partners.length === 0)) return false;
        
        return true;
      })
      .map((sectionKey, index) => (
        <div 
          key={sectionKey}
          className={`${sectionAnimationClasses} ${scrollEffectClasses}`}
          style={{ 
            animationDelay: `${index * 0.15}s`,
            ...(mergedCustomization.sectionAlignment ? { textAlign: mergedCustomization.sectionAlignment } : {})
          }}
        >
          {renderSection[sectionKey]()}
        </div>
      ));
  };

  // Consolidate layout dispatch
  const layoutProps = {
    user,
    customization: mergedCustomization,
    viewMode: effectiveViewMode,
    containerStyle,
    coverImageStyle,
    cardStyle,
    glassEffect,
    animationClasses,
    contentWidthClass,
    profileImageClasses,
    renderOrderedSections,
    renderSection
  };

  // Always wrap in global CSS variables and render the appropriate layout
  return (
    <div className={`w-full ${mergedCustomization.theme === 'dark' ? 'dark' : ''}`} style={customStyles}>
      <style jsx global>{`
        /* Universal layout global styles */
        .clip-path-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        /* Sidebar layout styles */
        .sidebar-layout .profile-sidebar {
          position: sticky;
          top: 1rem;
          height: max-content;
        }
        /* Magazine layout styles */
        .magazine-layout > section {
          break-inside: avoid;
          page-break-inside: avoid;
          margin-bottom: 2rem;
        }
        /* Creator layout gradient animation */
        .creator-gradient {
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
          background-image: linear-gradient(45deg, var(--accent-color) 0%, var(--secondary-color) 50%, var(--accent-color) 100%);
        }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; }}
        /* Masonry layout fix */
        .masonry-layout > section { break-inside: avoid; margin-bottom: 1.5rem; }
        /* Carousel layout scrollbar */
        .carousel-layout > section { scrollbar-width: thin; -ms-overflow-style: none; }
        .carousel-layout > section::-webkit-scrollbar { height: 6px; }
        .carousel-layout > section::-webkit-scrollbar-thumb { background-color: var(--accent-color); opacity: 0.5; border-radius: 9999px; }
        /* Fullscreen layout */
        .fullscreen-layout > section { min-height: 90vh; position: relative; border-radius: 0.5rem; margin-bottom: 2rem; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); }
        /* Creative layout styling */
        .creative-layout > section { padding: 1.5rem; border-radius: 0.5rem; background-color: white; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); }
        .dark .creative-layout > section { background-color: rgb(30, 30, 30); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); }
        /* Standard layout base styles */
        .standard-layout { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 1024px) { .standard-layout { grid-template-columns: 2fr 3fr; gap: 2rem; } }
      `}</style>
      <LayoutWrapper {...layoutProps} />
    </div>
  );
};

// Export the component itself if needed elsewhere, or just keep it internal
// export default UserProfileContent; 