"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

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
  DEFAULT_PAGE_MAX_SIZE,
} from "@/constants";
import { DataTable } from "@/components/data-table";

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

  const { categories } = useCategories({
    pagination: {
      pageIndex: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_MAX_SIZE,
    },
  });

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
          categories={categories}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <IndustryActiveFilters
          filters={filters}
          categories={categories}
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
