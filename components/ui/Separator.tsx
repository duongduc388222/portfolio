'use client';

import { motion } from 'framer-motion';

interface SeparatorProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export default function Separator({ className = '', orientation = 'horizontal' }: SeparatorProps) {
  const baseClasses = "bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent";
  
  const orientationClasses = {
    horizontal: "w-full h-px",
    vertical: "h-full w-px"
  };

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`${baseClasses} ${orientationClasses[orientation]} ${className}`}
    />
  );
}
