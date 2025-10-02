import { useState } from "react";
import { topicService } from "@/services/admin/topics/topicService";
import type { Topic } from "@/types";
import type { TopicFormData } from "@/types/admin/topic";

interface UseUpsertTopicProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface UseUpsertTopicReturn {
  mutate: (data: TopicFormData) => Promise<boolean>;
  isLoading: boolean;
  error: string;
}

export function useUpsertTopic({
  onSuccess,
  onError,
}: UseUpsertTopicProps = {}): UseUpsertTopicReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = async (data: TopicFormData): Promise<boolean> => {
    setIsLoading(true);
    setError("");

    try {
      let response;

      if (data.id) {
        // Update existing topic
        response = await topicService.updateTopic(data.id, {
          name: data.name,
          description: data.description,
          isActive: data.isActive,
        });
      } else {
        // Create new topic
        response = await topicService.createTopic({
          name: data.name,
          description: data.description,
          isActive: data.isActive,
        });
      }

      if (response.success) {
        onSuccess?.();
        return true;
      } else {
        const errorMessage = response.message || "Operation failed";
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
