import React, { useEffect, useState } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebase_app from '../../firebase/config';

const TikTokAuth: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const clientId = 'awtts9j7zygf8v9t'; // Replace with your TikTok client key
  const clientSecret = 'uTxwI0IXlROOP10z7B7nU03EuNt0RdJ4'; // Replace with your TikTok client secret
  const redirectUri = 'https://influyst/profile'; // Replace with your redirect URI
  const db = getFirestore(firebase_app);
  const auth = getAuth(firebase_app);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      fetchAccessToken(code);
    }
  }, []);

  const fetchAccessToken = async (code: string) => {
    try {
      const response = await fetch('https://open-api.tiktok.com/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_key: clientId,
          client_secret: clientSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
        }),
      });

      const data = await response.json();
      console.log('Access Token:', data);
      setAccessToken(data.data.access_token);
      saveTikTokInfo(data.data.access_token);
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  const saveTikTokInfo = async (accessToken: string) => {
    const user = auth.currentUser;
    if (!user) {
      console.error('No user is logged in');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        
        socialMedia: [
          {
            platform: 'tiktok',
            url: `https://www.tiktok.com/@${user.uid}`,
            apiKey: clientId,
            auth: accessToken,
          },
        ],
      });
      console.log('TikTok info saved to Firestore');
    } catch (error) {
      console.error('Error saving TikTok info to Firestore:', error);
    }
  };

  const handleLogin = () => {
    const authUrl = `https://www.tiktok.com/auth/authorize?client_key=${clientId}&scope=user.info.basic,video.list&response_type=code&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={handleLogin} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
        Connect TikTok Account
      </button>
      {accessToken && <div>Access Token: {accessToken}</div>}
    </div>
  );
};

export default TikTokAuth;
