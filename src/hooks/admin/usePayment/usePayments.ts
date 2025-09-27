import type { Payment } from "@/lib/types";
import type { PaymentFilterState } from "@/types/admin/payment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_PAGINATION,
  DEFAULT_TOTAL,
  DEFAULT_TOTAL_PAGES,
} from "@/constants";
import { paymentService } from "@/services/admin/payments/paymentService";
import { applyNonEmptyFiltersToQuery } from "@/utils";
import type { IPagination } from "@/types/common";

interface Props {
  refetch?: () => void;
  filters?: PaymentFilterState;
  pagination?: IPagination;
  enabled?: boolean;
}

export function useAdminPaymentsQuery(options: Props = {}) {
  const {
    filters = {},
    pagination = DEFAULT_PAGINATION,
    enabled = true,
  } = options;
  const isInitialRender = useRef(true);
  const isFetchingRef = useRef(false);

  // Payments state
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [paymentsWithPagination, setPaymentsWithPagination] = useState<{
    data: Payment[];
    total: number;
    totalPages: number;
  }>({
    data: [],
    total: DEFAULT_TOTAL,
    totalPages: DEFAULT_TOTAL_PAGES,
  });
  const [error, setError] = useState<string>("");

  const memoizedPagination = useMemo(() => pagination, [pagination]);

  // Manual refetch function that doesn't cause infinite loops
  const fetchPayments = useCallback(async () => {
    if (isFetchingRef.current || !enabled) {
      return;
    }

    isFetchingRef.current = true;
    setIsFetching(true);

    try {
      const query: Record<string, unknown> = {
        page: memoizedPagination.pageIndex + 1,
        limit: memoizedPagination.pageSize,
      };

      applyNonEmptyFiltersToQuery(filters, query);
      const response = await paymentService.getPaymentsPage(query);

      // Extract data from the response structure
      const responseData = response.data?.data || [];
      const total = response.data.pagination?.total || DEFAULT_TOTAL;
      const totalPages =
        response.data.pagination?.totalPages || DEFAULT_TOTAL_PAGES;

      setPayments(responseData);
      setPaymentsWithPagination({
        data: responseData,
        total,
        totalPages,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      // Keep existing payments on error
    } finally {
      isFetchingRef.current = false;
      setIsFetching(false);
    }
  }, [
    memoizedPagination.pageIndex,
    memoizedPagination.pageSize,
    filters,
    enabled,
  ]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  // Handle filters changes - only after initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Only fetch when filters are provided and not empty
    if (Object.keys(filters).length > 0 && enabled) {
      fetchPayments();
    }
  }, [filters, fetchPayments, enabled]);

  return {
    // Payments data
    payments,
    isFetching,
    error,
    paymentsWithPagination,

    // Utilities
    fetchPayments,
    refetch: fetchPayments,
  };
}
