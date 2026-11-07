import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
} from 'lucide-react';

import { AuthShell } from '../components/layout/AuthShell';
import { Alert } from '../components/ui/Alert';
import { Field } from '../components/ui/Field';
import { PageLoader, Spinner } from '../components/ui/Spinner';
import { buttonClass } from '../lib/styles';
import { emailIsValid } from '../lib/format';
import { getApiErrorMessage } from '../lib/api-error';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface LocationState {
  from?: string;
  message?: string;
}

const ADMIN_DASHBOARD = '/admin/dashboard';

function adminDestination(from?: string): string {
  if (from?.startsWith('/admin') && from !== '/admin' && from !== '/admin/') {
    return from;
  }

  return ADMIN_DASHBOARD;
}

export function LoginPage() {
  const { user, initializing, login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as LocationState;

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <PageLoader label="Memeriksa sesi…" />
      </div>
    );
  }

  if (user) {
    const destination =
      user.role === 'ADMIN' ? adminDestination(state.from) : '/';

    return <Navigate to={destination} replace />;
  }

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.email.trim()) {
      nextErrors.email = 'Email wajib diisi';
    } else if (!emailIsValid(form.email)) {
      nextErrors.email = 'Format email tidak valid';
    }

    if (!form.password) {
      nextErrors.password = 'Password wajib diisi';
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
      const loggedInUser = await login({
        email: form.email.trim(),
        password: form.password,
      });

      toast(`Selamat datang, ${loggedInUser.name}!`, 'success');

      const destination =
        loggedInUser.role === 'ADMIN'
          ? adminDestination(state.from)
          : '/';

      navigate(destination, { replace: true });
    } catch (error) {
      setServerError(getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      image="/campus.jpg"
      imageAlt="Kampus Universitas Nusantara Cendekia"
      eyebrow="Portal Akademik"
      title="Selamat datang kembali di ruang belajar Anda."
      description="Masuk untuk mengakses layanan akademik, mengelola profil, dan melanjutkan perjalanan pendidikan Anda di Universitas Nusantara Cendekia."
    >
      <div className="animate-fade-up">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-600">
          Masuk ke Portal
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
          Selamat datang.
        </h1>
        <p className="mt-3 text-sm leading-6 text-navy-500">
          Gunakan email dan password akun akademik Anda.
        </p>

        {state.message && (
          <Alert kind="success" className="mt-6">
            {state.message}
          </Alert>
        )}

        {serverError && (
          <Alert kind="error" className="mt-6">
            {serverError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
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
            autoComplete="current-password"
            placeholder="Masukkan password Anda"
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

          <button
            type="submit"
            disabled={submitting}
            className={buttonClass('primary', 'lg', 'w-full')}
          >
            {submitting ? (
              <>
                <Spinner className="size-4" />
                Memverifikasi…
              </>
            ) : (
              <>
                Masuk ke Portal
                <ArrowRight className="size-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <div className="mt-7 flex items-center gap-3">
          <span className="h-px flex-1 bg-navy-100" />
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-navy-300">
            Belum memiliki akun?
          </span>
          <span className="h-px flex-1 bg-navy-100" />
        </div>

        <Link
          to="/register"
          className={buttonClass('outline', 'md', 'mt-5 w-full')}
        >
          Daftar Akun Baru
        </Link>

        <p className="mt-6 text-center text-xs leading-6 text-navy-400">
          Dengan masuk, Anda menyetujui ketentuan penggunaan portal akademik.
          <br />
          Akun administrator akan diarahkan ke dashboard secara otomatis.
        </p>
      </div>
    </AuthShell>
  );
}
