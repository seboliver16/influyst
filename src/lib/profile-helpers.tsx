import { CustomizationSettings, ThemeOption, BACKGROUND_PATTERNS } from "../app/types/customization";
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
  // If there's a background image, prioritize that
   if (customization.backgroundImageUrl) {
    return {
      backgroundImage: `url(${customization.backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: customization.backgroundImageAttachment || 'fixed', // Keep background fixed while scrolling
    };
  }
  
  // Apply pattern if selected (except 'none')
  if (customization.backgroundPattern && customization.backgroundPattern !== 'none') {
    const patternOpacity = customization.backgroundPatternOpacity || 30;
    const patternScale = customization.backgroundPatternScale || 100;
    const isDark = customization.theme === 'dark';
    const accentColor = customization.backgroundPatternColorOverride || customization.accentColor;
    const secondaryColor = customization.secondaryColor || accentColor;
    const tertiaryColor = customization.tertiaryColor || secondaryColor;
    
    // Get colors from the pattern definition or use accent colors
    const patternDef = BACKGROUND_PATTERNS[customization.backgroundPattern] || BACKGROUND_PATTERNS.dots;
    const colors = patternDef.colors || [accentColor, secondaryColor, tertiaryColor];
    
    // For basic patterns, use simple SVGs
    if (['dots', 'grid', 'waves'].includes(customization.backgroundPattern)) {
      const patternColor = isDark ? 'rgba(255,255,255,' + (patternOpacity / 100) + ')' : 'rgba(0,0,0,' + (patternOpacity / 100) + ')';
      const scaleFactor = patternScale / 100;
    
      // Generate pattern SVG
      let patternSvg = '';
      const svgEncoded = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    
      switch (customization.backgroundPattern) {
        case 'dots':
          patternSvg = `<svg width="${20 * scaleFactor}" height="${20 * scaleFactor}" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <circle cx="3" cy="3" r="1.5" fill="${patternColor}"/>
          </svg>`;
          break;
        case 'grid':
          patternSvg = `<svg width="${20 * scaleFactor}" height="${20 * scaleFactor}" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h20v20H0V0zm1 1v18h18V1H1z" stroke="${patternColor}" fill="none" stroke-width="0.5"/>
          </svg>`;
          break;
        case 'waves':
          patternSvg = `<svg width="${40 * scaleFactor}" height="${20 * scaleFactor}" viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 10C5 5 10 15 20 10S35 5 40 10v10H0z" fill="${patternColor}" opacity="${patternOpacity / 100}"/>
          </svg>`;
          break;
        default:
          return {}; // Fallback if no pattern
      }
    
      return {
        backgroundImage: svgEncoded(patternSvg),
        backgroundSize: `${40 * scaleFactor}px ${40 * scaleFactor}px`,
        backgroundRepeat: 'repeat',
      };
    }
    
    // For themed patterns, use more complex CSS
    const opacity = patternOpacity / 100;
    
    // Apply themed patterns
    switch(customization.backgroundPattern) {
      case 'summer':
        return {
          background: `
            linear-gradient(120deg, rgba(255, 153, 102, ${opacity * 0.5}) 0%, rgba(255, 204, 51, ${opacity * 0.3}) 100%),
            radial-gradient(circle at 85% 10%, rgba(153, 204, 51, ${opacity * 0.4}) 0%, transparent 60%)
          `,
          backgroundSize: `${100 * patternScale/100}% ${100 * patternScale/100}%`,
          backgroundAttachment: 'fixed',
        };
        
      case 'hamptons':
        return {
          background: `
            linear-gradient(180deg, rgba(224, 242, 247, ${opacity * 0.7}) 0%, rgba(182, 217, 226, ${opacity * 0.5}) 100%),
            repeating-linear-gradient(90deg, rgba(136, 189, 188, ${opacity * 0.2}) 0px, rgba(136, 189, 188, ${opacity * 0.2}) 1px, transparent 1px, transparent ${10 * patternScale/100}px)
          `,
          backgroundSize: `100% 100%, ${20 * patternScale/100}px ${20 * patternScale/100}px`,
          backgroundAttachment: 'fixed',
        };
        
      case 'girlboss':
        return {
          background: `
            linear-gradient(45deg, rgba(255, 95, 126, ${opacity * 0.2}) 0%, rgba(181, 101, 167, ${opacity * 0.3}) 50%, rgba(69, 181, 196, ${opacity * 0.2}) 100%),
            radial-gradient(circle at 10% 90%, rgba(255, 95, 126, ${opacity * 0.4}) 0%, transparent 40%),
            radial-gradient(circle at 90% 10%, rgba(69, 181, 196, ${opacity * 0.4}) 0%, transparent 40%)
          `,
          backgroundSize: `${100 * patternScale/100}% ${100 * patternScale/100}%`,
          backgroundAttachment: 'fixed',
        };
        
      case 'minimal':
        return {
          background: `
            linear-gradient(90deg, rgba(247, 247, 247, ${opacity}) 1px, transparent 1px),
            linear-gradient(180deg, rgba(247, 247, 247, ${opacity}) 1px, transparent 1px)
          `,
          backgroundSize: `${20 * patternScale/100}px ${20 * patternScale/100}px`,
        };
        
      case 'geometric':
        return {
          background: `
            linear-gradient(45deg, rgba(99, 102, 241, ${opacity * 0.2}) 0%, rgba(139, 92, 246, ${opacity * 0.2}) 50%, rgba(236, 72, 153, ${opacity * 0.2}) 100%),
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, ${opacity * 0.3}) 0%, transparent 25%),
            radial-gradient(circle at 75% 75%, rgba(236, 72, 153, ${opacity * 0.3}) 0%, transparent 25%)
          `,
          backgroundSize: `${100 * patternScale/100}% ${100 * patternScale/100}%`,
          backgroundAttachment: 'fixed',
        };
        
      case 'floral':
        return {
          background: `
            radial-gradient(circle at 25% 25%, rgba(249, 197, 209, ${opacity * 0.6}) 0%, transparent 30%),
            radial-gradient(circle at 75% 75%, rgba(200, 231, 216, ${opacity * 0.6}) 0%, transparent 30%),
            radial-gradient(circle at 50% 50%, rgba(246, 231, 193, ${opacity * 0.6}) 0%, transparent 50%)
          `,
          backgroundSize: `${50 * patternScale/100}px ${50 * patternScale/100}px`,
        };
        
      case 'abstract':
        return {
          background: `
            linear-gradient(130deg, rgba(58, 134, 255, ${opacity * 0.2}) 0%, rgba(255, 0, 110, ${opacity * 0.2}) 50%, rgba(255, 190, 11, ${opacity * 0.2}) 100%),
            radial-gradient(circle at 80% 20%, rgba(58, 134, 255, ${opacity * 0.4}) 0%, transparent 40%),
            radial-gradient(circle at 20% 80%, rgba(255, 0, 110, ${opacity * 0.4}) 0%, transparent 40%)
          `,
          backgroundSize: `${100 * patternScale/100}% ${100 * patternScale/100}%`,
          backgroundAttachment: 'fixed',
        };
        
      case 'creative':
        return {
          background: `
            linear-gradient(to right, rgba(255, 159, 28, ${opacity * 0.3}) 0%, transparent 100%),
            linear-gradient(to bottom, rgba(231, 29, 54, ${opacity * 0.3}) 0%, transparent 100%),
            linear-gradient(to left, rgba(46, 196, 182, ${opacity * 0.3}) 0%, transparent 100%)
          `,
          backgroundSize: `${200 * patternScale/100}% ${200 * patternScale/100}%`,
          backgroundAttachment: 'fixed',
        };
        
      case 'professional':
        return {
          background: `
            linear-gradient(180deg, rgba(26, 54, 93, ${opacity * 0.1}) 0%, rgba(42, 67, 101, ${opacity * 0.1}) 100%),
            repeating-linear-gradient(90deg, rgba(44, 82, 130, ${opacity * 0.05}) 0px, rgba(44, 82, 130, ${opacity * 0.05}) 1px, transparent 1px, transparent ${10 * patternScale/100}px)
          `,
          backgroundSize: `100% 100%, ${20 * patternScale/100}px ${20 * patternScale/100}px`,
        };
        
      case 'boho':
        return {
          background: `
            linear-gradient(120deg, rgba(203, 153, 126, ${opacity * 0.2}) 0%, rgba(221, 190, 169, ${opacity * 0.2}) 50%, rgba(165, 165, 141, ${opacity * 0.2}) 100%),
            repeating-linear-gradient(45deg, transparent, transparent ${10 * patternScale/100}px, rgba(203, 153, 126, ${opacity * 0.1}) ${10 * patternScale/100}px, rgba(203, 153, 126, ${opacity * 0.1}) ${20 * patternScale/100}px)
          `,
          backgroundSize: `100% 100%, ${40 * patternScale/100}px ${40 * patternScale/100}px`,
          backgroundAttachment: 'fixed',
        };
        
      case 'retro':
        return {
          background: `
            linear-gradient(0deg, transparent 0%, rgba(0, 0, 0, ${opacity * 0.8}) 100%),
            linear-gradient(90deg, rgba(255, 0, 255, ${opacity * 0.4}) 0%, rgba(0, 255, 255, ${opacity * 0.4}) 50%, rgba(255, 255, 0, ${opacity * 0.4}) 100%),
            repeating-linear-gradient(0deg, transparent, transparent ${10 * patternScale/100}px, rgba(0, 0, 0, ${opacity * 0.1}) ${10 * patternScale/100}px, rgba(0, 0, 0, ${opacity * 0.1}) ${12 * patternScale/100}px)
          `,
          backgroundSize: `100% 100%, 100% 100%, 100% ${20 * patternScale/100}px`,
          backgroundAttachment: 'fixed',
        };
        
      case 'neon':
        return {
          background: `
            linear-gradient(0deg, rgba(0, 0, 0, ${opacity * 0.9}) 0%, rgba(0, 0, 0, ${opacity * 0.9}) 100%),
            radial-gradient(circle at 20% 50%, rgba(240, 255, 66, ${opacity * 0.6}) 0%, transparent 20%),
            radial-gradient(circle at 80% 50%, rgba(255, 20, 189, ${opacity * 0.6}) 0%, transparent 20%),
            radial-gradient(circle at 50% 80%, rgba(20, 255, 177, ${opacity * 0.6}) 0%, transparent 20%)
          `,
          backgroundSize: `100% 100%, ${200 * patternScale/100}% ${200 * patternScale/100}%`,
          backgroundAttachment: 'fixed',
        };
        
      case 'cyberpunk':
        return {
          background: `
            linear-gradient(0deg, rgba(0, 0, 0, ${opacity * 0.9}) 0%, rgba(0, 0, 0, ${opacity * 0.9}) 100%),
            linear-gradient(45deg, rgba(247, 6, 207, ${opacity * 0.5}) 0%, transparent 70%),
            linear-gradient(135deg, rgba(6, 247, 247, ${opacity * 0.5}) 0%, transparent 70%),
            linear-gradient(225deg, rgba(247, 247, 6, ${opacity * 0.5}) 0%, transparent 70%),
            repeating-linear-gradient(90deg, transparent, transparent ${5 * patternScale/100}px, rgba(255, 255, 255, ${opacity * 0.05}) ${5 * patternScale/100}px, rgba(255, 255, 255, ${opacity * 0.05}) ${6 * patternScale/100}px)
          `,
          backgroundSize: `100% 100%, 100% 100%, 100% 100%, 100% 100%, ${10 * patternScale/100}px ${10 * patternScale/100}px`,
          backgroundAttachment: 'fixed',
        };
        
      case 'tropical':
        return {
          background: `
            linear-gradient(120deg, rgba(6, 214, 160, ${opacity * 0.3}) 0%, rgba(255, 209, 102, ${opacity * 0.3}) 50%, rgba(239, 71, 111, ${opacity * 0.3}) 100%),
            radial-gradient(circle at 80% 20%, rgba(6, 214, 160, ${opacity * 0.5}) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(239, 71, 111, ${opacity * 0.5}) 0%, transparent 50%)
          `,
          backgroundSize: `100% 100%, ${150 * patternScale/100}% ${150 * patternScale/100}%`,
          backgroundAttachment: 'fixed',
        };
        
      case 'winter':
        return {
          background: `
            linear-gradient(180deg, rgba(202, 240, 248, ${opacity * 0.5}) 0%, rgba(144, 224, 239, ${opacity * 0.3}) 50%, rgba(0, 180, 216, ${opacity * 0.2}) 100%),
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, ${opacity * 0.8}) 0%, transparent 15%),
            radial-gradient(circle at 70% 60%, rgba(255, 255, 255, ${opacity * 0.8}) 0%, transparent 10%),
            radial-gradient(circle at 50% 40%, rgba(255, 255, 255, ${opacity * 0.8}) 0%, transparent 8%)
          `,
          backgroundSize: `100% 100%, ${100 * patternScale/100}% ${100 * patternScale/100}%`,
          backgroundAttachment: 'fixed',
        };
        
      case 'gaming':
        return {
          background: `
            linear-gradient(0deg, rgba(0, 0, 0, ${opacity * 0.9}) 0%, rgba(0, 0, 0, ${opacity * 0.9}) 100%),
            linear-gradient(90deg, rgba(255, 0, 0, ${opacity * 0.5}) 0%, rgba(0, 255, 0, ${opacity * 0.5}) 50%, rgba(0, 0, 255, ${opacity * 0.5}) 100%),
            repeating-linear-gradient(45deg, transparent, transparent ${10 * patternScale/100}px, rgba(255, 255, 255, ${opacity * 0.05}) ${10 * patternScale/100}px, rgba(255, 255, 255, ${opacity * 0.05}) ${11 * patternScale/100}px)
          `,
          backgroundSize: `100% 100%, 100% 100%, ${20 * patternScale/100}px ${20 * patternScale/100}px`,
          backgroundAttachment: 'fixed',
        };
        
      case 'artistic':
        return {
          background: `
            linear-gradient(120deg, rgba(251, 133, 0, ${opacity * 0.2}) 0%, rgba(33, 158, 188, ${opacity * 0.2}) 50%, rgba(2, 48, 71, ${opacity * 0.2}) 100%),
            radial-gradient(ellipse at 30% 40%, rgba(251, 133, 0, ${opacity * 0.4}) 0%, transparent 70%),
            radial-gradient(ellipse at 70% 60%, rgba(33, 158, 188, ${opacity * 0.4}) 0%, transparent 70%)
          `,
          backgroundSize: `100% 100%, ${100 * patternScale/100}% ${100 * patternScale/100}%`,
          backgroundAttachment: 'fixed',
        };
        
      case 'luxury':
        return {
          background: `
            linear-gradient(45deg, rgba(0, 0, 0, ${opacity * 0.7}) 0%, rgba(0, 0, 0, ${opacity * 0.7}) 100%),
            repeating-linear-gradient(45deg, transparent, transparent ${10 * patternScale/100}px, rgba(212, 175, 55, ${opacity * 0.3}) ${10 * patternScale/100}px, rgba(212, 175, 55, ${opacity * 0.3}) ${11 * patternScale/100}px),
            repeating-linear-gradient(135deg, transparent, transparent ${10 * patternScale/100}px, rgba(212, 175, 55, ${opacity * 0.3}) ${10 * patternScale/100}px, rgba(212, 175, 55, ${opacity * 0.3}) ${11 * patternScale/100}px)
          `,
          backgroundSize: `100% 100%, ${20 * patternScale/100}px ${20 * patternScale/100}px`,
          backgroundAttachment: 'fixed',
        };
        
      case 'fashion':
        return {
          background: `
            linear-gradient(120deg, rgba(255, 133, 161, ${opacity * 0.3}) 0%, rgba(255, 192, 211, ${opacity * 0.2}) 50%, rgba(255, 239, 244, ${opacity * 0.1}) 100%),
            radial-gradient(circle at 20% 30%, rgba(255, 133, 161, ${opacity * 0.4}) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(255, 192, 211, ${opacity * 0.4}) 0%, transparent 40%)
          `,
          backgroundSize: `100% 100%, ${120 * patternScale/100}% ${120 * patternScale/100}%`,
          backgroundAttachment: 'fixed',
        };
        
      case 'fitness':
        return {
          background: `
            linear-gradient(45deg, rgba(255, 0, 84, ${opacity * 0.3}) 0%, rgba(57, 0, 153, ${opacity * 0.3}) 50%, rgba(255, 189, 0, ${opacity * 0.3}) 100%),
            repeating-linear-gradient(0deg, transparent, transparent ${5 * patternScale/100}px, rgba(255, 255, 255, ${opacity * 0.05}) ${5 * patternScale/100}px, rgba(255, 255, 255, ${opacity * 0.05}) ${6 * patternScale/100}px)
          `,
          backgroundSize: `100% 100%, ${10 * patternScale/100}px ${10 * patternScale/100}px`,
          backgroundAttachment: 'fixed',
        };
        
      default:
        // Fallback to a simple gradient based on accent colors
        return {
          background: `linear-gradient(135deg, ${colors[0]}${Math.round(opacity * 25).toString(16)} 0%, ${colors[1]}${Math.round(opacity * 25).toString(16)} 100%)`,
          backgroundSize: `${100 * patternScale/100}% ${100 * patternScale/100}%`,
          backgroundAttachment: 'fixed',
        };
    }
  }
  
  // Return empty if no background image or pattern, base colors are handled by CSS
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