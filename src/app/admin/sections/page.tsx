"use client";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  SectionFilter,
  SectionHeader,
  createSectionColumns,
  DataTable,
} from "./modules";
import { useSectionManagement } from "@/hooks/admin/useSection";

export default function SectionManagementPage(): React.JSX.Element {
  const {
    filters,
    currentPage,
    pageSize,
    sections,
    totalPages,
    totalItems,
    isLoading,
    handleAddSection,
    handleEditSection,
    handleDeleteSection,
    handleFilterChange,
    handlePageChange,
    handlePageSizeChange,
    handleClearFilters,
  } = useSectionManagement();

  // Create columns with handlers
  const columns = createSectionColumns({
    onEdit: handleEditSection,
    onDelete: handleDeleteSection,
  });

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <SectionHeader onAddSection={handleAddSection} />

        <SectionFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() => handlePageChange(1)}
        />

        <DataTable
          columns={columns}
          data={sections}
          pagination={{
            currentPage: currentPage,
            totalPages: totalPages,
            totalItems: totalItems,
            pageSize: pageSize,
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
            showPrevNext: true,
            maxVisiblePages: 5,
          }}
          loading={isLoading}
        />
      </div>
    </AdminContentCard>
  );
}
