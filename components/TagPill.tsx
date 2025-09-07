import Link from 'next/link';

interface TagPillProps {
  tag: string;
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

export default function TagPill({
  tag,
  href,
  className = '',
  size = 'sm',
  variant = 'default',
}: TagPillProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const variantClasses = {
    default: 'bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30',
    outline: 'bg-transparent text-blue-300 border border-blue-500/50 hover:bg-blue-500/10',
    ghost: 'bg-transparent text-blue-300 hover:bg-blue-500/20',
  };

  const baseClasses = `
    inline-flex items-center justify-center
    rounded-full font-medium
    transition-all duration-200
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {tag}
      </Link>
    );
  }

  return (
    <span className={baseClasses}>
      {tag}
    </span>
  );
}
