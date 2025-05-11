import React from 'react';
import { User } from '../app/user';
import { CustomizationSettings } from '../app/types/customization';
import { 
  getCustomizationStyles, 
  getContainerStyle, 
  getCoverImageStyle,
  getGlassmorphismClasses,
  getPrimaryButtonClasses,
  getSecondaryButtonClasses
} from '../lib/profile-helpers';
import { cn } from '../lib/utils';
import { Button } from '@/components/ui/button';
import { ExternalLink, Mail } from 'lucide-react';

interface DefaultLayoutProps {
  user: User;
  customization: CustomizationSettings;
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ 
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
        {/* Cover image/banner */}
        <div 
          className="w-full h-48 sm:h-64 relative"
          style={coverStyle}
        >
          {customization.coverDarken && (
            <div className="absolute inset-0 bg-black/30" />
          )}
        </div>

        {/* Profile header */}
        <div className={cn(
          "relative mx-auto max-w-6xl px-4 -mt-16",
          glassEffect
        )}>
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
            {/* Profile image */}
            <div className={cn(
              "w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg",
              "relative z-10 bg-white dark:bg-gray-800"
            )}>
              {user.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt={user.name || user.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                  <span className="text-4xl font-bold text-gray-400 dark:text-gray-500">
                    {(user.name || user.username || '?').charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Profile info */}
            <div className="flex-1 text-center sm:text-left pb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {user.name || user.username}
              </h1>
              {user.tagline && (
                <p className="mt-1 text-gray-600 dark:text-gray-300 text-lg">
                  {user.tagline}
                </p>
              )}
              {user.location && (
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  📍 {user.location}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pb-4">
              {user.contactPreferences?.showContactForm && (
                <Button className={primaryButtonClass}>
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              )}
              {user.personalWebsite && (
                <Button 
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

        {/* Main content */}
        <main className="mx-auto max-w-6xl px-4 py-8">
          {children}
        </main>
      </div>
    </div>
  );
};