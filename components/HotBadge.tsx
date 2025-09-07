'use client';

import { useState, useEffect } from 'react';

interface HotBadgeProps {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function HotBadge({ 
  className = '', 
  children, 
  disabled = false 
}: HotBadgeProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-3 py-1 
        bg-red-500 text-white text-sm font-bold
        rounded-full shadow-lg
        ${!disabled && !prefersReducedMotion ? 'animate-bounce-slow' : ''}
        ${className}
      `}
      role="status"
      aria-label="Hot News Badge"
    >
      {children}
    </span>
  );
}
