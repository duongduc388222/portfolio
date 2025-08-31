'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import DogAvatar from './DogAvatar';
import profileData from '@/data/profile.json';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

function generateReply(question: string): string {
  const lowerQuestion = question.toLowerCase();
  const responses = profileData.chatbot.responses;

  // Lam-specific responses
  if (lowerQuestion.includes('name') || lowerQuestion.includes('lam') || lowerQuestion.includes('blue') || lowerQuestion.includes('vietnamese')) {
    return responses.name[Math.floor(Math.random() * responses.name.length)];
  }

  // Keyword matching for different topics
  if (lowerQuestion.includes('skill') || lowerQuestion.includes('technology') || lowerQuestion.includes('tech')) {
    return responses.skills[Math.floor(Math.random() * responses.skills.length)];
  }
  
  if (lowerQuestion.includes('experience') || lowerQuestion.includes('work') || lowerQuestion.includes('job')) {
    return responses.experience[Math.floor(Math.random() * responses.experience.length)];
  }
  
  if (lowerQuestion.includes('project') || lowerQuestion.includes('portfolio') || lowerQuestion.includes('build')) {
    return responses.projects[Math.floor(Math.random() * responses.projects.length)];
  }
  
  if (lowerQuestion.includes('education') || lowerQuestion.includes('study') || lowerQuestion.includes('university') || lowerQuestion.includes('degree')) {
    return responses.education[Math.floor(Math.random() * responses.education.length)];
  }
  
  if (lowerQuestion.includes('contact') || lowerQuestion.includes('reach') || lowerQuestion.includes('email') || lowerQuestion.includes('linkedin')) {
    return responses.contact[Math.floor(Math.random() * responses.contact.length)];
  }
  
  if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  }

  // Default response
  return responses.default[Math.floor(Math.random() * responses.default.length)];
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message when chat opens for the first time
      const welcomeMessage: Message = {
        id: 1,
        text: "Woof! Hi there! I'm Lam, Duc's digital companion. My name means 'blue' in Vietnamese - pretty fitting, right? What would you like to know about Duc?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botReply = generateReply(inputValue);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botReply,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Dog Avatar Button */}
      <div className="relative">
        <DogAvatar
          isActive={isOpen}
          isHovered={isHovered}
          onClick={() => setIsOpen(!isOpen)}
          onHover={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        />
        
        {/* Close button when chat is open */}
        {isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => setIsOpen(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white text-xs transition-colors"
          >
            <X size={12} />
          </motion.button>
        )}
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-80 h-96 glass-strong rounded-xl border border-cyan-400/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 rounded-full glass p-1.5 border border-blue-400/20">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                    🐕
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-cyan-400">Lam, your AI assistant</h3>
                  <p className="text-xs text-white/60">Ask me about Duc's background!</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start items-end'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="flex-shrink-0 mr-2 mb-1">
                      <div className="w-8 h-8 rounded-full glass p-1 border border-blue-400/20">
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                          🐕
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    className={`
                      max-w-[75%] p-3 rounded-lg text-sm
                      ${message.sender === 'user' 
                        ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-400/20' 
                        : 'bg-blue-500/20 text-blue-100 border border-blue-400/20'
                      }
                    `}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start items-end"
                >
                  <div className="flex-shrink-0 mr-2 mb-1">
                    <div className="w-8 h-8 rounded-full glass p-1 border border-blue-400/20">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center animate-pulse">
                        🐕
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-500/20 text-blue-100 border border-blue-400/20 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-cyan-500/20 border border-cyan-400/20 rounded-lg p-2 text-cyan-400 hover:bg-cyan-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}