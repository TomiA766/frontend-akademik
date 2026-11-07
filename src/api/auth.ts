import { api } from './client';
import type { ApiResponse, LoginResult, User } from '../types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const authApi = {
  async login(payload: LoginPayload): Promise<LoginResult> {
    const response = await api.post<ApiResponse<LoginResult>>(
      '/auth/login',
      payload,
    );
    return response.data.data;
  },

  async register(payload: RegisterPayload): Promise<User> {
    const response = await api.post<ApiResponse<User>>(
      '/auth/register',
      payload,
    );
    return response.data.data;
  },

  async me(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },

  async logout(): Promise<void> {
    // Send an explicit JSON body so the API's requireJson guard accepts the
    // request; otherwise the server session would never be revoked.
    await api.post('/auth/logout', {});
  },
};
