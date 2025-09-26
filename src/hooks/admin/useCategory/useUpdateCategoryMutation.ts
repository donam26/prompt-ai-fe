import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services";
import { toast } from "sonner";
import { ApiErrorResult } from "@/types";
import { queryKeys } from "@/types/shared/types";
import { Category, CreateCategoryRequest } from "@/lib/types";

interface UseUpdateCategoryMutationParams {
  id: number | string;
  data: Partial<CreateCategoryRequest>;
}

interface UseUpdateCategoryMutationResult {
  isLoading: boolean;
  error: any;
  mutate: (params: UseUpdateCategoryMutationParams) => void;
}

export const useUpdateCategoryMutation =
  (): UseUpdateCategoryMutationResult => {
    const queryClient = useQueryClient();

    const updateCategoryMutation = useMutation({
      mutationFn: ({ id, data }: UseUpdateCategoryMutationParams) =>
        categoryService.updateCategory(id, data as Partial<Category>),
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

    const mutate = (params: UseUpdateCategoryMutationParams): void => {
      updateCategoryMutation.mutate(params);
    };

    return {
      isLoading: updateCategoryMutation.isPending,
      error: updateCategoryMutation.error,
      mutate,
    };
  };
