import type {
  FilterParams,
  AuthParams,
  ResendOtpApiResponse,
  GetUserProfileApiResponse,
} from "@/types/api";
import type { ServiceResponse } from "@/types/common";
import type { ApiUser, UserSubscription } from "@/types/user";
import type { PaginationParams } from "@/types/services/common";

// User service parameters
export type UserListParams = PaginationParams & FilterParams;

export type UserAuthParams = AuthParams;

export interface UserRegisterParams {
  fullName: string;
  email: string;
  password: string;
}

export interface UserPasswordParams {
  id: string | number;
  password: string;
  newPassword: string;
}

export interface UserUpdateInfoParams {
  id: string | number;
  data: Partial<ApiUser>;
}

export interface UserSubscriptionParams {
  id: string | number;
  subId?: string | number;
  data?: Partial<UserSubscription>;
}

// User service response types
export interface UserServiceResponse<T = unknown> extends ServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// User login data structure
export interface UserLoginData {
  user: ApiUser;
  token: string;
  message?: string;
}

export interface UserLoginResponse {
  success: boolean;
  message?: string;
  requireVerification?: boolean;
  email?: string;
  data?: UserLoginData;
}

// User verify data structure
export interface UserVerifyData {
  user: ApiUser;
  token: string;
}

export interface UserVerifyResponse {
  message: string;
  data: UserVerifyData;
}

export interface UserResendOTPResponse extends ResendOtpApiResponse {
  success: boolean;
}

// Get Me API Response
export type UserGetMeResponse = GetUserProfileApiResponse;
