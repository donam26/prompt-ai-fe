"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  CategoryFilter,
  CategoryHeader,
  createCategoryColumns,
  DataTable,
} from "./modules";
import { CATEGORY_CONSTANTS } from "@/constants/category";
import {
  useAdminCategoriesQuery,
  useAdminSectionsQuery,
  useAdminIndustries,
  useDeleteCategoryMutation,
} from "@/hooks";
import type { Category, FilterState } from "@/types/admin";

export default function CategoryManagementPage(): React.JSX.Element {
  const router = useRouter();

  // 🎯 State Management
  const [filters, setFilters] = useState<FilterState>(
    CATEGORY_CONSTANTS.INITIAL_FILTERS
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(
    CATEGORY_CONSTANTS.PAGINATION.DEFAULT_PAGE_SIZE
  );

  // 🔄 Data Hooks
  const { searchTerm, sectionId, status, industryIds } = filters;
  const {
    categories: categoriesData = [],
    isLoading: categoriesLoading,
    totalPages,
    totalItems,
  } = useAdminCategoriesQuery({
    page: currentPage,
    pageSize: pageSize,
    search: searchTerm,
    sectionId: sectionId,
    status: status,
    industryIds: [...industryIds],
  });

  const { data: sectionsData = [], isLoading: sectionsLoading } =
    useAdminSectionsQuery();
  const {
    industriesWithPagination: industriesData,
    isLoading: industriesLoading,
  } = useAdminIndustries();
  const deleteCategoryMutation = useDeleteCategoryMutation();

  // Extract data from API responses

  const sections = Array.isArray(sectionsData?.data?.data)
    ? sectionsData.data.data
    : Array.isArray(sectionsData?.data)
      ? sectionsData.data
      : [];
  const industries = Array.isArray(industriesData?.data)
    ? industriesData.data
    : [];

  const isLoading = categoriesLoading || sectionsLoading || industriesLoading;

  // 🔗 Navigation handlers
  const handleAddCategory = () => {
    router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_CREATE);
  };

  const handleEditCategory = (category: Category) => {
    router.push(CATEGORY_CONSTANTS.ROUTES.CATEGORY_EDIT(category.id));
  };

  const handleDeleteCategory = async (id: string | number): Promise<void> => {
    try {
      deleteCategoryMutation.mutate(id);
    } catch {
      // Error deleting category - could be logged to monitoring service
    }
  };

  const handleFilterChange = useCallback((newFilters: FilterState): void => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  // const handlePageSizeChange = useCallback((newPageSize: number): void => {
  //   setPageSize(newPageSize);
  //   setCurrentPage(1);
  // }, []);

  const handleClearFilters = useCallback((): void => {
    setFilters(CATEGORY_CONSTANTS.INITIAL_FILTERS);
    setCurrentPage(1);
  }, []);

  // Create columns with handlers
  const columns = createCategoryColumns({
    onEdit: handleEditCategory,
    onDelete: handleDeleteCategory,
  });

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <CategoryHeader onAddCategory={handleAddCategory} />

        <CategoryFilter
          filters={filters}
          sections={sections}
          industries={industries}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() => setCurrentPage(1)}
        />

        <DataTable
          columns={columns}
          data={categoriesData}
          pagination={{
            currentPage: currentPage,
            totalPages: totalPages,
            totalItems: totalItems,
            pageSize: pageSize,
            onPageChange: (page: number) => setCurrentPage(page),
            onPageSizeChange: (newPageSize: number) => {
              setPageSize(newPageSize);
              setCurrentPage(1);
            },
            showPrevNext: true,
            maxVisiblePages: 5,
          }}
          loading={isLoading}
        />
      </div>
    </AdminContentCard>
  );
}
