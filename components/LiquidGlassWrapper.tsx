'use client';

interface LiquidGlassWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function LiquidGlassWrapper({ children, className = "" }: LiquidGlassWrapperProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Animated liquid blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -8" result="goo" />
            </filter>
            <linearGradient id="blobGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0.3}} />
              <stop offset="100%" style={{stopColor: '#60a5fa', stopOpacity: 0.1}} />
            </linearGradient>
            <linearGradient id="blobGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#22d3ee', stopOpacity: 0.2}} />
              <stop offset="100%" style={{stopColor: '#06b6d4', stopOpacity: 0.1}} />
            </linearGradient>
          </defs>
          
          <g filter="url(#goo)">
            <circle 
              cx="20%" 
              cy="20%" 
              r="120" 
              fill="url(#blobGradient1)" 
              className="animate-blob"
            />
            <circle 
              cx="80%" 
              cy="80%" 
              r="100" 
              fill="url(#blobGradient2)" 
              className="animate-blob animation-delay-2000"
            />
            <circle 
              cx="40%" 
              cy="60%" 
              r="80" 
              fill="url(#blobGradient1)" 
              className="animate-blob animation-delay-4000"
            />
          </g>
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}