import type { SVGProps } from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  compact?: boolean;
  className?: string;
}

function Crest({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 5 55 14.5v19.2c0 11.9-9.2 21.1-23 26.3C18.2 54.8 9 45.6 9 33.7V14.5L32 5Z"
        stroke="currentColor"
        strokeWidth="2"
        className="text-gold-400"
      />
      <path
        d="M32 10.5 50.5 18v15.7c0 9.6-7.4 17.1-18.5 21.6-11.1-4.5-18.5-12-18.5-21.6V18L32 10.5Z"
        stroke="currentColor"
        strokeWidth="0.75"
        className="text-gold-400/40"
      />
      <path
        d="M20 29.5h24M24 38h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-gold-400"
      />
      <path
        d="M32 21v20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        className="text-white"
      />
      <circle cx="32" cy="18.5" r="2.2" className="fill-gold-400" />
    </svg>
  );
}

export function Logo({ variant = 'dark', compact = false, className = '' }: LogoProps) {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="relative flex size-11 shrink-0 items-center justify-center rounded-2xl bg-navy-950 shadow-lg ring-1 ring-gold-500/30">
        <Crest className="size-9" />
      </span>

      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-[1.05rem] font-semibold tracking-tight ${
              isLight ? 'text-white' : 'text-navy-950'
            }`}
          >
            Nusantara Cendekia
          </span>
          <span className="mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-gold-500">
            Academic Portal
          </span>
        </span>
      )}
    </div>
  );
}

export function CrestMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M32 5 55 14.5v19.2c0 11.9-9.2 21.1-23 26.3C18.2 54.8 9 45.6 9 33.7V14.5L32 5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M20 29.5h24M24 38h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M32 21v20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="32" cy="18.5" r="2.2" fill="currentColor" />
    </svg>
  );
}
