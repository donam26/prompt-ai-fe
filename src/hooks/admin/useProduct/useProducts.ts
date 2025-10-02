"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Product, PaginationParams } from "@/types";
import type { ApiCallResult } from "@/types/services/common";
import { productService } from "@/services";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import type { ProductFilterState } from "@/types/admin/product";
import { useDeepMemo } from "@/hooks/useDeepMemo";
import {
  applyNonEmptyFiltersToQuery,
  buildQueryString,
} from "@/utils/common-helper";

interface Props {
  refetch?: () => void;
  filters?: ProductFilterState;
  pagination?: PaginationParams;
  enabled?: boolean;
}

export function useProducts(options: Props = {}) {
  const {
    filters = {},
    pagination = DEFAULT_PAGINATION,
    enabled = true,
  } = options;
  const isInitialRender = useRef(true);
  const isFetchingRef = useRef(false);

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [productsWithPagination, setProductsWithPagination] = useState<
    ApiCallResult<Product[]>
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
  const fetchProducts = useCallback(async () => {
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
        await productService.getProductsPageWithQueryString(queryString);

      // Extract data from the response structure
      const responseData = response.data.data || [];
      const total = response.data.pagination.total || DEFAULT_TOTAL;
      const totalPages =
        response.data.pagination.totalPages || DEFAULT_TOTAL_PAGES;

      setProducts(responseData);
      setProductsWithPagination({
        data: responseData,
        total,
        totalPages,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      // Keep existing products on error
    } finally {
      isFetchingRef.current = false;
      setIsFetching(false);
    }
  }, [memoizedPageIndex, memoizedPageSize, memoizedFilters, enabled]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle filters changes - only after initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Only fetch when filters are provided and not empty
    if (Object.keys(filters).length > 0 && enabled) {
      fetchProducts();
    }
  }, [filters, fetchProducts, enabled]);

  return {
    // Products data
    products,
    isFetching,
    error,
    productsWithPagination,

    // Utilities
    fetchProducts,
    refetch: fetchProducts,
  };
}
