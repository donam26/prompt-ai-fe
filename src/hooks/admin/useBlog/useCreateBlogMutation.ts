"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blogService } from "@/services/admin/blogs/blogService";
import type { CreateBlogRequest } from "@/lib/types";
import { ApiSingleResponse } from "@/types/api";

/**
 * Hook for creating a new blog
 *
 * @returns Mutation object for creating blog
 */
export function useCreateBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation<ApiSingleResponse<Blog>, Error, CreateBlogRequest>({
    mutationFn: async (data: CreateBlogRequest) => {
      return await blogService.createBlog(data);
    },
    onSuccess: () => {
      // Invalidate and refetch blogs list
      queryClient.invalidateQueries({
        queryKey: ["admin-blogs"],
      });
    },
    onError: () => {
      // Error creating blog - could be logged to monitoring service
    },
  });
}
