export type Role = 'USER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface UserStats {
  totalUsers: number;
  totalAdmins: number;
  totalRegularUsers: number;
  newLast7Days: number;
  newLast30Days: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  pagination?: Pagination;
}

export interface LoginResult {
  token: string;
  expiresAt: string;
  user: User;
}
