"use client";

import { useCallback, useEffect, useState } from "react";
import { industryService } from "@/services";
import { Industry } from "@/types";

export const useIndustries = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Load industries
  const loadIndustries = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await industryService.getIndustries();
      setIndustries(
        (response.data?.data as unknown as Industry[]) ||
          (response.data as unknown as Industry[]) ||
          []
      );
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Có lỗi xảy ra khi tải industries";
      setError(errorMessage);
      console.error("Failed to load industries:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIndustries();
  }, [loadIndustries]);

  return {
    industries,
    isLoading,
    error,
    loadIndustries,
    refetch: loadIndustries,
  };
};
