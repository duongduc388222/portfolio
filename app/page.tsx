'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import GlowButton from '@/components/ui/GlowButton';
import Separator from '@/components/ui/Separator';
import ChatBot from '@/components/duong/Chatbot';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Chatbot */}
        <ChatBot />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-strong rounded-2xl p-8 sm:p-12 border border-cyan-400/20 shadow-[0_0_50px_rgba(34,211,238,0.1)]"
          >
            {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 font-mono"
              >
              DUC DUONG
              </motion.h1>
              
            {/* Subtitle */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <p className="text-xl sm:text-2xl text-cyan-300 mb-2">
                Data Engineer • ML/AI Enthusiast • Sudoku Solver
              </p>
            </motion.div>

            <Separator className="mb-8" />

            {/* Current Role */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-6"
            >
              <h2 className="text-lg font-semibold text-cyan-400 mb-2">Current Role</h2>
              <p className="text-white/80 text-lg">
                Quantitative Developer @ CF Hub - qAnts Research Team
              </p>
            </motion.div>

            {/* Education */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mb-6"
            >
              <h2 className="text-lg font-semibold text-cyan-400 mb-2">Education</h2>
              <p className="text-white/80 text-lg">
                Grinnell College • 
              </p>
            </motion.div>

            {/* Focus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mb-6"
            >
              <h2 className="text-lg font-semibold text-cyan-400 mb-2">Focus</h2>
              <p className="text-white/80 text-lg">
                Deep Learning and AI
              </p>
            </motion.div>

            <Separator className="mb-8" />

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <GlowButton href="/portfolio" variant="primary">
                <span className="flex items-center space-x-2">
                  <span>ENTER PORTFOLIO</span>
                  <ArrowRight size={20} />
                </span>
              </GlowButton>
              
              <GlowButton href="/blog" variant="secondary">
                <span className="flex items-center space-x-2">
                  <Sparkles size={20} />
                  <span>ENTER BLOG</span>
                </span>
              </GlowButton>
            </motion.div>

            {/* Keyboard Shortcut Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.0 }}
              className="mt-8 text-sm text-white/50"
            >
              <p>Press <kbd className="px-2 py-1 bg-white/10 rounded text-cyan-400">Ctrl/Cmd + K</kbd> to chat with Duong</p>
            </motion.div>
          </motion.div>
        </motion.div>
        </div>
    </div>
  );
}