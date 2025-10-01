"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  PromptFilter,
  PromptHeader,
  usePromptColumns,
  adaptColumnsForDataTable,
} from "./modules";
import { PROMPTS_CONSTANTS } from "@/constants/prompts";
import { usePrompts, useCategories } from "@/hooks";
import { useDeletePrompt } from "@/hooks/admin/usePrompt/useDeletePrompt";
import { DeletePromptModal } from "@/components/admin/delete-prompt-modal";
import type { Prompt, PromptFilterState } from "@/types";
import type { PaginationParams } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
} from "@/constants";
import { DataTable } from "@/components/data-table";

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

  const {
    promptsWithPagination,
    isFetching: promptsLoading,
    refetch,
  } = usePrompts({
    pagination,
    filters,
  });

  const {
    categoriesWithPagination: categoriesData,
    isFetching: categoriesLoading,
  } = useCategories();

  const { mutate: deletePrompt, isLoading: isDeleting } = useDeletePrompt();

  const handlePaginationChange = useCallback(
    (newPagination: PaginationParams) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = promptsLoading || categoriesLoading || isDeleting;

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

  // Create columns with handlers
  const tanstackColumns = usePromptColumns({
    onEditAction: handleEditPrompt,
    onDeleteAction: handleDeletePrompt,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <PromptHeader
          onAddPrompt={handleAddPrompt}
          filters={filters}
          disabled={!promptsWithPagination?.data.length}
        />

        <PromptFilter
          filters={filters}
          categories={categoriesData?.data || []}
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
        <DeletePromptModal
          prompt={promptToDelete}
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          isLoading={isDeleting}
        />
      </div>
    </AdminContentCard>
  );
}
