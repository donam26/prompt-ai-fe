/**
 * Admin users query hook
 */

import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/users/userService";

import { queryKeys } from "@/types/shared/types";

export interface UseAdminUsersQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  role?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface UseAdminUsersQueryResult {
  data: any;
  isLoading: boolean;
  error: any;
  refetch: () => void;
  totalPages: number;
  totalItems: number;
}

/**
 * Hook for fetching admin users with pagination and filters
 *
 * @param params - Query parameters
 * @returns Users query result
 */
export const useAdminUsersQuery = (
  params?: UseAdminUsersQueryParams
): UseAdminUsersQueryResult => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [...queryKeys.admin.users, params],
    queryFn: () =>
      userService.getUsersPage({
        page: params?.page || 1,
        pageSize: params?.pageSize || 10,
        search: params?.search || "",
        role: params?.role || "all",
        status: params?.status || "all",
        dateFrom: params?.dateFrom || "",
        dateTo: params?.dateTo || "",
      }),
    enabled: true,
  });

  const totalItems = data?.total || 0;
  const currentPageSize = params?.pageSize || 10;
  const totalPages = Math.ceil(totalItems / currentPageSize);

  return {
    data,
    isLoading,
    error,
    refetch,
    totalPages,
    totalItems,
  };
};
