import React, { useState, useEffect } from 'react';
import { Loader } from './components/ui/Loader';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { ProjectsGrid } from './components/sections/ProjectsGrid';
import { Stack } from './components/sections/Stack';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default to dark as per original design

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Initial theme check
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-red-bright selection:text-white transition-colors duration-300">
      <Loader modelLoaded={modelLoaded} />
      
      <Navbar scrolled={scrolled} isDark={isDark} onToggleTheme={toggleTheme} />

      <main>
        <Hero 
          modelLoaded={modelLoaded} 
          onModelLoaded={() => setModelLoaded(true)} 
          isDark={isDark}
        />

        
        <About />
        
        <ProjectsGrid />
        
        <Stack />
        
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
