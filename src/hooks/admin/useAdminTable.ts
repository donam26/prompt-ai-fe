import { useState, useCallback } from "react";
import type { PaginationParams } from "@/types/base";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGINATION } from "@/constants";

interface UseAdminTableProps<T> {
  initialFilters?: T;
  initialPagination?: PaginationParams;
}

interface UseAdminTableReturn<T> {
  filters: T;
  pagination: PaginationParams;
  setFilters: (filters: T) => void;
  setPagination: (pagination: PaginationParams) => void;
  handleFilterChange: (newFilters: T) => void;
  handlePaginationChange: (newPagination: PaginationParams) => void;
  handleClearFilters: () => void;
  resetPagination: () => void;
}

export function useAdminTable<T>({
  initialFilters,
  initialPagination = DEFAULT_PAGINATION,
}: UseAdminTableProps<T>): UseAdminTableReturn<T> {
  const [filters, setFilters] = useState<T>(initialFilters as T);
  const [pagination, setPagination] =
    useState<PaginationParams>(initialPagination);

  const handleFilterChange = useCallback((newFilters: T): void => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  const handlePaginationChange = useCallback(
    (newPagination: PaginationParams) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(initialFilters as T);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, [initialFilters]);

  const resetPagination = useCallback((): void => {
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  return {
    filters,
    pagination,
    setFilters,
    setPagination,
    handleFilterChange,
    handlePaginationChange,
    handleClearFilters,
    resetPagination,
  };
}
