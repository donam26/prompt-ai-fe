"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  PromptFilter,
  PromptHeader,
  usePromptColumns,
  adaptColumnsForDataTable,
} from "./modules";
import { PROMPTS_CONSTANTS } from "@/constants/prompts";
import { usePrompts, useCategories, useIndustries } from "@/hooks";
import { useDeletePrompt } from "@/hooks/admin/usePrompt/useDeletePrompt";
import type { Prompt } from "@/lib/types";
import type { PromptFilterState } from "@/types/admin/prompt";
import { IPagination } from "@/types/common";
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

  const [pagination, setPagination] = useState<IPagination>(DEFAULT_PAGINATION);

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
  } = useCategories();

  const {
    industriesWithPagination: industriesData,
    isLoading: industriesLoading,
  } = useIndustries();

  const { mutate: deletePrompt, isLoading: isDeleting } = useDeletePrompt();

  const handlePaginationChange = useCallback(
    (newPagination: IPagination) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading =
    promptsLoading || categoriesLoading || industriesLoading || isDeleting;

  const handleAddPrompt = () => {
    router.push(PROMPTS_CONSTANTS.ROUTES.PROMPT_CREATE);
  };

  const handleEditPrompt = (prompt: Prompt) => {
    router.push(PROMPTS_CONSTANTS.ROUTES.PROMPT_EDIT(prompt.id));
  };

  const handleDeletePrompt = async (prompt: Prompt): Promise<void> => {
    const success = await deletePrompt(prompt);
    if (success) {
      refetch();
    }
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

  // Create columns with handlers
  const tanstackColumns = usePromptColumns({
    onEditAction: handleEditPrompt,
    onDeleteAction: handleDeletePrompt,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <PromptHeader onAddPrompt={handleAddPrompt} />

        <PromptFilter
          filters={filters}
          categories={categoriesData?.data || []}
          industries={(industriesData?.data as any[]) || []}
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
      </div>
    </AdminContentCard>
  );
}
