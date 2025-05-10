import React from 'react';
import { BaseLayoutProps } from './BaseLayout';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { FiMapPin, FiMail, FiExternalLink } from 'react-icons/fi';
import { getPrimaryButtonClasses, getButtonContrastColor } from '../../src/lib/utils';

// Responsive layout constants
const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
};

/**
 * DefaultLayout: A clean, modern layout that works well as a fallback
 */
const DefaultLayout: React.FC<BaseLayoutProps> = ({
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
  // Dynamic radius and profile image size based on customization
  const profileRadius = {
    square: '0',
    rounded: '0.75rem',
    pill: '9999px',
    hexagon: '0', // Handled by clip path
    circle: '9999px', // Add circle as an explicit option
    custom: '0.5rem' // Default for custom shapes
  }[customization.profileImageShape || 'rounded'] || '9999px';

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
    <div className="w-full min-h-screen relative flex flex-col" style={containerBackground}>
      {/* Cover image with gradient overlay */}
      {coverImageStyle && (
        <div 
          style={coverImageStyle} 
          className="w-full relative"
        >
          {/* Add subtle gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent"></div>
        </div>
      )}
      
      {/* Main content container */}
      <div className={`mx-auto px-4 sm:px-6 w-full ${contentWidthClass} relative z-10`}>
        {/* Profile Section */}
        <div className="relative -mt-16 sm:-mt-24 mb-12 max-w-4xl mx-auto">
          <div className={`bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xl ${glassEffect}`} style={cardStyle}>
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <Avatar
                  className={`h-28 w-28 md:h-32 md:w-32 border-4 shadow-lg ${
                    customization.profileImageShape === 'hexagon' ? 'clip-path-hexagon' : ''
                  }`}
                  style={{
                    borderRadius: profileRadius,
                    borderColor: customization.theme === 'dark' ? 'rgb(31, 41, 55)' : 'white',
                  }}
                >
                  <AvatarImage 
                    src={user.profilePicture || '/placeholder-avatar.jpg'} 
                    alt={user.name || 'User'} 
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl font-bold">
                    {user.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              {/* User information */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--heading-color)' }}>
                  {user.name || 'User'}
                </h1>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3" style={{ color: 'var(--body-color)' }}>
                  <span className="text-base">@{user.username || 'username'}</span>
                  {user.location && (
                    <>
                      <span className="text-gray-400 dark:text-gray-500">•</span>
                      <span className="flex items-center gap-1">
                        <FiMapPin className="h-3 w-3" />
                        {user.location}
                      </span>
                    </>
                  )}
                </div>
                
                {/* Bio with appropriate spacing */}
                {user.bio && (
                  <p className="text-sm md:text-base mb-4 max-w-prose" style={{ color: 'var(--body-color)' }}>
                    {user.bio}
                  </p>
                )}
                
                {/* Tags/Industries with responsive styling */}
                {user.industries && Array.isArray(user.industries) && user.industries.length > 0 && (
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
                
                {/* Contact button */}
                <div className="mt-2">
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
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content sections with proper spacing and responsive layout */}
        <div className="mb-20">
          <div className="grid grid-cols-1 gap-8 md:gap-12">
            {/* Map through sections directly to provide better control over layout */}
            {customization.contentSectionOrder?.map((sectionKey, index) => {
              // Skip sections with no content
              if (sectionKey === 'socialStats' && (!user?.socialMedia || user.socialMedia.length === 0)) return null;
              if (sectionKey === 'socialLinks' && (!user?.socialMedia || user.socialMedia.filter(s => s.url).length === 0)) return null;
              if (sectionKey === 'content' && (!user?.contentExamples || user.contentExamples.length === 0)) return null;
              if (sectionKey === 'testimonials' && (!user?.testimonials || user.testimonials.length === 0)) return null;
              if (sectionKey === 'services' && (!user?.services || user.services.length === 0)) return null;
              if (sectionKey === 'partnerships' && (!user?.partners || user.partners.length === 0)) return null;
              
              return renderSection[sectionKey] ? (
                <div 
                  key={sectionKey}
                  className={`${customization.enableSectionEntranceAnimations ? 'transition-all duration-700 animate-fade-in' : ''}`}
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                    ...(customization.sectionAlignment ? { textAlign: customization.sectionAlignment } : {})
                  }}
                >
                  {renderSection[sectionKey]()}
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-auto py-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 text-center">
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

export default DefaultLayout; 