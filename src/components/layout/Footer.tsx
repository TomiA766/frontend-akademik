import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

import { Logo } from '../brand/Logo';

const institutionLinks = [
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Akademik', href: '#akademik' },
  { label: 'Keunggulan', href: '#keunggulan' },
  { label: 'Penerimaan', href: '#penerimaan' },
];

const academicLinks = [
  { label: 'Portal Akademik', href: '/login' },
  { label: 'Pendaftaran Akun', href: '/register' },
  { label: 'Kalender Akademik', href: '#akademik' },
  { label: 'Layanan Mahasiswa', href: '#akademik' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -right-24 top-0 size-[420px] rounded-full bg-gold-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-sm leading-7 text-navy-200/80">
              Universitas Nusantara Cendekia berkomitmen menghasilkan lulusan
              yang berintegritas, inovatif, dan berdampak bagi masyarakat.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-400/10 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-300">
              Terakreditasi Unggul
            </div>
          </div>

          <div>
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-400">
              Institusi
            </h3>
            <ul className="mt-5 space-y-3">
              {institutionLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-navy-200/80 transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-400">
              Akademik
            </h3>
            <ul className="mt-5 space-y-3">
              {academicLinks.map((link) =>
                link.href.startsWith('/') ? (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-navy-200/80 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-navy-200/80 transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-400">
              Hubungi Kami
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-navy-200/80">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span>
                  Kampus Nusantara Cendekia
                  <br />
                  Jl. Cendekia Raya No. 18, Jakarta Selatan 12560
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span>+62 21 7890 1234</span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span>akademik@nusantaracendekia.ac.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-navy-300/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Universitas Nusantara Cendekia. Seluruh
            hak cipta dilindungi.
          </p>
          <p className="text-navy-300/50">
            Portal Akademik · Sistem Informasi Terintegrasi
          </p>
        </div>
      </div>
    </footer>
  );
}
