/**
 * Admin prompts query hook
 */

import { useQuery } from "@tanstack/react-query";
import { promptService } from "@/services/prompts/promptService";
import { queryKeys } from "@/types/shared/types";
import { ApiListResponse } from "@/types/api";

export interface UseAdminPromptsQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryId?: string;
  status?: string;
  isPremium?: string;
  tags?: string[];
}

export interface UseAdminPromptsQueryResult {
  data: ApiListResponse<any> | null;
  isLoading: boolean;
  error: any;
  refetch: () => void;
  totalPages: number;
  totalItems: number;
  prompts: any[];
}

/**
 * Hook for fetching admin prompts with pagination and filters
 *
 * @param params - Query parameters
 * @returns Prompts query result
 */
export const useAdminPromptsQuery = (
  params?: UseAdminPromptsQueryParams
): UseAdminPromptsQueryResult => {
  const { data, isLoading, error, refetch } = useQuery<ApiListResponse<any>>({
    queryKey: [...queryKeys.admin.prompts, params],
    queryFn: () =>
      promptService.getPromptsPage({
        page: params?.page || 1,
        pageSize: params?.pageSize || 10,
        search: params?.search || "",
        categoryId: params?.categoryId || "all",
        status: params?.status || "all",
        isPremium: params?.isPremium || "all",
        tags: params?.tags || [],
      }),
    enabled: true,
  });

  const totalItems = data?.pagination?.total || 0;
  const totalPages = data?.pagination?.totalPages || 0;
  const prompts = data?.data || [];

  return {
    data: data || null,
    isLoading,
    error,
    refetch,
    totalPages,
    totalItems,
    prompts,
  };
};
