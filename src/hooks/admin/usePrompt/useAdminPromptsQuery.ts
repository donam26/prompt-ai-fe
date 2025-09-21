/**
 * Admin prompts query hook
 */

import { useQuery } from "@tanstack/react-query";
import { promptService } from "@/services/prompts/promptService";
import { queryKeys } from "@/types/shared/types";

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
  data: any;
  isLoading: boolean;
  error: any;
  refetch: () => void;
  totalPages: number;
  totalItems: number;
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
  const { data, isLoading, error, refetch } = useQuery({
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
