import { ReactNode } from 'react';

interface IconWrapperProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
};

export function IconWrapper({ children, size = 'md', className = '' }: IconWrapperProps) {
  return (
    <span className={`inline-flex ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
}