"use client";

import { useCallback, useState } from "react";
import { userFeedbackService } from "@/services/feedback/feedbackService";

interface SubmitFeedbackInput {
  name: string;
  phone: string;
  email: string;
  message?: string;
}

interface SubmitFeedbackResult {
  isSubmitting: boolean;
  errorMessage: string;
  submitFeedback: (input: SubmitFeedbackInput) => Promise<void>;
  resetFeedbackState: () => void;
}

export const useFeedbackMutation = (): SubmitFeedbackResult => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const submitFeedback = useCallback(async (input: SubmitFeedbackInput) => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await userFeedbackService.submitFeedback(input);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại sau.";

      setErrorMessage(message);
      throw new Error(message);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const resetFeedbackState = useCallback(() => {
    setIsSubmitting(false);
    setErrorMessage("");
  }, []);

  return {
    isSubmitting,
    errorMessage,
    submitFeedback,
    resetFeedbackState,
  };
};
