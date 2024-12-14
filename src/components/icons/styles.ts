import { IconSize, IconVariant } from './types';

export const ICON_SIZES: Record<IconSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
};

export const ICON_VARIANTS: Record<IconVariant, string> = {
  default: 'text-gray-600',
  primary: 'text-indigo-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600'
};