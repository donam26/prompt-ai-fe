"use client";

import { useState, useCallback } from "react";
import { feedbackService } from "@/services/admin/feedbacks/feedbackService";
import { showToast } from "@/components/ui/toast";

interface UsePatchFeedbackReplyResult {
  isPatching: boolean;
  mutate: (id: string | number, reply: string) => Promise<boolean>;
}

export function usePatchFeedbackReply(): UsePatchFeedbackReplyResult {
  const [isPatching, setIsPatching] = useState(false);

  const mutate = useCallback(
    async (id: string | number, reply: string): Promise<boolean> => {
      setIsPatching(true);

      try {
        await feedbackService.replyFeedback(id, reply);
        showToast.success("Phản hồi feedback thành công");
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Không thể phản hồi feedback";
        showToast.error(errorMessage);
        return false;
      } finally {
        setIsPatching(false);
      }
    },
    []
  );

  return {
    isPatching,
    mutate,
  };
}
