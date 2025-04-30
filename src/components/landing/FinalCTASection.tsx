'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

export const FinalCTASection = () => {
  const [username, setUsername] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/signup?username=${encodeURIComponent(username)}`);
    }
  };

  const features = [
    "Connect all major social platforms",
    "Automatic stat syncing",
    "Custom media kit design",
    "Brand partnership tools",
    "Analytics dashboard"
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-90"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white opacity-20"></div>
      <div className="absolute top-10 left-10 w-24 sm:w-40 h-24 sm:h-40 rounded-full bg-white opacity-5"></div>
      <div className="absolute -bottom-20 -right-20 w-40 sm:w-80 h-40 sm:h-80 rounded-full bg-white opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Content area */}
              <div className="p-6 sm:p-8 md:p-12 lg:col-span-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text leading-tight">Ready to elevate your creator brand?</h2>
                
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                  Join thousands of creators using Influyst to streamline their brand partnerships and maximize their earning potential.
                </p>
                
                <div className="mb-6 sm:mb-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="text-green-500 mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className={`
                    flex flex-1 items-center bg-gray-50 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3
                    ${isInputFocused ? 'ring-2 ring-purple-100' : ''}
                    border border-gray-100 transition-all duration-200
                  `}>
                    <span className="text-purple-600 font-medium text-sm sm:text-base whitespace-nowrap">influyst.com/</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      placeholder="yourname"
                      className="flex-1 ml-1 p-1 text-sm sm:text-base text-gray-800 bg-transparent focus:outline-none"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium text-sm sm:text-base py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    Claim Username
                  </button>
                </form>
              </div>
              
              {/* Image/Gradient area */}
              <div className="lg:col-span-2 bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center relative overflow-hidden py-10 lg:py-0">
                <div className="absolute w-40 sm:w-96 h-40 sm:h-96 rounded-full bg-white opacity-20 -bottom-24 sm:-bottom-48 -right-24 sm:-right-48"></div>
                <div className="absolute w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-white opacity-10 -top-16 sm:-top-32 -left-16 sm:-left-32"></div>
                <div className="relative z-10 p-6 sm:p-8 text-center">
                  <h3 className="text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Launch in Minutes</h3>
                  <p className="text-white text-opacity-90 text-sm sm:text-base mb-6 sm:mb-8">
                    Your professional media kit is just a few clicks away
                  </p>
                  <div className="inline-block rounded-full bg-white bg-opacity-20 px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base text-white font-medium">
                    Join the Influyst Community
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 