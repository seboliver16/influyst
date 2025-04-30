import React, { useState, useEffect } from "react";
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
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);
const HeroSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setSubmitError('');

    try {
      await setDoc(doc(db, 'waitlist', email), {
        email: email,
      });
      setSubmitted(true);
      setEmail('');
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
        <Navbar className="absolute top-8 left-8 right-8 bg-opacity-80 rounded-full backdrop-blur-lg" />
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
          <Boxes className="opacity-10 animate-pulse" />
        </div>
        <motion.div
          className="z-30 mt-20 flex flex-col justify-center items-center text-center space-y-6 px-4 md:px-0"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-black text-gray-900 leading-tight drop-shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Monetize Your Social Media
          </motion.h1>
          <motion.h1
            className="text-5xl md:text-7xl font-black text-brand-purple leading-tight drop-shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Typewriter
              options={{
                strings: ["Channels", "Partnerships", "Audience", "Influence"],
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: 50,
              }}
            />
          </motion.h1>
          <motion.p
            className="max-w-lg mt-4 text-sm md:text-ld text-gray-600 font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          >
            Influyst integrates seamlessly with your social platforms to create media kits and provide central in-depth analytics—easily & references, and unlocks the full potential of your social presence.
          </motion.p>
          
         
          <motion.button
            className="py-4 px-8 mt-8 bg-indigo-400 text-white text-lg font-semibold hover:bg-indigo-600 transition ease-in-out duration-200 rounded-full w-full max-w-xs"
            whileHover={{ scale: 1.05 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
      <motion.div
        className="flex flex-col md:flex-row md:justify-around items-start px-8 mt-16 space-y-8 md:space-y-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="w-full md:w-1/3 mb-4 md:mb-0"
          whileHover={{ scale: 1.02 }}
        >
          <Benefits />
        </motion.div>
        <motion.div
          className="w-full md:w-1/3"
          whileHover={{ scale: 1.02 }}
        >
          <Preview />
        </motion.div>
      </motion.div>
      <footer className="w-full py-8 bg-white-900 text-gray text-center mt-16">
        <p className="text-sm">&copy; 2024 Influyst. All rights reserved.</p>
      </footer>
    </>
  );
};

export default HeroSection;