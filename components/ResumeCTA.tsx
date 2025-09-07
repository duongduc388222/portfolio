import Link from 'next/link';

interface ResumeCTAProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'prominent';
}

export default function ResumeCTA({ 
  className = '', 
  variant = 'default' 
}: ResumeCTAProps) {
  const variants = {
    default: `
      inline-flex items-center gap-2 px-4 py-2
      bg-blue-500/20 text-blue-300
      border border-blue-500/30
      rounded-lg font-medium
      transition-all duration-200
      hover:bg-blue-500/30 hover:border-blue-500/50
      hover:shadow-lg hover:shadow-blue-500/20
    `,
    minimal: `
      inline-flex items-center gap-2 px-3 py-1.5
      text-blue-400 hover:text-blue-300
      transition-colors duration-200
      underline decoration-blue-400/50 hover:decoration-blue-300
    `,
    prominent: `
      inline-flex items-center gap-3 px-6 py-3
      bg-gradient-to-r from-blue-500 to-cyan-500
      text-white font-semibold
      rounded-xl shadow-lg
      transition-all duration-200
      hover:shadow-xl hover:shadow-blue-500/25
      hover:-translate-y-0.5
    `,
  };

  return (
    <Link
      href="/resume"
      className={`${variants[variant]} ${className}`}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <span>View Resume</span>
      <svg
        className="w-4 h-4 transition-transform group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </Link>
  );
}
