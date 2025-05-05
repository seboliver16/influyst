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
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
        await saveSocialMediaInfo(social, data.access_token, data.refresh_token, data.scope);
        onSelect(social); // Notify parent component about successful selection
      } else {
        console.error("Failed to fetch access token:", data);
      }
    } catch (error) {
      console.error("Error fetching access token:", error);
    } finally {
      setIsLoading(false);
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
    setIsLoading(true);
    
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
          setIsLoading(false);
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
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const socialMediaOptions = [
    { 
      name: "YouTube", 
      icon: (
        <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
      ),
      color: "bg-red-50"
    },
    { 
      name: "TikTok", 
      icon: (
        <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      ),
      color: "bg-gray-50"
    },
    { 
      name: "Instagram", 
      icon: (
        <svg className="w-8 h-8 text-pink-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: "bg-pink-50"
    },
    { 
      name: "Facebook", 
      icon: (
        <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.736-.9 10.125-5.864 10.125-11.854z" />
        </svg>
      ),
      color: "bg-blue-50"
    },
    { 
      name: "Twitter", 
      icon: (
        <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
        </svg>
      ),
      color: "bg-blue-50"
    },
    { 
      name: "LinkedIn", 
      icon: (
        <svg className="w-8 h-8 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: "bg-blue-50"
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-gray-800">Connect Social Media</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mt-6">
          <p className="text-gray-600 mb-4">Connect your social media accounts to showcase your content and increase your visibility to potential partners.</p>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600">Connecting to your account...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {socialMediaOptions.map((option) => (
                <div
                  key={option.name}
                  className={`${option.color} flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-1`}
                  onClick={() => handleSelect(option.name.toLowerCase())}
                >
                  <div className="mb-3">{option.icon}</div>
                  <span className="font-medium">{option.name}</span>
                </div>
              ))}
            </div>
          )}
          
          {keyStats && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-2">Account Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedSocial === "youtube" && (
                  <>
                    <div className="bg-white p-3 rounded-lg border border-gray-100 text-center">
                      <span className="block text-2xl font-bold text-gray-800">{keyStats?.subscriberCount || "0"}</span>
                      <span className="text-sm text-gray-500">Subscribers</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100 text-center">
                      <span className="block text-2xl font-bold text-gray-800">{keyStats?.viewCount || "0"}</span>
                      <span className="text-sm text-gray-500">Views</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100 text-center">
                      <span className="block text-2xl font-bold text-gray-800">{keyStats?.videoCount || "0"}</span>
                      <span className="text-sm text-gray-500">Videos</span>
                    </div>
                  </>
                )}
                
                {selectedSocial === "twitter" && (
                  <>
                    <div className="bg-white p-3 rounded-lg border border-gray-100 text-center">
                      <span className="block text-2xl font-bold text-gray-800">{keyStats?.followerCount || "0"}</span>
                      <span className="text-sm text-gray-500">Followers</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100 text-center">
                      <span className="block text-2xl font-bold text-gray-800">{keyStats?.tweetCount || "0"}</span>
                      <span className="text-sm text-gray-500">Tweets</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSocialModal;
