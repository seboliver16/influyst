'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Instagram, Youtube, CheckCircle, Sparkles } from 'lucide-react';
import { useTheme } from '../../app/context/themeContext';
import Link from 'next/link';

// Custom TikTok icon 
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

// X (formerly Twitter) icon
const XIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const HeroSection = () => {
  const [username, setUsername] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { isDarkMode } = useTheme();
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/signup?username=${encodeURIComponent(username)}`);
    }
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen w-full overflow-hidden bg-white dark:bg-gray-900 flex flex-col items-center justify-center py-10 sm:py-0">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient background base */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"></div>
      
        {/* Animated gradient circles with pulse and motion - covering more of the screen */}
        <motion.div 
          className="absolute -top-[10%] right-[10%] w-[100%] h-[70%] rounded-full bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 filter blur-3xl"
          animate={{ 
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute top-[30%] -left-[10%] w-[90%] h-[60%] rounded-full bg-gradient-to-r from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 filter blur-3xl"
          animate={{ 
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.05, 1],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Additional gradient for center area */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] rounded-full bg-gradient-to-r from-indigo-50/40 to-blue-50/40 dark:from-indigo-900/10 dark:to-blue-900/10 filter blur-3xl"
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.03, 1],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Accent gradient spots - more distributed across the page */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-purple-100/40 dark:bg-purple-800/10 filter blur-2xl"
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-40 h-40 rounded-full bg-blue-100/40 dark:bg-blue-800/10 filter blur-2xl"
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-1/3 right-1/3 w-36 h-36 rounded-full bg-pink-100/30 dark:bg-pink-900/10 filter blur-2xl"
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.15, 1],
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/5 w-28 h-28 rounded-full bg-indigo-100/30 dark:bg-indigo-900/10 filter blur-2xl"
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Floating animated elements - increase count and distribute better */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div 
              key={`circle-${i}`}
              className={`absolute rounded-full border ${
                i % 3 === 0 
                  ? 'bg-gradient-to-r from-purple-200/5 to-blue-200/5 border-purple-200/20 dark:from-purple-500/5 dark:to-blue-500/5 dark:border-purple-500/10' 
                  : i % 3 === 1
                    ? 'bg-gradient-to-r from-blue-200/5 to-indigo-200/5 border-blue-200/20 dark:from-blue-500/5 dark:to-indigo-500/5 dark:border-blue-500/10'
                    : 'bg-gradient-to-r from-indigo-200/5 to-pink-200/5 border-indigo-200/20 dark:from-indigo-500/5 dark:to-pink-500/5 dark:border-indigo-500/10'
              }`}
              initial={{ 
                x: `${(i % 3) * 33 + Math.random() * 20}%`, 
                y: `${Math.floor(i / 3) * 33 + Math.random() * 20}%`,
                width: `${30 + Math.random() * 100}px`,
                height: `${30 + Math.random() * 100}px`,
                opacity: 0.2 + Math.random() * 0.4,
                rotate: Math.random() * 360
              }}
              animate={{ 
                x: `${(i % 3) * 33 + Math.random() * 20}%`, 
                y: `${Math.floor(i / 3) * 33 + Math.random() * 20}%`,
                rotate: [null, Math.random() * 360],
                scale: [1, 1 + Math.random() * 0.2, 1],
                opacity: [null, 0.2 + Math.random() * 0.4, 0.2]
              }}
              transition={{ 
                duration: 15 + Math.random() * 20, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
        </div>
        
        {/* Subtle moving light dots - reduce count to improve performance */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`dot-${i}`}
              className="absolute h-1 w-1 rounded-full bg-white/80 dark:bg-purple-500/30 shadow-[0_0_8px_3px_rgba(255,255,255,0.3)] dark:shadow-[0_0_8px_3px_rgba(168,85,247,0.15)]"
              style={{
                left: `${(i % 4) * 25 + 10}%`,
                top: `${Math.floor(i / 4) * 33 + 10}%`,
                opacity: 0.6,
                animation: `pulse ${5 + i}s infinite alternate ease-in-out ${i * 0.5}s`
              }}
            />
          ))}
        </div>
        
        {/* Grid overlay with reduced opacity for subtle effect */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjZjVmN2ZhIiBmaWxsLW9wYWNpdHk9Ii4wMSIvPjxwYXRoIGQ9Ik0wIDMwaDMwdjMwSDB6IiBmaWxsPSIjZjVmN2ZhIiBmaWxsLW9wYWNpdHk9Ii4wMSIvPjwvZz48L3N2Zz4=')] opacity-[0.02] dark:opacity-[0.03]"></div>
      </div>
      
      {/* Gradient border at top - make it more prominent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500/30 via-blue-500/50 to-purple-500/30 dark:from-purple-500/50 dark:via-blue-500/70 dark:to-purple-500/50"></div>
      
      <div className="container px-4 mx-auto z-10">
        <div className="max-w-screen-lg mx-auto">
          {/* Hero content */}
          <div className="flex flex-col items-center text-center mb-8 sm:mb-16">
            {/* Floating badge */}
            <div 
              className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full px-3 sm:px-4 py-1.5 shadow-md mb-6 sm:mb-8 max-w-[90%] sm:max-w-full"
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-500 dark:text-purple-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium truncate">The best way to showcase your value as a creator</span>
            </div>

            {/* Main heading */}
            <h1 
              className="text-4xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-4 sm:mb-6"
            >
              Your Live <span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400 inline-block"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "gradient-shift 8s ease-in-out infinite"
                }}
              >Media Kit</span>
            </h1>
            
            <p
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-xl font-light leading-relaxed mb-6 sm:mb-8 px-2"
            >
              All your stats, one link. Streamline partnerships.
            </p>
            
            {/* Features list */}
            <div
              className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
            >
              {['Real-time stats', 'Custom branding', 'One shareable URL'].map((feature, index) => (
                <div 
                  key={feature} 
                  className="flex items-center space-x-1.5 sm:space-x-2 bg-gray-50 dark:bg-gray-800 rounded-full px-3 sm:px-4 py-1.5 sm:py-2"
                >
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 dark:text-green-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-left">{feature}</span>
                </div>
              ))}
            </div>

            {/* Username claim form */}
            <div
              className="w-full max-w-xl mx-auto px-2 sm:px-0"
            >
              <div className={`
                relative 
                ${isInputFocused ? 'ring-4 ring-purple-100 dark:ring-purple-900/30' : 'hover:ring-4 hover:ring-gray-50 dark:hover:ring-gray-800'} 
                bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden
                transition-all duration-300
              `}>
                <form onSubmit={handleSubmit} className="flex w-full items-center">
                  <div className="flex flex-1 items-center pl-3 sm:pl-5 pr-2 py-3 sm:py-4 max-w-[60%] sm:max-w-[70%]">
                    <span className="text-purple-600 dark:text-purple-400 font-medium text-sm sm:text-base whitespace-nowrap">influyst.com/</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      placeholder="username"
                      aria-label="Enter your preferred username"
                      required
                      style={{ caretColor: 'rgb(147, 51, 234)', caretShape: 'block' }}
                      className="w-full pl-1 py-1 text-gray-800 dark:text-white focus:outline-none bg-transparent text-sm sm:text-base placeholder:text-gray-400 dark:placeholder:text-gray-500 caret-purple-600 dark:caret-purple-400"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="relative bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base transition-all duration-300 whitespace-nowrap ml-auto mr-1.5 sm:mr-2"
                  >
                    <span className="relative z-10 block sm:hidden">Claim</span>
                    <span className="relative z-10 hidden sm:block">Claim Username</span>
                    
                    {/* Animation on hover */}
                    <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-white dark:bg-gray-200 opacity-20 blur-lg rounded-xl"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl"></div>
                    </div>
                  </button>
                </form>
              </div>
              
              {/* Login link */}
              <div className="mt-4 text-center">
                <Link href="/login" className="inline-flex items-center text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Already have an account? <span className="ml-1 font-medium">Log In</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Platform badges section */}
          <div
            className="mt-12 sm:mt-16 md:mt-24 text-center"
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6 sm:mb-8 font-light">TRUSTED BY CREATORS ON</p>
            <div className="flex justify-center gap-6 sm:gap-10 md:gap-14 items-center">
              {[
                { icon: <Instagram className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 dark:text-gray-500" />, name: "Instagram" },
                { icon: <Youtube className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 dark:text-gray-500" />, name: "YouTube" },
                { icon: <XIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 dark:text-gray-500" />, name: "X (formerly Twitter)" },
                { icon: <TikTokIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 dark:text-gray-500" />, name: "TikTok" }
              ].map((platform, i) => (
                <div 
                  key={`${platform.name}-${i}`}
                  className="flex flex-col items-center group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="transform transition-all duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200">
                    {platform.icon}
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-2 sm:mt-3 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          100% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}; 