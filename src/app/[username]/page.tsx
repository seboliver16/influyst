"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore/lite";
import firebase_app from "../firebase/config";
import { User, Partner, ContentExample, ServiceOffering, Testimonial } from "../user";
import Image from "next/image";
import Link from "next/link";
import { 
  FiMail, 
  FiCopy, 
  FiExternalLink,
  FiInstagram, 
  FiYoutube, 
  FiTwitter, 
  FiGlobe,
  FiHeart,
  FiMapPin,
  FiCalendar,
  FiPackage,
  FiMessageCircle,
  FiVideo,
  FiShare,
  FiPlayCircle
} from "react-icons/fi";
import { RiTiktokFill } from 'react-icons/ri';
import { AiOutlineCloud } from "react-icons/ai";
import UserNotFound from "../../components/UserNotFound";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCustomizationSettingsByUsername } from "../firebase/customization";
import { CustomizationSettings, ContentSectionOption, ThemeOption, DEFAULT_CUSTOMIZATION } from "../types/customization";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from 'react';
import { getPrimaryButtonClasses, getButtonContrastColor, getSecondaryButtonClasses } from "../../lib/utils";

export default function UserProfilePage() {
  const pathname = usePathname();
  const username = pathname ? pathname.split("/")[1] : "";
  const [userData, setUserData] = useState<User | null>(null);
  const [customization, setCustomization] = useState<CustomizationSettings>(DEFAULT_CUSTOMIZATION);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const userDocRef = doc(db, 'users', authUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            setCurrentUser(userDocSnap.data() as User);
          }
        } catch (error) {
          console.error("Error fetching current user data:", error);
        }
      } else {
        setCurrentUser(null);
      }
    });
    
    return () => unsubscribe();
  }, [auth, db]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (username) {
        setLoading(true);
        try {
          const db = getFirestore(firebase_app);
          const usersCollection = collection(db, "users");
          const userQuery = query(usersCollection, where("username", "==", username));
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const fetchedUserData = userDoc.data() as User;
            setUserData(fetchedUserData);
            
            const customSettings = await getCustomizationSettingsByUsername(username);
            setCustomization(customSettings);
            
            setNotFound(false);
          } else {
            console.log("No user found with the provided username");
            setNotFound(true);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [username]);

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

  const getAnimationClasses = () => {
    switch (customization.animations) {
      case 'none': return '';
      case 'moderate': return 'transition-all duration-500 hover:scale-[1.02] hover:shadow-lg';
      case 'advanced': return 'transition-all duration-500 hover:scale-[1.03] hover:shadow-xl transform-gpu';
      default: return 'transition-all duration-300 hover:scale-[1.01] hover:shadow-sm';
    }
  };

  const hexToRgb = (hex: string) => {
    if (!hex) return '99, 102, 241';
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '99, 102, 241';
  };

  const getButtonClasses = (theme: ThemeOption) => {
    const resolvedTheme = theme === 'system' ? 'light' : theme;
    const isDark = resolvedTheme === 'dark';
    
    switch (customization.buttonStyle) {
      case 'outline':
        return 'bg-transparent border-2 border-accent hover:bg-accent/10';
      case 'subtle':
        return 'bg-accent/10 hover:bg-accent/20';
      case 'gradient':
        return 'bg-gradient-to-r from-accent to-secondary text-white shadow-sm';
      case 'glassmorphic':
        return 'bg-accent/20 backdrop-blur-lg border border-accent/20 hover:bg-accent/30';
      case 'shadow':
        return 'bg-accent text-white shadow-lg shadow-accent/30 hover:shadow-accent/50';
      case 'glow':
        return 'bg-accent text-white shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)] hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.7)]';  
      default:
        return 'bg-accent text-white hover:bg-accent/90';
    }
  };
  
  const getSecondaryButtonClasses = () => {
    switch (customization.buttonStyle) {
      case 'outline':
        return 'bg-transparent border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800';
      case 'subtle':
        return 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700';
      case 'gradient':
        return 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200';
      case 'glassmorphic':
        return 'bg-white/10 dark:bg-black/20 backdrop-blur-lg border border-white/20 dark:border-gray-700/30';
      case 'shadow':
        return 'bg-white dark:bg-gray-800 shadow-md hover:shadow-lg';
      case 'glow':
        return 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-[0_0_10px_rgba(255,255,255,0.3)] dark:shadow-[0_0_10px_rgba(0,0,0,0.3)]';
      default:
        return 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700';
    }
  };

    const getCardRadius = () => {
      switch (customization.cardStyle) {
        case 'sharp': return '0px';
        case 'pill': return '24px';
        case 'neumorphic': return '1rem';
      default: return '0.5rem';
      }
    };
    
    const getBorderWidth = () => {
      switch (customization.borderWidth) {
        case 'none': return '0px';
        case 'medium': return '2px';
        case 'thick': return '3px';
      default: return '1px';
    }
  };
  
  const getCardStyles = () => {
    const baseStyle = {
      borderRadius: 'var(--card-radius)',
      borderWidth: 'var(--border-width)',
      borderColor: 'var(--border-color)',
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

  const getSocialIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case 'instagram': return <FiInstagram />;
      case 'youtube': return <FiYoutube />;
      case 'twitter': return <FiTwitter />;
      case 'tiktok': return <RiTiktokFill />;
      default: return <FiGlobe />;
    }
  };

  const getGlassmorphismClasses = () => {
    return customization.enableBackdropFilter 
      ? 'backdrop-blur-md bg-white/50 dark:bg-gray-900/60 border border-white/20 dark:border-gray-800/30'
      : '';
  };

  const customStyles = useMemo(() => {
    const accentRgb = hexToRgb(customization.accentColor);
    const secondaryRgb = hexToRgb(customization.secondaryColor || customization.accentColor);
    const isDark = customization.theme === 'dark';
    
    return {
      '--accent-color': customization.accentColor || '#6366f1',
      '--accent-rgb': accentRgb,
      '--secondary-color': customization.secondaryColor || customization.accentColor || '#6366f1',
      '--secondary-rgb': secondaryRgb,
      '--heading-color': customization.headingColor || (isDark ? '#ffffff' : '#1f2937'),
      '--body-color': customization.bodyTextColor || (isDark ? '#e5e7eb' : '#4b5563'),
      '--link-color': customization.linkTextColor || customization.accentColor || '#6366f1',
      '--card-radius': getCardRadius(),
      '--border-width': getBorderWidth(),
      '--border-color': isDark ? '#4b5563' : '#e5e7eb',
      fontFamily: getFontFamily(customization.fontFamily),
    } as React.CSSProperties;
  }, [customization]);

  const containerStyle = useMemo(() => {
    if (customization.backgroundImageUrl) {
      return {
        backgroundImage: `url(${customization.backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      };
    }
    return customization.theme === 'dark' 
     ? { background: 'linear-gradient(to bottom, #111827, #0f172a)'}
     : { background: 'linear-gradient(to bottom, #f9fafb, #f3f4f6)'};
  }, [customization.backgroundImageUrl, customization.theme]);
  
  const coverImageStyle = useMemo(() => {
     return customization.coverImageUrl ? {
      backgroundImage: `url(${customization.coverImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    } : {
      background: `linear-gradient(to right, var(--accent-color), var(--secondary-color))`
    };
  }, [customization.coverImageUrl, customization.accentColor, customization.secondaryColor]);

  const copyEmailToClipboard = () => {
    if (userData?.email) {
      navigator.clipboard.writeText(userData.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  const EmbeddedMediaContent: React.FC<{ content: ContentExample }> = ({ content }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const getPlatformUrl = (url: string, platform: string): string => {
      try {
        if (!url || !platform) return '';
        if (platform === 'Instagram') {
          if (url.includes('/p/') || url.includes('/reel/')) {
            const urlParts = url.split('/');
            const pIndex = urlParts.indexOf('p');
            const reelIndex = urlParts.indexOf('reel');
            const postId = pIndex !== -1 ? urlParts[pIndex + 1] : (reelIndex !== -1 ? urlParts[reelIndex + 1] : null);
            return postId ? `https://www.instagram.com/p/${postId}/embed` : url;
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

  const PartnerCard: React.FC<{
    partner: Partner;
    customization: CustomizationSettings;
    glassEffect: string;
    cardStyle: React.CSSProperties;
  }> = ({ partner, customization, glassEffect, cardStyle }) => {
    // Determine text color based on theme for better contrast
    const linkColor = customization.theme === 'dark' ? 'var(--link-color)' : '#4b5563'; // Use gray-600 in light mode

  return (
    <div 
      className={`
          p-4 border rounded-lg ${glassEffect}
          ${customization.enableHoverEffects ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-md' : ''}
        `}
        style={cardStyle}
      >
        <div className="flex items-start space-x-4">
          {partner.logoUrl && (
            <div className="flex-shrink-0">
              <div className="h-16 w-16 relative rounded border border-gray-200 dark:border-gray-700 overflow-hidden" style={{borderColor: 'var(--border-color)'}}>
                 <Image 
                  src={partner.logoUrl} 
                  alt={partner.company} 
                  fill
                  className="object-contain p-1"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate" style={{ color: 'var(--heading-color)' }}>{partner.company}</h3>
            <p className="text-sm mt-1" style={{ color: 'var(--body-color)' }}>{partner.description}</p>
            
            {partner.link && (
              <a
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center text-sm hover:underline"
                style={{ color: linkColor }}
              >
                <FiExternalLink className="mr-1" size={14} /> Visit Partner
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  const TestimonialCard: React.FC<{
    testimonial: Testimonial;
    customization: CustomizationSettings;
    glassEffect: string;
    cardStyle: React.CSSProperties;
  }> = ({ testimonial, customization, glassEffect, cardStyle }) => {
     return (
       <div 
         className={`
           p-4 border rounded-lg
           ${glassEffect}
           ${customization.enableHoverEffects ? 'transition-shadow duration-300 hover:shadow-md' : ''}
         `}
         style={cardStyle}
       >
         <p className="italic mb-3" style={{ color: 'var(--body-color)' }}>&quot;{testimonial.text}&quot;</p>
         <div className="flex items-center mt-3 pt-3 border-t" style={{borderColor: 'var(--border-color)'}}>
           {testimonial.logo && (
             <div className="mr-3 flex-shrink-0">
               <div className="h-10 w-10 relative rounded-full overflow-hidden border" style={{borderColor: 'var(--border-color)'}}>
                <Image 
                   src={testimonial.logo} 
                   alt={`${testimonial.company} logo`} 
                   fill
                   className="object-contain"
                   sizes="40px"
                />
              </div>
            </div>
           )}
              <div>
             <p className="font-semibold" style={{ color: 'var(--heading-color)' }}>{testimonial.company}</p>
             {testimonial.personName && (
               <p className="text-sm text-gray-500 dark:text-gray-400">
                 {testimonial.personName}{testimonial.position ? `, ${testimonial.position}` : ''}
               </p>
             )}
                  </div>
              </div>
            </div>
     );
   };
   
   const ServiceCard: React.FC<{
     service: ServiceOffering;
     customization: CustomizationSettings;
     glassEffect: string;
     cardStyle: React.CSSProperties;
   }> = ({ service, customization, glassEffect, cardStyle }) => {
     return (
       <div 
         className={`
           p-4 border rounded-lg
           ${glassEffect}
           ${customization.enableHoverEffects ? 'transition-shadow duration-300 hover:shadow-md' : ''}
         `}
         style={cardStyle}
       >
         <h3 className="font-medium" style={{ color: 'var(--heading-color)' }}>{service.name}</h3>
         <p className="text-sm mt-1" style={{ color: 'var(--body-color)' }}>{service.description}</p>
       </div>
     );
   };

  const sectionRenderers: Record<ContentSectionOption, () => React.ReactNode> = {
    socialStats: () => userData?.socialMedia && Array.isArray(userData.socialMedia) && userData.socialMedia.length > 0 && (
      <Card className={`border ${getAnimationClasses()}`} style={getCardStyles()}>
        <CardHeader className="p-4">
                  <CardTitle style={{ color: 'var(--heading-color)' }}>Social Media Stats</CardTitle>
                </CardHeader>
        <CardContent className="p-4">
          <div className={`
            ${customization.socialDisplayStyle === 'simple' 
              ? 'flex flex-wrap gap-4' 
              : customization.socialDisplayStyle === 'cards'
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
                : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
            }
          `}>
                    {userData.socialMedia.map((social, index) => {
                      if (!social.platform || !social.followerCount) return null;
                      
              if (customization.socialDisplayStyle === 'simple') {
                      return (
                  <div key={index} className="flex items-center space-x-3">
                     <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xl">
                      {getSocialIcon(social.platform)}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{social.platform}</div>
                      <div className="font-semibold" style={{color: 'var(--heading-color)'}}>{social.followerCount.toLocaleString()}</div>
                    </div>
                  </div>
                );
              }
              
              return (
                <div 
                  key={index} 
                  className={`
                    p-4 border rounded-lg flex flex-col items-center text-center
                    ${getGlassmorphismClasses()}
                  `}
                  style={{ 
                     borderRadius: getCardRadius(),
                     borderColor: `rgba(var(--accent-rgb), 0.2)`
                  }}
                >
                  <div className="mb-2 font-medium flex items-center text-xl" style={{color: 'var(--heading-color)'}}>
                     <div className="mr-1">
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
                  <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">Followers</div>
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
    socialLinks: () => userData?.socialMedia && Array.isArray(userData.socialMedia) && userData.socialMedia.filter(s => s.url).length > 0 && (
      <Card className={`border ${getAnimationClasses()}`} style={getCardStyles()}>
        <CardHeader className="p-4">
          <CardTitle style={{ color: 'var(--heading-color)' }}>Connect with Me</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            {userData.socialMedia
              .filter(social => social.url) 
              .map((social, index) => (
                <Button
                  key={index}
                  asChild 
                  variant={customization.buttonStyle === 'outline' ? 'outline' : 'default'}
                  className={`${getButtonClasses(customization.theme)} ${customization.cardStyle === 'pill' ? 'rounded-full' : ''}`}
                  style={{ 
                     color: ['filled', 'gradient', 'shadow', 'glow'].includes(customization.buttonStyle) 
                        ? (customization.theme === 'dark' ? '#ffffff' : '#ffffff')
                        : 'var(--accent-color)', 
                     background: customization.buttonStyle === 'gradient' 
                      ? `linear-gradient(to right, var(--accent-color), var(--secondary-color))`
                      : (customization.buttonStyle === 'filled' ? 'var(--accent-color)' : undefined),
                     borderColor: customization.buttonStyle === 'outline' ? 'var(--accent-color)' : undefined,
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
    content: () => userData?.contentExamples && Array.isArray(userData.contentExamples) && userData.contentExamples.length > 0 && (
      <Card className={`border ${getAnimationClasses()}`} style={getCardStyles()}>
        <CardHeader className="p-4">
          <CardTitle style={{ color: 'var(--heading-color)' }}>Featured Content</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className={`
            grid gap-4 md:gap-6 
            ${customization.contentGridLayout === 'minimal' 
              ? 'grid-cols-1 md:grid-cols-2' 
              : customization.contentGridLayout === 'expanded'
                ? 'grid-cols-1'
                : customization.contentGridLayout === 'featured'
                  ? 'grid-cols-1'
                  : 'grid-cols-1 md:grid-cols-2'
            }
          `}>
            {userData.contentExamples
              .map((content, index) => (
                <ContentCard 
                  key={index} 
                  content={content}
                  customization={customization}
                  glassEffect={getGlassmorphismClasses()}
                  cardStyle={getCardStyles()}
                />
              ))}
          </div>
        </CardContent>
      </Card>
    ),
    testimonials: () => userData?.testimonials && Array.isArray(userData.testimonials) && userData.testimonials.length > 0 && (
      <Card className={`border ${getAnimationClasses()}`} style={getCardStyles()}>
        <CardHeader className="p-4">
                  <CardTitle style={{ color: 'var(--heading-color)' }}>Client Testimonials</CardTitle>
                </CardHeader>
        <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                customization={customization}
                glassEffect={getGlassmorphismClasses()}
                cardStyle={getCardStyles()}
              />
                    ))}
                  </div>
                </CardContent>
              </Card>
    ),
    services: () => userData?.services && Array.isArray(userData.services) && userData.services.length > 0 && (
      <Card className={`border ${getAnimationClasses()}`} style={getCardStyles()}>
        <CardHeader className="p-4">
          <CardTitle style={{ color: 'var(--heading-color)' }}>Services</CardTitle>
                </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {userData.services.map((service, index) => (
               <ServiceCard
                 key={index}
                 service={service}
                 customization={customization}
                 glassEffect={getGlassmorphismClasses()}
                 cardStyle={getCardStyles()}
               />
                    ))}
                  </div>
                </CardContent>
              </Card>
    ),
    partnerships: () => userData?.partners && Array.isArray(userData.partners) && userData.partners.length > 0 && (
      <Card className={`border ${getAnimationClasses()}`} style={getCardStyles()}>
        <CardHeader className="p-4">
          <CardTitle style={{ color: 'var(--heading-color)' }}>Partnerships</CardTitle>
          <CardDescription style={{ color: 'var(--body-color)' }}>Brands I&apos;ve worked with</CardDescription>
                </CardHeader>
        <CardContent className="p-4">
           <div className={`grid grid-cols-1 ${userData.partners.length > 1 ? 'md:grid-cols-2' : ''} gap-4`}>
                    {userData.partners.map((partner, index) => (
              <PartnerCard
                key={index} 
                partner={partner}
                customization={customization}
                glassEffect={getGlassmorphismClasses()}
                cardStyle={getCardStyles()}
              />
                    ))}
                  </div>
                </CardContent>
              </Card>
    ),
     contact: () => null 
  };

  const renderOrderedSections = () => {
    const order = customization?.contentSectionOrder || DEFAULT_CUSTOMIZATION.contentSectionOrder || [];
    
    if (!userData) return null; 
    
    return order.map(sectionKey => {
      const renderFunc = sectionRenderers[sectionKey];
      if (sectionKey === 'socialStats' && (!userData.socialMedia || userData.socialMedia.length === 0)) return null;
      if (sectionKey === 'socialLinks' && (!userData.socialMedia || userData.socialMedia.filter(s => s.url).length === 0)) return null;
      if (sectionKey === 'content' && (!userData.contentExamples || userData.contentExamples.length === 0)) return null;
      if (sectionKey === 'testimonials' && (!userData.testimonials || userData.testimonials.length === 0)) return null;
      if (sectionKey === 'services' && (!userData.services || userData.services.length === 0)) return null;
      if (sectionKey === 'partnerships' && (!userData.partners || userData.partners.length === 0)) return null;
      
      return renderFunc ? <React.Fragment key={sectionKey}>{renderFunc()}</React.Fragment> : null;
    });
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100 dark:bg-gray-900">
         <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
         <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Profile...</p>
      </div>
    );
  }

  if (notFound) {
    return <UserNotFound username={username} />;
  }

  return (
    <div 
      className={`flex flex-col min-h-screen overflow-y-auto ${customization.theme === 'dark' ? 'dark' : ''}`}
      style={{ ...customStyles, ...containerStyle }}
    >
      {currentUser && currentUser.username === username && (
        <header className="fixed top-0 left-0 right-0 p-3 z-50 bg-yellow-300 text-yellow-900 text-center text-sm shadow">
          You are viewing your public profile. 
          <Link href="/profile/appearance" className="font-semibold underline ml-2 hover:text-yellow-700">
             Edit Appearance
          </Link>
          <Link href="/dashboard" className="font-semibold underline ml-4 hover:text-yellow-700">
             Go to Dashboard
          </Link>
        </header>
      )}

      <main className={`flex-grow container mx-auto px-4 py-8 max-w-5xl ${currentUser && currentUser.username === username ? 'pt-16' : 'pt-8'}`}> 
        <section className="mb-8">
           <Card className={`overflow-hidden border ${getAnimationClasses()}`} style={getCardStyles()}>
             <div 
                className="h-32 sm:h-48 w-full" 
                style={coverImageStyle}
              >
                 {customization.coverImageUrl && customization.coverDarken && (
                  <div className="w-full h-full bg-black bg-opacity-30"></div>
                )}
                      </div>

             <CardContent className="p-6 relative">
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
                      'w-28 h-28 md:w-32 md:h-32'}
                    rounded-full border-4 overflow-hidden bg-gray-200 dark:bg-gray-700
                  `} style={{ borderColor: 'var(--accent-color)' }}>
                    <div className="relative w-full h-full">
                       {userData?.profilePicture ? (
                        <Image 
                          src={userData.profilePicture} 
                          alt={userData?.name || 'User'} 
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 128px, 144px"
                          priority
                        />
                      ) : (
                         <div className="w-full h-full flex items-center justify-center text-3xl md:text-4xl font-semibold" style={{color: 'var(--accent-color)'}}>
                          {userData?.name?.charAt(0).toUpperCase() || userData?.username?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`
                  ${customization.profileHeaderStyle === 'minimal' ? 'pt-12 pl-24' :
                    customization.profileHeaderStyle === 'compact' ? 'pt-14 pl-28' :
                    customization.profileHeaderStyle === 'expanded' ? 'pt-16 text-center' :
                    'pt-16 md:pt-6 md:pl-40'}
                  pb-4
                `}>
                   <div className={`flex flex-col ${customization.profileHeaderStyle !== 'expanded' ? 'md:flex-row md:justify-between md:items-start' : ''}`}>
                     <div className={`${customization.profileHeaderStyle === 'expanded' ? 'flex flex-col items-center' : ''}`}>
                       <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--heading-color)' }}>
                        {userData?.name || userData?.username || 'User Profile'}
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400">
                        @{userData?.username || 'username'}
                      </p>
                      
                      {userData?.location && (
                        <p className="text-sm flex items-center mt-1 text-gray-500 dark:text-gray-400">
                          <FiMapPin className="inline mr-1" size={14} />
                          {userData.location}
                        </p>
                      )}
                      
                      {userData?.experienceSince && (
                         <p className="text-sm flex items-center mt-1 text-gray-500 dark:text-gray-400">
                          <FiCalendar className="inline mr-1" size={14} />
                          Creator since {userData.experienceSince}
                        </p>
                      )}
                    </div>
                    
                    {(customization.profileHeaderStyle !== 'minimal') && (
                       <div className={`mt-4 ${customization.profileHeaderStyle !== 'expanded' ? 'md:mt-0' : ''} flex flex-wrap gap-2 ${customization.profileHeaderStyle === 'expanded' ? 'justify-center' : ''}`}>
                        {userData?.email && userData?.contactPreferences?.publicEmail !== false && (
                  <Button
                            size="sm"
                            onClick={copyEmailToClipboard}
                            className={`${getButtonClasses(customization.theme)} ${customization.cardStyle === 'pill' ? 'rounded-full' : ''}`}
                    style={{ 
                               color: getButtonContrastColor(customization.buttonStyle, customization.theme),
                               minWidth: '80px',
                             }}
                           >
                            <FiMail className="mr-2" size={14} />
                            {emailCopied ? 'Copied!' : 'Contact'}
                  </Button>
                )}

                        {userData?.socialMedia && Array.isArray(userData.socialMedia) && userData.socialMedia.length > 0 && customization.showPlatformIcons && customization.socialDisplayStyle === 'iconOnly' && (
                           <div className="flex space-x-1">
                             {userData.socialMedia.filter(s => s.url).map((social, idx) => (
                  <Button
                                 key={idx}
                    asChild
                                 size="icon"
                                 variant="ghost"
                                 className="h-9 w-9 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-accent dark:hover:text-accent"
                  >
                                  <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform}>
                                     {getSocialIcon(social.platform)}
                    </a>
                  </Button>
                             ))}
                           </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {userData?.bio && (
                    <p className={`mt-4 ${customization.profileHeaderStyle === 'expanded' ? 'text-center max-w-xl mx-auto' : ''}`} style={{ color: 'var(--body-color)' }}>
                       {userData.bio}
                    </p>
                  )}
                  
                  {userData?.industries && Array.isArray(userData.industries) && userData.industries.length > 0 && (
                     <div className={`flex flex-wrap gap-2 mt-4 ${customization.profileHeaderStyle === 'expanded' ? 'justify-center' : ''}`}>
                       {userData.industries.map((industry, index) => (
                        <Badge 
                          key={index}
                          variant={customization.buttonStyle === 'outline' ? 'outline' : 'secondary'}
                    style={{ 
                             backgroundColor: customization.buttonStyle === 'outline' 
                               ? 'transparent' 
                               : (customization.theme === 'dark' ? 'rgba(var(--accent-rgb), 0.2)' : 'rgba(var(--accent-rgb), 0.1)'),
                             borderColor: customization.buttonStyle === 'outline' ? 'var(--accent-color)' : 'transparent',
                             color: 'var(--accent-color)',
                           }}
                           className={`${customization.cardStyle === 'pill' ? 'rounded-full' : ''}`}
                        >
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
        </section>

        <section className={` ${customization.layout === 'centered' ? 'max-w-3xl mx-auto' : ''}`}>
           <div className={`
              ${customization.layout === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : customization.layout === 'minimal'
                  ? 'space-y-6'
                  : 'grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6'
              }
            `}>
              {customization.layout === 'default' && userData && (
                 <aside className="lg:col-span-4 space-y-6">
                   {renderOrderedSections()?.slice(0, 2)}
                 </aside>
              )}
              
              <div className={`
                ${customization.layout === 'grid' 
                  ? 'col-span-full'
                  : customization.layout === 'minimal' || customization.layout === 'centered'
                    ? ''
                    : 'lg:col-span-8 space-y-6'
                }
                ${customization.layout !== 'grid' ? 'space-y-6' : ''}
              `}>
                 {userData && (customization.layout === 'default' 
                   ? renderOrderedSections()?.slice(2)
                   : renderOrderedSections()
                 )}
          </div>
        </div>
        </section>
        
      </main>

      <footer className="text-center p-4 mt-8 text-xs text-gray-500 dark:text-gray-400 border-t" style={{borderColor: 'var(--border-color)'}}>
         Powered by <a href="https://influyst.com" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{color: 'var(--link-color)'}}>Influyst</a>
      </footer>
      
    </div>
  );
}
