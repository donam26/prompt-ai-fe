"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blogService } from "@/services/admin/blogs/blogService";
import type { CreateBlogRequest } from "@/lib/types";
import { ApiSingleResponse } from "@/types/api";

/**
 * Parameters for updating a blog
 */
export interface UpdateBlogParams {
  readonly id: string | number;
  readonly data: CreateBlogRequest;
}

/**
 * Hook for updating an existing blog
 *
 * @returns Mutation object for updating blog
 */
export function useUpdateBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation<ApiSingleResponse<Blog>, Error, UpdateBlogParams>({
    mutationFn: async ({ id, data }: UpdateBlogParams) => {
      return await blogService.updateBlog({ id, data });
    },
    onSuccess: () => {
      // Invalidate and refetch blogs list
      queryClient.invalidateQueries({
        queryKey: ["admin-blogs"],
      });
    },
    onError: () => {
      // Error updating blog - could be logged to monitoring service
    },
  });
}
