import type { Prompt } from "@/lib/types";
import type { PromptFilterState } from "@/types/admin/prompt";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import { promptService } from "@/services/admin/prompts/promptService";
import { applyNonEmptyFiltersToQuery } from "@/utils";
import type { IPagination } from "@/types/common";

interface Props {
  refetch?: () => void;
  filters?: PromptFilterState;
  pagination?: IPagination;
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

  const memoizedPagination = useMemo(() => pagination, [pagination]);

  // Manual refetch function that doesn't cause infinite loops
  const fetchPrompts = useCallback(async () => {
    if (isFetchingRef.current || !enabled) {
      return;
    }

    isFetchingRef.current = true;
    setIsFetching(true);

    try {
      const query: Record<string, unknown> = {
        page: memoizedPagination.pageIndex + 1,
        limit: memoizedPagination.pageSize,
      };

      applyNonEmptyFiltersToQuery(filters, query);
      const response = await promptService.getPromptsPage(query);

      // Extract data from the response structure
      const responseData = response.data.data || [];
      const total = response.data.pagination?.total || DEFAULT_TOTAL;
      const totalPages =
        response.data.pagination?.totalPages || DEFAULT_TOTAL_PAGES;

      setPrompts(responseData);
      setPromptsWithPagination({
        data: responseData,
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
  }, [
    memoizedPagination.pageIndex,
    memoizedPagination.pageSize,
    filters,
    enabled,
  ]);

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
