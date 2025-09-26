/**
 * Create prompt mutation hook
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { promptService } from "@/services/prompts/promptService";

import { queryKeys } from "@/types/shared/types";
import { toast } from "sonner";

export interface CreatePromptData {
  title: string;
  content: string;
  categoryId: string;
  tags: string[];
  isPublic: boolean;
  isPremium: boolean;
  description?: string;
  image?: string;
}

/**
 * Hook for creating a new prompt
 *
 * @returns Create prompt mutation
 */
export const useCreatePromptMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (promptData: CreatePromptData) =>
      promptService.createPrompt(promptData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.prompts,
      });
      toast.success("Tạo prompt thành công");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi tạo prompt");
    },
  });
};
