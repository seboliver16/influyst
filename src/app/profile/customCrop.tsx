import { Area } from "react-easy-crop";
import { getCroppedImg } from "../admin/uploadImg/uploadImage";


export const getCroppedImgNew = async (
  imageSrc: string,
  croppedAreaPixels: Area | null
): Promise<Blob> => {
  if (!croppedAreaPixels) {
    // If no crop data is provided, return the original image as a Blob
    const response = await fetch(imageSrc);
    return response.blob();
  }

  // If crop data is provided, use the default getCroppedImg function
  return getCroppedImg(imageSrc, croppedAreaPixels);
};