import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ThemeToggle } from '../ui/ThemeToggle';

interface NavbarProps {
  scrolled: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled, isDark, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuLinks = [
    { label: 'Sobre', href: '#about' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Stack', href: '#stack' },
    { label: 'Contato', href: '#contact' }
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-6 py-3 md:py-4",
        scrolled ? "glass-theme py-2 md:py-3" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tighter cursor-pointer dark:text-white text-navy"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ERIK<span className="text-red-bright">.</span>ARAUJO
          </motion.div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest dark:text-white/70 text-navy/70">
            {menuLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-red-bright transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href="/document/CURRICULO - E.ARAÚJO.pdf"
              download="Erik-Araujo-CV.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-6 py-2 bg-red-bright text-white rounded-full text-sm font-bold hover:bg-red-deep transition-colors shadow-lg shadow-red-bright/20"
            >
              <Download size={16} />
              <span className="hidden lg:inline">Download Currículo</span>
              <span className="lg:hidden">CV</span>
            </motion.a>

            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 dark:text-white text-navy hover:text-red-bright transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>


      {/* Mobile Drawer - Slides Bottom to Top */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 dark:bg-navy/95 bg-navy/20 backdrop-blur-md z-[45] md:hidden"
            />
            
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 dark:bg-navy bg-white rounded-t-[32px] p-8 z-[50] md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col items-center border-t dark:border-white/10"
            >
              <div className="w-12 h-1.5 dark:bg-white/10 bg-navy/10 rounded-full mb-10" />
              
              <div className="flex flex-col gap-6 w-full mb-12">
                {menuLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-4xl font-black dark:text-white text-navy text-center tracking-tighter hover:text-red-bright transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              <div className="flex gap-6 mt-auto">
                <a href="https://github.com/PriseTheSun" target="_blank" className="p-4 dark:bg-white/5 bg-light dark:text-white text-navy rounded-2xl hover:bg-red-bright hover:text-white transition-all">
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com/in/deverikaraujo" target="_blank" className="p-4 dark:bg-white/5 bg-light dark:text-white text-navy rounded-2xl hover:bg-red-bright hover:text-white transition-all">
                  <Linkedin size={24} />
                </a>
                <a href="mailto:erik.doctype@gmail.com" className="p-4 dark:bg-white/5 bg-light dark:text-white text-navy rounded-2xl hover:bg-red-bright hover:text-white transition-all">
                  <Mail size={24} />
                </a>
              </div>

              <a
                href="/document/CURRICULO - E.ARAÚJO.pdf"
                download="Erik-Araujo-CV.pdf"
                className="mt-12 w-full py-5 bg-red-bright text-white rounded-2xl text-lg font-black text-center flex items-center justify-center gap-3 shadow-xl shadow-red-bright/20"
              >
                <Download size={24} />
                DOWNLOAD CV
              </a>
            </motion.div>

          </>
        )}
      </AnimatePresence>
    </>
  );
};
