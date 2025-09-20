// API response types for reuse

// Base API response structure
export interface BaseApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

// Paginated API response
export interface PaginatedApiResponse<T = unknown>
  extends BaseApiResponse<T[]> {
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

// Error response
export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
  details?: Record<string, unknown>;
}

// Success response with data
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message?: string;
  data: T;
}

// Login response
export interface LoginApiResponse {
  success: boolean;
  message: string;
  requireVerification?: boolean;
  email?: string;
  data?: {
    user: unknown;
    token: string;
  };
}

// Verify OTP response
export interface VerifyOtpApiResponse {
  message: string;
  token: string;
  user: unknown;
}

// Resend OTP response
export interface ResendOtpApiResponse {
  message: string;
}

// Get user profile response
export interface GetUserProfileApiResponse {
  success: boolean;
  data: {
    user: {
      id: number;
      full_name: string;
      email: string;
      phone?: string;
      profile_image?: string;
      account_status: number;
      is_verified: boolean;
      role: number;
      role_id: number;
      role_name: string;
      count_promt: number;
      google_id?: string;
      permissions: string[];
      created_at: string;
      updated_at: string;
    };
    userSub: {
      id: number;
      status: number;
      start_date: string;
      end_date: string;
      token: number;
      subscription: {
        id: number;
        name: string;
        type: number;
        price?: number;
        description?: string;
      };
    } | null;
    allUserSubs: Array<{
      id: number;
      status: number;
      start_date: string;
      end_date: string;
      token: number;
      subscription: {
        id: number;
        name: string;
        type: number;
        price?: number;
        description?: string;
      };
    }>;
  };
}

// Generic API error type
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: Record<string, unknown>;
}

export interface FilterParams {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, unknown>;
}

export interface AuthParams {
  email: string;
  password?: string;
  userIP?: string;
  otp?: string;
  credential?: string;
}
