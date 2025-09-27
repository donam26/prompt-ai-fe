import type { Prompt } from "@/lib/types";
import { useCallback, useState } from "react";
import { promptService } from "@/services/admin/prompts/promptService";
import { showToast } from "@/components/ui/toast";

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (prompt: Prompt) => Promise<boolean>;
}

export function useDeletePrompt(): IResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(async (prompt: Prompt): Promise<boolean> => {
    setIsLoading(() => true);
    setError(() => "");

    try {
      await promptService.deletePrompt(prompt.id);
      showToast.success("Prompt deleted successfully!");
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete prompt";
      setError(() => errorMessage);
      showToast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(() => false);
    }
  }, []);

  return {
    isLoading,
    error,
    mutate,
  };
}
