"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, Check, Loader2, ImageIcon, ZoomIn, ZoomOut, Trash2, Link, RefreshCw } from 'lucide-react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop';
import { getCroppedImg } from '../../../admin/uploadImg/canvasUtils';
import Image from 'next/image';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { Slider } from "../../../../../components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface BackgroundImagePickerProps {
  currentImage?: string;
  onImageSelected: (dataUrl: string) => void;
  onImageRemoved?: () => void;
  title?: string;
  description?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'cover';
  maxSizeMB?: number;
}

const BackgroundImagePicker: React.FC<BackgroundImagePickerProps> = ({ 
  currentImage,
  onImageSelected,
  onImageRemoved,
  title = "Image",
  description = "Upload or set an image URL",
  aspectRatio = 'cover',
  maxSizeMB = 5
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropCompleted, setCropCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(currentImage?.startsWith('http') && !currentImage.startsWith('data:') ? 'url' : 'upload');
  const [imageUrl, setImageUrl] = useState<string>(
    currentImage?.startsWith('http') && !currentImage.startsWith('data:') ? currentImage : ''
  );
  const [uploadError, setUploadError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAspectRatioClass = () => {
    switch(aspectRatio) {
      case '16:9': return 'aspect-video';
      case '4:3': return 'aspect-[4/3]';
      case '1:1': return 'aspect-square';
      default: return 'aspect-[3/1]';
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (file.size > maxSizeMB * 1024 * 1024) {
      setUploadError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      setUploadError('Only image files are allowed');
      return;
    }
    
    setUploadError('');
    setIsLoading(true);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
      setPreviewUrl(null);
      setCropCompleted(false);
      setActiveTab('crop');
      onImageSelected(event.target?.result as string);
      setIsLoading(false);
    };
    reader.onerror = () => {
      setUploadError('Error reading file');
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
    
    if (imageSrc) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        
        const reader = new FileReader();
        reader.readAsDataURL(croppedImage as Blob);
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
          setCropCompleted(true);
        };
      } catch (error) {
        console.error('Error generating preview:', error);
      }
    }
  };

  const generatePreview = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      
      const reader = new FileReader();
      reader.readAsDataURL(croppedImage as Blob);
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setCropCompleted(true);
        setActiveTab('preview');
      };
    } catch (error) {
      console.error('Error generating preview:', error);
    }
  };

  const applyBackgroundImage = async () => {
    if (!previewUrl) {
      if (!imageSrc || !croppedAreaPixels) return;
      await generatePreview();
    }
    
    setIsProcessing(true);
    try {
      if (previewUrl) {
        onImageSelected(previewUrl);
        setIsDialogOpen(false);
        resetCropState();
      } else {
        const croppedImage = await getCroppedImg(imageSrc!, croppedAreaPixels!);
        const reader = new FileReader();
        reader.readAsDataURL(croppedImage as Blob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          onImageSelected(base64data);
          setIsDialogOpen(false);
          resetCropState();
        };
      }
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    resetCropState();
  };

  const resetCropState = () => {
    setImageSrc(null);
    setPreviewUrl(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCropCompleted(false);
    setActiveTab('crop');
  };

  const resetCrop = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleRemoveImage = () => {
    if (onImageRemoved) {
      onImageRemoved();
    }
  };

  const handleUrlSubmit = () => {
    if (!imageUrl) {
      setUploadError('Please enter a valid URL');
      return;
    }
    
    setIsLoading(true);
    setUploadError('');

    const img = document.createElement('img');
    img.onload = () => {
      onImageSelected(imageUrl);
      setIsLoading(false);
    };
    img.onerror = () => {
      setUploadError('Invalid image URL or image cannot be loaded');
      setIsLoading(false);
    };
    img.src = imageUrl;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      
      if (file.size > maxSizeMB * 1024 * 1024) {
        setUploadError(`File size exceeds ${maxSizeMB}MB limit`);
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setUploadError('Only image files are allowed');
        return;
      }
      
      setUploadError('');
      setIsLoading(true);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageSelected(event.target?.result as string);
        setIsLoading(false);
      };
      reader.onerror = () => {
        setUploadError('Error reading file');
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="mb-2 flex justify-between items-center">
          <Label className="text-sm font-medium">{title}</Label>
          {currentImage && onImageRemoved && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleRemoveImage}
              className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          )}
        </div>
        
        <div 
          className="relative w-full h-40 rounded-md overflow-hidden mb-2 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center group cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        >
          {currentImage ? (
            <>
              <div className="w-full h-full relative">
                <Image 
                  src={currentImage} 
                  alt={title}
                  fill
                  className={`${getAspectRatioClass()} object-cover`}
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button variant="secondary" size="sm" className="shadow-md">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Change
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <ImageIcon className="h-8 w-8 mb-2" />
              <span className="text-sm">{description}</span>
              <span className="text-xs mt-1">Recommended size: 1600×400 pixels</span>
            </div>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => setIsDialogOpen(true)}
        >
          <Upload className="h-4 w-4 mr-2" />
          {currentImage ? "Change Image" : "Upload Image"}
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>
          
          {!imageSrc && (
            <div className="flex flex-col items-center justify-center py-10">
              <label 
                htmlFor="background-image-upload" 
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG or GIF (MAX. 2MB)
                  </p>
                </div>
                <input 
                  id="background-image-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={onFileChange}
                />
              </label>
            </div>
          )}
          
          {!currentImage && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload" className="flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center">
                  <Link className="h-4 w-4 mr-2" />
                  Image URL
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-4">
                <div 
                  className={`
                    border-2 border-dashed rounded-md p-8 text-center
                    ${uploadError ? 'border-red-400 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'}
                    hover:border-gray-400 dark:hover:border-gray-500
                    transition-colors
                  `}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center justify-center cursor-pointer">
                    <div className="h-12 w-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
                      <ImageIcon className="h-6 w-6 text-gray-500" />
                    </div>
                    <p className="text-sm font-medium mb-1">Drag and drop or click to upload</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, GIF up to {maxSizeMB}MB
                    </p>
                    {isLoading && (
                      <div className="mt-3">
                        <RefreshCw className="h-5 w-5 animate-spin text-gray-500" />
                      </div>
                    )}
                    {uploadError && (
                      <p className="mt-2 text-sm text-red-500 dark:text-red-400">{uploadError}</p>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={onFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="url" className="mt-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="image-url">Image URL</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="image-url"
                        placeholder="https://example.com/image.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                      <Button 
                        onClick={handleUrlSubmit}
                        disabled={isLoading || !imageUrl}
                      >
                        {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Set'}
                      </Button>
                    </div>
                  </div>
                  {uploadError && (
                    <p className="text-sm text-red-500 dark:text-red-400">{uploadError}</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="crop">Crop Image</TabsTrigger>
              <TabsTrigger value="preview" disabled={!cropCompleted}>Preview Result</TabsTrigger>
            </TabsList>
            
            <TabsContent value="crop" className="space-y-4 pt-2">
              <div className="relative h-72 w-full rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Cropper
                  image={imageSrc || undefined}
                  crop={crop}
                  zoom={zoom}
                  aspect={16 / 4}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  objectFit="horizontal-cover"
                />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Zoom</Label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {zoom.toFixed(1)}x
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ZoomOut className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Slider
                      value={[zoom]}
                      min={1}
                      max={3}
                      step={0.1}
                      onValueChange={(value) => setZoom(value[0])}
                    />
                    <ZoomIn className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetCrop}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reset Crop
                  </Button>
                  
                  <Button 
                    size="sm"
                    onClick={generatePreview}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Preview Result
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-4 pt-2">
              {previewUrl && (
                <div className="space-y-4">
                  <div className="relative w-full h-48 rounded-md overflow-hidden">
                    <div className="w-full h-full relative">
                      <Image 
                        src={previewUrl} 
                        alt="Preview" 
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Card className="flex-1 p-4 bg-white dark:bg-gray-900">
                      <div className="text-center">
                        <p className="text-sm font-medium mb-2">Desktop View</p>
                        <div className="relative w-full h-20 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                          <div className="w-full h-full relative">
                            <Image 
                              src={previewUrl} 
                              alt="Desktop Preview" 
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="flex-1 p-4 bg-white dark:bg-gray-900">
                      <div className="text-center">
                        <p className="text-sm font-medium mb-2">Mobile View</p>
                        <div className="relative w-20 h-20 mx-auto rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                          <div className="w-full h-full relative">
                            <Image 
                              src={previewUrl} 
                              alt="Mobile Preview" 
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab('crop')}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Back to Crop
                    </Button>
                    
                    <Button
                      disabled={isProcessing}
                      onClick={applyBackgroundImage}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Apply Background
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={closeDialog}
            >
              Cancel
            </Button>
            
            {imageSrc && cropCompleted && (
              <Button
                disabled={isProcessing}
                onClick={applyBackgroundImage}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Apply Background
                  </>
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BackgroundImagePicker; 