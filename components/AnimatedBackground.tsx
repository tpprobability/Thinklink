
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-white dark:bg-zinc-950 transition-colors duration-1000">
      {/* Reduced complexity blurs for performance */}
      <motion.div 
        animate={{
          x: [-50, 50, -50],
          y: [-20, 30, -20],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 left-0 w-[60%] h-[60%] bg-blue-400/10 blur-[80px] rounded-full dark:bg-indigo-900/10 will-change-transform"
      />
      <motion.div 
        animate={{
          x: [50, -50, 50],
          y: [30, -20, 30],
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-purple-400/10 blur-[80px] rounded-full dark:bg-purple-900/10 will-change-transform"
      />
      
      {/* Noise layer for cinematic texture */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Subtle vignettes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
};

export default AnimatedBackground;
