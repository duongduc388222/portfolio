'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function GlowButton({ 
  children, 
  href, 
  onClick, 
  className = '', 
  variant = 'primary' 
}: GlowButtonProps) {
  const baseClasses = "relative px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-100 border border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]",
    secondary: "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-100 border border-blue-400/30 hover:border-blue-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
  };

  const buttonContent = (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="inline-block">
      {buttonContent}
    </button>
  );
}
