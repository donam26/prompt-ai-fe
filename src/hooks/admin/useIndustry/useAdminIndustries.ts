"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Industry } from "@/lib/types";
import type { PaginationParams } from "@/types/services/common";
import type { PaginatedResponse } from "@/types/admin";
import { industryService } from "@/services";
import { DEFAULT_TOTAL, DEFAULT_TOTAL_PAGES } from "@/constants";

interface IndustryFilters {
  name?: string;
  isActive?: boolean;
  [key: string]: unknown;
}

interface ApiCallResult<T> {
  data: T;
  total: number;
  totalPages: number;
}

interface IResponse {
  industriesWithPagination: ApiCallResult<Industry[]> | null;
  isLoading: boolean;
  error: string;
  fetchIndustries: () => Promise<void>;
  refetch: () => Promise<void>;
}

export function useAdminIndustries(
  pagination?: PaginationParams,
  filters?: IndustryFilters
): IResponse {
  const [industriesWithPagination, setIndustriesWithPagination] =
    useState<ApiCallResult<Industry[]> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const prevFiltersRef = useRef<IndustryFilters | undefined>(undefined);

  const memoizedPagination = useMemo(
    () => pagination || { page: 1, pageSize: 10 },
    [pagination]
  );

  const memoizedFilters = useMemo(() => {
    const prevFilters = prevFiltersRef.current;

    const isCurrentEmpty = !filters || Object.keys(filters).length === 0;
    const isPrevEmpty = prevFilters
      ? Object.keys(prevFilters).length === 0
      : true;

    if (isCurrentEmpty && isPrevEmpty) {
      return prevFilters || filters;
    }

    if (isCurrentEmpty !== isPrevEmpty) {
      prevFiltersRef.current = filters;
      return filters;
    }

    if (
      !prevFilters ||
      JSON.stringify(filters) !== JSON.stringify(prevFilters)
    ) {
      prevFiltersRef.current = filters;
      return filters;
    }

    return prevFilters;
  }, [filters]);

  const fetchIndustries = useCallback(async () => {
    setIsLoading(true);

    try {
      const query: Record<string, unknown> = {
        page: memoizedPagination.page || 1,
        pageSize: memoizedPagination.pageSize || 10,
      };

      // Apply filters to query
      if (memoizedFilters) {
        Object.entries(memoizedFilters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            query[key] = value;
          }
        });
      }

      const response = await industryService.getIndustries(query);

      setIndustriesWithPagination({
        data: Array.isArray(response.data?.data) ? response.data.data : [],
        total: (response.data as any)?.total || DEFAULT_TOTAL,
        totalPages: (response.data as any)?.totalPages || DEFAULT_TOTAL_PAGES,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);

      setIndustriesWithPagination({
        data: [],
        total: DEFAULT_TOTAL,
        totalPages: DEFAULT_TOTAL_PAGES,
      });
    } finally {
      setIsLoading(false);
    }
  }, [memoizedPagination.page, memoizedPagination.pageSize, memoizedFilters]);

  useEffect(() => {
    fetchIndustries();
  }, [fetchIndustries]);

  return {
    industriesWithPagination,
    isLoading,
    error,
    fetchIndustries,
    refetch: fetchIndustries,
  };
}
