'use client';

import React from 'react';
import { User, Gem, Globe } from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: <User className="h-6 w-6 text-purple-500 dark:text-purple-400" />,
      title: "Creator-Centric",
      description: "Built by creators, for creators. We understand the unique challenges of content monetization."
    },
    {
      icon: <Gem className="h-6 w-6 text-blue-500 dark:text-blue-400" />,
      title: "Premium Experience",
      description: "Delivering a high-quality platform that helps creators present themselves professionally."
    },
    {
      icon: <Globe className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />,
      title: "Global Community",
      description: "Connecting creators with brands across the world to maximize partnership opportunities."
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight text-gray-900 dark:text-white">About Influyst</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed">
            We&apos;re on a mission to help creators maximize their value and streamline the brand partnership process. Our platform provides the tools you need to showcase your work professionally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="bg-gray-50 dark:bg-gray-700 h-12 w-12 rounded-lg flex items-center justify-center mb-6">
                {value.icon}
              </div>
              <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 font-light">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-light text-sm tracking-wide uppercase">TRUSTED BY CREATORS WORLDWIDE</p>
          <p className="mt-4 text-3xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400 inline-block text-transparent bg-clip-text">
            Join our growing community today
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 