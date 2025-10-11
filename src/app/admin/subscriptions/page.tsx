"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES_URL } from "@/constants/routes-url";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  SubscriptionFilters,
  SubscriptionHeader,
  useSubscriptionColumns,
  adaptColumnsForDataTable,
} from "./modules";
import { SUBSCRIPTIONS_CONSTANTS } from "@/constants/subscriptions";
import { useSubscriptions, useDeleteSubscription } from "@/hooks/admin";
import type { Subscription } from "@/types";
import type { SubscriptionFilterState } from "@/types/admin/subscription";
import type { PaginationParams } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
} from "@/constants";
import { DataTable } from "@/components/data-table";
import { showToast } from "@/components/ui/toast";
import { ActionModal } from "@/components/admin/action-modal";

export default function SubscriptionManagementPage(): React.JSX.Element {
  const router = useRouter();
  const [filters, setFilters] = useState<SubscriptionFilterState>(
    SUBSCRIPTIONS_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] =
    useState<PaginationParams>(DEFAULT_PAGINATION);

  // Modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] =
    useState<Subscription | null>(null);
  const {
    subscriptionsWithPagination,
    isFetching,
    error: fetchError,
  } = useSubscriptions({
    pagination,
    filters,
  });

  const {
    mutate: deleteSubscription,
    isDeleting,
    error: deleteError,
  } = useDeleteSubscription();

  const handlePaginationChange = useCallback(
    (newPagination: PaginationParams) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoadingData = isFetching || isDeleting;

  // Error handling
  useEffect(() => {
    if (fetchError) {
      showToast.error(fetchError);
    }
  }, [fetchError]);

  useEffect(() => {
    if (deleteError) {
      showToast.error(deleteError);
    }
  }, [deleteError]);

  // Modal handlers
  const handleAddSubscription = () => {
    router.push(`${ROUTES_URL.ADMIN}/subscriptions/new`);
  };

  const handleEditSubscription = (subscription: Subscription) => {
    router.push(`${ROUTES_URL.ADMIN}/subscriptions/${subscription.id}`);
  };

  const handleDeleteSubscription = (subscription: Subscription): void => {
    setSubscriptionToDelete(subscription);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!subscriptionToDelete) return;

    const result = await deleteSubscription(subscriptionToDelete.id!);
    if (result) {
      showToast.success(SUBSCRIPTIONS_CONSTANTS.MESSAGES.DELETE_SUCCESS);
      setDeleteModalOpen(false);
      setSubscriptionToDelete(null);
    }
  };

  const handleCloseDeleteModal = (): void => {
    setDeleteModalOpen(false);
    setSubscriptionToDelete(null);
  };

  const handleFilterChange = useCallback(
    (newFilters: SubscriptionFilterState): void => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
    },
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(SUBSCRIPTIONS_CONSTANTS.INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  // Create columns with handlers
  const tanstackColumns = useSubscriptionColumns({
    onEdit: handleEditSubscription,
    onDelete: handleDeleteSubscription,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <SubscriptionHeader
          onAddSubscription={handleAddSubscription}
          filters={filters}
          disabled={isLoadingData}
        />

        <SubscriptionFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <DataTable<Subscription>
          columns={columns}
          data={subscriptionsWithPagination?.data || []}
          pageCount={
            subscriptionsWithPagination?.totalPages || DEFAULT_TOTAL_PAGES
          }
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalItems={subscriptionsWithPagination?.total || DEFAULT_TOTAL}
          onPaginationChangeAction={handlePaginationChange}
          loading={isLoadingData}
        />

        {/* Delete Modal */}
        <ActionModal
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Xác nhận xóa gói đăng ký"
          description="Bạn có chắc chắn muốn xóa gói đăng ký này không?"
          confirmText="Xóa"
          cancelText="Hủy"
          isLoading={isDeleting}
          variant="destructive"
          itemName={subscriptionToDelete?.name}
        />
      </div>
    </AdminContentCard>
  );
}
