// UserProfile.tsx
"use client";
// UserProfile.tsx
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebase_app from '../firebase/config';
import UploadHeadshot from './uploadImg/uploadImage'; // Adjust the path as necessary

import { User, SocialMedia } from '../user';
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Link,
  Icon,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lottie from 'lottie-react';
// import animationData from './socialMediaAnimations.json';

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          setUser(userDocSnapshot.data() as User);
        } else {
          console.error('User document does not exist');
        }
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, [auth, db]);

  const renderSocialMediaIcon = (socialMedia: SocialMedia) => {
    let icon;
   
    return (
      <Link href={socialMedia.url} isExternal>
        <IconButton
          aria-label={`${socialMedia.platform} link`}
          icon={icon}
          variant="ghost"
          colorScheme="blue"
          fontSize="2xl"
          _hover={{ transform: 'scale(1.1)' }}
          transition="transform 0.2s"
        />
      </Link>
    );
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={bgColor}
      color={textColor}
    >
      {user ? (
  user.profilePicture ? (
    <div>
      {/* If a profile picture exists, display it */}
      <img src={user.profilePicture} alt="Profile" />
    </div>
  ) : (
    // If no profile picture exists, render the UploadHeadshot component to allow uploading one
    <div />
  )
) : (
  <Text fontSize="xl">Loading...</Text>
)}

    </Flex>
  );
};

export default UserProfile;