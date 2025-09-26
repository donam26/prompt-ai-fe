"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { debounce } from "@/lib/utils";
import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import {
  PaymentFilter,
  PaymentHeader,
  createPaymentColumns,
  DataTable,
} from "./modules";
import { useAdminPaymentsQuery, useDeletePaymentMutation } from "@/hooks";
import type { Payment, PaymentFilterState } from "@/types/admin";
import { PAYMENTS_CONSTANTS } from "@/constants/payments";

/**
 * Use constants from module
 */
const INITIAL_FILTERS = PAYMENTS_CONSTANTS.INITIAL_FILTERS;

export default function PaymentManagementPage(): React.JSX.Element {
  const router = useRouter();

  // 🎯 State Management
  const [filters, setFilters] = useState<PaymentFilterState>(INITIAL_FILTERS);
  const [debouncedFilters, setDebouncedFilters] =
    useState<PaymentFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounced filter update
  const debouncedFilterUpdate = debounce((newFilters: PaymentFilterState) => {
    setDebouncedFilters(newFilters);
  }, 300);

  // Update debounced filters when filters change
  useEffect(() => {
    debouncedFilterUpdate(filters);
  }, [filters, debouncedFilterUpdate]);

  // 🔄 Data Hooks
  const { data: paymentsData, isLoading: paymentsLoading } =
    useAdminPaymentsQuery({
      page: currentPage,
      pageSize: pageSize,
      search: debouncedFilters.searchTerm,
      status: debouncedFilters.status,
      method: debouncedFilters.method,
      dateFrom: debouncedFilters.dateRange.from,
      dateTo: debouncedFilters.dateRange.to,
    });

  const deletePaymentMutation = useDeletePaymentMutation();

  // Extract data from API responses
  const payments = paymentsData?.data || [];
  const totalPages = paymentsData?.totalPages || 0;
  const totalItems = paymentsData?.total || 0;

  const isLoading = paymentsLoading;

  const handleViewPayment = (payment: Payment) => {
    router.push(PAYMENTS_CONSTANTS.ROUTES.PAYMENT_VIEW(payment.id));
  };

  const handleDeletePayment = async (id: string | number): Promise<void> => {
    try {
      deletePaymentMutation.mutate(id);
    } catch {
      // Error deleting payment - could be logged to monitoring service
    }
  };

  const handleFilterChange = useCallback(
    (newFilters: PaymentFilterState): void => {
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
  const columns = createPaymentColumns({
    onView: handleViewPayment,
    onDelete: handleDeletePayment,
  });

  return (
    <AdminContentCard>
      <div className="space-y-6">
        <PaymentHeader />

        <PaymentFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageReset={() => setCurrentPage(1)}
        />

        <DataTable
          columns={columns}
          data={payments}
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
