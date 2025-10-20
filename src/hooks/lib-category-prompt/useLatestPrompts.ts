"use client";

import { useCallback, useEffect, useState } from "react";
import { promptService } from "@/services";
import { Prompt } from "@/types";

export interface UseLatestPromptsParams {
  page?: number;
  pageSize?: number;
  categoryId?: string | number;
  subType?: number;
  topicId?: string | number;
  industryId?: string | number | (string | number)[];
  searchText?: string;
}

interface UseLatestPromptsOptions extends UseLatestPromptsParams {
  enabled?: boolean;
}

interface LatestPromptsResponse {
  total: number;
  page: number;
  pageSize: number;
  data: Prompt[];
}

export const useLatestPrompts = (options: UseLatestPromptsOptions = {}) => {
  const {
    page = 1,
    pageSize = 12,
    categoryId,
    subType,
    topicId,
    industryId,
    searchText,
    enabled = true,
  } = options;

  const [latestPrompts, setLatestPrompts] = useState<Prompt[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const loadLatestPrompts = useCallback(async () => {
    if (!enabled) {
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const params: Record<string, unknown> = {
        page: currentPage,
        pageSize,
      };

      // Add optional filters - use camelCase for API
      if (categoryId) params.categoryId = categoryId;
      if (subType) params.subType = subType;
      if (topicId) params.topicId = topicId;
      if (industryId) params.industryId = industryId;
      if (searchText) params.searchText = searchText;

      const response = await promptService.getLatestPrompts(params);

      const apiResponse = response.data as LatestPromptsResponse;

      if (apiResponse && apiResponse.data) {
        setLatestPrompts(apiResponse.data);
        setTotal(apiResponse.total || 0);
      } else {
        setLatestPrompts([]);
        setTotal(0);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi tải latest prompts";
      setError(errorMessage);
      console.error("Failed to load latest prompts:", errorMessage);
      setLatestPrompts([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [
    currentPage,
    pageSize,
    categoryId,
    subType,
    topicId,
    industryId,
    searchText,
    enabled,
  ]);

  useEffect(() => {
    loadLatestPrompts();
  }, [loadLatestPrompts]);

  const goToPage = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  }, []);

  return {
    latestPrompts,
    total,
    currentPage,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    isLoading,
    error,
    loadLatestPrompts,
    refetch: loadLatestPrompts,
    goToPage,
    nextPage,
    prevPage,
  };
};
