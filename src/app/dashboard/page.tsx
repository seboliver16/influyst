"use client"

import React, { useCallback, useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { User } from '../user';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import firebase_app from '../firebase/config';
import { useRouter } from 'next/navigation';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { Area } from 'react-easy-crop';
import { getCroppedImg } from '../admin/uploadImg/canvasUtils';
import { v4 as uuidv4 } from 'uuid';
import { LayoutDashboard, Copy, ExternalLink, Settings, ChevronRight, User as UserIcon, BarChart3, Link as LinkIcon, Loader2, CheckCircle } from 'lucide-react';

// Import shadcn components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const getBlob = (data: unknown): Blob => {
  if (data instanceof Blob) {
    return data;
  } else {
    throw new Error('Expected a Blob object');
  }
};

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profilePictureUploaded, setProfilePictureUploaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const storage = getStorage(firebase_app);
  const router = useRouter();

  useEffect(() => {
    const loadUserInfo = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          setUser(userDocSnapshot.data() as User);
          const userData = userDocSnapshot.data();
          setCurrentStep(userData.profilePicture ? 2 : 1);
          if (userData.industries) setCurrentStep(3);
          if (userData.bio) setCurrentStep(4);
        } else {
          console.error('User document does not exist');
        }
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => loadUserInfo();
  }, [auth, db]);

  const profileUrl = user ? `https://influyst.com/${user.username}` : '';

  const handleCopyProfileUrl = () => {
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleEditProfile = () => {
    router.push('/profile');
  };

  const handleViewAnalytics = () => {
    // This would be implemented in Phase 1.4
    alert('Analytics feature coming soon!');
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageSrc(fileReader.result as string);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  const onCropComplete = useCallback((_: any, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageUpload = async () => {
    if (!user || !imageSrc || !croppedAreaPixels) return;

    setIsUploading(true);
    try {
      const croppedImageData = await getCroppedImg(imageSrc, croppedAreaPixels);
      const croppedImageBlob = getBlob(croppedImageData);
      const imageFile = new File([croppedImageBlob], `${uuidv4()}.jpg`, { type: 'image/jpeg' });

      const imageRef = ref(storage, `profilePictures/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const downloadUrl = await getDownloadURL(imageRef);

      await updateDoc(doc(db, 'users', user.id), {
        profilePicture: downloadUrl
      });

      setProfilePictureUploaded(true);
      alert('Image uploaded and profile updated successfully');
    } catch (e) {
      console.error("Error during image upload or profile update:", e);
      alert(`Upload failed: ${e}`);
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header Skeleton */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-6 w-24 ml-2" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        </header>

        {/* Main Content Skeleton */}
        <main className="container mx-auto p-6 max-w-6xl">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-full max-w-lg mb-8" />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-52 rounded-xl" />
            <Skeleton className="h-52 rounded-xl" />
            <Skeleton className="h-52 rounded-xl" />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="container mx-auto p-0 md:p-6 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
              Hey, {user?.name || user?.username} 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome to your creator dashboard. Here you can manage all aspects of your Influyst profile.
            </p>
          </div>
          
          {/* Dashboard Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Profile Card */}
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <UserIcon className="mr-2 h-5 w-5 text-indigo-500" />
                  Your Profile
                </CardTitle>
                <CardDescription>
                  Edit and view your public profile
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={user?.profilePicture || ''} alt={user?.name || 'User'} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200 text-lg">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-base">{user?.name || user?.username}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">@{user?.username}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-3">
                  <Button onClick={handleEditProfile} className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => window.open(profileUrl, '_blank')}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Public Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Share Link Card */}
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <LinkIcon className="mr-2 h-5 w-5 text-indigo-500" />
                  Share Your Link
                </CardTitle>
                <CardDescription>
                  Share your unique profile URL with others
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-4 mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your unique profile URL:</p>
                  <div className="flex items-center">
                    <Input 
                      readOnly 
                      value={profileUrl}
                      className="border border-gray-300 dark:border-gray-600 rounded-l-md text-sm"
                    />
                    <Button
                      onClick={handleCopyProfileUrl}
                      className="rounded-l-none"
                      disabled={copied}
                    >
                      {copied ? (
                        <span className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Copied
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Share on social media:</p>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="icon" className="rounded-full" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}`, '_blank')}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`, '_blank')}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.736-.9 10.125-5.864 10.125-11.854z" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`, '_blank')}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Analytics Card */}
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-indigo-500" />
                  Analytics
                </CardTitle>
                <CardDescription>
                  View your profile performance
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Profile Views</span>
                      <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Coming Soon</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Link Clicks</span>
                      <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Coming Soon</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleViewAnalytics} 
                    variant="outline"
                    className="w-full"
                  >
                    View All Analytics
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Main Content */}
      <div className="container mx-auto p-0 md:p-6 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
            Hey, {user?.name || user?.username} 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to your creator dashboard. Here you can manage all aspects of your Influyst profile.
          </p>
        </div>
        
        {/* Dashboard Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <UserIcon className="mr-2 h-5 w-5 text-indigo-500" />
                Your Profile
              </CardTitle>
              <CardDescription>
                Edit and view your public profile
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={user?.profilePicture || ''} alt={user?.name || 'User'} />
                  <AvatarFallback className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200 text-lg">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-base">{user?.name || user?.username}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">@{user?.username}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Button onClick={handleEditProfile} className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full" onClick={() => window.open(profileUrl, '_blank')}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Public Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Share Link Card */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <LinkIcon className="mr-2 h-5 w-5 text-indigo-500" />
                Share Your Link
              </CardTitle>
              <CardDescription>
                Share your unique profile URL with others
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="mb-4 mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your unique profile URL:</p>
                <div className="flex items-center">
                  <Input 
                    readOnly 
                    value={profileUrl}
                    className="border border-gray-300 dark:border-gray-600 rounded-l-md text-sm"
                  />
                  <Button
                    onClick={handleCopyProfileUrl}
                    className="rounded-l-none"
                    disabled={copied}
                  >
                    {copied ? (
                      <span className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Copied
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </span>
                    )}
                  </Button>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Share on social media:</p>
                <div className="flex space-x-3">
                  <Button variant="outline" size="icon" className="rounded-full" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}`, '_blank')}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`, '_blank')}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.736-.9 10.125-5.864 10.125-11.854z" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`, '_blank')}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Analytics Card */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-indigo-500" />
                Analytics
              </CardTitle>
              <CardDescription>
                View your profile performance
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Profile Views</span>
                    <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Coming Soon</span>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Link Clicks</span>
                    <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Coming Soon</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleViewAnalytics} 
                  variant="outline"
                  className="w-full"
                >
                  View All Analytics
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

