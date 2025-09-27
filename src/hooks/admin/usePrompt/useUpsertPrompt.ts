import { useCallback, useState } from "react";
import { promptService } from "@/services/admin/prompts/promptService";

export interface UpdatePromptData {
  title?: string;
  content?: string;
  categoryId?: string;
  tags?: string[];
  isPublic?: boolean;
  isPremium?: boolean;
  description?: string;
  image?: string;
}

interface IResponse {
  isUpdating: boolean;
  error: string;
  mutate: (data: UpdatePromptData, id: string) => Promise<boolean>;
}

export function useUpsertPrompt(): IResponse {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (data: UpdatePromptData, id: string): Promise<boolean> => {
      setIsUpdating(() => true);
      setError(() => "");

      try {
        await promptService.updatePrompt(id, data);
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setError(() => errorMessage);
        return false;
      } finally {
        setIsUpdating(() => false);
      }
    },
    []
  );

  return {
    isUpdating,
    error,
    mutate,
  };
}
