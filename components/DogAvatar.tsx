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
        width="90"
        height="90"
        viewBox="0 0 120 120"
        className="drop-shadow-lg"
      >
        {/* Back Legs (behind body) */}
        <motion.ellipse
          cx="35"
          cy="85"
          rx="4"
          ry="12"
          fill="url(#legGradient)"
          animate={{
            ry: isHovered ? [12, 13, 12] : 12
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.ellipse
          cx="65"
          cy="85"
          rx="4"
          ry="12"
          fill="url(#legGradient)"
          animate={{
            ry: isHovered ? [12, 13, 12] : 12
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />

        {/* Dog Body */}
        <motion.ellipse
          cx="50"
          cy="75"
          rx="28"
          ry="20"
          fill="url(#bodyGradient)"
          animate={{
            ry: isActive ? [20, 21, 20] : [20, 20.5, 20]
          }}
          transition={{
            duration: isActive ? 1.5 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Front Legs */}
        <motion.ellipse
          cx="32"
          cy="90"
          rx="5"
          ry="15"
          fill="url(#legGradient)"
          animate={{
            ry: isBarking || isHovered ? [15, 12, 15] : 15,
            cy: isBarking || isHovered ? [90, 88, 90] : 90
          }}
          transition={{ duration: 0.4, repeat: isHovered ? Infinity : 0 }}
        />
        <motion.ellipse
          cx="68"
          cy="90"
          rx="5"
          ry="15"
          fill="url(#legGradient)"
          animate={{
            ry: isBarking || isHovered ? [15, 12, 15] : 15,
            cy: isBarking || isHovered ? [90, 88, 90] : 90
          }}
          transition={{ duration: 0.4, repeat: isHovered ? Infinity : 0, delay: 0.2 }}
        />

        {/* Paws */}
        <motion.ellipse cx="32" cy="105" rx="6" ry="4" fill="url(#pawGradient)" />
        <motion.ellipse cx="68" cy="105" rx="6" ry="4" fill="url(#pawGradient)" />
        <motion.ellipse cx="35" cy="100" rx="5" ry="3" fill="url(#pawGradient)" />
        <motion.ellipse cx="65" cy="100" rx="5" ry="3" fill="url(#pawGradient)" />

        {/* Dog Head */}
        <motion.circle
          cx="50"
          cy="50"
          r="22"
          fill="url(#headGradient)"
          animate={{
            cy: isBarking ? 48 : isHovered ? 49 : 50,
            scale: isBarking ? 1.05 : 1
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Left Ear */}
        <motion.ellipse
          cx="38"
          cy="35"
          rx="8"
          ry="12"
          fill="url(#earGradient)"
          animate={{
            rotate: isBarking || isHovered ? -15 : 5,
            ry: isBarking || isHovered ? 14 : 12
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Right Ear */}
        <motion.ellipse
          cx="62"
          cy="35"
          rx="8"
          ry="12"
          fill="url(#earGradient)"
          animate={{
            rotate: isBarking || isHovered ? 15 : -5,
            ry: isBarking || isHovered ? 14 : 12
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Eyes */}
        <circle cx="44" cy="47" r="3" fill="#1e3a8a" />
        <circle cx="56" cy="47" r="3" fill="#1e3a8a" />
        <circle cx="44.5" cy="46" r="1" fill="white" />
        <circle cx="56.5" cy="46" r="1" fill="white" />

        {/* Nose */}
        <motion.ellipse
          cx="50"
          cy="53"
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
            "M 46 57 Q 50 63 54 57" : 
            isHovered ? "M 47 57 Q 50 60 53 57" : "M 48 57 Q 50 59 52 57"
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
            initial={{ opacity: 0, cy: 57 }}
            animate={{ opacity: 1, cy: 61 }}
            exit={{ opacity: 0 }}
            cx="50"
            cy="61"
            rx="3"
            ry="2"
            fill="#ef4444"
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Enhanced Tail */}
        <motion.path
          d="M 22 75 Q 8 70 15 55 Q 12 45 18 35"
          stroke="url(#tailGradient)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          animate={isHovered ? {
            d: [
              "M 22 75 Q 8 70 15 55 Q 12 45 18 35",
              "M 22 75 Q 5 65 12 50 Q 8 40 15 30",
              "M 22 75 Q 12 72 18 60 Q 15 50 20 40",
              "M 22 75 Q 8 70 15 55 Q 12 45 18 35"
            ]
          } : {
            d: [
              "M 22 75 Q 8 70 15 55 Q 12 45 18 35",
              "M 22 75 Q 12 72 18 60 Q 15 50 20 40"
            ]
          }}
          transition={{
            duration: isHovered ? 0.4 : 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Speech Bubble (when barking) */}
        {isBarking && (
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <ellipse cx="85" cy="30" rx="18" ry="10" fill="rgba(255, 255, 255, 0.9)" stroke="#22d3ee" strokeWidth="1" />
            <path d="M 70 35 L 62 42 L 75 38 Z" fill="rgba(255, 255, 255, 0.9)" />
            <text x="85" y="33" textAnchor="middle" className="text-xs font-bold fill-blue-900">Woof!</text>
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

          <linearGradient id="legGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#1d4ed8" />
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