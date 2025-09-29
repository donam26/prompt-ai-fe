/**
 * User related entities và types
 */

import type { BaseEntity, BaseAdminEntity, EntityId, Timestamp } from "../base";

// User entity
export interface User extends BaseEntity {
  full_name: string;
  email: string;
  role_id: number;
  permissions?: string[] | string;
  count_prompt?: number;
  userSub?: UserSubscription;
  avatar?: string;
}

// User subscription
export interface UserSubscription {
  id: EntityId;
  user_id: EntityId;
  subscription_id: EntityId;
  status: number;
  start_date: Timestamp;
  end_date: Timestamp;
  token: number;
  subscription?: Subscription;
  created_at: Timestamp;
  updated_at: Timestamp;
}

// Subscription plan
export interface Subscription extends BaseEntity {
  name: string;
  type: number;
  duration: string;
  price: number;
  features: string[];
  description?: string;
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
  full_name: string;
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
  full_name?: string;
  email?: string;
  avatar?: File;
}
