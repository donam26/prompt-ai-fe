import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/types/shared/types";
import type {
  UseAdminCategoriesQueryParams,
  UseAdminCategoriesQueryResult,
} from "@/types/api/categories";
import { categoryService } from "@/services/admin/categories";
import {
  ApiListResponse,
  ApiResponse,
  asApiListData,
} from "@/types/api/common";
import { Category } from "@/lib/types";

export const useAdminCategoriesQuery = (
  params?: UseAdminCategoriesQueryParams
): UseAdminCategoriesQueryResult => {
  const { data, isLoading, error, refetch } = useQuery<ApiResponse<Category>>({
    queryKey: [...queryKeys.admin.categories, params],
    queryFn: async (): Promise<ApiResponse<Category>> => {
      const filters = {
        page: params?.page || 1,
        pageSize: params?.pageSize || 10,
        search: params?.search || "",
        sectionId: params?.sectionId || "all",
        status: params?.status || "all",
        industryIds: params?.industryIds || [],
      };

      const response = await categoryService.getCategoriesPage(filters);
      return response.data;
    },
    enabled: true,
  });

  // Define typed data once using utility function
  const typedData = asApiListData<Category>(data);

  // Extract pagination data from API response
  const totalItems = typedData?.pagination?.total || 0;
  const totalPages = typedData?.pagination?.totalPages || 0;

  // Transform API data to frontend format
  const categories: Category[] = typedData?.data || [];

  return {
    isLoading,
    error,
    refetch,
    totalPages,
    totalItems,
    categories,
  };
};
