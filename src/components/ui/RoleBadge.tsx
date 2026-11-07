import type { Role } from '../../types';
import { initials, roleLabel } from '../../lib/format';

const roleStyles: Record<Role, string> = {
  ADMIN: 'border-gold-300 bg-gold-50 text-gold-800',
  USER: 'border-navy-200 bg-navy-50 text-navy-700',
};

export function RoleBadge({ role }: { role: Role }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${roleStyles[role]}`}
    >
      <span
        className={`size-1.5 rounded-full ${
          role === 'ADMIN' ? 'bg-gold-500' : 'bg-navy-400'
        }`}
      />
      {roleLabel(role)}
    </span>
  );
}

const avatarPalette = [
  'bg-navy-900 text-gold-200',
  'bg-gold-100 text-gold-800',
  'bg-emerald-100 text-emerald-800',
  'bg-sky-100 text-sky-800',
  'bg-rose-100 text-rose-800',
  'bg-violet-100 text-violet-800',
];

function paletteFor(name: string): string {
  const index = Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return avatarPalette[index % avatarPalette.length]!;
}

export function Avatar({
  name,
  size = 'md',
  className = '',
}: {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const sizes = {
    sm: 'size-8 text-[0.65rem]',
    md: 'size-10 text-xs',
    lg: 'size-12 text-sm',
    xl: 'size-20 text-xl',
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl font-bold tracking-wide ${paletteFor(name)} ${sizes[size]} ${className}`}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
