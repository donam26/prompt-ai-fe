"use client";

import { useQuery } from "@tanstack/react-query";
import { sectionService } from "@/services";
import type { Section } from "@/lib/types";

/**
 * Parameters for the admin sections query
 */
export interface UseAdminSectionsQueryParams {
  readonly page?: number;
  readonly pageSize?: number;
  readonly search?: string;
  readonly status?: string;
}

/**
 * Response structure for admin sections query
 */
export interface UseAdminSectionsQueryResponse {
  readonly data: Section[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
}

/**
 * Hook for fetching admin sections with pagination and filtering
 *
 * @param params - Query parameters
 * @returns Query result with sections data
 */
export const useAdminSectionsQuery = (params: UseAdminSectionsQueryParams) => {
  const { page = 1, pageSize = 10, search = "", status = "" } = params;

  return useQuery({
    queryKey: ["admin-sections", page, pageSize, search, status],
    queryFn: async (): Promise<UseAdminSectionsQueryResponse> => {
      const response = await sectionService.getSectionsPage({
        page,
        pageSize,
        search,
        status,
      });

      // Transform response to match expected structure
      const sections = response.data?.sections || [];
      const totalItems = response.data?.totalItems || 0;
      const totalPages = response.data?.totalPages || 0;
      const currentPage = response.data?.currentPage || page;

      return {
        data: Array.isArray(sections) ? sections : [],
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
