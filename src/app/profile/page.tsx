/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useCallback, useEffect, useState } from 'react';
import { User } from '../user';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import firebase_app from '../firebase/config';
import { useRouter } from 'next/navigation';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import Cropper, { Area } from 'react-easy-crop';
import Crop from 'react-easy-crop';

import { v4 as uuidv4 } from 'uuid';
import { FaCamera } from 'react-icons/fa';
import { getCroppedImg } from '../admin/uploadImg/uploadImage';
import Partners from './partners';
import SocialsDisplay from './examples';
import ExampleDisplay from './examples';
import AddSocialModal from './addSocialModal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const getBlob = (data: unknown): Blob => {
  if (data instanceof Blob) {
    return data;
  } else {
    throw new Error('Expected a Blob object');
  }
};

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0});
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>({
  width: 100, // Default values, will update upon image load
  height: 100,
  x: 0,
  y: 0
});

  const [isUploading, setIsUploading] = useState(false);
  const [showCropperModal, setShowCropperModal] = useState(false);
  const [showAddSocialModal, setShowAddSocialModal] = useState(false);
  
  const [location, setLocation] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [newLanguage, setNewLanguage] = useState('');
  const [experienceSince, setExperienceSince] = useState<number | undefined>();
  const [personalWebsite, setPersonalWebsite] = useState('');
  const [calendlyLink, setCalendlyLink] = useState('');
  const [tagline, setTagline] = useState('');
  
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const storage = getStorage(firebase_app);
  const router = useRouter();

  useEffect(() => {
    const loadUserInfo = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data() as User;
          setUser(userData);
          setUsername(userData.username);
          setEmail(userData.email);
          setName(userData.name);
          setBio(userData.bio);
          setProfilePicture(userData.profilePicture);
          
          setLocation(userData.location || '');
          setLanguages(userData.languages || []);
          setExperienceSince(userData.experienceSince);
          setPersonalWebsite(userData.personalWebsite || '');
          setCalendlyLink(userData.calendlyLink || '');
          setTagline(userData.tagline || '');
        } else {
          console.error('User document does not exist');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      loadUserInfo();
    };
  }, [auth, db]);

  // Handle OAuth2 Redirect
  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code && user) {
        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code,
              client_id: "YOUR_CLIENT_ID", // Replace with your YouTube client ID
              client_secret: "YOUR_CLIENT_SECRET", // Replace with your YouTube client secret
              redirect_uri: "http://localhost:3000", // Match your redirect URI
              grant_type: "authorization_code",
            }),
          });

          const data = await response.json();

          if (data.access_token) {
            const userDocRef = doc(db, "users", auth.currentUser?.uid || "");
            const userDocSnapshot = await getDoc(userDocRef);

            const existingSocialMedia = userDocSnapshot.data()?.socialMedia || [];
            const updatedSocialMedia = [
              ...existingSocialMedia,
              {
                platform: "youtube",
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                expiresIn: Date.now() + data.expires_in * 1000, // Save expiry time
              },
            ];

            await updateDoc(userDocRef, { socialMedia: updatedSocialMedia });
            console.log("Tokens saved successfully:", updatedSocialMedia);
          } else {
            console.error("Failed to exchange code for tokens:", data);
          }
        } catch (error) {
          console.error("Error exchanging code for tokens:", error);
        }
      }
    };

    handleOAuthRedirect();
  }, [user, auth, db]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result as string);
      // Update crop to cover the whole new image by default
    //   updateInitialCrop(reader.result as string);
    };
    reader.readAsDataURL(event.target.files[0]);
  }
};





  const onCropComplete = useCallback((_: any, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

   const handlePictureUpload = async () => {
  if (!user || !imageSrc) {
    alert('No user or image source available.');
    return;
  }

  setIsUploading(true);
  try {
    let imageBlob: Blob;

    if (croppedAreaPixels && !isNaN(croppedAreaPixels.width) && !isNaN(croppedAreaPixels.height)) {
        console.log("CROPPED");
      const croppedImageData = await getCroppedImg(imageSrc, croppedAreaPixels);
      imageBlob = getBlob(croppedImageData);
    } else {
        console.log("NOT CROPPED");
        // Load the image to determine its dimensions
        const image = new Image();
        image.src = imageSrc;
        await new Promise(resolve => image.onload = resolve);

        const size = Math.min(image.width, image.height);
        const x = (image.width - size) / 2;
        const y = (image.height - size) / 2;

        const defaultCrop = {
            width: size,
            height: size,
            x: x,
            y: y
        };

        const croppedImageData = await getCroppedImg(imageSrc, defaultCrop);
        imageBlob = getBlob(croppedImageData);
    }

    const imageFile = new File([imageBlob], `${uuidv4()}.jpg`, { type: 'image/jpeg' });
    const imageRef = ref(storage, `profilePictures/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const downloadUrl = await getDownloadURL(imageRef);

    await updateDoc(doc(db, 'users', user.id), {
      profilePicture: downloadUrl
    });

    setProfilePicture(downloadUrl);
    setShowCropperModal(false);
    alert('Image uploaded and profile updated successfully');
  } catch (e) {
    console.error("Error during image upload or profile update: ", e);
    alert(`Upload failed: ${e || 'Unknown error'}`);
  } finally {
    setIsUploading(false);
  }
};





  const handleProfileUpdate = async () => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.id), {
        username,
        email,
        name,
        bio,
        location,
        languages,
        experienceSince: experienceSince || null,
        personalWebsite,
        calendlyLink,
        tagline
      });

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
  if ((event.target as HTMLElement).id === "cropperModalBackdrop") {
    setShowCropperModal(false);
  }
};

const handleAddSocial = (social: string) => {
    console.log(`Selected social media: ${social}`);
    setShowAddSocialModal(false);
  };

const addLanguage = () => {
  if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
    setLanguages([...languages, newLanguage.trim()]);
    setNewLanguage('');
  }
};

const removeLanguage = (language: string) => {
  setLanguages(languages.filter(lang => lang !== language));
};

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="container mx-auto p-6 max-w-5xl">
        <div className="flex flex-wrap items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Your Profile</h1>
            <p className="text-gray-600 mt-1">Manage how you appear to potential partners</p>
          </div>
          <button
            className="mt-4 sm:mt-0 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm flex items-center text-sm font-medium"
            onClick={handleProfileUpdate}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Save Changes
          </button>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Profile Information
            </h2>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[200px] aspect-square relative rounded-lg overflow-hidden bg-gray-50 border border-gray-200 mb-3">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile Picture"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <button
                className="w-full max-w-[200px] bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center justify-center"
                onClick={() => setShowCropperModal(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                {profilePicture ? 'Change Photo' : 'Upload Photo'}
              </button>
            </div>
            
            {/* User Info Form */}
            <div className="md:col-span-2 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    className="appearance-none border border-gray-300 rounded-md w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                    Username
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">@</span>
                    <input
                      className="appearance-none border border-gray-300 rounded-md w-full py-2.5 pl-8 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      id="username"
                      type="text"
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="appearance-none border border-gray-300 rounded-md w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  className="border border-gray-300 rounded-md p-3 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself, your expertise, and what makes you unique..."
                />
                <p className="mt-2 text-xs text-gray-500">This bio will be displayed on your public profile and helps partners understand who you are.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
              Social Media Channels
            </h2>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center"
              onClick={() => setShowAddSocialModal(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Channel
            </button>
          </div>
          <div className="p-6">
            {Array.isArray(user?.socialMedia) && user.socialMedia.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.socialMedia.map((social, index) => (
                  <div key={index} className="bg-gray-50 rounded-md p-4 border border-gray-200 flex items-center">
                    <div className="bg-white p-2 rounded-md mr-3 border border-gray-200">
                      {social.platform === 'youtube' ? (
                        <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                      ) : social.platform === 'twitter' || social.platform === 'x' ? (
                        <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      ) : social.platform === 'instagram' ? (
                        <svg className="w-6 h-6 text-pink-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.34 5.46a1.2 1.2 0 1 0 1.2-1.2 1.2 1.2 0 0 0-1.2 1.2zm4.6 2.42a7.59 7.59 0 0 0-.46-2.43 4.94 4.94 0 0 0-1.16-1.77 4.7 4.7 0 0 0-1.77-1.15 7.3 7.3 0 0 0-2.43-.47C15.06 2 14.72 2 12 2s-3.06 0-4.12.06a7.3 7.3 0 0 0-2.43.47 4.78 4.78 0 0 0-1.77 1.15 4.7 4.7 0 0 0-1.15 1.77 7.3 7.3 0 0 0-.47 2.43C2 8.94 2 9.28 2 12s0 3.06.06 4.12a7.3 7.3 0 0 0 .47 2.43 4.7 4.7 0 0 0 1.15 1.77 4.78 4.78 0 0 0 1.77 1.15 7.3 7.3 0 0 0 2.43.47C8.94 22 9.28 22 12 22s3.06 0 4.12-.06a7.3 7.3 0 0 0 2.43-.47 4.7 4.7 0 0 0 1.77-1.15 4.85 4.85 0 0 0 1.16-1.77 7.59 7.59 0 0 0 .46-2.43c0-1.06.06-1.4.06-4.12s0-3.06-.06-4.12zM20.14 16a5.61 5.61 0 0 1-.34 1.86 3.06 3.06 0 0 1-.75 1.15 3.19 3.19 0 0 1-1.15.75 5.61 5.61 0 0 1-1.86.34c-1 .05-1.37.06-4 .06s-3 0-4-.06a5.73 5.73 0 0 1-1.94-.3 3.27 3.27 0 0 1-1.1-.75 3 3 0 0 1-.74-1.15 5.54 5.54 0 0 1-.4-1.9c0-1-.06-1.37-.06-4s0-3 .06-4a5.54 5.54 0 0 1 .35-1.9A3 3 0 0 1 5 5a3.14 3.14 0 0 1 1.1-.8A5.73 5.73 0 0 1 8 3.86c1 0 1.37-.06 4-.06s3 0 4 .06a5.61 5.61 0 0 1 1.86.34 3.06 3.06 0 0 1 1.19.8 3.06 3.06 0 0 1 .75 1.1 5.61 5.61 0 0 1 .34 1.9c.05 1 .06 1.37.06 4s-.01 3-.06 4zM12 6.87A5.13 5.13 0 1 0 17.14 12 5.12 5.12 0 0 0 12 6.87zm0 8.46A3.33 3.33 0 1 1 15.33 12 3.33 3.33 0 0 1 12 15.33z" />
                        </svg>
                      ) : social.platform === 'linkedin' ? (
                        <svg className="w-6 h-6 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      ) : social.platform === 'tiktok' ? (
                        <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                        </svg>
                      ) : social.platform === 'facebook' ? (
                        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.736-.9 10.125-5.864 10.125-11.854z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 capitalize">
                        {social.platform === 'twitter' ? 'X (Twitter)' : social.platform}
                      </div>
                      <div className="text-xs text-gray-500">Connected</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Social Media Connected</h3>
                <p className="text-gray-600 mb-4 max-w-md">Connect your social media accounts to showcase your content and increase your visibility to potential partners.</p>
                <button
                  onClick={() => setShowAddSocialModal(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Connect Now
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Add Social Modal */}
        <AddSocialModal
          isOpen={showAddSocialModal}
          onClose={() => setShowAddSocialModal(false)}
          onSelect={handleAddSocial}
        />

        {/* Partnerships Section */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Partnerships
            </h2>
          </div>
          <div className="p-6">
            <Partners />
          </div>
        </div>

        {/* Content Examples Section */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              Examples of Content
            </h2>
          </div>
          <div className="p-6">
            <ExampleDisplay />
          </div>
        </div>

        {/* Save Button */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Save Your Changes</h3>
              <p className="text-gray-600 text-sm">Update your profile information to reflect your current status</p>
            </div>
            <button
              className="mt-4 sm:mt-0 w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center"
              onClick={handleProfileUpdate}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Save Changes
            </button>
          </div>
        </div>

        {/* Creator Information Section */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Creator Information</CardTitle>
              <CardDescription>
                Additional information to help brands learn more about you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Tagline */}
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline/Headline</Label>
                  <Input
                    id="tagline"
                    placeholder="Travel Vlogger & Photography Expert"
                    value={tagline}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagline(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    A short description of what you do (displays under your name)
                  </p>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="New York, USA"
                    value={location}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                  />
                </div>

                {/* Experience Level */}
                <div className="space-y-2">
                  <Label htmlFor="experienceSince">Creator Since (Year)</Label>
                  <Input
                    id="experienceSince"
                    type="number"
                    placeholder="2020"
                    value={experienceSince || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExperienceSince(e.target.value ? parseInt(e.target.value) : undefined)}
                    min="2000"
                    max={new Date().getFullYear()}
                  />
                </div>

                {/* Languages */}
                <div className="space-y-2">
                  <Label>Languages</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {languages.map(language => (
                      <Badge key={language} variant="secondary" className="flex items-center gap-1">
                        {language}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeLanguage(language)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a language..."
                      value={newLanguage}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewLanguage(e.target.value)}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addLanguage()}
                    />
                    <Button type="button" onClick={addLanguage} variant="outline">
                      Add
                    </Button>
                  </div>
                </div>

                {/* Personal Website */}
                <div className="space-y-2">
                  <Label htmlFor="personalWebsite">Personal Website</Label>
                  <Input
                    id="personalWebsite"
                    placeholder="https://yourwebsite.com"
                    value={personalWebsite}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPersonalWebsite(e.target.value)}
                  />
                </div>

                {/* Calendly Link */}
                <div className="space-y-2">
                  <Label htmlFor="calendlyLink">Calendly Link</Label>
                  <Input
                    id="calendlyLink"
                    placeholder="https://calendly.com/yourusername"
                    value={calendlyLink}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCalendlyLink(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    Add your Calendly link for brands to book calls with you
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Image Cropper Modal */}
      {showCropperModal && (
        <div id="cropperModalBackdrop" className="fixed inset-0 z-50 overflow-y-auto bg-gray-700 bg-opacity-80 backdrop-blur-sm" onClick={handleClickOutside}>
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg overflow-hidden w-full max-w-2xl">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">
                  {imageSrc ? 'Crop Profile Picture' : 'Upload Profile Picture'}
                </h3>
                <button 
                  onClick={() => setShowCropperModal(false)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-6 py-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  {imageSrc ? 'Adjust your image:' : 'Select an image:'}
                </label>
                {!imageSrc && (
                  <div className="mb-4">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={onFileChange} 
                      className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" 
                    />
                  </div>
                )}
                
                <div className="mt-4">
                  {imageSrc ? (
                    <div className="relative" style={{ height: '360px' }}>
                      <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        objectFit="horizontal-cover"
                      />
                    </div>
                  ) : profilePicture ? (
                    <div className="flex justify-center my-4">
                      <div className="w-60 h-60 relative rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={profilePicture}
                          alt="Current Profile Picture"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center my-4">
                      <div className="w-60 h-60 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {imageSrc && (
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Zoom:
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => setShowCropperModal(false)}
                >
                  Cancel
                </button>
                
                {!imageSrc && (
                  <label className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={onFileChange} 
                      className="hidden" 
                    />
                    Choose File
                  </label>
                )}
                
                {imageSrc && (
                  <button
                    className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                    onClick={handlePictureUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </span>
                    ) : 'Save & Apply'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
