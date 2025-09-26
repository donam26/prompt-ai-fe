"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  PromptFilter,
  PromptHeader,
  createPromptColumns,
  DataTable,
} from "./modules";
import { PROMPTS_CONSTANTS } from "@/constants/prompts";
import {
  useAdminPromptsQuery,
  useAdminCategoriesQuery,
  useDeletePromptMutation,
} from "@/hooks";
import type { PromptFilterState } from "@/types/admin";
import { Prompt } from "@/lib/types";

export default function PromptManagementPage(): React.JSX.Element {
  const router = useRouter();

  // 🎯 State Management
  const [filters, setFilters] = useState<PromptFilterState>(
    PROMPTS_CONSTANTS.INITIAL_FILTERS
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(
    PROMPTS_CONSTANTS.PAGINATION.DEFAULT_PAGE_SIZE
  );

  // 🔄 Data Hooks
  const { searchTerm, categoryId, status, isPremium, tags } = filters;
  const {
    data: promptsData,
    isLoading: promptsLoading,
    totalPages,
    totalItems,
  } = useAdminPromptsQuery({
    page: currentPage,
    pageSize: pageSize,
    search: searchTerm,
    categoryId: categoryId,
    status: status,
    isPremium: isPremium,
    tags: [...tags],
  });

  const { categories: categoriesData, isLoading: categoriesLoading } =
    useAdminCategoriesQuery();
  const { mutate: deletePrompt } = useDeletePromptMutation();

  const prompts = Array.isArray(promptsData?.data?.data)
    ? promptsData.data.data
    : Array.isArray(promptsData?.data)
      ? promptsData.data
      : [];

  const isLoading = promptsLoading || categoriesLoading;

  // useEffect(() => {
  //   if (deleteError) {
  //     // Handle delete error - could show toast notification
  //   }
  // }, [deleteError]);

  const handleAddPrompt = () => {
    router.push(PROMPTS_CONSTANTS.ROUTES.PROMPT_CREATE);
  };

  const handleEditPrompt = (prompt: Prompt) => {
    router.push(PROMPTS_CONSTANTS.ROUTES.PROMPT_EDIT(prompt.id));
  };

  const handleViewPrompt = (prompt: Prompt) => {
    router.push(PROMPTS_CONSTANTS.ROUTES.PROMPT_VIEW(prompt.id));
  };

  const handleDeletePrompt = async (id: string | number): Promise<void> => {
    try {
      deletePrompt(id);
    } catch {
      // Error deleting prompt - could be logged to monitoring service
    }
  };

  const handleTogglePublic = () => {
    // TODO: Implement toggle public functionality
  };

  const handleFilterChange = useCallback(
    (newFilters: PromptFilterState): void => {
      setFilters(newFilters);
      setCurrentPage(1);
    },
    []
  );

  const handlePaginationChange = useCallback(
    (newPagination: { currentPage?: number; pageSize?: number }) => {
      if (newPagination.currentPage) setCurrentPage(newPagination.currentPage);
      if (newPagination.pageSize) setPageSize(newPagination.pageSize);
    },
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(PROMPTS_CONSTANTS.INITIAL_FILTERS);
    setCurrentPage(1);
  }, []);

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
          categories={categoriesData}
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
            onPageChange: (page: number) =>
              handlePaginationChange({ currentPage: page }),
            onPageSizeChange: (newPageSize: number) => {
              handlePaginationChange({ pageSize: newPageSize, currentPage: 1 });
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
