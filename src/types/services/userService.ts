import type { ServiceResponse } from "@/types/api/common";
import type { UserSubscription, User } from "@/types/entities/user";
import type { PaginationParams } from "@/types/services/common";
import type { FilterParams, AuthParams } from "@/types/base";

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
  data: Partial<User>;
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
  user: User;
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
  user: User;
  token: string;
}

export interface UserVerifyResponse {
  message: string;
  data: UserVerifyData;
}

export interface UserResendOTPResponse {
  success: boolean;
  message: string;
}

// Get Me API Response
export interface UserGetMeResponse {
  success: boolean;
  data: {
    user: User;
    userSub: UserSubscription | null;
    allUserSubs: UserSubscription[];
  };
}
