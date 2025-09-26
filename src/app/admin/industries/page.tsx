"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  IndustryFilter,
  IndustryHeader,
  createIndustryColumns,
  DataTable,
} from "./modules";
import type { IndustryFilterState } from "@/types/admin";
import { INDUSTRIES_CONSTANTS } from "@/constants/industries";
import { Industry } from "@/lib/types";
import { useAdminIndustries } from "@/hooks/admin/useIndustry";

const INITIAL_FILTERS: IndustryFilterState = {
  searchTerm: "",
  status: "all",
};

export default function IndustryManagementPage(): React.JSX.Element {
  const router = useRouter();

  // 🎯 State Management
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    totalItems: 0,
  });
  const [filters, setFilters] = useState<IndustryFilterState>(INITIAL_FILTERS);

  // 🔄 Data Hooks
  const { industriesWithPagination, isLoading: industriesLoading } =
    useAdminIndustries({
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      search: filters.searchTerm,
      status: filters.status,
    });

  const deleteIndustryMutation = useDeleteIndustryMutation();

  // Extract data from API responses
  const industries = Array.isArray(industriesData?.data?.data)
    ? industriesData.data.data
    : Array.isArray(industriesData?.data)
      ? industriesData.data
      : [];

  const isLoading = industriesLoading;

  // Update pagination when data changes
  React.useEffect(() => {
    if (industriesWithPagination) {
      setPagination(prev => ({
        ...prev,
        totalPages: industriesWithPagination.totalPages || 0,
        totalItems: industriesWithPagination.total || 0,
      }));
    }
  }, [industriesWithPagination]);

  // 🔗 Navigation handlers
  const handleAddIndustry = () => {
    router.push(INDUSTRIES_CONSTANTS.ROUTES.INDUSTRY_CREATE);
  };

  const handleEditIndustry = (industry: Industry) => {
    router.push(INDUSTRIES_CONSTANTS.ROUTES.INDUSTRY_EDIT(industry.id));
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
      setPagination(prev => ({ ...prev, currentPage: 1 }));
    },
    []
  );

  // const handlePageSizeChange = useCallback((newPageSize: number): void => {
  //   setPageSize(newPageSize);
  //   setCurrentPage(1);
  // }, []);

  const handleClearFilters = useCallback((): void => {
    setFilters(INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
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
          onPageReset={() =>
            setPagination(prev => ({ ...prev, currentPage: 1 }))
          }
        />

        <DataTable
          columns={columns}
          data={industries}
          pagination={{
            currentPage: pagination.currentPage,
            totalPages: industriesWithPagination?.totalPages || 0,
            totalItems: industriesWithPagination?.total,
            pageSize: pagination.pageSize,
            onPageChange: (page: number) =>
              setPagination(prev => ({ ...prev, currentPage: page })),
            onPageSizeChange: (newPageSize: number) => {
              setPagination(prev => ({
                ...prev,
                pageSize: newPageSize,
                currentPage: 1,
              }));
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
