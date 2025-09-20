import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService, sectionService } from "@/services";
import { toast } from "sonner";
import { CreateCategoryRequest } from "@/lib/types";
import { ApiErrorResult, queryKeys } from "@/types";

// Admin query hooks
export const useAdminCategories = (params?: {
  page?: number;
  pageSize?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: [...queryKeys.admin.categories, params],
    queryFn: () =>
      categoryService.getCategoriesPage({
        page: params?.page || 1,
        pageSize: params?.pageSize || 10,
        queryParams: params?.search || "",
      }),
    enabled: true,
  });
};

export const useAdminSections = () => {
  return useQuery({
    queryKey: [...queryKeys.admin.categories, "sections"],
    queryFn: sectionService.getSections,
    enabled: true,
  });
};

// Admin mutation hooks
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.categories });
      toast.success("Category created successfully!");
    },
    onError: (error: ApiErrorResult) => {
      toast.error(
        error?.response?.data?.message || "Failed to create category"
      );
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number | string;
      data: Partial<CreateCategoryRequest>;
    }) => categoryService.updateCategory({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.categories });
      toast.success("Category updated successfully!");
    },
    onError: (error: ApiErrorResult) => {
      toast.error(
        error?.response?.data?.message || "Failed to update category"
      );
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => categoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.categories });
      toast.success("Category deleted successfully!");
    },
    onError: (error: ApiErrorResult) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete category"
      );
    },
  });
};
