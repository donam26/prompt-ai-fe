import { User } from "@/types";
import type { ApiUser } from "@/types/user";

/**
 * Transforms API user data to match the expected User interface
 * @param apiUser - User data from API response
 * @returns Transformed user data
 */
export const transformUserData = (apiUser: unknown): User => {
  const user = apiUser as ApiUser;

  return {
    id: user.id,
    full_name: user.fullName || user.full_name || "",
    email: user.email,
    role_id: user.role || user.role_id || 1,
    permissions: user.permissions || [],
    count_prompt: user.count_prompt || 0,
    updated_at: user.updated_at || "",
    userSub: user.userSub as User["userSub"],
    avatar: user.profile_image || user.avatar,
    created_at: user.created_at,
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
    full_name: user.fullName || user.full_name || "",
    role_id: user.role || user.role_id || 1,
    accessToken: token,
    refreshToken: token,
    expiresIn: 0, // Will be calculated from token
    permissions: user.permissions || [],
    count_prompt: user.count_prompt || 0,
    updated_at: user.updated_at || "",
    userSub: user.userSub as User["userSub"],
    avatar: user.profile_image || user.avatar,
    created_at: user.created_at,
  };
};
