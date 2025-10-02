"use client";

import { useState, useCallback } from "react";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  SectionFilter,
  SectionHeader,
  useSectionColumns,
  adaptColumnsForDataTable,
  SectionFormModal,
} from "./modules";
import { SECTIONS_CONSTANTS } from "@/constants/sections";
import { useSections } from "@/hooks";
import { useDeleteSection, useUpsertSection } from "@/hooks/admin/useSection";
import type { Section } from "@/types";
import type { SectionFilterState } from "@/types/admin/section";
import type { PaginationParams } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
} from "@/constants";
import { DataTable } from "@/components/data-table";
import { showToast } from "@/components/ui/toast";
import { ActionModal } from "@/components/admin/action-modal";

export default function SectionManagementPage(): React.JSX.Element {
  const [filters, setFilters] = useState<SectionFilterState>(
    SECTIONS_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] =
    useState<PaginationParams>(DEFAULT_PAGINATION);

  // Modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<Section | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);

  const { sectionsWithPagination, isFetching: sectionsLoading } = useSections({
    pagination,
    filters,
  });

  const { mutate: deleteSection, isLoading: isDeleting } = useDeleteSection();
  const { mutate: upsertSection, isUpserting } = useUpsertSection();

  const handlePaginationChange = useCallback(
    (newPagination: PaginationParams) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = sectionsLoading || isDeleting || isUpserting;

  // 🔗 Modal handlers
  const handleAddSection = () => {
    setEditingSection(null);
    setFormModalOpen(true);
  };

  const handleEditSection = (section: Section) => {
    setEditingSection(section);
    setFormModalOpen(true);
  };

  const handleDeleteSection = (section: Section): void => {
    setSectionToDelete(section);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!sectionToDelete) return;
    await deleteSection(sectionToDelete);
    setDeleteModalOpen(false);
    setSectionToDelete(null);
  };

  const handleCloseDeleteModal = (): void => {
    setDeleteModalOpen(false);
    setSectionToDelete(null);
  };

  const handleSubmitSection = async (sectionData: any): Promise<void> => {
    try {
      await upsertSection(sectionData);
      setFormModalOpen(false);
      setEditingSection(null);
    } catch (error) {
      console.error("Submit section error:", error);
      // Error will be handled by the hook
    }
  };

  const handleCloseFormModal = (): void => {
    setFormModalOpen(false);
    setEditingSection(null);
  };

  const handleSuccess = (): void => {
    // This can be used for additional success handling if needed
  };

  const handleFilterChange = useCallback(
    (newFilters: SectionFilterState): void => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
    },
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(SECTIONS_CONSTANTS.INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  // Create columns with handlers
  const tanstackColumns = useSectionColumns({
    onEditAction: handleEditSection,
    onDeleteAction: handleDeleteSection,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <SectionHeader onAddSection={handleAddSection} />

        <SectionFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <DataTable<Section>
          columns={columns}
          data={sectionsWithPagination?.data || []}
          pageCount={sectionsWithPagination?.totalPages || DEFAULT_TOTAL_PAGES}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalItems={sectionsWithPagination?.total || DEFAULT_TOTAL}
          onPaginationChangeAction={handlePaginationChange}
          loading={isLoading}
        />

        {editingSection && (
          <SectionFormModal
            section={editingSection}
            onSubmit={handleSubmitSection}
            onCancel={handleCloseFormModal}
            isLoading={isUpserting}
            isOpen={formModalOpen}
          />
        )}

        {/* Delete Modal */}
        <ActionModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Xác nhận xóa section"
          description="Bạn có chắc chắn muốn xóa section này không?"
          confirmText="Xóa"
          cancelText="Hủy"
          isLoading={isDeleting}
          variant="destructive"
          itemName={sectionToDelete?.name}
        />
      </div>
    </AdminContentCard>
  );
}
