"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Mail,
} from "lucide-react";
import { useFeedbacks } from "@/hooks/admin/useFeedback";
import { DEFAULT_PAGINATION } from "@/constants";
import { FEEDBACKS_CONSTANTS } from "@/constants/feedbacks";
import type { Feedback } from "@/types";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins} phút trước`;
  }
  if (diffHours < 24) {
    return `${diffHours} giờ trước`;
  }
  if (diffDays < 7) {
    return `${diffDays} ngày trước`;
  }
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

interface FeedbackItemProps {
  readonly feedback: Feedback;
  readonly onView: (feedback: Feedback) => void;
}

const FeedbackItem = ({
  feedback,
  onView,
}: FeedbackItemProps): React.JSX.Element => {
  const isProcessed = feedback.status === FEEDBACKS_CONSTANTS.STATUS.PROCESSED;

  return (
    <button
      type="button"
      className={`group flex justify-between items-center p-4 rounded-lg transition-all cursor-pointer w-full text-left ${
        isProcessed
          ? "hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
          : "bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 dark:border-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30"
      }`}
      onClick={() => onView(feedback)}
      aria-label={`Xem chi tiết feedback ${feedback.email}`}
    >
      <div className="flex flex-1 items-center gap-4 min-w-0">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            isProcessed
              ? "bg-green-50 dark:bg-green-900/20"
              : "bg-primary-100 dark:bg-primary-900/30"
          }`}
        >
          {isProcessed ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
              {feedback.feedbackName || feedback.fullName || "Không có tên"}
            </p>
            <Badge
              variant={isProcessed ? "secondary" : "default"}
              className="text-xs"
            >
              {isProcessed ? "Đã xử lý" : "Chưa xử lý"}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-xs">
            {feedback.message && (
              <span className="flex items-center gap-1 max-w-[200px] truncate">
                <MessageSquare className="flex-shrink-0 w-3 h-3" />
                <span className="truncate">
                  {feedback.message.substring(0, 30)}...
                </span>
              </span>
            )}
            <span className="flex items-center gap-1 truncate">
              <Mail className="flex-shrink-0 w-3 h-3" />
              <span className="truncate">{feedback.email}</span>
            </span>
            {feedback.createdAt && (
              <span className="flex flex-shrink-0 items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(feedback.createdAt)}
              </span>
            )}
          </div>
        </div>
      </div>
      <ArrowRight className="flex-shrink-0 ml-2 w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
    </button>
  );
};

export const RecentFeedbacks = (): React.JSX.Element => {
  const router = useRouter();

  const { feedbacksWithPagination, isFetching } = useFeedbacks({
    pagination: { ...DEFAULT_PAGINATION, pageSize: 5 },
    filters: FEEDBACKS_CONSTANTS.INITIAL_FILTERS,
  });

  const feedbacks = useMemo(
    () => feedbacksWithPagination?.data || [],
    [feedbacksWithPagination]
  );

  const handleViewFeedback = (feedback: Feedback): void => {
    router.push(FEEDBACKS_CONSTANTS.ROUTES.FEEDBACK_VIEW(feedback.id));
  };

  const handleViewAll = (): void => {
    router.push(FEEDBACKS_CONSTANTS.ROUTES.FEEDBACKS);
  };

  return (
    <AdminContentCard
      title="Feedback gần nhất"
      description="Danh sách các feedback mới nhất từ người dùng"
    >
      <div className="space-y-4">
        {isFetching ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 dark:bg-gray-700 rounded-lg h-20 animate-pulse"
              />
            ))}
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="py-8 text-gray-500 dark:text-gray-400 text-center">
            <MessageSquare className="mx-auto mb-3 w-12 h-12 text-gray-300" />
            <p className="text-sm">Chưa có feedback nào</p>
          </div>
        ) : (
          <div className="space-y-3">
            {feedbacks.map(feedback => (
              <FeedbackItem
                key={feedback.id}
                feedback={feedback}
                onView={handleViewFeedback}
              />
            ))}
          </div>
        )}

        {feedbacks.length > 0 && (
          <button
            onClick={handleViewAll}
            className="flex justify-center items-center gap-2 mt-4 py-2 w-full font-medium text-primary hover:text-primary/80 text-sm transition-colors"
            aria-label="Xem tất cả feedback"
          >
            Xem tất cả feedback
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </AdminContentCard>
  );
};
