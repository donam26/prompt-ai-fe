// Application routes constants
export const ROUTES_URL = {
  // Public routes
  HOME: "/",
  HOME_ALT: "/home",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_OTP: "/verify-otp",

  // Main pages
  THU_VIEN_PROMPT: "/prompt-library",
  PROMPT_LIBRARY: "/prompt-library",
  PROMPT_DETAIL: "/prompt-library/detail-prompts",
  PROMPT_DETAIL_MIDJOURNEY: "/prompt-library/detail-prompts-midjourney",
  BLOG: "/blog",
  PRICING: "/pricing",
  CONTACT: "/contact",
  PRODUCT: "/product",
  TOOLS: "/tools",
  PRODUCTS: "/products",

  // Protected routes
  ADMIN: "/admin",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  USER_INFO: "/user-information",

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
    ROUTES_URL.HOME_ALT,
    ROUTES_URL.LOGIN,
    ROUTES_URL.REGISTER,
    ROUTES_URL.FORGOT_PASSWORD,
    ROUTES_URL.VERIFY_OTP,
    ROUTES_URL.BLOG,
    ROUTES_URL.PRICING,
    ROUTES_URL.CONTACT,
    ROUTES_URL.PRODUCT,
  ];
  return publicRoutes.includes(pathname as any);
};

export const isProtectedRoute = (pathname: string): boolean => {
  const protectedRoutes = [
    ROUTES_URL.THU_VIEN_PROMPT,
    ROUTES_URL.PROMPT_LIBRARY,
    ROUTES_URL.ADMIN,
    ROUTES_URL.PROFILE,
    ROUTES_URL.SETTINGS,
    ROUTES_URL.USER_INFO,
  ];
  return protectedRoutes.some(route => pathname.startsWith(route));
};

// Helper functions for dynamic routes
export const getPromptLibraryUrl = (promptId?: string): string => {
  if (promptId) {
    return `${ROUTES_URL.THU_VIEN_PROMPT}?promptId=${promptId}`;
  }
  return ROUTES_URL.THU_VIEN_PROMPT;
};

export const getPromptLibraryUrlWithParams = (
  params: Record<string, string | number>
): string => {
  return createUrlWithParams(ROUTES_URL.THU_VIEN_PROMPT, params);
};

export const getPromptDetailUrl = (promptId: string | number): string => {
  return `${ROUTES_URL.PROMPT_DETAIL}/${promptId}`;
};

export const getPromptDetailUrlWithTab = (
  promptId: string | number,
  tab: string
): string => {
  return `${ROUTES_URL.PROMPT_DETAIL}/${promptId}?tab=${tab}`;
};

export const getMidjourneyPromptDetailUrl = (
  promptId: string | number
): string => {
  return `${ROUTES_URL.PROMPT_DETAIL_MIDJOURNEY}/${promptId}`;
};

export const getMidjourneyPromptDetailUrlWithTab = (
  promptId: string | number,
  tab: string
): string => {
  return `${ROUTES_URL.PROMPT_DETAIL_MIDJOURNEY}/${promptId}?tab=${tab}`;
};

export const getCategoryUrl = (
  categoryName: string,
  categoryId: string | number,
  type?: string
): string => {
  const baseUrl = `${ROUTES_URL.PROMPT_LIBRARY}/${categoryName}/${categoryId}`;
  return type ? `${baseUrl}?type=${type}` : baseUrl;
};
