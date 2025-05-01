'use client';

import React from 'react';
import { ThemeProvider } from './context/themeContext';
import { CustomCursor } from '../components/ui/CustomCursor';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <CustomCursor />
      {children}
    </ThemeProvider>
  );
} 