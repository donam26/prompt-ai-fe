import { ROUTES, AUTH_PAGES, PROTECTED_PATHS } from "@/constants/session";

// Cookie management utilities
export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

export const setCookie = (
  name: string,
  value: string,
  days: number = 7
): void => {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

export const deleteCookie = (name: string): void => {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
};

// Session data structure
export interface SessionData {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
}

// Get session from cookies
export const getSessionFromCookies = (): SessionData => {
  return {
    accessToken: getCookie("accessToken"),
    refreshToken: getCookie("refreshToken"),
    userId: getCookie("userId"),
  };
};

// Clear session cookies
export const clearSessionCookies = (): void => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  deleteCookie("userId");
};

// Storage data types
export interface StorageUserData {
  state: {
    user: unknown | null;
  };
}

export interface StorageRolesData {
  state: {
    roles: unknown[];
  };
}

// Parse storage value with fallback
export const parseStorageValue = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

// Check if arrays are equal
export const isEqual = (a: unknown[], b: unknown[]): boolean => {
  if (a.length !== b.length) return false;
  return a.every(
    (item, index) => JSON.stringify(item) === JSON.stringify(b[index])
  );
};

// Route protection utilities
export const isAuthPage = (path: string): boolean => {
  return AUTH_PAGES.some((authPage: string) => path.startsWith(authPage));
};

export const isProtectedPath = (path: string): boolean => {
  return PROTECTED_PATHS.some((protectedPath: string) =>
    path.startsWith(protectedPath)
  );
};

// Redirect utilities
export const handleRedirectToSignIn = (currentPath: string): void => {
  if (typeof window === "undefined") return;

  const redirectUrl =
    currentPath === "/"
      ? ROUTES.SIGN_IN
      : `${ROUTES.SIGN_IN}?redirect=${encodeURIComponent(currentPath)}`;
  window.location.href = redirectUrl;
};

export const handleRedirectToDashboard = (): void => {
  if (typeof window === "undefined") return;

  window.location.href = ROUTES.DASHBOARD;
};

// User redirect logic based on verification status
export const handleUserRedirect = (
  user: unknown,
  currentPath: string
): void => {
  if (!user || typeof user !== "object") return;

  const userObj = user as {
    is_verified?: boolean;
    email?: string;
    role_id?: number;
  };

  // If user is not verified and not on verify page, redirect to verify
  if (!userObj.is_verified && !currentPath.startsWith("/verify-otp")) {
    window.location.href = `/verify-otp?email=${encodeURIComponent(userObj.email || "")}`;
    return;
  }

  // If user is verified and on auth pages, redirect to dashboard
  if (userObj.is_verified && isAuthPage(currentPath)) {
    handleRedirectToDashboard();
    return;
  }

  // If user is admin and on admin pages, allow access
  if (userObj.role_id === 2 && currentPath.startsWith("/admin")) {
    return;
  }

  // If user is not admin and on admin pages, redirect to dashboard
  if (userObj.role_id !== 2 && currentPath.startsWith("/admin")) {
    handleRedirectToDashboard();
    return;
  }
};
