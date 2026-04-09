import React from 'react';
import { Mail, Linkedin } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy mb-6 md:mb-8 tracking-tighter">VAMOS CONSTRUIR ALGO <span className="text-red-bright">INCRÍVEL?</span></h2>
        <p className="text-lg md:text-xl text-muted mb-8 md:mb-12">Disponível para projetos remotos, presenciais ou oportunidades internacionais.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="mailto:erik.doctype@gmail.com" 
            className="flex items-center justify-center gap-3 px-8 py-4 bg-red-bright text-white rounded-2xl font-bold hover:bg-red-deep transition-all shadow-xl shadow-red-bright/20"
          >
            <Mail size={20} /> erik.doctype@gmail.com
          </a>
          <a 
            href="https://linkedin.com/in/deverikaraujo" 
            target="_blank"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-navy text-white rounded-2xl font-bold hover:bg-navy/90 transition-all"
          >
            <Linkedin size={20} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};
