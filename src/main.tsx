
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize dark mode based on previous preference or system setting
const initDarkMode = () => {
  const savedMode = localStorage.getItem('mode');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedMode === 'dark' || (!savedMode && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
};

// Initialize theme
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'mindspace';
  document.documentElement.setAttribute('data-theme', savedTheme);
};

// Initialize app settings
initDarkMode();
initTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
