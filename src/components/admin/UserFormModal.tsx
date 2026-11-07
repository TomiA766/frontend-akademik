import { useEffect, useState } from 'react';
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';

import type { Role, User } from '../../types';
import { usersApi } from '../../api/users';
import { Modal } from '../ui/Modal';
import { Field, SelectField } from '../ui/Field';
import { Alert } from '../ui/Alert';
import { Spinner } from '../ui/Spinner';
import { buttonClass } from '../../lib/styles';
import {
  emailIsValid,
  passwordByteLength,
} from '../../lib/format';
import { getApiErrorMessage } from '../../lib/api-error';
import { useToast } from '../../context/ToastContext';

interface UserFormModalProps {
  open: boolean;
  user: User | null;
  currentUserId: string;
  onClose: () => void;
  onSaved: () => void;
}

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function UserFormModal({
  open,
  user,
  currentUserId,
  onClose,
  onSaved,
}: UserFormModalProps) {
  const { toast } = useToast();
  const isEdit = Boolean(user);
  const isSelf = user?.id === currentUserId;

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [role, setRole] = useState<Role>('USER');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!open) return;

    setForm({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
      confirmPassword: '',
    });
    setRole(user?.role ?? 'USER');
    setErrors({});
    setServerError('');
    setShowPassword(false);
    setShowConfirm(false);
  }, [open, user]);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    const trimmedName = form.name.trim();

    if (trimmedName.length < 2) {
      nextErrors.name = 'Nama minimal 2 karakter';
    } else if (trimmedName.length > 100) {
      nextErrors.name = 'Nama maksimal 100 karakter';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email wajib diisi';
    } else if (!emailIsValid(form.email)) {
      nextErrors.email = 'Format email tidak valid';
    }

    const passwordTouched = form.password.length > 0 || form.confirmPassword.length > 0;

    if (!isEdit && !form.password) {
      nextErrors.password = 'Password wajib diisi';
    } else if (form.password) {
      if (form.password.length < 12) {
        nextErrors.password = 'Password minimal 12 karakter';
      } else if (passwordByteLength(form.password) > 72) {
        nextErrors.password = 'Password maksimal 72 byte';
      }
    }

    if (passwordTouched) {
      if (!form.confirmPassword) {
        nextErrors.confirmPassword = 'Konfirmasi password wajib diisi';
      } else if (form.password !== form.confirmPassword) {
        nextErrors.confirmPassword = 'Konfirmasi password tidak cocok';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError('');

    if (!validate()) return;

    setSaving(true);

    try {
      if (isEdit && user) {
        await usersApi.update(user.id, {
          name: form.name.trim(),
          email: form.email.trim(),
          ...(form.password ? { password: form.password } : {}),
          ...(role !== user.role && !isSelf ? { role } : {}),
        });

        toast(`Data ${form.name.trim()} berhasil diperbarui.`, 'success');
      } else {
        await usersApi.create({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          role,
        });

        toast(`Akun ${form.name.trim()} berhasil dibuat.`, 'success');
      }

      onSaved();
      onClose();
    } catch (error) {
      setServerError(getApiErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const passwordToggle = (
    visible: boolean,
    onToggle: () => void,
    label: string,
  ) => (
    <button
      type="button"
      onClick={onToggle}
      className="flex size-9 items-center justify-center rounded-lg text-navy-400 transition hover:bg-navy-50 hover:text-navy-700"
      aria-label={label}
    >
      {visible ? (
        <EyeOff className="size-[18px]" aria-hidden="true" />
      ) : (
        <Eye className="size-[18px]" aria-hidden="true" />
      )}
    </button>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit Pengguna' : 'Tambah Pengguna'}
      description={
        isEdit
          ? 'Perbarui informasi akun. Biarkan kolom password kosong jika tidak ingin mengubahnya.'
          : 'Buat akun baru dengan peran yang sesuai. Password akan disimpan sebagai hash.'
      }
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-full border border-navy-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-800 transition hover:bg-navy-50 disabled:opacity-60"
          >
            Batal
          </button>
          <button
            type="submit"
            form="user-form"
            disabled={saving}
            className={buttonClass('primary', 'md')}
          >
            {saving ? (
              <>
                <Spinner className="size-4" />
                Menyimpan…
              </>
            ) : isEdit ? (
              'Simpan Perubahan'
            ) : (
              'Buat Akun'
            )}
          </button>
        </div>
      }
    >
      {serverError && (
        <Alert kind="error" className="mb-5">
          {serverError}
        </Alert>
      )}

      {isSelf && (
        <Alert kind="info" className="mb-5">
          Anda sedang mengedit akun sendiri. Peran administrator tidak dapat
          diturunkan untuk mencegah kehilangan akses.
        </Alert>
      )}

      <form id="user-form" onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Field
          label="Nama Lengkap"
          name="name"
          type="text"
          placeholder="Nama lengkap pengguna"
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
          placeholder="nama@email.com"
          icon={Mail}
          value={form.email}
          error={errors.email}
          onChange={(event) =>
            setForm((current) => ({ ...current, email: event.target.value }))
          }
        />

        <SelectField
          label="Peran Akun"
          name="role"
          value={role}
          onChange={(value) => setRole(value as Role)}
          disabled={isSelf}
          options={[
            { value: 'USER', label: 'Pengguna reguler' },
            { value: 'ADMIN', label: 'Administrator' },
          ]}
          hint={
            isSelf
              ? 'Peran akun sendiri tidak dapat diubah dari menu ini.'
              : 'Administrator dapat mengakses dashboard dan mengelola pengguna.'
          }
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label={isEdit ? 'Password Baru' : 'Password'}
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder={isEdit ? 'Kosongkan jika tetap' : 'Minimal 12 karakter'}
            icon={LockKeyhole}
            value={form.password}
            error={errors.password}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            trailing={passwordToggle(
              showPassword,
              () => setShowPassword((value) => !value),
              showPassword ? 'Sembunyikan password' : 'Tampilkan password',
            )}
          />

          <Field
            label="Konfirmasi Password"
            name="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Ulangi password"
            icon={LockKeyhole}
            value={form.confirmPassword}
            error={errors.confirmPassword}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                confirmPassword: event.target.value,
              }))
            }
            trailing={passwordToggle(
              showConfirm,
              () => setShowConfirm((value) => !value),
              showConfirm ? 'Sembunyikan password' : 'Tampilkan password',
            )}
          />
        </div>

        <p className="text-[0.68rem] leading-relaxed text-navy-400">
          Password minimal 12 karakter dan maksimal 72 byte. Password tidak
          pernah ditampilkan atau dikembalikan oleh API.
        </p>
      </form>
    </Modal>
  );
}
