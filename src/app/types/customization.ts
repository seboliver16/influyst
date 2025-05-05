// Customization types and default values for user profiles

// Available theme options
export type ThemeOption = 'light' | 'dark' | 'system';

// Available layout options
export type LayoutOption = 'default' | 'minimal' | 'centered' | 'grid';

// Available button style options
export type ButtonStyleOption = 'filled' | 'outline' | 'subtle' | 'gradient' | 'glassmorphic' | 'shadow' | 'glow';

// Available font family options
export type FontFamilyOption = 
  'inter' | 
  'poppins' | 
  'roboto' | 
  'montserrat' | 
  'playfair' | 
  'opensans' |
  'lato' |
  'raleway' |
  'merriweather' |
  'josefin' |
  'quicksand';

// Content section display options
export type ContentSectionOption = 
  'socialStats' | 
  'testimonials' | 
  'content' | 
  'partnerships' | 
  'services' | 
  'socialLinks' |
  'contact';

// Content grid layout options
export type ContentGridOption = 'minimal' | 'standard' | 'expanded' | 'featured';

// Social media style display options
export type SocialDisplayOption = 'simple' | 'detailed' | 'cards' | 'statistics' | 'iconOnly';

// Customization interface for user profiles
export interface CustomizationSettings {
  // Theme setting (light, dark, system)
  theme: ThemeOption;
  
  // Main accent color in hex format (#RRGGBB)
  accentColor: string;
  
  // Secondary color in hex format (#RRGGBB)
  secondaryColor?: string;
  
  // Text color for headings in hex format (#RRGGBB)
  headingColor?: string;
  
  // Text color for body content in hex format (#RRGGBB)
  bodyTextColor?: string;
  
  // Font family selection
  fontFamily: FontFamilyOption;
  
  // Layout template choice
  layout: LayoutOption;
  
  // Background image URL (page background)
  backgroundImageUrl?: string;
  
  // Cover image URL (header/profile cover)
  coverImageUrl?: string;
  
  // Whether to darken the cover photo for better text visibility
  coverDarken?: boolean;
  
  // Button style for primary actions
  buttonStyle: ButtonStyleOption;
  
  // Optional custom CSS
  customCSS?: string;
  
  // Card style (rounded corners, shadow, etc.)
  cardStyle?: 'sharp' | 'rounded' | 'pill' | 'neumorphic';
  
  // Border width for UI elements
  borderWidth?: 'none' | 'thin' | 'medium' | 'thick';
  
  // Animation preference (minimal, moderate, none)
  animations?: 'none' | 'minimal' | 'moderate' | 'advanced';
  
  // Content section ordering (enables drag/drop reordering)
  contentSectionOrder?: ContentSectionOption[];
  
  // Content grid layout option
  contentGridLayout?: ContentGridOption;
  
  // Social media display style
  socialDisplayStyle?: SocialDisplayOption;
  
  // Whether to show platform logos/icons
  showPlatformIcons?: boolean;
  
  // Whether to enable hover effects
  enableHoverEffects?: boolean;
  
  // Profile header style
  profileHeaderStyle?: 'standard' | 'compact' | 'expanded' | 'minimal';
  
  // Enable backdrop filter (frosted glass effect)
  enableBackdropFilter?: boolean;
  
  // Custom profile URL path (used for public URL)
  customUrlPath?: string;
  
  // Text color options for UI elements
  linkTextColor?: string;
  buttonTextColor?: string;
  
  // Enable/disable content features
  enableEmbeddedContent?: boolean;
  hideContentOnMobile?: boolean;
}

// Default customization settings
export const DEFAULT_CUSTOMIZATION: CustomizationSettings = {
  theme: 'light',
  accentColor: '#6366f1', // Indigo color
  secondaryColor: '#8b5cf6', // Purple color
  fontFamily: 'inter',
  layout: 'default',
  buttonStyle: 'filled',
  cardStyle: 'rounded',
  borderWidth: 'thin',
  animations: 'minimal',
  contentSectionOrder: ['socialStats', 'socialLinks', 'testimonials', 'content', 'partnerships', 'services', 'contact'],
  contentGridLayout: 'standard',
  socialDisplayStyle: 'detailed',
  showPlatformIcons: true,
  enableHoverEffects: true,
  profileHeaderStyle: 'standard',
  enableBackdropFilter: false,
  coverDarken: true,
  enableEmbeddedContent: true,
  hideContentOnMobile: false,
};

// Font family display names
export const FONT_FAMILY_NAMES: Record<FontFamilyOption, string> = {
  inter: 'Inter',
  poppins: 'Poppins',
  roboto: 'Roboto',
  montserrat: 'Montserrat',
  playfair: 'Playfair Display',
  opensans: 'Open Sans',
  lato: 'Lato',
  raleway: 'Raleway',
  merriweather: 'Merriweather',
  josefin: 'Josefin Sans',
  quicksand: 'Quicksand'
};

// Layout option display names and descriptions
export const LAYOUT_OPTIONS: Record<LayoutOption, { name: string; description: string }> = {
  default: { 
    name: 'Standard', 
    description: 'Classic two-column layout with profile on the left and content on the right' 
  },
  minimal: { 
    name: 'Minimal', 
    description: 'Clean single-column layout with minimal decoration'
  },
  centered: { 
    name: 'Centered', 
    description: 'Focused single-column layout with centered content'
  },
  grid: { 
    name: 'Grid', 
    description: 'Modern grid-based layout for showcasing multiple content items'
  }
};

// Button style display names
export const BUTTON_STYLES: Record<ButtonStyleOption, string> = {
  filled: 'Filled',
  outline: 'Outline',
  subtle: 'Subtle',
  gradient: 'Gradient',
  glassmorphic: 'Glass',
  shadow: 'Shadow',
  glow: 'Glow'
};

// Content section name mapping
export const CONTENT_SECTIONS: Record<ContentSectionOption, string> = {
  socialStats: 'Social Media Stats',
  socialLinks: 'Social Links',
  testimonials: 'Client Testimonials',
  content: 'Featured Content',
  partnerships: 'Brand Partnerships',
  services: 'Services & Rates',
  contact: 'Contact'
};

// Social display style options
export const SOCIAL_DISPLAY_OPTIONS: Record<SocialDisplayOption, string> = {
  simple: 'Simple Icons',
  detailed: 'Detailed Cards',
  cards: 'Platform Cards',
  statistics: 'Statistics Focus',
  iconOnly: 'Icons Only'
}; 