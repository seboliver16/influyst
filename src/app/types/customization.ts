// Customization types and default values for user profiles

// Available theme options
export type ThemeOption = 'light' | 'dark' | 'system' | 'custom';

// Available layout options
export type LayoutOption = 'default' | 'minimal' | 'centered' | 'grid' | 'magazine' | 'portfolio' | 'creative';

// Available button style options
export type ButtonStyleOption = 
  'filled' | 
  'outline' | 
  'ghost' | 
  'link' |
  'subtle' |
  'gradient' |
  'glassmorphic' |
  'shadow' |
  'glow' |
  'animated' |
  'neon' |
  '3d';

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
  'quicksand' |
  'nunito' |
  'oswald' |
  'caveat' |
  'pacifico' |
  'bebasneue';

// Background pattern options
export type BackgroundPatternOption = 
  'none' |
  // Basic patterns
  'dots' |
  'grid' |
  'waves' |
  // Themed aesthetic patterns
  'summer' |
  'hamptons' |
  'girlboss' |
  'minimal' |
  'geometric' |
  'floral' |
  'abstract' |
  'creative' | 
  'professional' |
  // Additional artistic patterns
  'boho' |
  'retro' |
  'neon' |
  'cyberpunk' |
  'tropical' |
  'winter' |
  'gaming' |
  'artistic' |
  'luxury' |
  'fashion' |
  'fitness';

// Animation intensity options
export type AnimationIntensityOption = 'none' | 'minimal' | 'moderate' | 'advanced' | 'extreme';

// Content section display options
export type ContentSectionOption = 
  'socialStats' | 
  'testimonials' | 
  'content' | 
  'partnerships' | 
  'services' | 
  'socialLinks' |
  'contact' |
  'gallery' |
  'schedule' |
  'pricing' |
  'newsletter' |
  'achievements' |
  'reviews';

// Content grid layout options
export type ContentGridOption = 'minimal' | 'standard' | 'expanded' | 'featured' | 'masonry' | 'alternating' | 'interactive';

// Social media style display options
export type SocialDisplayOption = 'simple' | 'detailed' | 'cards' | 'statistics' | 'iconOnly' | 'branded' | 'animated' | 'interactive';

// Scroll effect options
export type ScrollEffectOption = 'none' | 'fade' | 'reveal' | 'parallax' | 'zoom' | 'blur';

// Customization interface for user profiles
export interface CustomizationSettings {
  // Theme setting (light, dark, system)
  theme: ThemeOption;
  
  // Main accent color in hex format (#RRGGBB)
  accentColor: string;
  
  // Secondary color in hex format (#RRGGBB)
  secondaryColor?: string;
  
  // Tertiary color in hex format (#RRGGBB)
  tertiaryColor?: string;
  
  // Text color for headings in hex format (#RRGGBB)
  headingColor?: string;
  
  // Text color for body content in hex format (#RRGGBB)
  bodyTextColor?: string;
  
  // Font family selection
  fontFamily: FontFamilyOption;
  
  // Heading font family (if different from body font)
  headingFontFamily?: FontFamilyOption;
  
  // Layout template choice
  layout: LayoutOption;
  
  // Background image URL (page background)
  backgroundImageUrl?: string;
  
  // Cover image URL (header/profile cover)
  coverImageUrl?: string;
  
  // Background pattern selection
  backgroundPattern?: BackgroundPatternOption;
  
  // Background pattern opacity (0-100)
  backgroundPatternOpacity?: number;
  
  // Background pattern scale (50-200)
  backgroundPatternScale?: number;
  
  // Background pattern color override
  backgroundPatternColorOverride?: string;
  
  // Whether to darken the cover photo for better text visibility
  coverDarken?: boolean;
  
  // Button style for primary actions
  buttonStyle: ButtonStyleOption;
  
  // Optional custom CSS
  customCSS?: string;
  
  // Card style (rounded corners, shadow, etc.)
  cardStyle?: 'sharp' | 'rounded' | 'pill' | 'neumorphic' | 'floating' | 'bordered' | 'minimal';
  
  // Border width for UI elements
  borderWidth?: 'none' | 'thin' | 'medium' | 'thick' | 'custom';
  
  // Custom border width in pixels
  customBorderWidth?: number;
  
  // Animation preference
  animations?: AnimationIntensityOption;
  
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
  profileHeaderStyle?: 'standard' | 'compact' | 'expanded' | 'minimal' | 'creative' | 'centered' | 'fullscreen';
  
  // Enable backdrop filter (frosted glass effect)
  enableBackdropFilter?: boolean;
  
  // Backdrop filter intensity (1-10)
  backdropFilterIntensity?: number;
  
  // Custom profile URL path (used for public URL)
  customUrlPath?: string;
  
  // Text color options for UI elements
  linkTextColor?: string;
  
  // Control embedded content visibility
  enableEmbeddedContent?: boolean;
  
  // Hide content on mobile view
  hideContentOnMobile?: boolean;
  
  // Section spacing (compact, normal, spacious)
  sectionSpacing?: 'compact' | 'normal' | 'relaxed' | 'custom';
  
  // Custom section spacing in rem
  customSectionSpacing?: number;
  
  // Section content alignment
  sectionAlignment?: 'left' | 'center' | 'right';
  
  // Section borders
  sectionBorderRadius?: string;
  
  // Section maximum width 
  sectionMaxWidth?: string;
  
  // Custom fonts via external URLs (Google Fonts, etc.)
  customFontUrls?: string[];
  
  // Cursor style (default, custom)
  customCursorStyle?: 'default' | 'pointer' | 'custom';
  
  // Custom cursor image URL
  customCursorUrl?: string;
  
  // Scroll effects for sections
  scrollEffects?: ScrollEffectOption;
  
  // Custom loading screen
  enableCustomLoadingScreen?: boolean;
  
  // Loading screen style
  loadingScreenStyle?: 'spinner' | 'progress' | 'fade' | 'custom';
  
  // Custom loading screen image or animation
  loadingScreenImageUrl?: string;
  
  // Enable audio background
  enableAudioBackground?: boolean;
  
  // Audio background URL
  audioBackgroundUrl?: string;
  
  // Audio background autoplay
  audioBackgroundAutoplay?: boolean;
  
  // Audio background volume (0-100)
  audioBackgroundVolume?: number;
  
  // Cover image height
  coverImageHeight?: 'small' | 'medium' | 'large' | 'custom';
  
  // Custom cover height
  customCoverHeight?: string;
  
  // Content width
  contentWidth?: 'narrow' | 'medium' | 'wide' | 'full' | 'custom';
  
  // Custom content width
  customContentWidth?: string;
  
  // Card colors
  cardBorderColor?: string;
  cardBackgroundColor?: string;
  
  // Card shadow intensity
  cardShadowIntensity?: 'none' | 'light' | 'medium' | 'strong' | 'custom';
  
  // Custom card shadow
  customCardShadow?: string;
  
  // Bio section spacing
  bioSectionSpacing?: 'compact' | 'comfortable' | 'spacious' | 'custom';
  
  // Custom bio section spacing
  customBioSectionSpacing?: string;
  
  // Enable glassmorphism
  enableGlassmorphism?: boolean;
  
  // Cover image stretch
  coverImageStretch?: boolean;
  
  // Background image attachment
  backgroundImageAttachment?: 'scroll' | 'fixed' | 'parallax';
  
  // Profile header height
  profileHeaderHeight?: number;
  
  // Profile image border width
  profileImageBorderWidth?: number;
  
  // Profile image size
  profileImageSize?: 'small' | 'medium' | 'large' | 'custom';
  
  // Custom profile image size
  customProfileImageSize?: number;
  
  // Show social icons in header
  showSocialIconsInHeader?: boolean;
  
  // Profile image shape
  profileImageShape?: 'circle' | 'square' | 'rounded' | 'hexagon' | 'custom';
  
  // Image filter for all images
  imageFilter?: 'none' | 'grayscale' | 'sepia' | 'blur' | 'brightness' | 'contrast' | 'hue-rotate' | 'custom';
  
  // Custom image filter
  customImageFilter?: string;
  
  // Enable interactive elements
  enableInteractiveElements?: boolean;
  
  // Interactive element style
  interactiveElementStyle?: 'hover' | 'click' | 'scroll' | 'custom';
  
  // Enable custom mouse trail
  enableCustomMouseTrail?: boolean;
  
  // Mouse trail style
  mouseTrailStyle?: 'particles' | 'trail' | 'glow' | 'custom';
  
  // Enable tilt effect on cards
  enableCardTiltEffect?: boolean;
  
  // Enable section entrance animations
  enableSectionEntranceAnimations?: boolean;
  
  // Section entrance animation style
  sectionEntranceAnimationStyle?: 'fade' | 'slide' | 'zoom' | 'flip' | 'custom';
}

// Default customization settings
export const DEFAULT_CUSTOMIZATION: CustomizationSettings = {
  theme: 'light',
  accentColor: '#6366f1', // Indigo color
  secondaryColor: '#8b5cf6', // Purple color
  tertiaryColor: '#ec4899', // Pink color
  fontFamily: 'inter',
  headingFontFamily: 'montserrat',
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
  backdropFilterIntensity: 5,
  coverDarken: true,
  enableEmbeddedContent: true,
  hideContentOnMobile: false,
  backgroundPattern: 'minimal',
  backgroundPatternOpacity: 30,
  backgroundPatternScale: 100,
  scrollEffects: 'none',
  enableInteractiveElements: false,
  profileImageShape: 'circle',
  imageFilter: 'none',
  enableCardTiltEffect: false,
  enableSectionEntranceAnimations: false,
  sectionEntranceAnimationStyle: 'fade',
};

// === Options Definitions ===

// Button style options
export const BUTTON_STYLES: Record<ButtonStyleOption, string> = {
  filled: 'Filled',
  outline: 'Outline',
  ghost: 'Ghost',
  link: 'Link',
  subtle: 'Subtle',
  gradient: 'Gradient',
  glassmorphic: 'Glassmorphic',
  shadow: 'Shadow',
  glow: 'Glow',
  animated: 'Animated',
  neon: 'Neon Glow',
  '3d': '3D Buttons'
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
  },
  magazine: {
    name: 'Magazine',
    description: 'Dynamic multi-column layout inspired by editorial design'
  },
  portfolio: {
    name: 'Portfolio',
    description: 'Image-focused layout ideal for visual creators'
  },
  creative: {
    name: 'Creative',
    description: 'Unique asymmetrical layout with creative positioning'
  }
};

// Font family display names
export const FONT_FAMILY_NAMES: Record<FontFamilyOption, string> = {
  inter: 'Inter (System)',
  poppins: 'Poppins', 
  roboto: 'Roboto',
  montserrat: 'Montserrat',
  playfair: 'Playfair Display',
  opensans: 'Open Sans',
  lato: 'Lato',
  raleway: 'Raleway',
  merriweather: 'Merriweather',
  josefin: 'Josefin Sans',
  quicksand: 'Quicksand',
  nunito: 'Nunito',
  oswald: 'Oswald',
  caveat: 'Caveat',
  pacifico: 'Pacifico',
  bebasneue: 'Bebas Neue'
};

// Background pattern options display names and descriptions
export const BACKGROUND_PATTERNS: Record<BackgroundPatternOption, { name: string; description: string; colors?: string[] }> = {
  none: {
    name: 'None',
    description: 'No pattern (solid background)'
  },
  dots: {
    name: 'Dots',
    description: 'Simple dot pattern'
  },
  grid: {
    name: 'Grid',
    description: 'Square grid pattern'
  },
  waves: {
    name: 'Waves',
    description: 'Subtle wave pattern'
  },
  summer: {
    name: 'Summer Vibes',
    description: 'Bright, tropical pattern with palm leaves and sunshine',
    colors: ['#FF9966', '#FFCC33', '#99CC33']
  },
  hamptons: {
    name: 'Hamptons',
    description: 'Elegant, coastal-inspired pattern with light blues and neutrals',
    colors: ['#E0F2F7', '#B6D9E2', '#88BDBC']
  },
  girlboss: {
    name: 'Girl Boss',
    description: 'Bold, empowering pattern with modern shapes and confident colors',
    colors: ['#FF5F7E', '#B565A7', '#45B5C4']
  },
  minimal: {
    name: 'Minimalist',
    description: 'Clean, subtle pattern for a professional look',
    colors: ['#F7F7F7', '#EFEFEF', '#DEDEDE']
  },
  geometric: {
    name: 'Geometric',
    description: 'Modern pattern with bold geometric shapes',
    colors: ['#6366F1', '#8B5CF6', '#EC4899']
  },
  floral: {
    name: 'Floral',
    description: 'Delicate floral inspired pattern',
    colors: ['#F9C5D1', '#F6E7C1', '#C8E7D8']
  },
  abstract: {
    name: 'Abstract',
    description: 'Artistic abstract pattern with modern shapes',
    colors: ['#3A86FF', '#FF006E', '#FFBE0B']
  },
  creative: {
    name: 'Creative',
    description: 'Playful, colorful pattern for creative profiles',
    colors: ['#FF9F1C', '#E71D36', '#2EC4B6']
  },
  professional: {
    name: 'Professional',
    description: 'Subtle, business-appropriate pattern',
    colors: ['#1A365D', '#2A4365', '#2C5282']
  },
  boho: {
    name: 'Bohemian',
    description: 'Free-spirited ethnic pattern with warm earthy tones',
    colors: ['#CB997E', '#DDBEA9', '#A5A58D']
  },
  retro: {
    name: 'Retro Wave',
    description: '80s inspired retro aesthetic with neon colors',
    colors: ['#FF00FF', '#00FFFF', '#FFFF00']
  },
  neon: {
    name: 'Neon Lights',
    description: 'Vibrant neon colors against a dark backdrop',
    colors: ['#F0FF42', '#FF14BD', '#14FFB1']
  },
  cyberpunk: {
    name: 'Cyberpunk',
    description: 'Futuristic digital aesthetic with vibrant contrasts',
    colors: ['#F706CF', '#06F7F7', '#F7F706']
  },
  tropical: {
    name: 'Tropical Paradise',
    description: 'Lush tropical pattern with vibrant greens and warm colors',
    colors: ['#06D6A0', '#FFD166', '#EF476F']
  },
  winter: {
    name: 'Winter Wonderland',
    description: 'Cool icy pattern with soft blues and whites',
    colors: ['#CAF0F8', '#90E0EF', '#00B4D8']
  },
  gaming: {
    name: 'Gamer',
    description: 'Bold gaming-inspired pattern with RGB accents',
    colors: ['#FF0000', '#00FF00', '#0000FF']
  },
  artistic: {
    name: 'Artistic Brushstrokes',
    description: 'Abstract painterly pattern with artistic texture',
    colors: ['#FB8500', '#219EBC', '#023047']
  },
  luxury: {
    name: 'Luxury',
    description: 'Elegant pattern with gold, black, and premium accents',
    colors: ['#D4AF37', '#000000', '#FFFFFF']
  },
  fashion: {
    name: 'Fashion Forward',
    description: 'Chic pattern with trendy colors and stylish elements',
    colors: ['#FF85A1', '#FFC0D3', '#FFEFF4']
  },
  fitness: {
    name: 'Fitness & Energy',
    description: 'Dynamic pattern with energetic colors for fitness creators',
    colors: ['#FF0054', '#390099', '#FFBD00']
  }
};

// Content sections
export const CONTENT_SECTIONS: Record<ContentSectionOption, string> = {
  socialStats: 'Social Media Stats',
  socialLinks: 'Social Media Links',
  testimonials: 'Testimonials',
  content: 'Content Examples',
  partnerships: 'Brand Partnerships',
  services: 'Services',
  contact: 'Contact Information',
  gallery: 'Photo Gallery',
  schedule: 'Availability & Schedule',
  pricing: 'Pricing Tables',
  newsletter: 'Newsletter Signup',
  achievements: 'Awards & Achievements',
  reviews: 'Reviews & Ratings'
};

// Social display style options
export const SOCIAL_DISPLAY_OPTIONS: Record<SocialDisplayOption, string> = {
  simple: 'Simple Icons',
  detailed: 'Detailed Cards',
  cards: 'Platform Cards',
  statistics: 'Statistics Focus',
  iconOnly: 'Icons Only',
  branded: 'Branded Colors',
  animated: 'Animated Icons',
  interactive: 'Interactive Hover'
};

// Scroll effect options
export const SCROLL_EFFECT_OPTIONS: Record<ScrollEffectOption, string> = {
  none: 'No Effects',
  fade: 'Fade In',
  reveal: 'Reveal',
  parallax: 'Parallax',
  zoom: 'Zoom',
  blur: 'Blur'
}; 