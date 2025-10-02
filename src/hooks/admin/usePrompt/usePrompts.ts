import type { Prompt, PromptFilterState } from "@/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import { promptService } from "@/services/admin/prompts/promptService";
import { applyNonEmptyFiltersToQuery, buildQueryString } from "@/utils";
import type { PaginationParams } from "@/types/base";
import { useDeepMemo } from "@/hooks/useDeepMemo";

interface Props {
  refetch?: () => void;
  filters?: PromptFilterState;
  pagination?: PaginationParams;
  enabled?: boolean;
}

export function usePrompts(options: Props = {}) {
  const {
    filters = {},
    pagination = DEFAULT_PAGINATION,
    enabled = true,
  } = options;
  const isInitialRender = useRef(true);
  const isFetchingRef = useRef(false);

  // Prompts state
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [promptsWithPagination, setPromptsWithPagination] = useState<{
    data: Prompt[];
    total: number;
    totalPages: number;
  }>({
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
  const memoizedFilters = useDeepMemo(filters);

  // Manual refetch function that doesn't cause infinite loops
  const fetchPrompts = useCallback(async () => {
    if (isFetchingRef.current || !enabled) {
      return;
    }

    isFetchingRef.current = true;
    setIsFetching(true);

    try {
      const query: Record<string, unknown> = {
        pageIndex: memoizedPageIndex + 1,
        pageSize: memoizedPageSize,
        ...memoizedFilters,
      };

      // Build query string for API call with proper array handling
      const queryString = buildQueryString(query);
      applyNonEmptyFiltersToQuery(filters, query);

      const response =
        await promptService.getPromptsPageWithQueryString(queryString);

      // Extract data from the response structure
      const responseData = response.data || [];
      const total = responseData.pagination.total || DEFAULT_TOTAL;
      const totalPages =
        responseData.pagination.totalPages || DEFAULT_TOTAL_PAGES;

      // Transform data to match expected format
      const transformedData = responseData.data.map((item: Prompt) => ({
        ...item,
        // Map API fields to expected UI fields
        description: item.shortDescription || item.description,
        isPremium: item.isType.toString() == "2",
        isActive: true, // Default to active
        isComingSoon: item.isComingSoon || false,
        isPublic: true, // Default to public for now
        createdAt: item.createdAt,
        image: item.image || item.category?.image,
        tags: item.tags || [],
        // Ensure industries are properly mapped
        industries: item.category?.industries || item.industries || [],
      }));

      setPrompts(transformedData);
      setPromptsWithPagination({
        data: transformedData,
        total,
        totalPages,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      // Keep existing prompts on error
    } finally {
      isFetchingRef.current = false;
      setIsFetching(false);
    }
  }, [memoizedPageIndex, memoizedPageSize, memoizedFilters, enabled, filters]);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  // Handle filters changes - only after initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Only fetch when filters are provided and not empty
    if (Object.keys(filters).length > 0 && enabled) {
      fetchPrompts();
    }
  }, [filters, fetchPrompts, enabled]);

  return {
    // Prompts data
    prompts,
    isFetching,
    error,
    promptsWithPagination,

    // Utilities
    fetchPrompts,
    refetch: fetchPrompts,
  };
}
