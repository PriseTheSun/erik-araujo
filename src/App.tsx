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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-red-bright selection:text-white bg-navy">
      <Loader modelLoaded={modelLoaded} />
      
      <Navbar scrolled={scrolled} />

      <main>
        <Hero 
          modelLoaded={modelLoaded} 
          onModelLoaded={() => setModelLoaded(true)} 
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
