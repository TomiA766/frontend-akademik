import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  UserCog,
  Users,
  X,
} from 'lucide-react';

import { Logo } from '../brand/Logo';
import { Avatar } from '../ui/RoleBadge';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const navigation = [
  {
    to: '/admin/dashboard',
    label: 'Dashboard',
    description: 'Ringkasan akademik',
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: '/admin/users',
    label: 'Manajemen Pengguna',
    description: 'Kelola akun portal',
    icon: Users,
    end: false,
  },
  {
    to: '/admin/profile',
    label: 'Profil Administrator',
    description: 'Informasi akun',
    icon: UserCog,
    end: false,
  },
];

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/admin': {
    title: 'Dashboard',
    subtitle: 'Ringkasan aktivitas portal akademik',
  },
  '/admin/dashboard': {
    title: 'Dashboard',
    subtitle: 'Ringkasan aktivitas portal akademik',
  },
  '/admin/users': {
    title: 'Manajemen Pengguna',
    subtitle: 'Kelola akun mahasiswa dan administrator',
  },
  '/admin/profile': {
    title: 'Profil Administrator',
    subtitle: 'Informasi dan keamanan akun Anda',
  },
};

export function AdminLayout() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (!user) return null;

  const page = pageTitles[location.pathname] ?? pageTitles['/admin']!;

  const handleLogout = async () => {
    await logout();
    toast('Anda telah keluar dari dashboard administrator.', 'info');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f3f3ef]">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-navy-950/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Tutup sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[276px] flex-col bg-navy-950 text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-white/8 px-6">
          <Link to="/admin/dashboard" aria-label="Dashboard administrator">
            <Logo variant="light" />
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Tutup sidebar"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 pt-6">
          <div className="flex items-center gap-2.5 rounded-xl border border-gold-400/20 bg-gold-400/8 px-3.5 py-2.5">
            <ShieldCheck className="size-4 text-gold-400" aria-hidden="true" />
            <div>
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-gold-300">
                Administrator
              </p>
              <p className="mt-0.5 text-[0.68rem] text-white/45">Akses penuh</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 flex-1 space-y-1.5 overflow-y-auto px-4" aria-label="Navigasi admin">
          <p className="px-3 pb-2 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-white/30">
            Menu Utama
          </p>

          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-3 transition ${
                  isActive
                    ? 'bg-white/10 text-white shadow-inner'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition ${
                      isActive
                        ? 'bg-gold-400 text-navy-950'
                        : 'bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white'
                    }`}
                  >
                    <item.icon className="size-[18px]" aria-hidden="true" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.82rem] font-semibold">
                      {item.label}
                    </span>
                    <span
                      className={`mt-0.5 block text-[0.62rem] ${
                        isActive ? 'text-white/45' : 'text-white/30'
                      }`}
                    >
                      {item.description}
                    </span>
                  </span>

                  {isActive && (
                    <ChevronRight className="size-4 text-gold-400" aria-hidden="true" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/8 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <Avatar name={user.name} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {user.name}
              </p>
              <p className="truncate text-[0.65rem] text-white/45">{user.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-semibold text-white/65 transition hover:border-rose-400/30 hover:bg-rose-500/10 hover:text-rose-200"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Keluar dari Akun
          </button>
        </div>
      </aside>

      <div className="lg:pl-[276px]">
        <header className="sticky top-0 z-30 border-b border-navy-100/80 bg-white/85 backdrop-blur-xl">
          <div className="flex h-[76px] items-center justify-between gap-4 px-5 sm:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="flex size-10 items-center justify-center rounded-xl border border-navy-200 text-navy-700 transition hover:bg-navy-50 lg:hidden"
                aria-label="Buka sidebar"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>

              <div>
                <h1 className="font-display text-lg font-semibold text-navy-950 sm:text-xl">
                  {page.title}
                </h1>
                <p className="hidden text-xs text-navy-400 sm:block">
                  {page.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                to="/"
                className="hidden items-center gap-1.5 rounded-full border border-navy-200 bg-white px-3.5 py-2 text-[0.68rem] font-semibold text-navy-600 transition hover:border-navy-300 hover:bg-navy-50 sm:inline-flex"
              >
                Lihat Situs
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </Link>

              <div className="h-8 w-px bg-navy-100" />

              <div className="flex items-center gap-2.5">
                <Avatar name={user.name} size="sm" />
                <div className="hidden leading-tight sm:block">
                  <p className="max-w-[150px] truncate text-xs font-semibold text-navy-950">
                    {user.name}
                  </p>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-gold-600">
                    Administrator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-5 py-7 sm:px-8 sm:py-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
