import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  modelLoaded: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ modelLoaded }) => {
  return (
    <AnimatePresence>
      {!modelLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy"
        >
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-bright/20 border-t-red-bright rounded-full animate-spin mx-auto mb-6" />
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-2xl font-black tracking-tighter text-white uppercase"
            >
              ERIK<span className="text-red-bright">.</span>ARAUJO
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
