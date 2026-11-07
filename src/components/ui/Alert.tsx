import type { ReactNode } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
} from 'lucide-react';

type Kind = 'error' | 'success' | 'info' | 'warning';

const styles: Record<Kind, string> = {
  error: 'border-rose-200 bg-rose-50 text-rose-900',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  info: 'border-navy-200 bg-navy-50 text-navy-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
};

const iconStyles: Record<Kind, string> = {
  error: 'bg-rose-100 text-rose-600',
  success: 'bg-emerald-100 text-emerald-600',
  info: 'bg-navy-100 text-navy-600',
  warning: 'bg-amber-100 text-amber-600',
};

const icons = {
  error: AlertCircle,
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
};

export function Alert({
  kind = 'info',
  title,
  children,
  className = '',
}: {
  kind?: Kind;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const Icon = icons[kind];

  return (
    <div
      role={kind === 'error' ? 'alert' : 'status'}
      className={`flex items-start gap-3 rounded-2xl border p-4 ${styles[kind]} ${className}`}
    >
      <span
        className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ${iconStyles[kind]}`}
      >
        <Icon className="size-4" aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1 text-sm leading-relaxed">
        {title && <p className="font-semibold">{title}</p>}
        <div className={title ? 'mt-0.5 opacity-90' : ''}>{children}</div>
      </div>
    </div>
  );
}
