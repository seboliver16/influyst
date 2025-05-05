import { CustomizationSettings, ThemeOption } from "../app/types/customization";
import { cn } from "./utils";
import { 
  FiInstagram, 
  FiYoutube, 
  FiTwitter, 
  FiGlobe
} from 'react-icons/fi';
import { RiTiktokFill } from 'react-icons/ri';
import React from 'react';

// Define font family based on customization
export const getFontFamily = (fontFamily: string | undefined) => {
  switch (fontFamily) {
    case 'poppins': return 'Poppins, sans-serif';
    case 'roboto': return 'Roboto, sans-serif';
    case 'montserrat': return 'Montserrat, sans-serif';
    case 'playfair': return 'Playfair Display, serif';
    case 'opensans': return 'Open Sans, sans-serif';
    case 'lato': return 'Lato, sans-serif';
    case 'raleway': return 'Raleway, sans-serif';
    case 'merriweather': return 'Merriweather, serif';
    case 'josefin': return 'Josefin Sans, sans-serif';
    case 'quicksand': return 'Quicksand, sans-serif';
    default: return 'Inter, sans-serif';
  }
};

// Define animations based on customization settings
export const getAnimationClasses = (customization: CustomizationSettings) => {
  switch (customization.animations) {
    case 'none': return '';
    case 'moderate': return 'transition-all duration-500 hover:scale-[1.02] hover:shadow-lg';
    case 'advanced': return 'transition-all duration-500 hover:scale-[1.03] hover:shadow-xl transform-gpu';
    default: return 'transition-all duration-300 hover:scale-[1.01] hover:shadow-sm'; // minimal
  }
};

// Extract RGB values from hex color for CSS variables
export const hexToRgb = (hex: string | undefined) => {
  if (!hex) return '99, 102, 241'; // Default indigo color
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '99, 102, 241'; 
};

// Get primary button classes based on button style
export const getPrimaryButtonClasses = (customization: CustomizationSettings) => {
  const base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  const sizeSm = 'h-9 px-3';

  switch (customization.buttonStyle) {
    case 'outline':
      return cn(base, sizeSm, 
        'border-2 border-accent text-accent bg-transparent', 
        'hover:bg-accent/10'
      );
    case 'subtle':
      return cn(base, sizeSm, 
        'bg-accent/10 text-accent', // Always use accent text color
        'hover:bg-accent/20'
      );
    case 'gradient':
      return cn(base, sizeSm, 
        'bg-gradient-to-r from-accent to-secondary text-white shadow-sm' // Force white text
      );
    case 'glassmorphic':
      return cn(base, sizeSm, 
        'bg-accent/20 backdrop-blur-lg border border-accent/20 text-accent', // Always use accent text color
        'hover:bg-accent/30'
      );
    case 'shadow':
      return cn(base, sizeSm, 
        'bg-accent text-white shadow-lg shadow-accent/30 hover:shadow-accent/50' // Force white text
      );
    case 'glow':
      return cn(base, sizeSm, 
        'bg-accent text-white shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)] hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.7)]' // Force white text
      );
    default: // filled
      return cn(base, sizeSm, 
        'bg-accent text-white hover:bg-accent/90' // Force white text
      );
  }
};

// Get secondary button classes based on button style
export const getSecondaryButtonClasses = (customization: CustomizationSettings) => {
  // Note: Secondary buttons generally don't use accent colors directly
  // They adapt to light/dark mode
  const base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  const sizeSm = 'h-9 px-3';
  const isDark = customization.theme === 'dark';

  switch (customization.buttonStyle) {
    case 'outline':
      return cn(base, sizeSm, 
        'bg-transparent border-2',
        isDark ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'
      );
    case 'subtle':
       return cn(base, sizeSm,
         isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
      );
    case 'gradient': // Use subtle for secondary gradient
      return cn(base, sizeSm,
        isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
      );
    case 'glassmorphic':
       return cn(base, sizeSm, 
         'backdrop-blur-lg border', 
        isDark ? 'bg-black/20 border-gray-700/30' : 'bg-white/10 border-white/20'
      );
    case 'shadow': // Use filled for secondary shadow
      return cn(base, sizeSm, 
        'shadow-md hover:shadow-lg',
        isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
      );
    case 'glow': // Use filled for secondary glow
       return cn(base, sizeSm,
         'shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(255,255,255,0.1)]',
        isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
      );
    default: // filled
       return cn(base, sizeSm,
         isDark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      );
  }
};

// Get card border radius
export const getCardRadius = (customization: CustomizationSettings) => {
  switch (customization.cardStyle) {
    case 'sharp': return '0px';
    case 'pill': return '24px';
    case 'neumorphic': return '1rem';
    default: return '0.5rem'; // rounded
  }
};

// Get border width 
export const getBorderWidth = (customization: CustomizationSettings) => {
  switch (customization.borderWidth) {
    case 'none': return '0px';
    case 'medium': return '2px';
    case 'thick': return '3px';
    default: return '1px'; // thin
  }
};

// Get card style including shadows, etc.
export const getCardStyles = (customization: CustomizationSettings): React.CSSProperties => {
  const isDark = customization.theme === 'dark';
  const baseStyle = {
    borderRadius: 'var(--card-radius)',
    borderWidth: 'var(--border-width)',
    borderColor: 'var(--border-color)', // Use CSS variable for border color
  };
  
  switch (customization.cardStyle) {
    case 'neumorphic':
      return {
        ...baseStyle,
        boxShadow: isDark
          ? '5px 5px 10px #1a1a1a, -5px -5px 10px #333333'
          : '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff',
        background: isDark ? '#2a2a2a' : '#f0f0f0',
        border: 'none' // Neumorphic usually doesn't have a border
      };
    case 'sharp':
      return {
        ...baseStyle,
        boxShadow: 'none'
      };
    default: // rounded
      return {
         ...baseStyle,
         boxShadow: 'none', 
         background: isDark ? 'var(--card-bg-dark, #1f2937)' : 'var(--card-bg-light, #ffffff)', // Allow override via CSS var
      };
  }
};

// Get the social icon component based on platform name
export const getSocialIcon = (platform: string | undefined): React.ReactNode => {
  switch (platform?.toLowerCase()) {
    case 'instagram': return <FiInstagram />;
    case 'youtube': return <FiYoutube />;
    case 'twitter': return <FiTwitter />;
    case 'tiktok': return <RiTiktokFill />;
    default: return <FiGlobe />;
  }
};

// Get glass morphism effect classes if enabled
export const getGlassmorphismClasses = (customization: CustomizationSettings) => {
  const isDark = customization.theme === 'dark';
  return customization.enableBackdropFilter 
    ? cn('backdrop-blur-md border', isDark ? 'bg-gray-900/60 border-gray-800/30' : 'bg-white/50 border-white/20')
    : '';
};

// Function to generate the CSS variables string
export const getCustomizationStyles = (customization: CustomizationSettings): React.CSSProperties => {
  const isDark = customization.theme === 'dark';
  const accentRgb = hexToRgb(customization.accentColor);
  const secondaryRgb = hexToRgb(customization.secondaryColor || customization.accentColor);

  return {
    '--accent-color': customization.accentColor || '#6366f1',
    '--accent-rgb': accentRgb,
    '--secondary-color': customization.secondaryColor || customization.accentColor || '#6366f1',
    '--secondary-rgb': secondaryRgb,
    '--heading-color': customization.headingColor || (isDark ? '#ffffff' : '#1f2937'),
    '--body-color': customization.bodyTextColor || (isDark ? '#e5e7eb' : '#4b5563'),
    '--link-color': customization.linkTextColor || customization.accentColor || '#6366f1',
    '--card-radius': getCardRadius(customization),
    '--border-width': getBorderWidth(customization),
    '--border-color': isDark ? '#374151' : '#e5e7eb', // Use slightly darker gray for dark mode borders
    fontFamily: getFontFamily(customization.fontFamily),
    // Add base background/text colors for the page body
    backgroundColor: isDark ? '#111827' : '#f9fafb', // Example: dark gray / very light gray
    color: 'var(--body-color)',
  } as React.CSSProperties;
};

// Get the overall container background style (for page background image/gradient)
export const getContainerStyle = (customization: CustomizationSettings): React.CSSProperties => {
   if (customization.backgroundImageUrl) {
    return {
      backgroundImage: `url(${customization.backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed', // Keep background fixed while scrolling
    };
  }
  // Return empty if no background image, base colors are handled by getCustomizationStyles
  return {}; 
};

// Get the cover image style (for profile header)
export const getCoverImageStyle = (customization: CustomizationSettings): React.CSSProperties => {
   return customization.coverImageUrl ? {
    backgroundImage: `url(${customization.coverImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {
    // Use CSS variables for the gradient
    background: `linear-gradient(to right, var(--accent-color), var(--secondary-color))`
  };
}; 