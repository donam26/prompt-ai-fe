// Application routes constants
export const ROUTES_URL = {
  // Public routes
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_OTP: "/verify-otp",

  // Protected routes
  THU_VIEN_PROMPT: "/thu-vien-prompt",
  ADMIN: "/admin",
  PROFILE: "/profile",
  SETTINGS: "/settings",

  // API routes
  API: {
    AUTH: "/api/auth",
    USERS: "/api/users",
    PROMPTS: "/api/prompts",
  },
} as const;

// Route helper functions
export const getVerifyOTPUrl = (email: string): string => {
  return `${ROUTES_URL.VERIFY_OTP}?email=${encodeURIComponent(email)}`;
};

export const getProfileUrl = (userId: string | number): string => {
  return `${ROUTES_URL.PROFILE}/${userId}`;
};

export const createUrlWithParams = (
  baseUrl: string,
  params: Record<string, string | number>
): string => {
  const url = new URL(baseUrl, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });
  return url.pathname + url.search;
};

// Route validation
export const isPublicRoute = (pathname: string): boolean => {
  const publicRoutes = [
    ROUTES_URL.HOME,
    ROUTES_URL.LOGIN,
    ROUTES_URL.REGISTER,
    ROUTES_URL.FORGOT_PASSWORD,
    ROUTES_URL.VERIFY_OTP,
  ];
  return publicRoutes.includes(pathname as any);
};

export const isProtectedRoute = (pathname: string): boolean => {
  const protectedRoutes = [
    ROUTES_URL.THU_VIEN_PROMPT,
    ROUTES_URL.ADMIN,
    ROUTES_URL.PROFILE,
    ROUTES_URL.SETTINGS,
  ];
  return protectedRoutes.some(route => pathname.startsWith(route));
};
