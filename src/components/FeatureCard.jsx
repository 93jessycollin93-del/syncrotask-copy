import { cn } from '@/lib/utils';
import { Gamepad2, Globe, Layers, Terminal, Shield, Sparkles } from 'lucide-react';

const colorMap = {
  'neon-purple': {
    icon: 'text-neon-purple',
    bg: 'bg-neon-purple/10',
    border: 'border-neon-purple/20',
    hover: 'hover:border-neon-purple/50',
    glow: 'hover:shadow-[0_0_24px_rgba(139,92,246,0.15)]',
  },
  'neon-cyan': {
    icon: 'text-neon-cyan',
    bg: 'bg-neon-cyan/10',
    border: 'border-neon-cyan/20',
    hover: 'hover:border-neon-cyan/50',
    glow: 'hover:shadow-[0_0_24px_rgba(6,226,255,0.12)]',
  },
  'neon-pink': {
    icon: 'text-neon-pink',
    bg: 'bg-neon-pink/10',
    border: 'border-neon-pink/20',
    hover: 'hover:border-neon-pink/50',
    glow: 'hover:shadow-[0_0_24px_rgba(244,114,182,0.12)]',
  },
};

export default function FeatureCard({ icon: Icon, color, title, description, delay = 0 }) {
  const styles = colorMap[color] || colorMap['neon-purple'];

  return (
    <div
      className={cn(
        'p-6 rounded-2xl bg-surface-1 border transition-all duration-300 cursor-default group',
        styles.border,
        styles.hover,
        styles.glow,
        'hover:-translate-y-1'
      )}
    >
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-4', styles.bg)}>
        <Icon className={cn('w-5 h-5', styles.icon)} />
      </div>
      <h3 className="font-semibold text-foreground mb-2 text-base">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}