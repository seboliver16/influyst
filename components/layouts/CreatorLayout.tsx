import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FiMapPin, FiMail, FiExternalLink, FiLink, FiHeart, FiMessageCircle } from 'react-icons/fi';
import { BaseLayoutProps } from './BaseLayout';

const CreatorLayout: React.FC<BaseLayoutProps> = ({
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
  // Apply custom gradient styles for creator layout
  const gradientStyle = {
    position: 'absolute' as const,
    inset: 0,
    width: '100%',
    height: '450px',
    // Create a rich, professional gradient with improved color blending
    background: customization.theme === 'dark'
      ? `linear-gradient(135deg, 
          ${customization.accentColor}dd 0%, 
          ${customization.secondaryColor || customization.accentColor}cc 40%,
          ${customization.tertiaryColor || customization.accentColor}aa 70%,
          rgba(17, 24, 39, 0.9) 100%)`
      : `linear-gradient(135deg, 
          ${customization.accentColor}dd 0%, 
          ${customization.secondaryColor || customization.accentColor}cc 40%,
          ${customization.tertiaryColor || customization.accentColor}aa 70%,
          rgba(255, 255, 255, 0.9) 100%)`,
    // Add subtle animation
    backgroundSize: '300% 300%', // Larger size for smoother animation
    animation: 'gradientFlow 20s ease infinite', // Slower animation for subtlety
    // Add a smooth background blend for better transition
    backdropFilter: 'blur(5px)',
  };

  // Profile card style
  const profileContentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    position: 'relative' as const,
    zIndex: 10
  };

  // CSS for creator buttons
  const creatorButtonStyle = {
    borderRadius: '9999px',
    padding: '0.75rem 1.25rem',
    fontSize: '0.875rem',
    fontWeight: 600,
    letterSpacing: '0.025em',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)'
  };

  // Primary button style with gradient
  const primaryButtonStyle = {
    ...creatorButtonStyle,
    background: `linear-gradient(135deg, ${customization.accentColor}, ${customization.secondaryColor || customization.accentColor})`,
    color: '#ffffff',
    border: 'none'
  };

  // Secondary button style with glass effect
  const secondaryButtonStyle = {
    ...creatorButtonStyle,
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(8px)',
    color: customization.theme === 'dark' ? '#ffffff' : '#000000',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  };

  return (
    <div className="w-full relative min-h-screen" style={{
      ...containerStyle,
      // Create a seamless transition from gradient to content area
      background: customization.theme === 'dark' 
        ? 'linear-gradient(to bottom, rgba(17, 24, 39, 0.3) 0%, rgba(17, 24, 39, 0.6) 10%, rgba(17, 24, 39, 0.8) 30%, rgba(17, 24, 39, 1) 100%)'
        : 'linear-gradient(to bottom, rgba(249, 250, 251, 0.3) 0%, rgba(249, 250, 251, 0.6) 10%, rgba(249, 250, 251, 0.8) 30%, rgba(249, 250, 251, 1) 100%)'
    }}>
      {/* Animated gradient background */}
      <style jsx global>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 25%; }
          50% { background-position: 100% 75%; }
          100% { background-position: 0% 25%; }
        }
        
        .creator-button {
          transition: all 0.3s ease;
          transform: translateY(0);
        }
        
        .creator-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.2);
        }
        
        .creator-button:active {
          transform: translateY(0);
        }
        
        .profile-content-wrapper {
          position: relative;
          z-index: 10;
        }
        
        .creator-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }
        
        @media (min-width: 640px) {
          .creator-stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
        }
        
        @media (min-width: 768px) {
          .creator-stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          }
        }
        
        .creator-stat-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          border-radius: 0.75rem;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.3s ease;
        }
        
        .creator-stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.2);
          background: rgba(255, 255, 255, 0.15);
        }
        
        .creator-social-links {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .creator-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 9999px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .creator-social-link:hover {
          transform: scale(1.1) rotate(5deg);
          background: rgba(255, 255, 255, 0.25);
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .creator-profile-header h1 {
            font-size: 2.5rem;
          }
          
          .creator-profile-header .avatar {
            height: 8rem;
            width: 8rem;
          }
        }
      `}</style>
      
      {/* Hero section with gradient background */}
      <div className="relative">
        {/* Gradient background */}
        <div style={gradientStyle}></div>
        
        {/* Profile content wrapper */}
        <div className="profile-content-wrapper pt-10 sm:pt-20 pb-20 sm:pb-40 text-center creator-profile-header">
          <div style={profileContentStyle}>
            {/* Large, impressive profile image */}
            <Avatar className={`
              h-32 w-32 sm:h-44 sm:w-44 mx-auto mb-6 sm:mb-8 ring-4 ring-white/30 shadow-2xl avatar
              ${customization.profileImageShape === 'square' ? 'rounded-xl' :
                customization.profileImageShape === 'rounded' ? 'rounded-2xl' :
                customization.profileImageShape === 'hexagon' ? 'clip-path-hexagon' : 'rounded-full'}
            `}>
              <AvatarImage src={user.profilePicture || '/placeholder-avatar.jpg'} alt={user.name || 'User'} />
              <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            
            {/* User name and details with enhanced styling */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 text-white drop-shadow-md bg-clip-text">
              {user.name || 'User'}
            </h1>
            
            {/* Username and location with improved styling */}
            <div className="flex items-center justify-center gap-3 mb-5 text-white/90 text-lg">
              <span>@{user.username || 'username'}</span>
              {user.location && (
                <>
                  <span className="text-white/50">•</span>
                  <span className="flex items-center gap-1">
                    <FiMapPin className="h-4 w-4" />
                    {user.location}
                  </span>
                </>
              )}
            </div>
            
            {/* Creator statistics grid */}
            {user.socialMedia && user.socialMedia.length > 0 && (
              <div className="creator-stats-grid mb-6">
                {user.socialMedia.map((social, index) => (
                  social.followerCount ? (
                    <div key={index} className="creator-stat-card">
                      <span className="text-white/60 text-xs uppercase tracking-wider mb-1">
                        {social.platform}
                      </span>
                      <span className="text-white font-bold text-2xl">
                        {social.followerCount >= 1000000 
                          ? `${(social.followerCount / 1000000).toFixed(1)}M` 
                          : social.followerCount >= 1000 
                            ? `${(social.followerCount / 1000).toFixed(1)}K` 
                            : social.followerCount}
                      </span>
                      <span className="text-white/70 text-xs">followers</span>
                    </div>
                  ) : null
                ))}
              </div>
            )}
            
            {/* Bio with better styling */}
            {user.bio && (
              <div className="max-w-2xl mx-auto mb-8">
                <p className="text-white/90 text-xl bg-black/10 backdrop-blur-sm p-6 rounded-2xl leading-relaxed">
                  {user.bio}
                </p>
              </div>
            )}
            
            {/* Industries/Tags with improved styling */}
            {user.industries && Array.isArray(user.industries) && user.industries.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {user.industries.map((industry, i) => (
                  <Badge 
                    key={i} 
                    className="bg-white/15 hover:bg-white/25 text-white text-sm py-1.5 px-3 backdrop-blur-sm border border-white/10 rounded-full shadow-sm"
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Social media links with branded colors */}
            {user.socialMedia && user.socialMedia.filter(s => s.url).length > 0 && (
              <div className="creator-social-links mb-8">
                {user.socialMedia
                  .filter(social => social.url)
                  .map((social, index) => {
                    // Get appropriate social icon and background color
                    const getSocialStyle = (platform: string) => {
                      switch(platform.toLowerCase()) {
                        case 'instagram':
                          return { 
                            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
                            background: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400'
                          };
                        case 'youtube':
                          return { 
                            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>,
                            background: 'bg-red-600' 
                          };
                        case 'twitter':
                        case 'x':
                          return { 
                            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>,
                            background: 'bg-blue-400'
                          };
                        case 'tiktok':
                          return { 
                            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
                            background: 'bg-black'
                          };
                        case 'facebook':
                          return { 
                            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>,
                            background: 'bg-blue-600'
                          };
                        case 'linkedin':
                          return { 
                            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>,
                            background: 'bg-blue-700'
                          };
                        default:
                          return { 
                            icon: <FiLink className="h-5 w-5" />,
                            background: 'bg-gray-700'
                          };
                      }
                    };
                    
                    const socialStyle = getSocialStyle(social.platform);
                    
                    return (
                      <a 
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`creator-social-link ${socialStyle.background}`}
                        aria-label={social.platform}
                      >
                        {socialStyle.icon}
                      </a>
                    );
                  })}
              </div>
            )}
            
            {/* Action buttons with enhanced styling */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                className="creator-button"
                style={primaryButtonStyle}
              >
                <div className="flex items-center">
                  <FiMail className="mr-2 h-5 w-5" />
                  Contact Me
                </div>
              </button>
              
              <button 
                className="creator-button"
                style={secondaryButtonStyle}
              >
                <div className="flex items-center">
                  <FiHeart className="mr-2 h-5 w-5" />
                  Follow
                </div>
              </button>
              
              <button 
                className="creator-button"
                style={secondaryButtonStyle}
              >
                <div className="flex items-center">
                  <FiMessageCircle className="mr-2 h-5 w-5" />
                  Message
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Main content with overlap */}
        <div className="max-w-6xl mx-auto px-4 -mt-20 mb-20 relative z-20">
          {/* Content sections in a beautiful card with subtle shadow */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
            <div className="creator-content space-y-10">
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
                    className="section-wrapper"
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
      </div>
    </div>
  );
};

export default CreatorLayout; 