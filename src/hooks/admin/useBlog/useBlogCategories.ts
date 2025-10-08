import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { BlogCategory } from "@/types/entities/blog";

interface BlogCategoriesResponse {
  data: BlogCategory[];
  message?: string;
}

export const useBlogCategories = () => {
  return useQuery<BlogCategoriesResponse>({
    queryKey: ["blog-categories"],
    queryFn: async (): Promise<BlogCategoriesResponse> => {
      const response = await apiClient.get("/blogcategory");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
