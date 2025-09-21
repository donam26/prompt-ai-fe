"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { debounce } from "@/lib/utils";
import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  PromptFilter,
  PromptHeader,
  createPromptColumns,
  DataTable,
} from "./modules";
import { INITIAL_FILTER_STATE } from "@/constants";
import {
  useAdminPromptsQuery,
  useAdminCategoriesQuery,
  useDeletePromptMutation,
} from "@/hooks";
import type { Prompt, PromptFilterState } from "@/types/admin";

/**
 * Use constants from module
 */
const INITIAL_FILTERS: PromptFilterState = {
  searchTerm: "",
  categoryId: "all",
  status: "all",
  isPremium: "all",
  tags: [],
};

/**
 * Prompt management page component following Berklee pattern
 * Main Management Page with state management, data hooks, and UI components
 *
 * @returns The prompt management page JSX
 */
export default function PromptManagementPage(): React.JSX.Element {
  const router = useRouter();

  // 🎯 State Management
  const [filters, setFilters] = useState<PromptFilterState>(INITIAL_FILTERS);
  const [debouncedFilters, setDebouncedFilters] =
    useState<PromptFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounced filter update
  const debouncedFilterUpdate = debounce((newFilters: PromptFilterState) => {
    setDebouncedFilters(newFilters);
  }, 300);

  // Update debounced filters when filters change
  useEffect(() => {
    debouncedFilterUpdate(filters);
  }, [filters, debouncedFilterUpdate]);

  // 🔄 Data Hooks
  const {
    data: promptsData,
    isLoading: promptsLoading,
    totalPages,
    totalItems,
  } = useAdminPromptsQuery({
    page: currentPage,
    pageSize: pageSize,
    search: debouncedFilters.searchTerm,
    categoryId: debouncedFilters.categoryId,
    status: debouncedFilters.status,
    isPremium: debouncedFilters.isPremium,
    tags: [...debouncedFilters.tags],
  });

  const { data: categoriesData, isLoading: categoriesLoading } =
    useAdminCategoriesQuery();
  const deletePromptMutation = useDeletePromptMutation();

  // Extract data from API responses
  const prompts = Array.isArray(promptsData?.data?.data)
    ? promptsData.data.data
    : Array.isArray(promptsData?.data)
      ? promptsData.data
      : [];
  const categories = Array.isArray(categoriesData?.data?.data)
    ? categoriesData.data.data
    : Array.isArray(categoriesData?.data)
      ? categoriesData.data
      : [];

  const isLoading = promptsLoading || categoriesLoading;

  // 🔗 Navigation handlers
  const handleAddPrompt = () => {
    router.push("/admin/prompts/create");
  };

  const handleEditPrompt = (prompt: Prompt) => {
    router.push(`/admin/prompts/${prompt.id}`);
  };

  const handleViewPrompt = (prompt: Prompt) => {
    router.push(`/admin/prompts/${prompt.id}/view`);
  };

  const handleDeletePrompt = async (id: string | number): Promise<void> => {
    try {
      deletePromptMutation.mutate(id);
    } catch {
      // Error deleting prompt - could be logged to monitoring service
    }
  };

  const handleTogglePublic = () => {
    // TODO: Implement toggle public functionality
    // console.log("Toggle public for prompt");
  };

  const handleFilterChange = useCallback(
    (newFilters: PromptFilterState): void => {
      setFilters(newFilters);
      setCurrentPage(1);
    },
    []
  );

  const handlePageSizeChange = useCallback((newPageSize: number): void => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback((): void => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  }, []);

  // Create columns with handlers
  const columns = createPromptColumns({
    onEdit: handleEditPrompt,
    onDelete: handleDeletePrompt,
    onView: handleViewPrompt,
    onTogglePublic: handleTogglePublic,
  });

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <PromptHeader onAddPrompt={handleAddPrompt} />

        <PromptFilter
          filters={filters}
          categories={categories}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() => setCurrentPage(1)}
        />

        <DataTable
          columns={columns}
          data={prompts}
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
