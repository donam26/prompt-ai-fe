"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { Industry } from "@/types";
import type { ApiCallResult, PaginationParams } from "@/types/services/common";
import { industryService } from "@/services";
import { DEFAULT_TOTAL, DEFAULT_TOTAL_PAGES } from "@/constants";
import type { IndustryFilterState } from "@/types/admin/industry";
import { useDeepMemo } from "@/hooks/useDeepMemo";

interface IResponse {
  industriesWithPagination: ApiCallResult<Industry[]> | null;
  isLoading: boolean;
  error: string;
  fetchIndustries: () => Promise<void>;
  refetch: () => Promise<void>;
}

interface Props {
  pagination?: PaginationParams;
  filters?: IndustryFilterState;
}

export function useIndustries({ pagination, filters }: Props = {}): IResponse {
  const [industriesWithPagination, setIndustriesWithPagination] =
    useState<ApiCallResult<Industry[]> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Memoize pagination values individually to prevent unnecessary re-renders
  const memoizedPage = useMemo(() => pagination?.page || 1, [pagination?.page]);
  const memoizedPageSize = useMemo(
    () => pagination?.pageSize || 10,
    [pagination?.pageSize]
  );
  const memoizedFilters = useDeepMemo(filters);

  const fetchIndustries = useCallback(async () => {
    setIsLoading(true);

    try {
      const query: Record<string, unknown> = {
        page: memoizedPage,
        pageSize: memoizedPageSize,
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
        data: response.data.data || [],
        total: response.data.pagination.total || DEFAULT_TOTAL,
        totalPages: response.data.pagination.totalPages || DEFAULT_TOTAL_PAGES,
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
  }, [memoizedPage, memoizedPageSize, memoizedFilters]);

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
