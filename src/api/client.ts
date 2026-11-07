import axios from 'axios';

export const TOKEN_STORAGE_KEY = 'nuc.academic.token';
export const UNAUTHORIZED_EVENT = 'nuc:unauthorized';

/**
 * In development Vite proxies `/api` to the Express server, so relative URLs
 * work without CORS. In production set VITE_API_URL to the API origin.
 */
const baseURL = import.meta.env.VITE_API_URL ?? '/api/v1';

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const url = String(error?.config?.url ?? '');
    const isAuthAttempt =
      url.includes('/auth/login') || url.includes('/auth/register');

    if (status === 401 && !isAuthAttempt) {
      // The session expired or was revoked. AuthContext listens for this.
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }

    return Promise.reject(error);
  },
);

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const getStoredToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);
