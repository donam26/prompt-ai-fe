/**
 * Feedback filter status enum for frontend values
 */
export enum FeedbackFilterStatus {
  ALL = "all",
  PENDING = "pending",
  PROCESSED = "processed",
}

/**
 * Feedback filter status display names
 */
export const FEEDBACK_FILTER_STATUS_LABELS = {
  [FeedbackFilterStatus.ALL]: "Tất cả trạng thái",
  [FeedbackFilterStatus.PENDING]: "Chưa xử lý",
  [FeedbackFilterStatus.PROCESSED]: "Đã xử lý",
} as const;

/**
 * Map frontend feedback status values to database values
 */
export const mapFeedbackStatusToDbValue = (
  status: string
): number | undefined => {
  if (status === FeedbackFilterStatus.ALL) return undefined;
  if (status === FeedbackFilterStatus.PENDING) return 1;
  if (status === FeedbackFilterStatus.PROCESSED) return 2;
  const parsed = parseInt(status);
  return isNaN(parsed) ? undefined : parsed;
};

/**
 * Get feedback status display name
 */
export const getFeedbackStatusDisplayName = (status: string): string => {
  return (
    FEEDBACK_FILTER_STATUS_LABELS[status as FeedbackFilterStatus] || status
  );
};
