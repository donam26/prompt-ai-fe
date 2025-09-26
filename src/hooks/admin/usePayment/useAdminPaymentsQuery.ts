"use client";

import { useQuery } from "@tanstack/react-query";
import { paymentService } from "@/services";
import type { Payment } from "@/lib/types";

/**
 * Parameters for the admin payments query
 */
export interface UseAdminPaymentsQueryParams {
  readonly page?: number;
  readonly pageSize?: number;
  readonly search?: string;
  readonly status?: string;
  readonly method?: string;
  readonly dateFrom?: string;
  readonly dateTo?: string;
}

/**
 * Response structure for admin payments query
 */
export interface UseAdminPaymentsQueryResponse {
  readonly data: Payment[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
}

/**
 * Hook for fetching admin payments with pagination and filtering
 *
 * @param params - Query parameters
 * @returns Query result with payments data
 */
export const useAdminPaymentsQuery = (params: UseAdminPaymentsQueryParams) => {
  const {
    page = 1,
    pageSize = 10,
    search = "",
    status = "",
    method = "",
    dateFrom = "",
    dateTo = "",
  } = params;

  return useQuery({
    queryKey: [
      "admin-payments",
      page,
      pageSize,
      search,
      status,
      method,
      dateFrom,
      dateTo,
    ],
    queryFn: async (): Promise<UseAdminPaymentsQueryResponse> => {
      const response = await paymentService.getPaymentsPage({
        page,
        pageSize,
        search,
        status,
        method,
        dateFrom,
        dateTo,
      });

      // Transform response to match expected structure
      const payments = response.data?.payments || [];
      const totalItems = response.data?.totalItems || 0;
      const totalPages = response.data?.totalPages || 0;
      const currentPage = response.data?.currentPage || page;

      return {
        data: Array.isArray(payments) ? payments : [],
        total: totalItems,
        page: currentPage,
        pageSize,
        totalPages,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
