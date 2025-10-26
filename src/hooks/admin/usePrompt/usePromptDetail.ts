import { useState, useEffect, useCallback } from "react";
import { promptService } from "@/services/admin/prompts/promptService";
import type { Prompt } from "@/types";

interface UsePromptDetailProps {
  promptId?: string;
  enabled?: boolean;
}

export function usePromptDetail({
  promptId,
  enabled = true,
}: UsePromptDetailProps) {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPrompt = useCallback(async () => {
    if (!promptId || !enabled) {
      setPrompt(null);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response =
        await promptService.getPromptByIdWithIndustries(promptId);
      setPrompt(response.data.data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      setPrompt(null);
    } finally {
      setIsLoading(false);
    }
  }, [promptId, enabled]);

  useEffect(() => {
    fetchPrompt();
  }, [fetchPrompt]);

  const refetch = useCallback(() => {
    fetchPrompt();
  }, [fetchPrompt]);

  return {
    prompt,
    isLoading,
    error,
    refetch,
  };
}
