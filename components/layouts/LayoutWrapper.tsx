import React from 'react';
import { User } from '../../src/app/user';
import { CustomizationSettings } from '../../src/app/types/customization';
import LayoutFactory from './LayoutFactory';

interface LayoutWrapperProps {
  user: User;
  customization: CustomizationSettings;
  viewMode?: 'mobile' | 'desktop';
  containerStyle: React.CSSProperties;
  coverImageStyle: React.CSSProperties;
  cardStyle: React.CSSProperties;
  glassEffect: string;
  animationClasses: string;
  contentWidthClass: string;
  profileImageClasses: string;
  renderOrderedSections: () => React.ReactNode;
  renderSection: Record<string, () => React.ReactNode | null>;
}

/**
 * Layout Wrapper component that handles the integration with UserProfileContent
 * This component can be imported into UserProfileContent to use the layout factory
 */
const LayoutWrapper: React.FC<LayoutWrapperProps> = (props) => {
  // Always dispatch to LayoutFactory for all layouts (default, sidebar, magazine, etc.)
  return <LayoutFactory {...props} />;
};

export default LayoutWrapper; 