"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
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
import type { Category } from "@/types";
import type { CategoryFilterState } from "@/types/admin/category";
import type { PaginationParams as IPagination } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
} from "@/constants";
import { DataTable } from "@/components/data-table";
import type { IndustryFilterState } from "@/types/admin/industry";
import { debounce } from "@/lib/utils";
import { useDeepMemo } from "@/hooks/useDeepMemo";

export default function CategoryManagementPage(): React.JSX.Element {
  const router = useRouter();

  const [filters, setFilters] = useState<Partial<CategoryFilterState>>(
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

  // Industries state management for infinite scroll and search in filter
  const [industriesSearch, setIndustriesSearch] = useState<string>("");
  const [industriesPagination, setIndustriesPagination] = useState<IPagination>(
    {
      pageIndex: 0,
      pageSize: 10,
    }
  );
  const [allIndustries, setAllIndustries] = useState<any[]>([]);

  // Debounced search handler - update industriesSearch after 1 second
  const debouncedSetSearch = useRef(
    debounce((search: string) => {
      setIndustriesSearch(search);
    }, 1000)
  ).current;

  // Build filters for industries
  const industriesFilters = useMemo<IndustryFilterState | undefined>(() => {
    const hasSearch = !!industriesSearch.trim();

    const filters: IndustryFilterState = {
      ...(hasSearch && { searchTerm: industriesSearch.trim() }),
    };

    return filters;
  }, [industriesSearch]);

  // Fetch industries with pagination and search
  const { industriesWithPagination, isFetching: industriesLoading } =
    useIndustries({
      pagination: industriesPagination,
      filters: industriesFilters,
      enabled: true,
    });

  // Reset industries when search changes
  useEffect(() => {
    setIndustriesPagination(prev => ({ ...prev, pageIndex: 0 }));
    setAllIndustries([]);
  }, [industriesSearch]);

  // Memoize industries data with deep comparison to prevent infinite loops
  const industriesDataRaw = industriesWithPagination?.data || [];
  const industriesData = useDeepMemo(industriesDataRaw);

  const currentPageIndex = industriesPagination.pageIndex;

  // Accumulate industries data for infinite scroll
  useEffect(() => {
    if (industriesData.length > 0 || currentPageIndex === 0) {
      if (currentPageIndex === 0) {
        setAllIndustries(industriesData);
      } else {
        setAllIndustries(prev => {
          const existingIds = new Set(prev.map(i => i.id));
          const newItems = industriesData.filter(i => !existingIds.has(i.id));
          return [...prev, ...newItems];
        });
      }
    }
  }, [industriesData, currentPageIndex]);

  // Handle search change with debounce
  const handleIndustriesSearch = useCallback(
    (search: string) => {
      debouncedSetSearch(search);
    },
    [debouncedSetSearch]
  );

  // Extract stable values to prevent infinite loops
  const industriesTotalPages = industriesWithPagination?.totalPages || 1;
  const industriesCurrentPageIndex = industriesPagination.pageIndex;

  // Handle scroll to bottom (load more)
  const handleIndustriesScrollToBottom = useCallback(() => {
    if (industriesCurrentPageIndex + 1 < industriesTotalPages) {
      setIndustriesPagination(prev => ({
        ...prev,
        pageIndex: prev.pageIndex + 1,
      }));
    }
  }, [industriesTotalPages, industriesCurrentPageIndex]);

  // Check if there are more items to load
  const hasMoreIndustries = useMemo(() => {
    return industriesCurrentPageIndex + 1 < industriesTotalPages;
  }, [industriesTotalPages, industriesCurrentPageIndex]);

  const { mutate: deleteCategory, isLoading: isDeleting } = useDeleteCategory();

  const handlePaginationChange = useCallback(
    (newPagination: IPagination) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = categoriesLoading || isDeleting;

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

  const handleFilterChange = useCallback(
    (newFilters: CategoryFilterState): void => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
    },
    []
  );

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
          industries={allIndustries}
          industriesLoading={industriesLoading}
          onIndustriesSearch={handleIndustriesSearch}
          onIndustriesScrollToBottom={handleIndustriesScrollToBottom}
          hasMoreIndustries={hasMoreIndustries}
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
