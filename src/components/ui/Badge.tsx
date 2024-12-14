import { ReactNode } from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  children: ReactNode;
  variant: BadgeVariant;
}

const variantStyles = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800'
} as const;

export function Badge({ children, variant }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]}`}>
      {children}
    </span>
  );
}