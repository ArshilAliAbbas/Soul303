
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define theme color configurations
export const themeColors = {
  mindspace: {
    name: "Mindspace",
    bg: "bg-mindspace-500",
    ring: "ring-mindspace-500",
  },
  neuro: {
    name: "Neuro",
    bg: "bg-neuro-500",
    ring: "ring-neuro-500",
  },
  soul: {
    name: "Soul",
    bg: "bg-soul-500",
    ring: "ring-soul-500",
  },
  purple: {
    name: "Purple",
    bg: "bg-purple-500",
    ring: "ring-purple-500",
  },
  blue: {
    name: "Blue",
    bg: "bg-blue-500",
    ring: "ring-blue-500",
  },
  pink: {
    name: "Pink",
    bg: "bg-pink-500",
    ring: "ring-pink-500",
  }
};

// Define theme context type
type ThemeContextType = {
  theme: string; 
  mode: 'light' | 'dark';
  setTheme: (theme: string) => void;
  toggleMode: () => void;
};

// Create theme context
const ThemeContext = createContext<ThemeContextType>({
  theme: 'mindspace',
  mode: 'light',
  setTheme: () => {},
  toggleMode: () => {},
});

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<string>('mindspace');
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  
  // Initialize theme and mode from localStorage or system preference
  useEffect(() => {
    // Get theme from localStorage or use default
    const savedTheme = localStorage.getItem('theme') || 'mindspace';
    setThemeState(savedTheme);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Check for dark mode preference
    const savedMode = localStorage.getItem('mode');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode) {
      setMode(savedMode as 'light' | 'dark');
      document.documentElement.classList.toggle('dark', savedMode === 'dark');
    } else {
      setMode(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    }
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('mode')) {
        const newMode = e.matches ? 'dark' : 'light';
        setMode(newMode);
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Set theme and save to localStorage
  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  
  // Toggle between light and dark mode
  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('mode', newMode);
    document.documentElement.classList.toggle('dark', newMode === 'dark');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);
