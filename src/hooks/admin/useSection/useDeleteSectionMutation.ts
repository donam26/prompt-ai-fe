"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sectionService } from "@/services";
import { toast } from "sonner";

/**
 * Hook for deleting a section
 *
 * @returns Mutation object for deleting sections
 */
export const useDeleteSectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number): Promise<void> => {
      await sectionService.deleteSection(id);
    },
    onSuccess: () => {
      // Invalidate and refetch sections queries
      queryClient.invalidateQueries({
        queryKey: ["admin-sections"],
      });

      toast.success("Xóa section thành công");
    },
    onError: (error: Error) => {
      // Error handling - could be logged to monitoring service
      toast.error(`Lỗi khi xóa section: ${error.message}`);
    },
  });
};
