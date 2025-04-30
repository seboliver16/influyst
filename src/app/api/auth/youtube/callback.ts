// /pages/api/auth/youtube/callback.ts
import { google } from 'googleapis';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth'; // If you need to get the user ID

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  `${process.env.BASE_URL}/api/auth/youtube/callback`
);

export default async function handler(req: { query: { code: any; }; }, res: { redirect: (arg0: string) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) {
  const { code } = req.query;

  try {
    // Exchange authorization code for access and refresh tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const db = getFirestore();
    const userId = 'your_user_id'; // Get the logged-in user ID from session or cookie

    // Save YouTube tokens to the user's profile in Firebase
    await db.collection('users').doc(userId).update({
      socialMedia: [
        {
          platform: 'youtube',
          apiKey: tokens.access_token,
          auth: tokens.refresh_token,
        },
      ],
    });

    // Redirect back to the dashboard
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error during YouTube OAuth callback:', error);
    res.status(500).send('Error during YouTube authentication.');
  }
}
