"use client";

import { useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { promptFavoritesService } from "@/services/prompt-favorites/promptFavoritesService";
import { showToast } from "@/components/ui/toast";

export const usePromptActions = () => {
  const { user } = useAuth();

  const handleFavorite = useCallback(
    async (
      promptId: string,
      favoritePrompts: string[],
      setFavoritePrompts: (fn: (prev: string[]) => string[]) => void
    ) => {
      if (!user) {
        showToast.error("Vui lòng đăng nhập để thêm vào yêu thích");
        return;
      }

      try {
        if (favoritePrompts.includes(promptId)) {
          // Remove from favorites
          await promptFavoritesService.removeFavoritePromptByPromptId(
            promptId,
            user.id
          );
          setFavoritePrompts(prev => prev.filter(id => id !== promptId));
          showToast.success("Đã xóa khỏi yêu thích");
        } else {
          // Add to favorites
          await promptFavoritesService.addFavoritePrompt({
            promptId,
            userId: user.id.toString(),
          });
          setFavoritePrompts(prev => [...prev, promptId]);
          showToast.success("Đã thêm vào yêu thích");
        }
      } catch {
        showToast.error("Có lỗi xảy ra");
      }
    },
    [user]
  );

  const handleCopyPrompt = useCallback((content: string) => {
    navigator.clipboard.writeText(content);
    showToast.success("Đã sao chép prompt");
  }, []);

  return {
    handleFavorite,
    handleCopyPrompt,
  };
};
