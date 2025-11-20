import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { roleService } from "@/services/admin/roles/roleService";
import type { User } from "@/types";
import type { PaginationParams } from "@/types/base";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";

interface Props {
  roleId: string | number;
  pagination?: PaginationParams;
  enabled?: boolean;
}

export function useRoleUsers(options: Props) {
  const { roleId, pagination = DEFAULT_PAGINATION, enabled = true } = options;
  const isInitialRender = useRef(true);
  const isFetchingRef = useRef(false);

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

  const memoizedPageIndex = useMemo(
    () => pagination.pageIndex,
    [pagination.pageIndex]
  );
  const memoizedPageSize = useMemo(
    () => pagination.pageSize,
    [pagination.pageSize]
  );

  const fetchUsers = useCallback(async () => {
    if (isFetchingRef.current || !enabled || !roleId) {
      return;
    }

    isFetchingRef.current = true;
    setIsFetching(true);

    try {
      const query: Record<string, unknown> = {
        pageIndex: memoizedPageIndex + 1,
        pageSize: memoizedPageSize,
      };

      const response = await roleService.getUsersByRole(roleId, query);

      const responseData = response.data?.data || response.data;

      // Extract users array - API returns { users: [...], role: {...} }
      const usersData = responseData?.users || [];
      const total =
        responseData?.pagination?.total ||
        (Array.isArray(usersData) ? usersData.length : 0) ||
        DEFAULT_TOTAL;
      const totalPages =
        responseData?.pagination?.totalPages || DEFAULT_TOTAL_PAGES;

      setUsers(Array.isArray(usersData) ? usersData : []);
      setUsersWithPagination({
        data: Array.isArray(usersData) ? usersData : [],
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
  }, [roleId, memoizedPageIndex, memoizedPageSize, enabled]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isInitialRender.current && enabled && roleId) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedPageIndex, memoizedPageSize, roleId, enabled]);

  return {
    users,
    isFetching,
    error,
    usersWithPagination,
    fetchUsers,
    refetch: fetchUsers,
  };
}
