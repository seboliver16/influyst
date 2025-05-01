'use client';

import React from 'react';
import { BarChart, Palette, Link as LinkIcon, Star, BadgeCheck, Zap } from 'lucide-react';

interface FeatureHighlightProps {
  title: string;
  description: string;
  features?: string[];
  imageUrl?: string;
  reverseLayout?: boolean;
  iconName?: 'BarChart' | 'Palette' | 'LinkIcon';
  accentColor?: string;
  id?: string;
}

// Map icon names to components
const icons = {
  BarChart,
  Palette,
  LinkIcon
};

// Feature visualization components
const FeatureVisualizations = {
  BarChart: () => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl opacity-70"></div>
      <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 tracking-tight">Platform Metrics</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light mt-1">Audience engagement</p>
          </div>
          <div className="h-8 w-8 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <BadgeCheck className="text-purple-500 dark:text-purple-400 h-5 w-5" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400 font-light">Instagram</span>
              <span className="font-medium text-gray-700 dark:text-gray-300">234K</span>
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400 font-light">TikTok</span>
              <span className="font-medium text-gray-700 dark:text-gray-300">512K</span>
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-11/12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400 font-light">YouTube</span>
              <span className="font-medium text-gray-700 dark:text-gray-300">92K</span>
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-light">Last updated: <span className="text-gray-700 dark:text-gray-300">2 minutes ago</span></span>
            <div className="text-xs px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">Live data</div>
          </div>
        </div>
      </div>
    </div>
  ),
  
  Palette: () => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl opacity-70"></div>
      <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 tracking-tight">Design Options</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light mt-1">Your brand, your style</p>
          </div>
          <div className="h-8 w-8 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
            <Star className="text-yellow-500 dark:text-yellow-400 h-5 w-5" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col space-y-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-light">Color Theme</span>
            <div className="grid grid-cols-4 gap-2">
              <div className="h-6 w-6 rounded-full bg-purple-500 ring-2 ring-white dark:ring-gray-800"></div>
              <div className="h-6 w-6 rounded-full bg-blue-500 ring-2 ring-white dark:ring-gray-800"></div>
              <div className="h-6 w-6 rounded-full bg-pink-500 ring-2 ring-white dark:ring-gray-800"></div>
              <div className="h-6 w-6 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-gray-800"></div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-light">Layout</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <div className="w-8 h-4 rounded bg-blue-200 dark:bg-blue-700"></div>
              </div>
              <div className="h-12 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                <div className="w-8 h-4 rounded bg-purple-200 dark:bg-purple-700"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl bg-gray-50 dark:bg-gray-700/50 p-4 mt-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">Preview</span>
            <div className="flex space-x-2">
              <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </div>
          <div className="h-14 rounded-lg bg-white dark:bg-gray-800 flex items-center p-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 mr-2"></div>
            <div className="flex flex-col">
              <div className="h-2 w-16 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
              <div className="h-2 w-24 bg-gray-200 dark:bg-gray-600 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  
  LinkIcon: () => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl opacity-70"></div>
      <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 tracking-tight">Brand Collaborations</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light mt-1">Connect & collaborate</p>
          </div>
          <div className="h-8 w-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
            <Zap className="text-indigo-500 dark:text-indigo-400 h-5 w-5" />
          </div>
        </div>
        
        <div className="space-y-4 mt-4">
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
              <span className="font-medium text-blue-600 dark:text-blue-400">B</span>
            </div>
            <div className="ml-3 flex-1">
              <h5 className="font-medium text-sm text-gray-800 dark:text-gray-200">Nike</h5>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-light">New partnership opportunity</p>
            </div>
            <div className="ml-auto flex-shrink-0">
              <span className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs py-1 px-2 rounded-full font-medium">$5,000</span>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0">
              <span className="font-medium text-purple-600 dark:text-purple-400">S</span>
            </div>
            <div className="ml-3 flex-1">
              <h5 className="font-medium text-sm text-gray-800 dark:text-gray-200">Spotify</h5>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-light">Viewed your media kit</p>
            </div>
            <div className="ml-auto flex-shrink-0">
              <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs py-1 px-2 rounded-full font-medium">Interested</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-light">Recent matches</span>
          <span className="text-xs px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">12 new</span>
        </div>
      </div>
    </div>
  )
};

export const FeatureHighlightSection = ({ 
  title, 
  description, 
  features = [],
  imageUrl, 
  reverseLayout, 
  iconName, 
  accentColor = "bg-purple-100",
  id
}: FeatureHighlightProps) => {
  const layoutClasses = reverseLayout ? 'lg:flex-row-reverse' : 'lg:flex-row';
  const FeatureVisual = iconName ? FeatureVisualizations[iconName] : null;

  return (
    <section 
      id={id}
      className="py-24 overflow-hidden relative bg-white dark:bg-gray-900"
    >
      {/* Subtle background gradient elements */}
      <div className={`absolute w-1/3 h-1/3 ${reverseLayout ? 'left-0' : 'right-0'} top-24 bg-purple-50 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-40 -z-10`}></div>
      
      <div className={`container mx-auto px-6 flex flex-col ${layoutClasses} items-center gap-16`}>
        <div className="lg:w-1/2 text-left max-w-xl mx-auto lg:mx-0">
          <div className="mb-6">
            {/* Feature eyebrow text */}
            <span className="text-sm font-light tracking-widest text-purple-600 dark:text-purple-400 uppercase mb-2 block">
              {iconName === 'BarChart' ? 'Analytics' : 
               iconName === 'Palette' ? 'Design' : 'Partnerships'}
            </span>
            
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-6 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 text-transparent bg-clip-text leading-tight">
              {title}
            </h2>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-light leading-relaxed">
            {description}
          </p>
          
          {features.length > 0 && (
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-5 w-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-600 dark:text-gray-300 font-light">{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="lg:w-1/2 w-full max-w-md mx-auto">
          {FeatureVisual && <FeatureVisual />}
        </div>
      </div>
      
      {/* Subtle decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-100 dark:via-purple-800/30 to-transparent"></div>
    </section>
  );
}; 