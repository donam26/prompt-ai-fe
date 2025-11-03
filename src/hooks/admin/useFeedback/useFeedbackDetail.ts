"use client";

import { useState, useEffect, useCallback } from "react";
import { feedbackService } from "@/services/admin/feedbacks/feedbackService";
import type { Feedback } from "@/types";

interface UseFeedbackDetailResult {
  feedback: Feedback | null;
  isLoading: boolean;
  error: string;
  refetch: () => Promise<void>;
}

export function useFeedbackDetail(
  id: string | number | undefined
): UseFeedbackDetailResult {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchFeedback = useCallback(async () => {
    if (!id) {
      setFeedback(null);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await feedbackService.getFeedback(id);
      if (response.success && response.data) {
        setFeedback(response.data);
      } else {
        setError("Feedback not found");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch feedback";
      setError(errorMessage);
      setFeedback(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  return {
    feedback,
    isLoading,
    error,
    refetch: fetchFeedback,
  };
}
