import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, ChevronDown } from 'lucide-react';
import { ParticleBackground } from '../ParticleBackground';

interface HeroProps {
  modelLoaded: boolean;
  onModelLoaded: () => void;
}

export const Hero: React.FC<HeroProps> = ({ modelLoaded, onModelLoaded }) => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* 3D Scene — fills the whole section */}
      <ParticleBackground onLoaded={onModelLoaded} />

      {/* Left gradient overlay for text legibility */}
      <div
        className="absolute inset-y-0 left-0 z-10 w-full md:w-[65%] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(18,22,36,0.95) 0%, rgba(18,22,36,0.8) 40%, rgba(18,22,36,0.3) 80%, transparent 100%)'
        }}
      />

      {/* Hero content — aligned with logo */}
      <div className="relative z-10 flex items-center min-h-screen px-4 md:px-6 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: modelLoaded ? 1 : 0, x: modelLoaded ? 0 : -30 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="max-w-lg"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-red-bright/20 text-red-bright text-xs font-bold uppercase tracking-widest mb-6 border border-red-bright/30 backdrop-blur-sm">
              Disponível para novas oportunidades
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
              CRIANDO{' '}
              <span className="text-gradient">EXPERIÊNCIAS</span>{' '}
              DIGITAIS
            </h1>

            <p className="text-base md:text-lg text-white/75 mb-8 leading-relaxed">
              Desenvolvedor Front-End com 6+ anos construindo produtos digitais escaláveis em startups de tecnologia.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                whileHover={{ y: -2 }}
                className="px-8 py-4 bg-white text-navy rounded-xl font-bold hover:bg-light transition-all shadow-xl"
              >
                Ver Projetos
              </motion.a>
              <div className="flex gap-2">
                <a href="https://github.com/PriseTheSun" target="_blank" className="p-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm">
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com/in/deverikaraujo" target="_blank" className="p-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};
