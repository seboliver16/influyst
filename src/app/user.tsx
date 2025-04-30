// user.ts
import { Timestamp } from 'firebase/firestore';

export interface Partner {
  company: string;
  link: string;
  logoUrl: string;
  description: string;
}

export interface SocialMedia {
  platform: string;
  code?: string; // OAuth authorization code
  accessToken?: string; // Access token
  refreshToken?: string; // Refresh token
  scope?: string; // OAuth scope
}



export interface ContentExample {
  platform: 'Instagram' | 'YouTube' | 'Twitter' | 'TikTok' | 'Facebook' | 'LinkedIn';
  url: string;
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
  socialMedia: SocialMedia[];
  partners: Partner[]; // Existing array for partners
  contentExamples: ContentExample[]; // New array for examples of content
}
