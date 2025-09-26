/**
 * Delete prompt mutation hook
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { promptService } from "@/services/prompts/promptService";

import { queryKeys } from "@/types/shared/types";
import { toast } from "sonner";

/**
 * Hook for deleting a prompt
 *
 * @returns Delete prompt mutation
 */
export const useDeletePromptMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => promptService.deletePrompt(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.prompts,
      });
      toast.success("Xóa prompt thành công");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi xóa prompt");
    },
  });
};
