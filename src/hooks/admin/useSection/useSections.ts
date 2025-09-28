import type { Section } from "@/lib/types";
import type { SectionFilterState } from "@/types/admin/section";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import { sectionService } from "@/services";
import { applyNonEmptyFiltersToQuery } from "@/utils";
import type { IPagination } from "@/types/common";

interface Props {
  refetch?: () => void;
  filters?: SectionFilterState;
  pagination?: IPagination;
  enabled?: boolean;
}

export function useSections(options: Props = {}) {
  const {
    filters = {},
    pagination = DEFAULT_PAGINATION,
    enabled = true,
  } = options;
  const isInitialRender = useRef(true);
  const isFetchingRef = useRef(false);

  // Sections state
  const [sections, setSections] = useState<Section[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [sectionsWithPagination, setSectionsWithPagination] = useState<{
    data: Section[];
    total: number;
    totalPages: number;
  }>({
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
  const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)]);

  // Manual refetch function that doesn't cause infinite loops
  const fetchSections = useCallback(async () => {
    if (isFetchingRef.current || !enabled) {
      return;
    }

    isFetchingRef.current = true;
    setIsFetching(true);

    try {
      const query: Record<string, unknown> = {
        page: memoizedPageIndex + 1,
        limit: memoizedPageSize,
      };

      applyNonEmptyFiltersToQuery(memoizedFilters, query);
      const response = await sectionService.getSectionsPage(query);

      // Extract data from the response structure
      const responseData = response.data?.data || [];
      const total = response.data.pagination?.total || DEFAULT_TOTAL;
      const totalPages =
        response.data.pagination?.totalPages || DEFAULT_TOTAL_PAGES;

      setSections(responseData);
      setSectionsWithPagination({
        data: responseData,
        total,
        totalPages,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      // Keep existing sections on error
    } finally {
      isFetchingRef.current = false;
      setIsFetching(false);
    }
  }, [memoizedPageIndex, memoizedPageSize, memoizedFilters, enabled]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  // Handle filters changes - only after initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Only fetch when filters are provided and not empty
    if (Object.keys(filters).length > 0 && enabled) {
      fetchSections();
    }
  }, [filters, fetchSections, enabled]);

  return {
    // Sections data
    sections,
    isFetching,
    error,
    sectionsWithPagination,

    // Utilities
    fetchSections,
    refetch: fetchSections,
  };
}
