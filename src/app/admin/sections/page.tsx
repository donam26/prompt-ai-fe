"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  SectionFilter,
  SectionHeader,
  useSectionColumns,
  adaptColumnsForDataTable,
} from "./modules";
import { SECTIONS_CONSTANTS } from "@/constants/sections";
import { useSections } from "@/hooks";
import { useDeleteSection } from "@/hooks/admin/useSection/useDeleteSection";
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

export default function SectionManagementPage(): React.JSX.Element {
  const router = useRouter();

  const [filters, setFilters] = useState<SectionFilterState>(
    SECTIONS_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] =
    useState<PaginationParams>(DEFAULT_PAGINATION);

  const { sectionsWithPagination, isFetching: sectionsLoading } = useSections({
    pagination,
    filters,
  });

  const { mutate: deleteSection, isLoading: isDeleting } = useDeleteSection();

  const handlePaginationChange = useCallback(
    (newPagination: PaginationParams) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = sectionsLoading || isDeleting;

  // 🔗 Navigation handlers
  const handleAddSection = () => {
    router.push(SECTIONS_CONSTANTS.ROUTES.SECTION_CREATE);
  };

  const handleEditSection = (section: Section) => {
    router.push(SECTIONS_CONSTANTS.ROUTES.SECTION_EDIT(section.id));
  };

  const handleDeleteSection = async (section: Section): Promise<void> => {
    const success = await deleteSection(section);
    if (success) {
      // Section deleted successfully - could trigger refresh or other actions
      // The hook already handles toast notifications
    }
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
      </div>
    </AdminContentCard>
  );
}
