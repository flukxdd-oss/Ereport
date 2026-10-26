import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

import Cover from './sections/Cover';
import TOC from './sections/TOC';
import Abstract from './sections/Abstract';
import Committee from './sections/Committee';
import Schedule from './sections/Schedule';
import ContentSessions from './sections/ContentSessions';
import Downloads from './sections/Downloads';
import GalleryVideo from './sections/GalleryVideo';
import StudentRegistration from './sections/StudentRegistration';
import Evaluation from './sections/Evaluation';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  return (
    <div className="bg-slate-50 text-slate-800 dark:bg-tech-dark dark:text-slate-100 min-h-screen flex flex-col font-sans transition-colors duration-200">
      
      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content Area */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
        <Cover />
        <TOC />
        <Abstract />
        <Committee />
        <Schedule />
        <ContentSessions />
        <Downloads onShowToast={showToast} />
        <GalleryVideo />
        <StudentRegistration onShowToast={showToast} />
        <Evaluation onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
