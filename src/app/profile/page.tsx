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
        bio
      });

      alert('Profile information updated successfully');
    } catch (e) {
      console.error("Error updating profile information:", e);
      alert(`Update failed: ${e}`);
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



  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src={'/logo.svg'} height={30} width={30} alt="Influyst Logo" />
            <span className="font-bold ml-2 text-xl">Influyst</span>
          </div>
          <nav>
            <a href="/dashboard" className="text-gray-800 hover:underline p-4">Dashboard</a>
            <a href="/settings" className="text-gray-800 hover:underline">Settings</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage your profile</h1>
        <p>{"This is your HQ to share your uniqueness with the world"}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="bg-white p-4 rounded-lg shadow-sm">
  <h2 className="text-lg font-semibold">Information</h2>

  <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 mt-3">
    <div className="flex-1">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
        Name
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div className="flex-1">
      <label className="block text-sm font-bold mb-2" htmlFor="username">
        Username
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  </div>

  <div className="mt-6">
    <div className="mt-3">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  </div>
</div>

<div className="bg-white p-4 rounded-lg shadow-sm">
  <h2 className="text-lg font-semibold">About You</h2>
  <div className="mt-3 flex flex-col md:flex-row">
    <div className="md:w-1/5 md:mr-4 mb-4 md:mb-0 ">
      {profilePicture ? (
                  <div>
                    <img
                      src={profilePicture}
                      alt="Profile Picture"
                      className="w-full h-auto rounded-lg"
                    />
                    <button
                      className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 w-full mt-2"
                      onClick={() => setShowCropperModal(true)}
                    >
                      Replace
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 w-full"
                    onClick={() => setShowCropperModal(true)}
                  >
                    Upload Picture
                  </button>
                )}
    </div>
    <div className="md:w-4/5">
      <textarea
        className="border p-2 w-full h-32 md:h-full resize-none"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Your bio here"
      />
    </div>
  </div>
</div>

          
      

      <div className="space-y-4">  {/* Adds vertical spacing between each major section */}
  {/* Conditionally render Social Media and Partnerships in the same column if there are more than one content examples */}
  {(user?.contentExamples?.length != 0) ? (
    <div className="space-y-4"> {/* Adds vertical spacing between internal sections */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
  <h2 className="text-lg font-semibold">Social Media Channels</h2>
  <button
    className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
    onClick={() => setShowAddSocialModal(true)}
  >
    Add Channel
  </button>
</div>

{/* Add Social Modal */}
<AddSocialModal
  isOpen={showAddSocialModal}
  onClose={() => setShowAddSocialModal(false)}
  onSelect={handleAddSocial}
/>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold">Partnerships</h2>
        <Partners />
      </div>
    </div>
  ) : (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold">Social Media Channels</h2>
        <button className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Add Channel</button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold">Partnerships</h2>
        <Partners />
      </div>
    </>
  )}
  
</div>
<div className="bg-white p-4 rounded-lg shadow-sm">
    <h2 className="text-lg font-semibold">Examples of Content</h2>
    <ExampleDisplay />
  </div>

{/* Additional components for Contact, Social Media, Content examples, and Partnerships remain unchanged */}
<div className="flex justify-center w-full items-start">
  {/* Placeholder for any additional UI elements or buttons */}
</div>






        </div>
        <button
    className="w-full h-12 bg-gray-100 text-indigo-500 border border-indigo-500 px-4 py-3 rounded-lg hover:bg-indigo-500 hover:text-white transition ease-in-out duration-150"
    onClick={handleProfileUpdate}
  >
    Save Changes
  </button>
      </main>
      {/* Image Cropper Modal */}
      
      {showCropperModal && (
        <div id="cropperModalBackdrop" className="fixed inset-0 z-40 overflow-y-auto" onClick={handleClickOutside}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>
            <div className="inline-block overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-headline">
                      Upload Profile Picture
                    </h3>
                    <div className="mt-3">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={onFileChange} 
                        className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-50 dark:file:bg-gray-700 file:text-indigo-700 dark:file:text-indigo-400 h-full caret-purple-600 dark:caret-purple-400" 
                      />
                    </div>
                    <label htmlFor="file-input" className="w-36 h-36 bg-white-400 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer">
        {imageSrc ? (
          <div style={{ position: 'relative', width: '100%', height: '100%' }} className='justify-center items-center'>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              style={{ containerStyle: { width: '100%', height: '100%' } }}
            />
          </div>
        ) : (

            
          <div className="flex justify-center my-10">
            <img
                      src={profilePicture || undefined}
                      alt="Profile Picture"
                      className="w-full h-auto rounded-lg my-10"
                      style={{ maxWidth: '90%', maxHeight: '80vh' }}
                    />
          </div>
        )}
      </label>
                    {imageSrc && (
                      <div className="relative mt-4">
                        <Cropper
                          image={imageSrc}
                          crop={crop}
                          zoom={zoom}
                          
                          aspect={1}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              { (
                <div className="flex justify-center p-4 bg-gray-50">
                 {imageSrc &&( <button
                    className="px-4 py-2 text-white bg-indigo-400 rounded hover:bg-indigo-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    onClick={handlePictureUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Upload & Continue'}
                  </button>)}
                  <button
                    className="px-4 py-2 ml-4 text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
                    onClick={() => setShowCropperModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Dashboard;
