import React, { useState } from "react";
import { Boxes } from "./background-boxes";
import Navbar from "./navbar";
import { Spotlight } from "./Spotlight";
import Link from "next/link";
import Benefits from "./benefits";
import Preview from "./preview";
import firebase_app from "../app/firebase/config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  updateDoc,
  collection,
  increment,
  arrayUnion,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);
const HeroSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setSubmitError('');

    try {
      // Set the document in 'waitlist' collection with email as the doc ID
      await setDoc(doc(db, 'waitlist', email), {
        email: email,
      });
      setSubmitted(true);
      setEmail(''); // Optional: Clear the input after submission
    } catch (error) {
      setSubmitError('An error occurred while submitting your email. Please try again.');
      console.error("Error adding document: ", error);
    }
  };

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <div className="h-screen relative w-full overflow-hidden bg-white flex flex-col items-center justify-center rounded-lg">
        <Navbar className="top-8" />
        <div className="absolute inset-0 w-full h-full bg-white z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes className="" />
        <div className="mt-20 z-20 flex flex-col justify-center items-center text-center">
          <h1 className="md:text-7xl text-6xl text-gray-900 relative z-20 font-medium pb-4">
            Monetize your social media
          </h1>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
            <h1 className="md:text-7xl text-6xl text-gray-900 relative z-20 font-medium">
              presence in
            </h1>
            <span className="md:text-7xl text-6xl text-brand-purple relative z-20 font-extrabold">
              seconds.
            </span>
          </div>
          <p className="max-w mt-8 mb-4 text-2xl text-center mt-6 text-gray-400 relative z-20">
            Influyst easily unlocks the full value and reach of creators
          </p>
{/* <button className="z-20 py-4 px-8 bg-brand-purple border-6 border-brand-purple-border text-white rounded-full shadow-md hover:shadow-inner font-regular hover:bg-brand-purple-hover hover:border-brand-purple-hover-border transition ease-in-out mt-8">
              <Link href="/signup">Create Your Influencer Resume</Link>
            </button> */}

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex items-center border-6 border-brand-purple-border mr-2 ml-2 rounded-full shadow-md transition ease-in-out mt-8 bg-white">
              <input 
                type="email" 
                value={email}
                onChange={handleChange}
                placeholder="Enter your email to join" 
                className="flex-grow py-4 px-8 rounded-l-full text-brand-purple border-0 placeholder-brand-purple/70 focus:outline-none"
                required
              />
              <button 
                type="submit" 
                className="z-20 py-4 px-8 bg-brand-purple text-xs sm:text-sm md:text-base lg:text-base text-white rounded-r-full font-regular hover:bg-brand-purple-hover transition ease-in-out"
              >
                Join the Waitlist
              </button>
            </form>
          ) : (
  <div className="mt-4 bg-brand-purple text-white text-lg font-semibold py-2 px-4 rounded-lg shadow-lg animate-bounce">
    Thank you for joining the waitlist!
  </div>
)}
          {submitError && (
            <div className="text-red-500 text-sm mt-2">
              {submitError}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-around px-6 mt-8">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <Benefits />
        </div>
        <div className="w-full md:w-1/3">
          <Preview />
        </div>
      </div>
    </>
  );
};

export default HeroSection;