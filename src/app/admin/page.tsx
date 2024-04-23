"use client"

import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebase_app from '../firebase/config';
import UploadHeadshot from './uploadImg/uploadImage';
import { User } from '../user';
import Image from "next/image";
import Industries from './industries/industries';
import Bio from './bio/bio';
import Socials from './socials/socials';

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profilePictureUploaded, setProfilePictureUploaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          setUser(userDocSnapshot.data() as User);
          if (userDocSnapshot.data()['profilePicture']) {
            setCurrentStep(2);
            if (userDocSnapshot.data()['industries']) {
              setCurrentStep(3);
              if (userDocSnapshot.data()['bio']) {
                setCurrentStep(4);
              }
            }
          }
        } else {
          console.error('User document does not exist');
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const stepClasses = (step: number) => {
    let baseClasses = "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 flex justify-center items-center";
    if (currentStep >= step) {
      return `${baseClasses} bg-indigo-400 border-indigo-400`;
    } else {
      return `${baseClasses} bg-white border-gray-300`;
    }
  };

  return (
    <div className="container mx-auto px-4">
      <header className="flex justify-between items-center p-5 border-b">
        <div className="flex items-center space-x-2">
          <Image src='/logo.svg' height={25} width={25} alt="Logo" />
          <span className="text-xl font-bold">Influyst</span>
        </div>
        <div className="bg-indigo-400 text-white rounded-full w-10 h-10 flex justify-center items-center text-lg font-semibold">
          {user?.username.substring(0, 2).toUpperCase()}
        </div>
      </header>

      <main className="py-10">
        <div className="flex items-center mb-6">
          <div className={stepClasses(1)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
          <div className={stepClasses(2)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
          <div className={stepClasses(3)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        {/* Conditional rendering based on currentStep */}
        {currentStep === 1 && (
          <>
          <h1 className="text-3xl font-bold text-center text-black my-4">Upload Profile Pic</h1>

          <UploadHeadshot setProfilePictureUploaded={() => {

            setProfilePictureUploaded(true);
            setCurrentStep(2);
          }} />
          </>
        )}
        {currentStep === 2 && user && (
          <>
    <h1 className="text-3xl font-bold text-center text-black my-4">Add Industries</h1>

    <Industries setStep={() => setCurrentStep(3)} />
  </>
        )}
        {currentStep === 3 && user && (
          <>
    <h1 className="text-3xl font-bold text-center text-black my-4">Add Bio</h1>

          <Bio setStep={() => setCurrentStep(4)} />
          </>
        )}
        {currentStep === 4 && user && (
          <>
            <h1 className="text-3xl font-bold text-center my-4">Add Socials</h1>
            <Socials onAddSocial={(platformName) => console.log(`Adding ${platformName}`)} onSkip={() => console.log('Skipped adding socials')} />
          </>
        )}
      </main>
    </div>
  );
};

export default UserProfile;
