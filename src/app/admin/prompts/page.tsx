"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import { BulkActions } from "@/components/admin/bulk-actions";
import {
  PromptFilter,
  PromptHeader,
  usePromptColumns,
  adaptColumnsForDataTable,
} from "./modules";
import { PROMPTS_CONSTANTS } from "@/constants/prompts";
import { usePrompts, useCategories, useIndustries } from "@/hooks";
import {
  useDeletePrompt,
  useBulkUpdateSubType,
  useBulkDeletePrompts,
} from "@/hooks/admin/usePrompt";
import { ActionModal } from "@/components/admin/action-modal";
import type { Prompt, PromptFilterState } from "@/types";
import type { PaginationParams } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
} from "@/constants";
import { DataTable } from "@/components/data-table";
import type { CategoryFilterState } from "@/types/admin/category";
import type { IndustryFilterState } from "@/types/admin/industry";
import { useDeepMemo } from "@/hooks/useDeepMemo";

export default function PromptManagementPage(): React.JSX.Element {
  const router = useRouter();

  const [filters, setFilters] = useState<PromptFilterState>(
    PROMPTS_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] =
    useState<PaginationParams>(DEFAULT_PAGINATION);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [promptToDelete, setPromptToDelete] = useState<Prompt | null>(null);

  // Row selection state
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // SubType update state
  const [selectedSubType, setSelectedSubType] = useState<string>("");
  const [subTypeModalOpen, setSubTypeModalOpen] = useState(false);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);

  const {
    promptsWithPagination,
    isFetching: promptsLoading,
    refetch,
  } = usePrompts({
    pagination,
    filters,
  });

  // Categories state management for infinite scroll and search in filter
  const [categoriesSearch, setCategoriesSearch] = useState<string>("");
  const [categoriesPagination, setCategoriesPagination] =
    useState<PaginationParams>({
      pageIndex: 0,
      pageSize: 10,
    });
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
      isComingSoon: false,
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
      if (industriesSearchTimeoutRef.current) {
        clearTimeout(industriesSearchTimeoutRef.current);
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

  // Industries state management for infinite scroll and search in filter
  const [industriesSearch, setIndustriesSearch] = useState<string>("");
  const [industriesPagination, setIndustriesPagination] =
    useState<PaginationParams>({
      pageIndex: 0,
      pageSize: 10,
    });
  const [allIndustries, setAllIndustries] = useState<any[]>([]);

  // Timeout ref for industries search debounce
  const industriesSearchTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  // Build filters for industries
  const industriesFilters = useMemo<IndustryFilterState | undefined>(() => {
    const hasCategoryIds =
      !!filters.categoryIds && filters.categoryIds.length > 0;
    const hasSearch = !!industriesSearch.trim();
    const filtersState: IndustryFilterState = {
      ...(hasCategoryIds && { categoryIds: filters.categoryIds }),
      ...(hasSearch && { searchTerm: industriesSearch.trim() }),
    };
    return filtersState;
  }, [filters.categoryIds, industriesSearch]);

  // Fetch industries with pagination and search
  const { industriesWithPagination, isFetching: industriesLoading } =
    useIndustries({
      pagination: industriesPagination,
      filters: industriesFilters,
      enabled: !!filters.categoryIds && filters.categoryIds.length > 0,
    });

  // Reset pagination when search or categoryIds change (don't clear data yet, wait for API response)
  useEffect(() => {
    setIndustriesPagination(prev => ({ ...prev, pageIndex: 0 }));
  }, [industriesSearch, filters.categoryIds]);

  // Memoize industries data with deep comparison to prevent infinite loops
  const industriesDataRaw = industriesWithPagination?.data || [];
  const industriesData = useDeepMemo(industriesDataRaw);

  const currentIndustriesPageIndex = industriesPagination.pageIndex;

  // Accumulate industries data for infinite scroll
  // When pageIndex is 0, replace all data (this handles search reset)
  // When pageIndex > 0, append new data for infinite scroll
  useEffect(() => {
    if (currentIndustriesPageIndex === 0) {
      // Replace all data when starting fresh (new search or initial load)
      setAllIndustries(industriesData);
    } else if (industriesData.length > 0) {
      // Append new data for infinite scroll
      setAllIndustries(prev => {
        const existingIds = new Set(prev.map(i => i.id));
        const newItems = industriesData.filter(i => !existingIds.has(i.id));
        return [...prev, ...newItems];
      });
    }
  }, [industriesData, currentIndustriesPageIndex]);

  // Handle industries search change with debounce
  // Update immediately when clearing, debounce when typing
  const handleIndustriesSearch = useCallback((search: string) => {
    // Clear any pending timeout
    if (industriesSearchTimeoutRef.current) {
      clearTimeout(industriesSearchTimeoutRef.current);
      industriesSearchTimeoutRef.current = null;
    }

    if (search.trim() === "") {
      // Update immediately when clearing
      setIndustriesSearch("");
    } else {
      // Debounce when typing
      industriesSearchTimeoutRef.current = setTimeout(() => {
        setIndustriesSearch(search);
        industriesSearchTimeoutRef.current = null;
      }, 1000);
    }
  }, []);

  // Extract stable values to prevent infinite loops
  const industriesTotalPages = industriesWithPagination?.totalPages || 1;
  const industriesCurrentPageIndex = industriesPagination.pageIndex;

  // Handle industries scroll to bottom (load more)
  const handleIndustriesScrollToBottom = useCallback(() => {
    if (industriesCurrentPageIndex + 1 < industriesTotalPages) {
      setIndustriesPagination(prev => ({
        ...prev,
        pageIndex: prev.pageIndex + 1,
      }));
    }
  }, [industriesTotalPages, industriesCurrentPageIndex]);

  // Check if there are more industries to load
  const hasMoreIndustries = useMemo(() => {
    return industriesCurrentPageIndex + 1 < industriesTotalPages;
  }, [industriesTotalPages, industriesCurrentPageIndex]);

  const { mutate: deletePrompt, isLoading: isDeleting } = useDeletePrompt();
  const { updateSubType, isUpdating } = useBulkUpdateSubType();
  const { mutate: bulkDeletePrompts, isLoading: isBulkDeleting } =
    useBulkDeletePrompts();

  const handlePaginationChange = useCallback(
    (newPagination: PaginationParams) => {
      setPagination(prev => ({ ...prev, ...newPagination }));
      // Clear selection when page changes
      setSelectedRows(new Set());
    },
    []
  );

  const isLoading = promptsLoading || isDeleting || isUpdating;

  const handleAddPrompt = () => {
    router.push(PROMPTS_CONSTANTS.ROUTES.PROMPT_CREATE);
  };

  const handleEditPrompt = (prompt: Prompt) => {
    router.push(PROMPTS_CONSTANTS.ROUTES.PROMPT_EDIT(prompt.id));
  };

  const handleDeletePrompt = (prompt: Prompt): void => {
    setPromptToDelete(prompt);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!promptToDelete) return;

    const success = await deletePrompt(promptToDelete);
    if (success) {
      refetch();
      setDeleteModalOpen(false);
      setPromptToDelete(null);
    }
  };

  const handleCloseDeleteModal = (): void => {
    setDeleteModalOpen(false);
    setPromptToDelete(null);
  };

  const handleFilterChange = useCallback(
    (newFilters: PromptFilterState): void => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
    },
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(PROMPTS_CONSTANTS.INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  // Row selection handlers
  const handleSelectRow = useCallback((rowId: string, checked: boolean) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(rowId);
      } else {
        newSet.delete(rowId);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        // Select all visible rows
        const allIds = new Set(
          promptsWithPagination?.data.map(p => p.id) || []
        );
        setSelectedRows(allIds);
      } else {
        setSelectedRows(new Set());
      }
    },
    [promptsWithPagination?.data]
  );

  // Handle subType change from dropdown
  const handleSubTypeSelect = useCallback((value: string) => {
    setSelectedSubType(value);
  }, []);

  // Handle apply subType
  const handleConfirmSubType = useCallback(async () => {
    if (!selectedSubType) return;

    const selectedIds = Array.from(selectedRows).map(id => Number(id));
    const subType = selectedSubType === "free" ? 1 : 2;

    const success = await updateSubType(selectedIds, subType);
    if (success) {
      setSelectedRows(new Set());
      setSelectedSubType("");
      setSubTypeModalOpen(false);
      refetch();
    }
  }, [selectedSubType, selectedRows, updateSubType, refetch]);

  const handleCloseSubTypeModal = useCallback(() => {
    setSubTypeModalOpen(false);
    setSelectedSubType("");
  }, []);

  const handleBulkDeleteRequest = useCallback(() => {
    if (selectedRows.size === 0) {
      return;
    }
    setBulkDeleteModalOpen(true);
  }, [selectedRows]);

  const handleConfirmBulkDelete = useCallback(async () => {
    const selectedIds = Array.from(selectedRows).map(id => Number(id));
    const success = await bulkDeletePrompts(selectedIds);
    if (success) {
      setSelectedRows(new Set());
      setSelectedSubType("");
      setBulkDeleteModalOpen(false);
      refetch();
    }
  }, [selectedRows, bulkDeletePrompts, refetch]);

  const handleCloseBulkDeleteModal = useCallback(() => {
    setBulkDeleteModalOpen(false);
  }, []);

  // Create columns with handlers
  const tanstackColumns = usePromptColumns({
    onEditAction: handleEditPrompt,
    onDeleteAction: handleDeletePrompt,
    selectedRows,
    onSelectRow: handleSelectRow,
    onSelectAll: handleSelectAll,
    allRowIds: promptsWithPagination?.data.map(p => p.id) || [],
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <PromptHeader
          onAddPrompt={handleAddPrompt}
          filters={filters}
          disabled={!promptsWithPagination?.data.length}
          onImportSuccess={refetch}
        />

        <BulkActions
          selectedCount={selectedRows.size}
          selectedSubType={selectedSubType}
          onSubTypeChange={handleSubTypeSelect}
          onApplySubType={() => setSubTypeModalOpen(true)}
          onClearSelection={() => {
            setSelectedRows(new Set());
            setSelectedSubType("");
          }}
          onBulkDelete={handleBulkDeleteRequest}
          isLoading={isUpdating}
          isBulkDeleting={isBulkDeleting}
        />

        <PromptFilter
          filters={filters}
          categories={allCategories}
          categoriesLoading={categoriesLoading}
          categoriesSearch={categoriesSearch}
          onCategoriesSearch={handleCategoriesSearch}
          onCategoriesScrollToBottom={handleCategoriesScrollToBottom}
          hasMoreCategories={hasMoreCategories}
          industries={allIndustries}
          industriesLoading={industriesLoading}
          industriesSearch={industriesSearch}
          onIndustriesSearch={handleIndustriesSearch}
          onIndustriesScrollToBottom={handleIndustriesScrollToBottom}
          hasMoreIndustries={hasMoreIndustries}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <DataTable<Prompt>
          columns={columns}
          data={promptsWithPagination?.data || []}
          pageCount={promptsWithPagination?.totalPages || DEFAULT_TOTAL_PAGES}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalItems={promptsWithPagination?.total || DEFAULT_TOTAL}
          onPaginationChangeAction={handlePaginationChange}
          loading={isLoading}
        />

        {/* Delete Modal */}
        <ActionModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Xác nhận xóa prompt"
          description={"Bạn có chắc chắn muốn xóa prompt này không?"}
          confirmText="Xóa"
          cancelText="Hủy"
          isLoading={isDeleting}
          variant="destructive"
          itemName={promptToDelete?.title}
        />

        {/* SubType Update Modal */}
        <ActionModal
          isOpen={subTypeModalOpen}
          onClose={handleCloseSubTypeModal}
          onConfirm={handleConfirmSubType}
          title="Xác nhận cập nhật loại prompt"
          description={`Bạn có chắc chắn muốn chuyển ${selectedRows.size} prompt sang loại ${
            selectedSubType === "free" ? "Free" : "Premium"
          } không?`}
          confirmText="Xác nhận"
          cancelText="Hủy"
          isLoading={isUpdating}
          variant="default"
        />

        {/* Bulk Delete Modal */}
        <ActionModal
          isOpen={bulkDeleteModalOpen}
          onClose={handleCloseBulkDeleteModal}
          onConfirm={handleConfirmBulkDelete}
          title="Xác nhận xóa nhiều prompt"
          description={`Bạn có chắc chắn muốn xóa ${selectedRows.size} prompt đã chọn không?`}
          confirmText="Xóa"
          cancelText="Hủy"
          isLoading={isBulkDeleting}
          variant="destructive"
        />
      </div>
    </AdminContentCard>
  );
}
