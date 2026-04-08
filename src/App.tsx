import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Layout, 
  Zap, 
  Users, 
  ChevronDown,
  Monitor,
  Smartphone,
  Globe,
  Figma as FigmaIcon,
  Cpu,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ParticleBackground } from './components/ParticleBackground';
import { ProjectCard, ProjectModal } from './components/ProjectComponents';
import { Project } from './types';
import { DETAILED_PROJECTS } from './data/projects';
import { cn } from './lib/utils';



const STACK = [
  { category: 'Front-End', skills: ['React', 'Next.js', 'Vue.js 3', 'TypeScript', 'Astro.js'] },
  { category: 'Estilização', skills: ['Tailwind CSS', 'shadcn/ui', 'Bootstrap', 'Vuetify', 'SASS'] },
  { category: 'Integração', skills: ['REST APIs', 'GraphQL', 'JWT/OAuth', 'Firebase', 'Supabase'] },
  { category: 'Performance', skills: ['Core Web Vitals', 'Lazy Loading', 'Code Splitting', 'SSR/SSG'] },
  { category: 'UX/UI', skills: ['Figma', 'Design Systems', 'Prototipagem', 'Acessibilidade'] }
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  
  const [projects] = useState<Project[]>(DETAILED_PROJECTS);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 8;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen selection:bg-red-bright selection:text-white">
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* 3D Scene — fills the whole section */}
        <ParticleBackground onLoaded={() => setModelLoaded(true)} />

        {/* Loading overlay */}
        {!modelLoaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#c8d8e8]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-navy/20 border-t-navy rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-bold text-navy/60 uppercase tracking-widest">Carregando cena 3D…</p>
            </div>
          </div>
        )}

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

      {/* About & Stats */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-navy mb-8 tracking-tighter">
                ESPECIALISTA EM <br />
                <span className="text-red-bright">ARQUITETURAS MODERNAS</span>
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">
                Com foco em performance, código limpo e experiência do usuário, transformo ideias complexas em interfaces intuitivas e de alto desempenho. Minha jornada em startups me permitiu dominar o ciclo completo de desenvolvimento front-end, desde a prototipagem no Figma até o deploy escalável.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-black text-navy mb-1">6+</div>
                  <div className="text-sm font-bold text-muted uppercase tracking-wider">Anos de Experiência</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-navy mb-1">50+</div>
                  <div className="text-sm font-bold text-muted uppercase tracking-wider">Projetos Entregues</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Monitor className="text-red-bright" />, title: 'Performance', desc: 'Core Web Vitals & Otimização' },
                { icon: <Layout className="text-red-bright" />, title: 'UX/UI', desc: 'Design Systems & Acessibilidade' },
                { icon: <Cpu className="text-red-bright" />, title: 'Arquitetura', desc: 'Código Limpo & Escalável' },
                { icon: <Globe className="text-red-bright" />, title: 'Global', desc: 'Remoto & Internacional' },
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-2xl bg-light border border-navy/5 hover:border-red-bright/20 transition-all group">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="font-bold text-navy mb-1">{item.title}</h3>
                  <p className="text-xs text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
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
      </section>

      {/* Stack Section */}
      <section id="stack" className="py-24 px-6 bg-navy text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-red-bright/5 blur-3xl -z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-black tracking-tighter mb-16 text-center">STACK PRINCIPAL</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {STACK.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <h3 className="text-red-bright font-bold uppercase tracking-widest text-xs mb-6">{item.category}</h3>
                <ul className="space-y-3">
                  {item.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-sm font-medium text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-bright" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
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

      {/* Footer */}
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

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}
