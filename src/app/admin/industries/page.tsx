"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { debounce } from "@/lib/utils";
import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  IndustryFilter,
  IndustryHeader,
  createIndustryColumns,
  DataTable,
} from "./modules";
import type { IndustryFilterState } from "@/types/admin";

const INITIAL_FILTERS: IndustryFilterState = {
  searchTerm: "",
  status: "all",
};

export default function IndustryManagementPage(): React.JSX.Element {
  const router = useRouter();

  // 🎯 State Management
  const [filters, setFilters] = useState<IndustryFilterState>(INITIAL_FILTERS);
  const [debouncedFilters, setDebouncedFilters] =
    useState<IndustryFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounced filter update
  const debouncedFilterUpdate = debounce((newFilters: IndustryFilterState) => {
    setDebouncedFilters(newFilters);
  }, 300);

  // Update debounced filters when filters change
  useEffect(() => {
    debouncedFilterUpdate(filters);
  }, [filters, debouncedFilterUpdate]);

  // 🔄 Data Hooks
  const {
    data: industriesData,
    isLoading: industriesLoading,
    totalPages,
    totalItems,
  } = useAdminIndustriesQuery({
    page: currentPage,
    pageSize: pageSize,
    search: debouncedFilters.searchTerm,
    status: debouncedFilters.status,
  });

  const deleteIndustryMutation = useDeleteIndustryMutation();

  // Extract data from API responses
  const industries = Array.isArray(industriesData?.data?.data)
    ? industriesData.data.data
    : Array.isArray(industriesData?.data)
      ? industriesData.data
      : [];

  const isLoading = industriesLoading;

  // 🔗 Navigation handlers
  const handleAddIndustry = () => {
    router.push("/admin/industries/create");
  };

  const handleEditIndustry = (industry: Industry) => {
    router.push(`/admin/industries/${industry.id}`);
  };

  const handleDeleteIndustry = async (id: string | number): Promise<void> => {
    try {
      deleteIndustryMutation.mutate(id);
    } catch {
      // Error deleting industry - could be logged to monitoring service
    }
  };

  const handleFilterChange = useCallback(
    (newFilters: IndustryFilterState): void => {
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
  const columns = createIndustryColumns({
    onEdit: handleEditIndustry,
    onDelete: handleDeleteIndustry,
  });

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <IndustryHeader onAddIndustry={handleAddIndustry} />

        <IndustryFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() => setCurrentPage(1)}
        />

        <DataTable
          columns={columns}
          data={industries}
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
