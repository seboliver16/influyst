import React from 'react';
import { User } from '../app/user';
import { CustomizationSettings } from '../app/types/customization';
import { 
  getCustomizationStyles, 
  getContainerStyle, 
  getCoverImageStyle,
  getGlassmorphismClasses,
  getPrimaryButtonClasses,
  getSecondaryButtonClasses,
  getSocialIcon
} from '../lib/profile-helpers';
import { cn } from '../lib/utils';
import { Button } from '@/components/ui/button';
import { ExternalLink, Mail, ChevronDown } from 'lucide-react';

interface PortfolioLayoutProps {
  user: User;
  customization: CustomizationSettings;
  children: React.ReactNode;
}

export const PortfolioLayout: React.FC<PortfolioLayoutProps> = ({ 
  user, 
  customization,
  children 
}) => {
  // Apply customization styles
  const customStyles = getCustomizationStyles(customization);
  const containerStyle = getContainerStyle(customization);
  const coverStyle = getCoverImageStyle(customization);
  const glassEffect = getGlassmorphismClasses(customization);
  const primaryButtonClass = getPrimaryButtonClasses(customization);
  const secondaryButtonClass = getSecondaryButtonClasses(customization);

  return (
    <div className="min-h-screen w-full" style={customStyles}>
      {/* Main container with background */}
      <div className="relative w-full min-h-screen" style={containerStyle}>
        {/* Full-width header */}
        <header className="relative w-full min-h-screen flex flex-col">
          {/* Background */}
          <div className="absolute inset-0" style={coverStyle}>
            {customization.coverDarken && (
              <div className="absolute inset-0 bg-black/50" />
            )}
          </div>

          {/* Content */}
          <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-16">
            {/* Profile image */}
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-white/20 overflow-hidden shadow-xl mb-8">
              {user.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt={user.name || user.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800/50">
                  <span className="text-5xl sm:text-6xl font-bold text-white/70">
                    {(user.name || user.username || '?').charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <div className="text-center text-white">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {user.name || user.username}
              </h1>
              
              {user.tagline && (
                <p className="text-xl sm:text-2xl font-light mb-8 max-w-2xl mx-auto drop-shadow">
                  {user.tagline}
                </p>
              )}

              {/* Industries/Tags */}
              {user.industries && user.industries.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {user.industries.map((industry, index) => (
                    <span 
                      key={index}
                      className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {user.contactPreferences?.showContactForm && (
                  <Button size="lg" className={cn(primaryButtonClass, "shadow-lg")}>
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Me
                  </Button>
                )}
                {user.personalWebsite && (
                  <Button 
                    size="lg"
                    className={cn(secondaryButtonClass, "shadow-lg backdrop-blur-sm")}
                    onClick={() => window.open(user.personalWebsite, '_blank')}
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Visit Website
                  </Button>
                )}
              </div>

              {/* Social links */}
              {user.socialMedia && user.socialMedia.length > 0 && (
                <div className="flex justify-center gap-4">
                  {user.socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 hover:text-white transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center backdrop-blur-sm">
                        {getSocialIcon(social.platform)}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <ChevronDown className="w-8 h-8 text-white/70 animate-bounce" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-6xl px-4 py-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};