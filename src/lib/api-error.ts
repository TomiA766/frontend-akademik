import axios from 'axios';

interface ApiErrorBody {
  message?: string;
  errors?: Array<{ field?: string; message?: string }>;
}

/** Turns API errors into a message safe to show to the user. */
export function getApiErrorMessage(
  error: unknown,
  fallback = 'Terjadi kesalahan. Silakan coba lagi.',
): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorBody | undefined;

    if (data?.errors?.length) {
      return data.errors.map((item) => item.message).filter(Boolean).join(', ');
    }

    if (data?.message) {
      return data.message;
    }

    if (!error.response) {
      return 'Tidak dapat terhubung ke server. Pastikan backend berjalan.';
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
