"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { debounce } from "@/lib/utils";
import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  CategoryFilter,
  CategoryHeader,
  createCategoryColumns,
  DataTable,
} from "./modules";
import { INITIAL_FILTER_STATE } from "@/constants";
import {
  useAdminCategoriesQuery,
  useAdminSectionsQuery,
  useAdminIndustries,
  useDeleteCategoryMutation,
} from "@/hooks";
import type { Category, FilterState } from "@/types/admin";

/**
 * Use constants from module
 */
const INITIAL_FILTERS: FilterState = INITIAL_FILTER_STATE;

/**
 * Category management page component following Berklee pattern
 * Main Management Page with state management, data hooks, and UI components
 *
 * @returns The category management page JSX
 */
export default function CategoryManagementPage(): React.JSX.Element {
  const router = useRouter();

  // 🎯 State Management
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [debouncedFilters, setDebouncedFilters] =
    useState<FilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounced filter update
  const debouncedFilterUpdate = debounce((newFilters: FilterState) => {
    setDebouncedFilters(newFilters);
  }, 300);

  // Update debounced filters when filters change
  useEffect(() => {
    debouncedFilterUpdate(filters);
  }, [filters, debouncedFilterUpdate]);

  // 🔄 Data Hooks
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    totalPages,
    totalItems,
  } = useAdminCategoriesQuery({
    page: currentPage,
    pageSize: pageSize,
    search: debouncedFilters.searchTerm,
    sectionId: debouncedFilters.sectionId,
    status: debouncedFilters.status,
    industryIds: [...debouncedFilters.industryIds],
  });

  const { data: sectionsData, isLoading: sectionsLoading } =
    useAdminSectionsQuery();
  const {
    industriesWithPagination: industriesData,
    isLoading: industriesLoading,
  } = useAdminIndustries();
  const deleteCategoryMutation = useDeleteCategoryMutation();

  // Extract data from API responses
  const categories = Array.isArray(categoriesData?.data?.data)
    ? categoriesData.data.data
    : Array.isArray(categoriesData?.data)
      ? categoriesData.data
      : [];
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
    router.push("/admin/category/create");
  };

  const handleEditCategory = (category: Category) => {
    router.push(`/admin/category/${category.id}`);
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

  const handlePageSizeChange = useCallback((newPageSize: number): void => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback((): void => {
    setFilters(INITIAL_FILTERS);
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
          data={categories}
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
