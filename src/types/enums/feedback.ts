/**
 * Feedback status enum for processing status
 */
export enum FeedbackStatus {
  PENDING = 1, // Chưa xử lý
  PROCESSED = 2, // Đã xử lý
}

/**
 * Feedback status configuration for UI display
 */
export const FEEDBACK_STATUS_CONFIG = {
  [FeedbackStatus.PENDING]: {
    variant: "business" as const,
    label: "Chưa xử lý",
    color: "yellow",
  },
  [FeedbackStatus.PROCESSED]: {
    variant: "default" as const,
    label: "Đã xử lý",
    color: "green",
  },
  // Handle null/undefined case
  null: {
    variant: "business" as const,
    label: "Chưa xử lý",
    color: "yellow",
  },
  undefined: {
    variant: "business" as const,
    label: "Chưa xử lý",
    color: "yellow",
  },
} as const;

/**
 * Get feedback status configuration by status value
 */
export const getFeedbackStatusConfig = (status: number | null | undefined) => {
  return (
    FEEDBACK_STATUS_CONFIG[status as keyof typeof FEEDBACK_STATUS_CONFIG] || {
      variant: "business" as const,
      label: "Chưa xử lý",
      color: "yellow",
    }
  );
};
