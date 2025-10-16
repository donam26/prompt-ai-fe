"use client";

import { useState, useEffect, useCallback } from "react";
import { promptService } from "@/services";
import { Prompt } from "@/types";
import { showToast } from "@/components/ui/toast";

interface UsePromptDetailOptions {
  enabled?: boolean;
}

export const usePromptDetail = (
  promptId: string | number | null,
  options: UsePromptDetailOptions = {}
) => {
  const { enabled = true } = options;

  // State
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Fetch prompt detail
  const fetchPromptDetail = useCallback(async () => {
    if (!promptId || !enabled) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await promptService.getPromptById(promptId);

      if (response.success && response.data) {
        setPrompt(response.data);
      } else {
        setError("Không tìm thấy prompt");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi tải chi tiết prompt";
      setError(errorMessage);
      showToast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [promptId, enabled]);

  // Fetch prompt when ID changes
  useEffect(() => {
    if (enabled && promptId) {
      fetchPromptDetail();
    }
  }, [promptId, enabled, fetchPromptDetail]);

  return {
    prompt,
    isLoading,
    error,
    refetch: fetchPromptDetail,
  };
};
