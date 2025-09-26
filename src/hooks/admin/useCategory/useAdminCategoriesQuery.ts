import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services";
import { queryKeys } from "@/types/shared/types";
import type {
  UseAdminCategoriesQueryParams,
  UseAdminCategoriesQueryResult,
  TransformedCategory,
} from "@/types/api/categories";

export const useAdminCategoriesQuery = (
  params?: UseAdminCategoriesQueryParams
): UseAdminCategoriesQueryResult => {
  const { data, isLoading, error, refetch } = useQuery<any>({
    queryKey: [...queryKeys.admin.categories, params],
    queryFn: () =>
      categoryService.getCategoriesPage({
        page: params?.page || 1,
        pageSize: params?.pageSize || 10,
        queryParams: params?.search || "",
        sectionId: params?.sectionId || "all",
        status: params?.status || "all",
        industryIds: params?.industryIds || [],
      }),
    enabled: true,
  });

  // Extract pagination data from API response
  const totalItems = data?.data?.total || 0;
  const currentPageSize = params?.pageSize || 10;
  const totalPages = Math.ceil(totalItems / currentPageSize);

  // Transform API data to frontend format
  const categories: TransformedCategory[] = data?.data?.data || [];

  return {
    data: data?.data || null,
    isLoading,
    error,
    refetch,
    totalPages,
    totalItems,
    categories,
  };
};
