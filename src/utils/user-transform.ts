import type { User } from "@/types";

interface BackendUserResponse {
  id?: number;
  fullName?: string;
  email?: string;
  profile_image?: string;
  role?: number;
  created_at?: string;
  updated_at?: string;
}

interface BackendTokenResponse {
  accessToken?: string;
  refreshToken?: string;
  token?: string;
  expiresIn?: number;
}

interface BackendAuthResponse {
  user?: BackendUserResponse;
  token?: BackendTokenResponse;
}

interface NextAuthUser {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
}

interface TransformedUser extends User {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Transform backend user response to User type with auth tokens
 */
export const transformBackendUserToAuth = (
  backendResponse: BackendAuthResponse,
  fallbackUser?: NextAuthUser
): TransformedUser => {
  const defaultUser: TransformedUser = {
    id: 0,
    fullName: "",
    email: "",
    avatar: "",
    role: 1,
    accountStatus: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    accessToken: "",
    refreshToken: "",
    expiresIn: 7 * 24 * 60 * 60,
  };

  if (backendResponse?.user && backendResponse?.token) {
    // Use backend response data
    return {
      id: backendResponse.user.id || parseInt(fallbackUser?.id || "0") || 0,
      fullName: backendResponse.user.fullName || "",
      email: backendResponse.user.email || "",
      avatar: backendResponse.user.profile_image || "",
      role: backendResponse.user.role || 1,
      accountStatus: 1, // Backend doesn't return accountStatus, default to active
      createdAt: backendResponse.user.created_at || new Date().toISOString(),
      updatedAt: backendResponse.user.updated_at || new Date().toISOString(),
      accessToken:
        backendResponse.token.accessToken || backendResponse.token.token || "",
      refreshToken:
        backendResponse.token.refreshToken || backendResponse.token.token || "",
      expiresIn: backendResponse.token.expiresIn || 7 * 24 * 60 * 60,
    };
  }

  // Fallback to local data if backend fails
  if (fallbackUser) {
    const googleToken = `google_${fallbackUser.id}_${Date.now()}`;
    return {
      id: parseInt(fallbackUser.id || "0") || 0,
      fullName: fallbackUser.name || "",
      email: fallbackUser.email || "",
      avatar: fallbackUser.image || "",
      role: 1,
      accountStatus: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      accessToken: googleToken,
      refreshToken: googleToken,
      expiresIn: 7 * 24 * 60 * 60,
    };
  }

  return defaultUser;
};

/**
 * Transform user data for NextAuth session
 */
export const transformUserForSession = (userData: TransformedUser) => {
  return {
    id: userData.id,
    fullName: userData.fullName,
    email: userData.email,
    avatar: userData.avatar,
    role: userData.role,
    accountStatus: userData.accountStatus,
    createdAt: userData.createdAt,
    updatedAt: userData.updatedAt,
    accessToken: userData.accessToken,
    refreshToken: userData.refreshToken,
    expiresIn: userData.expiresIn,
  };
};

/**
 * Transform user data for auth store
 */
export const transformUserForAuthStore = (userData: TransformedUser): User => {
  return {
    id: userData.id,
    fullName: userData.fullName,
    email: userData.email,
    avatar: userData.avatar,
    role: userData.role,
    accountStatus: userData.accountStatus,
    createdAt: userData.createdAt,
    updatedAt: userData.updatedAt,
  };
};
