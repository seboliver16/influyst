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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
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
      setIsLoading(false);
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

  // Helper to get platform-specific icon
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return (
          <svg className="w-6 h-6 text-pink-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case 'YouTube':
        return (
          <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        );
      case 'Twitter':
        return (
          <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'TikTok':
        return (
          <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
          </svg>
        );
      case 'Facebook':
        return (
          <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.736-.9 10.125-5.864 10.125-11.854z" />
          </svg>
        );
      case 'LinkedIn':
        return (
          <svg className="w-6 h-6 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <button 
          onClick={() => setModalOpen(true)} 
          className="flex items-center mt-3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Example
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {user?.contentExamples?.length || 0} Examples
          </span>
        </div>
      </div>
      
      <ExampleModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddContentExample}
      />

      {isLoading ? (
        <div className="mt-6 flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : !user?.contentExamples?.length ? (
        <div className="mt-6 p-8 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-gray-500 mb-4">No content examples added yet.</p>
          <p className="text-gray-600">Add your best content to showcase your work and attract potential partnerships.</p>
        </div>
      ) : (
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user?.contentExamples?.map((example, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg overflow-hidden border border-gray-200 transition-all hover:border-indigo-200 relative"
              >
                <div className="absolute top-2 right-2 z-40">
                  <button
                    onClick={() => handleDeleteExample(example.url)}
                    className="bg-white bg-opacity-75 backdrop-blur-sm hover:bg-red-50 text-red-500 hover:text-red-600 p-1.5 rounded-full transition-colors border border-gray-200 hover:border-red-200"
                    aria-label="Delete example"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center">
                  <div className="bg-white p-1.5 rounded-full border border-gray-200 mr-2">
                    {getPlatformIcon(example.platform)}
                  </div>
                  <span className="font-medium text-gray-800">
                    {example.platform === 'Twitter' ? 'X (Formerly Twitter)' : example.platform}
                  </span>
                </div>
                
                <div className="content-container">
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
                    <div className="p-6 flex flex-col items-center justify-center">
                      <p className="text-gray-600 mb-3">External content</p>
                      <a 
                        href={example.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-md flex items-center transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                        View Content
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
                  {new URL(example.url.startsWith('@') ? example.url.substring(1) : example.url).hostname.replace('www.', '')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentExamples;
