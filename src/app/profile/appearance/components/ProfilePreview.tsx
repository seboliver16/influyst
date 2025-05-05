"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { User, Partner, ContentExample, ServiceOffering, Testimonial } from '../../../user';
import { CustomizationSettings, ContentGridOption, ContentSectionOption, DEFAULT_CUSTOMIZATION } from '../../../types/customization';
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
  FiShare
} from 'react-icons/fi';
import { 
  RiTiktokFill
} from 'react-icons/ri';
import { getPrimaryButtonClasses, getButtonContrastColor, getSecondaryButtonClasses } from "../../../../lib/utils";

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

interface ProfilePreviewProps {
  user: User;
  customization: CustomizationSettings;
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ user, customization }) => {
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('desktop');
  
  // When customization changes, update the scroll position to show the impact
  useEffect(() => {
    if (previewContainerRef.current) {
      // Reset scroll position to top when customization changes
      previewContainerRef.current.scrollTop = 0;
    }
  }, [customization]);

  // Define font family
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

  // Define animations based on customization settings
  const getAnimationClasses = () => {
    switch (customization.animations) {
      case 'none': return '';
      case 'moderate': return 'transition-all duration-500 hover:scale-[1.02] hover:shadow-lg';
      case 'advanced': return 'transition-all duration-500 hover:scale-[1.03] hover:shadow-xl transform-gpu';
      default: return 'transition-all duration-300 hover:scale-[1.01] hover:shadow-sm'; // minimal
    }
  };

  // Get card border radius
  const getCardRadius = () => {
    switch (customization.cardStyle) {
      case 'sharp': return '0px';
      case 'pill': return '24px';
      case 'neumorphic': return '1rem';
      default: return '0.5rem'; // rounded
    }
  };
  
  // Get border width 
  const getBorderWidth = () => {
    switch (customization.borderWidth) {
      case 'none': return '0px';
      case 'medium': return '2px';
      case 'thick': return '3px';
      default: return '1px'; // thin
    }
  };
  
  // Get card style including shadows, etc.
  const getCardStyles = () => {
    const baseStyle = {
      borderRadius: 'var(--card-radius)',
      borderWidth: 'var(--border-width)',
    };
    
    switch (customization.cardStyle) {
      case 'neumorphic':
        return {
          ...baseStyle,
          boxShadow: customization.theme === 'dark' 
            ? '5px 5px 10px #1a1a1a, -5px -5px 10px #333333'
            : '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff',
          background: customization.theme === 'dark' ? '#2a2a2a' : '#f0f0f0',
          border: 'none'
        };
      case 'sharp':
        return {
          ...baseStyle,
          boxShadow: 'none'
        };
      default:
        return baseStyle;
    }
  };

  // Get the social icon component based on platform name
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <FiInstagram />;
      case 'youtube': return <FiYoutube />;
      case 'twitter': return <FiTwitter />;
      case 'tiktok': return <RiTiktokFill />;
      default: return <FiGlobe />;
    }
  };

  // Extract RGB values from hex color for CSS variables
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '99, 102, 241'; // Default indigo color
  };

  // Create customization styles with RGB values for transparency operations
  const customStyles = {
    '--accent-color': customization.accentColor,
    '--accent-rgb': hexToRgb(customization.accentColor),
    '--secondary-color': customization.secondaryColor || customization.accentColor,
    '--secondary-rgb': hexToRgb(customization.secondaryColor || customization.accentColor),
    '--heading-color': customization.headingColor || (customization.theme === 'dark' ? '#ffffff' : '#1f2937'),
    '--body-color': customization.bodyTextColor || (customization.theme === 'dark' ? '#e5e7eb' : '#4b5563'),
    '--link-color': customization.linkTextColor || customization.accentColor,
    '--card-radius': getCardRadius(),
    '--border-width': getBorderWidth(),
    fontFamily: getFontFamily(customization.fontFamily),
  } as React.CSSProperties;

  // Get the background container style (for page background)
  const containerStyle = customization.backgroundImageUrl ? {
    backgroundImage: `url(${customization.backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  // Get the cover image style (for profile header)
  const coverImageStyle = customization.coverImageUrl ? {
    backgroundImage: `url(${customization.coverImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {
    background: `linear-gradient(to right, ${customization.accentColor}, ${customization.secondaryColor || customization.accentColor})`
  };

  // Toggle between mobile and desktop preview
  const toggleViewMode = () => {
    setViewMode(viewMode === 'mobile' ? 'desktop' : 'mobile');
  };

  // Get glass morphism effect classes if enabled
  const getGlassmorphismClasses = () => {
    return customization.enableBackdropFilter 
      ? 'backdrop-blur-md bg-white/50 dark:bg-gray-900/60 border border-white/20 dark:border-gray-800/30'
      : '';
  };

  // Define container classes based on view mode
  const getContainerClasses = () => {
    if (viewMode === 'mobile') {
      // Add transition properties for smoother switching
      return 'w-full max-w-[375px] aspect-[375/667] mx-auto border-[14px] md:border-[16px] border-gray-800 rounded-[28px] md:rounded-[36px] overflow-hidden shadow-xl relative transition-[max-width,aspect-ratio] duration-500 ease-in-out';
    }
    // Keep desktop view responsive, add transition
    return 'w-full max-w-6xl mx-auto relative rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 transition-[max-width,aspect-ratio] duration-500 ease-in-out';
  };
  
  // Get browser style URL bar for the preview
  const getUrlBar = () => {
    const baseDomain = 'influyst.com';
    const usernamePath = user?.username || 'profile';
    // Construct URL using custom path if available
    const url = customization.customUrlPath 
      ? `${baseDomain}/${usernamePath}/${customization.customUrlPath}`
      : `${baseDomain}/${usernamePath}`;
      
    return (
      <div className={`
        h-10 bg-gray-100 dark:bg-gray-800 
        flex items-center px-3 border-b 
        border-gray-200 dark:border-gray-700
        ${viewMode === 'mobile' ? 'rounded-t-xl' : 'rounded-t-md'}
      `}>
        <div className="flex space-x-2 mr-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className={`
          flex-1 mx-2 bg-white dark:bg-gray-700 text-sm px-3 py-1 
          rounded-full flex items-center justify-between
          border border-gray-300 dark:border-gray-600
        `}>
          <div className="flex items-center text-gray-600 dark:text-gray-300 truncate">
            <FiGlobe className="mr-2 h-3 w-3" />
            <span className="text-xs">{url}</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 text-gray-400 hover:text-gray-600 cursor-pointer">⭐</span>
          </div>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <FiGrid className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  };
  
  // Get mobile status bar
  const getMobileStatusBar = () => {
    return viewMode === 'mobile' && (
      <div className="h-6 bg-black text-white flex items-center justify-between px-4 text-xs">
        <div>9:41</div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-3 bg-white rounded-sm"></div>
          <div className="text-xs">100%</div>
        </div>
      </div>
    );
  };
  
  // Get mobile home indicator (bottom bar)
  const getMobileHomeIndicator = () => {
    return viewMode === 'mobile' && (
      <div className="h-6 bg-black flex items-center justify-center">
        <div className="w-1/3 h-1 bg-white rounded-full"></div>
      </div>
    );
  };

  // New component for embedded media support
  const EmbeddedMediaContent: React.FC<{ content: ContentExample }> = ({ content }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const getPlatformUrl = (url: string, platform: string): string => {
      try {
        // Extract ID from various platform URLs
        if (platform === 'Instagram') {
          // Support both /p/ and /reel/ formats
          if (url.includes('/p/') || url.includes('/reel/')) {
            const urlParts = url.split('/');
            const postId = urlParts[urlParts.indexOf('p') + 1] || urlParts[urlParts.indexOf('reel') + 1];
            return `https://www.instagram.com/p/${postId}/embed`;
          }
          return url;
        } else if (platform === 'Twitter') {
          const tweetIdMatch = url.match(/status\/(\d+)/);
          const tweetId = tweetIdMatch ? tweetIdMatch[1] : url.split('/').pop();
          return tweetId ? `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}` : url;
        } else if (platform === 'YouTube') {
          if (url.includes('youtube.com/watch')) {
            const videoId = new URL(url).searchParams.get('v');
            return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
          } else if (url.includes('youtu.be')) {
            const videoId = url.split('/').pop()?.split('?')[0];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
          }
          return url;
        } else if (platform === 'TikTok') {
          const urlParts = url.split('/');
          const videoIdx = urlParts.findIndex(part => part === 'video');
          if (videoIdx !== -1 && videoIdx < urlParts.length - 1) {
            const videoId = urlParts[videoIdx + 1]?.split('?')[0];
            return videoId ? `https://www.tiktok.com/embed/v2/${videoId}` : url;
          }
          return url;
        }
        return url;
      } catch (error) {
        console.error('Error parsing URL:', url, error);
        setHasError(true);
        return url;
      }
    };

    const embedUrl = getPlatformUrl(content.url, content.platform);

    if (!embedUrl || hasError) {
      return (
        <div className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400 text-sm text-center px-2">
            Unable to load content from {content.platform}.<br/>
            {content.url && <a href={content.url} target="_blank" rel="noopener noreferrer" className="underline" style={{color: 'var(--link-color)'}}>View original</a>}
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-full">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="w-8 h-8 border-4 border-t-accent rounded-full animate-spin" style={{borderColor: 'rgba(var(--accent-rgb), 0.2)', borderTopColor: 'var(--accent-color)'}}></div>
          </div>
        )}
        <iframe
          key={embedUrl}
          src={embedUrl}
          className={`w-full ${content.platform === 'TikTok' ? 'h-[600px]' : 'h-[450px]'} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity`}
          frameBorder="0"
          allowFullScreen
          allow="autoplay; encrypted-media;"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            console.error("Iframe load error:", e);
            setHasError(true);
            setIsLoaded(true);
          }}
        />
      </div>
    );
  };

  // Updated ContentCard to match public profile
  const ContentCard: React.FC<{ 
    content: ContentExample,
    customization: CustomizationSettings,
    glassEffect: string,
    cardStyle: React.CSSProperties
  }> = ({ content, customization, glassEffect, cardStyle }) => {
    
    const cardClasses = `
      border rounded-lg overflow-hidden 
      ${glassEffect}
      ${customization.enableHoverEffects 
        ? 'transition-shadow duration-300 hover:shadow-lg' 
        : ''}
      ${(customization.hideContentOnMobile && viewMode === 'mobile') ? 'hidden' : 'block'}
    `;
    
    const PlatformHeader = () => (
      <div className="flex items-center space-x-2 p-3 border-b bg-gray-50 dark:bg-gray-800/50" style={{borderColor: 'var(--border-color)'}}>
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
    
    // Generate sponsored badge if applicable
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
    
    // Performance metrics display
    const PerformanceMetrics = () => (
      content.performanceMetrics && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 p-3 text-xs border-t text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50" style={{borderColor: 'var(--border-color)'}}>
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

    // Placeholder/Thumbnail view when embeds are disabled
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
      <div className={`${cardClasses} ${getAnimationClasses()}`} style={cardStyle}>
        <PlatformHeader />
        <div className="relative">
          {customization.enableEmbeddedContent !== false ? (
            <EmbeddedMediaContent content={content} />
          ) : (
            <ThumbnailView />
          )}
          {customization.enableEmbeddedContent !== false && <SponsoredBadge />} 
        </div>
        <PerformanceMetrics />
      </div>
    );
  };

  // Enhance the Partnerships section with a new component
  const PartnerCard: React.FC<{
    partner: Partner;
    customization: CustomizationSettings;
    glassEffect: string;
  }> = ({ partner, customization, glassEffect }) => {
    return (
      <div 
        className={`
          p-4 border rounded-lg ${glassEffect}
          ${customization.enableHoverEffects ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-md' : ''}
        `}
                            style={{ 
          borderRadius: customization.cardStyle === 'pill' ? '16px' : undefined,
          borderColor: `rgba(var(--accent-rgb), 0.2)`
                            }}
                          >
        <div className="flex items-start space-x-4">
          {partner.logoUrl && (
            <div className="flex-shrink-0">
              <div className="h-16 w-16 relative rounded border border-gray-200 dark:border-gray-700 overflow-hidden">
                <Image 
                  src={partner.logoUrl} 
                  alt={partner.company} 
                  fill
                  className="object-contain"
                />
                          </div>
                      </div>
                    )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{partner.company}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{partner.description}</p>
            
            {partner.link && (
              <a
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center text-sm"
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

  // Map section keys to rendering functions
  const sectionRenderers: Record<ContentSectionOption, () => React.ReactNode> = {
    socialStats: () => user?.socialMedia && Array.isArray(user.socialMedia) && user.socialMedia.length > 0 && (
      <Card className={`border-[color:var(--border-width)] ${getAnimationClasses()}`} style={getCardStyles()}>
                        <CardHeader className="p-4">
                          <CardTitle style={{ color: 'var(--heading-color)' }}>Social Media Stats</CardTitle>
                          <CardDescription>Follower counts and engagement rates</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className={`
                            ${customization.socialDisplayStyle === 'simple' 
                              ? 'flex flex-wrap gap-4' 
                              : customization.socialDisplayStyle === 'cards'
                                ? 'grid grid-cols-1 md:grid-cols-3 gap-4'
                                : 'grid grid-cols-1 md:grid-cols-3 gap-4'
                            }
                          `}>
                            {user.socialMedia.map((social, index) => {
                              // Only display social media with platforms and follower counts
                              if (!social.platform || !social.followerCount) return null;
                              
                              // Simple style
                              if (customization.socialDisplayStyle === 'simple') {
                                return (
                                  <div key={index} className="flex items-center space-x-3">
                                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                                      {getSocialIcon(social.platform)}
                                    </div>
                                    <div>
                                      <div className="text-sm text-gray-500 dark:text-gray-400">{social.platform}</div>
                                      <div className="font-semibold">{social.followerCount.toLocaleString()}</div>
                                    </div>
                                  </div>
                                );
                              }
                              
                              // Detailed cards (default)
                              return (
                                <div 
                                  key={index} 
                                  className={`
                                    p-4 border rounded-lg flex flex-col items-center
                                    ${getGlassmorphismClasses()}
                                  `}
                                  style={{ 
                                    borderRadius: customization.cardStyle === 'pill' ? '16px' : undefined,
                                    borderColor: `rgba(var(--accent-rgb), 0.2)`
                                  }}
                                >
                                  {/* Platform-specific icon */}
                                  <div className="mb-2 font-medium flex items-center">
                                    <div className="mr-1 text-gray-800 dark:text-gray-200">
                                      {getSocialIcon(social.platform)}
                                    </div>
                                    <span>{social.platform}</span>
                                  </div>
                                  <div 
                                    className="text-2xl font-bold" 
                                    style={{ color: 'var(--accent-color)' }}
                                  >
                                    {social.followerCount.toLocaleString()}
                                  </div>
                                  {social.engagementRate && (
                                    <div className="text-sm mt-1 text-gray-500 dark:text-gray-400">
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
      <Card className={`border-[color:var(--border-width)] ${getAnimationClasses()}`} style={getCardStyles()}>
        <CardHeader className="p-4">
          <CardTitle style={{ color: 'var(--heading-color)' }}>Connect with Me</CardTitle>
          <CardDescription>Find me on other platforms</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            {user.socialMedia
              .filter(social => social.url) // Ensure URL exists
              .map((social, index) => (
                <Button
                  key={index}
                  asChild // Render as an anchor tag
                  className={`${getPrimaryButtonClasses(customization.buttonStyle)} ${customization.cardStyle === 'pill' ? 'rounded-full' : ''}`}
                  style={{ 
                    color: getButtonContrastColor(customization.buttonStyle, customization.theme),
                    background: customization.buttonStyle === 'gradient' 
                      ? `linear-gradient(to right, ${customization.accentColor}, ${customization.secondaryColor || customization.accentColor})`
                      : undefined,
                    borderColor: customization.buttonStyle === 'outline' ? customization.accentColor : undefined
                  }}
                >
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <div className="mr-2 h-4 w-4">{getSocialIcon(social.platform)}</div>
                    {social.platform} 
                  </a>
                </Button>
              ))}
          </div>
        </CardContent>
      </Card>
    ),
    content: () => user?.contentExamples && Array.isArray(user.contentExamples) && user.contentExamples.length > 0 && (
      <Card className={`border-[color:var(--border-width)] ${getAnimationClasses()}`} style={getCardStyles()}>
                        <CardHeader className="p-4">
                          <CardTitle style={{ color: 'var(--heading-color)' }}>Featured Content</CardTitle>
                          <CardDescription>Examples of my work</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className={`
                            grid
                            ${customization.contentGridLayout === 'minimal' 
              ? 'grid-cols-1 gap-4 md:grid-cols-2' // Increased gap
                              : customization.contentGridLayout === 'expanded'
                ? 'grid-cols-1 gap-6' // Increased gap
                                : customization.contentGridLayout === 'featured'
                  ? 'grid-cols-1 md:grid-cols-2 gap-4' // Standard gap
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' // Default, standard gap
                            }
                          `}>
                            {user.contentExamples.map((content, index) => (
              <ContentCard 
                                key={index} 
                content={content}
                customization={customization}
                glassEffect={getGlassmorphismClasses()}
                // Pass the appropriate border radius based on cardStyle
                cardStyle={{ borderRadius: getCardRadius() }} 
              />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
    ),
    testimonials: () => user?.testimonials && Array.isArray(user.testimonials) && user.testimonials.length > 0 && (
      <Card className={`border-[color:var(--border-width)] ${getAnimationClasses()}`} style={getCardStyles()}>
                        <CardHeader className="p-4">
                          <CardTitle style={{ color: 'var(--heading-color)' }}>Client Testimonials</CardTitle>
                          <CardDescription>What brands say about working with me</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {user.testimonials.map((testimonial, index) => (
                              <div 
                                key={index} 
                                className={`
                                  p-4 border rounded-lg
                                  ${getGlassmorphismClasses()}
                                `}
                                style={{ 
                                  borderRadius: customization.cardStyle === 'pill' ? '16px' : undefined,
                                  borderColor: `rgba(var(--accent-rgb), 0.2)`
                                }}
                              >
                                <p className="italic mb-3">&quot;{testimonial.text}&quot;</p>
                                <div className="flex items-center">
                                  {testimonial.logo && (
                                    <div className="mr-2 h-8 w-8 relative">
                                      <Image 
                                        src={testimonial.logo} 
                                        alt={testimonial.company} 
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-semibold">{testimonial.company}</p>
                                    {testimonial.personName && (
                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {testimonial.personName}, {testimonial.position}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
    ),
    services: () => user?.services && Array.isArray(user.services) && user.services.length > 0 && (
      <Card className={`border-[color:var(--border-width)] ${getAnimationClasses()}`} style={getCardStyles()}>
                        <CardHeader className="p-4">
                          <CardTitle style={{ color: 'var(--heading-color)' }}>Services</CardTitle>
                          <CardDescription>What I offer</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {user.services.map((service, index) => (
                              <div 
                                key={index} 
                                className={`
                                  p-4 border rounded-lg
                                  ${getGlassmorphismClasses()}
                                `}
                                style={{ 
                                  borderRadius: customization.cardStyle === 'pill' ? '16px' : undefined,
                                  borderColor: `rgba(var(--accent-rgb), 0.2)`
                                }}
                              >
                <h3 className="font-medium">{service.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{service.description}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
    ),
    partnerships: () => user?.partners && Array.isArray(user.partners) && user.partners.length > 0 && (
      <Card className={`border-[color:var(--border-width)] ${getAnimationClasses()}`} style={getCardStyles()}>
                        <CardHeader className="p-4">
                          <CardTitle style={{ color: 'var(--heading-color)' }}>Partnerships</CardTitle>
          <CardDescription>Brands I&apos;ve worked with</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {user.partners.map((partner, index) => (
              <PartnerCard
                                key={index} 
                partner={partner}
                customization={customization}
                glassEffect={getGlassmorphismClasses()}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    ),
    contact: () => (
      // Placeholder for potential Contact section
      null // Or render a contact form/info if available
    ),
  };

  // Function to render sections based on order
  const renderOrderedSections = () => {
    // Use default order if none is set in customization
    const order = customization.contentSectionOrder || DEFAULT_CUSTOMIZATION.contentSectionOrder || [];
    return order.map(sectionKey => {
      const renderFunc = sectionRenderers[sectionKey];
      return renderFunc ? <React.Fragment key={sectionKey}>{renderFunc()}</React.Fragment> : null;
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center mb-4 space-x-3 relative">
        {/* New styled device switcher */}
        <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setViewMode('mobile')}
                                className={`
              rounded-full flex items-center px-3
              ${viewMode === 'mobile' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'bg-transparent'}
              transition-all duration-200
            `}
          >
            <FiSmartphone className="mr-2 h-4 w-4" />
            Mobile
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setViewMode('desktop')}
            className={`
              rounded-full flex items-center px-3
              ${viewMode === 'desktop' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'bg-transparent'}
              transition-all duration-200
            `}
          >
            <FiMonitor className="mr-2 h-4 w-4" />
            Desktop
          </Button>
        </div>
        
        {/* Device info label */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
            {viewMode === 'mobile' ? (
              <>
                <FiSmartphone className="mr-1 h-3 w-3" />
                375 × 667
              </>
            ) : (
              <>
                <FiMonitor className="mr-1 h-3 w-3" />
                Responsive
              </>
            )}
          </span>
        </div>
      </div>

      {/* Apply container classes and transitions */}
      <div className={`${getContainerClasses()} bg-white dark:bg-gray-900`}>
        {/* Browser Chrome */}
        {getUrlBar()}
        
        {/* Mobile Status Bar */}
        {getMobileStatusBar()}
        
        {/* Main Content Container */}
        <div 
          ref={previewContainerRef}
          className={`
            flex flex-col h-full overflow-y-auto
            ${customization.theme === 'dark' ? 'dark bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}
          `}
          style={{ ...customStyles, ...containerStyle }}
        >
          {/* Main Content */}
          <main className="flex-grow">
            {/* Profile Header */}
            <section>
              {/* Cover Image/Gradient - Now using coverImageUrl if available */}
              <div 
                className="h-28 sm:h-40 lg:h-52 w-full" 
                style={coverImageStyle}
              >
                {/* Optional overlay for better text readability */}
                {customization.coverImageUrl && customization.coverDarken && (
                  <div className="w-full h-full bg-black bg-opacity-30"></div>
                )}
              </div>

              {/* Profile Content */}
              <div className="px-4 relative">
                {/* Profile Picture */}
                <div className={`
                  ${customization.profileHeaderStyle === 'minimal' ? 'absolute -top-10 left-4' : 
                    customization.profileHeaderStyle === 'compact' ? 'absolute -top-12 left-4' :
                    customization.profileHeaderStyle === 'expanded' ? 'absolute -top-24 left-1/2 transform -translate-x-1/2' :
                    'absolute -top-16 left-4 md:left-6 lg:left-8'}
                `}>
                  <div className={`
                    ${customization.profileHeaderStyle === 'minimal' ? 'w-20 h-20' :
                      customization.profileHeaderStyle === 'compact' ? 'w-24 h-24' :
                      customization.profileHeaderStyle === 'expanded' ? 'w-36 h-36' :
                      'w-28 h-28 md:w-32 md:h-32'
                    }
                    rounded-full border-4 overflow-hidden
                  `} style={{ borderColor: 'var(--accent-color)' }}>
                    <div className="relative w-full h-full">
                      {user?.profilePicture ? (
                        <Image 
                          src={user.profilePicture} 
                          alt={user?.name || 'User'} 
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-xl md:text-2xl font-semibold">
                          {user?.name?.charAt(0) || 'S'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className={`
                  ${customization.profileHeaderStyle === 'minimal' ? 'pt-3 pl-24' :
                    customization.profileHeaderStyle === 'compact' ? 'pt-4 pl-28' :
                    customization.profileHeaderStyle === 'expanded' ? 'pt-16 text-center' :
                    'pt-16 md:pt-4 md:pl-36'}
                  pb-4
                `}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--heading-color)' }}>
                        {user?.name || 'User'}
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400">
                        @{user?.username || 'username'}
                      </p>
                      
                      {user?.location && (
                        <p className="text-sm flex items-center mt-1 text-gray-500 dark:text-gray-400">
                          <FiMapPin className="inline mr-1" size={14} />
                          {user.location}
                        </p>
                      )}
                      
                      {user?.experienceSince && (
                        <p className="text-sm flex items-center mt-1 text-gray-500 dark:text-gray-400">
                          <FiCalendar className="inline mr-1" size={14} />
                          Creator since {user.experienceSince}
                        </p>
                      )}
                    </div>
                    
                    {/* Quick Action Buttons - Only shown on larger screens and in certain header styles */}
                    {(customization.profileHeaderStyle !== 'minimal' && customization.profileHeaderStyle !== 'expanded') && (
                      <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                        {user?.email && user?.contactPreferences?.publicEmail !== false && (
                          <Button
                            size="sm"
                            className={`${getPrimaryButtonClasses(customization.buttonStyle)} ${customization.cardStyle === 'pill' ? 'rounded-full' : ''}`}
                            style={{ 
                              color: getButtonContrastColor(customization.buttonStyle, customization.theme),
                              minWidth: '80px',
                              background: customization.buttonStyle === 'gradient' 
                                ? `linear-gradient(to right, ${customization.accentColor}, ${customization.secondaryColor || customization.accentColor})`
                                : undefined,
                              borderColor: customization.buttonStyle === 'outline' ? customization.accentColor : undefined
                            }}
                          >
                            <FiMail className="mr-2" size={14} />
                            Contact
                          </Button>
                        )}
                        
                        {user?.socialMedia && Array.isArray(user.socialMedia) && user.socialMedia.length > 0 && customization.showPlatformIcons && customization.socialDisplayStyle === 'iconOnly' && (
                          <div className="flex space-x-2">
                            {user.socialMedia.map((social, idx) => (
                              <Button
                                key={idx}
                                size="icon"
                                variant="ghost"
                                className="h-9 w-9 rounded-full text-gray-600 dark:text-gray-300 hover:text-accent hover:dark:text-accent"
                              >
                                {getSocialIcon(social.platform)}
                              </Button>
                            ))}
                              </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {user?.bio && (
                    <p className="mt-3" style={{ color: 'var(--body-color)' }}>{user.bio}</p>
                  )}
                  
                  {user?.industries && Array.isArray(user.industries) && user.industries.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {user.industries.map((industry, index) => (
                        <Badge 
                          key={index}
                          variant={customization.buttonStyle === 'outline' ? 'outline' : 'default'}
                          style={{ 
                            backgroundColor: customization.buttonStyle === 'gradient' || customization.buttonStyle === 'outline' 
                              ? undefined 
                              : customization.accentColor,
                            background: customization.buttonStyle === 'gradient' 
                              ? `linear-gradient(to right, ${customization.accentColor}, ${customization.secondaryColor || customization.accentColor})` 
                              : undefined,
                            borderColor: customization.buttonStyle === 'outline' ? customization.accentColor : undefined,
                            color: customization.buttonStyle === 'outline' ? customization.accentColor : 'white'
                          }}
                          className={`${customization.cardStyle === 'pill' ? 'rounded-full' : ''}`}
                        >
                          {industry}
                        </Badge>
                            ))}
                          </div>
                  )}
                </div>
              </div>
            </section>

            {/* Main Content Sections - Rendered Dynamically */}
            <section className={`px-4 pb-6 ${customization.layout === 'centered' ? 'max-w-3xl mx-auto' : ''}`}>
              <div className={`
                ${customization.layout === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : customization.layout === 'minimal'
                    ? 'space-y-6'
                    : 'grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6' // Default (sidebar layout)
                }
              `}>
                {/* Sidebar Column (for default layout) */} 
                {customization.layout === 'default' && (
                   <aside className="lg:col-span-4 space-y-6">
                     {/* Placeholder for potential sidebar content or maybe first few sections? */}
                     {/* Example: Render first 2 sections in sidebar? */}
                     {renderOrderedSections().slice(0, 2)}
                   </aside>
                )}
                
                {/* Main Column */}
                <div className={`
                  ${customization.layout === 'grid' 
                    ? 'col-span-full'
                    : customization.layout === 'minimal' || customization.layout === 'centered'
                      ? '' // Takes full width implicitly
                      : 'lg:col-span-8 space-y-6' // Main content takes 8 columns in default layout
                  }
                  ${customization.layout !== 'grid' && 'space-y-6'} // Apply spacing if not grid
                `}>
                  {/* Render sections based on order */}
                  {customization.layout === 'default' 
                     ? renderOrderedSections().slice(2) // Render remaining sections in main col for default layout
                     : renderOrderedSections() // Render all sections for other layouts
                  }
                </div>

              </div>
            </section>
          </main>
        </div>
        
        {/* Mobile Home Indicator */}
        {getMobileHomeIndicator()}
      </div>
    </div>
  );
};

export default ProfilePreview; 