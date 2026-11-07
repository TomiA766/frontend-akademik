import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

import { Logo } from '../brand/Logo';
import { Avatar } from '../ui/RoleBadge';
import { buttonClass } from '../../lib/styles';
import { firstName } from '../../lib/format';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const links = [
  { href: '#tentang', label: 'Tentang' },
  { href: '#akademik', label: 'Akademik' },
  { href: '#keunggulan', label: 'Keunggulan' },
  { href: '#penerimaan', label: 'Penerimaan' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [mobileOpen]);

  const handleLogout = async () => {
    setMobileOpen(false);
    await logout();
    toast('Anda telah keluar dari portal akademik.', 'info');
    navigate('/');
  };

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'border-b border-navy-100 bg-white/95 shadow-sm backdrop-blur-xl'
          : 'bg-gradient-to-b from-navy-950/65 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link to="/" aria-label="Beranda Universitas Nusantara Cendekia">
          <Logo variant={solid ? 'dark' : 'light'} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigasi utama">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`group relative text-[0.82rem] font-medium tracking-wide transition ${
                solid
                  ? 'text-navy-700 hover:text-navy-950'
                  : 'text-white/85 hover:text-white'
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <div className="flex items-center gap-2.5">
                <Avatar name={user.name} size="sm" />
                <div className="leading-tight">
                  <p
                    className={`text-[0.6rem] font-semibold uppercase tracking-[0.16em] ${
                      solid ? 'text-navy-400' : 'text-white/55'
                    }`}
                  >
                    {user.role === 'ADMIN' ? 'Administrator' : 'Pengguna'}
                  </p>
                  <p
                    className={`max-w-[130px] truncate text-sm font-semibold ${
                      solid ? 'text-navy-950' : 'text-white'
                    }`}
                  >
                    {firstName(user.name)}
                  </p>
                </div>
              </div>

              <Link
                to={user.role === 'ADMIN' ? '/admin/dashboard' : '/'}
                className={buttonClass(
                  solid ? 'primary' : 'outlineLight',
                  'sm',
                )}
              >
                <LayoutDashboard className="size-4" aria-hidden="true" />
                {user.role === 'ADMIN' ? 'Dashboard' : 'Beranda'}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className={`inline-flex size-9 items-center justify-center rounded-full border transition ${
                  solid
                    ? 'border-navy-200 text-navy-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600'
                    : 'border-white/20 text-white/80 hover:border-white/40 hover:bg-white/10 hover:text-white'
                }`}
                aria-label="Keluar dari akun"
                title="Logout"
              >
                <LogOut className="size-4" aria-hidden="true" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`px-4 py-2 text-sm font-semibold transition ${
                  solid
                    ? 'text-navy-700 hover:text-navy-950'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                Masuk
              </Link>
              <Link to="/register" className={buttonClass('gold', 'sm')}>
                Daftar Sekarang
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className={`inline-flex size-11 items-center justify-center rounded-xl border transition lg:hidden ${
            solid
              ? 'border-navy-200 text-navy-900 hover:bg-navy-50'
              : 'border-white/25 text-white hover:bg-white/10'
          }`}
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="animate-fade-in border-t border-navy-100 bg-white px-5 pb-6 pt-4 shadow-xl lg:hidden">
          <nav className="flex flex-col" aria-label="Navigasi mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-navy-50 py-3.5 text-sm font-medium text-navy-700 transition hover:text-navy-950"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-5 flex flex-col gap-2.5">
            {user ? (
              <>
                <div className="mb-1 flex items-center gap-3 rounded-2xl bg-navy-50 p-3">
                  <Avatar name={user.name} size="md" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-navy-950">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-navy-500">{user.email}</p>
                  </div>
                </div>

                <Link
                  to={user.role === 'ADMIN' ? '/admin/dashboard' : '/'}
                  onClick={() => setMobileOpen(false)}
                  className={buttonClass('primary', 'md')}
                >
                  <LayoutDashboard className="size-4" aria-hidden="true" />
                  {user.role === 'ADMIN' ? 'Buka Dashboard' : 'Beranda'}
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-5 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                >
                  <LogOut className="size-4" aria-hidden="true" />
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className={buttonClass('outline', 'md')}
                >
                  Masuk ke Portal
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className={buttonClass('gold', 'md')}
                >
                  Daftar Sekarang
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
