import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services";
import { queryKeys } from "@/types/shared/types";

interface UseAdminCategoriesQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sectionId?: string;
  status?: string;
  industryIds?: string[];
}

interface UseAdminCategoriesQueryResult {
  data: any;
  isLoading: boolean;
  error: any;
  refetch: () => void;
  totalPages: number;
  totalItems: number;
}

export const useAdminCategoriesQuery = (
  params?: UseAdminCategoriesQueryParams
): UseAdminCategoriesQueryResult => {
  const { data, isLoading, error, refetch } = useQuery({
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

  return {
    data,
    isLoading,
    error,
    refetch,
    totalPages,
    totalItems,
  };
};
