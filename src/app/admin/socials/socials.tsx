import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth'; // Firebase Auth for getting the user token
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, AlertCircle, Loader2, ExternalLink, ChevronRight } from 'lucide-react';

interface SocialsProps {
  onAddSocial: React.Dispatch<React.SetStateAction<string>>;
  onSkip: () => void;
  onContinue: () => void;
}

const Socials: React.FC<SocialsProps> = ({ onAddSocial, onSkip, onContinue }) => {
  const router = useRouter();
  const [userToken, setUserToken] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch the current user's Firebase token when the component mounts
  useEffect(() => {
    const fetchToken = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken(); // Get the Firebase Auth token
        setUserToken(token);
      }
    };
    fetchToken();
  }, []);

  const socialPlatforms = [
    { 
      name: 'Instagram', 
      icon: '/instagram.png', 
      comingSoon: false,
      bgColor: 'from-pink-500 to-purple-600',
      benefits: 'Shows follower count, engagement rate, and audience demographics'
    },
    { 
      name: 'YouTube', 
      icon: '/youtube.png', 
      comingSoon: false,
      bgColor: 'from-red-500 to-red-600',
      benefits: 'Displays subscribers, total views, and video engagement'
    },
    { 
      name: 'Twitter', 
      icon: '/x.png', 
      comingSoon: false,
      bgColor: 'from-gray-700 to-gray-900',
      benefits: 'Shows followers, tweet engagement, and reach metrics'
    },
    { 
      name: 'TikTok', 
      icon: '/tiktok.png', 
      comingSoon: true,
      bgColor: 'from-black to-gray-800',
      benefits: 'Will show followers, likes, and video view counts'
    },
    { 
      name: 'Facebook', 
      icon: '/facebook.png', 
      comingSoon: true,
      bgColor: 'from-blue-600 to-blue-700',
      benefits: 'Coming soon - page likes, reach, and audience insights'
    },
    { 
      name: 'Linkedin', 
      icon: '/linkedin.png', 
      comingSoon: true,
      bgColor: 'from-blue-600 to-blue-800',
      benefits: 'Coming soon - followers, post engagement, and profile views'
    },
  ];

  // Function to handle connection flow
  const handleSocialClick = async (platform: string) => {
    if (platform === 'YouTube' && !connected.includes('YouTube')) {
      try {
        setConnecting('YouTube');
        setError(null);
        
        // Send POST request to backend to start OAuth flow
        const response = await fetch('/api/auth/youtube', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`, // Pass the user's Firebase token in the Authorization header
          },
        });

        const data = await response.json();
        if (data.url) {
          // Redirect the user to the YouTube OAuth URL
          window.location.href = data.url;
        } else {
          setError('Failed to initiate YouTube connection. Please try again.');
        }
      } catch (error) {
        console.error('Error starting YouTube OAuth flow:', error);
        setError('Connection error. Please try again later.');
      } finally {
        setConnecting(null);
      }
    } else if (platform === 'Instagram' && !connected.includes('Instagram')) {
      try {
        setConnecting('Instagram');
        setError(null);
        
        // Mock successful connection for demonstration
        setTimeout(() => {
          setConnected([...connected, 'Instagram']);
          setConnecting(null);
          onAddSocial('Instagram');
        }, 2000);
      } catch (error) {
        setError('Connection error. Please try again later.');
        setConnecting(null);
      }
    } else if (platform === 'Twitter' && !connected.includes('Twitter')) {
      try {
        setConnecting('Twitter');
        setError(null);
        
        // Mock successful connection for demonstration
        setTimeout(() => {
          setConnected([...connected, 'Twitter']);
          setConnecting(null);
          onAddSocial('Twitter');
        }, 2000);
      } catch (error) {
        setError('Connection error. Please try again later.');
        setConnecting(null);
      }
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  const handleContinue = () => {
    onContinue();
  };

  return (
    <div className="space-y-8">
      {/* Social platforms grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {socialPlatforms.map((platform, index) => (
          <motion.div
            key={index}
            whileHover={!platform.comingSoon ? { y: -5, scale: 1.02 } : {}}
            className={`
              relative overflow-hidden 
              ${connected.includes(platform.name) 
                ? 'border-green-500 dark:border-green-500 bg-green-50 dark:bg-green-900/20' 
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'} 
              border-2 rounded-xl shadow-sm transition-all duration-300
              ${platform.comingSoon ? 'opacity-70' : 'hover:shadow-md'}
            `}
          >
            {/* Platform header section */}
            <div className={`bg-gradient-to-r ${platform.bgColor} p-4 flex justify-between items-center`}>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-white rounded-full p-1.5 flex items-center justify-center">
                  <img 
                    src={platform.icon} 
                    alt={platform.name} 
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-white font-medium">{platform.name}</span>
              </div>
              
              {connected.includes(platform.name) && (
                <div className="bg-white dark:bg-gray-900 rounded-full h-6 w-6 flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
              )}
              
              {platform.comingSoon && (
                <span className="bg-gray-800/60 text-white text-xs rounded-full px-2 py-1">
                  Coming Soon
                </span>
              )}
            </div>
            
            {/* Platform benefits */}
            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {platform.benefits}
              </p>
              
              {/* Connection state */}
              {connected.includes(platform.name) ? (
                <div className="flex items-center justify-between">
                  <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center">
                    <Check className="h-4 w-4 mr-1.5" />
                    Connected
                  </span>
                  <button 
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              ) : connecting === platform.name ? (
                <button 
                  className="w-full flex items-center justify-center py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-wait"
                  disabled
                >
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </button>
              ) : (
                <button
                  onClick={() => !platform.comingSoon && handleSocialClick(platform.name)}
                  disabled={platform.comingSoon}
                  className={`
                    w-full flex items-center justify-between py-2 px-4 rounded-lg font-medium text-sm
                    ${platform.comingSoon 
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white'}
                    transition-all duration-300
                  `}
                >
                  <span>Connect {platform.name}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-400 rounded-lg p-3 flex items-start"
          >
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Help text and benefits */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Why connect your social accounts?</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Automatically updates metrics without manual entry</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Shows verified stats that build trust with brands</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Makes you more discoverable to brands searching by metrics</span>
          </li>
        </ul>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={handleSkip}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium transition-colors"
        >
          Skip for now
        </button>
        
        <button 
          onClick={handleContinue}
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium px-6 py-2 rounded-lg flex items-center transition-all duration-300"
        >
          {connected.length > 0 ? 'Continue to Dashboard' : 'Skip & Continue'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Socials;
