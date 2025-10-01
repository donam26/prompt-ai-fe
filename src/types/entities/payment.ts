/**
 * Payment related entities và types
 */

import type { BaseEntity, EntityId } from "../base";
import type { User } from "./user";

// Payment entity
export interface Payment extends BaseEntity {
  userId: EntityId;
  subscriptionId: EntityId;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  transactionId?: string;
  vnpResponseCode?: string;
  user?: User;
  subscription?: {
    id: EntityId;
    name: string;
    type: number;
    price: number;
  };
}

// Coupon entity
export interface Coupon extends BaseEntity {
  code: string;
  description?: string;
  discountType: string; // 'percentage' | 'fixed'
  discountValue: number;
  minAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

// Product entity
export interface Product extends BaseEntity {
  name: string;
  description?: string;
  price: number;
  image?: string;
  isActive: boolean;
}

// Request types
export interface PaymentRequest {
  subscriptionId: EntityId;
  amount: number;
  couponCode?: string;
}

export interface CreateCouponRequest {
  code: string;
  description?: string;
  discountType: string;
  discountValue: number;
  minAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface UpdateCouponRequest extends Partial<CreateCouponRequest> {
  id: EntityId;
}
