"use client"

import React, { useCallback, useEffect, useState } from 'react';
import Image from "next/image";
import { User } from '../user';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import firebase_app from '../firebase/config';
import { useRouter } from 'next/navigation';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { Area } from 'react-easy-crop';
import { getCroppedImg } from '../admin/uploadImg/canvasUtils';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 from uuid library

const getBlob = (data: unknown): Blob => {
  if (data instanceof Blob) {
    return data;
  } else {
    throw new Error('Expected a Blob object');
  }
};

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profilePictureUploaded, setProfilePictureUploaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isUploading, setIsUploading] = useState(false);
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
          setUser(userDocSnapshot.data() as User);
          const userData = userDocSnapshot.data();
          setCurrentStep(userData.profilePicture ? 2 : 1);
          if (userData.industries) setCurrentStep(3);
          if (userData.bio) setCurrentStep(4);
        } else {
          console.error('User document does not exist');
        }
      } else {
        setUser(null);
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src={'/logo.svg'} height={30} width={30} alt="Influyst Logo" />
            <span className="font-bold ml-2 text-xl">Influyst</span>
          </div>
          <nav>
            <a href="/settings" className="text-gray-800 hover:underline">Settings</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Hey, {user?.username} 👋</h1>
        <p>This is your creator dashboard. Here you can manage all things you.</p>
        
        {/* Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Manage Profile Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
            <h2 className="text-lg font-semibold">Manage your profile</h2>
            <div className="flex space-x-4 mt-3">
              <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600" onClick={handleEditProfile}>Edit Profile</button>
              <button className="bg-transparent border border-gray-300 text-gray-800 px-4 py-2 rounded hover:border-gray-400" onClick={() => window.open(profileUrl, '_blank')}>View Profile</button>
            </div>
          </div>
          
          {/* Share Link Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
            <h2 className="text-lg font-semibold">Share your link</h2>
            <div className="mt-3 flex">
              <input 
                type="text" 
                readOnly 
                className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full text-gray-800 dark:text-white bg-white dark:bg-gray-800 caret-purple-600 dark:caret-purple-400" 
                value={profileUrl} 
              />
              <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 ml-2" onClick={handleCopyProfileUrl}>Copy</button>
            </div>
            {copied && <p className="text-green-500 mt-2">URL copied to clipboard!</p>}
          </div>

          
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

