import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { userService } from "@/services/admin/users/userService";
import type { ExpiringSubscription } from "@/types/admin/expiring-subscription";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import type { PaginationParams } from "@/types/base";

interface UseExpiringSubscriptionsProps {
  pagination?: PaginationParams;
  search?: string;
  days?: number;
  subscriptionType?: number;
  enabled?: boolean;
}

interface UseExpiringSubscriptionsResult {
  users: ExpiringSubscription[];
  isFetching: boolean;
  error: string;
  usersWithPagination: {
    data: ExpiringSubscription[];
    total: number;
    totalPages: number;
  };
  refetch: () => void;
}

export const useExpiringSubscriptions = (
  options: UseExpiringSubscriptionsProps = {}
): UseExpiringSubscriptionsResult => {
  const {
    pagination = DEFAULT_PAGINATION,
    search = "",
    days,
    subscriptionType,
    enabled = true,
  } = options;

  const isFetchingRef = useRef(false);
  const [users, setUsers] = useState<ExpiringSubscription[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [usersWithPagination, setUsersWithPagination] = useState<{
    data: ExpiringSubscription[];
    total: number;
    totalPages: number;
  }>({
    data: [],
    total: DEFAULT_TOTAL,
    totalPages: DEFAULT_TOTAL_PAGES,
  });
  const [error, setError] = useState<string>("");

  const memoizedPageIndex = useMemo(
    () => pagination.pageIndex,
    [pagination.pageIndex]
  );
  const memoizedPageSize = useMemo(
    () => pagination.pageSize,
    [pagination.pageSize]
  );
  const memoizedSearch = useMemo(() => search, [search]);
  const memoizedDays = useMemo(() => days, [days]);
  const memoizedSubscriptionType = useMemo(
    () => subscriptionType,
    [subscriptionType]
  );

  const fetchExpiringSubscriptions = useCallback(async () => {
    if (isFetchingRef.current || !enabled) {
      return;
    }

    isFetchingRef.current = true;
    setIsFetching(true);
    setError("");

    try {
      const response = await userService.getExpiringSubscriptions({
        page: memoizedPageIndex + 1,
        pageSize: memoizedPageSize,
        search: memoizedSearch || undefined,
        days: memoizedDays,
        subscriptionType: memoizedSubscriptionType,
      });

      const responseData = response.data || [];
      const total = response.total || DEFAULT_TOTAL;
      const totalPages = response.totalPages || DEFAULT_TOTAL_PAGES;

      setUsers(responseData);
      setUsersWithPagination({
        data: responseData,
        total,
        totalPages,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      isFetchingRef.current = false;
      setIsFetching(false);
    }
  }, [
    memoizedPageIndex,
    memoizedPageSize,
    memoizedSearch,
    memoizedDays,
    memoizedSubscriptionType,
    enabled,
  ]);

  useEffect(() => {
    fetchExpiringSubscriptions();
  }, [fetchExpiringSubscriptions]);

  return {
    users,
    isFetching,
    error,
    usersWithPagination,
    refetch: fetchExpiringSubscriptions,
  };
};
