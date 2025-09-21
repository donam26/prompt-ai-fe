import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services";
import { toast } from "sonner";
import { ApiErrorResult } from "@/types";
import { queryKeys } from "@/types/shared/types";

interface UseDeleteCategoryMutationResult {
  isLoading: boolean;
  error: any;
  mutate: (id: number | string) => void;
}

export const useDeleteCategoryMutation =
  (): UseDeleteCategoryMutationResult => {
    const queryClient = useQueryClient();

    const deleteCategoryMutation = useMutation({
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

    const mutate = (id: number | string): void => {
      deleteCategoryMutation.mutate(id);
    };

    return {
      isLoading: deleteCategoryMutation.isPending,
      error: deleteCategoryMutation.error,
      mutate,
    };
  };
