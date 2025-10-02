import type { Subscription } from "@/types";
import type { SubscriptionFilterState } from "@/types/admin/subscription";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import { subscriptionService } from "@/services/admin/subscriptions/subscriptionService";
import type { PaginationParams } from "@/types/base";
import type { ApiCallResult } from "@/types/services/common";
import { useDeepMemo } from "@/hooks/useDeepMemo";

interface Props {
  refetch?: () => void;
  filters?: SubscriptionFilterState;
  pagination?: PaginationParams;
}

export function useSubscriptions(options: Props = {}) {
  const { filters = {}, pagination = DEFAULT_PAGINATION } = options;
  const isInitialRender = useRef(true);
  const isFetchingRef = useRef(false);

  // Subscriptions state
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [subscriptionsWithPagination, setSubscriptionsWithPagination] =
    useState<ApiCallResult<Subscription[]>>({
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
  const fetchSubscriptions = useCallback(async () => {
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

      // Apply search filter if present
      if (
        memoizedFilters &&
        "searchTerm" in memoizedFilters &&
        memoizedFilters.searchTerm
      ) {
        query.search = memoizedFilters.searchTerm;
      }
      const response = await subscriptionService.getSubscriptions(query);

      // Extract data from the response structure
      const responseData = response.data?.data || [];
      const total = response.data.pagination?.total || DEFAULT_TOTAL;
      const totalPages =
        response.data.pagination?.totalPages || DEFAULT_TOTAL_PAGES;

      setSubscriptions(responseData);
      setSubscriptionsWithPagination({
        data: responseData,
        total,
        totalPages,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      // Keep existing subscriptions on error
    } finally {
      isFetchingRef.current = false;
      setIsFetching(false);
    }
  }, [memoizedPageIndex, memoizedPageSize, memoizedFilters]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  // Handle filters changes - only after initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Only fetch when filters are provided and not empty
    if (Object.keys(filters).length > 0) {
      fetchSubscriptions();
    }
  }, [filters, fetchSubscriptions]);

  return {
    // Subscriptions data
    subscriptions,
    isFetching,
    error,
    subscriptionsWithPagination,

    // Utilities
    fetchSubscriptions,
    refetch: fetchSubscriptions,
  };
}
