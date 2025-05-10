import React, { useState } from 'react';
import { User } from '../../src/app/user';
import { CustomizationSettings } from '../../src/app/types/customization';
import MasonryLayout from './MasonryLayout';
import CreatorLayout from './CreatorLayout';
import PortfolioLayout from './PortfolioLayout';
import { Button } from '../ui/button';

// Example minimal user data for preview
const sampleUser: User = {
  id: 'sample-user',
  name: 'Jane Designer',
  username: 'janedesigns',
  email: 'jane@example.com',
  profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  bio: 'Creative designer and influencer specializing in minimalist aesthetics and sustainable fashion.',
  location: 'San Francisco, CA',
  industries: ['Design', 'Fashion', 'Lifestyle'],
  socialMedia: [
    { platform: 'Instagram', url: 'https://instagram.com', followerCount: 32500 },
    { platform: 'YouTube', url: 'https://youtube.com', followerCount: 45800 },
    { platform: 'TikTok', url: 'https://tiktok.com', followerCount: 125000 }
  ],
  contentExamples: [
    {
      title: 'Summer Minimalist Fashion Guide 2023',
      platform: 'Instagram',
      url: 'https://instagram.com/post/1',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
      performanceMetrics: { views: 24300, likes: 1850, comments: 94 }
    },
    {
      title: 'Sustainable Living Room Makeover',
      platform: 'YouTube',
      url: 'https://youtube.com/watch?v=123',
      imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb',
      performanceMetrics: { views: 87600, likes: 5432, comments: 321 }
    },
    {
      title: 'Office Essentials - Productivity Setup',
      platform: 'Instagram',
      url: 'https://instagram.com/post/2',
      imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174',
      performanceMetrics: { views: 18750, likes: 945, comments: 63 }
    },
    {
      title: '5 Minute Morning Routine - Get Organized',
      platform: 'TikTok',
      url: 'https://tiktok.com/video/123',
      imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
      performanceMetrics: { views: 212400, likes: 35670, comments: 1254 }
    }
  ],
  partners: [
    {
      name: 'EcoGoods',
      logoUrl: 'https://via.placeholder.com/150',
      description: 'Sustainable home products brand',
      websiteUrl: 'https://example.com'
    },
    {
      name: 'MinStyle',
      logoUrl: 'https://via.placeholder.com/150',
      description: 'Minimalist fashion retailer',
      websiteUrl: 'https://example.com'
    }
  ]
};

// Default customization for preview
const defaultCustomization: Partial<CustomizationSettings> = {
  theme: 'light',
  accentColor: '#6366f1',
  secondaryColor: '#8b5cf6',
  tertiaryColor: '#ec4899',
  fontFamily: 'inter',
  layout: 'masonry',
  enableHoverEffects: true,
  animations: 'moderate',
  imageFilter: 'none'
};

// Simple section renderers for preview
const renderSection = {
  socialStats: () => <div className="p-4 bg-white rounded-lg shadow mb-4">Social Stats Section</div>,
  testimonials: () => <div className="p-4 bg-white rounded-lg shadow mb-4">Testimonials Section</div>,
  content: () => <div className="p-4 bg-white rounded-lg shadow mb-4">Content Section</div>,
  partnerships: () => <div className="p-4 bg-white rounded-lg shadow mb-4">Partnerships Section</div>,
  services: () => <div className="p-4 bg-white rounded-lg shadow mb-4">Services Section</div>,
  socialLinks: () => <div className="p-4 bg-white rounded-lg shadow mb-4">Social Links Section</div>,
  contact: () => <div className="p-4 bg-white rounded-lg shadow mb-4">Contact Section</div>,
  gallery: () => <div className="p-4 bg-white rounded-lg shadow mb-4">Gallery Section</div>,
  schedule: () => <div className="p-4 bg-white rounded-lg shadow mb-4">Schedule Section</div>,
  pricing: () => <div className="p-4 bg-white rounded-lg shadow mb-4">Pricing Section</div>,
  newsletter: () => <div className="p-4 bg-white rounded-lg shadow mb-4">Newsletter Section</div>,
  achievements: () => <div className="p-4 bg-white rounded-lg shadow mb-4">Achievements Section</div>,
  reviews: () => <div className="p-4 bg-white rounded-lg shadow mb-4">Reviews Section</div>
};

const renderOrderedSections = () => (
  <div>
    {Object.values(renderSection).map((renderFunc, index) => (
      <React.Fragment key={index}>
        {renderFunc()}
      </React.Fragment>
    ))}
  </div>
);

interface LayoutsPreviewProps {
  user?: User;
  customization?: Partial<CustomizationSettings>;
}

const LayoutsPreview: React.FC<LayoutsPreviewProps> = ({ 
  user = sampleUser, 
  customization = defaultCustomization 
}) => {
  const [selectedLayout, setSelectedLayout] = useState<string>(customization.layout || 'masonry');
  
  // Merge customization with selected layout
  const mergedCustomization = {
    ...defaultCustomization,
    ...customization,
    layout: selectedLayout
  } as CustomizationSettings;
  
  // Placeholder values for layout props
  const containerStyle = {};
  const coverImageStyle = {
    backgroundImage: user.profilePicture ? `url(${user.profilePicture})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '200px',
    position: 'relative' as const
  };
  const cardStyle = {};
  const glassEffect = '';
  const animationClasses = '';
  const contentWidthClass = 'max-w-6xl';
  const profileImageClasses = '';
  
  const layoutProps = {
    user,
    customization: mergedCustomization,
    viewMode: 'desktop' as const,
    containerStyle,
    coverImageStyle,
    cardStyle,
    glassEffect,
    animationClasses,
    contentWidthClass,
    profileImageClasses,
    renderOrderedSections,
    renderSection
  };
  
  // Render layout based on selection
  const renderLayout = () => {
    switch (selectedLayout) {
      case 'masonry':
        return <MasonryLayout {...layoutProps} />;
      case 'creator':
        return <CreatorLayout {...layoutProps} />;
      case 'portfolio':
        return <PortfolioLayout {...layoutProps} />;
      default:
        return <div>Select a layout to preview</div>;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Layout selector */}
      <div className="bg-white shadow-md p-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Layout Preview</h1>
          <div className="flex gap-2">
            <Button 
              variant={selectedLayout === 'masonry' ? 'default' : 'outline'}
              onClick={() => setSelectedLayout('masonry')}
            >
              Masonry
            </Button>
            <Button 
              variant={selectedLayout === 'creator' ? 'default' : 'outline'}
              onClick={() => setSelectedLayout('creator')}
            >
              Creator
            </Button>
            <Button 
              variant={selectedLayout === 'portfolio' ? 'default' : 'outline'}
              onClick={() => setSelectedLayout('portfolio')}
            >
              Portfolio
            </Button>
          </div>
        </div>
      </div>
      
      {/* Layout preview */}
      <div className="flex-grow bg-gray-100">
        {renderLayout()}
      </div>
    </div>
  );
};

export default LayoutsPreview; 