"use client"

import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import firebase_app from '../firebase/config';
import UploadHeadshot from './uploadImg/uploadImage';
import Industries from './industries/industries';
import Bio from './bio/bio';
import Socials from './socials/socials';
import { User } from '../user';
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, Camera, Sparkles, Hash, FileText } from 'lucide-react';

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const totalSteps = 4;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data() as User;
          setUser(userData);
          
          // Determine the current step based on user data
          if (!userData.profilePicture) {
            setCurrentStep(1); // Profile picture step
          } else if (userData.industries.length === 0) {
            setCurrentStep(2); // Industries step
          } else if (!userData.bio || userData.bio.length === 0) {
            setCurrentStep(3); // Bio step
          } else {
            setCurrentStep(4); // Socials step
          }
        } else {
          console.error('User document does not exist');
        }
        setLoading(false);
      } else {
        setUser(null);
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [auth, db, router]);

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      router.push('/dashboard');
    }
  };

  const skipToNextStep = () => {
    goToNextStep();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">Setting up your profile...</p>
        </div>
      </div>
    );
  }

  // Icons for each step
  const stepIcons = [
    <Camera key="camera" className="h-6 w-6" />,
    <Hash key="hash" className="h-6 w-6" />,
    <FileText key="fileText" className="h-6 w-6" />,
    <Sparkles key="sparkles" className="h-6 w-6" />
  ];

  // Titles for each step
  const stepTitles = [
    "Upload Profile Picture",
    "Select Your Industries",
    "Create Your Bio",
    "Connect Your Socials"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center space-x-2">
          <Image src='/logo.svg' height={32} width={32} alt="Logo" className="animate-pulse" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Influyst</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">@{user?.username}</span>
          <div className="bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-full w-10 h-10 flex justify-center items-center">
            {user?.username?.substring(0, 1).toUpperCase()}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Progress bar */}
        <div className="mb-12">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Complete Your Profile</h1>
            <p className="text-gray-600 dark:text-gray-400">Step {currentStep} of {totalSteps}</p>
          </div>
          
          <div className="relative w-full">
            {/* Background track */}
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              {/* Progress fill */}
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            
            {/* Step indicators */}
            <div className="flex justify-between absolute top-0 left-0 right-0 -mt-4">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col items-center ${idx + 1 <= currentStep ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400 dark:text-gray-600'}`}
                >
                  <div 
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-full 
                      ${idx + 1 < currentStep 
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-2 border-purple-500' 
                        : idx + 1 === currentStep
                          ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                      }
                      transition-all duration-300 z-10
                    `}
                  >
                    {idx + 1 < currentStep ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      stepIcons[idx]
                    )}
                  </div>
                  <span className="mt-2 text-xs font-medium hidden sm:block">{stepTitles[idx]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-8"
          >
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Show the world who you are
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Upload a profile picture that represents you as a creator. This will be displayed on your media kit.
                  </p>
                </div>
                <UploadHeadshot setProfilePictureUploaded={() => goToNextStep()} />
                <div className="text-center mt-8">
                  <button 
                    onClick={skipToNextStep}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                  >
                    Skip for now
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && user && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    What industries do you create in?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Select the categories that best represent your content. This helps brands find you for the right partnerships.
                  </p>
                </div>
                <Industries setStep={goToNextStep} initialTags={user.industries || []} onTagsChange={() => {}} />
                <div className="text-center mt-8">
                  <button 
                    onClick={skipToNextStep}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                  >
                    Skip for now
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && user && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Tell your story
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Write a compelling bio that showcases your personality and what makes you unique as a creator.
                  </p>
                </div>
                <Bio setStep={goToNextStep} />
                <div className="text-center mt-8">
                  <button 
                    onClick={skipToNextStep}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                  >
                    Skip for now
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && user && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Connect your social platforms
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Link your social media accounts to automatically display your metrics on your media kit.
                  </p>
                </div>
                <Socials 
                  onContinue={() => router.push('/dashboard')} 
                  onAddSocial={(platformName) => console.log(`Adding ${platformName}`)} 
                  onSkip={() => router.push('/dashboard')} 
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tips section */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800/30">
          <div className="flex items-start">
            <div className="mr-4 mt-1">
              <div className="bg-purple-100 dark:bg-purple-800/50 rounded-full p-2">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">Pro Tip</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentStep === 1 && "A professional-looking profile picture can increase your chances of getting brand deals by up to 40%."}
                {currentStep === 2 && "Being specific about your industries helps brands find you for relevant campaigns that match your audience."}
                {currentStep === 3 && "The ideal bio length is 100-150 words. Focus on your unique perspective and value to your audience."}
                {currentStep === 4 && "Connecting your social platforms allows brands to see your real-time metrics, increasing trust and transparency."}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
