import React from 'react';
import { User, ContentExample, Partner, ServiceOffering, Testimonial } from '../../src/app/user';
import { CustomizationSettings } from '../../src/app/types/customization';

export interface BaseLayoutProps {
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

const BaseLayout: React.FC<BaseLayoutProps> = ({ 
  user,
  customization,
  viewMode = 'desktop',
  containerStyle,
  coverImageStyle,
  cardStyle,
  glassEffect,
  animationClasses,
  contentWidthClass,
  profileImageClasses,
  renderOrderedSections,
  renderSection
}) => {
  // This is a base component that should be extended by specific layout implementations
  return null;
};

export default BaseLayout; 