import { useCallback, useState } from "react";
import { promptFavoritesService } from "@/services/prompt-favorites/promptFavoritesService";
import { showToast } from "@/components/ui/toast";

interface FavoriteItem {
  id: number;
  userId: number;
  promptId: number;
}

interface IResponse {
  isLoading: boolean;
  error: string;
  addFavorite: (data: { promptId: string; userId: string }) => Promise<boolean>;
  removeFavorite: (favoriteId: string) => Promise<boolean>;
  removeFavoriteByPromptId: (
    promptId: string,
    userId: string | number
  ) => Promise<boolean>;
  getFavorites: (userId: string | number) => Promise<FavoriteItem[] | null>;
  checkIsFavorited: (
    userId: string | number,
    promptId: string | number
  ) => Promise<boolean | null>;
}

export function usePromptFavorites(): IResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const addFavorite = useCallback(
    async (data: { promptId: string; userId: string }): Promise<boolean> => {
      setIsLoading(() => true);
      setError(() => "");

      try {
        await promptFavoritesService.addFavoritePrompt(data);
        showToast.success("Đã thêm vào danh sách yêu thích!");
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Không thể thêm vào danh sách yêu thích";
        setError(() => errorMessage);
        showToast.error(errorMessage);
        return false;
      } finally {
        setIsLoading(() => false);
      }
    },
    []
  );

  const removeFavorite = useCallback(
    async (favoriteId: string): Promise<boolean> => {
      setIsLoading(() => true);
      setError(() => "");

      try {
        await promptFavoritesService.removeFavoritePrompt(favoriteId);
        showToast.success("Đã xóa khỏi danh sách yêu thích!");
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Không thể xóa khỏi danh sách yêu thích";
        setError(() => errorMessage);
        showToast.error(errorMessage);
        return false;
      } finally {
        setIsLoading(() => false);
      }
    },
    []
  );

  const removeFavoriteByPromptId = useCallback(
    async (promptId: string, userId: string | number): Promise<boolean> => {
      setIsLoading(() => true);
      setError(() => "");

      try {
        await promptFavoritesService.removeFavoritePromptByPromptId(
          promptId,
          userId
        );
        showToast.success("Đã xóa khỏi danh sách yêu thích!");
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Không thể xóa khỏi danh sách yêu thích";
        setError(() => errorMessage);
        showToast.error(errorMessage);
        return false;
      } finally {
        setIsLoading(() => false);
      }
    },
    []
  );

  const getFavorites = useCallback(
    async (userId: string | number): Promise<FavoriteItem[] | null> => {
      setIsLoading(() => true);
      setError(() => "");

      try {
        const response =
          await promptFavoritesService.getFavoritePrompts(userId);
        return response.data || [];
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Không thể lấy danh sách yêu thích";
        setError(() => errorMessage);
        showToast.error(errorMessage);
        return null;
      } finally {
        setIsLoading(() => false);
      }
    },
    []
  );

  const checkIsFavorited = useCallback(
    async (
      userId: string | number,
      promptId: string | number
    ): Promise<boolean | null> => {
      setIsLoading(() => true);
      setError(() => "");

      try {
        const response = await promptFavoritesService.isPromptFavorited(
          userId,
          promptId
        );
        return response.data || false;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Không thể kiểm tra trạng thái yêu thích";
        setError(() => errorMessage);
        return null;
      } finally {
        setIsLoading(() => false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    addFavorite,
    removeFavorite,
    removeFavoriteByPromptId,
    getFavorites,
    checkIsFavorited,
  };
}
