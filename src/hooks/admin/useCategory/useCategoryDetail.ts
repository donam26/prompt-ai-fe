import { useCallback, useEffect, useState } from "react";
import { categoryService } from "@/services/admin/categories";
import type { Category } from "@/lib/types";

interface IResponse {
  category: Category | null;
  isLoading: boolean;
  error: string;
  fetchCategoryDetail: (id: string) => Promise<void>;
}

export function useCategoryDetail(id?: string): IResponse {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchCategoryDetail = useCallback(async (categoryId: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await categoryService.getCategory(categoryId);
      setCategory(
        Array.isArray(response.data) ? response.data[0] : response.data
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      setCategory(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchCategoryDetail(id);
    }
  }, [id, fetchCategoryDetail]);

  return {
    category,
    isLoading,
    error,
    fetchCategoryDetail,
  };
}
