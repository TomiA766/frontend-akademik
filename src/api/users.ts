import { api } from './client';
import type {
  ApiResponse,
  Pagination,
  Role,
  User,
  UserStats,
} from '../types';

export interface UserListQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: Role;
}

export interface UserListResult {
  users: User[];
  pagination: Pagination;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}

export const usersApi = {
  async list(query: UserListQuery = {}): Promise<UserListResult> {
    const response = await api.get<ApiResponse<User[]>>('/users', {
      params: {
        page: query.page,
        limit: query.limit,
        search: query.search || undefined,
        role: query.role || undefined,
      },
    });

    return {
      users: response.data.data,
      pagination:
        response.data.pagination ??
        ({
          page: 1,
          limit: 10,
          totalItems: response.data.data.length,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        } satisfies Pagination),
    };
  },

  async stats(): Promise<UserStats> {
    const response = await api.get<ApiResponse<UserStats>>('/users/stats');
    return response.data.data;
  },

  async get(id: string): Promise<User> {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data;
  },

  async create(payload: CreateUserPayload): Promise<User> {
    const response = await api.post<ApiResponse<User>>('/users', payload);
    return response.data.data;
  },

  async update(id: string, payload: UpdateUserPayload): Promise<User> {
    const response = await api.patch<ApiResponse<User>>(
      `/users/${id}`,
      payload,
    );
    return response.data.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
