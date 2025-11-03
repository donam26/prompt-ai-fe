"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  FeedbackFilters,
  FeedbackHeader,
  useFeedbackColumns,
  adaptColumnsForDataTable,
} from "@/app/admin/feedbacks/modules";
import { useFeedbacks } from "@/hooks/admin/useFeedback";
import type { FeedbackFilterState, Feedback } from "@/types";
import type { PaginationParams as IPagination } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
  FEEDBACKS_CONSTANTS,
} from "@/constants";
import { DataTable } from "@/components/data-table";

export default function FeedbackManagementPage(): React.JSX.Element {
  const router = useRouter();

  const [filters, setFilters] = useState<FeedbackFilterState>(
    FEEDBACKS_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] = useState<IPagination>(DEFAULT_PAGINATION);

  const { feedbacksWithPagination, isFetching: feedbacksLoading } =
    useFeedbacks({
      pagination,
      filters,
    });

  const handlePaginationChange = useCallback(
    (newPagination: IPagination) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = feedbacksLoading;

  const handleViewFeedback = (feedback: Feedback) => {
    router.push(FEEDBACKS_CONSTANTS.ROUTES.FEEDBACK_VIEW(feedback.id));
  };

  const handleFilterChange = useCallback(
    (newFilters: FeedbackFilterState): void => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
    },
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(FEEDBACKS_CONSTANTS.INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  // Create columns with handlers
  const tanstackColumns = useFeedbackColumns({
    onViewAction: handleViewFeedback,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <FeedbackHeader />

        <FeedbackFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <DataTable<Feedback>
          columns={columns}
          data={feedbacksWithPagination?.data || []}
          pageCount={feedbacksWithPagination?.totalPages || DEFAULT_TOTAL_PAGES}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalItems={feedbacksWithPagination?.total || DEFAULT_TOTAL}
          onPaginationChangeAction={handlePaginationChange}
          loading={isLoading}
        />
      </div>
    </AdminContentCard>
  );
}
