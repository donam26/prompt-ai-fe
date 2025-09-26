"use client";

import { useQuery } from "@tanstack/react-query";
import { blogCategoryService } from "@/services/admin/blogs/blogCategoryService";
import type { BlogCategory } from "@/lib/types";
import { ApiSingleResponse } from "@/types/api";

/**
 * Hook for fetching admin blog categories
 *
 * @returns Query result with blog categories data
 */
export function useAdminBlogCategoriesQuery() {
  return useQuery<ApiSingleResponse<BlogCategory[]>, Error, BlogCategory[]>({
    queryKey: ["admin-blog-categories"],
    queryFn: async (): Promise<ApiSingleResponse<BlogCategory[]>> => {
      return await blogCategoryService.getBlogCategories();
    },
    select: (data): BlogCategory[] => {
      return data.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}
