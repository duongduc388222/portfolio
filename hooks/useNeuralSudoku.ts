'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface SudokuCell {
  value: number | null;
  confidence: number; // 0-1
  isLearning: boolean;
  lastChanged: number;
}

interface NeuralSudokuState {
  grid: SudokuCell[][];
  mousePosition: { x: number; y: number };
  scrollVelocity: number;
  learningCycle: number;
  gridCells: Array<{ x: number; y: number; active: boolean }>;
}

const LEARNING_PATTERNS = [
  // Different AI "learning" scenarios
  { type: 'exploration', duration: 8000, confidence: 0.2 },
  { type: 'convergence', duration: 5000, confidence: 0.8 },
  { type: 'uncertainty', duration: 3000, confidence: 0.1 },
  { type: 'breakthrough', duration: 2000, confidence: 0.95 }
];

const VALID_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function useNeuralSudoku() {
  const lastScrollY = useRef(0);
  const learningTimeoutRef = useRef<NodeJS.Timeout>();
  
  const [state, setState] = useState<NeuralSudokuState>({
    grid: Array(9).fill(null).map(() => 
      Array(9).fill(null).map(() => ({
        value: null,
        confidence: 0,
        isLearning: false,
        lastChanged: 0
      }))
    ),
    mousePosition: { x: 0, y: 0 },
    scrollVelocity: 0,
    learningCycle: 0,
    gridCells: []
  });

  // Initialize with some confident numbers
  useEffect(() => {
    setState(prev => {
      const newGrid = prev.grid.map(row => row.map(cell => ({ ...cell })));
      
      // Place some initial confident numbers
      const initialPlacements = [
        [0, 0, 5], [0, 4, 7], [1, 1, 3], [1, 5, 5],
        [2, 2, 8], [3, 3, 6], [4, 4, 2], [5, 5, 9],
        [6, 6, 1], [7, 7, 4], [8, 8, 7]
      ];

      initialPlacements.forEach(([row, col, num]) => {
        if (Math.random() > 0.3) { // 70% chance to show
          newGrid[row][col] = {
            value: num,
            confidence: 0.6 + Math.random() * 0.4,
            isLearning: false,
            lastChanged: Date.now()
          };
        }
      });

      return { ...prev, grid: newGrid };
    });
  }, []);

  // Simulate AI learning cycles
  useEffect(() => {
    const startLearningCycle = () => {
      const pattern = LEARNING_PATTERNS[Math.floor(Math.random() * LEARNING_PATTERNS.length)];
      
      setState(prev => {
        const newGrid = prev.grid.map(row => row.map(cell => ({ ...cell })));
        
        // Select random empty cells for learning
        const emptyCells: [number, number][] = [];
        for (let r = 0; r < 9; r++) {
          for (let c = 0; c < 9; c++) {
            if (!newGrid[r][c].value && Math.random() < 0.3) {
              emptyCells.push([r, c]);
            }
          }
        }

        // Start learning process
        emptyCells.forEach(([r, c]) => {
          if (Math.random() < 0.4) { // 40% chance to start learning
            newGrid[r][c] = {
              value: VALID_NUMBERS[Math.floor(Math.random() * VALID_NUMBERS.length)],
              confidence: pattern.confidence * (0.5 + Math.random() * 0.5),
              isLearning: true,
              lastChanged: Date.now()
            };
          }
        });

        return { ...prev, grid: newGrid, learningCycle: prev.learningCycle + 1 };
      });

      // Resolve learning after pattern duration
      learningTimeoutRef.current = setTimeout(() => {
        setState(prev => {
          const newGrid = prev.grid.map(row => 
            row.map(cell => {
              if (cell.isLearning) {
                // AI makes decision: keep, modify, or remove number
                const decision = Math.random();
                if (decision < 0.3) {
                  // Remove uncertain number
                  return { value: null, confidence: 0, isLearning: false, lastChanged: Date.now() };
                } else if (decision < 0.7) {
                  // Increase confidence
                  return { 
                    ...cell, 
                    confidence: Math.min(cell.confidence + 0.2, 0.95),
                    isLearning: false,
                    lastChanged: Date.now()
                  };
                } else {
                  // Change number (AI exploring)
                  return {
                    value: VALID_NUMBERS[Math.floor(Math.random() * VALID_NUMBERS.length)],
                    confidence: 0.3 + Math.random() * 0.4,
                    isLearning: false,
                    lastChanged: Date.now()
                  };
                }
              }
              return cell;
            })
          );
          return { ...prev, grid: newGrid };
        });
      }, pattern.duration);
    };

    // Start learning cycles
    const cycleInterval = setInterval(startLearningCycle, 6000 + Math.random() * 4000);
    
    return () => {
      clearInterval(cycleInterval);
      if (learningTimeoutRef.current) {
        clearTimeout(learningTimeoutRef.current);
      }
    };
  }, []);

  // Mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setState(prev => ({
      ...prev,
      mousePosition: { x: e.clientX, y: e.clientY }
    }));
  }, []);

  // Scroll velocity tracking
  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      const velocity = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;
      
      setState(prev => ({
        ...prev,
        scrollVelocity: Math.min(velocity, 50) // Cap at 50 for performance
      }));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleMouseMove, handleScroll]);

  // Update grid cell positions for neural connections
  const updateCellPosition = useCallback((row: number, col: number, cellData: { x: number; y: number; active: boolean }) => {
    setState(prev => {
      const newGridCells = [...prev.gridCells];
      const cellIndex = row * 9 + col;
      newGridCells[cellIndex] = cellData;
      
      return { ...prev, gridCells: newGridCells };
    });
  }, []);

  return {
    sudokuState: state,
    updateCellPosition
  };
}