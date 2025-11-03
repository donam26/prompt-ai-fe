"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useFeedbackDetail } from "@/hooks/admin/useFeedback";
import { FormSkeleton } from "@/components/ui/skeleton";
import { showToast } from "@/components/ui/toast";
import { FEEDBACKS_CONSTANTS } from "@/constants/feedbacks";
import { FeedbackViewForm } from "./modules/feedback-view-form";

export default function FeedbackViewPage() {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();

  const feedbackId = id;

  const {
    feedback: feedbackData,
    isLoading,
    error: feedbackDetailError,
    refetch: refetchFeedback,
  } = useFeedbackDetail(feedbackId);

  const handleCancel = useCallback(() => {
    router.push(FEEDBACKS_CONSTANTS.ROUTES.FEEDBACKS);
  }, [router]);

  const handleReplySuccess = useCallback(() => {
    refetchFeedback();
  }, [refetchFeedback]);

  useEffect(() => {
    if (!feedbackDetailError) {
      return;
    }
    showToast.error(feedbackDetailError);
    router.push(FEEDBACKS_CONSTANTS.ROUTES.FEEDBACKS);
  }, [feedbackDetailError, router]);

  if (isLoading) {
    return <FormSkeleton />;
  }

  if (!feedbackData) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Không tìm thấy feedback.
      </div>
    );
  }

  return (
    <FeedbackViewForm
      feedback={feedbackData}
      onCancel={handleCancel}
      onReplySuccess={handleReplySuccess}
      isLoading={isLoading}
    />
  );
}
