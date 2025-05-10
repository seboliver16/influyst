import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { FiMapPin, FiMail, FiExternalLink } from 'react-icons/fi';
import { BaseLayoutProps } from './BaseLayout';
import { hexToRgb } from "../../src/lib/profile-helpers";

// Get card radius for masonry cards
const getCardRadius = (customization: any) => {
  switch (customization.cardStyle) {
    case 'sharp': return '0px';
    case 'pill': return '24px';
    case 'neumorphic': return '1rem';
    default: return '0.5rem'; // rounded
  }
};

// Get border width for masonry cards
const getBorderWidth = (customization: any) => {
  switch (customization.borderWidth) {
    case 'none': return '0px';
    case 'medium': return '2px';
    case 'thick': return '3px';
    default: return '1px'; // thin
  }
};

// Apply image filters based on customization setting
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

const MasonryLayout: React.FC<BaseLayoutProps> = ({
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
  // Masonry-specific styles: use consistent column and row gaps
  const masonryClasses = "columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-x-6 gap-y-6 pb-6";
  const cardBaseClasses = "inline-block w-full break-inside-avoid mb-6 relative overflow-hidden";
  
  // Card hover effect for masonry layout
  const cardHoverClasses = customization.enableHoverEffects 
    ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" 
    : "";

  // Profile card style specifically for masonry
  const profileCardStyle = {
    ...cardStyle,
    borderRadius: getCardRadius(customization),
    borderWidth: getBorderWidth(customization),
    overflow: 'hidden',
    marginBottom: '12px'
  };
  
  // Profile image styling with shadow
  const profileImageStyle = {
    borderWidth: customization.profileImageBorderWidth || 4,
    borderColor: customization.theme === 'dark' ? 'rgb(31, 41, 55)' : 'white',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    ...(customization.imageFilter && customization.imageFilter !== 'none' ? 
      getImageFilterStyle(customization) : {})
  };

  return (
    <div className="w-full relative" style={containerStyle}>
      {/* Cover image or gradient */}
      {customization.coverImageUrl && (
        <div style={coverImageStyle} className="w-full">
          {customization.coverDarken && (
            <div className="absolute inset-0 bg-black/30"></div>
          )}
        </div>
      )}
      
      {/* Profile header with gradient overlay */}
      <div className="relative py-16 px-4 mb-8 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-0"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Large Avatar */}
          <Avatar className={`
            h-36 w-36 mx-auto mb-6 ring-4 ring-white dark:ring-gray-800 
            ${customization.profileImageShape === 'square' ? 'rounded-none' :
              customization.profileImageShape === 'rounded' ? 'rounded-lg' :
              customization.profileImageShape === 'hexagon' ? 'clip-path-hexagon' : 'rounded-full'}
          `} style={profileImageStyle}>
            <AvatarImage src={user.profilePicture || '/placeholder-avatar.jpg'} alt={user.name || 'User'} />
            <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          
          {/* User name and details - light text for visibility */}
          <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-md">
            {user.name || 'User'}
          </h1>
          
          <div className="flex items-center justify-center gap-2 mb-4 text-white/90">
            <span className="text-lg">@{user.username || 'username'}</span>
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
          
          {/* Bio with light background for readability */}
          {user.bio && (
            <div className="max-w-2xl mx-auto mb-6">
              <p className="text-white/90 text-lg bg-black/20 backdrop-blur-sm p-4 rounded-lg inline-block">
                {user.bio}
              </p>
            </div>
          )}
          
          {/* Industries/Tags */}
          {user.industries && Array.isArray(user.industries) && user.industries.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {user.industries.map((industry, i) => (
                <Badge 
                  key={i} 
                  className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                >
                  {industry}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Contact button with glass effect */}
          <div className="flex justify-center gap-3">
            <Button 
              className="backdrop-blur-sm bg-white/20 hover:bg-white/30 text-white border border-white/20"
            >
              <FiMail className="mr-2 h-4 w-4" />
              Contact
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content container */}
      <div className={`${contentWidthClass} mx-auto px-2 sm:px-4`}>
        {/* Create a special layout where contentExamples go into masonry but other sections are normally stacked */}
        <div className="masonry-content space-y-12">
          {/* Primary sections (with masonry layout for contentExamples) */}
          {customization.contentSectionOrder?.map((sectionKey, index) => {
            // Skip sections with no content
            if (sectionKey === 'socialStats' && (!user?.socialMedia || user.socialMedia.length === 0)) return null;
            if (sectionKey === 'socialLinks' && (!user?.socialMedia || user.socialMedia.filter(s => s.url).length === 0)) return null;
            if (sectionKey === 'content' && (!user?.contentExamples || user.contentExamples.length === 0)) return null;
            if (sectionKey === 'testimonials' && (!user?.testimonials || user.testimonials.length === 0)) return null;
            if (sectionKey === 'services' && (!user?.services || user.services.length === 0)) return null;
            if (sectionKey === 'partnerships' && (!user?.partners || user.partners.length === 0)) return null;
            
            // For content section, continue using the existing masonry layout
            if (sectionKey === 'content' && user?.contentExamples?.length > 0) {
              return (
                <div key={sectionKey}>
                  <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--heading-color)' }}>
                    Featured Content
                  </h2>
                  <div className={masonryClasses}>
                    {user.contentExamples.map((content, index) => (
                      <div 
                        key={index} 
                        className={`${cardBaseClasses} ${cardHoverClasses} ${glassEffect}`}
                        style={cardStyle}
                      >
                        {/* Content thumbnail with overlay */}
                        <a 
                          href={content.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="block absolute inset-0 group"
                        >
                          {content.imageUrl ? (
                            <>
                              <img 
                                src={content.imageUrl} 
                                alt={content.title || 'Content'} 
                                className="object-cover w-full h-full"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-90 transition-opacity"></div>
                            </>
                          ) : (
                            <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 absolute inset-0 flex items-center justify-center">
                              <div className="text-4xl text-gray-400">
                                {content.platform === 'Instagram' ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                ) : content.platform === 'YouTube' ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                                ) : content.platform === 'Twitter' || content.platform === 'X' ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                                ) : content.platform === 'TikTok' ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                                ) : content.platform === 'Facebook' ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                                ) : content.platform === 'LinkedIn' ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {/* Content details overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <div className="flex items-center mb-1.5">
                              <Badge variant="secondary" className="text-xs bg-white/20 text-white border-none">
                                {content.platform}
                              </Badge>
                              {content.sponsored && (
                                <Badge variant="outline" className="ml-2 text-xs bg-yellow-500/20 text-yellow-300 border-yellow-300/30">
                                  Sponsored
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-white text-sm font-medium line-clamp-2 mb-1">{content.title}</h3>
                            
                            {/* Performance metrics */}
                            {content.performanceMetrics && (
                              <div className="flex items-center gap-2 text-white/70 text-xs">
                                {content.performanceMetrics.views && (
                                  <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    {content.performanceMetrics.views >= 1000000 
                                      ? `${(content.performanceMetrics.views / 1000000).toFixed(1)}M` 
                                      : content.performanceMetrics.views >= 1000 
                                        ? `${(content.performanceMetrics.views / 1000).toFixed(1)}K` 
                                        : content.performanceMetrics.views}
                                  </span>
                                )}
                                {content.performanceMetrics.likes && (
                                  <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    {content.performanceMetrics.likes >= 1000000 
                                      ? `${(content.performanceMetrics.likes / 1000000).toFixed(1)}M` 
                                      : content.performanceMetrics.likes >= 1000 
                                        ? `${(content.performanceMetrics.likes / 1000).toFixed(1)}K` 
                                        : content.performanceMetrics.likes}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            
            // For other sections, use normal rendering
            return renderSection[sectionKey] ? (
              <div 
                key={sectionKey}
                className={`${customization.enableSectionEntranceAnimations ? 'animate-fade-in' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {renderSection[sectionKey]()}
              </div>
            ) : null;
          })}
        </div>
        
        {/* Social links as floating fixed bar on bottom */}
        {user?.socialMedia?.filter(s => s.url).length > 0 && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 py-2 px-4 bg-white/10 backdrop-blur-lg rounded-full shadow-xl border border-white/20 z-50">
            <div className="flex gap-3">
              {user.socialMedia
                .filter(social => social.url)
                .map((social, index) => {
                  const icon = () => {
                    switch(social.platform.toLowerCase()) {
                      case 'instagram':
                        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
                      case 'youtube':
                        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>;
                      case 'twitter':
                      case 'x':
                        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>;
                      case 'tiktok':
                        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>;
                      case 'facebook':
                        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>;
                      case 'linkedin':
                        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>;
                      default:
                        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
                    }
                  };
                  
                  return (
                    <a 
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center h-10 w-10 rounded-full text-white transition-all transform hover:scale-110 ${
                        social.platform.toLowerCase() === 'instagram' ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400' :
                        social.platform.toLowerCase() === 'youtube' ? 'bg-red-600' :
                        social.platform.toLowerCase() === 'twitter' || social.platform.toLowerCase() === 'x' ? 'bg-blue-400' :
                        social.platform.toLowerCase() === 'tiktok' ? 'bg-black' :
                        social.platform.toLowerCase() === 'facebook' ? 'bg-blue-600' :
                        social.platform.toLowerCase() === 'linkedin' ? 'bg-blue-700' :
                        'bg-gray-700'
                      }`}
                      aria-label={social.platform}
                    >
                      {icon()}
                    </a>
                  );
                })}
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-color/50 to-transparent"
        style={{
          '--accent-color': customization.accentColor,
        } as React.CSSProperties}>
      </div>
    </div>
  );
};

export default MasonryLayout; 