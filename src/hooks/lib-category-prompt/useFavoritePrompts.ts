"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { promptFavoritesService } from "@/services";

interface FavoriteItem {
  id: number;
  userId: number;
  promptId: number;
}

export const useFavoritePrompts = () => {
  const { user } = useAuth();
  const [favoritePrompts, setFavoritePrompts] = useState<string[]>([]);
  const [favoriteIdsMap, setFavoriteIdsMap] = useState<{
    [promptId: string]: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Load favorite prompts
  const loadFavoritePrompts = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const response = await promptFavoritesService.getFavoritePrompts(user.id);
      const favoriteIds = (response.data || []).map((fav: FavoriteItem) =>
        String(fav.promptId)
      );
      const favoriteIdsMap = (response.data || []).reduce(
        (acc, fav: FavoriteItem) => {
          acc[String(fav.promptId)] = String(fav.id);
          return acc;
        },
        {} as { [promptId: string]: string }
      );

      setFavoritePrompts(favoriteIds);
      setFavoriteIdsMap(favoriteIdsMap);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi tải favorite prompts";
      setError(errorMessage);
      console.warn("Failed to load favorite prompts:", errorMessage);
      setFavoritePrompts([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadFavoritePrompts();
  }, [loadFavoritePrompts]);

  return {
    favoritePrompts,
    favoriteIdsMap,
    setFavoritePrompts,
    isLoading,
    error,
    loadFavoritePrompts,
    refetch: loadFavoritePrompts,
  };
};
