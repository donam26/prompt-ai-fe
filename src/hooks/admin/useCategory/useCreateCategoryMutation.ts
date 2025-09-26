import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services";
import { toast } from "sonner";
import { Category } from "@/lib/types";
import { ApiErrorResult } from "@/types";
import { queryKeys } from "@/types/shared/types";

interface UseCreateCategoryMutationResult {
  isLoading: boolean;
  error: any;
  mutate: (data: Partial<Category>) => void;
}

export const useCreateCategoryMutation =
  (): UseCreateCategoryMutationResult => {
    const queryClient = useQueryClient();

    const createCategoryMutation = useMutation({
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

    const mutate = (data: Partial<Category>): void => {
      createCategoryMutation.mutate(data);
    };

    return {
      isLoading: createCategoryMutation.isPending,
      error: createCategoryMutation.error,
      mutate,
    };
  };
