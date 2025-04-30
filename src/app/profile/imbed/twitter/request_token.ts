/* eslint-disable import/no-anonymous-default-export */
// pages/api/twitter/request-token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import oauthSignature from 'oauth-signature';
import crypto from 'crypto';

const requestTokenURL = 'https://api.twitter.com/oauth/request_token';
const callbackURL = 'https://influyst.com/profile'; // Replace with your callback URL

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const oauthConsumerKey = process.env.TWITTER_CONSUMER_KEY!;
  const oauthConsumerSecret = process.env.TWITTER_CONSUMER_SECRET!;

  const oauthNonce = crypto.randomBytes(16).toString('base64');
  const oauthTimestamp = Math.floor(Date.now() / 1000).toString();

  const parameters = {
    oauth_callback: callbackURL,
    oauth_consumer_key: oauthConsumerKey,
    oauth_nonce: oauthNonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: oauthTimestamp,
    oauth_version: '1.0',
  };

  const signature = oauthSignature.generate(
    'POST',
    requestTokenURL,
    parameters,
    oauthConsumerSecret,
    "",
    { encodeSignature: false }
  );

  const authHeader = `OAuth oauth_nonce="${oauthNonce}", oauth_callback="${encodeURIComponent(
    callbackURL
  )}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${oauthTimestamp}", oauth_consumer_key="${oauthConsumerKey}", oauth_signature="${signature}", oauth_version="1.0"`;

  try {
    const response = await axios.post(requestTokenURL, null, {
      headers: {
        Authorization: authHeader,
      },
    });

    const data = new URLSearchParams(response.data);
    const oauthToken = data.get('oauth_token');
    const oauthTokenSecret = data.get('oauth_token_secret');

    res.status(200).json({ oauthToken, oauthTokenSecret });
  } catch (error) {
    console.error('Error obtaining request token:', error);
    res.status(500).json({ error: 'Error obtaining request token' });
  }
};
