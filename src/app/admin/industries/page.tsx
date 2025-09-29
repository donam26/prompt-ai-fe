"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  IndustryFilter,
  IndustryHeader,
  useIndustryColumns,
  adaptColumnsForDataTable,
} from "./modules";
import { INDUSTRIES_CONSTANTS } from "@/constants/industries";
import { useIndustries } from "@/hooks";
import { useDeleteIndustry } from "@/hooks/admin/useIndustry/useDeleteIndustry";
import type { Industry } from "@/types";
import type { IndustryFilterState } from "@/types/admin/industry";
import type { PaginationParams as IPagination } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
} from "@/constants";
import { DataTable } from "@/components/data-table";

export default function IndustryManagementPage(): React.JSX.Element {
  const router = useRouter();

  const [filters, setFilters] = useState<IndustryFilterState>(
    INDUSTRIES_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] = useState<IPagination>(DEFAULT_PAGINATION);

  const { industriesWithPagination, isLoading: industriesLoading } =
    useIndustries({
      pagination,
      filters,
    });

  const { mutate: deleteIndustry, isLoading: isDeleting } = useDeleteIndustry();

  const handlePaginationChange = useCallback(
    (newPagination: IPagination) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = industriesLoading || isDeleting;

  // 🔗 Navigation handlers
  const handleAddIndustry = () => {
    router.push(INDUSTRIES_CONSTANTS.ROUTES.INDUSTRY_CREATE);
  };

  const handleEditIndustry = (industry: Industry) => {
    router.push(INDUSTRIES_CONSTANTS.ROUTES.INDUSTRY_EDIT(industry.id));
  };

  const handleDeleteIndustry = async (industry: Industry): Promise<void> => {
    const success = await deleteIndustry(industry);
    if (success) {
      // Industry deleted successfully - could trigger refresh or other actions
      // The hook already handles toast notifications
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
    onDeleteAction: handleDeleteIndustry,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <IndustryHeader onAddIndustry={handleAddIndustry} />

        <IndustryFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
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
      </div>
    </AdminContentCard>
  );
}
