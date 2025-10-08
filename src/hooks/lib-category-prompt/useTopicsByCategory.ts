"use client";

import { useCallback, useEffect, useState } from "react";
import { promptService } from "@/services";
import { Topic } from "@/types";

interface UseTopicsByCategoryOptions {
  categoryId?: string | number;
  enabled?: boolean;
}

export const useTopicsByCategory = (
  options: UseTopicsByCategoryOptions = {}
) => {
  const { categoryId, enabled = true } = options;

  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const loadTopicsByCategory = useCallback(async () => {
    if (!categoryId || !enabled) {
      setTopics([]);
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const response = await promptService.getTopicsByCategoryId(categoryId);
      const apiTopics =
        (response.data?.topics as unknown as Topic[]) ||
        (response.data?.data as unknown as Topic[]) ||
        (response.data as unknown as Topic[]) ||
        [];

      setTopics(apiTopics);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Có lỗi xảy ra khi tải topics";
      setError(errorMessage);
      console.error("Failed to load topics by category:", errorMessage);
      setTopics([]);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, enabled]);

  useEffect(() => {
    loadTopicsByCategory();
  }, [loadTopicsByCategory]);

  return {
    topics,
    isLoading,
    error,
    loadTopicsByCategory,
    refetch: loadTopicsByCategory,
  };
};
