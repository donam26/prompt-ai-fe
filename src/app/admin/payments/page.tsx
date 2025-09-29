"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  PaymentFilter,
  PaymentHeader,
  usePaymentColumns,
  adaptColumnsForDataTable,
} from "./modules";
import { PAYMENTS_CONSTANTS } from "@/constants/payments";
import { useAdminPaymentsQuery } from "@/hooks";
import { useDeletePayment } from "@/hooks/admin/usePayment/useDeletePayment";
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

export default function PaymentManagementPage(): React.JSX.Element {
  const router = useRouter();

  const [filters, setFilters] = useState<PaymentFilterState>(
    PAYMENTS_CONSTANTS.INITIAL_FILTERS
  );

  const [pagination, setPagination] = useState<IPagination>(DEFAULT_PAGINATION);

  const { paymentsWithPagination, isFetching: paymentsLoading } =
    useAdminPaymentsQuery({
      pagination,
      filters,
    });

  const { mutate: deletePayment, isLoading: isDeleting } = useDeletePayment();

  const handlePaginationChange = useCallback(
    (newPagination: IPagination) =>
      setPagination(prev => ({ ...prev, ...newPagination })),
    []
  );

  const isLoading = paymentsLoading || isDeleting;

  // 🔗 Navigation handlers
  const handleViewPayment = (payment: Payment) => {
    router.push(PAYMENTS_CONSTANTS.ROUTES.PAYMENT_VIEW(payment.id));
  };

  const handleDeletePayment = async (payment: Payment): Promise<void> => {
    const success = await deletePayment(payment);
    if (success) {
      // Payment deleted successfully - could trigger refresh or other actions
      // The hook already handles toast notifications
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
    onDeleteAction: handleDeletePayment,
  });
  const columns = adaptColumnsForDataTable(tanstackColumns);

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <PaymentHeader />

        <PaymentFilter
          filters={filters}
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
      </div>
    </AdminContentCard>
  );
}
