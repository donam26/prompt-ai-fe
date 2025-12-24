"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  IndustryFilter,
  IndustryHeader,
  IndustryActiveFilters,
  IndustryEditModal,
  useIndustryColumns,
  adaptColumnsForDataTable,
} from "./modules";
import { ActionModal } from "@/components/admin/action-modal";
import { INDUSTRIES_CONSTANTS } from "@/constants/industries";
import { useIndustries, useCategories } from "@/hooks";
import { useDeleteIndustry } from "@/hooks/admin/useIndustry/useDeleteIndustry";
import { useUpsertIndustry } from "@/hooks/admin/useIndustry/useUpsertIndustry";
import type { Industry } from "@/types";
import type { IndustryFilterState } from "@/types/admin/industry";
import type { IndustryFormData } from "@/libs/form-schemas/industry-schema";
import type { PaginationParams as IPagination } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
} from "@/constants";
import { DataTable } from "@/components/data-table";
import type { CategoryFilterState } from "@/types/admin/category";
import { useDeepMemo } from "@/hooks/useDeepMemo";

export default function IndustryManagementPage(): React.JSX.Element {
  const [filters, setFilters] = useState<IndustryFilterState>(
    INDUSTRIES_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] = useState<IPagination>(DEFAULT_PAGINATION);

  // Modal states
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    industriesWithPagination,
    isFetching: industriesLoading,
    refetch,
  } = useIndustries({
    pagination,
    filters,
  });

  // Categories state management for infinite scroll and search in filter
  const [categoriesSearch, setCategoriesSearch] = useState<string>("");
  const [categoriesPagination, setCategoriesPagination] = useState<IPagination>(
    {
      pageIndex: 0,
      pageSize: 10,
    }
  );
  const [allCategories, setAllCategories] = useState<any[]>([]);

  // Timeout ref for categories search debounce
  const categoriesSearchTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  // Build filters for categories
  const categoriesFilters = useMemo<CategoryFilterState | undefined>(() => {
    const hasSearch = !!categoriesSearch.trim();
    const filters: CategoryFilterState = {
      searchTerm: hasSearch ? categoriesSearch.trim() : "",
      sectionId: "",
      status: "",
      industryIds: [],
    };
    return filters;
  }, [categoriesSearch]);

  // Fetch categories with pagination and search
  const { categoriesWithPagination, isFetching: categoriesLoading } =
    useCategories({
      pagination: categoriesPagination,
      filters: categoriesFilters,
    });

  // Reset pagination when search changes (don't clear data yet, wait for API response)
  useEffect(() => {
    setCategoriesPagination(prev => ({ ...prev, pageIndex: 0 }));
  }, [categoriesSearch]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (categoriesSearchTimeoutRef.current) {
        clearTimeout(categoriesSearchTimeoutRef.current);
      }
    };
  }, []);

  // Memoize categories data with deep comparison to prevent infinite loops
  const categoriesDataRaw = categoriesWithPagination?.data || [];
  const categoriesData = useDeepMemo(categoriesDataRaw);

  const currentCategoriesPageIndex = categoriesPagination.pageIndex;

  // Accumulate categories data for infinite scroll
  // When pageIndex is 0, replace all data (this handles search reset)
  // When pageIndex > 0, append new data for infinite scroll
  useEffect(() => {
    if (currentCategoriesPageIndex === 0) {
      // Replace all data when starting fresh (new search or initial load)
      setAllCategories(categoriesData);
    } else if (categoriesData.length > 0) {
      // Append new data for infinite scroll
      setAllCategories(prev => {
        const existingIds = new Set(prev.map(c => c.id));
        const newItems = categoriesData.filter(c => !existingIds.has(c.id));
        return [...prev, ...newItems];
      });
    }
  }, [categoriesData, currentCategoriesPageIndex]);

  // Handle categories search change with debounce
  // Update immediately when clearing, debounce when typing
  const handleCategoriesSearch = useCallback((search: string) => {
    // Clear any pending timeout
    if (categoriesSearchTimeoutRef.current) {
      clearTimeout(categoriesSearchTimeoutRef.current);
      categoriesSearchTimeoutRef.current = null;
    }

    if (search.trim() === "") {
      // Update immediately when clearing
      setCategoriesSearch("");
    } else {
      // Debounce when typing
      categoriesSearchTimeoutRef.current = setTimeout(() => {
        setCategoriesSearch(search);
        categoriesSearchTimeoutRef.current = null;
      }, 1000);
    }
  }, []);

  // Extract stable values to prevent infinite loops
  const categoriesTotalPages = categoriesWithPagination?.totalPages || 1;
  const categoriesCurrentPageIndex = categoriesPagination.pageIndex;

  // Handle categories scroll to bottom (load more)
  const handleCategoriesScrollToBottom = useCallback(() => {
    if (categoriesCurrentPageIndex + 1 < categoriesTotalPages) {
      setCategoriesPagination(prev => ({
        ...prev,
        pageIndex: prev.pageIndex + 1,
      }));
    }
  }, [categoriesTotalPages, categoriesCurrentPageIndex]);

  // Check if there are more categories to load
  const hasMoreCategories = useMemo(() => {
    return categoriesCurrentPageIndex + 1 < categoriesTotalPages;
  }, [categoriesTotalPages, categoriesCurrentPageIndex]);

  const { mutate: deleteIndustry, isLoading: isDeleting } = useDeleteIndustry();
  const { mutate: upsertIndustry, isUpserting } = useUpsertIndustry();

  const handlePaginationChange = useCallback(
    (newPagination: IPagination) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = industriesLoading || isDeleting || isUpserting;

  const handleEditIndustry = (industry: Industry) => {
    setSelectedIndustry(industry);
    setIsEditModalOpen(true);
  };

  const handleAddIndustry = () => {
    setSelectedIndustry(null);
    setIsEditModalOpen(true);
  };

  const handleDeleteIndustryClick = (industry: Industry) => {
    setSelectedIndustry(industry);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedIndustry) {
      await deleteIndustry(selectedIndustry);
      setIsDeleteModalOpen(false);
      setSelectedIndustry(null);
    }
  };

  const handleSaveIndustry = async (data: IndustryFormData) => {
    try {
      await upsertIndustry(data, selectedIndustry?.id);

      setIsEditModalOpen(false);
      setSelectedIndustry(null);
      refetch();
    } catch (error) {
      console.error("Error saving industry:", error);
    }
  };

  const handleFilterChange = useCallback(
    (newFilters: IndustryFilterState): void => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
    },
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(INDUSTRIES_CONSTANTS.INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  // Create columns with handlers
  const tanstackColumns = useIndustryColumns({
    onEditAction: handleEditIndustry,
    onDeleteAction: handleDeleteIndustryClick,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <IndustryHeader onAddIndustry={handleAddIndustry} />

        <IndustryFilter
          filters={filters}
          categories={allCategories}
          categoriesLoading={categoriesLoading}
          categoriesSearch={categoriesSearch}
          onCategoriesSearch={handleCategoriesSearch}
          onCategoriesScrollToBottom={handleCategoriesScrollToBottom}
          hasMoreCategories={hasMoreCategories}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <IndustryActiveFilters
          filters={filters}
          categories={allCategories}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <DataTable<Industry>
          columns={columns}
          data={industriesWithPagination?.data || []}
          pageCount={
            industriesWithPagination?.totalPages || DEFAULT_TOTAL_PAGES
          }
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalItems={industriesWithPagination?.total || DEFAULT_TOTAL}
          onPaginationChangeAction={handlePaginationChange}
          loading={isLoading}
        />

        <IndustryEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedIndustry(null);
          }}
          industry={selectedIndustry}
          onSave={handleSaveIndustry}
          isLoading={isUpserting}
        />

        <ActionModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedIndustry(null);
          }}
          onConfirm={handleDeleteConfirm}
          title="Xóa ngành nghề"
          description="Bạn có chắc chắn muốn xóa ngành nghề này không? Hành động này không thể hoàn tác."
          confirmText="Xóa"
          cancelText="Hủy"
          isLoading={isDeleting}
          variant="destructive"
          itemName={selectedIndustry?.name}
        />
      </div>
    </AdminContentCard>
  );
}
