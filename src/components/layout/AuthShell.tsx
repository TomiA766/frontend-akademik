import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ArrowLeft, BadgeCheck, LockKeyhole, ShieldCheck } from 'lucide-react';

import { Logo } from '../brand/Logo';

interface AuthShellProps {
  children: ReactNode;
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
}

export function AuthShell({
  children,
  image,
  imageAlt,
  eyebrow,
  title,
  description,
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-ivory lg:grid lg:grid-cols-[1.04fr_1fr]">
      <aside className="relative hidden min-h-screen overflow-hidden bg-navy-950 lg:flex lg:flex-col">
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/80 to-navy-900/40" />
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute -left-24 top-1/3 size-[420px] rounded-full bg-gold-500/10 blur-3xl" />

        <div className="relative flex h-full flex-col p-10 xl:p-14">
          <Link to="/" aria-label="Kembali ke beranda">
            <Logo variant="light" />
          </Link>

          <div className="mt-auto max-w-xl">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-400">
              {eyebrow}
            </p>

            <h1 className="mt-5 font-display text-[2.6rem] font-medium leading-[1.12] text-white xl:text-[3.1rem]">
              {title}
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-navy-100/80 xl:text-base">
              {description}
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: 'Akses aman' },
                { icon: LockKeyhole, label: 'Password terenkripsi' },
                { icon: BadgeCheck, label: 'Data terintegrasi' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass-card flex items-center gap-2.5 rounded-xl px-3.5 py-3 text-xs font-medium text-white/85"
                >
                  <item.icon className="size-4 shrink-0 text-gold-400" aria-hidden="true" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-12 border-t border-white/10 pt-5 text-xs text-white/45">
            Universitas Nusantara Cendekia · Portal Akademik Terpadu
          </p>
        </div>
      </aside>

      <main className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between px-5 py-5 sm:px-10">
          <Link to="/" className="lg:hidden" aria-label="Beranda">
            <Logo variant="dark" />
          </Link>

          <Link
            to="/"
            className="ml-auto inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-4 py-2 text-xs font-semibold text-navy-700 transition hover:border-navy-300 hover:bg-navy-50"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Kembali ke beranda
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 py-8 sm:px-10">
          <div className="w-full max-w-[430px]">{children}</div>
        </div>

        <div className="px-5 pb-6 text-center text-[0.68rem] leading-relaxed text-navy-400 sm:px-10">
          Dengan melanjutkan, Anda menyetujui kebijakan akademik dan perlindungan
          data Universitas Nusantara Cendekia.
        </div>
      </main>
    </div>
  );
}
