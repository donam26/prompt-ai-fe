/**
 * User related entities và types
 */

import type { BaseEntity, BaseAdminEntity, EntityId, Timestamp } from "../base";

// User entity
export interface User extends BaseEntity {
  id: number;
  fullName: string;
  email: string;
  passwordHash?: string | null;
  role: number;
  roleId?: number | null;
  permissions?: string[] | string;
  countPromt?: number;
  googleId?: string;
  profileImage?: string;
  otpCode?: string | null;
  otpExpiresAt?: Timestamp | null;
  isVerified?: boolean;
  referralId?: string | null;
  accessToken?: string;
  userSub?: UserSubscription;
  userSubs?: UserSubscription[];
  avatar?: string;
  accountStatus?: number;
  deviceLog?: any;
}

// User subscription
export interface UserSubscription {
  id: EntityId;
  userId: EntityId;
  subId: EntityId;
  subscriptionId?: EntityId;
  status: number;
  startDate: Timestamp;
  endDate: Timestamp;
  token: number;
  subscription?: Subscription;
  Subscription?: Subscription;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Subscription plan
export interface Subscription extends BaseEntity {
  name: string;
  nameSub: string;
  type: number;
  duration: number;
  durationString?: string;
  price: string;
  priceYear?: string | null;
  pricePerMonthYear?: string | null;
  priceTotalYearly?: string | null;
  features?: string[];
  description?: string;
  descriptionPerYear?: string;
  billingCycle: string;
  imageDiscount?: string | null;
  isPopular?: boolean;
  isActive?: boolean;
  displayOrder?: number;
  contentSubscriptions?: Array<{
    content: string;
    included: boolean;
  }>;
}

// Role entity
export interface Role extends BaseAdminEntity {
  name: string;
  description?: string;
  permissions: string[];
}

// Auth related types
export interface LoginRequest {
  email: string;
  password?: string;
}

export interface LoginResponse {
  success?: boolean;
  message?: string;
  requireVerification?: boolean;
  email?: string;
  data?: {
    user?: User;
    token?: string;
    message?: string;
  };
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}

export interface UpdateUserRequest {
  fullName?: string;
  email?: string;
  avatar?: File;
}
