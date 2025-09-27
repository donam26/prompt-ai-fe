import { useState, useCallback } from "react";
import { IPagination } from "@/types/common";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGINATION } from "@/constants";

interface UseAdminTableProps<T> {
  initialFilters?: T;
  initialPagination?: IPagination;
}

interface UseAdminTableReturn<T> {
  filters: T;
  pagination: IPagination;
  setFilters: (filters: T) => void;
  setPagination: (pagination: IPagination) => void;
  handleFilterChange: (newFilters: T) => void;
  handlePaginationChange: (newPagination: IPagination) => void;
  handleClearFilters: () => void;
  resetPagination: () => void;
}

export function useAdminTable<T>({
  initialFilters,
  initialPagination = DEFAULT_PAGINATION,
}: UseAdminTableProps<T>): UseAdminTableReturn<T> {
  const [filters, setFilters] = useState<T>(initialFilters as T);
  const [pagination, setPagination] = useState<IPagination>(initialPagination);

  const handleFilterChange = useCallback((newFilters: T): void => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  const handlePaginationChange = useCallback(
    (newPagination: IPagination) =>
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
