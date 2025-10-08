"use client";

import { useCallback, useEffect, useState } from "react";
import { promptService } from "@/services";
import { Prompt } from "@/types";

interface UseNewestPromptsOptions {
  categoryId?: string | number;
  enabled?: boolean;
}

export const useNewestPrompts = (options: UseNewestPromptsOptions = {}) => {
  const { categoryId, enabled = true } = options;

  const [newestPrompts, setNewestPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const loadNewestPrompts = useCallback(async () => {
    if (!categoryId || !enabled) {
      setNewestPrompts([]);
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const response =
        await promptService.getNewestPromptsByCategoryId(categoryId);
      const apiPrompts =
        (response.data?.data as unknown as Prompt[]) ||
        (response.data as unknown as Prompt[]) ||
        [];

      setNewestPrompts(apiPrompts);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi tải newest prompts";
      setError(errorMessage);
      console.error("Failed to load newest prompts:", errorMessage);
      setNewestPrompts([]);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, enabled]);

  useEffect(() => {
    loadNewestPrompts();
  }, [loadNewestPrompts]);

  return {
    newestPrompts,
    isLoading,
    error,
    loadNewestPrompts,
    refetch: loadNewestPrompts,
  };
};
