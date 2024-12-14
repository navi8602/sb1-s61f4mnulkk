import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bell,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Edit,
  FlaskConical,
  Leaf,
  Package,
  Plus,
  Settings,
  Trash,
  User,
  X
} from 'lucide-react';
import type { IconName } from './types';

// Map all icons including aliases and replacements
export const IconMap = {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bell,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Edit,
  Flask: FlaskConical,
  Leaf,
  Package,
  Plant: Leaf,
  Plus,
  Seedling: Leaf,
  Settings,
  Sprout: Leaf,
  Trash,
  User,
  X
} as const;

export function getIcon(name: IconName) {
  return IconMap[name] || null;
}