'use client';

import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function Card({ children, className = "", hover = true, glow = false }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={`
        glass rounded-xl p-6 
        ${glow ? 'glow-border' : ''}
        ${hover ? 'hover:glow-border-strong transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}