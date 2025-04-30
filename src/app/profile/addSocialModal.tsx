/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase_app from "../firebase/config";
import axios from "axios";
import { SocialMedia } from "../user";

type SocialMediaConfig = {
  [key: string]: string;
};

const clientIdMap: SocialMediaConfig = {
  tiktok: "awtts9j7zygf8v9t",
  youtube: "1020141181358-cotnce0h50dinv2grts8ql951jt5i5si.apps.googleusercontent.com",
  twitter: "your-twitter-consumer-key", // Replace with your Twitter consumer key
  // Add other social media client IDs here
};

const clientSecretMap: SocialMediaConfig = {
  tiktok: "uTxwI0IXlROOP10z7B7nU03EuNt0RdJ4",
  youtube: "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",
  twitter: "your-twitter-consumer-secret", // Replace with your Twitter consumer secret
  // Add other social media client secrets here
};

const redirectUriMap: SocialMediaConfig = {
  tiktok: "https://influyst.com/profile",
  youtube: "https://influyst.com/profile",
  twitter: "https://influyst.com/profile", // Replace with your Twitter redirect URI
  // Add other social media redirect URIs here
};

interface AddSocialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (social: string) => void;
}

const AddSocialModal: React.FC<AddSocialModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [selectedSocial, setSelectedSocial] = useState<string | null>(null);
  const [keyStats, setKeyStats] = useState<any>(null);
  const db = getFirestore(firebase_app);
  const auth = getAuth(firebase_app);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (selectedSocial && code) {
      fetchAccessToken(selectedSocial, code);
    }
  }, [selectedSocial]);

  const fetchAccessToken = async (social: string, code: string) => {
    const tokenEndpoint = "https://oauth2.googleapis.com/token";
    const clientKey = clientIdMap[social];
    const clientSecret = clientSecretMap[social];
    const redirectUri = redirectUriMap[social];

    try {
      const response = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          client_id: clientKey,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        saveSocialMediaInfo(social, data.access_token, data.refresh_token, data.scope);
      } else {
        console.error("Failed to fetch access token:", data);
      }
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  const saveSocialMediaInfo = async (
    social: string,
    accessToken: string,
    refreshToken: string | null,
    scope: string
  ) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is logged in");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.exists() ? userDocSnapshot.data() : {};
      const existingSocialMedia = userData.socialMedia || [];

      // Ensure the new platform is added or updated
      const updatedSocialMedia = existingSocialMedia.filter(
        (entry: SocialMedia) => entry.platform !== social
      );
      updatedSocialMedia.push({
        platform: social,
        accessToken,
        refreshToken,
        scope,
      });

      await updateDoc(userDocRef, { socialMedia: updatedSocialMedia });

      console.log(`${social} info saved to Firestore:`, updatedSocialMedia);
    } catch (error) {
      console.error(`Error saving ${social} info to Firestore:`, error);
    }
  };

  const fetchKeyStats = async (social: string, accessToken: string) => {
    if (social === "youtube") {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&mine=true`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setKeyStats(data.items[0]?.statistics);
      } catch (error) {
        console.error("Error fetching YouTube statistics:", error);
      }
    } else if (social === "twitter") {
      try {
        const response = await axios.get(
          `https://api.twitter.com/2/users/by/username/your_username`, // Replace 'your_username' with the username of the authenticated user
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = response.data;
        setKeyStats({
          followerCount: data.data.public_metrics.followers_count,
          tweetCount: data.data.public_metrics.tweet_count,
        });
      } catch (error) {
        console.error("Error fetching Twitter statistics:", error);
      }
    }
  };

  const handleSelect = (social: string) => {
    setSelectedSocial(social);
    if (social === "twitter") {
      requestTwitterToken();
    } else {
      let authUrl = "";
      switch (social) {
        case "tiktok":
          authUrl = `https://www.tiktok.com/auth/authorize?client_key=${clientIdMap[social]}&scope=user.info.basic,video.list&response_type=code&redirect_uri=${redirectUriMap[social]}`;
          break;
        case "youtube":
          authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientIdMap[social]}&redirect_uri=${redirectUriMap[social]}&response_type=code&scope=https://www.googleapis.com/auth/youtube.readonly`;
          break;
        // Add cases for other social media platforms
        default:
          console.error("Unsupported social media platform");
          return;
      }
      window.location.href = authUrl;
    }
  };

  const requestTwitterToken = async () => {
    try {
      const response = await axios.post("/api/twitter/request-token");
      const { oauthToken } = response.data;
      const authUrl = `https://api.twitter.com/oauth/authorize?oauth_token=${oauthToken}`;
      window.location.href = authUrl;
    } catch (error) {
      console.error("Error requesting Twitter token:", error);
    }
  };

  if (!isOpen) return null;

  const socialMediaOptions = [
    { name: "YouTube", icon: "/youtube.png" },
    { name: "TikTok", icon: "/tiktok.png" },
    { name: "Instagram", icon: "/instagram.png" },
    { name: "Facebook", icon: "/facebook.png" },
    { name: "Twitter", icon: "/x.png" },
    { name: "LinkedIn", icon: "/linkedin.png" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-4 max-w-md w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Add Social Media</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-700">
            &times;
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {socialMediaOptions.map((option) => (
            <div
              key={option.name}
              className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => handleSelect(option.name.toLowerCase())}
            >
              <img src={option.icon} alt={option.name} className="w-6 h-6 mr-2" />
              <span>{option.name}</span>
            </div>
          ))}
        </div>
        {keyStats && (
          <div className="mt-4">
            <h3 className="text-md font-semibold">Key Statistics:</h3>
            {selectedSocial === "youtube" && (
              <>
                <p>Subscriber Count: {keyStats?.subscriberCount || "N/A"}</p>
                <p>View Count: {keyStats?.viewCount || "N/A"}</p>
                <p>Video Count: {keyStats?.videoCount || "N/A"}</p>
              </>
            )}
            {selectedSocial === "twitter" && (
              <>
                <p>Follower Count: {keyStats?.followerCount || "N/A"}</p>
                <p>Tweet Count: {keyStats?.tweetCount || "N/A"}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSocialModal;
