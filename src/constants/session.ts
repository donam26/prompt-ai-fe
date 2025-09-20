// Session management constants
export const STORAGE_KEYS = {
  USER: "auth-storage",
  ROLES: "roles-storage",
} as const;

export const AUTH_PAGES = [
  "/login",
  "/register",
  "/verify-otp",
  "/forgot-password",
  "/reset-password",
] as const;

export const PROTECTED_PATHS = [
  "/admin",
  "/thu-vien-prompt",
  "/profile",
  "/settings",
] as const;

export const INIT_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
} as const;

export const ROUTES = {
  SIGN_IN: "/login",
  DASHBOARD: "/thu-vien-prompt",
  HOME: "/",
} as const;
