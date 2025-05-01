'use client';

import React from 'react';
import { Link, Paintbrush, BarChart3, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Create Your Account',
      description: 'Sign up and claim your custom Influyst URL in seconds.',
      icon: <Link className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
      color: 'from-purple-600 to-pink-500'
    },
    {
      number: '02',
      title: 'Connect Your Platforms',
      description: 'Link your social accounts to pull engagement statistics automatically.',
      icon: <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      number: '03',
      title: 'Customize Your Kit',
      description: 'Design your media kit with your branding, content, and stats.',
      icon: <Paintbrush className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
      color: 'from-pink-500 to-purple-600'
    },
    {
      number: '04',
      title: 'Share & Get Partnerships',
      description: 'Share your link with brands and start receiving collaboration offers.',
      icon: <Share2 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
      color: 'from-indigo-600 to-blue-500'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-28 px-4 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500"></div>
      
      {/* Enhanced background elements */}
      <div className="absolute -top-24 -right-24 w-40 sm:w-64 h-40 sm:h-64 rounded-full bg-purple-100 dark:bg-purple-900/30 opacity-40 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-40 sm:w-64 h-40 sm:h-64 rounded-full bg-blue-100 dark:bg-blue-900/30 opacity-40 blur-3xl"></div>
      <div className="absolute top-1/4 left-1/3 w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-pink-100 dark:bg-pink-900/30 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 sm:w-40 h-24 sm:h-40 rounded-full bg-indigo-100 dark:bg-indigo-900/30 opacity-30 blur-3xl"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjZjVmN2ZhIiBmaWxsLW9wYWNpdHk9Ii4wMSIvPjxwYXRoIGQ9Ik0wIDMwaDMwdjMwSDB6IiBmaWxsPSIjZjVmN2ZhIiBmaWxsLW9wYWNpdHk9Ii4wMSIvPjwvZz48L3N2Zz4=')] opacity-[0.03]"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <div className="inline-block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full mb-3 sm:mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 text-transparent bg-clip-text">How it works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white tracking-tight px-2">How Influyst Works</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light px-2">
            From sign-up to successful partnerships in four simple steps
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 max-w-6xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 sm:p-8 transition-all duration-300 h-full flex flex-col items-center text-center hover:shadow-md hover:translate-y-[-4px]">
                {/* Step icon */}
                <div className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 rounded-xl bg-gradient-to-br ${step.color} shadow-md group-hover:scale-105 transition-transform duration-300`}>
                  {step.icon}
                </div>
                
                {/* Step number */}
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-white dark:bg-gray-800 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full shadow-sm border border-gray-100 dark:border-gray-700 font-bold text-base sm:text-lg tracking-tight">
                  <span className={`bg-gradient-to-r ${step.color} text-transparent bg-clip-text`}>{step.number}</span>
                </div>
                
                {/* Step content */}
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800 dark:text-white">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-light">{step.description}</p>
              </div>
              
              {/* Connector line - Only show for larger displays */}
              {index < steps.length - 1 && (
                <>
                  {/* Horizontal connector for desktop */}
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-transparent z-0 -translate-y-1/2">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-[10px] w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400"></div>
                  </div>
                  
                  {/* Vertical connector for tablet (only visible between row 1 and row 2) */}
                  {index === 0 && (
                    <div className="hidden sm:block lg:hidden absolute top-full left-1/2 w-0.5 h-6 bg-gradient-to-b from-gray-200 dark:from-gray-700 to-transparent z-0">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400"></div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}; 