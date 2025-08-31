'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import SudokuCell from './SudokuCell';
import { useSudokuAnimation } from '@/hooks/useSudokuAnimation';

export default function SudokuBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const {
    sudokuState,
    handleCellHover,
    handleCellHoverEnd,
    triggerSolveCelebration
  } = useSudokuAnimation();

  // Parallax effect
  const y = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : -24]);
  const opacity = useTransform(scrollY, [0, 500, 1000], [0.4, 0.3, 0.2]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Trigger solve celebrations on intersection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id.includes('education', 'experience', 'projects', 'skills')) {
            triggerSolveCelebration();
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [triggerSolveCelebration]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Main Sudoku Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-9 gap-1 md:gap-2 p-4 pointer-events-auto"
          style={{
            filter: prefersReducedMotion ? 'none' : 'blur(0.5px)',
          }}
        >
          {sudokuState.grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isHighlighted = 
                sudokuState.highlightedRow === rowIndex || 
                sudokuState.highlightedCol === colIndex;
              const isCelebrating = sudokuState.celebratingCells.has(`${rowIndex}-${colIndex}`);
              const candidates = sudokuState.candidates[rowIndex][colIndex];

              return (
                <SudokuCell
                  key={`${rowIndex}-${colIndex}`}
                  value={cell}
                  row={rowIndex}
                  col={colIndex}
                  isHighlighted={isHighlighted}
                  isCelebrating={isCelebrating}
                  candidates={candidates}
                  onHover={handleCellHover}
                  onHoverEnd={handleCellHoverEnd}
                />
              );
            })
          )}
        </motion.div>

        {/* Additional floating numbers for atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          {[1, 2, 3, 4, 5].map((num, index) => (
            <motion.div
              key={`floating-${num}`}
              initial={{ 
                opacity: 0,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
              }}
              animate={{
                opacity: [0, 0.2, 0],
                x: Math.random() * (window.innerWidth || 1200),
                y: Math.random() * (window.innerHeight || 800),
                rotate: 360
              }}
              transition={{
                duration: 20 + index * 5,
                repeat: Infinity,
                ease: "linear",
                delay: index * 2
              }}
              className="absolute text-6xl font-mono text-blue-300/10"
            >
              {num + 3}
            </motion.div>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-indigo-900/20 pointer-events-none" />
      </motion.div>
    </div>
  );
}