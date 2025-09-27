"use client";

import type { Category } from "@/lib/types";
import type { FilterState } from "@/types/admin/category";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import { categoryService } from "@/services/admin/categories";
import { applyNonEmptyFiltersToQuery } from "@/utils";
import type { IPagination } from "@/types/common";
import type { ApiCallResult } from "@/types/services/common";

interface Props {
  refetch?: () => void;
  filters?: Partial<FilterState>;
  pagination?: IPagination;
}

export function useCategories(options: Props = {}) {
  const { filters = {}, pagination = DEFAULT_PAGINATION } = options;

  const isInitialRender = useRef(true);
  const isFetchingRef = useRef(false);

  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [categoriesWithPagination, setCategoriesWithPagination] = useState<
    ApiCallResult<Category[]>
  >({
    data: [],
    total: DEFAULT_TOTAL,
    totalPages: DEFAULT_TOTAL_PAGES,
  });
  const [error, setError] = useState<string>("");

  const memoizedPagination = useMemo(() => pagination, [pagination]);

  // Manual refetch function that doesn't cause infinite loops
  const fetchCategories = useCallback(async () => {
    isFetchingRef.current = true;
    setIsFetching(true);

    try {
      const query: Record<string, unknown> = {
        page: memoizedPagination.pageIndex + 1,
        limit: memoizedPagination.pageSize,
      };

      applyNonEmptyFiltersToQuery(filters, query);
      const response = await categoryService.getCategories(query);

      // Extract data from the response structure
      const responseData = response.data?.data || [];
      const total = response.data.pagination?.total || DEFAULT_TOTAL;
      const totalPages =
        response.data.pagination?.totalPages || DEFAULT_TOTAL_PAGES;

      setCategories(responseData);
      setCategoriesWithPagination({
        data: responseData,
        total,
        totalPages,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      // Keep existing categories on error
    } finally {
      isFetchingRef.current = false;
      setIsFetching(false);
    }
  }, [memoizedPagination.pageIndex, memoizedPagination.pageSize, filters]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Handle filters changes - only after initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Only fetch when filters are provided and not empty
    if (Object.keys(filters).length > 0) {
      fetchCategories();
    }
  }, [filters, fetchCategories]);

  return {
    // Categories data
    categories,
    isFetching,
    error,
    categoriesWithPagination,

    // Utilities
    fetchCategories,
    refetch: fetchCategories,
  };
}
