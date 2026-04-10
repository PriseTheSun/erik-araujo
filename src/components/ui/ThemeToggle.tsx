import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className="p-2.5 rounded-full bg-navy/5 dark:bg-white/10 border border-navy/10 dark:border-white/10 text-navy dark:text-white hover:bg-navy/10 dark:hover:bg-white/20 transition-all shadow-sm backdrop-blur-sm"
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-navy" />}
    </motion.button>
  );
};
