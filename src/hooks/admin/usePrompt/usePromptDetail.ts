import { useQuery } from "@tanstack/react-query";
import { promptService } from "@/services/admin/prompts/promptService";
import type { Prompt } from "@/lib/types";

interface UsePromptDetailProps {
  promptId?: string;
  enabled?: boolean;
}

export function usePromptDetail({
  promptId,
  enabled = true,
}: UsePromptDetailProps) {
  const {
    data: prompt,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["prompt", promptId],
    queryFn: async () => {
      if (!promptId) {
        return null;
      }
      const response = await promptService.getPromptById(promptId);
      return response.data;
    },
    enabled: enabled && !!promptId,
  });

  return {
    prompt: prompt as Prompt | null,
    isLoading,
    error: error?.message || "",
    refetch,
  };
}
