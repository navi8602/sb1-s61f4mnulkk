import { SVGProps } from 'react';
import { IconProps } from './types';
import { ICON_PATHS } from './paths';
import { ICON_SIZES, ICON_VARIANTS } from './styles';

export function Icon({ 
  name, 
  size = 'md', 
  variant = 'default',
  className = '' 
}: IconProps) {
  const path = ICON_PATHS[name];
  
  if (!path) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const classes = [
    ICON_SIZES[size],
    ICON_VARIANTS[variant],
    className
  ].join(' ');

  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={classes}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}