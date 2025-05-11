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
import { ExternalLink, Mail } from 'lucide-react';

interface CreatorLayoutProps {
  user: User;
  customization: CustomizationSettings;
  children: React.ReactNode;
}

export const CreatorLayout: React.FC<CreatorLayoutProps> = ({ 
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
        {/* Hero section */}
        <div className="relative w-full aspect-[16/9] max-h-[70vh]" style={coverStyle}>
          {customization.coverDarken && (
            <div className="absolute inset-0 bg-black/40" />
          )}
          
          {/* Centered profile content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
            {/* Profile image */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white/20 overflow-hidden shadow-xl mb-6">
              {user.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt={user.name || user.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800/50">
                  <span className="text-4xl sm:text-5xl font-bold text-white/70">
                    {(user.name || user.username || '?').charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              {user.name || user.username}
            </h1>
            
            {user.tagline && (
              <p className="text-xl sm:text-2xl font-light mb-6 max-w-2xl drop-shadow">
                {user.tagline}
              </p>
            )}

            {/* Social links */}
            {user.socialMedia && user.socialMedia.length > 0 && (
              <div className="flex gap-4 mb-8">
                {user.socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-white transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center backdrop-blur-sm">
                      {getSocialIcon(social.platform)}
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-4">
              {user.contactPreferences?.showContactForm && (
                <Button size="lg" className={cn(primaryButtonClass, "shadow-lg")}>
                  <Mail className="h-5 w-5 mr-2" />
                  Get in Touch
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
          </div>
        </div>

        {/* Main content */}
        <main className="mx-auto max-w-6xl px-4 py-12">
          {children}
        </main>
      </div>
    </div>
  );
};