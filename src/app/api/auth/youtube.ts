// /pages/api/auth/youtube.ts
import { google } from 'googleapis';
import { getFirestore } from 'firebase-admin/firestore'; // Firebase Admin SDK
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      // Firebase service account details here
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  `${process.env.BASE_URL}/api/auth/youtube/callback`
);

export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { url: string; }): void; new(): any; }; }; }) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/yt-analytics.readonly',
    ],
  });

  res.status(200).json({ url: authUrl });
}
