type Variant =
  | 'primary'
  | 'gold'
  | 'outline'
  | 'outlineLight'
  | 'ghost'
  | 'danger';

type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-500';

const variants: Record<Variant, string> = {
  primary:
    'bg-navy-950 text-white shadow-lg shadow-navy-950/20 hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-xl hover:shadow-navy-950/25 active:translate-y-0',
  gold:
    'bg-gold-400 text-navy-950 shadow-lg shadow-gold-600/20 hover:-translate-y-0.5 hover:bg-gold-300 hover:shadow-xl hover:shadow-gold-600/25 active:translate-y-0',
  outline:
    'border border-navy-200 bg-white text-navy-900 hover:border-navy-400 hover:bg-navy-50',
  outlineLight:
    'border border-white/25 bg-white/5 text-white backdrop-blur hover:border-gold-300/70 hover:bg-white/10',
  ghost:
    'text-navy-700 hover:bg-navy-50 hover:text-navy-950',
  danger:
    'bg-rose-600 text-white shadow-lg shadow-rose-600/20 hover:bg-rose-700 hover:shadow-xl',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-sm sm:text-base',
};

export function buttonClass(
  variant: Variant = 'primary',
  size: Size = 'md',
  extra = '',
): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}
