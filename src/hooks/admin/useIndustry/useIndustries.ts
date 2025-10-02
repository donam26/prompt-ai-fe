"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Industry, PaginationParams } from "@/types";
import type { ApiCallResult } from "@/types/services/common";
import { industryService } from "@/services";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import type { IndustryFilterState } from "@/types/admin/industry";
import { useDeepMemo } from "@/hooks/useDeepMemo";
import {
  applyNonEmptyFiltersToQuery,
  buildQueryString,
} from "@/utils/common-helper";

interface Props {
  refetch?: () => void;
  filters?: IndustryFilterState;
  pagination?: PaginationParams;
  enabled?: boolean;
}

export function useIndustries(options: Props = {}) {
  const {
    filters = {},
    pagination = DEFAULT_PAGINATION,
    enabled = true,
  } = options;
  const isInitialRender = useRef(true);
  const isFetchingRef = useRef(false);

  // Industries state
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [industriesWithPagination, setIndustriesWithPagination] = useState<
    ApiCallResult<Industry[]>
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
  const fetchIndustries = useCallback(async () => {
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
      applyNonEmptyFiltersToQuery(
        memoizedFilters as Record<string, unknown>,
        query
      );

      const response =
        await industryService.getIndustriesPageWithQueryString(queryString);

      // Extract data from the response structure
      const responseData = response.data.data || [];
      const total = response.data.pagination.total || DEFAULT_TOTAL;
      const totalPages =
        response.data.pagination.totalPages || DEFAULT_TOTAL_PAGES;

      setIndustries(responseData);
      setIndustriesWithPagination({
        data: responseData,
        total,
        totalPages,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      // Keep existing industries on error
    } finally {
      isFetchingRef.current = false;
      setIsFetching(false);
    }
  }, [memoizedPageIndex, memoizedPageSize, memoizedFilters, enabled]);

  useEffect(() => {
    fetchIndustries();
  }, [fetchIndustries]);

  // Handle filters changes - only after initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Only fetch when filters are provided and not empty
    if (Object.keys(filters).length > 0 && enabled) {
      fetchIndustries();
    }
  }, [filters, fetchIndustries, enabled]);

  return {
    // Industries data
    industries,
    isFetching,
    error,
    industriesWithPagination,

    // Utilities
    fetchIndustries,
    refetch: fetchIndustries,
  };
}
