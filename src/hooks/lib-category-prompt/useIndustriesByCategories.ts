"use client";

import { useCallback, useEffect, useState } from "react";
import { industryService } from "@/services";
import { Industry } from "@/types";

interface UseIndustriesByCategoriesOptions {
  categoryIds?: string[];
  enabled?: boolean;
}

export const useIndustriesByCategories = (
  options: UseIndustriesByCategoriesOptions = {}
) => {
  const { categoryIds = [], enabled = true } = options;

  const [industries, setIndustries] = useState<Industry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Load industries by category IDs or all industries
  const loadIndustriesByCategories = useCallback(
    async (ids: string[]) => {
      if (!enabled) {
        setIndustries([]);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        let response;

        if (ids.length === 0) {
          // Load all industries if no categories selected
          response = await industryService.getIndustries();
        } else {
          // Load industries by categoryIds if categories selected
          response = await industryService.getIndustries({
            categoryIds: ids.join(","), // Convert array to comma-separated string
          });
        }

        const apiIndustries =
          (response.data?.data as unknown as Industry[]) ||
          (response.data as unknown as Industry[]) ||
          [];

        setIndustries(apiIndustries);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Có lỗi xảy ra khi tải industries";
        setError(errorMessage);
        console.error("Failed to load industries by categories:", errorMessage);
        setIndustries([]);
      } finally {
        setIsLoading(false);
      }
    },
    [enabled]
  );

  // Load industries when categoryIds change
  useEffect(() => {
    loadIndustriesByCategories(categoryIds);
  }, [categoryIds, loadIndustriesByCategories]);

  return {
    industries,
    isLoading,
    error,
    loadIndustriesByCategories,
    refetch: () => loadIndustriesByCategories(categoryIds),
  };
};
