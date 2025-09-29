/**
 * Payment related entities và types
 */

import type { BaseEntity, EntityId } from "../base";
import type { User } from "./user";

// Payment entity
export interface Payment extends BaseEntity {
  user_id: EntityId;
  subscription_id: EntityId;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
  transaction_id?: string;
  vnp_response_code?: string;
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
  discount_type: string; // 'percentage' | 'fixed'
  discount_value: number;
  min_amount?: number;
  max_discount?: number;
  usage_limit?: number;
  used_count: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

// Product entity
export interface Product extends BaseEntity {
  name: string;
  description?: string;
  price: number;
  image?: string;
  is_active: boolean;
}

// Request types
export interface PaymentRequest {
  subscription_id: EntityId;
  amount: number;
  coupon_code?: string;
}

export interface CreateCouponRequest {
  code: string;
  description?: string;
  discount_type: string;
  discount_value: number;
  min_amount?: number;
  max_discount?: number;
  usage_limit?: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface UpdateCouponRequest extends Partial<CreateCouponRequest> {
  id: EntityId;
}
