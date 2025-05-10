"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebase_app from '../../firebase/config';
import { User } from '../../user';
import { 
  CustomizationSettings, 
  DEFAULT_CUSTOMIZATION, 
  ThemeOption, 
  LayoutOption, 
  ButtonStyleOption,
  FontFamilyOption,
  BackgroundPatternOption,
  FONT_FAMILY_NAMES,
  LAYOUT_OPTIONS,
  BUTTON_STYLES,
  CONTENT_SECTIONS,
  BACKGROUND_PATTERNS,
  SCROLL_EFFECT_OPTIONS,
  ScrollEffectOption
} from '../../types/customization';
import { 
  getUserCustomizationSettings, 
  saveUserCustomizationSettings 
} from '../../firebase/customization';
import { SketchPicker, ColorResult } from 'react-color';
import ProfilePreview from './components/ProfilePreview';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { 
  Palette, 
  Layout as LayoutIcon,
  Type, 
  Square,
  Loader2, 
  ChevronLeft, 
  Save,
  RefreshCw,
  X,
  ImageIcon,
  Text
} from 'lucide-react';
import BackgroundImagePicker from './components/BackgroundImagePicker';

// Import UI components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function AppearancePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSecondaryColorPicker, setShowSecondaryColorPicker] = useState(false);
  const [showHeadingColorPicker, setShowHeadingColorPicker] = useState(false);
  const [showBodyColorPicker, setShowBodyColorPicker] = useState(false);
  const [showLinkColorPicker, setShowLinkColorPicker] = useState(false);
  const [previewSettings, setPreviewSettings] = useState<CustomizationSettings>(DEFAULT_CUSTOMIZATION);
  const [currentSettings, setCurrentSettings] = useState<CustomizationSettings>(DEFAULT_CUSTOMIZATION);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('theme');
  const [error, setError] = useState('');
  
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const router = useRouter();

  useEffect(() => {
    const loadUserInfo = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data() as User;
          setUser(userData);
          
          // Load customization settings
          const customSettings = await getUserCustomizationSettings(user.uid);
          setCurrentSettings(customSettings);
          setPreviewSettings(customSettings);
        } else {
          setError('User document does not exist');
        }
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
        router.push('/login');
      }
    });

    return () => loadUserInfo();
  }, [auth, db, router]);

  // Effect to detect unsaved changes
  useEffect(() => {
    if (JSON.stringify(currentSettings) !== JSON.stringify(previewSettings)) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [currentSettings, previewSettings]);

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    setError('');
    
    // Create a clean settings object that explicitly sets optional fields to undefined if they're not present
    const settingsToSave: CustomizationSettings = {
      ...DEFAULT_CUSTOMIZATION,
      ...previewSettings,
      // Explicitly set these optional fields to undefined if they're falsy
      coverImageUrl: previewSettings.coverImageUrl || undefined,
      backgroundImageUrl: previewSettings.backgroundImageUrl || undefined,
      secondaryColor: previewSettings.secondaryColor || undefined,
      headingColor: previewSettings.headingColor || undefined,
      bodyTextColor: previewSettings.bodyTextColor || undefined,
      linkTextColor: previewSettings.linkTextColor || undefined,
      customCSS: previewSettings.customCSS || undefined,
      customUrlPath: previewSettings.customUrlPath || undefined
    };

    try {
      const success = await saveUserCustomizationSettings(user.id, settingsToSave);
      
      if (success) {
        setCurrentSettings(settingsToSave); // Use the cleaned settings object
        setHasUnsavedChanges(false);
        toast.success('Appearance settings saved successfully!');
      } else {
        setError('Failed to save appearance settings');
        toast.error('Failed to save appearance settings');
      }
    } catch (error) {
      console.error('Error saving appearance settings:', error);
      setError('An unexpected error occurred while saving');
      toast.error('An error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setPreviewSettings(currentSettings);
    setHasUnsavedChanges(false);
  };

  const handleResetToDefaults = () => {
    setPreviewSettings(DEFAULT_CUSTOMIZATION);
    setHasUnsavedChanges(true);
  };

  // Handle secondary color change
  const handleSecondaryColorChange = (color: ColorResult) => {
    setPreviewSettings({
      ...previewSettings,
      secondaryColor: color.hex
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-full max-w-md" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Skeleton className="h-[600px] rounded-xl" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-[600px] rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Appearance Settings</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Customize how your profile looks to visitors
            </p>
          </div>
          
          <div className="flex mt-4 md:mt-0 space-x-3">
            <Button 
              variant="outline" 
              disabled={!hasUnsavedChanges || saving}
              onClick={handleReset}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Changes
            </Button>
            
            <Button 
              onClick={handleSave}
              disabled={!hasUnsavedChanges || saving}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-12rem)]">
          
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <Card className="sticky top-4 overflow-y-auto max-h-[calc(100vh-5rem)] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-700">
              <CardHeader className="border-b">
                <CardTitle>Customization Options</CardTitle>
                <CardDescription>
                  Configure the look and feel of your profile
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <Tabs defaultValue="theme" className="w-full" onValueChange={setActiveTab} value={activeTab}>
                  <TabsList className="grid w-full grid-cols-5 gap-1 p-1 h-auto bg-gray-100 dark:bg-gray-800 rounded-lg mb-6">
                    {(['theme', 'layout', 'fonts', 'elements', 'media', 'interactive'] as const).map((tabValue) => (
                      <TabsTrigger 
                        key={tabValue} 
                        value={tabValue} 
                        className="flex flex-col items-center justify-center p-1.5 h-auto text-xs rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm data-[state=active]:font-medium text-gray-600 dark:text-gray-300 data-[state=active]:text-gray-900 data-[state=active]:dark:text-white"
                      >
                        {tabValue === 'theme' && <Palette className="h-4 w-4 mb-1" />}
                        {tabValue === 'layout' && <LayoutIcon className="h-4 w-4 mb-1" />}
                        {tabValue === 'fonts' && <Type className="h-4 w-4 mb-1" />}
                        {tabValue === 'elements' && <Square className="h-4 w-4 mb-1" />}
                        {tabValue === 'media' && <ImageIcon className="h-4 w-4 mb-1" />}
                        {tabValue === 'interactive' && <span className="h-4 w-4 mb-1">✨</span>}
                        {tabValue.charAt(0).toUpperCase() + tabValue.slice(1)}
                    </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  <TabsContent value="theme">
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-semibold">Theme</Label>
                        <p className="text-sm text-gray-500 mb-3">Choose between light and dark mode.</p>
                        <RadioGroup 
                          defaultValue={previewSettings.theme}
                          value={previewSettings.theme}
                          onValueChange={(value) => setPreviewSettings({...previewSettings, theme: value as ThemeOption})}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="light" id="light" />
                            <Label htmlFor="light">Light</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="dark" id="dark" />
                            <Label htmlFor="dark">Dark</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm font-medium">
                            Primary Color
                          </Label>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            className="h-8 px-2"
                          >
                            {showColorPicker ? 'Close' : 'Change'}
                          </Button>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div 
                            className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer"
                            style={{ backgroundColor: previewSettings.accentColor }}
                            onClick={() => setShowColorPicker(!showColorPicker)}
                          />
                          <Input 
                            value={previewSettings.accentColor}
                            onChange={(e) => setPreviewSettings({...previewSettings, accentColor: e.target.value})}
                            className="w-32 font-mono text-sm"
                          />
                        </div>
                        {showColorPicker && (
                          <div className="absolute z-10 mt-2">
                            <div 
                              className="fixed inset-0" 
                              onClick={() => setShowColorPicker(false)}
                            />
                            <div className="relative z-20">
                              <SketchPicker 
                                color={previewSettings.accentColor}
                                onChangeComplete={(color) => 
                                  setPreviewSettings({...previewSettings, accentColor: color.hex})}
                                disableAlpha
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm font-medium">
                            Secondary Color
                          </Label>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowSecondaryColorPicker(!showSecondaryColorPicker)}
                            className="h-8 px-2"
                          >
                            {showSecondaryColorPicker ? 'Close' : 'Change'}
                          </Button>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div 
                            className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer flex items-center justify-center"
                            style={{ backgroundColor: previewSettings.secondaryColor || previewSettings.accentColor }}
                            onClick={() => setShowSecondaryColorPicker(!showSecondaryColorPicker)}
                          >
                            {!previewSettings.secondaryColor && (
                              <div className="text-white text-xs font-bold">+</div>
                            )}
                          </div>
                          <Input 
                            value={previewSettings.secondaryColor || ''}
                            onChange={(e) => setPreviewSettings({...previewSettings, secondaryColor: e.target.value})}
                            placeholder="Same as primary"
                            className="w-32 font-mono text-sm"
                          />
                        </div>
                        {showSecondaryColorPicker && (
                          <div className="absolute z-10 mt-2">
                            <div 
                              className="fixed inset-0" 
                              onClick={() => setShowSecondaryColorPicker(false)}
                            />
                            <div className="relative z-20">
                              <SketchPicker 
                                color={previewSettings.secondaryColor || previewSettings.accentColor}
                                onChangeComplete={handleSecondaryColorChange}
                                disableAlpha
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Separator />

                      <div>
                        <Label className="text-base font-semibold">Text Colors</Label>
                        <p className="text-sm text-gray-500 mb-3">Customize the appearance of text on your profile.</p>
                        
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm font-medium">
                              Heading Color
                            </Label>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowHeadingColorPicker(!showHeadingColorPicker)}
                              className="h-8 px-2"
                            >
                              {showHeadingColorPicker ? 'Close' : 'Change'}
                            </Button>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div 
                              className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer"
                              style={{ backgroundColor: previewSettings.headingColor || 'inherit' }}
                              onClick={() => setShowHeadingColorPicker(!showHeadingColorPicker)}
                            />
                            <Input 
                              value={previewSettings.headingColor || ''}
                              onChange={(e) => setPreviewSettings({...previewSettings, headingColor: e.target.value})}
                              className="w-32 font-mono text-sm"
                              placeholder="Default color"
                            />
                          </div>
                          {showHeadingColorPicker && (
                            <div className="absolute z-10 mt-2">
                              <div 
                                className="fixed inset-0" 
                                onClick={() => setShowHeadingColorPicker(false)}
                              />
                              <div className="relative z-20">
                                <SketchPicker 
                                  color={previewSettings.headingColor || '#1f2937'}
                                  onChangeComplete={(color) => 
                                    setPreviewSettings({...previewSettings, headingColor: color.hex})}
                                  disableAlpha
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm font-medium">
                              Body Text Color
                            </Label>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowBodyColorPicker(!showBodyColorPicker)}
                              className="h-8 px-2"
                            >
                              {showBodyColorPicker ? 'Close' : 'Change'}
                            </Button>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div 
                              className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer"
                              style={{ backgroundColor: previewSettings.bodyTextColor || 'inherit' }}
                              onClick={() => setShowBodyColorPicker(!showBodyColorPicker)}
                            />
                            <Input 
                              value={previewSettings.bodyTextColor || ''}
                              onChange={(e) => setPreviewSettings({...previewSettings, bodyTextColor: e.target.value})}
                              className="w-32 font-mono text-sm"
                              placeholder="Default color"
                            />
                          </div>
                          {showBodyColorPicker && (
                            <div className="absolute z-10 mt-2">
                              <div 
                                className="fixed inset-0" 
                                onClick={() => setShowBodyColorPicker(false)}
                              />
                              <div className="relative z-20">
                                <SketchPicker 
                                  color={previewSettings.bodyTextColor || '#4b5563'}
                                  onChangeComplete={(color) => 
                                    setPreviewSettings({...previewSettings, bodyTextColor: color.hex})}
                                  disableAlpha
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm font-medium">
                              Link Text Color
                            </Label>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowLinkColorPicker(!showLinkColorPicker)}
                              className="h-8 px-2"
                            >
                              {showLinkColorPicker ? 'Close' : 'Change'}
                            </Button>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div 
                              className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer"
                              style={{ backgroundColor: previewSettings.linkTextColor || previewSettings.accentColor }}
                              onClick={() => setShowLinkColorPicker(!showLinkColorPicker)}
                            />
                            <Input 
                              value={previewSettings.linkTextColor || ''}
                              onChange={(e) => setPreviewSettings({...previewSettings, linkTextColor: e.target.value})}
                              className="w-32 font-mono text-sm"
                              placeholder="Same as accent color"
                            />
                          </div>
                          {showLinkColorPicker && (
                            <div className="absolute z-10 mt-2">
                              <div 
                                className="fixed inset-0" 
                                onClick={() => setShowLinkColorPicker(false)}
                              />
                              <div className="relative z-20">
                                <SketchPicker 
                                  color={previewSettings.linkTextColor || previewSettings.accentColor}
                                  onChangeComplete={(color) => 
                                    setPreviewSettings({...previewSettings, linkTextColor: color.hex})}
                                  disableAlpha
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="layout">
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-semibold">Profile Layout</Label>
                        <p className="text-sm text-gray-500 mb-3">Choose the overall structure of your profile.</p>
                        
                        {/* New visual layout selector with thumbnails */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                          {Object.entries(LAYOUT_OPTIONS).map(([value, { name, description }]) => (
                            <div
                              key={value}
                              className={`border rounded-lg p-3 cursor-pointer transition-all hover:border-purple-500 ${
                                previewSettings.layout === value 
                                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-1 ring-purple-500' 
                                  : 'border-gray-200 dark:border-gray-700'
                              }`}
                              onClick={() => setPreviewSettings({...previewSettings, layout: value as LayoutOption})}
                            >
                              <div className="relative h-20 mb-2 overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
                                {/* Layout preview thumbnails */}
                                {value === 'default' && (
                                  <div className="absolute inset-0 flex">
                                    <div className="w-1/3 h-full bg-gray-300 dark:bg-gray-700 p-1">
                                      <div className="w-full h-1/3 rounded-full bg-gray-400 dark:bg-gray-600 mb-1"></div>
                                      <div className="w-full h-8 rounded-sm bg-gray-400 dark:bg-gray-600"></div>
                                    </div>
                                    <div className="w-2/3 h-full bg-white dark:bg-gray-800 p-1">
                                      <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 mb-1"></div>
                                      <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 mb-1"></div>
                                      <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 mb-1"></div>
                                    </div>
                                  </div>
                                )}
                                
                                {value === 'creator' && (
                                  <div className="absolute inset-0 flex flex-col">
                                    <div className="h-2/3 bg-purple-400 dark:bg-purple-700 flex items-center justify-center">
                                      <div className="w-5 h-5 rounded-full bg-white"></div>
                                    </div>
                                    <div className="h-1/3 bg-white dark:bg-gray-800 p-1">
                                      <div className="w-full h-1 bg-gray-300 dark:bg-gray-700 mb-1"></div>
                                      <div className="w-full h-1 bg-gray-300 dark:bg-gray-700 mb-1"></div>
                                    </div>
                                  </div>
                                )}
                                
                                {value === 'sidebar' && (
                                  <div className="absolute inset-0 flex">
                                    <div className="w-1/4 h-full bg-gray-300 dark:bg-gray-700 p-1">
                                      <div className="w-full h-3 rounded-full bg-gray-400 dark:bg-gray-600 mb-1"></div>
                                      <div className="w-full h-2 bg-gray-400 dark:bg-gray-600 mb-1"></div>
                                      <div className="w-full h-2 bg-gray-400 dark:bg-gray-600 mb-1"></div>
                                    </div>
                                    <div className="w-3/4 h-full bg-white dark:bg-gray-800 p-1">
                                      <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 mb-1"></div>
                                      <div className="w-full h-8 bg-gray-300 dark:bg-gray-700 mb-1"></div>
                                    </div>
                                  </div>
                                )}
                                
                                {value === 'minimal' && (
                                  <div className="absolute inset-0 p-1">
                                    <div className="w-full h-3 rounded-full bg-gray-300 dark:bg-gray-700 mb-2"></div>
                                    <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 mb-1"></div>
                                    <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 mb-1"></div>
                                    <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 mb-1"></div>
                                  </div>
                                )}
                                
                                {value === 'centered' && (
                                  <div className="absolute inset-0 p-1 flex flex-col items-center">
                                    <div className="w-1/3 h-4 rounded-full bg-gray-300 dark:bg-gray-700 mb-1"></div>
                                    <div className="w-2/3 h-2 bg-gray-300 dark:bg-gray-700 mb-1"></div>
                                    <div className="w-2/3 h-2 bg-gray-300 dark:bg-gray-700 mb-1"></div>
                                  </div>
                                )}
                                
                                {value === 'grid' && (
                                  <div className="absolute inset-0 p-1 grid grid-cols-2 gap-1">
                                    <div className="bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    <div className="bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    <div className="bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    <div className="bg-gray-300 dark:bg-gray-700 rounded"></div>
                                  </div>
                                )}
                                
                                {value === 'masonry' && (
                                  <div className="absolute inset-0 p-1 flex">
                                    <div className="w-1/3 h-full pr-1 flex flex-col gap-1">
                                      <div className="h-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                      <div className="h-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    </div>
                                    <div className="w-1/3 h-full px-0.5 flex flex-col gap-1">
                                      <div className="h-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                      <div className="h-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    </div>
                                    <div className="w-1/3 h-full pl-1 flex flex-col gap-1">
                                      <div className="h-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                      <div className="h-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    </div>
                                  </div>
                                )}

                                {value === 'cards' && (
                                  <div className="absolute inset-0 p-1 grid grid-cols-2 gap-1">
                                    <div className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-sm"></div>
                                    <div className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-sm"></div>
                                    <div className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-sm"></div>
                                    <div className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-sm"></div>
                                  </div>
                                )}

                                {/* For other layouts, display a simple placeholder */}
                                {!['default', 'creator', 'sidebar', 'minimal', 'centered', 'grid', 'masonry', 'cards'].includes(value) && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{name}</span>
                                  </div>
                                )}
                              </div>
                              <p className="font-medium text-sm">{name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{description}</p>
                            </div>
                          ))}
                        </div>
                        
                        {/* Enhanced select dropdown for all layouts */}
                        <Select 
                          value={previewSettings.layout}
                          onValueChange={(value) => setPreviewSettings({...previewSettings, layout: value as LayoutOption})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select layout" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(LAYOUT_OPTIONS).map(([value, { name, description }]) => (
                              <SelectItem key={value} value={value}>
                                <div>
                                  <span className="font-medium">{name}</span>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-base font-semibold">Background</Label>
                        <p className="text-sm text-gray-500 mb-3">Choose a background image or pattern for your profile.</p>
                        
                        <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm font-medium">
                            Background Image
                          </Label>
                          <Switch 
                            checked={!!previewSettings.backgroundImageUrl}
                            onCheckedChange={(checked) => setPreviewSettings({
                              ...previewSettings,
                                  backgroundImageUrl: checked ? previewSettings.backgroundImageUrl || '/default-bg.jpg' : undefined,
                                  // Disable pattern if image is enabled
                                  backgroundPattern: checked ? 'none' : previewSettings.backgroundPattern
                            })}
                          />
                        </div>
                        {previewSettings.backgroundImageUrl && (
                          <div className="mt-2">
                                <BackgroundImagePicker 
                                  currentImage={previewSettings.backgroundImageUrl}
                                  onImageSelected={(imageDataUrl: string) => {
                                    setPreviewSettings({
                                      ...previewSettings,
                                      backgroundImageUrl: imageDataUrl,
                                      // Disable pattern if image is enabled
                                      backgroundPattern: 'none'
                                    });
                                  }}
                                  onImageRemoved={() => {
                                    setPreviewSettings({
                                      ...previewSettings,
                                      backgroundImageUrl: undefined
                                    });
                                  }}
                                  title="Background Image"
                                  description="Upload an image to use as your page background"
                                  aspectRatio="cover"
                                />
                              </div>
                            )}
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label className="text-sm font-medium">
                                Background Pattern
                              </Label>
                              <Switch 
                                checked={previewSettings.backgroundPattern !== 'none'}
                                disabled={!!previewSettings.backgroundImageUrl}
                                onCheckedChange={(checked) => setPreviewSettings({
                                  ...previewSettings,
                                  backgroundPattern: checked ? 'girlboss' : 'none'
                                })}
                              />
                            </div>
                            
                            {previewSettings.backgroundPattern !== 'none' && !previewSettings.backgroundImageUrl && (
                              <div className="space-y-5 mt-4">
                                <div>
                                  <Label className="text-sm mb-2 block">Style & Mood</Label>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {Object.entries(BACKGROUND_PATTERNS)
                                      .filter(([key]) => key !== 'none')
                                      .map(([value, { name, description, colors }]) => {
                                        // Generate a simple preview gradient for each pattern
                                        const color1 = colors ? colors[0] : previewSettings.accentColor;
                                        const color2 = colors ? colors[1] || colors[0] : previewSettings.secondaryColor || previewSettings.accentColor;
                                        
                                        return (
                                          <div
                                            key={value}
                                            className={`relative overflow-hidden border rounded-md p-3 cursor-pointer transition-all hover:scale-105 ${
                                              previewSettings.backgroundPattern === value 
                                                ? 'ring-2 ring-offset-1 ring-accent' 
                                                : 'hover:border-accent'
                                            }`}
                                            onClick={() => setPreviewSettings({
                                              ...previewSettings,
                                              backgroundPattern: value as BackgroundPatternOption
                                            })}
                                            style={{
                                              background: value === 'minimal' 
                                                ? `linear-gradient(90deg, ${color1}20 1px, transparent 1px),
                                                   linear-gradient(180deg, ${color1}20 1px, transparent 1px)`
                                                : `linear-gradient(45deg, ${color1}40, ${color2}40)`,
                                              backgroundSize: value === 'minimal' ? '10px 10px' : '100% 100%',
                                            }}
                                          >
                                            <div className="bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm p-2 rounded-sm">
                                              <p className="font-medium text-gray-900 dark:text-white text-sm">{name}</p>
                                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{description}</p>
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-sm mb-2 block">Pattern Color Override (Optional)</Label>
                                  <div className="flex items-center space-x-3">
                                    <div 
                                      className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer flex items-center justify-center"
                                      style={{ 
                                        backgroundColor: previewSettings.backgroundPatternColorOverride || 'transparent',
                                        borderColor: previewSettings.backgroundPatternColorOverride ? 'transparent' : 'currentColor'
                                      }}
                                      onClick={() => {
                                        if (previewSettings.backgroundPatternColorOverride) {
                                          setPreviewSettings({
                                            ...previewSettings,
                                            backgroundPatternColorOverride: undefined
                                          });
                                        } else {
                                          // Use accent color as default
                                          setPreviewSettings({
                                            ...previewSettings,
                                            backgroundPatternColorOverride: previewSettings.accentColor
                                          });
                                        }
                                      }}
                                    >
                                      {!previewSettings.backgroundPatternColorOverride && (
                                        <span className="text-xs font-medium">AUTO</span>
                                      )}
                                    </div>
                                    
                                    {previewSettings.backgroundPatternColorOverride && (
                            <Input 
                                        value={previewSettings.backgroundPatternColorOverride}
                              onChange={(e) => setPreviewSettings({
                                ...previewSettings,
                                          backgroundPatternColorOverride: e.target.value
                                        })}
                                        placeholder="Enter a hex color"
                                        className="w-40 font-mono text-sm"
                                      />
                                    )}
                                    
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="ml-auto"
                                      onClick={() => setPreviewSettings({
                                        ...previewSettings,
                                        backgroundPatternColorOverride: undefined
                                      })}
                                      disabled={!previewSettings.backgroundPatternColorOverride}
                                    >
                                      Reset
                                    </Button>
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <Label htmlFor="pattern-opacity" className="text-sm">
                                      Pattern Opacity: {previewSettings.backgroundPatternOpacity || 30}%
                                    </Label>
                                  </div>
                                  <Input 
                                    id="pattern-opacity"
                                    type="range" 
                                    min={5} 
                                    max={100} 
                                    step={5}
                                    value={previewSettings.backgroundPatternOpacity || 30}
                                    onChange={(e) => setPreviewSettings({
                                      ...previewSettings,
                                      backgroundPatternOpacity: parseInt(e.target.value)
                                    })}
                                    className="cursor-pointer"
                                  />
                                </div>
                                
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <Label htmlFor="pattern-scale" className="text-sm">
                                      Pattern Scale: {previewSettings.backgroundPatternScale || 100}%
                                    </Label>
                                  </div>
                                  <Input 
                                    id="pattern-scale"
                                    type="range" 
                                    min={50} 
                                    max={200} 
                                    step={10}
                                    value={previewSettings.backgroundPatternScale || 100}
                                    onChange={(e) => setPreviewSettings({
                                      ...previewSettings,
                                      backgroundPatternScale: parseInt(e.target.value)
                                    })}
                                    className="cursor-pointer"
                                  />
                                </div>

                                <Separator />

                                <div className="flex items-center space-x-2 mt-4 mb-4">
                                  <Switch 
                                    id="top-gradient"
                                    checked={previewSettings.enableTopGradient !== false}
                                    onCheckedChange={(checked) => setPreviewSettings({
                                      ...previewSettings, 
                                      enableTopGradient: checked
                                    })}
                                  />
                                  <Label htmlFor="top-gradient" className="text-sm">
                                    Enable top gradient (background will be behind all content when disabled)
                                  </Label>
                                </div>

                                <div>
                                  <div className="flex justify-between mb-1">
                                    <Label htmlFor="pattern-opacity" className="text-sm">
                                      Pattern Opacity: {previewSettings.backgroundPatternOpacity || 30}%
                                    </Label>
                                  </div>
                                  <Input 
                                    id="pattern-opacity"
                                    type="range" 
                                    min={5} 
                                    max={100} 
                                    step={5}
                                    value={previewSettings.backgroundPatternOpacity || 30}
                                    onChange={(e) => setPreviewSettings({
                                      ...previewSettings,
                                      backgroundPatternOpacity: parseInt(e.target.value)
                                    })}
                                    className="cursor-pointer"
                                  />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-xs"
                                    onClick={() => setPreviewSettings({
                                      ...previewSettings,
                                      backgroundPatternOpacity: 30,
                                      backgroundPatternScale: 100,
                                      backgroundPatternColorOverride: undefined
                                    })}
                                  >
                                    Reset to Default
                                  </Button>
                                  
                                  <Button 
                                    variant="default" 
                                    size="sm" 
                                    className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                    onClick={() => {
                                      // Pick a random trendy pattern
                                      const trendyPatterns = ['girlboss', 'summer', 'hamptons', 'creative', 'floral', 'retro', 'neon', 'luxury', 'fashion', 'tropical'];
                                      const randomPattern = trendyPatterns[Math.floor(Math.random() * trendyPatterns.length)] as BackgroundPatternOption;
                                      
                                      setPreviewSettings({
                                        ...previewSettings,
                                        backgroundPattern: randomPattern,
                                        backgroundPatternOpacity: 40,
                                        backgroundPatternScale: 110
                                      });
                                    }}
                                  >
                                    Surprise Me!
                                  </Button>
                                </div>
                          </div>
                        )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-semibold">Section Order</Label>
                        <p className="text-sm text-gray-500 mb-3">Arrange the order of sections on your profile.</p>
                        
                        <div className="space-y-2 border rounded-md p-3 bg-gray-50 dark:bg-gray-800">
                          {previewSettings.contentSectionOrder?.map((section, index) => (
                            <div 
                              key={section}
                              className="flex items-center justify-between bg-white dark:bg-gray-900 p-3 rounded border cursor-move"
                            >
                              <div className="flex items-center">
                                <div className="mr-3 h-5 w-5 text-gray-400">≡</div>
                                <span>{CONTENT_SECTIONS[section]}</span>
                              </div>
                              <div className="flex space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => {
                                    if (index === 0) return;
                                    
                                    const newOrder = [...(previewSettings.contentSectionOrder || [])];
                                    const temp = newOrder[index];
                                    newOrder[index] = newOrder[index - 1];
                                    newOrder[index - 1] = temp;
                                    
                                    setPreviewSettings({
                                      ...previewSettings,
                                      contentSectionOrder: newOrder
                                    });
                                  }}
                                  disabled={index === 0}
                                >
                                  ↑
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => {
                                    if (index === (previewSettings.contentSectionOrder?.length || 0) - 1) return;
                                    
                                    const newOrder = [...(previewSettings.contentSectionOrder || [])];
                                    const temp = newOrder[index];
                                    newOrder[index] = newOrder[index + 1];
                                    newOrder[index + 1] = temp;
                                    
                                    setPreviewSettings({
                                      ...previewSettings,
                                      contentSectionOrder: newOrder
                                    });
                                  }}
                                  disabled={index === (previewSettings.contentSectionOrder?.length || 0) - 1}
                                >
                                  ↓
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                                  onClick={() => {
                                    const newOrder = [...(previewSettings.contentSectionOrder || [])];
                                    newOrder.splice(index, 1);
                                    
                                    setPreviewSettings({
                                      ...previewSettings,
                                      contentSectionOrder: newOrder
                                    });
                                  }}
                                >
                                  ×
                                </Button>
                              </div>
                            </div>
                          ))}
                          
                          {/* Add hidden sections */}
                          {Object.keys(CONTENT_SECTIONS).length > (previewSettings.contentSectionOrder?.length || 0) && (
                            <div className="mt-3">
                              <Label className="text-sm mb-2 block">Add section:</Label>
                              <Select
                                onValueChange={(value) => {
                                  const currentOrder = previewSettings.contentSectionOrder || [];
                                  if (currentOrder.includes(value as any)) return;
                                  
                                  setPreviewSettings({
                                    ...previewSettings,
                                    contentSectionOrder: [...currentOrder, value as any]
                                  });
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select section to add" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(CONTENT_SECTIONS)
                                    .filter(([key]) => !(previewSettings.contentSectionOrder || []).includes(key as any))
                                    .map(([key, name]: [string, string]) => (
                                      <SelectItem key={key} value={key}>{name}</SelectItem>
                                    ))
                                  }
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="fonts">
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-semibold">Font Family</Label>
                        <p className="text-sm text-gray-500 mb-3">Select the primary font for your profile.</p>
                        <Select 
                          value={previewSettings.fontFamily}
                          onValueChange={(value) => setPreviewSettings({...previewSettings, fontFamily: value as FontFamilyOption})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select font" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(FONT_FAMILY_NAMES).map(([key, name]) => (
                              <SelectItem key={key} value={key}>{name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="elements">
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-semibold">Button Style</Label>
                        <p className="text-sm text-gray-500 mb-3">Select the appearance of primary buttons.</p>
                        <RadioGroup 
                          value={previewSettings.buttonStyle}
                          onValueChange={(value) => setPreviewSettings({...previewSettings, buttonStyle: value as ButtonStyleOption})}
                          className="grid grid-cols-3 gap-2"
                        >
                          {Object.entries(BUTTON_STYLES).map(([key, name]) => (
                            <div key={key} className="flex items-center space-x-2">
                              <RadioGroupItem value={key} id={`button-${key}`} />
                              <Label htmlFor={`button-${key}`} className="text-xs">{name}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label className="text-base font-semibold">Card Style</Label>
                        <p className="text-sm text-gray-500 mb-3">Choose the shape and style of cards.</p>
                        <RadioGroup 
                          value={previewSettings.cardStyle || 'rounded'}
                          onValueChange={(value) => setPreviewSettings({...previewSettings, cardStyle: value as any})}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="rounded" id="card-rounded" />
                            <Label htmlFor="card-rounded">Rounded</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sharp" id="card-sharp" />
                            <Label htmlFor="card-sharp">Sharp</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pill" id="card-pill" />
                            <Label htmlFor="card-pill">Pill</Label>
                          </div>
                          {/* Neumorphic might be too complex for now 
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="neumorphic" id="card-neumorphic" />
                            <Label htmlFor="card-neumorphic">Neumorphic</Label>
                          </div> */}
                        </RadioGroup>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label className="text-base font-semibold">Border Width</Label>
                        <p className="text-sm text-gray-500 mb-3">Adjust the thickness of borders on elements.</p>
                        <RadioGroup 
                          value={previewSettings.borderWidth || 'thin'}
                          onValueChange={(value) => setPreviewSettings({...previewSettings, borderWidth: value as any})}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="none" id="border-none" />
                            <Label htmlFor="border-none">None</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="thin" id="border-thin" />
                            <Label htmlFor="border-thin">Thin</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium" id="border-medium" />
                            <Label htmlFor="border-medium">Medium</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="thick" id="border-thick" />
                            <Label htmlFor="border-thick">Thick</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />

                      <div>
                        <Label className="text-base font-semibold">Effects & Animations</Label>
                        <p className="text-sm text-gray-500 mb-3">Enable visual effects. Performance may vary.</p>
                        
                        <div className="space-y-3 mt-3">
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="hover-effects"
                              checked={previewSettings.enableHoverEffects}
                              onCheckedChange={(checked) => setPreviewSettings({...previewSettings, enableHoverEffects: checked})}
                            />
                            <Label htmlFor="hover-effects" className="text-sm">Enable hover effects on cards</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="backdrop-filter"
                              checked={previewSettings.enableBackdropFilter}
                              onCheckedChange={(checked) => setPreviewSettings({...previewSettings, enableBackdropFilter: checked})}
                            />
                            <Label htmlFor="backdrop-filter" className="text-sm">Enable glassmorphism effect</Label>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium block mb-1">Animation Intensity</Label>
                            <RadioGroup 
                              value={previewSettings.animations || 'minimal'}
                              onValueChange={(value) => setPreviewSettings({...previewSettings, animations: value as any})}
                              className="grid grid-cols-2 gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="none" id="anim-none" />
                                <Label htmlFor="anim-none">None</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="minimal" id="anim-minimal" />
                                <Label htmlFor="anim-minimal">Minimal</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="moderate" id="anim-moderate" />
                                <Label htmlFor="anim-moderate">Moderate</Label>
                              </div>
                              {/* Advanced might be too much for now
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="advanced" id="anim-advanced" />
                                <Label htmlFor="anim-advanced">Advanced</Label>
                              </div> */}
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="media">
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-semibold">Profile Picture</Label>
                        <p className="text-sm text-gray-500 mb-3">
                           Manage your profile picture (handled in Profile Settings).
                        </p>
                        {/* Placeholder or link to profile settings */}
                         <Button variant="outline" asChild>
                           <Link href="/profile">Go to Profile Settings</Link>
                         </Button>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label className="text-base font-semibold">Cover Image</Label>
                        <p className="text-sm text-gray-500 mb-3">
                           Upload a custom image for your profile header.
                        </p>
                         <BackgroundImagePicker 
                          currentImage={previewSettings.coverImageUrl} 
                           onImageSelected={(imageDataUrl: string) => {
                            setPreviewSettings({
                              ...previewSettings,
                              coverImageUrl: imageDataUrl
                            });
                          }}
                          onImageRemoved={() => {
                            setPreviewSettings({
                              ...previewSettings,
                              coverImageUrl: undefined
                            });
                          }}
                          title="Cover Image"
                          description="Upload an image to use as your profile header"
                          aspectRatio="cover"
                        />
                       </div>
                       
                       <div className="flex items-center space-x-2 mt-2">
                         <Switch 
                           id="cover-darken"
                           checked={previewSettings.coverDarken}
                           onCheckedChange={(checked) => setPreviewSettings({...previewSettings, coverDarken: checked})}
                         />
                         <Label htmlFor="cover-darken" className="text-sm">
                           Darken cover image for better text contrast
                         </Label>
                       </div>
                       
                       <Separator />
                       
                       <div>
                         <Label className="text-base font-semibold">Page Background Image</Label>
                         <p className="text-sm text-gray-500 mb-3">
                           Set a background image for your entire profile page.
                         </p>
                         <BackgroundImagePicker 
                           currentImage={previewSettings.backgroundImageUrl}
                           onImageSelected={(imageDataUrl: string) => {
                             setPreviewSettings({
                               ...previewSettings,
                              backgroundImageUrl: imageDataUrl,
                              // Disable pattern if image is enabled
                              backgroundPattern: 'none'
                             });
                           }}
                          onImageRemoved={() => {
                            setPreviewSettings({
                              ...previewSettings,
                              backgroundImageUrl: undefined
                            });
                          }}
                          title="Background Image"
                          description="Upload an image to use as your page background"
                          aspectRatio="cover"
                        />
                      </div>
                       
                       <Separator />
                       
                       <div>
                        <Label className="text-base font-semibold">Content Display</Label>
                        <p className="text-sm text-gray-500 mb-3">
                           Control how embedded content is shown.
                        </p>
                         <div className="flex items-center space-x-2 mt-2">
                          <Switch 
                            id="enable-embeds"
                            checked={previewSettings.enableEmbeddedContent !== false} // Default true if undefined
                            onCheckedChange={(checked) => setPreviewSettings({...previewSettings, enableEmbeddedContent: checked})}
                          />
                          <Label htmlFor="enable-embeds" className="text-sm">
                            Show embedded content (videos, posts)
                          </Label>
                        </div>
                         <div className="flex items-center space-x-2 mt-2">
                           <Switch 
                             id="hide-content-mobile"
                             checked={previewSettings.hideContentOnMobile}
                             onCheckedChange={(checked) => setPreviewSettings({...previewSettings, hideContentOnMobile: checked})}
                           />
                           <Label htmlFor="hide-content-mobile" className="text-sm">
                             Hide content section on mobile devices
                           </Label>
                         </div>
                       </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="interactive">
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-semibold">Interactive Elements</Label>
                        <p className="text-sm text-gray-500 mb-3">
                          Add interactive features to your profile to engage visitors.
                        </p>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="enable-interactive"
                              checked={previewSettings.enableInteractiveElements}
                              onCheckedChange={(checked) => setPreviewSettings({
                                ...previewSettings,
                                enableInteractiveElements: checked
                              })}
                            />
                            <Label htmlFor="enable-interactive">Enable interactive elements</Label>
                          </div>
                          
                          {previewSettings.enableInteractiveElements && (
                            <RadioGroup 
                              value={previewSettings.interactiveElementStyle || 'hover'}
                              onValueChange={(value: any) => setPreviewSettings({
                                ...previewSettings,
                                interactiveElementStyle: value
                              })}
                              className="grid grid-cols-2 gap-2 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="hover" id="interactive-hover" />
                                <Label htmlFor="interactive-hover" className="text-sm">Hover effects</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="click" id="interactive-click" />
                                <Label htmlFor="interactive-click" className="text-sm">Click effects</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="scroll" id="interactive-scroll" />
                                <Label htmlFor="interactive-scroll" className="text-sm">Scroll effects</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="custom" id="interactive-custom" />
                                <Label htmlFor="interactive-custom" className="text-sm">Custom</Label>
                              </div>
                            </RadioGroup>
                          )}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label className="text-base font-semibold">Card Effects</Label>
                        <p className="text-sm text-gray-500 mb-3">
                          Add special effects to cards on your profile.
                        </p>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="card-tilt"
                              checked={previewSettings.enableCardTiltEffect}
                              onCheckedChange={(checked) => setPreviewSettings({
                                ...previewSettings,
                                enableCardTiltEffect: checked
                              })}
                            />
                            <Label htmlFor="card-tilt">Enable 3D tilt effect on cards</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="section-animations"
                              checked={previewSettings.enableSectionEntranceAnimations}
                              onCheckedChange={(checked) => setPreviewSettings({
                                ...previewSettings,
                                enableSectionEntranceAnimations: checked
                              })}
                            />
                            <Label htmlFor="section-animations">Enable section entrance animations</Label>
                          </div>
                          
                          {previewSettings.enableSectionEntranceAnimations && (
                            <RadioGroup 
                              value={previewSettings.sectionEntranceAnimationStyle || 'fade'}
                              onValueChange={(value: any) => setPreviewSettings({
                                ...previewSettings,
                                sectionEntranceAnimationStyle: value
                              })}
                              className="grid grid-cols-2 gap-2 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="fade" id="animation-fade" />
                                <Label htmlFor="animation-fade" className="text-sm">Fade In</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="slide" id="animation-slide" />
                                <Label htmlFor="animation-slide" className="text-sm">Slide Up</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="zoom" id="animation-zoom" />
                                <Label htmlFor="animation-zoom" className="text-sm">Zoom In</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="flip" id="animation-flip" />
                                <Label htmlFor="animation-flip" className="text-sm">Flip</Label>
                              </div>
                            </RadioGroup>
                          )}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label className="text-base font-semibold">Scroll Effects</Label>
                        <p className="text-sm text-gray-500 mb-3">
                          Add effects that trigger as visitors scroll through your profile.
                        </p>
                        
                        <RadioGroup 
                          value={previewSettings.scrollEffects || 'none'}
                          onValueChange={(value: any) => setPreviewSettings({
                            ...previewSettings,
                            scrollEffects: value
                          })}
                          className="grid grid-cols-2 gap-2"
                        >
                          {Object.entries(SCROLL_EFFECT_OPTIONS).map(([value, label]) => (
                            <div key={value} className="flex items-center space-x-2">
                              <RadioGroupItem value={value} id={`scroll-${value}`} />
                              <Label htmlFor={`scroll-${value}`} className="text-sm">{label as string}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label className="text-base font-semibold">Profile Image Shape</Label>
                        <p className="text-sm text-gray-500 mb-3">
                          Choose a shape for your profile image.
                        </p>
                        
                        <RadioGroup 
                          value={previewSettings.profileImageShape || 'circle'}
                          onValueChange={(value: any) => setPreviewSettings({
                            ...previewSettings,
                            profileImageShape: value
                          })}
                          className="grid grid-cols-2 gap-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="circle" id="shape-circle" />
                            <Label htmlFor="shape-circle" className="text-sm">Circle</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="square" id="shape-square" />
                            <Label htmlFor="shape-square" className="text-sm">Square</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="rounded" id="shape-rounded" />
                            <Label htmlFor="shape-rounded" className="text-sm">Rounded</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="hexagon" id="shape-hexagon" />
                            <Label htmlFor="shape-hexagon" className="text-sm">Hexagon</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label className="text-base font-semibold">Image Filters</Label>
                        <p className="text-sm text-gray-500 mb-3">
                          Apply filters to all images on your profile.
                        </p>
                        
                        <RadioGroup 
                          value={previewSettings.imageFilter || 'none'}
                          onValueChange={(value: any) => setPreviewSettings({
                            ...previewSettings,
                            imageFilter: value
                          })}
                          className="grid grid-cols-2 gap-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="none" id="filter-none" />
                            <Label htmlFor="filter-none" className="text-sm">None</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="grayscale" id="filter-grayscale" />
                            <Label htmlFor="filter-grayscale" className="text-sm">Grayscale</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sepia" id="filter-sepia" />
                            <Label htmlFor="filter-sepia" className="text-sm">Sepia</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="brightness" id="filter-brightness" />
                            <Label htmlFor="filter-brightness" className="text-sm">Brightness</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="contrast" id="filter-contrast" />
                            <Label htmlFor="filter-contrast" className="text-sm">Contrast</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="hue-rotate" id="filter-hue" />
                            <Label htmlFor="filter-hue" className="text-sm">Hue Rotate</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label className="text-base font-semibold">Advanced Features (Beta)</Label>
                        <p className="text-sm text-gray-500 mb-3">
                          These features are in beta and may not work on all browsers.
                        </p>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="enable-mouse-trail"
                              checked={previewSettings.enableCustomMouseTrail}
                              onCheckedChange={(checked) => setPreviewSettings({
                                ...previewSettings,
                                enableCustomMouseTrail: checked
                              })}
                            />
                            <Label htmlFor="enable-mouse-trail">Enable custom mouse trail</Label>
                          </div>
                          
                          {previewSettings.enableCustomMouseTrail && (
                            <RadioGroup 
                              value={previewSettings.mouseTrailStyle || 'particles'}
                              onValueChange={(value: any) => setPreviewSettings({
                                ...previewSettings,
                                mouseTrailStyle: value
                              })}
                              className="grid grid-cols-2 gap-2 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="particles" id="trail-particles" />
                                <Label htmlFor="trail-particles" className="text-sm">Particles</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="trail" id="trail-line" />
                                <Label htmlFor="trail-line" className="text-sm">Line Trail</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="glow" id="trail-glow" />
                                <Label htmlFor="trail-glow" className="text-sm">Glow Effect</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="custom" id="trail-custom" />
                                <Label htmlFor="trail-custom" className="text-sm">Custom</Label>
                              </div>
                            </RadioGroup>
                          )}
                          
                          <div className="mt-4 flex items-center space-x-2">
                            <Switch 
                              id="enable-audio"
                              checked={previewSettings.enableAudioBackground}
                              onCheckedChange={(checked) => setPreviewSettings({
                                ...previewSettings,
                                enableAudioBackground: checked
                              })}
                            />
                            <Label htmlFor="enable-audio">Enable background audio</Label>
                            <Badge variant="outline" className="ml-2 text-xs">PRO</Badge>
                          </div>
                          
                          <div className="mt-4 flex items-center space-x-2">
                            <Switch 
                              id="enable-loading"
                              checked={previewSettings.enableCustomLoadingScreen}
                              onCheckedChange={(checked) => setPreviewSettings({
                                ...previewSettings,
                                enableCustomLoadingScreen: checked
                              })}
                            />
                            <Label htmlFor="enable-loading">Custom loading screen</Label>
                            <Badge variant="outline" className="ml-2 text-xs">PRO</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t p-4 flex justify-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleResetToDefaults}
                  disabled={saving}
                >
                  Reset to Defaults
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="lg:col-span-7 xl:col-span-8 h-fit sticky top-4">
            <Card className="border bg-gray-50 dark:bg-gray-800/50 shadow-inner">
              <CardHeader className="border-b bg-white dark:bg-gray-900/50 rounded-t-lg">
                <CardTitle className="text-center text-xl">Live Preview</CardTitle>
                <CardDescription className="text-center">
                  See how your profile will look to visitors
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 lg:p-6 h-[calc(100vh-12rem)] overflow-hidden">
                {user ? (
                  <ProfilePreview 
                    user={user} 
                    customization={previewSettings} 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 