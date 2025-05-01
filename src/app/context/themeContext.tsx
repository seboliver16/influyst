'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type CursorType = 'default' | 'pulse' | 'ring' | 'dot' | 'gradient';
const VALID_CURSOR_TYPES: CursorType[] = ['default', 'pulse', 'ring', 'dot', 'gradient'];

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
};

const defaultContextData: ThemeContextType = {
  isDarkMode: false,
  toggleTheme: () => {},
  cursorType: 'pulse',
  setCursorType: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContextData);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with null to avoid hydration mismatch
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const [cursorType, setCursorType] = useState<CursorType>('pulse');
  const [mounted, setMounted] = useState(false);
  
  // Get saved cursor type or default to pulse
  const getSavedCursorType = (): CursorType => {
    if (typeof window === 'undefined') return 'pulse';
    
    try {
      const savedCursor = localStorage.getItem('cursorType') as CursorType;
      return VALID_CURSOR_TYPES.includes(savedCursor) ? savedCursor : 'pulse';
    } catch (e) {
      return 'pulse';
    }
  };
  
  // Handle initial load and prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    try {
      const isDark = localStorage.getItem('darkMode') === 'true' || 
        ((!localStorage.getItem('darkMode')) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      setIsDarkMode(isDark);
      
      // Apply theme to document
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Apply saved cursor type
      const savedCursor = getSavedCursorType();
      setCursorType(savedCursor);
    } catch (err) {
      console.error('Error initializing theme:', err);
      // Use defaults if there's an error
      setIsDarkMode(false);
      setCursorType('pulse');
    }
  }, []);

  // Update theme in localStorage and document when isDarkMode changes
  useEffect(() => {
    if (isDarkMode === null || !mounted) return;
    
    try {
      localStorage.setItem('darkMode', String(isDarkMode));
      
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (err) {
      console.error('Error updating theme mode:', err);
    }
  }, [isDarkMode, mounted]);

  // Update cursor type in localStorage
  useEffect(() => {
    if (!mounted) return;
    
    try {
      localStorage.setItem('cursorType', cursorType);
      
      // Also update body cursor style immediately when switching to/from default
      if (cursorType === 'default') {
        document.body.style.cursor = 'auto';
      } else if (document.body.style.cursor !== 'none') {
        document.body.style.cursor = 'none';
      }
    } catch (err) {
      console.error('Error saving cursor type:', err);
    }
  }, [cursorType, mounted]);

  const toggleTheme = () => {
    setIsDarkMode(prev => prev === null ? false : !prev);
  };

  const changeCursorType = (type: CursorType) => {
    if (!VALID_CURSOR_TYPES.includes(type)) {
      console.warn(`Invalid cursor type: ${type}. Using 'pulse' instead.`);
      setCursorType('pulse');
    } else {
      setCursorType(type);
    }
  };

  // Provide actual values only after hydration to avoid mismatch
  return (
    <ThemeContext.Provider 
      value={{ 
        isDarkMode: isDarkMode === null ? false : isDarkMode, 
        toggleTheme, 
        cursorType, 
        setCursorType: changeCursorType 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}; 