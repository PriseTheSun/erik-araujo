import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Github, ExternalLink, Figma, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Project } from '../types';
import { cn } from '../lib/utils';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  isSelected: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, isSelected }) => {
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300",
        isSelected ? "z-50" : "z-0 hover:z-10"
      )}
      style={{ zIndex: isSelected ? 50 : undefined }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-navy mb-2">{project.title}</h3>
        <p className="text-muted text-sm line-clamp-2">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold bg-light text-muted rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!project) return null;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % project.images.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + project.images.length) % project.images.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-navy/95 backdrop-blur-md"
      />
      
      <div
        className="relative w-full max-w-5xl bg-light rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col max-h-[90vh] z-10"
      >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-navy/50 text-white hover:bg-red-bright transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row h-full overflow-y-auto">
              {/* Carousel Section */}
              <div className="w-full md:w-3/5 bg-black relative aspect-video md:aspect-auto flex items-center justify-center">
                <img
                  src={project.images[currentSlide]}
                  className="h-full w-full object-contain cursor-pointer"
                  onClick={() => setIsFullScreen(true)}
                  referrerPolicy="no-referrer"
                />

                <button
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                  className="absolute left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className="absolute right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>

                <button
                  onClick={() => setIsFullScreen(true)}
                  className="absolute bottom-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <Maximize2 size={18} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        idx === currentSlide ? "bg-red-bright w-4" : "bg-white/50"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col">
                <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">{project.title}</h2>
                <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold bg-navy/5 text-muted rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-navy/80 text-sm md:text-base leading-relaxed mb-6 md:mb-8 flex-grow">
                  {project.longDescription}
                </p>

                <div className="grid grid-cols-1 gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white rounded-xl font-bold hover:bg-navy/90 transition-colors"
                  >
                    <Github size={18} /> GitHub
                  </a>
                  <a
                    href={project.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-muted text-white rounded-xl font-bold hover:bg-muted/90 transition-colors"
                  >
                    <Figma size={18} /> Figma
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-red-bright text-white rounded-xl font-bold hover:bg-red-deep transition-colors"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>
                </div>
              </div>
        </div>
      </div>

      {/* Full Screen Image Overlay */}
      {isFullScreen && (
        <div
          className="fixed inset-0 z-[60] bg-black flex items-center justify-center p-4"
          onClick={() => setIsFullScreen(false)}
        >
          <button
            onClick={() => setIsFullScreen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X size={24} />
          </button>
          <img
            src={project.images[currentSlide]}
            alt={project.title}
            className="max-w-full max-h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
};
