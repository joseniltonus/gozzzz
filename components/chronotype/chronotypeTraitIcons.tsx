import type { TraitIconKey } from '@/data/chronotypesExperience';
import {
  Brain,
  Moon,
  Zap,
  Sun,
  Clock,
  Users,
  Sunrise,
  Target,
  Check,
  Sparkles,
  Leaf,
  Wind,
} from 'lucide-react-native';

const MAP: Record<TraitIconKey, typeof Brain> = {
  brain: Brain,
  moon: Moon,
  bolt: Zap,
  sun: Sun,
  clock: Clock,
  users: Users,
  sunrise: Sunrise,
  target: Target,
  check: Check,
  sparkles: Sparkles,
  leaf: Leaf,
  meditation: Wind,
};

export function TraitGlyph({ name, color, size = 22 }: { name: TraitIconKey; color: string; size?: number }) {
  const I = MAP[name];
  return <I size={size} color={color} strokeWidth={2.2} />;
}
