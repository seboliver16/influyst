import React, { useEffect, useState } from 'react';
import { ContentExample, User } from '../user';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase_app from '../firebase/config';
import InstagramEmbed from './imbed/instagram/InstagramEmbed';
import ExampleModal from './exampleModal';
import LinkedInEmbed from './imbed/linkedin/LinkedInEmbed';
import YouTubeEmbed from './imbed/youtube/YouTubeEmbed';
import TwitterEmbed from './imbed/twitter/TwitterEmbed';
import TikTokEmbed from './imbed/tiktok/TikTokEmbed';
import FacebookEmbed from './imbed/facebook/FacebookEmbed';

const firestore = getFirestore(firebase_app);
const auth = getAuth(firebase_app);

const ContentExamples: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(firestore, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        } else {
          console.log("No user data available");
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const handleAddContentExample = async (example: ContentExample) => {
    if (!user) return;

    const newUser = {
      ...user,
      contentExamples: [...(user.contentExamples || []), example]
    };

    const userDocRef = doc(firestore, "users", user.id);
    await updateDoc(userDocRef, newUser);

    setUser(newUser); // Update local state
  };

  const handleDeleteExample = async (url: string) => {
    if (!user) return;

    const updatedExamples = user.contentExamples.filter(e => e.url !== url);
    const newUser = {
      ...user,
      contentExamples: updatedExamples
    };

    const userDocRef = doc(firestore, "users", user.id);
    await updateDoc(userDocRef, newUser);

    setUser(newUser); // Update local state
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
        Add Example
      </button>
      
      <ExampleModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddContentExample}
      />

      <div className="mt-4 grid grid-cols-1 md:flex md:overflow-x-scroll no-scrollbar">
        {user?.contentExamples?.map((example, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4 relative mb-4 md:mb-0 md:mr-4 flex-shrink-0" style={{ minWidth: "300px" }}>
            <button
              onClick={() => handleDeleteExample(example.url)}
              className="absolute top-2 right-2 font-bold text-red-500 hover:text-red-700 z-20 bg-white w-8 h-8 rounded-md flex items-center justify-center"
            >
              X
            </button>

            {example.platform === 'Instagram' ? (
              <InstagramEmbed url={example.url} />
            ) : example.platform === 'LinkedIn' ? (
              <LinkedInEmbed url={example.url} />
            ) : example.platform === 'YouTube' ? (
              <YouTubeEmbed url={example.url} />
            ) : example.platform === 'Twitter' ? (
              <TwitterEmbed url={example.url} />
            ) : example.platform === 'TikTok' ? (
              <TikTokEmbed url={example.url} />
            ) : example.platform === 'Facebook' ? (
              <FacebookEmbed url={example.url} />
            ) : (
              <a href={example.url} target="_blank" rel="noopener noreferrer" className="block mt-2 underline text-blue-600 hover:text-blue-800">
                View Content
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentExamples;
