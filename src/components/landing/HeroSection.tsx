'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Instagram, Twitter, Youtube, CheckCircle, Sparkles } from 'lucide-react';

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

export const HeroSection = () => {
  const [username, setUsername] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/signup?username=${encodeURIComponent(username)}`);
    }
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen w-full overflow-hidden bg-white flex flex-col items-center justify-center py-10 sm:py-0">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient circles - adjusted for better mobile appearance */}
        <div className="absolute -top-[30%] -right-[20%] w-[90%] sm:w-[60%] h-[60%] rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 filter blur-3xl opacity-60"></div>
        <div className="absolute -bottom-[30%] -left-[20%] w-[90%] sm:w-[60%] h-[60%] rounded-full bg-gradient-to-r from-purple-50 to-pink-50 filter blur-3xl opacity-60"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div 
              key={`circle-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-purple-200/10 to-blue-200/10 border border-white/20"
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                width: `${60 + Math.random() * 140}px`,
                height: `${60 + Math.random() * 140}px`,
              }}
              animate={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%` 
              }}
              transition={{ 
                duration: 15 + Math.random() * 15, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjZjVmN2ZhIiBmaWxsLW9wYWNpdHk9Ii4wMSIvPjxwYXRoIGQ9Ik0wIDMwaDMwdjMwSDB6IiBmaWxsPSIjZjVmN2ZhIiBmaWxsLW9wYWNpdHk9Ii4wMSIvPjwvZz48L3N2Zz4=')] opacity-[0.015]"></div>
      </div>
      
      <div className="container px-4 mx-auto z-10">
        <div className="max-w-screen-lg mx-auto">
          {/* Hero content */}
          <div className="flex flex-col items-center text-center mb-8 sm:mb-16">
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center space-x-2 bg-white border border-gray-100 rounded-full px-3 sm:px-4 py-1.5 shadow-md mb-6 sm:mb-8 max-w-[90%] sm:max-w-full"
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-600 font-medium truncate">The simplest way to showcase your creator stats</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-4 sm:mb-6"
            >
              Your Live <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Media Kit</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-xl font-light leading-relaxed mb-6 sm:mb-8 px-2"
            >
              All your stats, one link. Streamline partnerships.
            </motion.p>
            
            {/* Features list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
            >
              {['Real-time stats', 'Custom branding', 'One shareable URL'].map((feature, index) => (
                <div key={feature} className="flex items-center space-x-1.5 sm:space-x-2 bg-gray-50 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                  <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* Username claim form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-full max-w-xl mx-auto px-2 sm:px-0"
            >
              <div className={`
                relative 
                ${isInputFocused ? 'ring-4 ring-purple-100' : 'hover:ring-4 hover:ring-gray-50'} 
                bg-white rounded-2xl shadow-lg overflow-hidden
                transition-all duration-300
              `}>
                <form onSubmit={handleSubmit} className="flex w-full items-center">
                  <div className="flex flex-1 items-center pl-3 sm:pl-5 pr-2 py-3 sm:py-4">
                    <span className="text-purple-600 font-medium text-sm sm:text-base whitespace-nowrap">influyst.com/</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      placeholder="yourname"
                      aria-label="Enter your preferred username"
                      required
                      className="flex-1 pl-1 py-1 text-gray-800 focus:outline-none bg-transparent text-sm sm:text-base placeholder:text-gray-400"
                    />
                  </div>
                  <div className="p-1.5 sm:p-2">
                    <button 
                      type="submit"
                      className="relative group bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base transition-all duration-500"
                    >
                      <span className="relative z-10">Claim Username</span>
                      {/* Animation on hover */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-white opacity-20 blur-lg rounded-xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl"></div>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
          
          {/* Platform badges section with animated appearance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 sm:mt-16 md:mt-24 text-center"
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 mb-6 sm:mb-8 font-light">TRUSTED BY CREATORS ON</p>
            <div className="flex justify-center gap-6 sm:gap-10 md:gap-14 items-center">
              {[
                { icon: <Instagram className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />, name: "Instagram" },
                { icon: <Youtube className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />, name: "YouTube" },
                { icon: <Twitter className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />, name: "Twitter" },
                { icon: <TikTokIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />, name: "TikTok" }
              ].map((platform, i) => (
                <motion.div 
                  key={`${platform.name}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + (i * 0.1) }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="transform transition-all duration-300 group-hover:scale-110 group-hover:text-gray-800">
                    {platform.icon}
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-400 mt-2 sm:mt-3 group-hover:text-gray-600 transition-colors duration-300">{platform.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 