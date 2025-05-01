'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show the floating CTA when user scrolls past a certain threshold
      if (scrollY > 600) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/signup?username=${encodeURIComponent(username)}`);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-3 sm:bottom-6 left-0 right-0 w-full flex justify-center items-center z-40 px-3 sm:px-4"
        >
          <div 
            className={`
              max-w-sm sm:max-w-md w-full
              ${isInputFocused ? 'ring-2 sm:ring-4 ring-purple-100 dark:ring-purple-900/30' : 'hover:ring-2 hover:ring-gray-200/70 dark:hover:ring-gray-700/70'} 
              bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl 
              border border-gray-200 dark:border-gray-700
              transition-all duration-200
            `}
          >
            <form onSubmit={handleSubmit} className="flex items-center w-full">
              <div className="flex flex-1 items-center pl-3 sm:pl-5 pr-1.5 sm:pr-2 py-2.5 sm:py-3.5 max-w-[60%] sm:max-w-[70%]">
                <span className="text-purple-600 dark:text-purple-400 font-medium text-xs sm:text-sm whitespace-nowrap">influyst.com/</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="username"
                  aria-label="Enter your preferred username"
                  required
                  className="w-full pl-1 py-1.5 text-gray-800 dark:text-white focus:outline-none bg-transparent text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
              <button 
                type="submit"
                className="relative group bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 text-xs sm:text-sm whitespace-nowrap ml-auto mr-1.5 sm:mr-2"
              >
                <span className="relative z-10">Claim Username</span>
                {/* Animation on hover */}
                <div className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-white dark:bg-gray-200 opacity-20 blur-lg rounded-lg sm:rounded-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg sm:rounded-xl"></div>
                </div>
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 