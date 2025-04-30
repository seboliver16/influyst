import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth'; // Firebase Auth for getting the user token

interface SocialsProps {
  onAddSocial: React.Dispatch<React.SetStateAction<string>>;
  onSkip: () => void;
  onContinue: () => void;
}

const Socials: React.FC<SocialsProps> = ({ onAddSocial, onSkip, onContinue }) => {
  const router = useRouter();
  const [userToken, setUserToken] = useState<string | null>(null);

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
    { name: 'Instagram', icon: '/instagram.png', comingSoon: false },
    { name: 'YouTube', icon: '/youtube.png', comingSoon: false },
    { name: 'Twitter', icon: '/x.png', comingSoon: false },
    { name: 'TikTok', icon: '/tiktok.png', comingSoon: true },
    { name: 'Facebook', icon: '/facebook.png', comingSoon: true },
    { name: 'Linkedin', icon: '/linkedin.png', comingSoon: true },
  ];

  // Function to handle YouTube click and trigger OAuth flow
  const handleSocialClick = async (platform: string) => {
    if (platform === 'YouTube' ) {
      console.log("clicked")
      try {
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
        }
      } catch (error) {
        console.error('Error starting YouTube OAuth flow:', error);
      }
    } else {
      onAddSocial(platform);
    }
  };

  const handleSkip = () => {
    onSkip();
    router.push('/dashboard');
  };

  const handleContinue = () => {
    onContinue();
    router.push('/dashboard');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Socials</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {socialPlatforms.map((platform, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg 
            ${platform.comingSoon ? 'opacity-50 cursor-not-allowed' : 'hover:border-indigo-500 focus:border-indigo-500'}`}
          >
            <img src={platform.icon} alt={platform.name} className="w-8 h-8 mb-2" />
            <span className="text-sm">{platform.name}</span>

            {platform.comingSoon && (
              <span className="absolute top-1 right-1 bg-yellow-500 text-white text-xs rounded-full px-2 py-1">
                Coming Soon
              </span>
            )}

            {!platform.comingSoon && (
              <button
                className="absolute inset-0"
                onClick={() => handleSocialClick(platform.name)}
              >
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-10">
        <button className="text-blue-600 hover:text-blue-200" onClick={handleSkip}>
          Skip
        </button>
        <button className="text-indigo-500 hover:text-indigo-600" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Socials;
