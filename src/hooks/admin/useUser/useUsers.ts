import type { User } from "@/lib/types";
import type { UserFilterState } from "@/types/admin/user";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import { userService } from "@/services/admin/users/userService";
import { applyNonEmptyFiltersToQuery } from "@/utils";
import type { IPagination } from "@/types/common";

interface Props {
  refetch?: () => void;
  filters?: UserFilterState;
  pagination?: IPagination;
  enabled?: boolean;
}

export function useAdminUsersQuery(options: Props = {}) {
  const {
    filters = {},
    pagination = DEFAULT_PAGINATION,
    enabled = true,
  } = options;
  const isInitialRender = useRef(true);
  const isFetchingRef = useRef(false);

  // Users state
  const [users, setUsers] = useState<User[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [usersWithPagination, setUsersWithPagination] = useState<{
    data: User[];
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
  const fetchUsers = useCallback(async () => {
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
      const response = await userService.getUsers(query);

      // Extract data from the response structure
      const responseData = response.data?.data || [];
      const total = response.data.pagination?.total || DEFAULT_TOTAL;
      const totalPages =
        response.data.pagination?.totalPages || DEFAULT_TOTAL_PAGES;

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
      // Keep existing users on error
    } finally {
      isFetchingRef.current = false;
      setIsFetching(false);
    }
  }, [memoizedPageIndex, memoizedPageSize, memoizedFilters, enabled]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle filters changes - only after initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Only fetch when filters are provided and not empty
    if (Object.keys(filters).length > 0 && enabled) {
      fetchUsers();
    }
  }, [filters, fetchUsers, enabled]);

  return {
    // Users data
    users,
    isFetching,
    error,
    usersWithPagination,

    // Utilities
    fetchUsers,
    refetch: fetchUsers,
  };
}
