"use client";

import { useState, useCallback } from "react";
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
