"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore/lite";
import firebase_app from "../firebase/config";
import { User } from "../user";
import Image from "next/image";
import { FiMail, FiCopy } from "react-icons/fi"; // Contact icons
import { AiOutlineCloud } from "react-icons/ai"; // Placeholder graphic

const UniqueUrl = () => {
  const pathname = usePathname();
  const username = pathname!.split("/")[1];
  const [userData, setUserData] = useState<User | null>(null);
  const platforms: string[] = ["TikTok", "Instagram", "YouTube"];
  const [selected, setSelected] = useState<string | null>(null); // Track selected platform
  const [emailCopied, setEmailCopied] = useState(false);

  // Fetch user data from Firestore based on username
  useEffect(() => {
    const fetchUserData = async () => {
      if (username) {
        try {
          const db = getFirestore(firebase_app);
          const usersCollection = collection(db, "users");
          const userQuery = query(usersCollection, where("username", "==", username));
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            setUserData(userDoc.data() as User);
          } else {
            console.log("No user found with the provided username");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [username]);

  // Handle email copying
  const copyEmailToClipboard = () => {
    if (userData?.email) {
      navigator.clipboard.writeText(userData.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000); // Reset after 2s
    }
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-indigo-500 font-bold animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto bg-gradient-to-b from-gray-100 to-white text-gray-800">
      {/* Desktop Layout: Two Rows */}
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Circular Image and Bio */}
        <div className="flex flex-col">
          {/* Circular Profile Header */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex items-center space-x-6 mb-8">
            <div className="relative w-32 h-32 md:w-48 md:h-48 bg-white shadow-lg overflow-hidden rounded-full">
              <img
                className="object-cover w-full h-full cursor-pointer rounded-full"
                src={userData.profilePicture || "/default_avatar.png"}
                alt={`${userData.username}'s Profile`}
              />
            </div>

            {/* Username and Handle */}
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{userData.name}</h1>
              <h2 className="text-lg md:text-xl text-gray-500">@{userData.username}</h2>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">About</h3>
            <p className="text-gray-600 mt-4 leading-relaxed">{userData.bio}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {userData.industries.map((industry, index) => (
                <span
                  key={index}
                  className="px-4 py-1 text-xs font-bold uppercase bg-indigo-500 text-white rounded-full shadow-sm"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => window.location.href = `mailto:${userData.email}`}
              className="flex items-center space-x-2 bg-indigo-600 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300"
            >
              <FiMail />
              <span>Send Email</span>
            </button>
            <button
              onClick={copyEmailToClipboard}
              className="flex items-center space-x-2 bg-gray-100 text-gray-700 text-lg font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-200 transition-all duration-300"
            >
              <FiCopy />
              <span>{emailCopied ? "Copied!" : "Copy Email"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Social Media Analytics */}
        <div className="flex flex-col">
          {/* Platform Selection */}
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Select Platform</h3>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {platforms.map((platform) => (
                <button
                  key={platform}
                  onClick={() => setSelected(platform)}
                  className={`px-8 py-3 text-sm font-semibold rounded-full transition-all duration-300 
                    ${selected === platform ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 shadow-md"}`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Display Placeholder if no platform selected */}
          {!selected && (
            <div className="flex flex-col items-center justify-center h-48 bg-white rounded-3xl shadow-lg p-8 mb-8">
              <AiOutlineCloud className="text-indigo-400 text-6xl mb-4" />
              <p className="text-gray-500 text-lg">Select a platform to see analytics</p>
            </div>
          )}

          {/* Display Analytics based on selected platform */}
          {selected && (
            <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{selected} Analytics</h3>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <span className="block text-3xl font-bold text-indigo-500">{"9.2k"}</span>
                  <span className="text-gray-500 text-sm">Followers</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-indigo-500">{"102.8k"}</span>
                  <span className="text-gray-500 text-sm">Views</span>
                </div>
                <div>
                  <span className="block text-3xl font-bold text-indigo-500">{"1.2m"}</span>
                  <span className="text-gray-500 text-sm">Likes</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer with Signup Link */}
      <div className="flex justify-center items-center mb-20 space-x-2 text-gray-700">
        <span>Made with</span>
        <Image src="/logo.png" height={25} width={25} alt="Logo" />
        <span>Influyst</span>
      </div>
    </div>
  );
};

export default UniqueUrl;
