import { LoaderCircle } from 'lucide-react';

export function Spinner({
  className = 'size-5',
  label = 'Memuat',
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span role="status" aria-label={label} className="inline-flex">
      <LoaderCircle
        className={`animate-spin ${className}`}
        aria-hidden="true"
      />
    </span>
  );
}

export function PageLoader({ label = 'Memuat data akademik…' }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <span className="relative flex size-14 items-center justify-center rounded-2xl bg-navy-950 ring-1 ring-gold-400/30">
        <LoaderCircle className="size-7 animate-spin text-gold-400" aria-hidden="true" />
      </span>
      <p className="text-sm font-medium text-navy-600">{label}</p>
    </div>
  );
}
