// canvasUtils.ts
export async function getCroppedImg(imageSrc: string, pixelCrop: { width: number; height: number; x: number; y: number; }) {
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
        const file = new File([blob], 'cropped-image.jpeg', { type: 'image/jpeg' });
        resolve(file);
      }, 'image/jpeg');
    };
    image.onerror = () => {
      reject(new Error('Image failed to load'));
    };
  });
}
