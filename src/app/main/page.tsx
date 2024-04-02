// UserProfile.tsx
"use client";
// UserProfile.tsx
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebase_app from '../firebase/config';
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
    // switch (socialMedia.platform) {
    //   case 'instagram':
    //     icon = (
    //       <Lottie
    //         animationData={animationData.instagram}
    //         loop={true}
    //         style={{ width: 50, height: 50 }}
    //       />
    //     );
    //     break;
    //   case 'tiktok':
    //     icon = (
    //       <Lottie
    //         animationData={animationData.tiktok}
    //         loop={true}
    //         style={{ width: 50, height: 50 }}
    //       />
    //     );
    //     break;
    //   case 'youtube':
    //     icon = (
    //       <Lottie
    //         animationData={animationData.youtube}
    //         loop={true}
    //         style={{ width: 50, height: 50 }}
    //       />
    //     );
    //     break;
    //   default:
    //     break;
    // }

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
        <motion.div style={{ scale, perspective: 500 }}>
          <Box
            maxW="md"
            borderWidth={1}
            borderRadius={8}
            p={6}
            bgColor="rgba(255, 255, 255, 0.2)"
            backdropFilter="blur(10px)"
            boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          >
            <Flex justify="center" mb={4}>
              <Avatar
                size="2xl"
                src={user.profilePicture}
                
                _hover={{ transform: 'scale(1.1)' }}
                transition="transform 0.2s"
                style={{
                  backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 75%)`,
                  backdropFilter: 'blur(5px)',
                }}
              />
            </Flex>
            <Heading as="h2" size="xl" textAlign="center" mb={2}>
              {user.username}
            </Heading>
            <Text fontSize="lg" textAlign="center" mb={4}>
              Joined {user.dateJoined.toDate().toLocaleDateString()}
            </Text>
            <Text fontSize="md" mb={2}>
              Email: {user.email}
            </Text>
            <Flex justify="center" mb={4}>
              {user.socialMedia?.length ? (
                user.socialMedia.map((socialMedia, index) => (
                  <Box key={index} mr={2}>
                    {renderSocialMediaIcon(socialMedia)}
                  </Box>
                ))
              ) : (
                <Text fontSize="md">No social media accounts linked</Text>
              )}
            </Flex>
          </Box>
        </motion.div>
      ) : (
        <Text fontSize="xl">Loading...</Text>
      )}
    </Flex>
  );
};

export default UserProfile;