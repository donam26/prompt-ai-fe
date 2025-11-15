"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  PaymentFilters,
  PaymentHeader,
  usePaymentColumns,
  adaptColumnsForDataTable,
} from "./modules";
import { PAYMENTS_CONSTANTS } from "@/constants/payments";
import { usePayments, useDeletePayment } from "@/hooks/admin/usePayment";
import { useSubscriptions } from "@/hooks/admin/useSubscription";
import type { Payment } from "@/types";
import type { PaymentFilterState } from "@/types/admin/payment";
import type { PaginationParams as IPagination } from "@/types/base";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL_PAGES,
  DEFAULT_TOTAL,
} from "@/constants";
import { DataTable } from "@/components/data-table";
import { ActionModal } from "@/components/admin/action-modal";
import type { SubscriptionFilterState } from "@/types/admin/subscription";
import { debounce } from "@/lib/utils";
import { useDeepMemo } from "@/hooks/useDeepMemo";

export default function PaymentManagementPage(): React.JSX.Element {
  const router = useRouter();

  const [filters, setFilters] = useState<PaymentFilterState>(
    PAYMENTS_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] = useState<IPagination>(DEFAULT_PAGINATION);

  // Modal states
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    paymentsWithPagination,
    isFetching: paymentsLoading,
    refetch,
  } = usePayments({
    pagination,
    filters,
  });

  // Subscriptions state management for infinite scroll and search in filter
  const [subscriptionsSearch, setSubscriptionsSearch] = useState<string>("");
  const [subscriptionsPagination, setSubscriptionsPagination] =
    useState<IPagination>({
      pageIndex: 0,
      pageSize: 10,
    });
  const [allSubscriptions, setAllSubscriptions] = useState<any[]>([]);

  // Debounced search handler - update subscriptionsSearch after 1 second
  const debouncedSetSubscriptionsSearch = useRef(
    debounce((search: string) => {
      setSubscriptionsSearch(search);
    }, 1000)
  ).current;

  // Build filters for subscriptions
  const subscriptionsFilters = useMemo<
    SubscriptionFilterState | undefined
  >(() => {
    const hasSearch = !!subscriptionsSearch.trim();
    const filters: SubscriptionFilterState = {
      searchTerm: hasSearch ? subscriptionsSearch.trim() : "",
    };
    return filters;
  }, [subscriptionsSearch]);

  // Fetch subscriptions with pagination and search
  const { subscriptionsWithPagination, isFetching: subscriptionsLoading } =
    useSubscriptions({
      pagination: subscriptionsPagination,
      filters: subscriptionsFilters,
    });

  // Reset subscriptions when search changes
  useEffect(() => {
    setSubscriptionsPagination(prev => ({ ...prev, pageIndex: 0 }));
    setAllSubscriptions([]);
  }, [subscriptionsSearch]);

  // Memoize subscriptions data with deep comparison to prevent infinite loops
  const subscriptionsDataRaw = subscriptionsWithPagination?.data || [];
  const subscriptionsData = useDeepMemo(subscriptionsDataRaw);

  const currentSubscriptionsPageIndex = subscriptionsPagination.pageIndex;

  // Accumulate subscriptions data for infinite scroll
  useEffect(() => {
    if (subscriptionsData.length > 0 || currentSubscriptionsPageIndex === 0) {
      if (currentSubscriptionsPageIndex === 0) {
        setAllSubscriptions(subscriptionsData);
      } else {
        setAllSubscriptions(prev => {
          const existingIds = new Set(prev.map(s => s.id));
          const newItems = subscriptionsData.filter(
            s => !existingIds.has(s.id)
          );
          return [...prev, ...newItems];
        });
      }
    }
  }, [subscriptionsData, currentSubscriptionsPageIndex]);

  // Handle subscriptions search change with debounce
  const handleSubscriptionsSearch = useCallback(
    (search: string) => {
      debouncedSetSubscriptionsSearch(search);
    },
    [debouncedSetSubscriptionsSearch]
  );

  // Extract stable values to prevent infinite loops
  const subscriptionsTotalPages = subscriptionsWithPagination?.totalPages || 1;
  const subscriptionsCurrentPageIndex = subscriptionsPagination.pageIndex;

  // Handle subscriptions scroll to bottom (load more)
  const handleSubscriptionsScrollToBottom = useCallback(() => {
    if (subscriptionsCurrentPageIndex + 1 < subscriptionsTotalPages) {
      setSubscriptionsPagination(prev => ({
        ...prev,
        pageIndex: prev.pageIndex + 1,
      }));
    }
  }, [subscriptionsTotalPages, subscriptionsCurrentPageIndex]);

  // Check if there are more subscriptions to load
  const hasMoreSubscriptions = useMemo(() => {
    return subscriptionsCurrentPageIndex + 1 < subscriptionsTotalPages;
  }, [subscriptionsTotalPages, subscriptionsCurrentPageIndex]);

  const { mutate: deletePayment, isLoading: isDeleting } = useDeletePayment();

  const handlePaginationChange = useCallback(
    (newPagination: IPagination) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = paymentsLoading || isDeleting;

  const handleViewPayment = (payment: Payment) => {
    router.push(PAYMENTS_CONSTANTS.ROUTES.PAYMENT_VIEW(payment.id));
  };

  const handleDeletePaymentClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedPayment) {
      const success = await deletePayment(selectedPayment);
      if (success) {
        setIsDeleteModalOpen(false);
        setSelectedPayment(null);
        refetch();
      }
    }
  };

  const handleFilterChange = useCallback(
    (newFilters: PaymentFilterState): void => {
      setFilters(newFilters);
      setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
    },
    []
  );

  const handleClearFilters = useCallback((): void => {
    setFilters(PAYMENTS_CONSTANTS.INITIAL_FILTERS);
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }));
  }, []);

  // Create columns with handlers
  const tanstackColumns = usePaymentColumns({
    onViewAction: handleViewPayment,
    onDeleteAction: handleDeletePaymentClick,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <PaymentHeader />

        <PaymentFilters
          filters={filters}
          subscriptions={allSubscriptions}
          subscriptionsLoading={subscriptionsLoading}
          subscriptionsSearch={subscriptionsSearch}
          onSubscriptionsSearch={handleSubscriptionsSearch}
          onSubscriptionsScrollToBottom={handleSubscriptionsScrollToBottom}
          hasMoreSubscriptions={hasMoreSubscriptions}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() =>
            setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
          }
        />

        <DataTable<Payment>
          columns={columns}
          data={paymentsWithPagination?.data || []}
          pageCount={paymentsWithPagination?.totalPages || DEFAULT_TOTAL_PAGES}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          totalItems={paymentsWithPagination?.total || DEFAULT_TOTAL}
          onPaginationChangeAction={handlePaginationChange}
          loading={isLoading}
        />

        <ActionModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedPayment(null);
          }}
          onConfirm={handleDeleteConfirm}
          title="Xóa giao dịch thanh toán"
          description="Bạn có chắc chắn muốn xóa giao dịch thanh toán này không? Hành động này không thể hoàn tác."
          confirmText="Xóa"
          cancelText="Hủy"
          isLoading={isDeleting}
          variant="destructive"
          itemName={`#${selectedPayment?.id}`}
        />
      </div>
    </AdminContentCard>
  );
}
