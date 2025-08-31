'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface SudokuCellProps {
  value: number | null;
  row: number;
  col: number;
  isHighlighted: boolean;
  isCelebrating: boolean;
  candidates: number[];
  onHover: (row: number, col: number) => void;
  onHoverEnd: () => void;
}

export default function SudokuCell({
  value,
  row,
  col,
  isHighlighted,
  isCelebrating,
  candidates,
  onHover,
  onHoverEnd
}: SudokuCellProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: value ? 0.6 : 0.3,
        scale: 1,
        y: Math.sin((row + col) * 0.5 + Date.now() * 0.001) * 3
      }}
      transition={{ 
        duration: 0.4,
        delay: (row * 9 + col) * 0.02,
        y: { duration: 15, repeat: Infinity, ease: "easeInOut" }
      }}
      whileHover={{ 
        scale: 1.1,
        opacity: 0.8,
        transition: { duration: 0.2 }
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover(row, col);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverEnd();
      }}
      className={`
        relative w-8 h-8 md:w-10 md:h-10 rounded-lg cursor-pointer
        transition-all duration-300 backdrop-blur-sm
        ${isHighlighted ? 'bg-gradient-to-br from-cyan-400/40 to-blue-500/40' : 'bg-white/5'}
        ${isCelebrating ? 'animate-pulse bg-cyan-400/60' : ''}
        ${isHovered ? 'glass-strong glow-border-strong' : 'border border-white/10'}
      `}
    >
      {/* Main Number */}
      {value && (
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`
            absolute inset-0 flex items-center justify-center
            font-mono font-bold text-sm md:text-lg
            ${isCelebrating ? 'text-cyan-300 animate-glow' : 'text-blue-200'}
          `}
        >
          {value}
        </motion.div>
      )}

      {/* Candidate Numbers */}
      {!value && candidates.length > 0 && (
        <div className="absolute inset-0 grid grid-cols-3 gap-0.5 p-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <motion.div
              key={num}
              animate={{ 
                opacity: candidates.includes(num) ? 0.4 : 0,
                scale: candidates.includes(num) ? 1 : 0.8
              }}
              transition={{ 
                duration: 2,
                delay: num * 0.1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-xs text-blue-300/60 font-mono flex items-center justify-center"
            >
              {candidates.includes(num) ? num : ''}
            </motion.div>
          ))}
        </div>
      )}

      {/* Glow Effect on Celebration */}
      {isCelebrating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.5, 2] }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/30 to-blue-500/30 blur-sm"
        />
      )}
    </motion.div>
  );
}