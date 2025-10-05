"use client";

import { useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { promptService } from "@/services";
import { toast } from "sonner";

export const usePromptActions = () => {
  const { user } = useAuth();

  const handleFavorite = useCallback(
    async (
      promptId: string,
      favoritePrompts: string[],
      setFavoritePrompts: (fn: (prev: string[]) => string[]) => void
    ) => {
      if (!user) {
        toast.error("Vui lòng đăng nhập để thêm vào yêu thích");
        return;
      }

      try {
        if (favoritePrompts.includes(promptId)) {
          // Remove from favorites
          await promptService.removeFavoritePrompt(promptId);
          setFavoritePrompts(prev => prev.filter(id => id !== promptId));
          toast.success("Đã xóa khỏi yêu thích");
        } else {
          // Add to favorites
          await promptService.addFavoritePrompt({
            promptId,
            userId: user.id.toString(),
          });
          setFavoritePrompts(prev => [...prev, promptId]);
          toast.success("Đã thêm vào yêu thích");
        }
      } catch {
        toast.error("Có lỗi xảy ra");
      }
    },
    [user]
  );

  const handleCopyPrompt = useCallback((content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Đã sao chép prompt");
  }, []);

  return {
    handleFavorite,
    handleCopyPrompt,
  };
};
