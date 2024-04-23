import React from 'react';

interface SocialsProps {
  onAddSocial: React.Dispatch<React.SetStateAction<string>>;
  onSkip: ()=>void,
}

const Socials: React.FC<SocialsProps> = ({ onAddSocial, onSkip }) => {
  const socialPlatforms = [
    { name: 'Instagram', icon: '/instagram.png' },
    { name: 'YouTube', icon: '/youtube.png' },
    { name: 'Twitter', icon: '/x.png' },
    { name: 'TikTok', icon: '/tiktok.png' },
    { name: 'Facebook', icon: '/facebook.png' },
    { name: 'Twitch', icon: '/twitch.png' }
  ];

    

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4"></h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {socialPlatforms.map((platform, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg hover:border-indigo-500 focus:border-indigo-500"
            onClick={() => onAddSocial(platform.name)}
          >
            <img src={platform.icon} alt={platform.name} className="w-8 h-8 mb-2" />
            <span className="text-sm">{platform.name}</span>
          </button>
        ))}
      </div>
      
      <div className="flex justify-between pt-10">
  <button
    className="text-white-600 hover:text-grey-200"
    onClick={onSkip}
  >
    Skip
  </button>
  <button
  className="text-indigo-500 hover:text-indigo-600"
  onClick={onSkip}
>
  Continue
</button>
</div>

    </div>
  );
};

export default Socials;
