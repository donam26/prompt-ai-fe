import { useState } from "react";
import { topicService } from "@/services/admin/topics/topicService";
import type { Topic } from "@/types";

interface UseDeleteTopicProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface UseDeleteTopicReturn {
  mutate: (topic: Topic) => Promise<boolean>;
  isLoading: boolean;
  error: string;
}

export function useDeleteTopic({
  onSuccess,
  onError,
}: UseDeleteTopicProps = {}): UseDeleteTopicReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = async (topic: Topic): Promise<boolean> => {
    setIsLoading(true);
    setError("");

    try {
      const response = await topicService.deleteTopic(topic.id);

      if (response.success) {
        onSuccess?.();
        return true;
      } else {
        const errorMessage = response.message || "Failed to delete topic";
        setError(errorMessage);
        onError?.(errorMessage);
        return false;
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      onError?.(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
    error,
  };
}
