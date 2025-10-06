"use client";

import { useCallback, useEffect, useState } from "react";
import { useCategories } from "@/hooks/admin/useCategory/useCategories";
import { DEFAULT_PAGINATION } from "@/constants";

export const usePromptLibraryData = () => {
  const { categories, isFetching: categoriesLoading } = useCategories({
    pagination: DEFAULT_PAGINATION,
    filters: {
      type: "premium",
    },
  });

  const [isLoadingData, setIsLoadingData] = useState(false);

  // Load all data
  const loadAllData = useCallback(async () => {
    setIsLoadingData(true);
    try {
      // Data is loaded automatically by individual hooks
      // This is just for loading state management
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const isLoading = categoriesLoading || isLoadingData;

  return { categories, isLoading, loadAllData };
};
