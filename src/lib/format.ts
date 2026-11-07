export const formatDate = (
  value: string | Date,
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
): string => {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return '—';

  return new Intl.DateTimeFormat('id-ID', options).format(date);
};

export const formatDateTime = (value: string | Date): string =>
  formatDate(value, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export const initials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('') || '?';

export const firstName = (name: string): string =>
  name.trim().split(/\s+/)[0] ?? name;

export const passwordByteLength = (value: string): number =>
  new TextEncoder().encode(value).length;

export const emailIsValid = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const roleLabel = (role: string): string =>
  role === 'ADMIN' ? 'Administrator' : 'Pengguna';
