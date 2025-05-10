import React from 'react';
import { BaseLayoutProps } from './BaseLayout';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { FiMapPin, FiMail, FiGlobe, FiInstagram, FiYoutube, FiTwitter, FiExternalLink } from 'react-icons/fi';
import { RiTiktokFill } from 'react-icons/ri';
import { getPrimaryButtonClasses, getButtonContrastColor } from '../../src/lib/utils';
import { hexToRgb } from '../../src/lib/profile-helpers';

// Helper functions (reuse from SidebarLayout)
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
 * MagazineLayout: implements the magazine layout
 */
const MagazineLayout: React.FC<BaseLayoutProps> = ({
  user,
  customization,
  viewMode = 'desktop',
  containerStyle,
  coverImageStyle,
  cardStyle,
  glassEffect,
  animationClasses,
  contentWidthClass,
  profileImageClasses,
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
    <div className="w-full min-h-screen" style={containerBackground}>
      {/* Cover image with gradient overlay */}
      {coverImageStyle && (
        <div className="relative w-full h-auto mb-6">
          <div style={coverImageStyle} className="w-full h-auto" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>
        </div>
      )}
      
      {/* Magazine header */}
      <div className={`mx-auto px-4 ${contentWidthClass}`}>
        <div className="magazine-header pb-8 border-b border-gray-200 dark:border-gray-800 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <Avatar className={`
              h-28 w-28 md:h-32 md:w-32 ring-4 ring-white dark:ring-gray-800 shadow-xl
              ${customization.profileImageShape === 'square' ? 'rounded-none' :
                customization.profileImageShape === 'rounded' ? 'rounded-lg' :
                customization.profileImageShape === 'hexagon' ? 'clip-path-hexagon' : 'rounded-full'}
            `} style={{
              ...(customization.imageFilter && customization.imageFilter !== 'none' ? 
                getImageFilterStyle(customization) : {})
            }}>
              <AvatarImage src={user.profilePicture || '/placeholder-avatar.jpg'} alt={user.name || 'User'} />
              <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            
            {/* Profile Info */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--heading-color)' }}>
                {user.name || 'User'}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                <span className="text-base text-gray-700 dark:text-gray-300">@{user.username || 'username'}</span>
                {user.location && (
                  <>
                    <span className="text-gray-400 dark:text-gray-600">•</span>
                    <span className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                      <FiMapPin className="h-4 w-4" />
                      {user.location}
                    </span>
                  </>
                )}
              </div>
              
              {/* Bio with better styling */}
              {user.bio && (
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mb-4">
                  {user.bio}
                </p>
              )}
              
              {/* Industries/Tags with visual appeal */}
              {user.industries && user.industries.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
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
              
              {/* Contact/Social Row */}
              <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                {/* Contact button */}
                <Button
                  className={`${getPrimaryButtonClasses(customization.buttonStyle)}`}
                  style={{
                    backgroundColor: customization.buttonStyle === 'filled' ? 'var(--accent-color)' : 'transparent',
                    color: getButtonContrastColor(customization.buttonStyle, customization.theme),
                    borderColor: 'var(--accent-color)'
                  }}
                >
                  <FiMail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
                
                {/* Social media links */}
                {user?.socialMedia?.filter(s => s.url).slice(0, 4).map((social, index) => {
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
                    const baseStyle = { 
                      borderRadius: '9999px',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center' 
                    };
                    
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
                      className="transition-all hover:opacity-90 hover:scale-105"
                      style={getSocialStyle()}
                    >
                      {getSocialIcon()}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      
        {/* Magazine Grid Layout - responsive columns */}
        <div className="magazine-content mb-16">
          <div className="magazine-layout">
            {/* Convert to grid-based layout that preserves section integrity */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {customization.contentSectionOrder?.map((sectionKey, index) => {
                // Skip sections with no content
                if (sectionKey === 'socialStats' && (!user?.socialMedia || user.socialMedia.length === 0)) return null;
                if (sectionKey === 'socialLinks' && (!user?.socialMedia || user.socialMedia.filter(s => s.url).length === 0)) return null;
                if (sectionKey === 'content' && (!user?.contentExamples || user.contentExamples.length === 0)) return null;
                if (sectionKey === 'testimonials' && (!user?.testimonials || user.testimonials.length === 0)) return null;
                if (sectionKey === 'services' && (!user?.services || user.services.length === 0)) return null;
                if (sectionKey === 'partnerships' && (!user?.partners || user.partners.length === 0)) return null;
                
                // Special handling for the content section - make it span full width
                const colSpanClass = sectionKey === 'content' ? 'md:col-span-2 lg:col-span-3' : '';
                
                return renderSection[sectionKey] ? (
                  <div 
                    key={sectionKey}
                    className={`${colSpanClass} ${customization.enableSectionEntranceAnimations ? 'animate-fade-in' : ''}`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {renderSection[sectionKey]()}
                  </div>
                ) : null;
              })}
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

export default MagazineLayout; 