import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { promptService, categoryService } from "@/services";
import { toast } from "sonner";
import { CreatePromptRequest } from "@/lib/types";
import { ApiErrorResult, queryKeys } from "@/types";

// Custom hook for fetching prompts
export const usePrompts = (params?: {
  categoryId?: number;
  searchTerm?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: params?.categoryId
      ? queryKeys.promptsByCategory(params.categoryId)
      : params?.searchTerm
        ? queryKeys.promptsBySearch(params.searchTerm)
        : queryKeys.prompts,
    queryFn: () => promptService.getPrompts(JSON.stringify(params)),
    enabled: true,
  });
};

// Custom hook for fetching categories
export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: categoryService.getCategories,
  });
};

// Custom hook for fetching favorites
export const useFavorites = () => {
  return useQuery({
    queryKey: queryKeys.favorites,
    queryFn: () => promptService.getFavoritePrompts(1), // This might need to be adjusted based on your implementation
  });
};

// Mutation hooks
export const useCreatePrompt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: promptService.createPrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.prompts });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.prompts });
      toast.success("Prompt created successfully!");
    },
    onError: (error: ApiErrorResult) => {
      toast.error(error?.response?.data?.message || "Failed to create prompt");
    },
  });
};

export const useUpdatePrompt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CreatePromptRequest>;
    }) => promptService.updatePrompt({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.prompts });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.prompts });
      toast.success("Prompt updated successfully!");
    },
    onError: (error: ApiErrorResult) => {
      toast.error(error?.response?.data?.message || "Failed to update prompt");
    },
  });
};

export const useDeletePrompt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: promptService.deletePrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.prompts });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.prompts });
      toast.success("Prompt deleted successfully!");
    },
    onError: (error: ApiErrorResult) => {
      toast.error(error?.response?.data?.message || "Failed to delete prompt");
    },
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: promptService.toggleFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites });
      queryClient.invalidateQueries({ queryKey: queryKeys.prompts });
    },
    onError: (error: ApiErrorResult) => {
      toast.error(
        error?.response?.data?.message || "Failed to toggle favorite"
      );
    },
  });
};
