// user.ts
import { Timestamp } from 'firebase/firestore';

export interface SocialMedia {
  platform: 'instagram' | 'tiktok' | 'youtube';
  url: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  isSubscribed: boolean;
  dateJoined: Timestamp;
  socialMedia: SocialMedia[];
}