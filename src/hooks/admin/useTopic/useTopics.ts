import type { Topic } from "@/types";
import type { TopicFilterState } from "@/types/admin/topic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import { topicService } from "@/services/admin/topics/topicService";
import { applyNonEmptyFiltersToQuery } from "@/utils";
import type { PaginationParams } from "@/types/base";
import type { ApiCallResult } from "@/types/services/common";
import { useDeepMemo } from "@/hooks/useDeepMemo";

interface Props {
  refetch?: () => void;
  filters?: TopicFilterState;
  pagination?: PaginationParams;
}

export function useTopics(options: Props = {}) {
  const { filters = {}, pagination = DEFAULT_PAGINATION } = options;
  const isInitialRender = useRef(true);
  const isFetchingRef = useRef(false);

  // Topics state
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [topicsWithPagination, setTopicsWithPagination] = useState<
    ApiCallResult<Topic[]>
  >({
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
  const fetchTopics = useCallback(async () => {
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;
    setIsFetching(true);

    try {
      const query: Record<string, unknown> = {
        pageIndex: memoizedPageIndex + 1,
        pageSize: memoizedPageSize,
      };

      applyNonEmptyFiltersToQuery(memoizedFilters, query);
      const response = await topicService.getTopics(query);

      // Extract data from the response structure
      const responseData = response.data?.data || [];
      const total = response.data.pagination?.total || DEFAULT_TOTAL;
      const totalPages =
        response.data.pagination?.totalPages || DEFAULT_TOTAL_PAGES;

      setTopics(responseData);
      setTopicsWithPagination({
        data: responseData,
        total,
        totalPages,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      // Keep existing topics on error
    } finally {
      isFetchingRef.current = false;
      setIsFetching(false);
    }
  }, [memoizedPageIndex, memoizedPageSize, memoizedFilters]);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  // Handle filters changes - only after initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Only fetch when filters are provided and not empty
    if (Object.keys(filters).length > 0) {
      fetchTopics();
    }
  }, [filters, fetchTopics]);

  return {
    // Topics data
    topics,
    isFetching,
    error,
    topicsWithPagination,

    // Utilities
    fetchTopics,
    refetch: fetchTopics,
  };
}
