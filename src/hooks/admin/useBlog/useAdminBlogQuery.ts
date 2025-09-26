"use client";

import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/admin/blogs/blogService";
import type { Blog } from "@/lib/types";

/**
 * Hook for fetching a single blog by ID
 *
 * @param id - The blog ID
 * @returns Query result with blog data
 */
export function useAdminBlogQuery(id: string | number) {
  return useQuery({
    queryKey: ["admin-blog", id],
    queryFn: async (): Promise<Blog> => {
      const response = await blogService.getBlogById(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
