"use client";

import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/admin/blogs/blogService";
import type { Blog } from "@/lib/types";
import { ApiSingleResponse } from "@/types/api";

/**
 * Hook for fetching a single blog by ID
 *
 * @param id - The blog ID
 * @returns Query result with blog data
 */
export function useAdminBlogQuery(id: string | number) {
  return useQuery<ApiSingleResponse<Blog>, Error, Blog>({
    queryKey: ["admin-blog", id],
    queryFn: async (): Promise<ApiSingleResponse<Blog>> => {
      return await blogService.getBlogById(id);
    },
    select: (data): Blog => {
      return data.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
