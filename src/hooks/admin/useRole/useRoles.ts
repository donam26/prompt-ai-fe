import type { Role, RoleFilterState } from "@/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import { roleService } from "@/services/admin/roles/roleService";
import type { PaginationParams } from "@/types/base";
import { useDeepMemo } from "@/hooks/useDeepMemo";
import { applyNonEmptyFiltersToQuery } from "@/utils";
import { buildRolesQueryString } from "@/utils/common-helper";

interface Props {
  refetch?: () => void;
  filters?: RoleFilterState;
  pagination?: PaginationParams;
  enabled?: boolean;
}

export function useRoles(options: Props = {}) {
  const {
    filters = {},
    pagination = DEFAULT_PAGINATION,
    enabled = true,
  } = options;
  const isInitialRender = useRef(true);
  const isFetchingRef = useRef(false);

  // Roles state
  const [roles, setRoles] = useState<Role[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [rolesWithPagination, setRolesWithPagination] = useState<{
    data: Role[];
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
  const memoizedFilters = useDeepMemo(filters);

  // Manual refetch function that doesn't cause infinite loops
  const fetchRoles = useCallback(async () => {
    if (isFetchingRef.current || !enabled) {
      return;
    }

    isFetchingRef.current = true;
    setIsFetching(true);

    try {
      const params: Record<string, unknown> = {
        page: memoizedPageIndex + 1,
        pageSize: memoizedPageSize,
        ...memoizedFilters,
      };

      // Build query string for API call with proper array handling
      const queryString = buildRolesQueryString(params);
      applyNonEmptyFiltersToQuery(filters, params);

      const response =
        await roleService.getRolesPageWithQueryString(queryString);

      // Extract data from the response structure
      const responseData = response.data?.data || [];
      const total = response.data?.pagination?.total || DEFAULT_TOTAL;
      const totalPages =
        response.data?.pagination?.totalPages || DEFAULT_TOTAL_PAGES;

      setRoles(responseData);
      setRolesWithPagination({
        data: responseData,
        total,
        totalPages,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      // Keep existing roles on error
    } finally {
      isFetchingRef.current = false;
      setIsFetching(false);
    }
  }, [memoizedPageIndex, memoizedPageSize, memoizedFilters, enabled, filters]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  // Handle filters changes - only after initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Only fetch when filters are provided and not empty
    if (Object.keys(filters).length > 0 && enabled) {
      fetchRoles();
    }
  }, [filters, fetchRoles, enabled]);

  return {
    // Roles data
    roles,
    isFetching,
    error,
    rolesWithPagination,

    // Utilities
    fetchRoles,
    refetch: fetchRoles,
  };
}
