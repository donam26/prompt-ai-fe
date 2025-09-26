"use client";

import { useQuery } from "@tanstack/react-query";
import {
  blogService,
  type BlogListParams,
} from "@/services/admin/blogs/blogService";
import type { Blog } from "@/lib/types";

/**
 * Parameters for the admin blogs query
 */
export interface UseAdminBlogsQueryParams extends BlogListParams {
  readonly dateFrom?: string;
  readonly dateTo?: string;
}

/**
 * Response structure for admin blogs query
 */
export interface UseAdminBlogsQueryResponse {
  readonly data: Blog[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
}

/**
 * Hook for fetching admin blogs with pagination and filtering
 *
 * @param params - Query parameters
 * @returns Query result with blogs data
 */
export function useAdminBlogsQuery(params: UseAdminBlogsQueryParams) {
  const {
    page = 1,
    pageSize = 10,
    search = "",
    dateFrom = "",
    dateTo = "",
  } = params;

  return useQuery({
    queryKey: ["admin-blogs", page, pageSize, search, dateFrom, dateTo],
    queryFn: async (): Promise<UseAdminBlogsQueryResponse> => {
      const response = await blogService.getBlogPage({
        page,
        pageSize,
        search,
      });

      // Transform response to match expected structure
      const blogs = response.data?.blogs || [];
      const totalItems = response.data?.totalItems || 0;
      const totalPages = response.data?.totalPages || 0;
      const currentPage = response.data?.currentPage || page;

      return {
        data: Array.isArray(blogs) ? blogs : [],
        total: totalItems,
        page: currentPage,
        pageSize,
        totalPages,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
