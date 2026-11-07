import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Database,
  GraduationCap,
  RefreshCw,
  ShieldCheck,
  UserPlus,
  Users,
} from 'lucide-react';

import { usersApi } from '../../api/users';
import type { User, UserStats } from '../../types';
import { Avatar, RoleBadge } from '../../components/ui/RoleBadge';
import { Alert } from '../../components/ui/Alert';
import { Spinner } from '../../components/ui/Spinner';
import { buttonClass } from '../../lib/styles';
import { firstName, formatDate, formatDateTime } from '../../lib/format';
import { getApiErrorMessage } from '../../lib/api-error';
import { useAuth } from '../../context/AuthContext';

interface DashboardData {
  stats: UserStats;
  latestUsers: User[];
}

const emptyStats: UserStats = {
  totalUsers: 0,
  totalAdmins: 0,
  totalRegularUsers: 0,
  newLast7Days: 0,
  newLast30Days: 0,
};

export function AdminDashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [stats, recent] = await Promise.all([
        usersApi.stats(),
        usersApi.list({ page: 1, limit: 5 }),
      ]);

      setData({ stats, latestUsers: recent.users });
    } catch (loadError) {
      setError(getApiErrorMessage(loadError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const stats = data?.stats ?? emptyStats;

  const cards = [
    {
      label: 'Total Pengguna',
      value: stats.totalUsers,
      note: `${stats.newLast30Days} baru dalam 30 hari`,
      icon: Users,
      accent: 'bg-navy-950 text-gold-400',
    },
    {
      label: 'Administrator',
      value: stats.totalAdmins,
      note: 'Akses penuh ke sistem',
      icon: ShieldCheck,
      accent: 'bg-gold-50 text-gold-700',
    },
    {
      label: 'Pengguna Reguler',
      value: stats.totalRegularUsers,
      note: 'Akun mahasiswa / pengguna',
      icon: GraduationCap,
      accent: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: 'Pendaftar Baru',
      value: stats.newLast7Days,
      note: '7 hari terakhir',
      icon: UserPlus,
      accent: 'bg-sky-50 text-sky-700',
    },
  ];

  const adminPercent =
    stats.totalUsers > 0
      ? Math.round((stats.totalAdmins / stats.totalUsers) * 100)
      : 0;

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {error && (
        <Alert kind="error" title="Gagal memuat data dashboard">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => void load()}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-rose-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
            >
              <RefreshCw className="size-3.5" aria-hidden="true" />
              Coba lagi
            </button>
          </div>
        </Alert>
      )}

      <section className="relative overflow-hidden rounded-[1.75rem] bg-navy-950 px-6 py-8 text-white shadow-lift sm:px-9 sm:py-10">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-35" />
        <div className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-gold-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold-400">
              {formatDate(new Date(), {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>

            <h2 className="mt-3 font-display text-[1.9rem] font-medium leading-tight sm:text-[2.4rem]">
              Selamat datang,{' '}
              <em className="text-gradient-gold not-italic">
                {user ? firstName(user.name) : 'Administrator'}.
              </em>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-navy-200/70">
              Pantau aktivitas akun dan kelola pengguna portal akademik dari
              satu dashboard terintegrasi.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Link to="/admin/users" className={buttonClass('gold', 'md')}>
              Kelola Pengguna
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link to="/" className={buttonClass('outlineLight', 'md')}>
              Lihat Situs
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Statistik pengguna">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-soft"
          >
            <div className="flex items-start justify-between">
              <span className={`flex size-11 items-center justify-center rounded-xl ${card.accent}`}>
                <card.icon className="size-5" aria-hidden="true" />
              </span>
              <span className="rounded-full bg-navy-50 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-navy-400">
                Live
              </span>
            </div>

            <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
              {card.label}
            </p>

            <div className="mt-1.5 flex items-end gap-2">
              {loading ? (
                <span className="h-9 w-16 animate-pulse rounded-lg bg-navy-100" />
              ) : (
                <p className="font-display text-3xl font-semibold text-navy-950">
                  {card.value.toLocaleString('id-ID')}
                </p>
              )}
            </div>

            <p className="mt-1.5 text-xs text-navy-400">{card.note}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-4 border-b border-navy-100 px-5 py-4 sm:px-6">
            <div>
              <h3 className="font-display text-lg font-semibold text-navy-950">
                Pendaftaran Terbaru
              </h3>
              <p className="mt-0.5 text-xs text-navy-400">
                5 akun terakhir yang terdaftar
              </p>
            </div>

            <Link
              to="/admin/users"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-700 transition hover:text-gold-800"
            >
              Semua pengguna
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="divide-y divide-navy-50">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3 px-5 py-4 sm:px-6">
                  <span className="size-10 animate-pulse rounded-2xl bg-navy-100" />
                  <div className="flex-1 space-y-2">
                    <span className="block h-3 w-40 animate-pulse rounded bg-navy-100" />
                    <span className="block h-2.5 w-56 animate-pulse rounded bg-navy-50" />
                  </div>
                </div>
              ))
            ) : data?.latestUsers.length ? (
              data.latestUsers.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 px-5 py-4 transition hover:bg-navy-50/40 sm:px-6"
                >
                  <Avatar name={item.name} size="md" />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-navy-950">
                      {item.name}
                    </p>
                    <p className="truncate text-xs text-navy-400">{item.email}</p>
                  </div>

                  <div className="hidden sm:block">
                    <RoleBadge role={item.role} />
                  </div>

                  <p className="hidden w-32 text-right text-[0.68rem] text-navy-400 lg:block">
                    {formatDateTime(item.createdAt)}
                  </p>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center text-sm text-navy-400">
                Belum ada pengguna terdaftar.
              </div>
            )}
          </div>
        </section>

        <div className="space-y-5">
          <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="font-display text-lg font-semibold text-navy-950">
              Distribusi Peran
            </h3>
            <p className="mt-0.5 text-xs text-navy-400">
              Berdasarkan data pengguna saat ini
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium text-navy-700">
                    <span className="size-2 rounded-full bg-navy-900" />
                    Pengguna reguler
                  </span>
                  <span className="font-semibold text-navy-950">
                    {stats.totalRegularUsers}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-navy-100">
                  <div
                    className="h-full rounded-full bg-navy-900 transition-all duration-700"
                    style={{
                      width: `${
                        stats.totalUsers > 0
                          ? Math.round(
                              (stats.totalRegularUsers / stats.totalUsers) * 100,
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium text-navy-700">
                    <span className="size-2 rounded-full bg-gold-400" />
                    Administrator
                  </span>
                  <span className="font-semibold text-navy-950">
                    {stats.totalAdmins}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gold-100">
                  <div
                    className="h-full rounded-full bg-gold-400 transition-all duration-700"
                    style={{ width: `${adminPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl bg-navy-50 px-4 py-3">
              <span className="text-xs font-medium text-navy-500">
                Total akun terdaftar
              </span>
              <span className="font-display text-lg font-semibold text-navy-950">
                {stats.totalUsers}
              </span>
            </div>
          </section>

          <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-navy-950">
                Status Sistem
              </h3>
              <Activity className="size-5 text-emerald-500" aria-hidden="true" />
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
                <span className="flex items-center gap-2 text-xs font-medium text-emerald-900">
                  <Database className="size-4 text-emerald-600" aria-hidden="true" />
                  PostgreSQL
                </span>
                <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold text-emerald-700">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Terhubung
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-navy-100 bg-navy-50/60 px-4 py-3">
                <span className="flex items-center gap-2 text-xs font-medium text-navy-700">
                  <ShieldCheck className="size-4 text-navy-500" aria-hidden="true" />
                  Sesi administrator
                </span>
                <span className="text-[0.65rem] font-semibold text-navy-600">
                  Aktif
                </span>
              </div>
            </div>

            <div className="mt-4 text-[0.68rem] leading-relaxed text-navy-400">
              Status koneksi mengikuti hasil permintaan data terakhir ke API
              akademik.
            </div>
          </section>
        </div>
      </div>

      <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:px-6">
        <div>
          <h3 className="text-sm font-semibold text-navy-950">
            Butuh menambah akun baru?
          </h3>
          <p className="mt-1 text-xs text-navy-400">
            Buat akun pengguna atau administrator langsung dari menu manajemen.
          </p>
        </div>

        <Link to="/admin/users" className={buttonClass('primary', 'sm')}>
          <UserPlus className="size-4" aria-hidden="true" />
          Tambah Pengguna
        </Link>
      </section>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-2 text-xs text-navy-400">
          <Spinner className="size-4" />
          Menyinkronkan data…
        </div>
      )}
    </div>
  );
}
