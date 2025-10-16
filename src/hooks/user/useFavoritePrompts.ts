"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { usePromptFavorites } from "@/hooks";
import { promptFavoritesService } from "@/services/prompt-favorites/promptFavoritesService";
import { Prompt } from "@/types";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import type { PaginationParams } from "@/types/base";
import type { ApiCallResult } from "@/types/services/common";

interface Props {
  refetch?: () => void;
  userId: string | number;
  enabled?: boolean;
  pagination?: PaginationParams;
}

export function useFavoritePrompts(options: Props) {
  const { userId, enabled = true, pagination = DEFAULT_PAGINATION } = options;
  const { removeFavorite } = usePromptFavorites();
  const isFetchingRef = useRef(false);

  // Favorite prompts state
  const [favoritePrompts, setFavoritePrompts] = useState<Prompt[]>([]);
  const [favoriteIdsMap, setFavoriteIdsMap] = useState<{
    [promptId: string]: string;
  }>({});
  const [isFetching, setIsFetching] = useState(false);
  const [favoritePromptsWithPagination, setFavoritePromptsWithPagination] =
    useState<ApiCallResult<Prompt[]>>({
      data: [],
      total: DEFAULT_TOTAL,
      totalPages: DEFAULT_TOTAL_PAGES,
    });
  const [error, setError] = useState<string>("");

  // Memoize pagination values individually to prevent unnecessary re-renders
  const memoizedPageIndex = useMemo(
    () => pagination.pageIndex,
    [pagination.pageIndex]
  );
  const memoizedPageSize = useMemo(
    () => pagination.pageSize,
    [pagination.pageSize]
  );

  // Manual refetch function that doesn't cause infinite loops
  const fetchFavoritePrompts = useCallback(async () => {
    if (isFetchingRef.current || !enabled || !userId) {
      return;
    }

    isFetchingRef.current = true;
    setIsFetching(true);
    setError("");

    try {
      // Get favorite items with pagination
      const response =
        await promptFavoritesService.getFavoriteItemsWithPagination(
          userId,
          memoizedPageIndex + 1, // Convert to 1-based page
          memoizedPageSize
        );

      if (response.success && response.data) {
        const { data: favoriteItems, pagination: paginationInfo } =
          response as any;

        // Extract prompts from favoriteItems (each item has a prompt object)
        const prompts = favoriteItems.map((item: any) => item.prompt);

        // Create favoriteIdsMap for remove functionality
        const map: { [promptId: string]: string } = {};
        favoriteItems.forEach((favorite: any) => {
          map[String(favorite.promptId)] = String(favorite.id);
        });
        setFavoriteIdsMap(map);

        // Remove duplicates based on prompt ID to fix React key warning
        const uniquePrompts = prompts.filter(
          (prompt: any, index: number, self: any[]) =>
            index === self.findIndex((p: any) => p.id === prompt.id)
        );

        setFavoritePrompts(uniquePrompts);
        setFavoritePromptsWithPagination({
          data: uniquePrompts,
          total: paginationInfo.total,
          totalPages: paginationInfo.totalPages,
        });
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Không thể tải danh sách yêu thích";
      setError(errorMessage);
      // Keep existing prompts on error
    } finally {
      isFetchingRef.current = false;
      setIsFetching(false);
    }
  }, [userId, enabled, memoizedPageIndex, memoizedPageSize]);

  // Remove favorite
  const removeFavoritePrompt = useCallback(
    async (promptId: string) => {
      try {
        const favoriteId = favoriteIdsMap[promptId];
        if (favoriteId) {
          const success = await removeFavorite(favoriteId);
          if (success) {
            // Remove from local state
            setFavoritePrompts(prev =>
              prev.filter(prompt => String(prompt.id) !== promptId)
            );
            // Remove from favoriteIdsMap
            setFavoriteIdsMap(prev => {
              const newMap = { ...prev };
              delete newMap[promptId];
              return newMap;
            });
            return true;
          }
        }
        return false;
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Không thể xóa khỏi danh sách yêu thích";
        setError(errorMessage);
        return false;
      }
    },
    [favoriteIdsMap, removeFavorite]
  );

  // Filter prompts by search term
  const filterPrompts = useCallback(
    (searchTerm: string) => {
      return favoritePrompts.filter(
        prompt =>
          prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prompt.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    [favoritePrompts]
  );

  useEffect(() => {
    fetchFavoritePrompts();
  }, [enabled, memoizedPageIndex, memoizedPageSize, fetchFavoritePrompts]);

  return {
    // Favorite prompts data
    favoritePrompts,
    favoriteIdsMap,
    isFetching,
    error,
    favoritePromptsWithPagination,

    // Utilities
    fetchFavoritePrompts,
    removeFavoritePrompt,
    filterPrompts,
    refetch: fetchFavoritePrompts,
  };
}
