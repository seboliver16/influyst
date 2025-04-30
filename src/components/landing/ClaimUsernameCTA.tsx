'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export const ClaimUsernameCTA = () => {
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
    <div className={`
      flex justify-center px-2 sm:px-0 mx-auto mt-6 sm:mt-8
      ${isInputFocused ? 'scale-[1.02]' : ''} 
      transition-transform duration-200
    `}>
      <form 
        onSubmit={handleSubmit}
        className={`
          flex items-center w-full max-w-xs sm:max-w-md 
          bg-white rounded-xl sm:rounded-full shadow-md border border-gray-100
          ${isInputFocused ? 'ring-2 ring-purple-100' : ''}
          overflow-hidden transition-all duration-200
        `}
      >
        <div className="flex flex-1 items-center pl-3 sm:pl-4 pr-1 sm:pr-2 py-2.5">
          <span className="text-purple-600 font-medium text-xs sm:text-sm whitespace-nowrap">influyst.com/</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="yourname"
            aria-label="Enter your preferred username"
            required
            className="flex-1 pl-1 py-1 text-gray-800 focus:outline-none bg-transparent text-xs sm:text-sm placeholder:text-gray-400"
          />
        </div>
        <div className="p-1 sm:p-1.5 pr-1.5 sm:pr-2">
          <button
            type="submit" 
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-5 rounded-lg sm:rounded-full transition-all duration-300"
          >
            Claim Username
          </button>
        </div>
      </form>
    </div>
  );
} 