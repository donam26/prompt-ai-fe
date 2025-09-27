"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  CategoryFilter,
  CategoryHeader,
  useCategoryColumns,
  adaptColumnsForDataTable,
} from "./modules";
import { CATEGORY_CONSTANTS } from "@/constants/category";
import { useCategories, useIndustries } from "@/hooks";
import { useDeleteCategory } from "@/hooks/admin/useCategory/useDeleteCategory";
import type { Category, FilterState } from "@/types/admin";
import { IPagination } from "@/types/common";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
} from "@/constants";
import { DataTable } from "@/components/data-table";

export default function CategoryManagementPage(): React.JSX.Element {
  const router = useRouter();

  const [filters, setFilters] = useState<Partial<FilterState>>(
    CATEGORY_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] = useState<IPagination>(DEFAULT_PAGINATION);

  const {
    categoriesWithPagination,
    isFetching: categoriesLoading,
    refetch,
  } = useCategories({
    pagination,
    filters,
  });

  const {
    industriesWithPagination: industriesData,
    isLoading: industriesLoading,
  } = useIndustries();
  const { mutate: deleteCategory, isLoading: isDeleting } = useDeleteCategory();

  const handlePaginationChange = useCallback(
    (newPagination: IPagination) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const industries = Array.isArray(industriesData?.data)
    ? industriesData.data
    : [];

  const isLoading = categoriesLoading || industriesLoading || isDeleting;

  // 🔗 Navigation handlers
  const handleAddCategory = () => {
    router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_CREATE);
  };

  const handleEditCategory = (category: Category) => {
    router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_DETAIL(category.id));
  };

  const handleDeleteCategory = async (category: Category): Promise<void> => {
    const success = await deleteCategory(category);
    if (success) {
      refetch();
    }
  };

  const handleFilterChange = useCallback((newFilters: FilterState): void => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  const handleClearFilters = useCallback((): void => {
    setFilters(CATEGORY_CONSTANTS.INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  // Create columns with handlers
  const tanstackColumns = useCategoryColumns({
    onEditAction: handleEditCategory,
    onDeleteAction: handleDeleteCategory,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <CategoryHeader onAddCategory={handleAddCategory} />

        <CategoryFilter
          filters={filters}
          sections={[]}
          industries={industries}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <DataTable<Category>
          columns={columns}
          data={categoriesWithPagination?.data || []}
          pageCount={
            categoriesWithPagination?.totalPages || DEFAULT_TOTAL_PAGES
          }
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalItems={categoriesWithPagination?.total || DEFAULT_TOTAL}
          onPaginationChangeAction={handlePaginationChange}
          loading={isLoading}
        />
      </div>
    </AdminContentCard>
  );
}
