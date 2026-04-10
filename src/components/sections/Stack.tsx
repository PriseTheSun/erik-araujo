import React from 'react';
import { motion } from 'motion/react';

const STACK = [
  { category: 'Front-End', skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Astro.js'] },
  { category: 'Estilização', skills: ['Tailwind CSS', 'Bootstrap', 'Vuetify', 'SASS/SCSS', 'Framer Motion'] },
  { category: 'Integração', skills: ['REST APIs', 'Supabase', 'PostgreSQL', 'PHP', 'Node.js'] },
  { category: 'IA & Autom.', skills: ['Google Sheets API', 'Google Search Console'] },
  { category: 'UX/UI', skills: ['Figma', 'Prototipagem', 'Design Systems', 'Acessibilidade'] }
];

export const Stack: React.FC = () => {
  return (
    <section id="stack" className="py-24 px-6 dark:bg-navy dark:text-white bg-white text-navy overflow-hidden relative transition-colors duration-300">
      <div className="absolute top-0 right-0 w-1/2 h-full dark:bg-red-bright/5 bg-red-bright/2 blur-3xl -z-0" />
      
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
              className="p-6 rounded-2xl dark:bg-white/5 bg-navy/5 border dark:border-white/10 border-navy/10 backdrop-blur-sm"
            >
              <h3 className="text-red-bright font-bold uppercase tracking-widest text-xs mb-6">{item.category}</h3>
              <ul className="space-y-3">
                {item.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-sm font-medium dark:text-white/80 text-navy/80">
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

  );
};
