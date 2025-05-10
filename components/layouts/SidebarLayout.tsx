import React from 'react';
import { BaseLayoutProps } from './BaseLayout';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { FiMapPin, FiMail, FiGlobe, FiInstagram, FiYoutube, FiTwitter, FiExternalLink } from 'react-icons/fi';
import { RiTiktokFill } from 'react-icons/ri';
import { getPrimaryButtonClasses, getButtonContrastColor } from '../../src/lib/utils';
import { hexToRgb } from '../../src/lib/profile-helpers';

// Helper functions
const radiusMap: Record<string, string> = { sharp: '0px', pill: '24px', neumorphic: '1rem' };
const getCardRadius = (cust: any) => radiusMap[cust.cardStyle] || '0.5rem';
const borderMap: Record<string, string> = { none: '0px', medium: '2px', thick: '3px' };
const getBorderWidth = (cust: any) => borderMap[cust.borderWidth] || '1px';
const filterMap: Record<string, string> = { grayscale: 'grayscale(100%)', sepia: 'sepia(80%)', blur: 'blur(1px)', brightness: 'brightness(120%)', contrast: 'contrast(120%)', 'hue-rotate': 'hue-rotate(90deg)' };
const getImageFilterStyle = (cust: any): React.CSSProperties => {
  if (!cust.imageFilter || cust.imageFilter === 'none') return {};
  return cust.imageFilter === 'custom'
    ? { filter: cust.customImageFilter || 'none' }
    : { filter: filterMap[cust.imageFilter] || 'none' };
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

/**
 * SidebarLayout: stub for the sidebar layout
 */
const SidebarLayout: React.FC<BaseLayoutProps> = ({
  user,
  customization,
  viewMode = 'desktop',
  containerStyle,
  coverImageStyle,
  contentWidthClass,
  cardStyle,
  glassEffect,
  animationClasses,
  renderOrderedSections,
  renderSection
}) => {
  // Calculate container background with seamless transitions
  const containerBackground = React.useMemo(() => {
    // Start with the main container style background
    const mainBg = containerStyle?.background || containerStyle?.backgroundColor || 
      (customization.theme === 'dark' ? 'rgb(17, 24, 39)' : 'rgb(249, 250, 251)');
    
    // Create a gradient that seamlessly blends with the content background
    const contentBg = customization.theme === 'dark' ? 'rgb(24, 24, 27)' : 'rgb(255, 255, 255)';
    
    // Return a style object with the blended background
    return {
      ...containerStyle,
      background: mainBg,
      // Only add the gradient if no background image is present
      ...(!(containerStyle?.backgroundImage) && {
        backgroundImage: `linear-gradient(to bottom, ${mainBg} 0%, ${mainBg} 30%, ${contentBg} 100%)`
      })
    };
  }, [containerStyle, customization.theme]);

  return (
    <div className="min-h-screen w-full" style={containerBackground}>
      {/* Cover image or gradient */}
      {coverImageStyle && (
        <div style={coverImageStyle} className="w-full h-auto relative">
          {/* Add subtle gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent"></div>
        </div>
      )}
      
      {/* Main content container */}
      <div className={`${contentWidthClass} mx-auto px-4 md:px-6 py-4 md:py-8`}>
        <div className="sidebar-layout flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar column */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <div className="profile-sidebar sticky top-4 space-y-4">
              {/* Profile card */}
              <div 
                className={`p-4 sm:p-6 overflow-hidden border dark:border-gray-800 ${
                  customization.cardStyle === 'neumorphic' ? 'shadow-neumorphic dark:shadow-neumorphic-dark' :
                  customization.cardStyle === 'sharp' ? 'shadow-lg' : 'shadow-lg rounded-xl'
                } ${glassEffect}`}
                style={{
                  ...cardStyle,
                  borderRadius: getCardRadius(customization),
                  borderWidth: getBorderWidth(customization),
                }}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Profile image */}
                  <Avatar className={`
                    h-28 w-28 mb-4 ${customization.profileImageShape === 'square' ? 'rounded-none' : customization.profileImageShape === 'rounded' ? 'rounded-lg' : customization.profileImageShape === 'hexagon' ? 'clip-path-hexagon' : 'rounded-full'} border-2`} style={{
                    borderColor: customization.accentColor || 'white',
                    ...(customization.imageFilter && customization.imageFilter !== 'none' ? 
                      getImageFilterStyle(customization) : {})
                  }}>
                    <AvatarImage src={user.profilePicture || '/placeholder-avatar.jpg'} alt={user.name || 'User'} />
                    <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  
                  {/* User info */}
                  <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--heading-color)' }}>
                    {user.name || 'User'}
                  </h1>
                  
                  <div className="mb-4 flex items-center justify-center gap-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">@{user.username || 'username'}</span>
                    {user.location && (
                      <>
                        <span className="text-gray-400 dark:text-gray-600">•</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <FiMapPin className="inline h-3 w-3 mr-1" />
                          {user.location}
                        </span>
                      </>
                    )}
                  </div>
                  
                  {/* Bio with proper spacing */}
                  {user.bio && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {user.bio}
                    </p>
                  )}
                  
                  {/* Industries/Tags */}
                  {user.industries && user.industries.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4 justify-center">
                      {user.industries.map((industry, i) => (
                        <Badge
                          key={i}
                          className="transition-all"
                          style={{
                            backgroundColor: `rgba(var(--accent-rgb), ${customization.theme === 'dark' ? 0.2 : 0.1})`,
                            color: 'var(--accent-color)'
                          }}
                        >
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Contact button */}
                  <div className="mb-2 w-full">
                    <Button
                      className={`w-full ${getPrimaryButtonClasses(customization.buttonStyle)}`}
                      style={{
                        backgroundColor: customization.buttonStyle === 'filled' ? 'var(--accent-color)' : 'transparent',
                        color: getButtonContrastColor(customization.buttonStyle, customization.theme),
                        borderColor: 'var(--accent-color)'
                      }}
                    >
                      <FiMail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Social Media Box */}
              {user?.socialMedia?.filter(s => s.url).length > 0 && (
                <div 
                  className={`p-4 sm:p-6 overflow-hidden border dark:border-gray-800 ${
                    customization.cardStyle === 'neumorphic' ? 'shadow-neumorphic dark:shadow-neumorphic-dark' :
                    customization.cardStyle === 'sharp' ? 'shadow-lg' : 'shadow-lg rounded-xl'
                  } ${glassEffect}`}
                  style={{
                    ...cardStyle,
                    borderRadius: getCardRadius(customization),
                    borderWidth: getBorderWidth(customization),
                  }}
                >
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--heading-color)' }}>Connect</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {user.socialMedia
                      .filter(social => social.url)
                      .map((social, index) => {
                        const getSocialIcon = () => {
                          switch(social.platform.toLowerCase()) {
                            case 'instagram': return <FiInstagram className="h-5 w-5" />;
                            case 'youtube': return <FiYoutube className="h-5 w-5" />;
                            case 'twitter': case 'x': return <FiTwitter className="h-5 w-5" />;
                            case 'tiktok': return <RiTiktokFill className="h-5 w-5" />;
                            default: return <FiGlobe className="h-5 w-5" />;
                          }
                        };
                        
                        const getSocialStyle = () => {
                          const baseStyle = { borderRadius: getCardRadius(customization) };
                          
                          switch(social.platform.toLowerCase()) {
                            case 'instagram': return { ...baseStyle, background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', color: 'white' };
                            case 'youtube': return { ...baseStyle, backgroundColor: '#FF0000', color: 'white' };
                            case 'twitter': case 'x': return { ...baseStyle, backgroundColor: '#1DA1F2', color: 'white' };
                            case 'tiktok': return { ...baseStyle, backgroundColor: '#000000', color: 'white' };
                            default: return { 
                              ...baseStyle, 
                              backgroundColor: customization.theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                              color: 'var(--body-color)'
                            };
                          }
                        };
                        
                        return (
                          <a 
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 p-2 transition-all hover:opacity-80 hover:scale-105"
                            style={getSocialStyle()}
                          >
                            {getSocialIcon()}
                            <span className="text-sm font-medium hidden sm:inline truncate">
                              {social.platform}
                            </span>
                          </a>
                        );
                      })}
                  </div>
                </div>
              )}
              
              {/* Stats Box, if available - render directly from renderSection, not through renderOrderedSections */}
              {renderSection.socialStats && (
                <div 
                  className={`p-4 sm:p-6 overflow-hidden border dark:border-gray-800 ${
                    customization.cardStyle === 'neumorphic' ? 'shadow-neumorphic dark:shadow-neumorphic-dark' :
                    customization.cardStyle === 'sharp' ? 'shadow-lg' : 'shadow-lg rounded-xl'
                  } ${glassEffect}`}
                  style={{
                    ...cardStyle,
                    borderRadius: getCardRadius(customization),
                    borderWidth: getBorderWidth(customization),
                  }}
                >
                  {renderSection.socialStats()}
                </div>
              )}
            </div>
          </div>
          
          {/* Main content column */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* Filter out the socialStats from main content since it's in sidebar */}
            <div className="space-y-8">
              {customization.contentSectionOrder?.filter(sectionKey => sectionKey !== 'socialStats')
                .filter(sectionKey => {
                  // Skip sections with no content
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
                    className={`${customization.enableSectionEntranceAnimations ? 'animate-fade-in' : ''}`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {renderSection[sectionKey]?.()}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with gradient and subtle branding */}
      <footer className="py-6 mt-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 text-center">
        <div className={`mx-auto px-4 ${contentWidthClass}`}>
          <div className="flex items-center justify-center gap-1.5">
            <span style={{ color: 'var(--body-color)' }}>Made with</span>
            <a
              href="https://influyst.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-accent flex items-center"
              style={{ color: 'var(--accent-color)' }}
            >
              Influyst
              <FiExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SidebarLayout; 