import { apiClient } from "@/services/base/apiClient";
import { ENDPOINTS, QUERY_PARAMS } from "@/constants";
import { ServiceMethod } from "@/services/base/types";
import type {
  UserListParams,
  UserAuthParams,
  UserRegisterParams,
  UserUpdateInfoParams,
  UserServiceResponse,
  UserLoginResponse,
  UserVerifyResponse,
  UserResendOTPResponse,
  UserGetMeResponse,
} from "@/types/services";
import type {
  EntityWithDataParams,
  SubscriptionParams,
  SubscriptionWithDataParams,
  PasswordChangeParams,
  ExportParams,
  ServiceMethodWithId,
} from "@/types/services/common";

export class UserService {
  // Authentication
  googleLogin: ServiceMethod<string> = credential => {
    return apiClient.post(ENDPOINTS.USERS.AUTH_GOOGLE, { credential });
  };

  loginUser: ServiceMethod<string, UserLoginResponse> = async email => {
    const response = await apiClient.post(ENDPOINTS.USERS.LOGIN, { email });
    const { token } = response.data;
    if (token && typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
    return response;
  };

  verifyLogin: ServiceMethod<UserAuthParams, UserVerifyResponse> = async (
    { email, otp, userIP } = { email: "", otp: "", userIP: "" }
  ) => {
    const response = await apiClient.post(ENDPOINTS.USERS.LOGIN_VERIFY, {
      email,
      otp,
      ip_address: userIP,
    });

    const { token } = response.data;
    if (token && typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
    return response;
  };

  passwordLogin: ServiceMethod<UserAuthParams, UserServiceResponse> = async (
    { email, password, userIP } = { email: "", password: "", userIP: "" }
  ) => {
    const response = await apiClient.post(ENDPOINTS.USERS.LOGIN_PASSWORD, {
      email,
      password,
      ip_address: userIP,
    });
    const { token } = response.data;
    if (token && typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
    return response;
  };

  verifyOTP: ServiceMethod<{ email: string; otp: string }> = (
    { email, otp } = { email: "", otp: "" }
  ) => {
    return apiClient.post(ENDPOINTS.USERS.VERIFY_OTP, { email, otp });
  };

  resendOTP: ServiceMethod<string, UserResendOTPResponse> = email => {
    return apiClient.post(ENDPOINTS.USERS.RESEND_OTP, { email });
  };

  registerUser: ServiceMethod<UserRegisterParams, UserServiceResponse> = (
    { fullName, email, password } = { fullName: "", email: "", password: "" }
  ) => {
    return apiClient.post(ENDPOINTS.USERS.REGISTER, {
      full_name: fullName,
      email,
      password,
    });
  };

  forgotPassword: ServiceMethod<string> = email => {
    return apiClient.post(ENDPOINTS.USERS.FORGOT_PASSWORD, { email });
  };

  resetPassword: ServiceMethod<{
    email: string;
    otp: string;
    newPassword: string;
  }> = (
    { email, otp, newPassword } = { email: "", otp: "", newPassword: "" }
  ) => {
    return apiClient.post(ENDPOINTS.USERS.RESET_PASSWORD, {
      email,
      otp,
      newPassword,
    });
  };

  // User management
  updateCount: ServiceMethodWithId = id => {
    return apiClient.put(`${ENDPOINTS.USERS.COUNT_PROMPT}/${id}`);
  };

  getUserPage: ServiceMethod<UserListParams> = params => {
    const { page = 1, pageSize = 10, filters = {} } = params || {};
    const payload = {
      page,
      pageSize,
      ...filters,
    };
    return apiClient.post(ENDPOINTS.USERS.LIST, payload);
  };

  getUserInfo: ServiceMethodWithId = id => {
    return apiClient.get(`${ENDPOINTS.USERS.BASE}/${id}`);
  };

  updateUser: ServiceMethod<EntityWithDataParams> = (
    { id, data } = { id: "", data: {} }
  ) => {
    return apiClient.put(`${ENDPOINTS.USERS.BASE}/${id}`, data);
  };

  updateUserInfo: ServiceMethod<UserUpdateInfoParams> = (
    { id, data } = { id: "", data: {} }
  ) => {
    return apiClient.put(`${ENDPOINTS.USERS.UPDATE_INFO}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  changePassword: ServiceMethod<PasswordChangeParams> = (
    { id, password, newPassword } = { id: "", password: "", newPassword: "" }
  ) => {
    return apiClient.put(
      `${ENDPOINTS.USERS.CHANGE_PASSWORD}/${id}?${QUERY_PARAMS.PASSWORD}=${password}&${QUERY_PARAMS.NEW_PASSWORD}=${newPassword}`
    );
  };

  // User subscriptions
  getUserSubscriptions: ServiceMethodWithId = id => {
    return apiClient.get(
      `${ENDPOINTS.USERS.BASE}/${id}${ENDPOINTS.USERS.SUBSCRIPTIONS}`
    );
  };

  addUserSubscription: ServiceMethod<EntityWithDataParams> = (
    { id, data } = { id: "", data: {} }
  ) => {
    return apiClient.post(
      `${ENDPOINTS.USERS.BASE}/${id}${ENDPOINTS.USERS.SUBSCRIPTIONS}`,
      data
    );
  };

  updateUserSubscription: ServiceMethod<SubscriptionWithDataParams> = (
    { id, subId, data } = { id: "", subId: "", data: {} }
  ) => {
    return apiClient.put(
      `${ENDPOINTS.USERS.BASE}/${id}${ENDPOINTS.USERS.SUBSCRIPTIONS}/${subId}`,
      data
    );
  };

  deleteUserSubscription: ServiceMethod<SubscriptionParams> = (
    { id, subId } = { id: "", subId: "" }
  ) => {
    return apiClient.delete(
      `${ENDPOINTS.USERS.BASE}/${id}${ENDPOINTS.USERS.SUBSCRIPTIONS}/${subId}`
    );
  };

  changeUserSubscription: ServiceMethod<SubscriptionWithDataParams> = (
    { id, subId, data } = { id: "", subId: "", data: {} }
  ) => {
    return apiClient.patch(
      `${ENDPOINTS.USERS.BASE}/${id}${ENDPOINTS.USERS.SUBSCRIPTIONS}/${subId}/change`,
      data
    );
  };

  // Export
  exportUsersExcel: ServiceMethod<ExportParams> = filters => {
    return apiClient.post(ENDPOINTS.USERS.EXPORT_EXCEL, filters, {
      responseType: "blob",
    });
  };

  // Get current user information
  getMe: ServiceMethod<{ userId: string }, UserGetMeResponse> = async (
    params = { userId: "" }
  ) => {
    const { userId } = params;
    return apiClient.get(`${ENDPOINTS.USERS.BASE}/me?userId=${userId}`);
  };
}

// Export singleton instance
export const userService = new UserService();
