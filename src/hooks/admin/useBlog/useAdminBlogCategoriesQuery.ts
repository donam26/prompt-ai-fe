"use client";

import { useQuery } from "@tanstack/react-query";
import { blogCategoryService } from "@/services/admin/blogs/blogCategoryService";
import type { BlogCategory } from "@/lib/types";

/**
 * Hook for fetching admin blog categories
 *
 * @returns Query result with blog categories data
 */
export function useAdminBlogCategoriesQuery() {
  return useQuery({
    queryKey: ["admin-blog-categories"],
    queryFn: async (): Promise<BlogCategory[]> => {
      const response = await blogCategoryService.getBlogCategory();
      return response.data?.data || [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}
