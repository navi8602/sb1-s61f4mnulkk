import { IconSize } from './types';

export const ICON_SIZES: Record<Exclude<IconSize, number>, number> = {
  sm: 16,
  md: 20,
  lg: 24
};

// Default styles for different contexts
export const ICON_VARIANTS = {
  default: 'text-gray-600',
  primary: 'text-indigo-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600'
} as const;