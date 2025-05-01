'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, MousePointer, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../app/context/themeContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCursorMenu, setShowCursorMenu] = useState(false);
  const { isDarkMode, toggleTheme, cursorType, setCursorType } = useTheme();

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCursorMenu = () => {
    setShowCursorMenu(!showCursorMenu);
  };

  const handleCursorChange = (type: 'default' | 'pulse' | 'ring' | 'dot' | 'gradient') => {
    setCursorType(type);
    setShowCursorMenu(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-medium tracking-tight text-purple-600 dark:text-purple-400 transition-colors">
            Influyst
          </span>
        </Link>

        {/* Desktop Navigation - Empty middle section */}
        <div className="hidden md:flex items-center">
          {/* Intentionally left empty */}
        </div>

        {/* Desktop Action Button with Navigation Links */}
        <div className="hidden md:flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
          <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-light text-sm tracking-wide transition-colors">
            Features
          </Link>
          <Link href="#about" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-light text-sm tracking-wide transition-colors">
            About
          </Link>
          
          {/* Mouse cursor toggle */}
          <div className="relative">
            <button 
              onClick={toggleCursorMenu}
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-light text-sm tracking-wide transition-colors flex items-center space-x-1 group"
              aria-label="Change cursor style"
            >
              <MousePointer size={16} className="text-purple-500 dark:text-purple-400 group-hover:animate-pulse" />
              <span className="hidden lg:inline">Cursor</span>
            </button>
            
            <AnimatePresence>
              {showCursorMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute right-0 mt-2 py-2 w-36 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  {[
                    { type: 'default', label: 'Default' },
                    { type: 'pulse', label: 'Pulse' },
                    { type: 'ring', label: 'Ring' },
                    { type: 'dot', label: 'Dot' },
                    { type: 'gradient', label: 'Sparkle' }
                  ].map((item) => (
                    <button
                      key={item.type}
                      onClick={() => handleCursorChange(item.type as any)}
                      className={`w-full text-left px-4 py-1.5 text-xs flex items-center space-x-2 transition-colors ${
                        cursorType === item.type 
                          ? `${isDarkMode ? 'bg-gray-700 text-purple-300' : 'bg-purple-50 text-purple-600'}`
                          : `hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cursorType === item.type ? 'bg-purple-500' : 'bg-gray-400'}`}></span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-light text-sm tracking-wide transition-colors flex items-center space-x-1"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun size={16} className="text-yellow-400" />
            ) : (
              <Moon size={16} className="text-purple-500" />
            )}
          </button>
          
          <Link 
            href="/signup" 
            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-700 font-light text-sm tracking-wide px-5 py-2 rounded-xl transition-all duration-300"
          >
            Join
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          {/* Theme toggle for mobile */}
          <button
            onClick={toggleTheme}
            className="p-1 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-purple-500" />
            )}
          </button>
          
          <button 
            onClick={toggleMenu} 
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div 
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg"
        >
          <div className="container mx-auto px-6 py-6 flex flex-col space-y-6">
            <Link 
              href="#features" 
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-light tracking-wide" 
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link 
              href="#about" 
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-light tracking-wide" 
              onClick={toggleMenu}
            >
              About
            </Link>
            
            {/* Cursor selection dropdown for mobile */}
            <div className="space-y-2">
              <div className="text-gray-600 dark:text-gray-300 font-light tracking-wide flex items-center">
                <MousePointer size={16} className="mr-2 text-purple-500 dark:text-purple-400" />
                <span>Cursor Style</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { type: 'default', label: 'Default' },
                  { type: 'pulse', label: 'Pulse' },
                  { type: 'ring', label: 'Ring' },
                  { type: 'dot', label: 'Dot' },
                  { type: 'gradient', label: 'Sparkle' }
                ].map((item) => (
                  <button
                    key={item.type}
                    onClick={() => {
                      handleCursorChange(item.type as any);
                      toggleMenu();
                    }}
                    className={`text-xs py-1.5 px-2 rounded-md ${
                      cursorType === item.type 
                        ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 font-medium' 
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <Link 
                href="/signup" 
                className="block text-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-700 font-light text-sm tracking-wide px-5 py-2 rounded-xl transition-all duration-300" 
                onClick={toggleMenu}
              >
                Join
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}; 