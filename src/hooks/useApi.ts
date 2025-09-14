import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { CreatePromptRequest, CreateCategoryRequest } from "@/lib/types";

// Error type for API responses
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Query keys for consistent caching
export const queryKeys = {
  prompts: ["prompts"] as const,
  promptsByCategory: (categoryId: number) =>
    ["prompts", "category", categoryId] as const,
  promptsBySearch: (searchTerm: string) =>
    ["prompts", "search", searchTerm] as const,
  categories: ["categories"] as const,
  user: ["user"] as const,
  favorites: ["favorites"] as const,
  admin: {
    prompts: ["admin", "prompts"] as const,
    categories: ["admin", "categories"] as const,
    users: ["admin", "users"] as const,
  },
} as const;

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
    queryFn: () => api.getPrompts(params),
    enabled: true,
  });
};

// Custom hook for fetching categories
export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: api.getCategories,
  });
};

// Custom hook for fetching user data
export const useUser = () => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: api.getUser,
    enabled: false, // Only fetch when explicitly called
  });
};

// Custom hook for fetching favorites
export const useFavorites = () => {
  return useQuery({
    queryKey: queryKeys.favorites,
    queryFn: api.getFavoritePrompts,
  });
};

// Mutation hooks
export const useCreatePrompt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createPrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.prompts });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.prompts });
      toast.success("Prompt created successfully!");
    },
    onError: (error: ApiError) => {
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
    }) => api.updatePrompt(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.prompts });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.prompts });
      toast.success("Prompt updated successfully!");
    },
    onError: (error: ApiError) => {
      toast.error(error?.response?.data?.message || "Failed to update prompt");
    },
  });
};

export const useDeletePrompt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deletePrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.prompts });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.prompts });
      toast.success("Prompt deleted successfully!");
    },
    onError: (error: ApiError) => {
      toast.error(error?.response?.data?.message || "Failed to delete prompt");
    },
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.toggleFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites });
      queryClient.invalidateQueries({ queryKey: queryKeys.prompts });
    },
    onError: (error: ApiError) => {
      toast.error(
        error?.response?.data?.message || "Failed to toggle favorite"
      );
    },
  });
};

// Admin mutation hooks
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.categories });
      toast.success("Category created successfully!");
    },
    onError: (error: ApiError) => {
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
      id: number;
      data: Partial<CreateCategoryRequest>;
    }) => api.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.categories });
      toast.success("Category updated successfully!");
    },
    onError: (error: ApiError) => {
      toast.error(
        error?.response?.data?.message || "Failed to update category"
      );
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.categories });
      toast.success("Category deleted successfully!");
    },
    onError: (error: ApiError) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete category"
      );
    },
  });
};
