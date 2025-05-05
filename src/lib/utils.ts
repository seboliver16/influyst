import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getButtonContrastColor(buttonStyle: string, theme: string) {
  if (['filled', 'gradient', 'shadow', 'glow'].includes(buttonStyle)) {
    return '#FFFFFF'; // White text on dark backgrounds
  } else if (['subtle', 'glassmorphic'].includes(buttonStyle)) {
    return theme === 'dark' ? '#E5E7EB' : '#1F2937'; // Higher contrast for these semi-transparent styles
  } else {
    return 'var(--accent-color)'; // Use accent color for outline and other styles
  }
}

export function getPrimaryButtonClasses(buttonStyle: string) {
  switch (buttonStyle) {
    case 'outline':
      return 'bg-transparent border-2 border-accent hover:bg-accent/10';
    case 'subtle':
      return 'bg-accent/10 hover:bg-accent/20';
    case 'gradient':
      return 'bg-gradient-to-r from-accent to-secondary text-white shadow-sm';
    case 'glassmorphic':
      return 'bg-accent/20 backdrop-blur-lg border border-accent/20 hover:bg-accent/30';
    case 'shadow':
      return 'bg-accent text-white shadow-lg shadow-accent/30 hover:shadow-accent/50';
    case 'glow':
      return 'bg-accent text-white shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)] hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.7)]';  
    default: // filled
      return 'bg-accent text-white hover:bg-accent/90';
  }
}

export function getSecondaryButtonClasses(buttonStyle: string) {
  switch (buttonStyle) {
    case 'outline':
      return 'bg-transparent border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800';
    case 'subtle':
      return 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700';
    case 'gradient':
      return 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200';
    case 'glassmorphic':
      return 'bg-white/10 dark:bg-black/20 backdrop-blur-lg border border-white/20 dark:border-gray-700/30';
    case 'shadow':
      return 'bg-white dark:bg-gray-800 shadow-md hover:shadow-lg';
    case 'glow':
      return 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-[0_0_10px_rgba(255,255,255,0.3)] dark:shadow-[0_0_10px_rgba(0,0,0,0.3)]';
    default: // filled
      return 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700';
  }
} 