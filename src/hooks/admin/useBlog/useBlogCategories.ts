import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api-client";
import type { BlogCategory } from "@/types/entities/blog";

export const useBlogCategories = () => {
  const [data, setData] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchBlogCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get("/blogcategory");
      setData(response.data.data);
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Failed to fetch blog categories");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogCategories();
  }, [fetchBlogCategories]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchBlogCategories,
  };
};
