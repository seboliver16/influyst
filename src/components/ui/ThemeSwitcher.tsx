'use client';

import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../app/context/themeContext';
import { Moon, Sun, MousePointer, Circle, Target, Sparkles, ChevronDown } from 'lucide-react';

// Memoize button components for better performance
const CursorOption = memo(({ 
  cursor, 
  isActive, 
  isDarkMode, 
  index, 
  onClick 
}: { 
  cursor: { type: string; icon: React.ReactNode; label: string }; 
  isActive: boolean; 
  isDarkMode: boolean; 
  index: number; 
  onClick: () => void;
}) => (
  <motion.button
    key={cursor.type}
    initial={{ x: -10, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: index * 0.05, duration: 0.2 }}
    onClick={onClick}
    whileHover={{ x: 3 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center text-xs p-1.5 rounded-md ${
      isActive 
        ? isDarkMode 
          ? 'bg-purple-500/20 text-purple-300' 
          : 'bg-purple-100 text-purple-700'
        : 'hover:bg-opacity-10 hover:bg-gray-500'
    }`}
  >
    <motion.span 
      className={`mr-2 ${
        isActive
          ? isDarkMode ? 'text-purple-300' : 'text-purple-600'
          : ''
      }`}
      animate={
        isActive 
          ? { scale: [1, 1.2, 1], rotate: [0, 5, 0] } 
          : { scale: 1, rotate: 0 }
      }
      transition={{ 
        duration: 1.5, 
        repeat: isActive ? Infinity : 0,
        repeatType: "reverse"
      }}
    >
      {cursor.icon}
    </motion.span>
    {cursor.label}
  </motion.button>
));

CursorOption.displayName = 'CursorOption';

export const ThemeSwitcher = () => {
  const { isDarkMode, toggleTheme, cursorType, setCursorType } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showCursorOptions, setShowCursorOptions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowCursorOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const handleToggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
    setShowCursorOptions(false);
  }, []);

  const handleToggleCursorOptions = useCallback(() => {
    setShowCursorOptions(prev => !prev);
  }, []);

  const handleSetCursorType = useCallback((type: 'default' | 'pulse' | 'ring' | 'dot' | 'gradient') => {
    setCursorType(type);
    setShowCursorOptions(false);
  }, [setCursorType]);

  // Define cursor options outside render for stability
  const cursorOptions = [
    { type: 'default', icon: <MousePointer size={14} />, label: 'Default' },
    { type: 'pulse', icon: <Target size={14} />, label: 'Pulse' },
    { type: 'ring', icon: <Circle size={14} />, label: 'Ring' },
    { type: 'dot', icon: <Circle className="fill-current" size={14} />, label: 'Dot' },
    { type: 'gradient', icon: <Sparkles size={14} />, label: 'Sparkle' },
  ];

  return (
    <div className="fixed top-4 right-4 z-[1000]">
      <motion.button 
        ref={buttonRef}
        onClick={handleToggleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`relative p-2 rounded-full flex items-center justify-center shadow-lg 
          ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} 
          transition-all duration-300`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDarkMode ? (
            <Moon size={20} className="text-purple-300" />
          ) : (
            <Sun size={20} className="text-purple-600" />
          )}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 500, damping: 30 }}
            className={`absolute right-0 mt-2 p-2 rounded-xl shadow-xl backdrop-blur-md ${
              isDarkMode ? 'bg-gray-800/90 text-white' : 'bg-white/90 text-gray-800'
            } min-w-[200px] z-[1000]`}
          >
            <div className="flex flex-col space-y-2">
              {/* Theme toggle */}
              <motion.button 
                onClick={toggleTheme}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-between p-2 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isDarkMode ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="mr-2"
                  >
                    {isDarkMode ? (
                      <Sun size={18} className="text-yellow-300" />
                    ) : (
                      <Moon size={18} className="text-indigo-500" />
                    )}
                  </motion.div>
                  <span className="text-sm">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </div>
                <motion.div 
                  className={`w-10 h-5 rounded-full p-1 transition-colors duration-300 ${
                    isDarkMode ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <motion.div 
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{ x: isDarkMode ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.div>
              </motion.button>

              {/* Cursor options toggler */}
              <motion.button 
                onClick={handleToggleCursorOptions}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-between p-2 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: showCursorOptions ? 10 : 0
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="mr-2"
                  >
                    <MousePointer size={18} className="text-purple-500" />
                  </motion.div>
                  <span className="text-sm">Custom Cursor</span>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-300 ${
                    showCursorOptions ? 'rotate-180' : ''
                  }`} 
                />
              </motion.button>

              {/* Cursor options */}
              <AnimatePresence>
                {showCursorOptions && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`flex flex-col space-y-0.5 ml-4 pl-2 border-l-2 ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      {cursorOptions.map((cursor, index) => (
                        <CursorOption
                          key={cursor.type}
                          cursor={cursor}
                          isActive={cursorType === cursor.type}
                          isDarkMode={isDarkMode}
                          index={index}
                          onClick={() => handleSetCursorType(cursor.type as any)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Footer text */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-1"
              >
                <p className="text-[10px] text-center text-gray-500 dark:text-gray-400">
                  Created with <span className="inline-block animate-pulse">❤️</span> by Influyst
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 