import React from 'react';
import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavbarProps {
  scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-6 py-3 md:py-4",
      scrolled ? "glass-dark py-2 md:py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter text-white"
        >
          ERIK<span className="text-red-bright">.</span>ARAUJO
        </motion.div>
        
        <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-white/70">
          <a href="#about" className="hover:text-red-bright transition-colors">Sobre</a>
          <a href="#projects" className="hover:text-red-bright transition-colors">Projetos</a>
          <a href="#stack" className="hover:text-red-bright transition-colors">Stack</a>
          <a href="#contact" className="hover:text-red-bright transition-colors">Contato</a>
        </div>

        <motion.a
          href="/document/CURRICULO - E.ARAÚJO.pdf"
          download="Erik-Araujo-CV.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-2 bg-red-bright text-white rounded-full text-sm font-bold hover:bg-red-deep transition-colors shadow-lg shadow-red-bright/20"
        >
          <Download size={16} />
          Download Currículo
        </motion.a>
      </div>
    </nav>
  );
};
