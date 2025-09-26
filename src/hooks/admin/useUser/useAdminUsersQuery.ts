"use client";

import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/admin/users/userService";
import type { User } from "@/lib/types";
import { ApiListResponse } from "@/types/api";

/**
 * Parameters for the admin users query
 */
export interface UseAdminUsersQueryParams {
  readonly page?: number;
  readonly pageSize?: number;
  readonly search?: string;
  readonly role?: string;
  readonly status?: string;
  readonly dateFrom?: string;
  readonly dateTo?: string;
}

/**
 * Response structure for admin users query
 */
export interface UseAdminUsersQueryResponse {
  readonly data: ApiListResponse<User> | null;
  readonly users: User[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
}

/**
 * Hook for fetching admin users with pagination and filtering
 *
 * @param params - Query parameters
 * @returns Query result with users data
 */
export const useAdminUsersQuery = (params: UseAdminUsersQueryParams) => {
  const {
    page = 1,
    pageSize = 10,
    search = "",
    role = "",
    status = "",
    dateFrom = "",
    dateTo = "",
  } = params;

  return useQuery<ApiListResponse<User>, Error, UseAdminUsersQueryResponse>({
    queryKey: [
      "admin-users",
      page,
      pageSize,
      search,
      role,
      status,
      dateFrom,
      dateTo,
    ],
    queryFn: async (): Promise<ApiListResponse<User>> => {
      return await userService.getUsers({
        page,
        pageSize,
        search,
        role,
        status,
        dateFrom,
        dateTo,
      });
    },
    select: (data): UseAdminUsersQueryResponse => {
      return {
        data,
        users: data?.data || [],
        total: data?.pagination?.total || 0,
        page: data?.pagination?.page || page,
        pageSize: data?.pagination?.pageSize || pageSize,
        totalPages: data?.pagination?.totalPages || 0,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
