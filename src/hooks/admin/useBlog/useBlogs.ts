import type { Blog } from "@/types";
import type { BlogFilterState } from "@/types/admin/blog";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import { adminBlogService } from "@/services/admin/blogs/blogService";
import { applyNonEmptyFiltersToQuery } from "@/utils";
import type { PaginationParams } from "@/types/base";
import type { ApiCallResult } from "@/types/services/common";
import { useDeepMemo } from "@/hooks/useDeepMemo";

interface Props {
  refetch?: () => void;
  filters?: BlogFilterState;
  pagination?: PaginationParams;
}

export function useBlogs(options: Props = {}) {
  const { filters = {}, pagination = DEFAULT_PAGINATION } = options;
  const isInitialRender = useRef(true);
  const isFetchingRef = useRef(false);

  // Blogs state
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [blogsWithPagination, setBlogsWithPagination] = useState<
    ApiCallResult<Blog[]>
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
  const fetchBlogs = useCallback(async () => {
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;
    setIsFetching(true);

    try {
      const query: Record<string, unknown> = {
        pageIndex: memoizedPageIndex + 1, // Backend expects 1-based, we send 0-based
        pageSize: memoizedPageSize,
      };

      applyNonEmptyFiltersToQuery(memoizedFilters, query);
      const response = await adminBlogService.getBlogs(query);

      // Extract data from the response structure
      const responseData = response.data?.data || [];
      const total = response.data.pagination?.total || DEFAULT_TOTAL;
      const totalPages =
        response.data.pagination?.totalPages || DEFAULT_TOTAL_PAGES;

      setBlogs(responseData);
      setBlogsWithPagination({
        data: responseData,
        total,
        totalPages,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      // Keep existing blogs on error
    } finally {
      isFetchingRef.current = false;
      setIsFetching(false);
    }
  }, [memoizedPageIndex, memoizedPageSize, memoizedFilters]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Handle filters changes - only after initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Only fetch when filters are provided and not empty
    if (Object.keys(filters).length > 0) {
      fetchBlogs();
    }
  }, [filters, fetchBlogs]);

  return {
    // Blogs data
    blogs,
    isFetching,
    error,
    blogsWithPagination,

    // Utilities
    fetchBlogs,
    refetch: fetchBlogs,
  };
}
