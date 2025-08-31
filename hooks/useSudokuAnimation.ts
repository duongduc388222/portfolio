'use client';

import { useState, useEffect, useCallback } from 'react';

interface SudokuState {
  grid: (number | null)[][];
  highlightedRow: number | null;
  highlightedCol: number | null;
  celebratingCells: Set<string>;
  candidates: number[][][];
}

const VALID_SUDOKU = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9]
];

const SOLVE_SEQUENCES = [
  // Row completions for celebration
  { cells: [[0, 2], [0, 5], [0, 6], [0, 7], [0, 8]], values: [4, 6, 9, 2, 1] },
  { cells: [[1, 1], [1, 2], [1, 6], [1, 7], [1, 8]], values: [7, 2, 3, 8, 4] },
  { cells: [[2, 0], [2, 3], [2, 4], [2, 6], [2, 7]], values: [1, 3, 4, 5, 2] }
];

export function useSudokuAnimation() {
  const [sudokuState, setSudokuState] = useState<SudokuState>({
    grid: VALID_SUDOKU.map(row => row.slice()),
    highlightedRow: null,
    highlightedCol: null,
    celebratingCells: new Set(),
    candidates: Array(9).fill(null).map(() => 
      Array(9).fill(null).map(() => [1, 2, 3, 4, 5, 6, 7, 8, 9])
    )
  });

  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);

  // Initialize with random visible numbers
  useEffect(() => {
    const initialGrid = VALID_SUDOKU.map(row => row.slice());
    const visibleCells = new Set<string>();
    
    // Randomly show 15-20 numbers initially
    const numVisible = 15 + Math.floor(Math.random() * 6);
    while (visibleCells.size < numVisible) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (VALID_SUDOKU[row][col] !== null) {
        visibleCells.add(`${row}-${col}`);
      }
    }

    // Hide numbers not in visible set
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (!visibleCells.has(`${row}-${col}`)) {
          initialGrid[row][col] = null;
        }
      }
    }

    setSudokuState(prev => ({ ...prev, grid: initialGrid }));
  }, []);

  // Hover handlers
  const handleCellHover = useCallback((row: number, col: number) => {
    setSudokuState(prev => ({
      ...prev,
      highlightedRow: row,
      highlightedCol: col
    }));
  }, []);

  const handleCellHoverEnd = useCallback(() => {
    setSudokuState(prev => ({
      ...prev,
      highlightedRow: null,
      highlightedCol: null
    }));
  }, []);

  // Solve celebration trigger
  const triggerSolveCelebration = useCallback(() => {
    const sequence = SOLVE_SEQUENCES[currentSequenceIndex % SOLVE_SEQUENCES.length];
    const newCelebrating = new Set<string>();
    
    sequence.cells.forEach(([row, col]) => {
      newCelebrating.add(`${row}-${col}`);
    });

    setSudokuState(prev => {
      const newGrid = prev.grid.map(row => row.slice());
      sequence.cells.forEach(([row, col], index) => {
        newGrid[row][col] = sequence.values[index];
      });

      return {
        ...prev,
        grid: newGrid,
        celebratingCells: newCelebrating
      };
    });

    // Clear celebration after animation
    setTimeout(() => {
      setSudokuState(prev => ({
        ...prev,
        celebratingCells: new Set()
      }));
    }, 1500);

    setCurrentSequenceIndex(prev => prev + 1);
  }, [currentSequenceIndex]);

  return {
    sudokuState,
    handleCellHover,
    handleCellHoverEnd,
    triggerSolveCelebration
  };
}