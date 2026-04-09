import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 bg-light border-t border-navy/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-xl font-black tracking-tighter text-navy">
          ERIK<span className="text-red-bright">.</span>ARAUJO
        </div>
        
        <div className="text-sm font-medium text-muted">
          © {new Date().getFullYear()} Erik Araújo. Built with React & Three.js.
        </div>

        <div className="flex gap-6">
          <a href="https://github.com/PriseTheSun" target="_blank" className="text-navy hover:text-red-bright transition-colors">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/deverikaraujo" target="_blank" className="text-navy hover:text-red-bright transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};
