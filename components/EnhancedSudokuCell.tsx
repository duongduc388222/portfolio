'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface EnhancedSudokuCellProps {
  value: number | null;
  row: number;
  col: number;
  confidence: number; // 0-1, represents AI confidence in this number
  isLearning: boolean; // true when AI is "thinking" about this cell
  onCellUpdate: (row: number, col: number, cellData: { x: number; y: number; active: boolean }) => void;
}

export default function EnhancedSudokuCell({
  value,
  row,
  col,
  confidence,
  isLearning,
  onCellUpdate
}: EnhancedSudokuCellProps) {
  const [cellRef, setCellRef] = useState<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Calculate cell position for neural connections
  useEffect(() => {
    if (cellRef) {
      const rect = cellRef.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      onCellUpdate(row, col, {
        x: centerX,
        y: centerY,
        active: value !== null && confidence > 0.3
      });
    }
  }, [cellRef, value, confidence, row, col, onCellUpdate]);

  // Staggered appearance animation
  useEffect(() => {
    const delay = (row * 9 + col) * 50; // Stagger appearance
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [row, col]);

  // AI thinking patterns
  const thinkingVariants = {
    thinking: {
      scale: [1, 1.05, 1],
      opacity: [confidence * 0.3, confidence * 0.7, confidence * 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    confident: {
      scale: 1,
      opacity: Math.min(confidence, 0.8),
      transition: { duration: 0.5 }
    },
    uncertain: {
      scale: [1, 0.95, 1],
      opacity: [confidence * 0.2, confidence * 0.4, confidence * 0.2],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const getAnimationState = () => {
    if (isLearning) return 'thinking';
    if (confidence < 0.4) return 'uncertain';
    return 'confident';
  };

  return (
    <motion.div
      ref={setCellRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? thinkingVariants[getAnimationState()] : { opacity: 0, scale: 0.8 }}
      whileHover={{
        scale: 1.1,
        opacity: Math.min(confidence + 0.3, 1),
        transition: { duration: 0.2 }
      }}
      className={`
        relative w-8 h-8 md:w-10 md:h-10 rounded-lg
        backdrop-blur-sm border transition-all duration-300
        ${confidence > 0.6 ? 'border-cyan-400/40 bg-cyan-400/10' : 
          confidence > 0.3 ? 'border-blue-400/30 bg-blue-400/5' :
          'border-white/10 bg-white/5'}
        ${isLearning ? 'animate-pulse' : ''}
      `}
    >
      {/* Confidence Ring */}
      {confidence > 0.3 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1,
            opacity: confidence * 0.6,
          }}
          className={`
            absolute inset-0 rounded-lg border-2
            ${confidence > 0.7 ? 'border-cyan-400/60' : 'border-blue-400/40'}
          `}
          style={{
            boxShadow: confidence > 0.7 ? 
              '0 0 15px rgba(34, 211, 238, 0.3)' : 
              '0 0 10px rgba(59, 130, 246, 0.2)'
          }}
        />
      )}

      {/* Main Number */}
      {value && (
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: confidence,
            color: confidence > 0.7 ? '#22d3ee' : '#60a5fa'
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center font-mono font-bold text-sm md:text-lg"
        >
          {value}
        </motion.div>
      )}

      {/* Learning Indicator */}
      {isLearning && (
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20"
        />
      )}

      {/* Ripple Effect for High Confidence */}
      {confidence > 0.8 && (
        <motion.div
          animate={{
            scale: [1, 2, 1],
            opacity: [0.4, 0, 0.4]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute inset-0 rounded-full border border-cyan-400/30"
        />
      )}

      {/* Uncertainty Flicker */}
      {confidence < 0.3 && value && (
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-red-400/10 rounded-lg"
        />
      )}
    </motion.div>
  );
}