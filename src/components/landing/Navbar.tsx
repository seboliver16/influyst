'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-medium tracking-tight text-purple-600 transition-colors">
            Influyst
          </span>
        </Link>

        {/* Desktop Navigation - Empty middle section */}
        <div className="hidden md:flex items-center">
          {/* Intentionally left empty */}
        </div>

        {/* Desktop Action Button with Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-gray-600 hover:text-purple-600 font-light text-sm tracking-wide transition-colors">
            Features
          </Link>
          <Link href="#about" className="text-gray-600 hover:text-purple-600 font-light text-sm tracking-wide transition-colors">
            About
          </Link>
          <Link 
            href="/signup" 
            className="bg-white text-gray-700 hover:text-purple-600 border border-gray-200 hover:border-purple-200 font-light text-sm tracking-wide px-5 py-2 rounded-xl transition-all duration-300"
          >
            Join
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-gray-700 hover:text-purple-600 focus:outline-none transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div 
          className="md:hidden bg-white border-t border-gray-100 shadow-lg"
        >
          <div className="container mx-auto px-6 py-6 flex flex-col space-y-6">
            <Link 
              href="#features" 
              className="text-gray-600 hover:text-purple-600 font-light tracking-wide" 
              onClick={toggleMenu}
            >
              Features
            </Link>
            <Link 
              href="#about" 
              className="text-gray-600 hover:text-purple-600 font-light tracking-wide" 
              onClick={toggleMenu}
            >
              About
            </Link>
            <div className="pt-4 border-t border-gray-100">
              <Link 
                href="/signup" 
                className="block text-center bg-white text-gray-700 hover:text-purple-600 border border-gray-200 hover:border-purple-200 font-light text-sm tracking-wide px-5 py-2 rounded-xl transition-all duration-300" 
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