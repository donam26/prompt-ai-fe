"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { promptService } from "@/services";
import { Prompt } from "@/types";
import { showToast } from "@/components/ui/toast";

interface PromptFilters {
  searchTerm: string;
  categoryId: string;
  industryIds: string;
  topicIds: string;
  isType?: string;
  subType?: number;
}

interface PromptPagination {
  page: number;
  pageSize: number;
}

interface UsePromptsOptions {
  filters?: Partial<PromptFilters>;
  pagination?: PromptPagination;
  enabled?: boolean;
}

export const usePrompts = (options: UsePromptsOptions = {}) => {
  const {
    filters = {},
    pagination = { page: 1, pageSize: 12 },
    enabled = true,
  } = options;

  const isFetchingRef = useRef(false);

  // State
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string>("");

  // Memoized values
  const memoizedFilters = useMemo(() => filters, [filters]);
  const memoizedPagination = useMemo(() => pagination, [pagination]);

  // Fetch prompts
  const fetchPrompts = useCallback(async () => {
    if (isFetchingRef.current || !enabled) return;

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const response = await promptService.getPromptsByCategoryId({
        page: memoizedPagination.page,
        pageSize: memoizedPagination.pageSize,
        categoryId: memoizedFilters.categoryId || "",
        industryIds: memoizedFilters.industryIds || undefined,
        topicIds: memoizedFilters.topicIds || undefined,
        searchText: memoizedFilters.searchTerm || undefined,
        isType: memoizedFilters.isType ? Number(memoizedFilters.isType) : 1,
        // subType: memoizedFilters.subType || 2,
      });

      setPrompts((response.data.data as Prompt[]) || []);
      setTotalPages(response.data.pagination?.total || 1);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Có lỗi xảy ra khi tải prompts";
      setError(errorMessage);
      showToast.error(errorMessage);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, [memoizedFilters, memoizedPagination, enabled]);

  // Fetch prompts when filters or pagination change
  useEffect(() => {
    if (enabled) {
      fetchPrompts();
    }
  }, [memoizedFilters, memoizedPagination, enabled, fetchPrompts]);

  return {
    prompts,
    isLoading,
    error,
    totalPages,
    fetchPrompts,
    refetch: fetchPrompts,
  };
};
