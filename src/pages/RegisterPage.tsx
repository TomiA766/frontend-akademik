import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  UserRound,
} from 'lucide-react';

import { AuthShell } from '../components/layout/AuthShell';
import { Alert } from '../components/ui/Alert';
import { Field } from '../components/ui/Field';
import { PageLoader, Spinner } from '../components/ui/Spinner';
import { buttonClass } from '../lib/styles';
import {
  emailIsValid,
  passwordByteLength,
} from '../lib/format';
import { getApiErrorMessage } from '../lib/api-error';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export function RegisterPage() {
  const { user, initializing, register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <PageLoader label="Memeriksa sesi…" />
      </div>
    );
  }

  if (user) {
    return (
      <Navigate
        to={user.role === 'ADMIN' ? '/admin/dashboard' : '/'}
        replace
      />
    );
  }

  const passwordLongEnough = form.password.length >= 12;
  const passwordWithinLimit = passwordByteLength(form.password) <= 72;
  const passwordMatches =
    form.confirmPassword.length > 0 && form.password === form.confirmPassword;

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = 'Nama lengkap minimal 2 karakter';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email wajib diisi';
    } else if (!emailIsValid(form.email)) {
      nextErrors.email = 'Format email tidak valid';
    }

    if (!passwordLongEnough) {
      nextErrors.password = 'Password minimal 12 karakter';
    } else if (!passwordWithinLimit) {
      nextErrors.password = 'Password maksimal 72 byte';
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = 'Konfirmasi password tidak cocok';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError('');

    if (!validate()) return;

    setSubmitting(true);

    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      toast('Akun berhasil dibuat. Silakan masuk.', 'success');

      navigate('/login', {
        replace: true,
        state: {
          message:
            'Registrasi berhasil. Akun Anda sudah aktif — silakan masuk dengan email dan password yang baru dibuat.',
        },
      });
    } catch (error) {
      setServerError(getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const requirements = [
    { label: 'Minimal 12 karakter', met: passwordLongEnough },
    { label: 'Maksimal 72 byte', met: passwordWithinLimit },
    { label: 'Konfirmasi password cocok', met: passwordMatches },
  ];

  return (
    <AuthShell
      image="/library.jpg"
      imageAlt="Perpustakaan Universitas Nusantara Cendekia"
      eyebrow="Penerimaan Mahasiswa"
      title="Mulai perjalanan akademik Anda bersama kami."
      description="Buat akun portal akademik untuk mengakses layanan kampus, informasi akademik, dan seluruh kebutuhan studi Anda dalam satu platform."
    >
      <div className="animate-fade-up">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-600">
          Pendaftaran Akun
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
          Bergabung sekarang.
        </h1>
        <p className="mt-3 text-sm leading-6 text-navy-500">
          Lengkapi data di bawah untuk membuat akun akademik baru.
        </p>

        {serverError && (
          <Alert kind="error" className="mt-6">
            {serverError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
          <Field
            label="Nama Lengkap"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Nama sesuai identitas"
            icon={UserRound}
            value={form.name}
            error={errors.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
          />

          <Field
            label="Alamat Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nama@email.com"
            icon={Mail}
            value={form.email}
            error={errors.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
          />

          <Field
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Buat password yang kuat"
            icon={KeyRound}
            value={form.password}
            error={errors.password}
            onChange={(event) =>
              setForm((current) => ({ ...current, password: event.target.value }))
            }
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
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
            name="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Ulangi password Anda"
            icon={KeyRound}
            value={form.confirmPassword}
            error={errors.confirmPassword}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                confirmPassword: event.target.value,
              }))
            }
            trailing={
              <button
                type="button"
                onClick={() => setShowConfirm((visible) => !visible)}
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

          <div className="rounded-xl border border-navy-100 bg-navy-50/60 p-3.5">
            <div className="grid gap-2 sm:grid-cols-2">
              {requirements.map((requirement) => (
                <div
                  key={requirement.label}
                  className={`flex items-center gap-2 text-[0.68rem] font-medium ${
                    requirement.met ? 'text-emerald-700' : 'text-navy-400'
                  }`}
                >
                  <span
                    className={`flex size-4 items-center justify-center rounded-full border ${
                      requirement.met
                        ? 'border-emerald-200 bg-emerald-100'
                        : 'border-navy-200 bg-white'
                    }`}
                  >
                    {requirement.met && (
                      <Check className="size-2.5" aria-hidden="true" />
                    )}
                  </span>
                  {requirement.label}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={buttonClass('primary', 'lg', 'w-full')}
          >
            {submitting ? (
              <>
                <Spinner className="size-4" />
                Membuat akun…
              </>
            ) : (
              <>
                Daftar Sekarang
                <ArrowRight className="size-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <div className="mt-7 flex items-center gap-3">
          <span className="h-px flex-1 bg-navy-100" />
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-navy-300">
            Sudah punya akun?
          </span>
          <span className="h-px flex-1 bg-navy-100" />
        </div>

        <Link
          to="/login"
          className={buttonClass('outline', 'md', 'mt-5 w-full')}
        >
          Masuk ke Portal
        </Link>

        <p className="mt-6 text-center text-xs leading-6 text-navy-400">
          Password disimpan dalam bentuk hash terenkripsi dan tidak pernah
          ditampilkan kembali.
        </p>
      </div>
    </AuthShell>
  );
}
