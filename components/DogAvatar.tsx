'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface DogAvatarProps {
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: () => void;
  onHoverEnd: () => void;
}

export default function DogAvatar({ isActive, isHovered, onClick, onHover, onHoverEnd }: DogAvatarProps) {
  const [isBarking, setIsBarking] = useState(false);

  const handleClick = () => {
    setIsBarking(true);
    onClick();
    setTimeout(() => setIsBarking(false), 600);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      onClick={handleClick}
      className="cursor-pointer relative flex items-center justify-center"
    >
      <svg
        width="70"
        height="70"
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
      >
        {/* Dog Head */}
        <motion.circle
          cx="50"
          cy="50"
          r="28"
          fill="url(#headGradient)"
          animate={{
            scale: isBarking ? 1.05 : isActive ? [1, 1.02, 1] : 1
          }}
          transition={{ 
            duration: isBarking ? 0.2 : 3,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
        
        {/* Head highlight */}
        <ellipse
          cx="50"
          cy="45"
          rx="12"
          ry="8"
          fill="rgba(224, 246, 255, 0.4)"
        />

        {/* Left Ear */}
        <motion.ellipse
          cx="32"
          cy="28"
          rx="8"
          ry="14"
          fill="url(#earGradient)"
          animate={{
            rotate: isBarking || isHovered ? -20 : -10,
            ry: isBarking || isHovered ? 16 : 14
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Right Ear */}
        <motion.ellipse
          cx="68"
          cy="28"
          rx="8"
          ry="14"
          fill="url(#earGradient)"
          animate={{
            rotate: isBarking || isHovered ? 20 : 10,
            ry: isBarking || isHovered ? 16 : 14
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Inner Ears */}
        <ellipse cx="34" cy="30" rx="4" ry="8" fill="rgba(224, 246, 255, 0.6)" />
        <ellipse cx="66" cy="30" rx="4" ry="8" fill="rgba(224, 246, 255, 0.6)" />

        {/* Eyes */}
        <circle cx="42" cy="45" r="4" fill="#1e3a8a" />
        <circle cx="58" cy="45" r="4" fill="#1e3a8a" />
        <circle cx="42.5" cy="44" r="1.5" fill="white" />
        <circle cx="58.5" cy="44" r="1.5" fill="white" />
        
        {/* Eye highlights for cartoon effect */}
        <circle cx="43" cy="43" r="0.8" fill="white" opacity="0.9" />
        <circle cx="59" cy="43" r="0.8" fill="white" opacity="0.9" />

        {/* Snout */}
        <ellipse
          cx="50"
          cy="58"
          rx="10"
          ry="8"
          fill="rgba(224, 246, 255, 0.7)"
        />

        {/* Nose */}
        <motion.ellipse
          cx="50"
          cy="55"
          rx="2"
          ry="1.5"
          fill="#1e3a8a"
          animate={{
            ry: isBarking ? 2 : 1.5
          }}
          transition={{ duration: 0.2 }}
        />
        {/* Nose highlight */}
        <ellipse cx="49.5" cy="54.5" rx="0.7" ry="0.5" fill="white" opacity="0.8" />

        {/* Mouth */}
        <motion.path
          d={isBarking ? 
            "M 45 62 Q 50 68 55 62" : 
            isHovered ? "M 46 62 Q 50 66 54 62" : "M 47 62 Q 50 65 53 62"
          }
          stroke="#1e3a8a"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          transition={{ duration: 0.2 }}
        />

        {/* Tongue (when barking) */}
        {isBarking && (
          <motion.ellipse
            initial={{ opacity: 0, cy: 62 }}
            animate={{ opacity: 1, cy: 66 }}
            exit={{ opacity: 0 }}
            cx="50"
            cy="66"
            rx="3"
            ry="2"
            fill="#ef4444"
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Speech Bubble (when barking) */}
        {isBarking && (
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <ellipse cx="80" cy="20" rx="18" ry="10" fill="rgba(255, 255, 255, 0.95)" stroke="#22d3ee" strokeWidth="1" />
            <path d="M 68 28 L 58 35 L 70 32 Z" fill="rgba(255, 255, 255, 0.95)" />
            <text x="80" y="23" textAnchor="middle" className="text-xs font-bold fill-blue-900">Woof!</text>
          </motion.g>
        )}

        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="30%" stopColor="#60a5fa" />
            <stop offset="70%" stopColor="#4169E1" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>

          <linearGradient id="earGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4169E1" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isActive ? 
            ['0 0 20px rgba(34, 211, 238, 0.4)', '0 0 30px rgba(34, 211, 238, 0.6)', '0 0 20px rgba(34, 211, 238, 0.4)'] :
            isHovered ?
            '0 0 25px rgba(135, 206, 235, 0.5)' :
            '0 0 15px rgba(135, 206, 235, 0.3)'
        }}
        transition={{
          duration: isActive ? 2 : 0.3,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
      
      {/* Subtle bounce animation */}
      <motion.div
        className="absolute inset-0"
        animate={{
          y: isActive ? [0, -2, 0] : isHovered ? [0, -1, 0] : 0
        }}
        transition={{
          duration: isActive ? 1 : 2,
          repeat: isActive || isHovered ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}