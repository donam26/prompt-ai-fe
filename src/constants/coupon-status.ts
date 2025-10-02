/**
 * Coupon status enum for consistent status values across the application
 */
export enum CouponStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  EXPIRED = "expired",
  USED_UP = "used_up",
}

/**
 * Coupon status configuration for UI display
 */
export const COUPON_STATUS_CONFIG = {
  [CouponStatus.ACTIVE]: {
    variant: "business" as const,
    label: "Hoạt động",
    color: "green",
  },
  [CouponStatus.INACTIVE]: {
    variant: "secondary" as const,
    label: "Không hoạt động",
    color: "gray",
  },
  [CouponStatus.EXPIRED]: {
    variant: "sports" as const,
    label: "Hết hạn",
    color: "red",
  },
  [CouponStatus.USED_UP]: {
    variant: "entertainment" as const,
    label: "Hết lượt sử dụng",
    color: "orange",
  },
} as const;

/**
 * Coupon status labels for Vietnamese display
 */
export const COUPON_STATUS_LABELS = {
  [CouponStatus.ACTIVE]: "Hoạt động",
  [CouponStatus.INACTIVE]: "Không hoạt động",
  [CouponStatus.EXPIRED]: "Hết hạn",
  [CouponStatus.USED_UP]: "Hết lượt sử dụng",
} as const;

/**
 * Get coupon status configuration by status value
 */
export const getCouponStatusConfig = (status: string) => {
  return (
    COUPON_STATUS_CONFIG[status as CouponStatus] || {
      variant: "secondary" as const,
      label: status,
      color: "gray",
    }
  );
};
