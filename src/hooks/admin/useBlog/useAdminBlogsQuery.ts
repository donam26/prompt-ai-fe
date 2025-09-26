"use client";

import { useQuery } from "@tanstack/react-query";
import {
  blogService,
  type BlogListParams,
} from "@/services/admin/blogs/blogService";
import type { Blog } from "@/lib/types";
import { ApiListResponse } from "@/types/api";

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
  readonly data: ApiListResponse<Blog> | null;
  readonly blogs: Blog[];
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

  return useQuery<ApiListResponse<Blog>, Error, UseAdminBlogsQueryResponse>({
    queryKey: ["admin-blogs", page, pageSize, search, dateFrom, dateTo],
    queryFn: async (): Promise<ApiListResponse<Blog>> => {
      return await blogService.getBlogPage({
        page,
        pageSize,
        search,
      });
    },
    select: (data): UseAdminBlogsQueryResponse => {
      return {
        data,
        blogs: data?.data || [],
        total: data?.pagination?.total || 0,
        page: data?.pagination?.page || page,
        pageSize: data?.pagination?.pageSize || pageSize,
        totalPages: data?.pagination?.totalPages || 0,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
