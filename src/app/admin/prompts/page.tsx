"use client";

import { useState, useCallback } from "react";
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
import { usePrompts, useCategories } from "@/hooks";
import { useDeletePrompt, useBulkUpdateSubType } from "@/hooks/admin/usePrompt";
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
  } = useCategories({
    pagination: {
      pageIndex: 0,
      pageSize: 100,
    },
  });

  const { mutate: deletePrompt, isLoading: isDeleting } = useDeletePrompt();
  const { updateSubType, isUpdating } = useBulkUpdateSubType();

  const handlePaginationChange = useCallback(
    (newPagination: PaginationParams) => {
      setPagination(prev => ({ ...prev, ...newPagination }));
      // Clear selection when page changes
      setSelectedRows(new Set());
    },
    []
  );

  const isLoading =
    promptsLoading || categoriesLoading || isDeleting || isUpdating;

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
          isLoading={isUpdating}
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
      </div>
    </AdminContentCard>
  );
}
