"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { promptService } from "@/services";
import { Topic } from "@/types";

interface UseTopicsByIndustryOptions {
  categoryId?: string | number;
  industryIds?: string[];
  enabled?: boolean;
}

/**
 * Lấy chủ đề theo ngành nghề đang chọn (trong 1 category).
 * industryIds rỗng -> backend trả toàn bộ chủ đề của category.
 */
export const useTopicsByIndustry = (
  options: UseTopicsByIndustryOptions = {}
) => {
  const { categoryId, industryIds = [], enabled = true } = options;

  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const industryIdsString = useMemo(() => industryIds.join(","), [industryIds]);

  const loadTopics = useCallback(async () => {
    if (!categoryId || !enabled) {
      setTopics([]);
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const ids = industryIdsString ? industryIdsString.split(",") : [];
      const response = await promptService.getTopicsByIndustry(categoryId, ids);
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
      console.error("Failed to load topics by industry:", errorMessage);
      setTopics([]);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, industryIdsString, enabled]);

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  return {
    topics,
    isLoading,
    error,
    loadTopics,
    refetch: loadTopics,
  };
};
