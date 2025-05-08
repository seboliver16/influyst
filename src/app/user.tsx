// user.ts
import { Timestamp } from 'firebase/firestore';
import { CustomizationSettings } from './types/customization';

export interface Partner {
  company: string;
  link: string;
  logoUrl: string;
  description: string;
}

export interface SocialMedia {
  platform: string;
  handle?: string;
  url?: string;
  code?: string; // OAuth authorization code
  accessToken?: string; // Access token
  refreshToken?: string; // Refresh token
  scope?: string; // OAuth scope
  followerCount?: number;
  engagementRate?: number;
  reachMetrics?: {
    averageReach: number;
    averageImpressions: number;
    averageEngagement: number;
  };
  demographics?: AudienceDemographics;
}

export interface ContentExample {
  title: string;
  platform: 'Instagram' | 'YouTube' | 'Twitter' | 'X' | 'TikTok' | 'Facebook' | 'LinkedIn';
  url: string;
  description?: string;
  imageUrl?: string;
  performanceMetrics?: {
    views?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    engagement?: number;
  };
  sponsored?: boolean;
  partnerName?: string;
}

export interface ServiceOffering {
  name: string;
  description: string;
  price: string;
  deliverables: string[];
  turnaroundTime?: string;
  platformType: 'Instagram' | 'YouTube' | 'Twitter' | 'TikTok' | 'Facebook' | 'LinkedIn' | 'Other';
}

export interface AudienceDemographics {
  ageGroups?: {
    '13-17'?: number;
    '18-24'?: number;
    '25-34'?: number;
    '35-44'?: number;
    '45-54'?: number;
    '55-64'?: number;
    '65+'?: number;
  };
  genderDistribution?: {
    male?: number;
    female?: number;
    other?: number;
  };
  topLocations?: {
    [country: string]: number;
  };
  interests?: string[];
}

export interface Testimonial {
  company: string;
  personName?: string;
  position?: string;
  text: string;
  logo?: string;
  date?: Timestamp;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  bio: string;
  industries: string[];
  profilePicture: string;
  isSubscribed: boolean;
  dateJoined: Timestamp;
  
  // Social media profiles and analytics
  socialMedia: SocialMedia[];
  
  // Brand partnerships and collaborations
  partners: Partner[];
  
  // Examples of content created
  contentExamples: ContentExample[];
  
  // Services and pricing information
  services?: ServiceOffering[];
  
  // Audience demographics aggregated across platforms
  audienceStats?: AudienceDemographics;
  
  // Client testimonials
  testimonials?: Testimonial[];
  
  // Creator info
  location?: string;
  languages?: string[];
  experienceSince?: number; // Year started as creator
  personalWebsite?: string;
  calendlyLink?: string;
  tagline?: string; // Short professional headline
  
  // Contact preferences
  contactPreferences?: {
    preferredMethod: 'email' | 'form' | 'social' | 'website';
    publicEmail?: boolean;
    showContactForm?: boolean;
    showBookingLink?: boolean;
  };
  
  // Media kit analytics
  mediaKitAnalytics?: {
    views: number;
    uniqueVisitors: number;
    contactClicks: number;
    lastUpdated: Timestamp;
  };

  customization?: CustomizationSettings;

  createdAt?: Timestamp;
  lastLogin?: Timestamp;
  profileLastUpdated?: Timestamp;
}

export interface SocialMediaLink {
  platform: string;
  handle?: string;
  url?: string;
  code?: string; // OAuth authorization code
  accessToken?: string; // Access token
  refreshToken?: string; // Refresh token
  scope?: string; // OAuth scope
  followerCount?: number;
  engagementRate?: number;
  reachMetrics?: {
    averageReach: number;
    averageImpressions: number;
    averageEngagement: number;
  };
  demographics?: AudienceDemographics;
}
