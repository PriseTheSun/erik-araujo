import React from 'react';
import { Monitor, Layout, Cpu, Globe } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 dark:bg-navy bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 tracking-tighter dark:text-white text-navy">
              ESPECIALISTA EM <br />
              <span className="text-red-bright">ARQUITETURAS MODERNAS</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-8">
              Com foco em performance, código limpo e experiência do usuário, transformo ideias complexas em interfaces intuitivas e de alto desempenho. Minha jornada em startups me permitiu dominar o ciclo completo de desenvolvimento front-end, desde a prototipagem no Figma até o deploy escalável.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-black mb-1 dark:text-white text-navy">6+</div>
                <div className="text-sm font-bold text-muted uppercase tracking-wider">Anos de Experiência</div>
              </div>
              <div>
                <div className="text-4xl font-black mb-1 dark:text-white text-navy">50+</div>
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
              <div key={i} className="p-8 rounded-2xl dark:bg-white/5 bg-light border dark:border-white/10 border-navy/5 hover:border-red-bright/20 transition-all group">
                <div className="mb-4 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="font-bold mb-1 dark:text-white text-navy">{item.title}</h3>
                <p className="text-xs text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

  );
};
