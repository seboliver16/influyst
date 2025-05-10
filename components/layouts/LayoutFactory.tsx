import React from 'react';
import { BaseLayoutProps } from './BaseLayout';
import MasonryLayout from './MasonryLayout';
import CreatorLayout from './CreatorLayout';
import PortfolioLayout from './PortfolioLayout';
import SidebarLayout from './SidebarLayout';
import MagazineLayout from './MagazineLayout';
import DefaultLayout from './DefaultLayout';

/**
 * Layout Factory component that selects the correct layout component
 * based on the customization settings
 */
const LayoutFactory: React.FC<BaseLayoutProps> = (props) => {
  const { customization } = props;
  
  // Select the appropriate layout based on the layout option
  switch (customization.layout) {
    case 'masonry':
      return <MasonryLayout {...props} />;
    
    case 'creator':
      return <CreatorLayout {...props} />;
    
    case 'portfolio':
      return <PortfolioLayout {...props} />;
    
    case 'sidebar':
      return <SidebarLayout {...props} />;
    
    case 'magazine':
      return <MagazineLayout {...props} />;
    
    // Additional layouts will be implemented in the future
    // case 'carousel':
    // case 'fullscreen':
    // case 'cards':
    // case 'creative':
    // case 'grid':
    // case 'centered':
    // case 'minimal':
    
    // Default to CreatorLayout for all other layouts
    default:
      return <CreatorLayout {...props} />;
  }
};

export default LayoutFactory; 