import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Area } from 'react-easy-crop';


// Function to create a blob from a canvas element
const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

// Function to get the cropped image from the canvas
async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas context is null');
  }
  const { width, height } = pixelCrop;
  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    width,
    height,
    0,
    0,
    width,
    height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
      } else {
        resolve(blob);
      }
    }, 'image/jpeg');
  });
}

const storage = getStorage(); // Initialize Firebase Storage


const UploadHeadshot: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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
    if (imageSrc && croppedAreaPixels) {
      setIsUploading(true);
      try {
        const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
        const imageFile = new File([croppedImageBlob], `${uuidv4()}.jpg`, { type: 'image/jpeg' });

        // Upload to Firebase Storage
        const imageRef = storageRef(storage, `headshots/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        const downloadUrl = await getDownloadURL(imageRef);

        // Here, you can call a function to update the user's profile with the downloadUrl
        // updateProfileWithImage(downloadUrl);

        alert('Image uploaded successfully');
      } catch (e) {
        console.error(e);
        alert('Upload failed');
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={onFileChange} />
      {imageSrc && (
        <>
          <div style={{ position: 'relative', width: '100%', height: 400 }}>
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
          <button onClick={onUploadClick} disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Continue'}
          </button>
        </>
      )}
    </div>
  );

    
};

export default UploadHeadshot;
