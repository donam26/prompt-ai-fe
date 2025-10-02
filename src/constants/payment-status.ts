/**
 * Payment status enum for consistent status values across the application
 */
export enum PaymentStatus {
  SUCCESS = "SUCCESS",
  PENDING = "PENDING",
  FAILED = "FAILED",
}

/**
 * Payment status configuration for UI display
 */
export const PAYMENT_STATUS_CONFIG = {
  [PaymentStatus.SUCCESS]: {
    variant: "business" as const,
    label: "Thành công",
    color: "green",
  },
  [PaymentStatus.PENDING]: {
    variant: "entertainment" as const,
    label: "Đang xử lý",
    color: "yellow",
  },
  [PaymentStatus.FAILED]: {
    variant: "sports" as const,
    label: "Thất bại",
    color: "red",
  },
} as const;

/**
 * Payment status labels for Vietnamese display
 */
export const PAYMENT_STATUS_LABELS = {
  [PaymentStatus.SUCCESS]: "Thành công",
  [PaymentStatus.PENDING]: "Đang xử lý",
  [PaymentStatus.FAILED]: "Thất bại",
} as const;

/**
 * Get payment status configuration by status value
 */
export const getPaymentStatusConfig = (status: string) => {
  return (
    PAYMENT_STATUS_CONFIG[status as PaymentStatus] || {
      variant: "secondary" as const,
      label: status,
      color: "gray",
    }
  );
};
