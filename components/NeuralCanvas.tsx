'use client';

import { useRef, useEffect, useState } from 'react';

interface NeuralConnection {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  intensity: number;
  age: number;
  maxAge: number;
}

interface NeuralCanvasProps {
  mouseX: number;
  mouseY: number;
  scrollVelocity: number;
  gridCells: Array<{ x: number; y: number; active: boolean }>;
}

export default function NeuralCanvas({ mouseX, mouseY, scrollVelocity, gridCells }: NeuralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const connectionsRef = useRef<NeuralConnection[]>([]);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const createConnection = () => {
      const activeCells = gridCells.filter(cell => cell.active);
      if (activeCells.length < 2) return;

      const start = activeCells[Math.floor(Math.random() * activeCells.length)];
      const end = activeCells[Math.floor(Math.random() * activeCells.length)];

      if (start === end) return;

      connectionsRef.current.push({
        startX: start.x,
        startY: start.y,
        endX: end.x,
        endY: end.y,
        intensity: 0.8 + Math.random() * 0.2,
        age: 0,
        maxAge: 3000 + Math.random() * 2000
      });
    };

    const drawNeuralPath = (connection: NeuralConnection, progress: number) => {
      const { startX, startY, endX, endY, intensity } = connection;
      
      // Calculate bezier curve control points
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      const offsetX = (Math.random() - 0.5) * 100;
      const offsetY = (Math.random() - 0.5) * 100;

      // Create gradient
      const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
      gradient.addColorStop(0, `rgba(34, 211, 238, ${intensity * progress * 0.6})`); // cyan
      gradient.addColorStop(0.5, `rgba(59, 130, 246, ${intensity * progress * 0.8})`); // blue
      gradient.addColorStop(1, `rgba(34, 211, 238, ${intensity * progress * 0.4})`); // cyan

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5 + intensity;
      ctx.lineCap = 'round';

      // Draw curved path
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(midX + offsetX, midY + offsetY, endX, endY);
      ctx.stroke();

      // Draw particle along path if connection is strong
      if (intensity > 0.7 && progress > 0.3) {
        const particleProgress = (progress * 2) % 1;
        const particleX = startX + (endX - startX) * particleProgress;
        const particleY = startY + (endY - startY) * particleProgress;

        ctx.beginPath();
        ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${intensity * 0.8})`;
        ctx.fill();
      }
    };

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update connections
      connectionsRef.current = connectionsRef.current.filter(connection => {
        connection.age += 16; // ~60fps
        const progress = Math.min(connection.age / connection.maxAge, 1);
        
        if (progress < 1) {
          drawNeuralPath(connection, progress);
          return true;
        }
        return false;
      });

      // Create new connections based on activity
      const activityLevel = Math.min(scrollVelocity * 0.1 + 0.3, 1);
      if (Math.random() < activityLevel * 0.02) {
        createConnection();
      }

      // Mouse proximity effects
      if (mouseX > 0 && mouseY > 0) {
        gridCells.forEach(cell => {
          const distance = Math.sqrt(
            Math.pow(mouseX - cell.x, 2) + Math.pow(mouseY - cell.y, 2)
          );
          
          if (distance < 150) {
            const proximity = 1 - (distance / 150);
            ctx.beginPath();
            ctx.arc(cell.x, cell.y, 20 * proximity, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(34, 211, 238, ${proximity * 0.1})`;
            ctx.fill();
          }
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, mouseX, mouseY, scrollVelocity, gridCells]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}
    />
  );
}