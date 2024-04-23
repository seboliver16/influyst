import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Area } from 'react-easy-crop';
import { useRouter } from 'next/router';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { User } from '../../user';
import { getAuth } from 'firebase/auth';
import firebase_app from '../../firebase/config';
import { FaCamera } from "react-icons/fa";

interface UploadHeadshotProps {
  setProfilePictureUploaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const storage = getStorage();

const UploadHeadshot: React.FC<UploadHeadshotProps> = ({ setProfilePictureUploaded }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const auth = getAuth(firebase_app);

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageSrc(fileReader.result as string);
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
      alert("You must be logged in to upload an image.");
      return;
    }

    if (imageSrc && croppedAreaPixels) {
      setIsUploading(true);
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

        setProfilePictureUploaded(true); // Call the setProfilePictureUploaded prop
        alert('Image uploaded and profile updated successfully');
      } catch (e) {
        console.error("Error during image upload or profile update:", e);
        alert(`Upload failed: ${e}`);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="file-input" className="w-36 h-36 bg-indigo-400 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer">
        {imageSrc ? (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
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
          <div className="text-white">
            <FaCamera size="40" />
          </div>
        )}
      </label>
      <input id="file-input" type="file" accept="image/*" onChange={onFileChange} className="hidden" />
      {/* The button will be shown only when an image is ready to be cropped */}
      {imageSrc && (
        <button
          className="mt-3 bg-indigo-400 text-white py-2 px-4 rounded hover:bg-indigo-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          onClick={onUploadClick}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload & Continue'}
        </button>
      )}
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
