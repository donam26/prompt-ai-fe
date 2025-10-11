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

import { ROUTES_URL } from "./routes-url";

export const PROTECTED_PATHS = [
  ROUTES_URL.ADMIN,
  ROUTES_URL.PROMPT_LIBRARY,
  ROUTES_URL.PROFILE,
  ROUTES_URL.SETTINGS,
] as const;

export const INIT_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
} as const;

export const ROUTES = {
  SIGN_IN: ROUTES_URL.LOGIN,
  DASHBOARD: ROUTES_URL.PROMPT_LIBRARY,
  HOME: ROUTES_URL.HOME,
} as const;
