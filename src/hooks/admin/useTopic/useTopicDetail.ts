import { useState, useEffect, useCallback } from "react";
import { topicService } from "@/services/admin/topics/topicService";
import type { Topic } from "@/types";

interface UseTopicDetailProps {
  id: string | number;
}

interface UseTopicDetailReturn {
  topic: Topic | null;
  isLoading: boolean;
  error: string;
  refetch: () => void;
}

export function useTopicDetail({
  id,
}: UseTopicDetailProps): UseTopicDetailReturn {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchTopic = useCallback(async (): Promise<void> => {
    if (!id) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await topicService.getTopic(id);
      setTopic(response.data || null);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch topic";
      setError(errorMessage);
      setTopic(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTopic();
  }, [id, fetchTopic]);

  return {
    topic,
    isLoading,
    error,
    refetch: fetchTopic,
  };
}
