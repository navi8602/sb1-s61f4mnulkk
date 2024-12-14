export type IconSize = 'sm' | 'md' | 'lg';
export type IconVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';

export interface IconProps {
  name: IconName;
  size?: IconSize;
  variant?: IconVariant;
  className?: string;
}

export type IconName = 
  | 'activity'
  | 'alert'
  | 'arrowLeft'
  | 'arrowRight'
  | 'calendar'
  | 'check'
  | 'chevronDown'
  | 'chevronUp'
  | 'clock'
  | 'download'
  | 'edit'
  | 'leaf'
  | 'package'
  | 'plus'
  | 'settings'
  | 'trash'
  | 'user'
  | 'x';