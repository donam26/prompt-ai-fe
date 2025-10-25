import { User } from "@/types";

// API User interface for transformation
interface ApiUser {
  id: string | number;
  fullName?: string;
  email: string;
  role?: number;
  permissions?: string[] | string;
  countPrompt?: number;
  updatedAt?: string;
  userSub?: unknown;
  profileImage?: string;
  avatar?: string;
  createdAt?: string;
  accountStatus?: number;
}

/**
 * Transforms API user data to match the expected User interface
 * @param apiUser - User data from API response
 * @returns Transformed user data
 */
export const transformUserData = (apiUser: unknown): User => {
  const user = apiUser as ApiUser;

  return {
    id: typeof user.id === "string" ? parseInt(user.id, 10) : user.id,
    fullName: user.fullName || "",
    email: user.email,
    role: user.role || 1,
    permissions: user.permissions || [],
    countPromt: user.countPrompt || 0,
    updatedAt: user.updatedAt || "",
    userSub: user.userSub as User["userSub"],
    avatar: user.profileImage || user.avatar,
    createdAt: user.createdAt || "",
    accountStatus: user.accountStatus || 1,
  };
};

/**
 * Transforms API user data to match the IAuthType interface for NextAuth
 * @param apiUser - User data from API response
 * @param token - JWT token
 * @returns Transformed user data for NextAuth
 */
export const transformUserDataForNextAuth = (
  apiUser: unknown,
  token: string
) => {
  const user = apiUser as ApiUser;

  return {
    userId: user.id,
    email: user.email,
    fullName: user.fullName || "",
    role: user.role || 1,
    accessToken: token,
    refreshToken: token,
    expiresIn: 0, // Will be calculated from token
    permissions: user.permissions || [],
    countPrompt: user.countPrompt || 0,
    updatedAt: user.updatedAt || "",
    userSub: user.userSub as User["userSub"],
    avatar: user.profileImage || user.avatar,
    createdAt: user.createdAt || "",
  };
};
