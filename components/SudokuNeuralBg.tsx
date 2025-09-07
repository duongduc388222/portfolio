'use client';

import { useEffect, useRef, useState } from 'react';
import { theme } from '@/lib/theme';

interface SudokuNeuralBgProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  showNeural?: boolean;
  showSudoku?: boolean;
}

interface NeuralNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
  pulse: number;
}

export default function SudokuNeuralBg({
  className = '',
  intensity = 'medium',
  showNeural = true,
  showSudoku = true,
}: SudokuNeuralBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(true);
  const [neuralNodes, setNeuralNodes] = useState<NeuralNode[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize neural network nodes
  useEffect(() => {
    const initNeuralNodes = () => {
      const nodeCount = intensity === 'high' ? 20 : intensity === 'medium' ? 15 : 10;
      const nodes: NeuralNode[] = [];
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connections: [],
          pulse: Math.random() * Math.PI * 2,
        });
      }
      
      // Create connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            nodes[i].connections.push(j);
            nodes[j].connections.push(i);
          }
        }
      }
      
      setNeuralNodes(nodes);
    };

    if (dimensions.width > 0 && dimensions.height > 0) {
      initNeuralNodes();
    }
  }, [dimensions, intensity]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        canvas.getContext('2d')?.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!showNeural || neuralNodes.length === 0) return;

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Update and draw neural network
      const updatedNodes = neuralNodes.map(node => {
        // Update position
        let newX = node.x + node.vx;
        let newY = node.y + node.vy;

        // Bounce off edges
        if (newX < 0 || newX > dimensions.width) {
          node.vx *= -1;
          newX = node.x;
        }
        if (newY < 0 || newY > dimensions.height) {
          node.vy *= -1;
          newY = node.y;
        }

        // Update pulse
        const newPulse = node.pulse + 0.02;

        return {
          ...node,
          x: newX,
          y: newY,
          pulse: newPulse,
        };
      });

      setNeuralNodes(updatedNodes);

      // Draw connections
      ctx.strokeStyle = theme.colors.grid.accent;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;

      for (const node of updatedNodes) {
        for (const connectionIndex of node.connections) {
          const connectedNode = updatedNodes[connectionIndex];
          if (connectedNode) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connectedNode.x, connectedNode.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      ctx.globalAlpha = 0.6;
      for (const node of updatedNodes) {
        const pulseSize = 3 + Math.sin(node.pulse) * 2;
        const pulseAlpha = 0.4 + Math.sin(node.pulse) * 0.3;

        ctx.fillStyle = theme.primary;
        ctx.globalAlpha = pulseAlpha;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.shadowColor = theme.primary;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = pulseAlpha * 0.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [neuralNodes, dimensions, showNeural]);

  // Visibility detection for performance
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Sudoku Grid Background */}
      {showSudoku && (
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-9 grid-rows-9 h-full w-full">
            {Array.from({ length: 81 }).map((_, i) => {
              const row = Math.floor(i / 9);
              const col = i % 9;
              const isThickBorder = row % 3 === 0 || col % 3 === 0;
              
              return (
                <div
                  key={i}
                  className={`
                    border border-white/20
                    ${isThickBorder ? 'border-2' : 'border'}
                    animate-sudoku-pulse
                  `}
                  style={{
                    animationDelay: `${(i * 50) % 3000}ms`,
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Neural Network Canvas */}
      {showNeural && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-900/20" />
    </div>
  );
}
