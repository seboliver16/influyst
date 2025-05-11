"use client";

import React, { useRef, useEffect, useState } from 'react';
import { User } from '../../../user';
import { CustomizationSettings } from '../../../types/customization';
import { 
  FiSmartphone,
  FiMonitor,
  FiGrid,
  FiGlobe
} from 'react-icons/fi';
import { Button } from "@/components/ui/button";
import { UserProfileContent } from '../../../../components/UserProfileContent';

interface ProfilePreviewProps {
  user: User;
  customization: CustomizationSettings;
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ user, customization }) => {
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('desktop');
  
  // When customization changes, update the scroll position to show the impact
  useEffect(() => {
    if (previewContainerRef.current) {
      // Reset scroll position to top when customization changes
      previewContainerRef.current.scrollTop = 0;
    }
  }, [customization, viewMode]);

  // Toggle between mobile and desktop preview
  const toggleViewMode = (mode: 'mobile' | 'desktop') => {
    setViewMode(mode);
  };

  // Define container classes based on view mode
  const getContainerClasses = () => {
    if (viewMode === 'mobile') {
      // Add transition properties for smoother switching
      return 'w-full max-w-[375px] aspect-[375/667] mx-auto border-[14px] md:border-[16px] border-gray-800 rounded-[28px] md:rounded-[36px] overflow-hidden shadow-xl relative transition-[max-width,aspect-ratio] duration-500 ease-in-out';
    }
    // Keep desktop view responsive, add transition
    return 'w-full max-w-6xl mx-auto relative rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 transition-[max-width,aspect-ratio] duration-500 ease-in-out';
  };
  
  // Get browser style URL bar for the preview
  const getUrlBar = () => {
    const baseDomain = typeof window !== 'undefined' ? window.location.hostname : 'influyst.com';
    const usernamePath = user?.username || 'profile';
    const url = customization.customUrlPath 
      ? `${baseDomain}/${usernamePath}/${customization.customUrlPath}`
      : `${baseDomain}/${usernamePath}`;
      
    return (
      <div className={`
        h-10 bg-gray-100 dark:bg-gray-800 
        flex items-center px-3 border-b 
        border-gray-200 dark:border-gray-700
        ${viewMode === 'mobile' ? 'rounded-t-xl' : 'rounded-t-md'}
      `}>
        <div className="flex space-x-2 mr-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className={`
          flex-1 mx-2 bg-white dark:bg-gray-700 text-sm px-3 py-1 
          rounded-full flex items-center justify-between
          border border-gray-300 dark:border-gray-600
        `}>
          <div className="flex items-center text-gray-600 dark:text-gray-300 truncate">
            <FiGlobe className="mr-2 h-3 w-3" />
            <span className="text-xs">{url}</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 text-gray-400 hover:text-gray-600 cursor-pointer">⭐</span>
          </div>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <FiGrid className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  };
  
  // Get mobile status bar
  const getMobileStatusBar = () => {
    return viewMode === 'mobile' && (
      <div className="absolute top-0 left-0 right-0 h-6 bg-black text-white flex items-center justify-between px-4 text-xs z-50 rounded-t-xl">
        <div>9:41</div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-3 bg-white rounded-sm"></div>
          <div className="text-xs">100%</div>
        </div>
      </div>
    );
  };
  
  // Get mobile home indicator (bottom bar)
  const getMobileHomeIndicator = () => {
    return viewMode === 'mobile' && (
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-black flex items-center justify-center z-50 rounded-b-xl">
        <div className="w-1/3 h-1 bg-white rounded-full"></div>
      </div>
    );
  };

  // Main container that holds the preview frame and UserProfileContent
  const previewContainerStyle: React.CSSProperties = {
    overflowY: 'auto' as const,
    paddingTop: viewMode === 'mobile' ? '24px' : '0',
    paddingBottom: viewMode === 'mobile' ? '24px' : '0',
    height: '100%',
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center mb-4 space-x-3 relative">
        {/* New styled device switcher */}
        <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => toggleViewMode('mobile')}
            className={`
              rounded-full flex items-center px-3
              ${viewMode === 'mobile' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'bg-transparent text-gray-500 dark:text-gray-400'}
              transition-all duration-200
            `}
          >
            <FiSmartphone className="mr-2 h-4 w-4" />
            Mobile
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => toggleViewMode('desktop')}
            className={`
              rounded-full flex items-center px-3
              ${viewMode === 'desktop' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'bg-transparent text-gray-500 dark:text-gray-400'}
              transition-all duration-200
            `}
          >
            <FiMonitor className="mr-2 h-4 w-4" />
            Desktop
          </Button>
        </div>
        
        {/* Device info label */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
            {viewMode === 'mobile' ? (
              <>
                <FiSmartphone className="mr-1 h-3 w-3" />
                375 × 667
              </>
            ) : (
              <>
                <FiMonitor className="mr-1 h-3 w-3" />
                Responsive
              </>
            )}
          </span>
        </div>
      </div>

      {/* Apply container classes and transitions */}
      <div className={`${getContainerClasses()} flex flex-col`}>
        {/* Mobile Status Bar */}
        {getMobileStatusBar()}
        
        {/* Browser Chrome */}
        {getUrlBar()}
        
        {/* Main Content Container */}
        <div 
          ref={previewContainerRef}
          style={previewContainerStyle}
          className="flex-grow overflow-y-auto relative"
        >
          {/* Use the UserProfileContent Component */}
          <UserProfileContent user={user} customization={customization} viewMode={viewMode} />
        </div>
        
        {/* Mobile Home Indicator */}
        {getMobileHomeIndicator()}
      </div>
    </div>
  );
};

export default ProfilePreview; 