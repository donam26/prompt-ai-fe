"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { useAdminSectionsQuery, useDeleteSectionMutation } from "@/hooks";
import { SECTIONS_CONSTANTS } from "@/constants/sections";
import type { Section, SectionFilterState } from "@/types/admin";

/**
 * Hook for managing section state and operations
 *
 * @returns Section management state and handlers
 */
export const useSectionManagement = () => {
  const router = useRouter();

  // 🎯 State Management
  const [filters, setFilters] = useState<SectionFilterState>(
    SECTIONS_CONSTANTS.INITIAL_FILTERS
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(
    SECTIONS_CONSTANTS.PAGINATION.DEFAULT_PAGE_SIZE
  );

  // 🔄 Data Hooks
  const { searchTerm, status } = filters;
  const { data: sectionsData, isLoading: sectionsLoading } =
    useAdminSectionsQuery({
      page: currentPage,
      pageSize: pageSize,
      search: searchTerm,
      status: status,
    });

  const deleteSectionMutation = useDeleteSectionMutation();

  // Extract data from API responses
  const sections = sectionsData?.data || [];
  const totalPages = sectionsData?.totalPages || 0;
  const totalItems = sectionsData?.total || 0;

  const isLoading = sectionsLoading;

  // 🔗 Navigation handlers
  const handleAddSection = useCallback(() => {
    router.push(SECTIONS_CONSTANTS.ROUTES.SECTION_CREATE);
  }, [router]);

  const handleEditSection = useCallback(
    (section: Section) => {
      router.push(SECTIONS_CONSTANTS.ROUTES.SECTION_EDIT(section.id));
    },
    [router]
  );

  const handleDeleteSection = useCallback(
    async (section: Section): Promise<void> => {
      try {
        deleteSectionMutation.mutate(section.id);
      } catch {
        // Error deleting section - could be logged to monitoring service
      }
    },
    [deleteSectionMutation]
  );

  // ⚙️ Filter and Pagination Handlers
  const handleFilterChange = useCallback(
    (newFilters: SectionFilterState): void => {
      setFilters(newFilters);
      setCurrentPage(1); // Reset to first page on filter change
    },
    []
  );

  const handlePageChange = useCallback((newPage: number): void => {
    setCurrentPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number): void => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback((): void => {
    setFilters(SECTIONS_CONSTANTS.INITIAL_FILTERS);
    setCurrentPage(1);
  }, []);

  return {
    // State
    filters,
    currentPage,
    pageSize,
    sections,
    totalPages,
    totalItems,
    isLoading,

    // Handlers
    handleAddSection,
    handleEditSection,
    handleDeleteSection,
    handleFilterChange,
    handlePageChange,
    handlePageSizeChange,
    handleClearFilters,
  };
};
