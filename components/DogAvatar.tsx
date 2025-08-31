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
      className="cursor-pointer relative"
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
      >
        {/* Dog Body */}
        <motion.ellipse
          cx="50"
          cy="70"
          rx="25"
          ry="18"
          fill="url(#bodyGradient)"
          animate={{
            ry: isActive ? [18, 19, 18] : [18, 18.5, 18]
          }}
          transition={{
            duration: isActive ? 1.5 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Dog Head */}
        <motion.circle
          cx="50"
          cy="45"
          r="20"
          fill="url(#headGradient)"
          animate={{
            cy: isBarking ? 43 : isHovered ? 44 : 45,
            scale: isBarking ? 1.05 : 1
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Left Ear */}
        <motion.ellipse
          cx="38"
          cy="32"
          rx="8"
          ry="12"
          fill="url(#earGradient)"
          animate={{
            rotate: isBarking || isHovered ? -10 : 5,
            ry: isBarking || isHovered ? 14 : 12
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Right Ear */}
        <motion.ellipse
          cx="62"
          cy="32"
          rx="8"
          ry="12"
          fill="url(#earGradient)"
          animate={{
            rotate: isBarking || isHovered ? 10 : -5,
            ry: isBarking || isHovered ? 14 : 12
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Eyes */}
        <circle cx="44" cy="42" r="3" fill="#1e3a8a" />
        <circle cx="56" cy="42" r="3" fill="#1e3a8a" />
        <circle cx="44.5" cy="41" r="1" fill="white" />
        <circle cx="56.5" cy="41" r="1" fill="white" />

        {/* Nose */}
        <motion.ellipse
          cx="50"
          cy="48"
          rx="2"
          ry="1.5"
          fill="#1e3a8a"
          animate={{
            ry: isBarking ? 2.5 : 1.5
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Mouth */}
        <motion.path
          d={isBarking ? 
            "M 46 52 Q 50 58 54 52" : 
            isHovered ? "M 47 52 Q 50 55 53 52" : "M 48 52 Q 50 54 52 52"
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
            initial={{ opacity: 0, cy: 52 }}
            animate={{ opacity: 1, cy: 56 }}
            exit={{ opacity: 0 }}
            cx="50"
            cy="56"
            rx="3"
            ry="2"
            fill="#ef4444"
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Tail */}
        <motion.path
          d="M 25 70 Q 15 65 20 55"
          stroke="url(#tailGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          animate={isHovered ? {
            d: [
              "M 25 70 Q 15 65 20 55",
              "M 25 70 Q 12 62 18 52",
              "M 25 70 Q 18 68 22 58",
              "M 25 70 Q 15 65 20 55"
            ]
          } : {
            d: [
              "M 25 70 Q 15 65 20 55",
              "M 25 70 Q 18 68 22 58"
            ]
          }}
          transition={{
            duration: isHovered ? 0.5 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Paws */}
        <ellipse cx="40" cy="85" rx="4" ry="6" fill="url(#pawGradient)" />
        <ellipse cx="50" cy="88" rx="4" ry="6" fill="url(#pawGradient)" />
        <ellipse cx="60" cy="85" rx="4" ry="6" fill="url(#pawGradient)" />

        {/* Speech Bubble (when barking) */}
        {isBarking && (
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <ellipse cx="75" cy="25" rx="15" ry="8" fill="rgba(255, 255, 255, 0.9)" stroke="#22d3ee" strokeWidth="1" />
            <path d="M 65 30 L 58 35 L 70 32 Z" fill="rgba(255, 255, 255, 0.9)" />
            <text x="75" y="28" textAnchor="middle" className="text-xs font-bold fill-blue-900">Woof!</text>
          </motion.g>
        )}

        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          
          <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>

          <linearGradient id="earGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          <linearGradient id="tailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          <linearGradient id="pawGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e3a8a" />
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
            '0 0 25px rgba(59, 130, 246, 0.5)' :
            '0 0 15px rgba(59, 130, 246, 0.3)'
        }}
        transition={{
          duration: isActive ? 2 : 0.3,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}