import type { Coupon } from "@/types/entities/coupon";

/**
 * Coupon filter state interface
 */
export interface CouponFilterState {
  readonly searchTerm?: string;
  readonly type?: string;
  readonly status?: string;
  readonly dateFrom?: string;
  readonly dateTo?: string;
}

/**
 * Props for the CouponFilter component
 */
export interface CouponFilterProps {
  readonly filters: CouponFilterState;
  readonly onFilterChange: (filters: CouponFilterState) => void;
  readonly onClearFilters: () => void;
  readonly onPageReset?: () => void;
  readonly className?: string;
}

/**
 * Coupon form data interface
 */
export interface CouponFormData {
  readonly code: string;
  readonly name: string;
  readonly description?: string;
  readonly type: string;
  readonly value: number;
  readonly minOrderAmount?: number;
  readonly maxDiscountAmount?: number;
  readonly usageLimit?: number;
  readonly isActive: boolean;
  readonly validFrom: string;
  readonly validTo: string;
}

/**
 * Props for the CouponForm component
 */
export interface CouponFormProps {
  readonly coupon?: Coupon;
  readonly mode: "create" | "edit";
  readonly onSave: (data: Partial<Coupon>) => void;
  readonly onCancel: () => void;
  readonly isSaving?: boolean;
  readonly isLoading?: boolean;
}

/**
 * Column handlers for the coupon table
 */
export interface CouponColumnHandlers {
  onEdit: (coupon: Coupon) => void;
  onDelete: (coupon: Coupon) => void;
}
