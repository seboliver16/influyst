import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Area } from 'react-easy-crop';
import { useRouter } from 'next/navigation';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebase_app from '../../firebase/config';
import { motion } from 'framer-motion';
import { Camera, Upload, X, Check, Loader2, ImageIcon, ZoomIn, ZoomOut, RefreshCw, AlertCircle } from 'lucide-react';

interface UploadHeadshotProps {
  setProfilePictureUploaded: () => void;
}

const storage = getStorage();

const UploadHeadshot: React.FC<UploadHeadshotProps> = ({ setProfilePictureUploaded }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const auth = getAuth(firebase_app);
  const router = useRouter();

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageSrc(fileReader.result as string);
        setUploadSuccess(false);
        setErrorMessage(null);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onUploadClick = async () => {
    const auth = getAuth();
    const db = getFirestore();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setErrorMessage("You must be logged in to upload an image.");
      return;
    }

    if (imageSrc && croppedAreaPixels) {
      setIsUploading(true);
      setErrorMessage(null);
      
      try {
        const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
        const imageFile = new File([croppedImageBlob], `${uuidv4()}.jpg`, { type: 'image/jpeg' });

        const imageRef = storageRef(storage, `headshots/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        const downloadUrl = await getDownloadURL(imageRef);

        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          profilePicture: downloadUrl
        });

        setUploadSuccess(true);
        setTimeout(() => {
          setProfilePictureUploaded(); // Call the callback function after success
        }, 1000);
      } catch (e) {
        console.error("Error during image upload or profile update:", e);
        setErrorMessage("Upload failed. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const cancelCrop = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const increaseZoom = () => setZoom(Math.min(zoom + 0.1, 3));
  const decreaseZoom = () => setZoom(Math.max(zoom - 0.1, 1));

  return (
    <div className="flex flex-col items-center">
      {/* Main upload area */}
      <div className="w-full max-w-sm">
        {/* Upload container with preview */}
        <div className="relative bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden border-2 border-dashed border-purple-200 dark:border-purple-900/30 p-4 flex flex-col items-center justify-center">
          {!imageSrc ? (
            <label htmlFor="file-input" className="w-full cursor-pointer">
              <div className="flex flex-col items-center justify-center py-10 px-4">
                <div className="mb-6 bg-purple-100 dark:bg-purple-900/30 h-20 w-20 rounded-full flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Click to upload your photo</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs mb-4">
                  Your profile picture will be shown on your media kit and profile page
                </p>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-lg px-4 py-2 flex items-center"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  <span>Choose File</span>
                </motion.div>
              </div>
            </label>
          ) : (
            <div className="w-full">
              {/* Image cropping area */}
              <div className="relative w-full h-64 sm:h-80 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  objectFit="cover"
                  cropShape="round"
                  showGrid={false}
                />
              </div>
              
              {/* Cropping controls */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Zoom & Position</span>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={decreaseZoom}
                      className="p-1.5 bg-white dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <div className="relative w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div 
                        className="absolute h-full bg-purple-500 rounded-full" 
                        style={{ width: `${((zoom - 1) / 2) * 100}%` }}
                      />
                    </div>
                    <button 
                      onClick={increaseZoom}
                      className="p-1.5 bg-white dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={cancelCrop}
                    className="flex-1 py-2 px-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onUploadClick}
                    disabled={isUploading || uploadSuccess}
                    className={`
                      flex-1 py-2 px-3 rounded-lg flex items-center justify-center space-x-2 transition-all
                      ${isUploading || uploadSuccess 
                        ? 'bg-green-500 text-white cursor-default'
                        : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white'
                      }
                    `}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : uploadSuccess ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Uploaded!</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        <span>Use This Photo</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Error message */}
      {errorMessage && (
        <div className="mt-4 text-red-500 text-sm flex items-center">
          <AlertCircle className="h-4 w-4 mr-1.5" />
          {errorMessage}
        </div>
      )}
      
      {/* Hidden file input */}
      <input 
        id="file-input" 
        type="file" 
        accept="image/*" 
        onChange={onFileChange} 
        className="hidden" 
      />
    </div>
  );
};

export async function getCroppedImg(imageSrc: string, pixelCrop: { width: number; height: number; x: number; y: number; }): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Unable to get canvas context'));
        return;
      }
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        resolve(blob);
      }, 'image/jpeg');
    };
    image.onerror = () => {
      reject(new Error('Image failed to load'));
    };
  });
}

export default UploadHeadshot;
