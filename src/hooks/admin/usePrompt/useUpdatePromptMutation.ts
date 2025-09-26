/**
 * Update prompt mutation hook
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { promptService } from "@/services/prompts/promptService";

import { queryKeys } from "@/types/shared/types";
import { toast } from "sonner";

export interface UpdatePromptData {
  title?: string;
  content?: string;
  categoryId?: string;
  tags?: string[];
  isPublic?: boolean;
  isPremium?: boolean;
  description?: string;
  image?: string;
}

/**
 * Hook for updating a prompt
 *
 * @returns Update prompt mutation
 */
export const useUpdatePromptMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      promptData,
    }: {
      id: string | number;
      promptData: UpdatePromptData;
    }) => promptService.updatePrompt(id, promptData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.prompts,
      });
      toast.success("Cập nhật prompt thành công");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi cập nhật prompt");
    },
  });
};
