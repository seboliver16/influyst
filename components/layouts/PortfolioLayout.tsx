import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card";
import { FiMapPin, FiMail, FiGrid, FiLayout, FiImage, FiExternalLink } from 'react-icons/fi';
import { BaseLayoutProps } from './BaseLayout';

// Image filter utility function
const getImageFilterStyle = (customization: any): React.CSSProperties => {
  if (!customization.imageFilter || customization.imageFilter === 'none') return {};
  
  switch (customization.imageFilter) {
    case 'grayscale':
      return { filter: 'grayscale(100%)' };
    case 'sepia':
      return { filter: 'sepia(70%)' };
    case 'blur':
      return { filter: 'blur(1px)' };
    case 'brightness':
      return { filter: 'brightness(120%)' };
    case 'contrast':
      return { filter: 'contrast(120%)' };
    case 'hue-rotate':
      return { filter: 'hue-rotate(90deg)' };
    case 'custom':
      return { filter: customization.customImageFilter || 'none' };
    default:
      return {};
  }
};

const PortfolioLayout: React.FC<BaseLayoutProps> = ({
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
  // Get better control over the filter category tabs
  const [activeFilter, setActiveFilter] = React.useState('all');
  
  // Apply image filter based on customization
  const profileImageStyle = {
    borderWidth: customization.profileImageBorderWidth || 4,
    borderColor: customization.theme === 'dark' ? 'rgb(31, 41, 55)' : 'white',
    ...(customization.imageFilter && customization.imageFilter !== 'none' ? 
      getImageFilterStyle(customization) : {})
  };
  
  // Get content categories from examples if available
  const getContentCategories = () => {
    if (!user.contentExamples || !Array.isArray(user.contentExamples)) return [];
    
    // Get unique platforms as categories
    const platforms = [...new Set(user.contentExamples.map(item => item.platform))];
    return platforms;
  };
  
  // Filter content by platform
  const getFilteredContent = () => {
    if (!user.contentExamples || !Array.isArray(user.contentExamples)) return [];
    
    if (activeFilter === 'all') {
      return user.contentExamples;
    } else {
      return user.contentExamples.filter(item => item.platform === activeFilter);
    }
  };
  
  const contentCategories = getContentCategories();
  const filteredContent = getFilteredContent();
  
  // Calculate seamless container background with gradient blend
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
    <div className="portfolio-layout w-full relative min-h-screen" style={containerBackground}>
      {/* Floating sidebar with profile information */}
      <div className="fixed left-6 top-6 bottom-6 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-y-auto overflow-x-hidden z-20 hidden lg:block">
        <div className="p-6 flex flex-col items-center text-center h-full">
          {/* Avatar */}
          <Avatar className={`
            h-32 w-32 mx-auto mb-6 ring-4 ring-gray-100 dark:ring-gray-700 shadow-lg 
            ${customization.profileImageShape === 'square' ? 'rounded-xl' :
              customization.profileImageShape === 'rounded' ? 'rounded-2xl' :
              customization.profileImageShape === 'hexagon' ? 'clip-path-hexagon' : 'rounded-full'}
          `} style={profileImageStyle}>
            <AvatarImage src={user.profilePicture || '/placeholder-avatar.jpg'} alt={user.name || 'User'} />
            <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          
          {/* User info */}
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--heading-color)' }}>
            {user.name || 'User'}
          </h1>
          
          <div className="text-sm mb-3" style={{ color: 'var(--body-color)' }}>
            @{user.username || 'username'}
            {user.location && (
              <div className="flex items-center justify-center gap-1 mt-1" style={{ color: 'var(--body-color)' }}>
                <FiMapPin className="h-3 w-3" />
                {user.location}
              </div>
            )}
          </div>
          
          {/* Bio */}
          {user.bio && (
            <div className="mb-6">
              <p className="text-sm" style={{ color: 'var(--body-color)' }}>
                {user.bio}
              </p>
            </div>
          )}
          
          {/* Categories/Tags */}
          {user.industries && Array.isArray(user.industries) && user.industries.length > 0 && (
            <div className="flex flex-wrap gap-1.5 justify-center mb-6">
              {user.industries.map((industry, i) => (
                <Badge 
                  key={i} 
                  variant="outline"
                  className="text-xs"
                  style={{ 
                    borderColor: `rgba(var(--accent-rgb), 0.3)`,
                    color: 'var(--accent-color)',
                  }}
                >
                  {industry}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Contact button */}
          <Button 
            className="w-full mt-auto"
            style={{
              backgroundColor: customization.accentColor,
              color: 'white',
            }}
          >
            <FiMail className="mr-2 h-4 w-4" />
            Contact Me
          </Button>
          
          {/* Social stats */}
          {user.socialMedia && user.socialMedia.length > 0 && (
            <div className="mt-6 w-full">
              <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--heading-color)' }}>
                Follow Me
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {user.socialMedia.filter(s => s.followerCount).map((social, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <span className="text-xs text-gray-500 dark:text-gray-400">{social.platform}</span>
                    <span className="font-bold" style={{ color: 'var(--heading-color)' }}>
                      {social.followerCount >= 1000000 
                        ? `${(social.followerCount / 1000000).toFixed(1)}M` 
                        : social.followerCount >= 1000 
                          ? `${(social.followerCount / 1000).toFixed(1)}K` 
                          : social.followerCount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile header */}
      <div className="lg:hidden sticky top-0 z-20 bg-white dark:bg-gray-800 shadow-md border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center p-4">
          <Avatar className="h-10 w-10 mr-3" style={profileImageStyle}>
            <AvatarImage src={user.profilePicture || '/placeholder-avatar.jpg'} alt={user.name || 'User'} />
            <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold truncate" style={{ color: 'var(--heading-color)' }}>
              {user.name || 'User'}
            </h1>
            <div className="text-sm truncate" style={{ color: 'var(--body-color)' }}>
              @{user.username || 'username'}
            </div>
          </div>
          
          <Button 
            size="sm"
            style={{
              backgroundColor: customization.accentColor,
              color: 'white',
            }}
          >
            <FiMail className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="lg:pl-80 p-4 md:p-6">
        {/* Stylish hero header with cover image or gradient */}
        <div className="relative h-48 md:h-64 w-full overflow-hidden rounded-lg mb-8">
          {/* Cover image or gradient */}
          <div style={coverImageStyle} className="absolute inset-0"></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          
          {/* Portfolio title */}
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                My Portfolio
              </h1>
              <p className="text-white/80 mt-2 max-w-xl px-4">
                Explore my work and creative projects
              </p>
            </div>
          </div>
        </div>
        
        {/* Filter tabs - use user's platforms as filters */}
        <div className="sticky top-0 lg:top-0 z-10 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 px-4 py-3 rounded-lg mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('all')}
              style={activeFilter === 'all' ? {
                backgroundColor: customization.accentColor,
                color: 'white'
              } : {}}
            >
              <FiGrid className="mr-1 h-4 w-4" />
              All
            </Button>
            
            {contentCategories.map((category, index) => (
              <Button
                key={index}
                variant={activeFilter === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(category)}
                style={activeFilter === category ? {
                  backgroundColor: customization.accentColor,
                  color: 'white'
                } : {}}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Main content grid - All content is in cards */}
        <div className="space-y-8">
          {/* Featured Content */}
          {activeFilter === 'all' && (
            <Card className={`overflow-hidden ${glassEffect}`} style={cardStyle}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--heading-color)' }}>Featured Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredContent.map((content, index) => (
                    <Card key={index} className={`overflow-hidden ${animationClasses}`} style={cardStyle}>
                      <div className="relative aspect-video">
                        {content.imageUrl ? (
                          <img 
                            src={content.imageUrl} 
                            alt={content.title || 'Content'} 
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                            <FiImage className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-black/60 text-white border-none">
                            {content.platform}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-1 line-clamp-2" style={{ color: 'var(--heading-color)' }}>
                          {content.title || 'Untitled'}
                        </h3>
                        {content.performanceMetrics && (
                          <div className="flex flex-wrap gap-x-3 text-xs text-gray-500 dark:text-gray-400">
                            {content.performanceMetrics.views && (
                              <span>{content.performanceMetrics.views.toLocaleString()} views</span>
                            )}
                            {content.performanceMetrics.likes && (
                              <span>{content.performanceMetrics.likes.toLocaleString()} likes</span>
                            )}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <a
                          href={content.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline flex items-center gap-1"
                          style={{ color: 'var(--accent-color)' }}
                        >
                          <FiExternalLink className="h-3 w-3" />
                          View on {content.platform}
                        </a>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Render all sections in card format */}
          {customization.contentSectionOrder?.map((sectionKey, index) => {
            // Skip content section when filtering is active
            if (sectionKey === 'content' && activeFilter !== 'all') return null;
            
            // Skip sections with no content
            if (sectionKey === 'socialStats' && (!user?.socialMedia || user.socialMedia.length === 0)) return null;
            if (sectionKey === 'socialLinks' && (!user?.socialMedia || user.socialMedia.filter(s => s.url).length === 0)) return null;
            if (sectionKey === 'content' && (!user?.contentExamples || user.contentExamples.length === 0)) return null;
            if (sectionKey === 'testimonials' && (!user?.testimonials || user.testimonials.length === 0)) return null;
            if (sectionKey === 'services' && (!user?.services || user.services.length === 0)) return null;
            if (sectionKey === 'partnerships' && (!user?.partners || user.partners.length === 0)) return null;
            
            // Skip content section as it's handled separately above
            if (sectionKey === 'content' && activeFilter === 'all') return null;
            
            // For all other sections, wrap in a card
            return (
              <Card 
                key={sectionKey}
                className={`overflow-hidden ${glassEffect} ${customization.enableSectionEntranceAnimations ? 'animate-fade-in' : ''}`}
                style={{ 
                  ...cardStyle,
                  animationDelay: `${index * 0.15}s`
                }}
              >
                <CardContent className="p-6">
                  {renderSection[sectionKey] && renderSection[sectionKey]()}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      {/* Footer */}
      <div className="lg:pl-80 py-6 px-4 md:px-6 mt-12 text-center border-t border-gray-200 dark:border-gray-700">
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
    </div>
  );
};

export default PortfolioLayout; 