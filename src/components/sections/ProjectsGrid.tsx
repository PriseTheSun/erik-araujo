import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectCard, ProjectModal } from '../ProjectComponents';
import { Project } from '../../types';
import { DETAILED_PROJECTS } from '../../data/projects';
import { cn } from '../../lib/utils';

export const ProjectsGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 8;
  const projects = DETAILED_PROJECTS;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="projects" className="py-24 px-6 bg-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-black text-navy tracking-tighter mb-4">PROJETOS SELECIONADOS</h2>
            <p className="text-muted max-w-xl">Uma vitrine de soluções técnicas focadas em resultados de negócio e experiência excepcional.</p>
          </div>
          <div className="hidden md:block">
            <span className="text-sm font-bold text-muted uppercase tracking-widest">Scroll to explore</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => setSelectedProject(project)} 
              isSelected={selectedProject?.id === project.id}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center flex-wrap items-center mt-16 gap-2">
            <button 
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-full font-bold transition-colors bg-white text-navy border border-navy/10 hover:bg-navy/5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={cn(
                  "w-10 h-10 rounded-full font-bold transition-all duration-300",
                  currentPage === i + 1 
                    ? "bg-red-bright text-white shadow-lg shadow-red-bright/30 scale-110" 
                    : "bg-white text-navy border border-navy/10 hover:bg-navy/5"
                )}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-full font-bold transition-colors bg-white text-navy border border-navy/10 hover:bg-navy/5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};
