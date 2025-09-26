"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blogService } from "@/services/admin/blogs/blogService";
import { ApiSuccessResponse } from "@/types/api";

/**
 * Hook for deleting a blog
 *
 * @returns Mutation object for deleting blog
 */
export function useDeleteBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation<ApiSuccessResponse, Error, string | number>({
    mutationFn: async (id: string | number) => {
      return await blogService.deleteBlog(id);
    },
    onSuccess: () => {
      // Invalidate and refetch blogs list
      queryClient.invalidateQueries({
        queryKey: ["admin-blogs"],
      });
    },
    onError: () => {
      // Error deleting blog - could be logged to monitoring service
    },
  });
}
