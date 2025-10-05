"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { promptService } from "@/services";
import { Prompt } from "@/types";

export const useFavoritePrompts = () => {
  const { user } = useAuth();
  const [favoritePrompts, setFavoritePrompts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Load favorite prompts
  const loadFavoritePrompts = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const response = await promptService.getFavoritePrompts(user.id);
      const favoriteIds = (
        (response.data as unknown as Prompt[]) ||
        (response.data as unknown as Prompt[]) ||
        []
      ).map((fav: Prompt) => fav.id);
      setFavoritePrompts(favoriteIds as string[]);
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
    setFavoritePrompts,
    isLoading,
    error,
    loadFavoritePrompts,
    refetch: loadFavoritePrompts,
  };
};
