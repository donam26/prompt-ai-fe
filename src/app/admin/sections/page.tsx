"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { debounce } from "@/lib/utils";
import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  SectionFilter,
  SectionHeader,
  createSectionColumns,
  DataTable,
} from "./modules";
// import { INITIAL_FILTER_STATE } from "@/constants";
import { useAdminSectionsQuery, useDeleteSectionMutation } from "@/hooks";
import type { Section, SectionFilterState } from "@/types/admin";

/**
 * Use constants from module
 */
const INITIAL_FILTERS: SectionFilterState = {
  searchTerm: "",
  status: "all",
};

export default function SectionManagementPage(): React.JSX.Element {
  const router = useRouter();

  // 🎯 State Management
  const [filters, setFilters] = useState<SectionFilterState>(INITIAL_FILTERS);
  const [debouncedFilters, setDebouncedFilters] =
    useState<SectionFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounced filter update
  const debouncedFilterUpdate = debounce((newFilters: SectionFilterState) => {
    setDebouncedFilters(newFilters);
  }, 300);

  // Update debounced filters when filters change
  useEffect(() => {
    debouncedFilterUpdate(filters);
  }, [filters, debouncedFilterUpdate]);

  // 🔄 Data Hooks
  const {
    data: sectionsData,
    isLoading: sectionsLoading,
    totalPages,
    totalItems,
  } = useAdminSectionsQuery({
    page: currentPage,
    pageSize: pageSize,
    search: debouncedFilters.searchTerm,
    status: debouncedFilters.status,
  });

  const deleteSectionMutation = useDeleteSectionMutation();

  // Extract data from API responses
  const sections = Array.isArray(sectionsData?.data?.data)
    ? sectionsData.data.data
    : Array.isArray(sectionsData?.data)
      ? sectionsData.data
      : [];

  const isLoading = sectionsLoading;

  // 🔗 Navigation handlers
  const handleAddSection = () => {
    router.push("/admin/sections/create");
  };

  const handleEditSection = (section: Section) => {
    router.push(`/admin/sections/${section.id}`);
  };

  const handleDeleteSection = async (id: string | number): Promise<void> => {
    try {
      deleteSectionMutation.mutate(id);
    } catch {
      // Error deleting section - could be logged to monitoring service
    }
  };

  const handleFilterChange = useCallback(
    (newFilters: SectionFilterState): void => {
      setFilters(newFilters);
      setCurrentPage(1);
    },
    []
  );

  // const handlePageSizeChange = useCallback((newPageSize: number): void => {
  //   setPageSize(newPageSize);
  //   setCurrentPage(1);
  // }, []);

  const handleClearFilters = useCallback((): void => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  }, []);

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
          onPageReset={() => setCurrentPage(1)}
        />

        <DataTable
          columns={columns}
          data={sections}
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
