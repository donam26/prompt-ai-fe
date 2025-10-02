export interface Coupon {
  readonly id: number;
  readonly code: string;
  readonly discount: string;
  readonly type: CouponType;
  readonly expiryDate: string;
  readonly isActive: boolean;
  readonly maxUsage: number;
  readonly usageCount: number;
  readonly createdAt: string;
}

export type CouponType = "percent" | "fixed";

export type CouponStatus = "active" | "inactive" | "expired" | "used_up";
