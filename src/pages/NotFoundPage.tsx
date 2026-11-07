import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

import { Logo } from '../components/brand/Logo';
import { buttonClass } from '../lib/styles';

export function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-navy-950">
      <img
        src="/campus.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/95 to-navy-900/80" />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative flex flex-1 flex-col px-6 py-6 sm:px-10">
        <Link to="/" aria-label="Beranda">
          <Logo variant="light" />
        </Link>

        <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
          <span className="flex size-16 items-center justify-center rounded-3xl border border-gold-400/25 bg-gold-400/10 text-gold-400">
            <Compass className="size-8" aria-hidden="true" />
          </span>

          <p className="mt-8 font-display text-[5rem] font-medium leading-none text-gradient-gold sm:text-[7rem]">
            404
          </p>

          <h1 className="mt-4 font-display text-2xl font-medium text-white sm:text-3xl">
            Halaman tidak ditemukan
          </h1>

          <p className="mt-3 max-w-md text-sm leading-7 text-navy-200/60">
            Tautan yang Anda tuju mungkin sudah dipindahkan atau tidak tersedia.
            Mari kembali ke beranda portal akademik.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/" className={buttonClass('gold', 'md')}>
              <ArrowLeft className="size-4" aria-hidden="true" />
              Kembali ke Beranda
            </Link>
            <Link to="/login" className={buttonClass('outlineLight', 'md')}>
              Masuk ke Portal
            </Link>
          </div>
        </div>

        <p className="text-center text-[0.65rem] text-white/35">
          Universitas Nusantara Cendekia · Portal Akademik
        </p>
      </div>
    </div>
  );
}
