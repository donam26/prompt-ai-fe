"use client";

import type { Category } from "@/types";
import type { CategoryFilterState } from "@/types/admin/category";
import { useEffect, useState } from "react";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import { categoryService } from "@/services/admin/categories";
import { applyNonEmptyFiltersToQuery } from "@/utils";
import type { PaginationParams } from "@/types/base";
import type { ApiCallResult } from "@/types/services/common";

interface Props {
  filters?: Partial<CategoryFilterState>;
  pagination?: PaginationParams;
}

export function useCategoriesSimple(options: Props = {}) {
  const { filters = {}, pagination = DEFAULT_PAGINATION } = options;

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

  // Fetch categories function
  const fetchCategories = async () => {
    setIsFetching(true);

    try {
      const query: Record<string, unknown> = {
        pageIndex: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
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
    } finally {
      setIsFetching(false);
    }
  };

  // Only fetch when dependencies change
  useEffect(() => {
    fetchCategories();
  }, [pagination.pageIndex, pagination.pageSize, JSON.stringify(filters)]);

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
