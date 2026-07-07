export type Accent = 'cyan' | 'magenta' | 'violet' | 'gold'

export const accentText: Record<Accent, string> = {
  cyan: 'text-cyan',
  magenta: 'text-magenta',
  violet: 'text-violet',
  gold: 'text-gold',
}

export const accentBorder: Record<Accent, string> = {
  cyan: 'hover:border-cyan/50',
  magenta: 'hover:border-magenta/50',
  violet: 'hover:border-violet/50',
  gold: 'hover:border-gold/50',
}

export const accentDot: Record<Accent, string> = {
  cyan: 'bg-cyan',
  magenta: 'bg-magenta',
  violet: 'bg-violet',
  gold: 'bg-gold',
}
