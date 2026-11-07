import { useCallback, useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  SearchX,
  Trash2,
  UserRound,
  Users,
  X,
} from 'lucide-react';

import { usersApi } from '../../api/users';
import type { Pagination, Role, User } from '../../types';
import { Avatar, RoleBadge } from '../../components/ui/RoleBadge';
import { Alert } from '../../components/ui/Alert';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Spinner } from '../../components/ui/Spinner';
import { UserFormModal } from '../../components/admin/UserFormModal';
import { buttonClass } from '../../lib/styles';
import { formatDate } from '../../lib/format';
import { getApiErrorMessage } from '../../lib/api-error';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const emptyPagination: Pagination = {
  page: 1,
  limit: 10,
  totalItems: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

export function UserManagementPage() {
  const { user: currentUser } = useAuth();
  const { toast } = useToast();

  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>(emptyPagination);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [role, setRole] = useState<'' | Role>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshToken, setRefreshToken] = useState(0);

  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      setLoading(true);
      setError('');

      try {
        const result = await usersApi.list({
          page,
          limit: 10,
          search: debouncedSearch,
          role: role || undefined,
        });

        if (!active) return;

        setUsers(result.users);
        setPagination(result.pagination);
      } catch (loadError) {
        if (active) setError(getApiErrorMessage(loadError));
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadUsers();

    return () => {
      active = false;
    };
  }, [page, debouncedSearch, role, refreshToken]);

  const reload = useCallback(() => {
    setRefreshToken((value) => value + 1);
  }, []);

  const openCreate = () => {
    setEditingUser(null);
    setFormOpen(true);
  };

  const openEdit = (user: User) => {
    setEditingUser(user);
    setFormOpen(true);
  };

  const handleSaved = () => {
    if (!editingUser) {
      setPage(1);
    }
    reload();
  };

  const handleDelete = async () => {
    if (!deletingUser) return;

    if (deletingUser.id === currentUser?.id) {
      toast('Anda tidak dapat menghapus akun sendiri.', 'error');
      return;
    }

    setDeleting(true);

    try {
      await usersApi.remove(deletingUser.id);
      toast(`Akun ${deletingUser.name} berhasil dihapus.`, 'success');
      setDeletingUser(null);

      if (users.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        reload();
      }
    } catch (deleteError) {
      toast(getApiErrorMessage(deleteError), 'error');
    } finally {
      setDeleting(false);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setRole('');
    setPage(1);
  };

  const startItem =
    pagination.totalItems === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const endItem = Math.min(
    pagination.page * pagination.limit,
    pagination.totalItems,
  );
  const filtersActive = Boolean(search.trim() || role);

  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <section className="flex flex-col gap-5 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3.5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-navy-950 text-gold-400">
            <Users className="size-6" aria-hidden="true" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-xl font-semibold text-navy-950">
                Direktori Pengguna
              </h2>
              <span className="rounded-full bg-gold-50 px-2.5 py-1 text-[0.62rem] font-semibold text-gold-700">
                {pagination.totalItems} akun
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-navy-400">
              Cari, perbarui, dan kelola akun yang tersimpan di PostgreSQL.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className={buttonClass('primary', 'md', 'shrink-0')}
        >
          <Plus className="size-4" aria-hidden="true" />
          Tambah Pengguna
        </button>
      </section>

      <section className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-navy-100 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            <div className="relative flex-1 lg:max-w-md">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-navy-300"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari nama atau email pengguna…"
                aria-label="Cari pengguna"
                className="h-11 w-full rounded-xl border border-navy-200 bg-white pl-10 pr-10 text-sm text-navy-950 outline-none transition placeholder:text-navy-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-100"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg text-navy-400 transition hover:bg-navy-50 hover:text-navy-700"
                  aria-label="Hapus pencarian"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <select
              value={role}
              onChange={(event) => {
                setRole(event.target.value as '' | Role);
                setPage(1);
              }}
              aria-label="Filter peran"
              className="h-11 rounded-xl border border-navy-200 bg-white px-3.5 text-sm text-navy-700 outline-none transition focus:border-gold-400 focus:ring-4 focus:ring-gold-100 sm:w-48"
            >
              <option value="">Semua peran</option>
              <option value="ADMIN">Administrator</option>
              <option value="USER">Pengguna reguler</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            {filtersActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-semibold text-gold-700 transition hover:text-gold-800"
              >
                Reset filter
              </button>
            )}

            <button
              type="button"
              onClick={reload}
              disabled={loading}
              className="inline-flex size-11 items-center justify-center rounded-xl border border-navy-200 text-navy-600 transition hover:bg-navy-50 disabled:opacity-50"
              aria-label="Muat ulang data"
              title="Muat ulang"
            >
              <RefreshCw
                className={`size-4 ${loading ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 sm:p-5">
            <Alert kind="error" title="Gagal memuat pengguna">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={reload}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-rose-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                >
                  <RefreshCw className="size-3.5" aria-hidden="true" />
                  Coba lagi
                </button>
              </div>
            </Alert>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left">
            <thead>
              <tr className="border-b border-navy-100 bg-navy-50/60 text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-navy-400">
                <th scope="col" className="px-5 py-3.5">
                  Pengguna
                </th>
                <th scope="col" className="px-4 py-3.5">
                  ID Pengguna
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Peran
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Terdaftar
                </th>
                <th scope="col" className="px-5 py-3.5 text-right">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-navy-50">
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="size-10 animate-pulse rounded-2xl bg-navy-100" />
                        <div className="space-y-2">
                          <span className="block h-3 w-36 animate-pulse rounded bg-navy-100" />
                          <span className="block h-2.5 w-48 animate-pulse rounded bg-navy-50" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="block h-3 w-28 animate-pulse rounded bg-navy-50" />
                    </td>
                    <td className="px-4 py-4">
                      <span className="block h-5 w-24 animate-pulse rounded-full bg-navy-50" />
                    </td>
                    <td className="px-4 py-4">
                      <span className="block h-3 w-24 animate-pulse rounded bg-navy-50" />
                    </td>
                    <td className="px-5 py-4">
                      <span className="ml-auto block h-8 w-16 animate-pulse rounded-full bg-navy-50" />
                    </td>
                  </tr>
                ))
              ) : users.length > 0 ? (
                users.map((item) => {
                  const isSelf = item.id === currentUser?.id;

                  return (
                    <tr
                      key={item.id}
                      className="group transition hover:bg-navy-50/40"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={item.name} size="md" />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="max-w-[220px] truncate text-sm font-semibold text-navy-950">
                                {item.name}
                              </p>
                              {isSelf && (
                                <span className="rounded-full bg-gold-50 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.1em] text-gold-700">
                                  Anda
                                </span>
                              )}
                            </div>
                            <p className="max-w-[240px] truncate text-xs text-navy-400">
                              {item.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <code
                          className="block max-w-[150px] break-all font-mono text-[0.62rem] leading-relaxed text-navy-400"
                          title={item.id}
                        >
                          {item.id}
                        </code>
                      </td>

                      <td className="px-4 py-4">
                        <RoleBadge role={item.role} />
                      </td>

                      <td className="px-4 py-4 text-xs text-navy-500">
                        {formatDate(item.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEdit(item)}
                            className="inline-flex size-9 items-center justify-center rounded-lg border border-navy-100 bg-white text-navy-500 transition hover:border-navy-300 hover:bg-navy-50 hover:text-navy-900"
                            aria-label={`Edit ${item.name}`}
                            title="Edit pengguna"
                          >
                            <Pencil className="size-4" aria-hidden="true" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeletingUser(item)}
                            disabled={isSelf}
                            className="inline-flex size-9 items-center justify-center rounded-lg border border-navy-100 bg-white text-navy-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:pointer-events-none disabled:opacity-35"
                            aria-label={
                              isSelf
                                ? 'Akun sendiri tidak dapat dihapus'
                                : `Hapus ${item.name}`
                            }
                            title={
                              isSelf
                                ? 'Anda tidak dapat menghapus akun sendiri'
                                : 'Hapus pengguna'
                            }
                          >
                            <Trash2 className="size-4" aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-16">
                    <div className="mx-auto flex max-w-sm flex-col items-center text-center">
                      <span className="flex size-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-300">
                        {filtersActive ? (
                          <SearchX className="size-7" aria-hidden="true" />
                        ) : (
                          <UserRound className="size-7" aria-hidden="true" />
                        )}
                      </span>
                      <p className="mt-4 text-sm font-semibold text-navy-900">
                        {filtersActive
                          ? 'Tidak ada pengguna yang cocok'
                          : 'Belum ada pengguna'}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-navy-400">
                        {filtersActive
                          ? 'Coba kata kunci atau filter peran yang berbeda.'
                          : 'Akun yang terdaftar akan muncul di sini.'}
                      </p>
                      {filtersActive && (
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="mt-4 text-xs font-semibold text-gold-700 hover:text-gold-800"
                        >
                          Reset filter
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-navy-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-navy-400">
            {pagination.totalItems === 0 ? (
              'Tidak ada data'
            ) : (
              <>
                Menampilkan{' '}
                <span className="font-semibold text-navy-700">
                  {startItem}–{endItem}
                </span>{' '}
                dari{' '}
                <span className="font-semibold text-navy-700">
                  {pagination.totalItems}
                </span>{' '}
                pengguna
              </>
            )}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={!pagination.hasPreviousPage || loading}
              className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-3.5 py-2 text-xs font-semibold text-navy-700 transition hover:bg-navy-50 disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronLeft className="size-3.5" aria-hidden="true" />
              Sebelumnya
            </button>

            <span className="rounded-full bg-navy-50 px-3 py-1.5 text-[0.68rem] font-semibold text-navy-600">
              {pagination.page} / {Math.max(1, pagination.totalPages)}
            </span>

            <button
              type="button"
              onClick={() => setPage((current) => current + 1)}
              disabled={!pagination.hasNextPage || loading}
              className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-3.5 py-2 text-xs font-semibold text-navy-700 transition hover:bg-navy-50 disabled:pointer-events-none disabled:opacity-40"
            >
              Berikutnya
              <ChevronRight className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <UserFormModal
        open={formOpen}
        user={editingUser}
        currentUserId={currentUser?.id ?? ''}
        onClose={() => setFormOpen(false)}
        onSaved={handleSaved}
      />

      <ConfirmDialog
        open={Boolean(deletingUser)}
        title="Hapus akun pengguna?"
        description="Tindakan ini permanen dan akan menghapus seluruh sesi aktif pengguna tersebut."
        confirmLabel={deleting ? 'Menghapus…' : 'Hapus Akun'}
        loading={deleting}
        onClose={() => {
          if (!deleting) setDeletingUser(null);
        }}
        onConfirm={() => void handleDelete()}
      >
        {deletingUser && (
          <div className="flex items-center gap-3 rounded-xl border border-navy-100 bg-white p-3">
            <Avatar name={deletingUser.name} size="md" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-navy-950">
                {deletingUser.name}
              </p>
              <p className="truncate text-xs text-navy-400">
                {deletingUser.email}
              </p>
            </div>
          </div>
        )}
      </ConfirmDialog>

      {loading && users.length > 0 && (
        <div className="flex items-center justify-center gap-2 pb-2 text-xs text-navy-400">
          <Spinner className="size-4" />
          Memuat data terbaru…
        </div>
      )}
    </div>
  );
}
