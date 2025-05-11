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

interface MasonryLayoutProps {
  user: User;
  customization: CustomizationSettings;
  children: React.ReactNode;
}

export const MasonryLayout: React.FC<MasonryLayoutProps> = ({ 
  user, 
  customization,
  children 
}) => {
  // Apply customization styles
  const customStyles = getCustomizationStyles(customization);
  const containerStyle = getContainerStyle(customization);
  const glassEffect = getGlassmorphismClasses(customization);
  const primaryButtonClass = getPrimaryButtonClasses(customization);
  const secondaryButtonClass = getSecondaryButtonClasses(customization);

  return (
    <div className="min-h-screen w-full" style={customStyles}>
      {/* Main container with background */}
      <div className="relative w-full min-h-screen" style={containerStyle}>
        {/* Sticky header */}
        <header className={cn(
          "sticky top-0 z-50 w-full border-b",
          "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm",
          "border-gray-200 dark:border-gray-800"
        )}>
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-center justify-between h-16">
              {/* Profile info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user.name || user.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                      <span className="text-lg font-bold text-gray-400 dark:text-gray-500">
                        {(user.name || user.username || '?').charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-base font-medium text-gray-900 dark:text-white">
                    {user.name || user.username}
                  </h1>
                  {user.tagline && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.tagline}
                    </p>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                {/* Social links */}
                {user.socialMedia && user.socialMedia.length > 0 && (
                  <div className="hidden sm:flex gap-2 mr-2">
                    {user.socialMedia.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {getSocialIcon(social.platform)}
                      </a>
                    ))}
                  </div>
                )}

                {user.contactPreferences?.showContactForm && (
                  <Button size="sm" className={primaryButtonClass}>
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                )}
                {user.personalWebsite && (
                  <Button 
                    size="sm"
                    className={secondaryButtonClass}
                    onClick={() => window.open(user.personalWebsite, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Website
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="mx-auto max-w-6xl px-4 py-8">
          {/* Bio section */}
          {user.bio && (
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {user.bio}
              </p>
            </div>
          )}

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};