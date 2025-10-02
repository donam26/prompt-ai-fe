import type { BaseEntity, EntityId } from "../base";
import type { User } from "./user";

// Payment entity
export interface Payment extends BaseEntity {
  userId: EntityId;
  subscriptionId: EntityId;
  amount: number;
  currency: string;
  paymentStatus: string;
  paymentMethod: string;
  paymentDate: string;
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

// PaymentProduct entity
export interface PaymentProduct extends BaseEntity {
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  section: {
    id: EntityId;
    name: string;
    description?: string;
  };
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
