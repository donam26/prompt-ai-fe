import { apiClient, buildUrlWithParams } from "../base/apiClient";
import { ENDPOINTS, QUERY_PARAMS } from "@/constants";
import { PaginationParams, ServiceMethod } from "../base/types";

// User service parameters
export interface UserListParams extends PaginationParams {
  filters?: Record<string, unknown>;
}

export interface UserAuthParams {
  email: string;
  password?: string;
  userIP?: string;
  otp?: string;
  credential?: string;
}

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
  data: unknown;
}

export interface UserSubscriptionParams {
  id: string | number;
  subId?: string | number;
  data?: unknown;
}

export class UserService {
  // Authentication
  googleLogin: ServiceMethod<string> = credential => {
    return apiClient.post(ENDPOINTS.USERS.AUTH_GOOGLE, { credential });
  };

  loginUser: ServiceMethod<string> = async email => {
    const response = await apiClient.post(ENDPOINTS.USERS.LOGIN, { email });
    const { token } = response.data;
    if (token && typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
    return response;
  };

  verifyLogin: ServiceMethod<{ email: string; otp: string; userIP: string }> =
    async ({ email, otp, userIP } = { email: "", otp: "", userIP: "" }) => {
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

  passwordLogin: ServiceMethod<{
    email: string;
    password: string;
    userIP: string;
  }> = async (
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

  resendOTP: ServiceMethod<string> = email => {
    return apiClient.post(ENDPOINTS.USERS.RESEND_OTP, { email });
  };

  registerUser: ServiceMethod<UserRegisterParams> = (
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
  updateCount: ServiceMethod<string | number> = id => {
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

  getUserInfo: ServiceMethod<string | number> = id => {
    return apiClient.get(`${ENDPOINTS.USERS.BASE}/${id}`);
  };

  updateUser: ServiceMethod<{ id: string | number; data: unknown }> = (
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

  changePassword: ServiceMethod<UserPasswordParams> = (
    { id, password, newPassword } = { id: "", password: "", newPassword: "" }
  ) => {
    return apiClient.put(
      `${ENDPOINTS.USERS.CHANGE_PASSWORD}/${id}?${QUERY_PARAMS.PASSWORD}=${password}&${QUERY_PARAMS.NEW_PASSWORD}=${newPassword}`
    );
  };

  // User subscriptions
  getUserSubscriptions: ServiceMethod<string | number> = id => {
    return apiClient.get(
      `${ENDPOINTS.USERS.BASE}/${id}${ENDPOINTS.USERS.SUBSCRIPTIONS}`
    );
  };

  addUserSubscription: ServiceMethod<UserSubscriptionParams> = (
    { id, data } = { id: "", data: {} }
  ) => {
    return apiClient.post(
      `${ENDPOINTS.USERS.BASE}/${id}${ENDPOINTS.USERS.SUBSCRIPTIONS}`,
      data
    );
  };

  updateUserSubscription: ServiceMethod<UserSubscriptionParams> = (
    { id, subId, data } = { id: "", subId: "", data: {} }
  ) => {
    return apiClient.put(
      `${ENDPOINTS.USERS.BASE}/${id}${ENDPOINTS.USERS.SUBSCRIPTIONS}/${subId}`,
      data
    );
  };

  deleteUserSubscription: ServiceMethod<{
    id: string | number;
    subId: string | number;
  }> = ({ id, subId } = { id: "", subId: "" }) => {
    return apiClient.delete(
      `${ENDPOINTS.USERS.BASE}/${id}${ENDPOINTS.USERS.SUBSCRIPTIONS}/${subId}`
    );
  };

  changeUserSubscription: ServiceMethod<UserSubscriptionParams> = (
    { id, subId, data } = { id: "", subId: "", data: {} }
  ) => {
    return apiClient.patch(
      `${ENDPOINTS.USERS.BASE}/${id}${ENDPOINTS.USERS.SUBSCRIPTIONS}/${subId}/change`,
      data
    );
  };

  // Export
  exportUsersExcel: ServiceMethod<Record<string, unknown>> = filters => {
    return apiClient.post(ENDPOINTS.USERS.EXPORT_EXCEL, filters, {
      responseType: "blob",
    });
  };

  // Get current user (this might need to be implemented based on your auth system)
  getUser: ServiceMethod = () => {
    // This method might need to be adjusted based on your actual implementation
    return apiClient.get(`${ENDPOINTS.USERS.BASE}/me`);
  };
}

// Export singleton instance
export const userService = new UserService();
