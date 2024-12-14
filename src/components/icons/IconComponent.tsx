import { FC } from 'react';
import * as Icons from 'lucide-react';
import { getIcon } from './IconMap';

interface IconProps {
  name: string;
  size?: number | string;
  className?: string;
}

export const IconComponent: FC<IconProps> = ({ name, size = 24, className = '' }) => {
  // First check if it's a mapped icon
  const MappedIcon = getIcon(name);
  if (MappedIcon) {
    return <MappedIcon size={size} className={className} />;
  }

  // Then check if it's a direct Lucide icon
  const Icon = (Icons as any)[name];
  if (Icon) {
    return <Icon size={size} className={className} />;
  }

  console.warn(`Icon "${name}" not found`);
  return null;
};