'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import EnhancedSudokuCell from './EnhancedSudokuCell';
import NeuralCanvas from './NeuralCanvas';
import { useNeuralSudoku } from '@/hooks/useNeuralSudoku';

export default function EvolvingSudokuNeuralGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low'>('high');
  
  const { sudokuState, updateCellPosition } = useNeuralSudoku();

  // Parallax and depth effects
  const gridY = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : -50]);
  const gridRotation = useTransform(scrollY, [0, 2000], [0, prefersReducedMotion ? 0 : 15]);
  const backgroundOpacity = useTransform(scrollY, [0, 500, 1500], [0.6, 0.4, 0.2]);

  // Check performance and reduced motion
  useEffect(() => {
    // Reduced motion check
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleChange);

      // Simple performance detection
      const checkPerformance = () => {
        const start = performance.now();
        let count = 0;
        while (performance.now() - start < 10) {
          count++;
        }
        
        if (count < 100000) setPerformanceMode('low');
        else if (count < 500000) setPerformanceMode('medium');
      };

      checkPerformance();
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-indigo-900/10" />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Multi-layer Gradient Depth */}
      <div className="absolute inset-0">
        {/* Deep ocean base */}
        <motion.div 
          style={{ opacity: backgroundOpacity }}
          className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800"
        />
        
        {/* Neural glow layer */}
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        />

        {/* Surface highlights */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 via-transparent to-indigo-900/5" />
      </div>

      {/* Neural Canvas Layer */}
      {performanceMode !== 'low' && (
        <NeuralCanvas
          mouseX={sudokuState.mousePosition.x}
          mouseY={sudokuState.mousePosition.y}
          scrollVelocity={sudokuState.scrollVelocity}
          gridCells={sudokuState.gridCells}
        />
      )}

      {/* Evolving Sudoku Grid */}
      <motion.div
        style={{ y: gridY, rotateZ: gridRotation }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="grid grid-cols-9 gap-1 md:gap-2 p-4"
          style={{
            filter: performanceMode === 'low' ? 'none' : 'blur(0.5px) brightness(1.1)',
            transform: `perspective(1000px) rotateX(${performanceMode === 'high' ? '5deg' : '0deg'})`
          }}
        >
          {sudokuState.grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <EnhancedSudokuCell
                key={`${rowIndex}-${colIndex}`}
                value={cell.value}
                row={rowIndex}
                col={colIndex}
                confidence={cell.confidence}
                isLearning={cell.isLearning}
                onCellUpdate={updateCellPosition}
              />
            ))
          )}
        </motion.div>

        {/* Cascading Data Streams (High Performance Only) */}
        {performanceMode === 'high' && (
          <div className="absolute inset-0 pointer-events-none">
            {[1, 2, 3].map((stream, index) => (
              <motion.div
                key={`stream-${stream}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ 
                  y: typeof window !== 'undefined' ? window.innerHeight + 100 : 900,
                  opacity: [0, 0.3, 0.3, 0]
                }}
                transition={{
                  duration: 15 + index * 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 8
                }}
                className={`absolute text-xs font-mono text-cyan-400/20 ${
                  index === 0 ? 'left-1/4' : index === 1 ? 'right-1/4' : 'left-1/2'
                }`}
                style={{ writingMode: 'vertical-rl' }}
              >
                {Array.from({ length: 20 }, (_, i) => 
                  VALID_NUMBERS[Math.floor(Math.random() * VALID_NUMBERS.length)]
                ).join(' ')}
              </motion.div>
            ))}
          </div>
        )}

        {/* Performance indicator for debugging */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute top-4 right-4 text-xs text-white/50 pointer-events-auto">
            Performance: {performanceMode} | Cycle: {sudokuState.learningCycle}
          </div>
        )}
      </motion.div>

      {/* Neural Activity Pulse */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 mix-blend-screen"
      />
    </div>
  );
}