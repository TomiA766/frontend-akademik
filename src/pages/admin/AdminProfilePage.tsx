import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BadgeCheck,
  CalendarDays,
  Eye,
  EyeOff,
  Fingerprint,
  KeyRound,
  Mail,
  Save,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

import { usersApi } from '../../api/users';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Avatar, RoleBadge } from '../../components/ui/RoleBadge';
import { Alert } from '../../components/ui/Alert';
import { Field } from '../../components/ui/Field';
import { Spinner } from '../../components/ui/Spinner';
import { buttonClass } from '../../lib/styles';
import {
  emailIsValid,
  formatDate,
  passwordByteLength,
  roleLabel,
} from '../../lib/format';
import { getApiErrorMessage } from '../../lib/api-error';

export function AdminProfilePage() {
  const { user, refreshUser, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({ name: '', email: '' });
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [profileError, setProfileError] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    password: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [passwordError, setPasswordError] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!user) return;
    setProfile({ name: user.name, email: user.email });
  }, [user]);

  if (!user) return null;

  const handleProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileError('');

    const nextErrors: Record<string, string> = {};
    const name = profile.name.trim();

    if (name.length < 2) {
      nextErrors.name = 'Nama minimal 2 karakter';
    } else if (name.length > 100) {
      nextErrors.name = 'Nama maksimal 100 karakter';
    }

    if (!profile.email.trim()) {
      nextErrors.email = 'Email wajib diisi';
    } else if (!emailIsValid(profile.email)) {
      nextErrors.email = 'Format email tidak valid';
    }

    setProfileErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSavingProfile(true);

    try {
      const updated = await usersApi.update(user.id, {
        name,
        email: profile.email.trim(),
      });

      await refreshUser();
      setProfile({ name: updated.name, email: updated.email });
      toast('Profil administrator berhasil diperbarui.', 'success');
    } catch (error) {
      setProfileError(getApiErrorMessage(error));
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordError('');

    const nextErrors: Record<string, string> = {};

    if (!passwordForm.password) {
      nextErrors.password = 'Password baru wajib diisi';
    } else if (passwordForm.password.length < 12) {
      nextErrors.password = 'Password minimal 12 karakter';
    } else if (passwordByteLength(passwordForm.password) > 72) {
      nextErrors.password = 'Password maksimal 72 byte';
    }

    if (!passwordForm.confirmPassword) {
      nextErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (passwordForm.password !== passwordForm.confirmPassword) {
      nextErrors.confirmPassword = 'Konfirmasi password tidak cocok';
    }

    setPasswordErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSavingPassword(true);

    try {
      await usersApi.update(user.id, {
        password: passwordForm.password,
      });

      toast(
        'Password berhasil diperbarui. Silakan masuk kembali dengan password baru.',
        'success',
      );

      // Changing the password revokes every session server-side.
      await logout();
      navigate('/login', {
        replace: true,
        state: {
          message:
            'Password berhasil diperbarui. Silakan masuk kembali menggunakan password baru Anda.',
        },
      });
    } catch (error) {
      setPasswordError(getApiErrorMessage(error));
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] space-y-5">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-navy-950 p-6 text-white shadow-lift sm:p-8">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-gold-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <Avatar
            name={user.name}
            size="xl"
            className="size-20 rounded-3xl text-2xl ring-4 ring-white/10 sm:size-24"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {user.name}
              </h2>
              <RoleBadge role={user.role} />
            </div>

            <p className="mt-1.5 truncate text-sm text-navy-200/70">{user.email}</p>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[0.68rem] text-navy-200/55">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3.5 text-gold-400" aria-hidden="true" />
                Bergabung {formatDate(user.createdAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-gold-400" aria-hidden="true" />
                {roleLabel(user.role)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="size-3.5 text-gold-400" aria-hidden="true" />
                Akun aktif
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/40">
              Akses
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-gold-300">
              Penuh
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
              <UserRound className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-navy-950">
                Informasi Pribadi
              </h3>
              <p className="text-xs text-navy-400">
                Nama dan email yang tampil di portal.
              </p>
            </div>
          </div>

          {profileError && (
            <Alert kind="error" className="mt-5">
              {profileError}
            </Alert>
          )}

          <form onSubmit={handleProfileSubmit} className="mt-5 space-y-4" noValidate>
            <Field
              label="Nama Lengkap"
              name="profile-name"
              type="text"
              autoComplete="name"
              icon={UserRound}
              value={profile.name}
              error={profileErrors.name}
              onChange={(event) =>
                setProfile((current) => ({ ...current, name: event.target.value }))
              }
            />

            <Field
              label="Alamat Email"
              name="profile-email"
              type="email"
              autoComplete="email"
              icon={Mail}
              value={profile.email}
              error={profileErrors.email}
              onChange={(event) =>
                setProfile((current) => ({ ...current, email: event.target.value }))
              }
            />

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={savingProfile}
                className={buttonClass('primary', 'md')}
              >
                {savingProfile ? (
                  <>
                    <Spinner className="size-4" />
                    Menyimpan…
                  </>
                ) : (
                  <>
                    <Save className="size-4" aria-hidden="true" />
                    Simpan Perubahan
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        <div className="space-y-5">
          <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                <KeyRound className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-navy-950">
                  Keamanan Akun
                </h3>
                <p className="text-xs text-navy-400">
                  Perbarui password secara berkala.
                </p>
              </div>
            </div>

            {passwordError && (
              <Alert kind="error" className="mt-5">
                {passwordError}
              </Alert>
            )}

            <form onSubmit={handlePasswordSubmit} className="mt-5 space-y-4" noValidate>
              <Field
                label="Password Baru"
                name="profile-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Minimal 12 karakter"
                icon={KeyRound}
                value={passwordForm.password}
                error={passwordErrors.password}
                onChange={(event) =>
                  setPasswordForm((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="flex size-9 items-center justify-center rounded-lg text-navy-400 transition hover:bg-navy-50 hover:text-navy-700"
                    aria-label={
                      showPassword ? 'Sembunyikan password' : 'Tampilkan password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-[18px]" aria-hidden="true" />
                    ) : (
                      <Eye className="size-[18px]" aria-hidden="true" />
                    )}
                  </button>
                }
              />

              <Field
                label="Konfirmasi Password"
                name="profile-confirm-password"
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Ulangi password baru"
                icon={KeyRound}
                value={passwordForm.confirmPassword}
                error={passwordErrors.confirmPassword}
                onChange={(event) =>
                  setPasswordForm((current) => ({
                    ...current,
                    confirmPassword: event.target.value,
                  }))
                }
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowConfirm((value) => !value)}
                    className="flex size-9 items-center justify-center rounded-lg text-navy-400 transition hover:bg-navy-50 hover:text-navy-700"
                    aria-label={
                      showConfirm ? 'Sembunyikan password' : 'Tampilkan password'
                    }
                  >
                    {showConfirm ? (
                      <EyeOff className="size-[18px]" aria-hidden="true" />
                    ) : (
                      <Eye className="size-[18px]" aria-hidden="true" />
                    )}
                  </button>
                }
              />

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={savingPassword}
                  className={buttonClass('gold', 'md')}
                >
                  {savingPassword ? (
                    <>
                      <Spinner className="size-4" />
                      Memperbarui…
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="size-4" aria-hidden="true" />
                      Perbarui Password
                    </>
                  )}
                </button>
              </div>
            </form>

            <p className="mt-3 text-[0.68rem] leading-relaxed text-navy-400">
              Mengubah password akan mengakhiri semua sesi aktif dan mengharuskan
              Anda masuk kembali.
            </p>
          </section>

          <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="font-display text-lg font-semibold text-navy-950">
              Detail Akun
            </h3>

            <dl className="mt-4 space-y-3">
              <div className="rounded-xl bg-navy-50/70 p-3.5">
                <dt className="flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                  <Fingerprint className="size-3.5" aria-hidden="true" />
                  ID Pengguna
                </dt>
                <dd className="mt-1 break-all font-mono text-[0.68rem] leading-relaxed text-navy-700">
                  {user.id}
                </dd>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-navy-50/70 p-3.5">
                  <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                    Peran
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-navy-900">
                    {roleLabel(user.role)}
                  </dd>
                </div>

                <div className="rounded-xl bg-navy-50/70 p-3.5">
                  <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                    Status
                  </dt>
                  <dd className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    Aktif
                  </dd>
                </div>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
